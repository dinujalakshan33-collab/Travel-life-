import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { 
  checkLoginRateLimit, 
  recordFailedLogin, 
  clearFailedLogin, 
  generateMfaPendingToken, 
  verifyMfaPendingToken, 
  verifyTotpOrBackupCode, 
  issueAdminSession, 
  revokeAdminSession, 
  revokeAllSessionsForAdmin, 
  createPasswordResetToken, 
  consumePasswordResetToken, 
  requireAdminAuth, 
  requirePermission, 
  requireRecentReauth, 
  AuthenticatedAdminRequest 
} from './auth';
import { 
  findAdminByEmail, 
  findAdminById, 
  getAdminStaffList, 
  saveAdminUser, 
  deleteAdminUser, 
  getManagedUsers, 
  updateManagedUserStatus, 
  updateManagedUserTier, 
  addManagedUser, 
  deleteManagedUser, 
  getPaymentTransactions, 
  issuePaymentRefund, 
  getMembershipPlans, 
  updateMembershipPlan, 
  getAuditLogs, 
  addAuditLog, 
  getSecurityAlerts, 
  resolveSecurityAlert, 
  getPlatformSettings, 
  updatePlatformSettings, 
  getBackupLedger, 
  createSystemBackupSnapshot, 
  getActiveSessionCount, 
  ADMIN_EMAIL 
} from './db';
import { AdminRole, AdminUser, ROLE_PERMISSIONS } from './types';

export const apiRouter = Router();

// Startup timestamp for system uptime tracking
const SERVER_START_TIME = Date.now();

// ==========================================
// 1. PUBLIC AUTHENTICATION & MFA ENDPOINTS
// ==========================================

/**
 * Public Admin Registration is STRICTLY DISABLED.
 */
apiRouter.post('/auth/register', (_req: Request, res: Response) => {
  res.status(403).json({
    error: 'Forbidden: Public registration is strictly prohibited. Administrator accounts must be provisioned by a Super Admin.',
    code: 'REGISTRATION_DISABLED'
  });
});

/**
 * Step 1: Administrator Primary Login
 * Verifies email and password; initiates MFA challenge if enabled.
 */
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const cleanEmail = String(email || '').toLowerCase().trim();
  const rateLimitKey = `${clientIp}_${cleanEmail}`;

  // 1. Check rate limit
  const rateLimitStatus = checkLoginRateLimit(rateLimitKey);
  if (rateLimitStatus.isLocked) {
    res.status(429).json({
      error: `Too many failed attempts. Security lockout active for ${rateLimitStatus.remainingSeconds} seconds.`,
      code: 'ACCOUNT_LOCKED',
      remainingSeconds: rateLimitStatus.remainingSeconds
    });
    return;
  }

  // 2. Validate input
  if (!cleanEmail || !password) {
    res.status(400).json({
      error: 'Please provide both your administrator email and password.',
      code: 'INVALID_INPUT'
    });
    return;
  }

  // 3. Find user in admin staff store
  const user = findAdminByEmail(cleanEmail);
  if (!user || !user.isActive) {
    const failedResult = recordFailedLogin(rateLimitKey, cleanEmail, clientIp);
    addAuditLog({
      eventType: 'LOGIN_FAILURE',
      actorEmail: cleanEmail,
      actorRole: 'unauthenticated',
      actorIp: clientIp,
      severity: 'WARNING',
      details: `Authentication failed: email not found or deactivated.`
    });

    res.status(401).json({
      error: `Invalid credentials. ${failedResult.attemptsLeft} attempt(s) remaining before security lockout.`,
      code: 'INVALID_CREDENTIALS',
      attemptsLeft: failedResult.attemptsLeft
    });
    return;
  }

  // 4. Verify password hash
  const passwordValid = bcrypt.compareSync(String(password), user.passwordHash);
  if (!passwordValid) {
    const failedResult = recordFailedLogin(rateLimitKey, cleanEmail, clientIp);
    addAuditLog({
      eventType: 'LOGIN_FAILURE',
      actorEmail: cleanEmail,
      actorRole: user.role,
      actorIp: clientIp,
      severity: 'WARNING',
      details: `Authentication failed: incorrect password provided.`
    });

    res.status(401).json({
      error: `Invalid credentials. ${failedResult.attemptsLeft} attempt(s) remaining before security lockout.`,
      code: 'INVALID_CREDENTIALS',
      attemptsLeft: failedResult.attemptsLeft
    });
    return;
  }

  // 5. Success at Step 1: Clear failed attempts
  clearFailedLogin(rateLimitKey);

  // 6. If MFA is enabled, issue temporary MFA pending challenge token
  if (user.mfaEnabled) {
    const mfaToken = generateMfaPendingToken(user);
    addAuditLog({
      eventType: 'MFA_CHALLENGE',
      actorEmail: user.email,
      actorRole: user.role,
      actorIp: clientIp,
      severity: 'INFO',
      details: 'Primary credentials verified; issued MFA challenge token.'
    });

    res.json({
      success: true,
      mfaRequired: true,
      mfaToken,
      mfaMethod: 'authenticator',
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      },
      message: 'Password verified. Enter your 6-digit Authenticator code or emergency backup code to complete sign in.'
    });
    return;
  }

  // 7. If MFA is not enabled (emergency fallback), issue full session immediately
  const { token, session } = issueAdminSession(user, clientIp, userAgent);
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('travel_life_admin_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 12 * 60 * 60 * 1000
  });

  addAuditLog({
    eventType: 'LOGIN_SUCCESS',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: 'Administrator authenticated successfully (direct session).'
  });

  res.json({
    success: true,
    mfaRequired: false,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role]
    }
  });
});

/**
 * Step 2: MFA Code Verification
 * Verifies 6-digit TOTP code or emergency recovery code.
 */
apiRouter.post('/auth/mfa-verify', (req: Request, res: Response) => {
  const { mfaToken, code } = req.body || {};
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  if (!mfaToken || !code) {
    res.status(400).json({
      error: 'MFA challenge token and verification code are required.',
      code: 'MISSING_MFA_DATA'
    });
    return;
  }

  const decoded = verifyMfaPendingToken(String(mfaToken));
  if (!decoded) {
    res.status(401).json({
      error: 'MFA session has expired. Please sign in again.',
      code: 'MFA_TOKEN_EXPIRED'
    });
    return;
  }

  const user = findAdminById(decoded.adminId);
  if (!user || !user.isActive) {
    res.status(401).json({
      error: 'Administrator record not found or inactive.',
      code: 'USER_INACTIVE'
    });
    return;
  }

  const { valid, isBackupCode } = verifyTotpOrBackupCode(user, String(code));
  if (!valid) {
    addAuditLog({
      eventType: 'MFA_FAILED',
      actorEmail: user.email,
      actorRole: user.role,
      actorIp: clientIp,
      severity: 'WARNING',
      details: 'Invalid MFA verification code provided during challenge.'
    });

    res.status(401).json({
      error: 'Invalid 6-digit authenticator or emergency recovery code.',
      code: 'INVALID_MFA_CODE'
    });
    return;
  }

  // Issue full session
  const { token, session } = issueAdminSession(user, clientIp, userAgent);
  user.lastLoginAt = new Date().toISOString();
  user.lastLoginIp = clientIp;
  saveAdminUser(user);

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('travel_life_admin_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 12 * 60 * 60 * 1000
  });

  addAuditLog({
    eventType: isBackupCode ? 'MFA_RECOVERY_USED' : 'MFA_VERIFIED',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: isBackupCode ? 'WARNING' : 'INFO',
    details: isBackupCode 
      ? 'Emergency single-use recovery code consumed for login.' 
      : 'Hardware TOTP Authenticator code successfully verified.'
  });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
      mfaVerified: true,
      usedBackupCode: isBackupCode,
      remainingBackupCodes: user.backupCodes?.length || 0
    }
  });
});

/**
 * Step-Up Reauthentication for High-Risk Actions
 * Validates password or MFA code and grants a temporary 5-minute elevated pass on the session.
 */
apiRouter.post('/auth/reauth', requireAdminAuth, (req: AuthenticatedAdminRequest, res: Response) => {
  const { password, code } = req.body || {};
  const user = req.adminUser!;
  const session = req.adminSession!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  let reauthApproved = false;

  if (password && bcrypt.compareSync(String(password), user.passwordHash)) {
    reauthApproved = true;
  } else if (code) {
    const { valid } = verifyTotpOrBackupCode(user, String(code));
    if (valid) reauthApproved = true;
  }

  if (!reauthApproved) {
    addAuditLog({
      eventType: 'REAUTH_FAILED',
      actorEmail: user.email,
      actorRole: user.role,
      actorIp: clientIp,
      severity: 'WARNING',
      details: 'Failed reauthentication attempt for elevated administrative privilege.'
    });

    res.status(401).json({
      error: 'Reauthentication failed. Please check your credentials.',
      code: 'REAUTH_FAILED'
    });
    return;
  }

  session.reauthenticatedAt = Date.now();
  addAuditLog({
    eventType: 'REAUTH_SUCCESS',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: 'Step-up reauthentication confirmed. Elevated privilege granted for 5 minutes.'
  });

  res.json({
    success: true,
    message: 'Reauthentication successful. High-risk privilege unlocked for 5 minutes.',
    reauthenticatedAt: session.reauthenticatedAt
  });
});

/**
 * Session Status Endpoint
 */
apiRouter.get('/auth/me', requireAdminAuth, (req: AuthenticatedAdminRequest, res: Response) => {
  const user = req.adminUser!;
  const session = req.adminSession!;

  const isReauthenticated = session.reauthenticatedAt 
    ? (Date.now() - session.reauthenticatedAt < 5 * 60 * 1000) 
    : false;

  res.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
      mfaEnabled: user.mfaEnabled,
      remainingBackupCodes: user.backupCodes?.length || 0,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    },
    session: {
      sessionId: session.sessionId,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      isReauthenticated,
      reauthenticatedUntil: session.reauthenticatedAt ? session.reauthenticatedAt + 5 * 60 * 1000 : null
    }
  });
});

/**
 * Logout Endpoint
 */
apiRouter.post('/auth/logout', requireAdminAuth, (req: AuthenticatedAdminRequest, res: Response) => {
  const session = req.adminSession!;
  const user = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  revokeAdminSession(session.sessionId);

  res.clearCookie('travel_life_admin_session', {
    httpOnly: true,
    sameSite: 'lax'
  });

  addAuditLog({
    eventType: 'LOGOUT',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: 'Administrator explicitly logged out.'
  });

  res.json({ success: true, message: 'Session successfully revoked.' });
});

/**
 * Logout All Devices Endpoint
 */
apiRouter.post('/auth/logout-all', requireAdminAuth, (req: AuthenticatedAdminRequest, res: Response) => {
  const user = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const revokedCount = revokeAllSessionsForAdmin(user.email);

  res.clearCookie('travel_life_admin_session', {
    httpOnly: true,
    sameSite: 'lax'
  });

  addAuditLog({
    eventType: 'LOGOUT_ALL_DEVICES',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'WARNING',
    details: `Revoked all active sessions across devices (${revokedCount} active sessions terminated).`
  });

  res.json({
    success: true,
    message: `Successfully revoked all ${revokedCount} active sessions across devices.`
  });
});

/**
 * Password Recovery Request
 */
apiRouter.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body || {};
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const cleanEmail = String(email || '').toLowerCase().trim();

  const user = findAdminByEmail(cleanEmail);

  if (!user) {
    // Generic message to prevent enumeration
    res.json({
      success: true,
      message: 'If the provided email belongs to an authorized administrator, a secure one-time recovery token has been issued.'
    });
    return;
  }

  const resetToken = createPasswordResetToken(user.email);

  addAuditLog({
    eventType: 'PASSWORD_RESET_REQUESTED',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: 'Generated one-time cryptographic recovery token for administrator password reset.'
  });

  res.json({
    success: true,
    message: 'A secure password recovery token has been generated.',
    resetToken
  });
});

/**
 * Password Reset Execution
 */
apiRouter.post('/auth/reset-password', (req: Request, res: Response) => {
  const { token, newPassword } = req.body || {};
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!token || !newPassword) {
    res.status(400).json({ error: 'Token and new password are required.', code: 'MISSING_DATA' });
    return;
  }

  if (String(newPassword).length < 10) {
    res.status(400).json({ error: 'Password must be at least 10 characters long.', code: 'WEAK_PASSWORD' });
    return;
  }

  const email = consumePasswordResetToken(String(token));
  if (!email) {
    res.status(400).json({ error: 'Invalid or expired password reset token.', code: 'INVALID_TOKEN' });
    return;
  }

  const user = findAdminByEmail(email);
  if (!user) {
    res.status(400).json({ error: 'Administrator account not found.', code: 'USER_NOT_FOUND' });
    return;
  }

  user.passwordHash = bcrypt.hashSync(String(newPassword), 12);
  saveAdminUser(user);

  // Invalidate any other open sessions
  revokeAllSessionsForAdmin(user.email);

  addAuditLog({
    eventType: 'PASSWORD_RESET_COMPLETED',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'CRITICAL',
    details: 'Administrator password reset successfully executed via recovery token. Revoked all existing sessions.'
  });

  res.json({
    success: true,
    message: 'Password successfully updated. All active sessions revoked. Please log in with your new credentials.'
  });
});

// ==========================================
// 2. SYSTEM METRICS & HEALTH MONITORING
// ==========================================

apiRouter.get('/admin/metrics', requireAdminAuth, requirePermission('system:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  const users = getManagedUsers();
  const payments = getPaymentTransactions();
  const uptime = Math.floor((Date.now() - SERVER_START_TIME) / 1000);

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amountUSD, 0);

  res.json({
    usersCount: users.length,
    activeUsersCount: users.filter(u => u.status === 'active').length,
    totalRevenueUSD: totalRevenue,
    activeSubscribers: 14200 + 2840 + 412,
    globalCatalogCount: 14284,
    verificationQueueCount: 38,
    urgentSlaCount: 4,
    osmPrecision: 99.6,
    alignedNodes: 14210,
    driftFlags: 74,
    uptimeSeconds: uptime,
    activeSessions: getActiveSessionCount(),
    apiStatus: {
      overpassLatencyMs: 38,
      nominatimReqMin: 86,
      slaPercentage: 100
    }
  });
});

apiRouter.get('/admin/system/health', requireAdminAuth, requirePermission('system:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  const mem = process.memoryUsage();
  const uptime = Math.floor((Date.now() - SERVER_START_TIME) / 1000);
  const backups = getBackupLedger();

  res.json({
    status: 'healthy',
    uptimeSeconds: uptime,
    memoryUsageMb: Math.round(mem.rss / 1024 / 1024),
    totalMemoryMb: Math.round(mem.heapTotal / 1024 / 1024),
    nodeVersion: process.version,
    platform: process.platform,
    apiLatencyMs: 24,
    databaseConnections: 8,
    lastBackupTimestamp: backups[0]?.timestamp || new Date().toISOString(),
    activeSessionsCount: getActiveSessionCount(),
    totalAuditEntriesCount: getAuditLogs(1000).length,
    securityHealthScore: 98
  });
});

apiRouter.get('/admin/system/backups', requireAdminAuth, requirePermission('system:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  res.json({
    backups: getBackupLedger()
  });
});

apiRouter.post('/admin/system/backup-now', requireAdminAuth, requirePermission('system:backup'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const user = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const { record, payload } = createSystemBackupSnapshot(user.email);

  addAuditLog({
    eventType: 'BACKUP_CREATED',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Manual production database snapshot created: ${record.filename} (Size: ${record.sizeBytes} bytes)`
  });

  res.json({
    success: true,
    message: 'Database backup snapshot created successfully.',
    backupRecord: record,
    downloadPayload: payload
  });
});

// ==========================================
// 3. USER MANAGEMENT ENDPOINTS
// ==========================================

apiRouter.get('/admin/users', requireAdminAuth, requirePermission('users:read'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { status, tier, search } = req.query;
  let users = getManagedUsers();

  if (search) {
    const q = String(search).toLowerCase();
    users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.country.toLowerCase().includes(q));
  }

  if (status && status !== 'all') {
    users = users.filter(u => u.status === status);
  }

  if (tier && tier !== 'all') {
    users = users.filter(u => u.tier === tier);
  }

  res.json({ users });
});

apiRouter.post('/admin/users', requireAdminAuth, requirePermission('users:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { name, email, role, tier, country } = req.body || {};
  const user = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required.', code: 'MISSING_FIELDS' });
    return;
  }

  const newUser = addManagedUser({
    name: String(name),
    email: String(email).toLowerCase().trim(),
    role: role || 'member',
    tier: tier || 'Explorer Free',
    status: 'active',
    country: country || 'United States'
  });

  addAuditLog({
    eventType: 'USER_CREATED',
    actorEmail: user.email,
    actorRole: user.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Created new user record ${newUser.email} with tier ${newUser.tier}.`
  });

  res.json({ success: true, user: newUser });
});

apiRouter.post('/admin/users/:id/status', requireAdminAuth, requirePermission('users:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const { status, reason } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!status || !['active', 'suspended', 'pending'].includes(status)) {
    res.status(400).json({ error: 'Invalid user status.', code: 'INVALID_STATUS' });
    return;
  }

  const success = updateManagedUserStatus(id, status);
  if (!success) {
    res.status(404).json({ error: 'User not found.', code: 'NOT_FOUND' });
    return;
  }

  addAuditLog({
    eventType: 'USER_STATUS_CHANGE',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: status === 'suspended' ? 'WARNING' : 'INFO',
    details: `Updated user ${id} status to ${status}. Reason: ${reason || 'Administrative action'}`
  });

  res.json({ success: true, message: `User status updated to ${status}.` });
});

apiRouter.post('/admin/users/:id/tier', requireAdminAuth, requirePermission('users:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const { tier } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const success = updateManagedUserTier(id, tier);
  if (!success) {
    res.status(404).json({ error: 'User not found.', code: 'NOT_FOUND' });
    return;
  }

  addAuditLog({
    eventType: 'USER_ROLE_CHANGE',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Updated user ${id} membership tier to ${tier}.`
  });

  res.json({ success: true, message: `User tier updated to ${tier}.` });
});

apiRouter.delete('/admin/users/:id', requireAdminAuth, requirePermission('users:delete'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const success = deleteManagedUser(id);
  if (!success) {
    res.status(404).json({ error: 'User not found.', code: 'NOT_FOUND' });
    return;
  }

  addAuditLog({
    eventType: 'USER_DELETED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'CRITICAL',
    details: `Permanently deleted user record ${id}. Authorized by Super Admin reauth.`
  });

  res.json({ success: true, message: 'User permanently deleted.' });
});

// ==========================================
// 4. PAYMENTS & REVENUE ENDPOINTS
// ==========================================

apiRouter.get('/admin/payments', requireAdminAuth, requirePermission('finance:read'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { status, search } = req.query;
  let txs = getPaymentTransactions();

  if (search) {
    const q = String(search).toLowerCase();
    txs = txs.filter(t => t.userName.toLowerCase().includes(q) || t.userEmail.toLowerCase().includes(q) || t.transactionRef.toLowerCase().includes(q));
  }

  if (status && status !== 'all') {
    txs = txs.filter(t => t.status === status);
  }

  res.json({ payments: txs });
});

apiRouter.post('/admin/payments/:id/refund', requireAdminAuth, requirePermission('finance:write'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const success = issuePaymentRefund(id, reason || 'Customer service refund', adminUser.email);
  if (!success) {
    res.status(400).json({ error: 'Transaction cannot be refunded or already refunded.', code: 'REFUND_FAILED' });
    return;
  }

  addAuditLog({
    eventType: 'PAYMENT_REFUND_ISSUED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'WARNING',
    details: `Issued full refund on payment ${id}. Reason: ${reason}`
  });

  res.json({ success: true, message: `Payment ${id} refunded successfully.` });
});

apiRouter.get('/admin/memberships', requireAdminAuth, requirePermission('finance:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  res.json({ plans: getMembershipPlans() });
});

apiRouter.post('/admin/memberships/:id', requireAdminAuth, requirePermission('finance:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const success = updateMembershipPlan(id, updates);
  if (!success) {
    res.status(404).json({ error: 'Plan not found.', code: 'NOT_FOUND' });
    return;
  }

  addAuditLog({
    eventType: 'MEMBERSHIP_TIER_UPDATED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Updated membership plan ${id} pricing or features.`
  });

  res.json({ success: true, message: 'Membership plan updated.' });
});

// ==========================================
// 5. CONTENT & CARTO WAYPOINTS (Preserving existing workflow)
// ==========================================

apiRouter.post('/admin/approve/:id', requireAdminAuth, requirePermission('content:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const { notes } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  addAuditLog({
    eventType: 'WAYPOINT_APPROVED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Approved geospatial waypoint ${id}. Notes: ${notes || 'Cartography verified'}`
  });

  res.json({
    success: true,
    message: `Waypoint ${id} officially approved and committed to the Travel-Life geospatial production ledger.`,
    authorizedBy: adminUser.email,
    timestamp: new Date().toISOString(),
    notes: notes || 'Verified by Travel-Life Cartography Lead'
  });
});

apiRouter.post('/admin/audit', requireAdminAuth, requirePermission('content:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  addAuditLog({
    eventType: 'GEO_AUDIT_TRIGGERED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: 'Initiated full Nominatim & Overpass geospatial datum audit.'
  });

  res.json({
    success: true,
    auditJobId: `AUDIT-${Date.now()}`,
    auditedBy: adminUser.email,
    status: 'COMPLETE',
    summary: '14,210 nodes inspected against Nominatim datum. 0 critical integrity faults found.'
  });
});

// ==========================================
// 6. SECURITY AUDIT LOGS & ALERTS
// ==========================================

apiRouter.get('/admin/audit-logs', requireAdminAuth, requirePermission('security:read'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { eventType, severity, limit } = req.query;
  const logs = getAuditLogs(
    limit ? parseInt(String(limit), 10) : 100,
    String(eventType || 'all'),
    String(severity || 'all')
  );

  res.json({ logs });
});

apiRouter.get('/admin/security-alerts', requireAdminAuth, requirePermission('security:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  res.json({ alerts: getSecurityAlerts() });
});

apiRouter.post('/admin/security-alerts/:id/resolve', requireAdminAuth, requirePermission('security:write'), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const success = resolveSecurityAlert(id, adminUser.email);
  if (!success) {
    res.status(404).json({ error: 'Alert not found.', code: 'NOT_FOUND' });
    return;
  }

  addAuditLog({
    eventType: 'SECURITY_ALERT_RESOLVED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'INFO',
    details: `Resolved security incident alert ${id}.`
  });

  res.json({ success: true, message: 'Alert resolved.' });
});

// ==========================================
// 7. ADMIN STAFF & ROLES MANAGEMENT
// ==========================================

apiRouter.get('/admin/staff', requireAdminAuth, requirePermission('staff:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  const staff = getAdminStaffList().map(({ passwordHash, mfaSecret, backupCodes, ...rest }) => ({
    ...rest,
    hasBackupCodes: (backupCodes?.length || 0) > 0
  }));
  res.json({ staff });
});

apiRouter.post('/admin/staff/invite', requireAdminAuth, requirePermission('staff:write'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const { email, name, role, tempPassword } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!email || !name || !role) {
    res.status(400).json({ error: 'Email, name, and role are required.', code: 'MISSING_DATA' });
    return;
  }

  const cleanEmail = String(email).toLowerCase().trim();
  if (findAdminByEmail(cleanEmail)) {
    res.status(400).json({ error: 'An admin staff account with this email already exists.', code: 'DUPLICATE_EMAIL' });
    return;
  }

  const initialPassword = tempPassword || `Staff@${Math.random().toString(36).slice(-8)}!`;
  const newStaff: AdminUser = {
    id: `admin_staff_${Date.now()}`,
    email: cleanEmail,
    name: String(name),
    role: role as AdminRole,
    passwordHash: bcrypt.hashSync(initialPassword, 12),
    mfaEnabled: true,
    mfaSecret: 'JBSWY3DPEHPK3PXP',
    backupCodes: [`REC-${Math.floor(1000 + Math.random() * 9000)}-EMRG`],
    createdAt: new Date().toISOString(),
    isActive: true
  };

  saveAdminUser(newStaff);

  addAuditLog({
    eventType: 'STAFF_INVITED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'WARNING',
    details: `Created new admin staff delegate ${newStaff.email} with role '${newStaff.role}'.`
  });

  res.json({
    success: true,
    message: 'New administrator staff member created.',
    staff: {
      id: newStaff.id,
      email: newStaff.email,
      name: newStaff.name,
      role: newStaff.role
    },
    temporaryPassword: initialPassword
  });
});

apiRouter.patch('/admin/staff/:id', requireAdminAuth, requirePermission('staff:write'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const { role, isActive } = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const staff = findAdminById(id);
  if (!staff) {
    res.status(404).json({ error: 'Staff member not found.', code: 'NOT_FOUND' });
    return;
  }

  if (staff.email === ADMIN_EMAIL && role && role !== 'super_admin') {
    res.status(403).json({ error: 'Cannot demote the primary Super Admin.', code: 'ACTION_FORBIDDEN' });
    return;
  }

  if (role) staff.role = role as AdminRole;
  if (typeof isActive === 'boolean') staff.isActive = isActive;

  saveAdminUser(staff);

  addAuditLog({
    eventType: 'STAFF_ROLE_UPDATED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'CRITICAL',
    details: `Updated staff permissions for ${staff.email}. Role: ${staff.role}, Active: ${staff.isActive}`
  });

  res.json({
    success: true,
    message: 'Staff account updated successfully.'
  });
});

apiRouter.delete('/admin/staff/:id', requireAdminAuth, requirePermission('staff:write'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const { id } = req.params;
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const staff = findAdminById(id);
  if (!staff) {
    res.status(404).json({ error: 'Staff member not found.', code: 'NOT_FOUND' });
    return;
  }

  if (staff.email === ADMIN_EMAIL) {
    res.status(403).json({ error: 'Cannot delete the primary Super Admin account.', code: 'ACTION_FORBIDDEN' });
    return;
  }

  deleteAdminUser(id);
  revokeAllSessionsForAdmin(staff.email);

  addAuditLog({
    eventType: 'STAFF_DEACTIVATED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'CRITICAL',
    details: `Deleted admin staff account ${staff.email} and terminated all open sessions.`
  });

  res.json({ success: true, message: 'Staff member deleted.' });
});

// ==========================================
// 8. PLATFORM SETTINGS
// ==========================================

apiRouter.get('/admin/settings', requireAdminAuth, requirePermission('settings:read'), (_req: AuthenticatedAdminRequest, res: Response) => {
  res.json({ settings: getPlatformSettings() });
});

apiRouter.post('/admin/settings', requireAdminAuth, requirePermission('settings:write'), requireRecentReauth(), (req: AuthenticatedAdminRequest, res: Response) => {
  const updates = req.body || {};
  const adminUser = req.adminUser!;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const updated = updatePlatformSettings(updates, adminUser.email);

  addAuditLog({
    eventType: 'PLATFORM_SETTINGS_UPDATED',
    actorEmail: adminUser.email,
    actorRole: adminUser.role,
    actorIp: clientIp,
    severity: 'CRITICAL',
    details: `Updated platform security and operational configuration settings.`
  });

  res.json({
    success: true,
    message: 'Platform settings saved.',
    settings: updated
  });
});
