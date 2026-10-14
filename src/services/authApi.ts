export type AdminRole = 
  | 'super_admin' 
  | 'admin' 
  | 'content_manager' 
  | 'finance_manager' 
  | 'support_staff';

export interface AuthUser {
  id?: string;
  email: string;
  name?: string;
  role: AdminRole | string;
  permissions?: string[];
  mfaEnabled?: boolean;
  mfaVerified?: boolean;
  remainingBackupCodes?: number;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: AuthUser;
  token?: string;
  code?: string;
  mfaRequired?: boolean;
  mfaToken?: string;
  mfaMethod?: 'authenticator';
  attemptsLeft?: number;
  remainingSeconds?: number;
  resetToken?: string;
  temporaryPassword?: string;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: AuthUser;
  session?: {
    sessionId: string;
    createdAt: number;
    expiresAt: number;
    isReauthenticated: boolean;
    reauthenticatedUntil: number | null;
  };
  error?: string;
}

export interface ManagedUserItem {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'contributor' | 'vip' | 'guide';
  tier: 'Explorer Free' | 'Trailblazer Pro' | 'Cartographer Enterprise';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  lastActive: string;
  savedTripsCount: number;
  totalSpentUSD: number;
  country: string;
}

export interface PaymentItem {
  id: string;
  transactionRef: string;
  userEmail: string;
  userName: string;
  amountUSD: number;
  plan: string;
  status: 'completed' | 'refunded' | 'failed' | 'pending';
  method: string;
  timestamp: string;
  refundReason?: string;
  refundedBy?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  eventType: string;
  actorEmail: string;
  actorRole: string;
  actorIp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  details: string;
}

export interface SecurityAlertItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  sourceIp?: string;
  status: 'active' | 'investigating' | 'resolved';
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface StaffMemberItem {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  mfaEnabled: boolean;
  createdAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
  isActive: boolean;
  hasBackupCodes: boolean;
}

export interface SystemHealthData {
  status: 'healthy' | 'degraded' | 'critical';
  uptimeSeconds: number;
  memoryUsageMb: number;
  totalMemoryMb: number;
  nodeVersion: string;
  platform: string;
  apiLatencyMs: number;
  databaseConnections: number;
  lastBackupTimestamp: string;
  activeSessionsCount: number;
  totalAuditEntriesCount: number;
  securityHealthScore: number;
}

export interface BackupItem {
  id: string;
  filename: string;
  timestamp: string;
  sizeBytes: number;
  recordCounts: {
    users: number;
    auditLogs: number;
    payments: number;
    staff: number;
    candidates: number;
  };
  checksum: string;
  createdBy: string;
}

export interface PlatformSettingsData {
  siteName: string;
  maintenanceMode: boolean;
  publicRegistrationEnabled: boolean;
  requireEmailVerification: boolean;
  defaultCurrency: string;
  sessionTimeoutHours: number;
  maxFailedLoginAttempts: number;
  lockoutDurationMinutes: number;
  strictMfaEnforced: boolean;
  contentCachingHours: number;
  lastUpdated: string;
  updatedBy: string;
}

// Client-side token storage key
const TOKEN_KEY = 'travel_life_admin_jwt';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch {}
  return headers;
}

export const authApi = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },

  async checkSession(): Promise<SessionResponse> {
    try {
      const res = await fetch('/api/auth/me', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });

      if (!res.ok) {
        return { authenticated: false };
      }

      const data = await res.json();
      return {
        authenticated: !!data.authenticated,
        user: data.user,
        session: data.session
      };
    } catch {
      return { authenticated: false };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok && data.token && !data.mfaRequired) {
        this.setToken(data.token);
      }

      return data;
    } catch {
      return {
        success: false,
        error: 'Network connection failed. Unable to reach enterprise authentication server.'
      };
    }
  },

  async verifyMfa(mfaToken: string, code: string): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/mfa-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mfaToken, code }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok && data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch {
      return {
        success: false,
        error: 'MFA verification failed due to network error.'
      };
    }
  },

  async reauthenticate(credentials: { password?: string; code?: string }): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/auth/reauth', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Reauthentication request failed.' };
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
    } catch {}
    this.clearToken();
  },

  async logoutAllDevices(): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch('/api/auth/logout-all', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      this.clearToken();
      return await res.json();
    } catch {
      this.clearToken();
      return { success: true, message: 'Sessions cleared locally.' };
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message?: string; error?: string; resetToken?: string }> {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Recovery request failed.' };
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Password reset request failed.' };
    }
  },

  // ------------------------------------------
  // ADMIN DASHBOARD ENDPOINTS
  // ------------------------------------------

  async getMetrics(): Promise<any> {
    try {
      const res = await fetch('/api/admin/metrics', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return {};
    }
  },

  async getUsers(query?: { status?: string; tier?: string; search?: string }): Promise<{ users: ManagedUserItem[] }> {
    try {
      const params = new URLSearchParams();
      if (query?.status) params.set('status', query.status);
      if (query?.tier) params.set('tier', query.tier);
      if (query?.search) params.set('search', query.search);

      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { users: [] };
    }
  },

  async createUser(userData: Partial<ManagedUserItem>): Promise<{ success: boolean; user?: ManagedUserItem; error?: string }> {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Failed to create user.' };
    }
  },

  async updateUserStatus(id: string, status: 'active' | 'suspended' | 'pending', reason?: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`/api/admin/users/${id}/status`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ status, reason })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Failed to update user status.' };
    }
  },

  async updateUserTier(id: string, tier: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`/api/admin/users/${id}/tier`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ tier })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Failed to update user tier.' };
    }
  },

  async deleteUser(id: string): Promise<{ success: boolean; message?: string; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Failed to delete user.' };
    }
  },

  async getPayments(query?: { status?: string; search?: string }): Promise<{ payments: PaymentItem[] }> {
    try {
      const params = new URLSearchParams();
      if (query?.status) params.set('status', query.status);
      if (query?.search) params.set('search', query.search);

      const res = await fetch(`/api/admin/payments?${params.toString()}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { payments: [] };
    }
  },

  async refundPayment(id: string, reason: string): Promise<{ success: boolean; message?: string; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch(`/api/admin/payments/${id}/refund`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ reason })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Refund execution failed.' };
    }
  },

  async getMemberships(): Promise<{ plans: any[] }> {
    try {
      const res = await fetch('/api/admin/memberships', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { plans: [] };
    }
  },

  async getAuditLogs(query?: { eventType?: string; severity?: string; limit?: number }): Promise<{ logs: AuditLogItem[] }> {
    try {
      const params = new URLSearchParams();
      if (query?.eventType) params.set('eventType', query.eventType);
      if (query?.severity) params.set('severity', query.severity);
      if (query?.limit) params.set('limit', String(query.limit));

      const res = await fetch(`/api/admin/audit-logs?${params.toString()}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { logs: [] };
    }
  },

  async getSecurityAlerts(): Promise<{ alerts: SecurityAlertItem[] }> {
    try {
      const res = await fetch('/api/admin/security-alerts', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { alerts: [] };
    }
  },

  async resolveSecurityAlert(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`/api/admin/security-alerts/${id}/resolve`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  async getStaff(): Promise<{ staff: StaffMemberItem[] }> {
    try {
      const res = await fetch('/api/admin/staff', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { staff: [] };
    }
  },

  async inviteStaff(data: { email: string; name: string; role: AdminRole; tempPassword?: string }): Promise<{ success: boolean; staff?: StaffMemberItem; temporaryPassword?: string; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch('/api/admin/staff/invite', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Staff invite failed.' };
    }
  },

  async updateStaff(id: string, updates: { role?: AdminRole; isActive?: boolean }): Promise<{ success: boolean; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Staff update failed.' };
    }
  },

  async deleteStaff(id: string): Promise<{ success: boolean; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Staff deletion failed.' };
    }
  },

  async getSystemHealth(): Promise<SystemHealthData | null> {
    try {
      const res = await fetch('/api/admin/system/health', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getBackups(): Promise<{ backups: BackupItem[] }> {
    try {
      const res = await fetch('/api/admin/system/backups', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { backups: [] };
    }
  },

  async createBackupSnapshot(): Promise<{ success: boolean; backupRecord?: BackupItem; downloadPayload?: any; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch('/api/admin/system/backup-now', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Backup generation failed.' };
    }
  },

  async getSettings(): Promise<{ settings: PlatformSettingsData }> {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { settings: {} as any };
    }
  },

  async updateSettings(settings: Partial<PlatformSettingsData>): Promise<{ success: boolean; settings?: PlatformSettingsData; error?: string; requiresReauth?: boolean }> {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(settings)
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Settings update failed.' };
    }
  },

  // ------------------------------------------
  // EXISTING CARTOGRAPHY WAYPOINT WORKFLOW
  // ------------------------------------------

  async approveWaypoint(id: string, note?: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`/api/admin/approve/${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ note })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Approval request failed' };
    }
  },

  async triggerAudit(): Promise<{ success: boolean; summary?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/audit', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Audit trigger failed' };
    }
  }
};
