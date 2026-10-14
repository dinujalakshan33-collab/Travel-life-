export type AdminRole = 
  | 'super_admin' 
  | 'admin' 
  | 'content_manager' 
  | 'finance_manager' 
  | 'support_staff';

export type Permission = 
  | '*' // Super Admin wildcard
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'finance:read'
  | 'finance:write'
  | 'content:read'
  | 'content:write'
  | 'security:read'
  | 'security:write'
  | 'staff:read'
  | 'staff:write'
  | 'settings:read'
  | 'settings:write'
  | 'system:read'
  | 'system:backup'
  | 'support:write';

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: ['*'],
  admin: [
    'users:read', 'users:write',
    'content:read', 'content:write',
    'security:read',
    'system:read', 'system:backup',
    'support:write'
  ],
  content_manager: [
    'content:read', 'content:write',
    'system:read'
  ],
  finance_manager: [
    'finance:read', 'finance:write',
    'users:read',
    'system:read'
  ],
  support_staff: [
    'users:read',
    'support:write',
    'content:read',
    'system:read'
  ]
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  mfaEnabled: boolean;
  mfaSecret: string; // Base32 or seed for TOTP
  backupCodes: string[]; // Hashed or plaintext 8-character recovery codes
  createdAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
  isActive: boolean;
}

export interface AdminSession {
  sessionId: string;
  adminId: string;
  email: string;
  role: AdminRole;
  createdAt: number;
  expiresAt: number;
  lastActiveAt: number;
  ipAddress: string;
  userAgent: string;
  reauthenticatedAt?: number; // timestamp when reauth was last verified
}

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type AuditEventType = 
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGIN_LOCKOUT'
  | 'MFA_CHALLENGE'
  | 'MFA_VERIFIED'
  | 'MFA_FAILED'
  | 'MFA_RECOVERY_USED'
  | 'REAUTH_SUCCESS'
  | 'REAUTH_FAILED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_COMPLETED'
  | 'PASSWORD_CHANGED'
  | 'LOGOUT'
  | 'LOGOUT_ALL_DEVICES'
  | 'USER_STATUS_CHANGE'
  | 'USER_ROLE_CHANGE'
  | 'USER_DELETED'
  | 'USER_CREATED'
  | 'PAYMENT_REFUND_ISSUED'
  | 'MEMBERSHIP_TIER_UPDATED'
  | 'CONTENT_PUBLISHED'
  | 'CONTENT_ARCHIVED'
  | 'WAYPOINT_APPROVED'
  | 'GEO_AUDIT_TRIGGERED'
  | 'STAFF_INVITED'
  | 'STAFF_ROLE_UPDATED'
  | 'STAFF_DEACTIVATED'
  | 'SECURITY_ALERT_RESOLVED'
  | 'PLATFORM_SETTINGS_UPDATED'
  | 'BACKUP_CREATED'
  | 'UNAUTHORIZED_ACCESS_ATTEMPT';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: AuditEventType;
  actorEmail: string;
  actorRole: AdminRole | 'unauthenticated' | 'system';
  actorIp: string;
  severity: AuditSeverity;
  details: string;
  metadata?: Record<string, any>;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: AuditSeverity;
  sourceIp?: string;
  status: 'active' | 'investigating' | 'resolved';
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'member' | 'contributor' | 'vip' | 'guide';
  tier: 'Explorer Free' | 'Trailblazer Pro' | 'Cartographer Enterprise';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  lastActive: string;
  savedTripsCount: number;
  totalSpentUSD: number;
  country: string;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  userEmail: string;
  userName: string;
  amountUSD: number;
  plan: string;
  status: 'completed' | 'refunded' | 'failed' | 'pending';
  method: 'Stripe Credit Card' | 'Apple Pay' | 'PayPal' | 'Google Pay';
  timestamp: string;
  refundReason?: string;
  refundedBy?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthlyUSD: number;
  priceAnnualUSD: number;
  activeMembers: number;
  features: string[];
  status: 'active' | 'legacy';
}

export interface PlatformSettings {
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

export interface SystemHealthStatus {
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
  securityHealthScore: number; // 0 - 100
}

export interface BackupRecord {
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
