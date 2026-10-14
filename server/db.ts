import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { 
  AdminUser, 
  AdminRole, 
  ManagedUser, 
  PaymentTransaction, 
  MembershipPlan, 
  AuditLogEntry, 
  SecurityAlert, 
  PlatformSettings, 
  BackupRecord,
  AdminSession
} from './types';

// Environment configurations
export const PRIMARY_ADMIN_EMAIL = 'dinujalakshan33@gmail.com';
export const ENV_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
export const ADMIN_EMAIL = PRIMARY_ADMIN_EMAIL;
const INITIAL_SUPER_PASSWORD = process.env.ADMIN_PASSWORD || 'TravelLife@Admin2025!';

// ==========================================
// 1. ADMIN STAFF STORE
// ==========================================
const adminStaffStore = new Map<string, AdminUser>();

// Initialize default Super Admin & Staff roles
function initAdminStaff() {
  const primarySuperAdminHash = bcrypt.hashSync('TravelLife@Admin2025!', 12);
  const delegatePasswordHash = bcrypt.hashSync('StaffAccess@2025!', 12);

  // 1. Primary Super Admin (dinujalakshan33@gmail.com)
  const primarySuperAdmin: AdminUser = {
    id: 'admin_super_01',
    email: PRIMARY_ADMIN_EMAIL,
    name: 'Chief Cartography Super Admin',
    role: 'super_admin',
    passwordHash: primarySuperAdminHash,
    mfaEnabled: true,
    mfaSecret: 'JBSWY3DPEHPK3PXP', // Base32 test secret for authenticator
    backupCodes: [
      'REC-9921-ABCD',
      'REC-8842-EFGH',
      'REC-7733-IJKL',
      'REC-6624-MNOP'
    ],
    createdAt: '2024-01-10T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    lastLoginIp: '127.0.0.1',
    isActive: true
  };
  adminStaffStore.set(primarySuperAdmin.email, primarySuperAdmin);

  // If env specifies custom admin email or password, also support that account
  if (ENV_ADMIN_EMAIL && ENV_ADMIN_EMAIL !== PRIMARY_ADMIN_EMAIL) {
    const envAdminHash = bcrypt.hashSync(INITIAL_SUPER_PASSWORD, 12);
    const envAdmin: AdminUser = {
      id: 'admin_super_env',
      email: ENV_ADMIN_EMAIL,
      name: 'Environment Provisioned Super Admin',
      role: 'super_admin',
      passwordHash: envAdminHash,
      mfaEnabled: true,
      mfaSecret: 'JBSWY3DPEHPK3PXP',
      backupCodes: ['REC-9921-ABCD', 'REC-8842-EFGH'],
      createdAt: '2024-01-10T08:00:00.000Z',
      isActive: true
    };
    adminStaffStore.set(envAdmin.email, envAdmin);
  }

  // Admin Delegate
  const generalAdmin: AdminUser = {
    id: 'admin_gen_02',
    email: 'operations@travellife.com',
    name: 'Elena Rostova (Operations Lead)',
    role: 'admin',
    passwordHash: delegatePasswordHash,
    mfaEnabled: true,
    mfaSecret: 'KRSXG5CTMVRXEZLU',
    backupCodes: ['REC-1122-OPSA', 'REC-3344-OPSB'],
    createdAt: '2024-03-15T09:30:00.000Z',
    isActive: true
  };
  adminStaffStore.set(generalAdmin.email, generalAdmin);

  // Content Manager
  const contentManager: AdminUser = {
    id: 'admin_content_03',
    email: 'editorial@travellife.com',
    name: 'Marcus Vance (Senior Editor)',
    role: 'content_manager',
    passwordHash: delegatePasswordHash,
    mfaEnabled: true,
    mfaSecret: 'MNUGK3TLMFSW4IDV',
    backupCodes: ['REC-5566-EDTA', 'REC-7788-EDTB'],
    createdAt: '2024-04-01T11:00:00.000Z',
    isActive: true
  };
  adminStaffStore.set(contentManager.email, contentManager);

  // Finance Manager
  const financeManager: AdminUser = {
    id: 'admin_fin_04',
    email: 'finance@travellife.com',
    name: 'Sophia Patel (Treasury & Compliance)',
    role: 'finance_manager',
    passwordHash: delegatePasswordHash,
    mfaEnabled: true,
    mfaSecret: 'OBZXG43TO5XXE3LQ',
    backupCodes: ['REC-9900-FINA', 'REC-2211-FINB'],
    createdAt: '2024-05-12T14:15:00.000Z',
    isActive: true
  };
  adminStaffStore.set(financeManager.email, financeManager);

  // Support Staff
  const supportStaff: AdminUser = {
    id: 'admin_sup_05',
    email: 'support-desk@travellife.com',
    name: 'Liam Chen (Member Experience)',
    role: 'support_staff',
    passwordHash: delegatePasswordHash,
    mfaEnabled: true,
    mfaSecret: 'PAVXI33SM5XXEZ3R',
    backupCodes: ['REC-4433-SUPA', 'REC-8877-SUPB'],
    createdAt: '2024-06-20T10:00:00.000Z',
    isActive: true
  };
  adminStaffStore.set(supportStaff.email, supportStaff);
}

initAdminStaff();

export function getAdminStaffList(): AdminUser[] {
  return Array.from(adminStaffStore.values());
}

export function findAdminByEmail(email: string): AdminUser | undefined {
  return adminStaffStore.get(email.toLowerCase().trim());
}

export function findAdminById(id: string): AdminUser | undefined {
  return Array.from(adminStaffStore.values()).find(a => a.id === id);
}

export function saveAdminUser(user: AdminUser): void {
  adminStaffStore.set(user.email.toLowerCase().trim(), user);
}

export function deleteAdminUser(id: string): boolean {
  for (const [email, user] of adminStaffStore.entries()) {
    if (user.id === id) {
      if (user.email === ADMIN_EMAIL) return false; // Cannot delete primary super admin
      adminStaffStore.delete(email);
      return true;
    }
  }
  return false;
}

// ==========================================
// 2. ACTIVE SESSIONS STORE (For revocation & logout-all)
// ==========================================
const activeSessions = new Map<string, AdminSession>();

export function createAdminSession(session: AdminSession): void {
  activeSessions.set(session.sessionId, session);
}

export function getAdminSession(sessionId: string): AdminSession | undefined {
  return activeSessions.get(sessionId);
}

export function updateAdminSession(session: AdminSession): void {
  activeSessions.set(session.sessionId, session);
}

export function revokeAdminSession(sessionId: string): void {
  activeSessions.delete(sessionId);
}

export function revokeAllSessionsForAdmin(email: string): number {
  let count = 0;
  const targetEmail = email.toLowerCase().trim();
  for (const [id, session] of activeSessions.entries()) {
    if (session.email.toLowerCase().trim() === targetEmail) {
      activeSessions.delete(id);
      count++;
    }
  }
  return count;
}

export function getActiveSessionCount(): number {
  return activeSessions.size;
}

// ==========================================
// 3. IMMUTABLE AUDIT LOG STORE
// ==========================================
const auditLogs: AuditLogEntry[] = [
  {
    id: 'log_init_01',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    eventType: 'LOGIN_SUCCESS',
    actorEmail: ADMIN_EMAIL,
    actorRole: 'super_admin',
    actorIp: '192.168.1.104',
    severity: 'INFO',
    details: 'Super administrator authenticated via MFA hardware verification token'
  },
  {
    id: 'log_init_02',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    eventType: 'GEO_AUDIT_TRIGGERED',
    actorEmail: ADMIN_EMAIL,
    actorRole: 'super_admin',
    actorIp: '192.168.1.104',
    severity: 'INFO',
    details: 'Triggered global Nominatim datum audit across 14,198 cartographic waypoints'
  },
  {
    id: 'log_init_03',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    eventType: 'BACKUP_CREATED',
    actorEmail: 'system',
    actorRole: 'system',
    actorIp: '127.0.0.1',
    severity: 'INFO',
    details: 'Automated nightly production ledger snapshot committed (SHA-256 verified)'
  },
  {
    id: 'log_init_04',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    eventType: 'LOGIN_FAILURE',
    actorEmail: 'unknown_probe@scanner.net',
    actorRole: 'unauthenticated',
    actorIp: '185.220.101.44',
    severity: 'WARNING',
    details: 'Invalid login credential attempt intercepted by server-side rate-limiter'
  }
];

export function addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
  const newEntry: AuditLogEntry = {
    id: `log_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    timestamp: new Date().toISOString(),
    ...entry
  };
  auditLogs.unshift(newEntry);
  // Keep up to 2,000 in memory
  if (auditLogs.length > 2000) {
    auditLogs.pop();
  }
  return newEntry;
}

export function getAuditLogs(limit = 100, filterType?: string, filterSeverity?: string): AuditLogEntry[] {
  return auditLogs.filter(log => {
    if (filterType && filterType !== 'all' && log.eventType !== filterType) return false;
    if (filterSeverity && filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    return true;
  }).slice(0, limit);
}

// ==========================================
// 4. SECURITY ALERTS STORE
// ==========================================
const securityAlerts: SecurityAlert[] = [
  {
    id: 'alt_01',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    title: 'Distributed Brute Force Spike Intercepted',
    description: '14 sequential failed attempts detected from CIDR range 185.220.x.x targeting administrator endpoints. Automatic 15-minute IP firewall lockout applied.',
    severity: 'WARNING',
    sourceIp: '185.220.101.44',
    status: 'investigating'
  },
  {
    id: 'alt_02',
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    title: 'Cross-Origin Cartography Node Drift Flag',
    description: 'Overpass API reported 0.038° positional discrepancy on Jiufen Old Street node #GT-88402. Routed to Cartography review queue.',
    severity: 'INFO',
    sourceIp: 'Overpass OSM Sync',
    status: 'resolved',
    resolvedBy: ADMIN_EMAIL,
    resolvedAt: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

export function getSecurityAlerts(): SecurityAlert[] {
  return [...securityAlerts];
}

export function resolveSecurityAlert(id: string, resolvedBy: string): boolean {
  const alert = securityAlerts.find(a => a.id === id);
  if (!alert) return false;
  alert.status = 'resolved';
  alert.resolvedBy = resolvedBy;
  alert.resolvedAt = new Date().toISOString();
  return true;
}

export function addSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): SecurityAlert {
  const newAlert: SecurityAlert = {
    id: `alt_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...alert
  };
  securityAlerts.unshift(newAlert);
  return newAlert;
}

// ==========================================
// 5. MANAGED USERS STORE
// ==========================================
const managedUsers: ManagedUser[] = [
  {
    id: 'usr_101',
    name: 'Maya Lin',
    email: 'maya.lin@explorers.org',
    role: 'guide',
    tier: 'Cartographer Enterprise',
    status: 'active',
    joinedDate: '2024-02-14',
    lastActive: '12m ago',
    savedTripsCount: 28,
    totalSpentUSD: 499.00,
    country: 'United States'
  },
  {
    id: 'usr_102',
    name: 'Kenji Takahashi',
    email: 'kenji.t@tokyo-alps.jp',
    role: 'contributor',
    tier: 'Trailblazer Pro',
    status: 'active',
    joinedDate: '2024-03-01',
    lastActive: '2h ago',
    savedTripsCount: 19,
    totalSpentUSD: 149.00,
    country: 'Japan'
  },
  {
    id: 'usr_103',
    name: 'Amara Diop',
    email: 'amara.diop@dakar-nature.sn',
    role: 'member',
    tier: 'Explorer Free',
    status: 'active',
    joinedDate: '2024-05-18',
    lastActive: '1d ago',
    savedTripsCount: 6,
    totalSpentUSD: 0.00,
    country: 'Senegal'
  },
  {
    id: 'usr_104',
    name: 'Julian Vance',
    email: 'julian.vance@badbot.xyz',
    role: 'member',
    tier: 'Explorer Free',
    status: 'suspended',
    joinedDate: '2024-06-22',
    lastActive: '5d ago',
    savedTripsCount: 1,
    totalSpentUSD: 0.00,
    country: 'Unknown'
  },
  {
    id: 'usr_105',
    name: 'Clara Dubois',
    email: 'clara.dubois@alps-trail.fr',
    role: 'vip',
    tier: 'Cartographer Enterprise',
    status: 'active',
    joinedDate: '2024-01-09',
    lastActive: '3h ago',
    savedTripsCount: 42,
    totalSpentUSD: 890.00,
    country: 'France'
  },
  {
    id: 'usr_106',
    name: 'David O\'Connor',
    email: 'david.oc@irishwilds.ie',
    role: 'contributor',
    tier: 'Trailblazer Pro',
    status: 'active',
    joinedDate: '2024-04-11',
    lastActive: '45m ago',
    savedTripsCount: 15,
    totalSpentUSD: 149.00,
    country: 'Ireland'
  }
];

export function getManagedUsers(): ManagedUser[] {
  return [...managedUsers];
}

export function updateManagedUserStatus(id: string, status: 'active' | 'suspended' | 'pending'): boolean {
  const user = managedUsers.find(u => u.id === id);
  if (!user) return false;
  user.status = status;
  return true;
}

export function updateManagedUserTier(id: string, tier: 'Explorer Free' | 'Trailblazer Pro' | 'Cartographer Enterprise'): boolean {
  const user = managedUsers.find(u => u.id === id);
  if (!user) return false;
  user.tier = tier;
  return true;
}

export function addManagedUser(userData: Omit<ManagedUser, 'id' | 'joinedDate' | 'lastActive' | 'savedTripsCount' | 'totalSpentUSD'>): ManagedUser {
  const newUser: ManagedUser = {
    id: `usr_${Date.now()}`,
    joinedDate: new Date().toISOString().split('T')[0],
    lastActive: 'Just now',
    savedTripsCount: 0,
    totalSpentUSD: 0,
    ...userData
  };
  managedUsers.unshift(newUser);
  return newUser;
}

export function deleteManagedUser(id: string): boolean {
  const idx = managedUsers.findIndex(u => u.id === id);
  if (idx === -1) return false;
  managedUsers.splice(idx, 1);
  return true;
}

// ==========================================
// 6. PAYMENTS & TRANSACTIONS STORE
// ==========================================
const paymentTransactions: PaymentTransaction[] = [
  {
    id: 'tx_9910',
    transactionRef: 'ch_3N8Qe9LkdIw45A01',
    userEmail: 'maya.lin@explorers.org',
    userName: 'Maya Lin',
    amountUSD: 499.00,
    plan: 'Cartographer Enterprise (Annual)',
    status: 'completed',
    method: 'Stripe Credit Card',
    timestamp: '2024-08-14T12:30:00.000Z'
  },
  {
    id: 'tx_9911',
    transactionRef: 'ch_3N8Qe9LkdIw45A02',
    userEmail: 'kenji.t@tokyo-alps.jp',
    userName: 'Kenji Takahashi',
    amountUSD: 149.00,
    plan: 'Trailblazer Pro (Annual)',
    status: 'completed',
    method: 'Apple Pay',
    timestamp: '2024-08-15T08:15:00.000Z'
  },
  {
    id: 'tx_9912',
    transactionRef: 'ch_3N8Qe9LkdIw45A03',
    userEmail: 'clara.dubois@alps-trail.fr',
    userName: 'Clara Dubois',
    amountUSD: 499.00,
    plan: 'Cartographer Enterprise (Annual)',
    status: 'completed',
    method: 'Stripe Credit Card',
    timestamp: '2024-08-16T15:45:00.000Z'
  },
  {
    id: 'tx_9913',
    transactionRef: 'ch_3N8Qe9LkdIw45A04',
    userEmail: 'david.oc@irishwilds.ie',
    userName: 'David O\'Connor',
    amountUSD: 149.00,
    plan: 'Trailblazer Pro (Annual)',
    status: 'completed',
    method: 'PayPal',
    timestamp: '2024-08-17T11:20:00.000Z'
  },
  {
    id: 'tx_9914',
    transactionRef: 'ch_3N8Qe9LkdIw45A05',
    userEmail: 'guest.dispute@example.com',
    userName: 'Alex Mercer',
    amountUSD: 29.00,
    plan: 'Trailblazer Pro (Monthly)',
    status: 'refunded',
    method: 'Google Pay',
    timestamp: '2024-08-10T09:10:00.000Z',
    refundReason: 'Customer requested plan cancellation within 48h grace period',
    refundedBy: 'finance@travellife.com'
  }
];

export function getPaymentTransactions(): PaymentTransaction[] {
  return [...paymentTransactions];
}

export function issuePaymentRefund(id: string, reason: string, refundedBy: string): boolean {
  const tx = paymentTransactions.find(t => t.id === id);
  if (!tx || tx.status !== 'completed') return false;
  tx.status = 'refunded';
  tx.refundReason = reason;
  tx.refundedBy = refundedBy;
  return true;
}

// ==========================================
// 7. MEMBERSHIP PLANS STORE
// ==========================================
const membershipPlans: MembershipPlan[] = [
  {
    id: 'plan_explorer',
    name: 'Explorer Free',
    priceMonthlyUSD: 0,
    priceAnnualUSD: 0,
    activeMembers: 14200,
    features: [
      'Access to curated global field guides',
      'Basic interactive world map',
      'Save up to 5 custom itineraries',
      'Community discussion read-only'
    ],
    status: 'active'
  },
  {
    id: 'plan_trailblazer',
    name: 'Trailblazer Pro',
    priceMonthlyUSD: 14.99,
    priceAnnualUSD: 149.00,
    activeMembers: 2840,
    features: [
      'Unlimited saved expedition blueprints',
      'Offline vector topology maps',
      'High-precision elevation profiling',
      'Direct hotel & eco-lodge booking perks',
      'Priority customer assistance'
    ],
    status: 'active'
  },
  {
    id: 'plan_cartographer',
    name: 'Cartographer Enterprise',
    priceMonthlyUSD: 49.99,
    priceAnnualUSD: 499.00,
    activeMembers: 412,
    features: [
      'Everything in Trailblazer Pro',
      'Direct OSM Nominatim ingestion API',
      'Commercial editorial dispatch licensing',
      'Custom travel team workspace (up to 10 seats)',
      'Dedicated 24/7 cartography concierge'
    ],
    status: 'active'
  }
];

export function getMembershipPlans(): MembershipPlan[] {
  return [...membershipPlans];
}

export function updateMembershipPlan(id: string, updates: Partial<MembershipPlan>): boolean {
  const plan = membershipPlans.find(p => p.id === id);
  if (!plan) return false;
  Object.assign(plan, updates);
  return true;
}

// ==========================================
// 8. PLATFORM SETTINGS STORE
// ==========================================
let platformSettings: PlatformSettings = {
  siteName: 'Travel-Life Nature & Expeditions Platform',
  maintenanceMode: false,
  publicRegistrationEnabled: true,
  requireEmailVerification: true,
  defaultCurrency: 'USD',
  sessionTimeoutHours: 12,
  maxFailedLoginAttempts: 5,
  lockoutDurationMinutes: 15,
  strictMfaEnforced: true,
  contentCachingHours: 24,
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

export function getPlatformSettings(): PlatformSettings {
  return { ...platformSettings };
}

export function updatePlatformSettings(updates: Partial<PlatformSettings>, updatedBy: string): PlatformSettings {
  platformSettings = {
    ...platformSettings,
    ...updates,
    lastUpdated: new Date().toISOString(),
    updatedBy
  };
  return platformSettings;
}

// ==========================================
// 9. BACKUP SNAPSHOTS LEDGER
// ==========================================
const backupLedger: BackupRecord[] = [
  {
    id: 'bcp_snapshot_01',
    filename: 'travellife_ledger_snapshot_20241010_0300.json',
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    sizeBytes: 148200,
    recordCounts: {
      users: 6,
      auditLogs: 4,
      payments: 5,
      staff: 5,
      candidates: 5
    },
    checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    createdBy: 'Scheduled Cron'
  }
];

export function getBackupLedger(): BackupRecord[] {
  return [...backupLedger];
}

export function createSystemBackupSnapshot(createdBy: string): { record: BackupRecord; payload: any } {
  const timestamp = new Date().toISOString();
  const dateStr = timestamp.replace(/[-:T.]/g, '').slice(0, 14);
  const filename = `travellife_ledger_snapshot_${dateStr}.json`;

  const payload = {
    meta: {
      generatedAt: timestamp,
      generator: 'Travel-Life Enterprise Admin Backup Subsystem',
      createdBy
    },
    staff: Array.from(adminStaffStore.values()).map(({ passwordHash, mfaSecret, backupCodes, ...rest }) => rest),
    users: managedUsers,
    payments: paymentTransactions,
    memberships: membershipPlans,
    auditLogs: auditLogs.slice(0, 500),
    securityAlerts,
    settings: platformSettings
  };

  const payloadString = JSON.stringify(payload);
  const checksum = crypto.createHash('sha256').update(payloadString).digest('hex');

  const record: BackupRecord = {
    id: `bcp_${Date.now()}`,
    filename,
    timestamp,
    sizeBytes: Buffer.byteLength(payloadString, 'utf8'),
    recordCounts: {
      users: managedUsers.length,
      auditLogs: auditLogs.length,
      payments: paymentTransactions.length,
      staff: adminStaffStore.size,
      candidates: 5
    },
    checksum,
    createdBy
  };

  backupLedger.unshift(record);
  return { record, payload };
}
