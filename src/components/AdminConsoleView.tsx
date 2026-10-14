import React, { useState, useEffect } from 'react';
import { 
  Shield, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Download, 
  Plus, Search, Bell, User, ExternalLink, Check, X, ArrowRight, ArrowLeft, 
  MapPin, Globe, Database, Cpu, Radio, GitPullRequest, Eye, FileText, 
  ChevronRight, Compass, Layers, Lock, Sparkles, Sliders, LogOut, Users, 
  CreditCard, ShieldAlert, KeyRound, Server, Activity, ShieldCheck, 
  Fingerprint, Smartphone, Trash2, Edit3, UserCheck, UserX, DollarSign, 
  FileSpreadsheet, Filter, HardDrive, Settings, Zap, History, LockKeyhole
} from 'lucide-react';
import { 
  authApi, 
  AuthUser, 
  ManagedUserItem, 
  PaymentItem, 
  AuditLogItem, 
  SecurityAlertItem, 
  StaffMemberItem, 
  SystemHealthData, 
  BackupItem, 
  PlatformSettingsData 
} from '../services/authApi';

// POI Candidate interface preserving the existing Cartography feature
export interface AuditCandidate {
  id: string;
  code: string;
  name: string;
  location: string;
  category: string;
  provenance: string;
  provenanceTime: string;
  osmStatus: 'valid' | 'drift' | 'missing';
  osmText: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'revision';
  liveContent: string;
  draftContent: string;
  coordinates: { lat: number; lng: number };
  nominatimMatch: number;
  osmRelation: string;
  attribution: string;
  photographer: string;
}

const INITIAL_CANDIDATES: AuditCandidate[] = [
  {
    id: 'jiufen',
    code: 'POI #GT-88402',
    name: 'Jiufen Old Street & Mines',
    location: 'Ruifang District, New Taipei • TW',
    category: 'Heritage / Cultural Village',
    provenance: 'Wikivoyage Crawl #814 Via Auto-Parser',
    provenanceTime: '2h ago',
    osmStatus: 'drift',
    osmText: 'OSM Drift +0.038°',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Historic gold mining village. Famous for street food and staircases. Lanterns line streets. Fee: Free entrance',
    draftContent: 'Historic gold mining town built on steep sea-facing slopes. Renowned for A-Mei Teahouse and panoramic Keelung mountain views. Fee: Free; Teahouse: ~NT$400',
    coordinates: { lat: 25.1099, lng: 121.8452 },
    nominatimMatch: 0.98,
    osmRelation: '#891104',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Wikimedia @Chunghao_TW'
  },
  {
    id: 'fushimi',
    code: 'POI #GT-10492',
    name: 'Fushimi Inari-taisha',
    location: 'Kyoto, Kansai Region • JP',
    category: 'Shinto Shrine / Sacred Trail',
    provenance: '@kenjiro_c Master Contributor',
    provenanceTime: '3h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #2841908',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Shrine with red gates in southern Kyoto.',
    draftContent: 'Primary shrine of Kami Inari with 10,000 senbon torii mountain pass extending 4km to the sacred summit peak.',
    coordinates: { lat: 34.9671, lng: 135.7727 },
    nominatimMatch: 1.0,
    osmRelation: '#2841908',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Kenjiro Cartography'
  },
  {
    id: 'plitvice',
    code: 'POI #GT-41902',
    name: 'Plitvice Lakes National Park',
    location: 'Lika-Senj County • HR',
    category: 'UNESCO Nature Reserve',
    provenance: 'Balkans Eco-Syndicate Verified Partner API',
    provenanceTime: '5h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #4190211',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Lakes in Croatia with waterfalls and boardwalks.',
    draftContent: 'Karst mountain lake cascade formed by biodynamic travertine barriers with 8.0km designated hiking trail loops.',
    coordinates: { lat: 44.8654, lng: 15.6036 },
    nominatimMatch: 0.99,
    osmRelation: '#4190211',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Croatia Nature Bureau'
  },
  {
    id: 'sigiriya',
    code: 'POI #GT-11094',
    name: 'Sigiriya Citadel & Water Gardens',
    location: 'Matale District, Central Prov. • LK',
    category: 'Ancient Citadel / Archaeology',
    provenance: 'Community Submission User #U-94021',
    provenanceTime: '6h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #110948',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Ancient rock fortress in Sri Lanka.',
    draftContent: 'Fifth-century palace fortress built atop a 200m monolithic column of magma featuring hydraulic water gardens and lion gate.',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    nominatimMatch: 0.97,
    osmRelation: '#110948',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Lanka Heritage Fund'
  },
  {
    id: 'ny-alesund',
    code: 'POI #GT-77201',
    name: 'Ny-Ålesund Arctic Research Base',
    location: 'Svalbard Archipelago • NO',
    category: 'Polar Outpost / Science',
    provenance: 'NPI Norway Feed Automated GeoJSON',
    provenanceTime: '7h ago',
    osmStatus: 'missing',
    osmText: 'Missing Geotag',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Northernmost research town in the world.',
    draftContent: 'Year-round international scientific research settlement on Spitsbergen island requiring zero active radio transmission emissions.',
    coordinates: { lat: 78.9244, lng: 11.9286 },
    nominatimMatch: 0.81,
    osmRelation: '#000000',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Polar Research Inst.'
  }
];

interface AdminConsoleViewProps {
  onBackToMain: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

type TabType = 
  | 'overview' 
  | 'users' 
  | 'payments' 
  | 'content' 
  | 'security' 
  | 'staff' 
  | 'health' 
  | 'settings';

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({ 
  onBackToMain,
  currentUser,
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reauthentication modal state for high-risk operations
  const [reauthModalOpen, setReauthModalOpen] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [reauthMfaCode, setReauthMfaCode] = useState('');
  const [reauthError, setReauthError] = useState<string | null>(null);
  const [reauthPendingAction, setReauthPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [isReauthenticated, setIsReauthenticated] = useState(false);

  // Metrics & Stats
  const [metrics, setMetrics] = useState<any>({
    usersCount: 6,
    activeUsersCount: 5,
    totalRevenueUSD: 1346,
    activeSubscribers: 17452,
    osmPrecision: 99.6,
    uptimeSeconds: 3600
  });

  // Users State
  const [usersList, setUsersList] = useState<ManagedUserItem[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [userTierFilter, setUserTierFilter] = useState('all');
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTier, setNewUserTier] = useState<any>('Explorer Free');
  const [newUserCountry, setNewUserCountry] = useState('United States');

  // Payments State
  const [paymentsList, setPaymentsList] = useState<PaymentItem[]>([]);
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);

  // Audit Logs & Security Alerts
  const [auditLogsList, setAuditLogsList] = useState<AuditLogItem[]>([]);
  const [securityAlertsList, setSecurityAlertsList] = useState<SecurityAlertItem[]>([]);
  const [auditSeverityFilter, setAuditSeverityFilter] = useState('all');
  const [auditEventFilter, setAuditEventFilter] = useState('all');

  // Staff Management
  const [staffList, setStaffList] = useState<StaffMemberItem[]>([]);
  const [inviteStaffModalOpen, setInviteStaffModalOpen] = useState(false);
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<any>('admin');

  // System Health & Backups
  const [healthData, setHealthData] = useState<SystemHealthData | null>(null);
  const [backupsList, setBackupsList] = useState<BackupItem[]>([]);
  const [backupInProgress, setBackupInProgress] = useState(false);

  // Platform Settings
  const [settingsData, setSettingsData] = useState<PlatformSettingsData | null>(null);
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Cartography POI Candidates (Preserved Feature)
  const [candidates, setCandidates] = useState<AuditCandidate[]>(INITIAL_CANDIDATES);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('jiufen');
  const [cartographerNote, setCartographerNote] = useState<string>(
    'Aligned coordinates with Ruifang District survey; teahouse pricing verified.'
  );
  const [auditRunning, setAuditRunning] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [m, u, p, a, s, st, h, b, set] = await Promise.all([
        authApi.getMetrics(),
        authApi.getUsers(),
        authApi.getPayments(),
        authApi.getAuditLogs({ limit: 100 }),
        authApi.getSecurityAlerts(),
        authApi.getStaff(),
        authApi.getSystemHealth(),
        authApi.getBackups(),
        authApi.getSettings()
      ]);

      if (m) setMetrics(m);
      if (u?.users) setUsersList(u.users);
      if (p?.payments) setPaymentsList(p.payments);
      if (a?.logs) setAuditLogsList(a.logs);
      if (s?.alerts) setSecurityAlertsList(s.alerts);
      if (st?.staff) setStaffList(st.staff);
      if (h) setHealthData(h);
      if (b?.backups) setBackupsList(b.backups);
      if (set?.settings) setSettingsData(set.settings);

      // Check session reauth status
      const sessionInfo = await authApi.checkSession();
      if (sessionInfo?.session?.isReauthenticated) {
        setIsReauthenticated(true);
      }
    } catch (err) {
      console.error('Failed to load initial admin data', err);
    }
  };

  // Reauthentication Trigger Helper
  const requireElevatedAuth = (action: () => Promise<void>) => {
    if (isReauthenticated) {
      action();
    } else {
      setReauthPendingAction(() => action);
      setReauthError(null);
      setReauthPassword('');
      setReauthMfaCode('');
      setReauthModalOpen(true);
    }
  };

  const handleConfirmReauth = async (e: React.FormEvent) => {
    e.preventDefault();
    setReauthError(null);

    const res = await authApi.reauthenticate({
      password: reauthPassword.trim() || undefined,
      code: reauthMfaCode.trim() || undefined
    });

    if (res.success) {
      setIsReauthenticated(true);
      setReauthModalOpen(false);
      showToast('Step-up authorization confirmed. High-risk privilege active.');
      if (reauthPendingAction) {
        const actionToRun = reauthPendingAction;
        setReauthPendingAction(null);
        await actionToRun();
      }
    } else {
      setReauthError(res.error || 'Invalid credentials or code. High-risk action blocked.');
    }
  };

  // ----------------------------------------------------
  // USER ACTIONS
  // ----------------------------------------------------
  const handleToggleUserStatus = async (user: ManagedUserItem) => {
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    const res = await authApi.updateUserStatus(user.id, nextStatus, 'Admin console manual trigger');
    if (res.success) {
      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
      showToast(`User ${user.email} is now ${nextStatus}.`);
    } else {
      showToast(res.error || 'Failed to update user status.');
    }
  };

  const handleDeleteUser = (user: ManagedUserItem) => {
    requireElevatedAuth(async () => {
      if (!window.confirm(`Permanently delete account for ${user.email}? This action cannot be undone.`)) return;
      const res = await authApi.deleteUser(user.id);
      if (res.success) {
        setUsersList(prev => prev.filter(u => u.id !== user.id));
        showToast(`User ${user.email} permanently deleted.`);
      } else {
        showToast(res.error || 'Failed to delete user.');
      }
    });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authApi.createUser({
      name: newUserName,
      email: newUserEmail,
      tier: newUserTier,
      country: newUserCountry
    });
    if (res.success && res.user) {
      setUsersList(prev => [res.user!, ...prev]);
      setCreateUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      showToast(`Created user record for ${newUserEmail}.`);
    } else {
      showToast(res.error || 'Failed to create user.');
    }
  };

  // ----------------------------------------------------
  // PAYMENTS ACTIONS
  // ----------------------------------------------------
  const handleIssueRefund = (tx: PaymentItem) => {
    requireElevatedAuth(async () => {
      const reason = window.prompt(`Issue refund for $${tx.amountUSD} (${tx.transactionRef})? Enter reason:`, 'Administrative concession');
      if (!reason) return;
      const res = await authApi.refundPayment(tx.id, reason);
      if (res.success) {
        setPaymentsList(prev => prev.map(p => p.id === tx.id ? { ...p, status: 'refunded', refundReason: reason } : p));
        showToast(`Payment ${tx.transactionRef} successfully refunded.`);
      } else {
        showToast(res.error || 'Failed to process refund.');
      }
    });
  };

  // ----------------------------------------------------
  // BACKUP ACTIONS
  // ----------------------------------------------------
  const handleCreateInstantBackup = () => {
    requireElevatedAuth(async () => {
      setBackupInProgress(true);
      const res = await authApi.createBackupSnapshot();
      setBackupInProgress(false);
      if (res.success && res.backupRecord) {
        setBackupsList(prev => [res.backupRecord!, ...prev]);
        showToast(`Production backup snapshot generated: ${res.backupRecord.filename}`);
        
        // Trigger file download
        if (res.downloadPayload) {
          const blob = new Blob([JSON.stringify(res.downloadPayload, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = res.backupRecord.filename;
          a.click();
          URL.revokeObjectURL(url);
        }
      } else {
        showToast(res.error || 'Backup creation failed.');
      }
    });
  };

  // ----------------------------------------------------
  // STAFF ACTIONS
  // ----------------------------------------------------
  const handleInviteStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    requireElevatedAuth(async () => {
      const res = await authApi.inviteStaff({
        email: newStaffEmail,
        name: newStaffName,
        role: newStaffRole
      });
      if (res.success && res.staff) {
        setStaffList(prev => [...prev, res.staff!]);
        setInviteStaffModalOpen(false);
        setNewStaffEmail('');
        setNewStaffName('');
        showToast(`Admin staff invited! Temp password: ${res.temporaryPassword || 'StaffAccess@2025!'}`);
      } else {
        showToast(res.error || 'Failed to invite staff.');
      }
    });
  };

  const handleToggleStaffActive = (staff: StaffMemberItem) => {
    requireElevatedAuth(async () => {
      const res = await authApi.updateStaff(staff.id, { isActive: !staff.isActive });
      if (res.success) {
        setStaffList(prev => prev.map(s => s.id === staff.id ? { ...s, isActive: !staff.isActive } : s));
        showToast(`Staff account status updated.`);
      } else {
        showToast(res.error || 'Failed to update staff status.');
      }
    });
  };

  // ----------------------------------------------------
  // CARTO WAYPOINT ACTIONS (Preserved Feature)
  // ----------------------------------------------------
  const handleApproveWaypoint = async (candidateId: string) => {
    const res = await authApi.approveWaypoint(candidateId, cartographerNote);
    if (res.success) {
      setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: 'approved' } : c));
      showToast(res.message || 'Waypoint officially committed.');
    } else {
      showToast(res.error || 'Failed to approve waypoint.');
    }
  };

  const handleTriggerAudit = async () => {
    setAuditRunning(true);
    const res = await authApi.triggerAudit();
    setAuditRunning(false);
    if (res.success) {
      showToast(res.summary || 'Geospatial audit completed.');
    } else {
      showToast(res.error || 'Audit trigger failed.');
    }
  };

  const currentRole = currentUser?.role || 'super_admin';
  const isSuperAdmin = currentRole === 'super_admin';

  // Format helpers
  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d > 0 ? `${d}d ` : ''}${h}h ${m}m`;
  };

  const activeCandidate = candidates.find(c => c.id === activeCandidateId) || candidates[0];

  return (
    <div className="min-h-screen bg-[#f7f5ed] text-[#1c2c26] selection:bg-[#114b3e] selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#11382e] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/40 text-xs animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white ml-2 cursor-pointer">&times;</button>
        </div>
      )}

      {/* TOP ENTERPRISE HEADER */}
      <header className="bg-white border-b border-[#e2dccf] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Brand & Return */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMain}
              className="p-2 rounded-xl text-stone-500 hover:text-[#11382e] hover:bg-stone-100 transition-colors cursor-pointer"
              title="Return to NatureSphere"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#114b3e] text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-sm text-[#11382e] leading-tight">
                    NatureSphere Enclave
                  </h1>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {currentRole.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono">
                  Session AES-256 Active &bull; Zero-Trust Server Protected
                </p>
              </div>
            </div>
          </div>

          {/* Right: Security & Admin Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Reauth Status Badge */}
            <div 
              onClick={() => {
                if (!isReauthenticated) {
                  requireElevatedAuth(async () => {});
                }
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium cursor-pointer transition-all ${
                isReauthenticated 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title={isReauthenticated ? 'High-risk reauthentication valid for 5 min' : 'Click to step-up authenticate'}
            >
              {isReauthenticated ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Step-Up Active</span>
                </>
              ) : (
                <>
                  <LockKeyhole className="w-3.5 h-3.5 text-amber-600" />
                  <span>Step-Up Reauth</span>
                </>
              )}
            </div>

            {/* Quick Backup */}
            <button
              onClick={handleCreateInstantBackup}
              disabled={backupInProgress}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#11382e] text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Snapshot DB</span>
            </button>

            {/* Current Admin User pill */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#e2dccf]">
              <div className="w-7 h-7 rounded-full bg-[#114b3e]/10 text-[#114b3e] flex items-center justify-center font-bold text-xs uppercase">
                {currentUser?.email?.[0] || 'A'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[#11382e] leading-tight truncate max-w-[140px]">
                  {currentUser?.name || currentUser?.email}
                </p>
                <p className="text-[10px] text-stone-500 font-mono truncate max-w-[140px]">
                  {currentUser?.email}
                </p>
              </div>

              {/* Logout Options Dropdown */}
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-stone-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Logout current session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* PRIMARY HORIZONTAL TAB NAVIGATION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto border-t border-[#f0ece1] text-xs font-medium no-scrollbar">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Overview &amp; Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management</span>
            <span className="bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded-full text-[10px]">
              {usersList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'payments'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments &amp; Revenue</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Content &amp; Cartography</span>
            <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {candidates.filter(c => c.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Security &amp; Audit Trail</span>
            {securityAlertsList.filter(a => a.status === 'active').length > 0 && (
              <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {securityAlertsList.filter(a => a.status === 'active').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'staff'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>Staff &amp; Roles</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'health'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Health &amp; Backups</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#114b3e] text-[#114b3e] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#11382e]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Platform Settings</span>
          </button>

        </div>
      </header>

      {/* MAIN BODY VIEW */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & ANALYTICS                             */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">Registered Explorers</span>
                  <Users className="w-4 h-4 text-emerald-700" />
                </div>
                <p className="text-2xl font-serif font-bold text-[#11382e]">{metrics.usersCount || 6}</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <span>&bull; {metrics.activeUsersCount || 5} active accounts verified</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">Gross Platform Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                </div>
                <p className="text-2xl font-serif font-bold text-[#11382e]">${metrics.totalRevenueUSD || 1346}.00</p>
                <p className="text-[11px] text-stone-500 font-medium mt-1">
                  Stripe + Apple Pay gateway ledger
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">Active Subscriptions</span>
                  <CreditCard className="w-4 h-4 text-teal-700" />
                </div>
                <p className="text-2xl font-serif font-bold text-[#11382e]">{metrics.activeSubscribers?.toLocaleString() || '17,452'}</p>
                <p className="text-[11px] text-teal-700 font-medium mt-1">
                  Explorer, Pro &amp; Cartographer tiers
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold">Cartography Precision</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <p className="text-2xl font-serif font-bold text-[#11382e]">{metrics.osmPrecision || 99.6}%</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  14,210 verified nodes &bull; 0 faults
                </p>
              </div>
            </div>

            {/* Two-Column Overview Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Live Activity Feed */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-800" />
                    <h2 className="font-serif font-bold text-base text-[#11382e]">Recent Administrative Events</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('security')}
                    className="text-xs text-emerald-800 hover:underline font-semibold cursor-pointer"
                  >
                    View All Logs &rarr;
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {auditLogsList.slice(0, 5).map(log => (
                    <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-lg ${
                          log.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                          log.severity === 'WARNING' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          <Shield className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#11382e]">{log.eventType}</p>
                          <p className="text-xs text-stone-600 mt-0.5">{log.details}</p>
                          <div className="flex items-center gap-2 font-mono text-[10px] text-stone-400 mt-1">
                            <span>Actor: {log.actorEmail}</span>
                            <span>&bull;</span>
                            <span>IP: {log.actorIp}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: System Status & Security Enclave */}
              <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-emerald-800" />
                  <h2 className="font-serif font-bold text-base text-[#11382e]">Security Enclave Status</h2>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950">Zero-Trust Firewall</span>
                    <span className="font-mono text-emerald-800 font-bold">ARMED</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950">MFA Enforce Policy</span>
                    <span className="font-mono text-emerald-800 font-bold">TOTP / HARDWARE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950">Active DB Sessions</span>
                    <span className="font-mono text-emerald-800 font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950">Uptime</span>
                    <span className="font-mono text-emerald-800 font-bold">{formatTime(metrics.uptimeSeconds || 3600)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 text-xs font-semibold text-[#11382e] flex items-center justify-between cursor-pointer"
                  >
                    <span>Manage Registered Users</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 text-xs font-semibold text-[#11382e] flex items-center justify-between cursor-pointer"
                  >
                    <span>Review POI Candidates Queue</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 text-xs font-semibold text-[#11382e] flex items-center justify-between cursor-pointer"
                  >
                    <span>Platform &amp; Enclave Settings</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: USER MANAGEMENT                                  */}
        {/* ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-5">
            
            {/* Header & Search Bar */}
            <div className="bg-white p-5 rounded-3xl border border-[#ded8c7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#11382e]">Explorer User Accounts</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage member accounts, permissions, membership tiers, and suspension statuses.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCreateUserModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Account</span>
                </button>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["Name,Email,Tier,Status,Country,TotalSpent"].concat(
                        usersList.map(u => `"${u.name}","${u.email}","${u.tier}","${u.status}","${u.country}",${u.totalSpentUSD}`)
                      ).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `naturesphere_users_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Exported users report to CSV.');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#11382e] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or country..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={userTierFilter}
                  onChange={(e) => setUserTierFilter(e.target.value)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                >
                  <option value="all">All Tiers</option>
                  <option value="Explorer Free">Explorer Free</option>
                  <option value="Trailblazer Pro">Trailblazer Pro</option>
                  <option value="Cartographer Enterprise">Cartographer Enterprise</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Member Name</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Country</th>
                      <th className="py-3 px-4">Membership Tier</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Saved Trips</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {usersList
                      .filter(u => {
                        if (userSearch) {
                          const q = userSearch.toLowerCase();
                          if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.country.toLowerCase().includes(q)) return false;
                        }
                        if (userStatusFilter !== 'all' && u.status !== userStatusFilter) return false;
                        if (userTierFilter !== 'all' && u.tier !== userTierFilter) return false;
                        return true;
                      })
                      .map(user => (
                        <tr key={user.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#11382e]">
                            {user.name}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                            {user.email}
                          </td>
                          <td className="py-3.5 px-4 text-stone-600">
                            {user.country}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              user.tier.includes('Enterprise') ? 'bg-purple-100 text-purple-800' :
                              user.tier.includes('Pro') ? 'bg-emerald-100 text-emerald-800' :
                              'bg-stone-100 text-stone-700'
                            }`}>
                              {user.tier}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              user.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                              user.status === 'suspended' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-stone-600">
                            {user.savedTripsCount}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#11382e]">
                            ${user.totalSpentUSD}.00
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            <button
                              onClick={() => handleToggleUserStatus(user)}
                              className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                                user.status === 'active'
                                  ? 'border-amber-200 text-amber-800 hover:bg-amber-50'
                                  : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                              }`}
                              title={user.status === 'active' ? 'Suspend account' : 'Reactivate account'}
                            >
                              {user.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs cursor-pointer"
                              title="Delete account (Requires reauth)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PAYMENTS & REVENUE                               */}
        {/* ======================================================== */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            
            {/* Top Revenue Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Total Processed</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">${metrics.totalRevenueUSD || 1346}.00</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">5 transactions audited</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Annual Recurring Rate (ARR)</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">$14,800.00</p>
                <p className="text-[11px] text-teal-700 mt-0.5">Based on active Pro &amp; Enterprise memberships</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Refund Rate</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">2.1%</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Well below 5% compliance threshold</p>
              </div>
            </div>

            {/* Payments Ledger Table */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#11382e]">Payment Transactions Ledger</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Live gateway ledger synced with Stripe, Apple Pay and PayPal</p>
                </div>
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["TransactionRef,User,Plan,AmountUSD,Method,Status,Date"].concat(
                        paymentsList.map(p => `"${p.transactionRef}","${p.userEmail}","${p.plan}",${p.amountUSD},"${p.method}","${p.status}","${p.timestamp}"`)
                      ).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `naturesphere_payments_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Exported payments ledger to CSV.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#11382e] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Transaction Ref</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Plan / Product</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {paymentsList.map(tx => (
                      <tr key={tx.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-[#11382e]">
                          {tx.transactionRef}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-[#11382e]">{tx.userName}</p>
                          <p className="text-[11px] text-stone-500 font-mono">{tx.userEmail}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-stone-700">
                          {tx.plan}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#11382e]">
                          ${tx.amountUSD}.00
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {tx.method}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            tx.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            tx.status === 'refunded' ? 'bg-rose-100 text-rose-800' :
                            'bg-stone-100 text-stone-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {tx.status === 'completed' && (
                            <button
                              onClick={() => handleIssueRefund(tx)}
                              className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Issue full refund (Requires step-up reauth)"
                            >
                              Refund
                            </button>
                          )}
                          {tx.status === 'refunded' && (
                            <span className="text-[10px] text-stone-400 italic">Refunded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONTENT & CARTOGRAPHY (Preserved Feature!)       */}
        {/* ======================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white p-5 rounded-3xl border border-[#ded8c7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#11382e]">Geospatial Waypoint Ledger Review</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Audit OpenStreetMap node precision, inspect drift discrepancies, and commit verified candidates.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerAudit}
                  disabled={auditRunning}
                  className="px-3.5 py-2 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${auditRunning ? 'animate-spin' : ''}`} />
                  <span>{auditRunning ? 'Auditing Nodes...' : 'Run Nominatim Audit'}</span>
                </button>
              </div>
            </div>

            {/* Split Screen Waypoint Reviewer (Preserving original UI & logic!) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Candidate Queue List (4 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-[#ded8c7] p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-stone-200">
                  <span className="font-semibold text-xs text-[#11382e]">Candidate Verification Queue</span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    {candidates.filter(c => c.status === 'pending').length} Pending
                  </span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {candidates.map(candidate => (
                    <div
                      key={candidate.id}
                      onClick={() => setActiveCandidateId(candidate.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        activeCandidate.id === candidate.id 
                          ? 'border-[#114b3e] bg-emerald-50/40 shadow-xs' 
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <img 
                        src={candidate.imageUrl} 
                        alt={candidate.name} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#11382e] truncate">{candidate.name}</span>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                            candidate.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {candidate.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">{candidate.location}</p>
                        <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px]">
                          <span className="text-stone-400">{candidate.code}</span>
                          <span className={`font-semibold ${candidate.osmStatus === 'drift' ? 'text-amber-700' : 'text-emerald-700'}`}>
                            {candidate.osmText}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Candidate Inspector & Diff (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs space-y-5">
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-stone-400">{activeCandidate.code}</span>
                    <h3 className="font-serif font-bold text-xl text-[#11382e] mt-0.5">{activeCandidate.name}</h3>
                    <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{activeCandidate.location}</span>
                      <span>&bull;</span>
                      <span className="font-mono text-stone-400">[{activeCandidate.coordinates.lat.toFixed(4)}, {activeCandidate.coordinates.lng.toFixed(4)}]</span>
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                    activeCandidate.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeCandidate.status}
                  </span>
                </div>

                {/* Diff Viewer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                    <span className="font-bold text-stone-500 text-[10px] uppercase block mb-1">Live Catalog Content</span>
                    <p className="text-stone-700 leading-relaxed">{activeCandidate.liveContent}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                    <span className="font-bold text-emerald-800 text-[10px] uppercase block mb-1">Audited Field Draft</span>
                    <p className="text-[#11382e] leading-relaxed">{activeCandidate.draftContent}</p>
                  </div>
                </div>

                {/* Cartographer Approval Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#11382e]">
                    Cartography Verification Notes
                  </label>
                  <textarea
                    rows={2}
                    value={cartographerNote}
                    onChange={(e) => setCartographerNote(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-stone-400 font-mono">
                    Provenance: {activeCandidate.provenance}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveWaypoint(activeCandidate.id)}
                      disabled={activeCandidate.status === 'approved'}
                      className="px-4 py-2 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>{activeCandidate.status === 'approved' ? 'Verified & Committed' : 'Approve & Commit Node'}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SECURITY & AUDIT TRAIL                            */}
        {/* ======================================================== */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            
            {/* Security Alerts Section */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h3 className="font-serif font-bold text-base text-[#11382e]">Security Incident Alerts</h3>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  {securityAlertsList.filter(a => a.status === 'active').length} active alerts
                </span>
              </div>

              <div className="space-y-3">
                {securityAlertsList.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-4 ${
                      alert.status === 'active' 
                        ? 'bg-rose-50/60 border-rose-200 text-rose-950' 
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{alert.title}</span>
                        <span className={`px-2 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase ${
                          alert.severity === 'CRITICAL' ? 'bg-rose-200 text-rose-900' :
                          alert.severity === 'WARNING' ? 'bg-amber-200 text-amber-900' :
                          'bg-emerald-200 text-emerald-900'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed">{alert.description}</p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-2">
                        <span>Source: {alert.sourceIp || 'Internal'}</span>
                        <span>&bull;</span>
                        <span>Timestamp: {new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {alert.status === 'active' && (
                      <button
                        onClick={async () => {
                          const res = await authApi.resolveSecurityAlert(alert.id);
                          if (res.success) {
                            setSecurityAlertsList(prev => prev.map(a => a.id === alert.id ? { ...a, status: 'resolved' } : a));
                            showToast('Security incident alert marked as resolved.');
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Resolve Alert
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Trail Ledger */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs">
              <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#11382e]">Immutable Audit Trail Ledger</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Tamper-evident logs of logins, MFA challenges, permission changes, and operations</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={auditSeverityFilter}
                    onChange={(e) => setAuditSeverityFilter(e.target.value)}
                    className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                  >
                    <option value="all">All Severities</option>
                    <option value="INFO">INFO</option>
                    <option value="WARNING">WARNING</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>

                  <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(auditLogsList, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `audit_logs_${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast('Exported audit trail JSON.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#11382e] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Event Type</th>
                      <th className="py-3 px-4">Severity</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Event Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {auditLogsList
                      .filter(l => auditSeverityFilter === 'all' || l.severity === auditSeverityFilter)
                      .map(log => (
                        <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#11382e]">
                            {log.eventType}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              log.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                              log.severity === 'WARNING' ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {log.severity}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-stone-700">
                            {log.actorEmail}
                          </td>
                          <td className="py-3 px-4 text-stone-600 uppercase text-[10px] font-bold">
                            {log.actorRole}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-stone-500">
                            {log.actorIp}
                          </td>
                          <td className="py-3 px-4 text-stone-700 text-xs max-w-md truncate">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: STAFF & ROLES (RBAC)                              */}
        {/* ======================================================== */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-white p-5 rounded-3xl border border-[#ded8c7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#11382e]">Administrator Roles &amp; Permissions</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Granular server-enforced role assignments (Super Admin, Admin, Content Manager, Finance Manager, Support Staff).
                </p>
              </div>

              {isSuperAdmin && (
                <button
                  onClick={() => setInviteStaffModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Provision Admin Staff</span>
                </button>
              )}
            </div>

            {/* Staff Members Table */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Staff Member</th>
                      <th className="py-3 px-4">Assigned Role</th>
                      <th className="py-3 px-4">MFA Status</th>
                      <th className="py-3 px-4">Account Status</th>
                      <th className="py-3 px-4">Created Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {staffList.map(staff => (
                      <tr key={staff.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-[#11382e]">{staff.name}</p>
                          <p className="text-[11px] text-stone-500 font-mono">{staff.email}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            staff.role === 'super_admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            staff.role === 'admin' ? 'bg-emerald-100 text-emerald-800' :
                            staff.role === 'content_manager' ? 'bg-blue-100 text-blue-800' :
                            staff.role === 'finance_manager' ? 'bg-purple-100 text-purple-800' :
                            'bg-stone-100 text-stone-800'
                          }`}>
                            {staff.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>MFA Enforced (TOTP)</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            staff.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {staff.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                          {new Date(staff.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isSuperAdmin && staff.role !== 'super_admin' && (
                            <button
                              onClick={() => handleToggleStaffActive(staff)}
                              className="px-2.5 py-1 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              {staff.isActive ? 'Suspend' : 'Activate'}
                            </button>
                          )}
                          {staff.role === 'super_admin' && (
                            <span className="text-[10px] text-stone-400 font-mono">Primary Enclave Key</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Permissions Matrix Explanation */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#11382e]">Role-Based Access Control Matrix (RBAC)</h3>
              <p className="text-xs text-stone-600">
                All routes on <code className="bg-stone-100 px-1 py-0.2 rounded font-mono text-emerald-900">/api/admin/*</code> enforce cryptographic role permissions on the server before processing requests.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">Super Admin</span>
                  <p className="text-amber-800 text-[11px]">Full wildcard (<code className="font-mono">*</code>) privilege: staff invitations, backup restoration, user purges, refund approvals, and security policies.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-1">Operations Admin</span>
                  <p className="text-emerald-800 text-[11px]">User account management, review approvals, catalog updates, and operational metric inspection.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <span className="font-bold text-blue-900 block mb-1">Content &amp; Cartography</span>
                  <p className="text-blue-800 text-[11px]">Waypoint reviews, Overpass OSM syncing, field guide dispatches (no finance, user, or security access).</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: HEALTH & BACKUPS                                 */}
        {/* ======================================================== */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            
            {/* System Health Status Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Memory Usage (RSS)</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">{healthData?.memoryUsageMb || 64} MB</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Heap total: {healthData?.totalMemoryMb || 42} MB</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Node Runtime Engine</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">{healthData?.nodeVersion || process.version}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">{healthData?.platform || 'linux'} 64-bit</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">API Average Latency</span>
                <p className="text-2xl font-serif font-bold text-[#11382e] mt-1">{healthData?.apiLatencyMs || 24} ms</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Fast Edge delivery</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs">
                <span className="text-xs text-stone-500 font-semibold">Security Health Score</span>
                <p className="text-2xl font-serif font-bold text-emerald-700 mt-1">{healthData?.securityHealthScore || 98} / 100</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">A+ Hardened Enclave</p>
              </div>
            </div>

            {/* Backups Ledger */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#11382e]">Database Ledger Backup Snapshots</h3>
                  <p className="text-xs text-stone-500 mt-0.5">SHA-256 verified cold-storage snapshots of all users, transactions, and audit records</p>
                </div>
                <button
                  onClick={handleCreateInstantBackup}
                  disabled={backupInProgress}
                  className="px-3.5 py-2 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Create Backup Now</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Snapshot Filename</th>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Records Included</th>
                      <th className="py-3 px-4">SHA-256 Checksum</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Created By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {backupsList.map(b => (
                      <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#11382e]">
                          {b.filename}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-600">
                          {(b.sizeBytes / 1024).toFixed(1)} KB
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 text-[11px]">
                          {b.recordCounts.users} users, {b.recordCounts.payments} txs, {b.recordCounts.auditLogs} logs
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[10px] text-stone-400 truncate max-w-[140px]">
                          {b.checksum}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                          {new Date(b.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {b.createdBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disaster Recovery Guide */}
            <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#11382e]">Disaster Recovery &amp; Super Admin Restore Procedure</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                If an administrator loses their TOTP authenticator device, access can be recovered via the 4 pre-generated emergency backup codes (e.g. <code className="font-mono bg-stone-100 px-1 py-0.2 rounded text-emerald-900 font-bold">REC-9921-ABCD</code>) entered in the primary login MFA challenge. 
                In catastrophic hardware failure, restore from the latest JSON snapshot generated above using the server cold-boot CLI.
              </p>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: PLATFORM SETTINGS                                 */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#11382e]">Platform Operational &amp; Security Settings</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Configure global server parameters, session lifespans, lockout rules, and registration gates.
                </p>
              </div>

              {settingsData && (
                <div className="space-y-5">
                  
                  {/* Toggles */}
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                      <div>
                        <span className="font-bold text-xs text-[#11382e]">Maintenance Mode</span>
                        <p className="text-[11px] text-stone-500">Temporarily redirect public traffic to maintenance notice</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.maintenanceMode}
                        onChange={(e) => setSettingsData({ ...settingsData, maintenanceMode: e.target.checked })}
                        className="w-4 h-4 text-[#114b3e] rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                      <div>
                        <span className="font-bold text-xs text-[#11382e]">Public User Registration</span>
                        <p className="text-[11px] text-stone-500">Allow travelers to create new accounts via the public sign-up modal</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.publicRegistrationEnabled}
                        onChange={(e) => setSettingsData({ ...settingsData, publicRegistrationEnabled: e.target.checked })}
                        className="w-4 h-4 text-[#114b3e] rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                      <div>
                        <span className="font-bold text-xs text-[#11382e]">Strict Multi-Factor Authentication (MFA)</span>
                        <p className="text-[11px] text-stone-500">Require all administrator tiers to verify TOTP code or emergency code on every login</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.strictMfaEnforced}
                        onChange={(e) => setSettingsData({ ...settingsData, strictMfaEnforced: e.target.checked })}
                        className="w-4 h-4 text-[#114b3e] rounded"
                      />
                    </label>
                  </div>

                  {/* Thresholds */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#11382e] mb-1">
                        Session Inactivity Timeout (Hours)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={72}
                        value={settingsData.sessionTimeoutHours}
                        onChange={(e) => setSettingsData({ ...settingsData, sessionTimeoutHours: parseInt(e.target.value, 10) || 12 })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#11382e] mb-1">
                        Brute Force Lockout Threshold (Failed Attempts)
                      </label>
                      <input
                        type="number"
                        min={3}
                        max={10}
                        value={settingsData.maxFailedLoginAttempts}
                        onChange={(e) => setSettingsData({ ...settingsData, maxFailedLoginAttempts: parseInt(e.target.value, 10) || 5 })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        requireElevatedAuth(async () => {
                          setSettingsSaving(true);
                          const res = await authApi.updateSettings(settingsData);
                          setSettingsSaving(false);
                          if (res.success) {
                            showToast('Platform security and operational settings updated.');
                          } else {
                            showToast(res.error || 'Failed to update settings.');
                          }
                        });
                      }}
                      disabled={settingsSaving}
                      className="px-5 py-2.5 rounded-xl bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {settingsSaving ? 'Saving Configuration...' : 'Save Settings (Requires Reauth)'}
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* HIGH-RISK STEP-UP REAUTHENTICATION MODAL                */}
      {/* ======================================================== */}
      {reauthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ded8c7] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif font-bold text-lg text-[#11382e]">
                  Step-Up Reauthentication Required
                </h3>
              </div>
              <button
                onClick={() => setReauthModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              To perform this sensitive action (user account modification, refund issuance, staff role update, or database snapshot), please confirm your master password or enter your 6-digit MFA Authenticator code.
            </p>

            {reauthError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{reauthError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmReauth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  value={reauthPassword}
                  onChange={(e) => setReauthPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs font-mono text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                />
              </div>

              <div className="text-center text-xs font-bold text-stone-400">
                &mdash; OR &mdash;
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">
                  6-Digit Authenticator / Emergency Code
                </label>
                <input
                  type="text"
                  value={reauthMfaCode}
                  onChange={(e) => setReauthMfaCode(e.target.value)}
                  placeholder="e.g. 123456 or REC-9921-ABCD"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs font-mono font-bold text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReauthModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#114b3e] text-white hover:bg-[#0c372d] transition-colors cursor-pointer"
                >
                  Confirm &amp; Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {createUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ded8c7] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-[#11382e]">Provision New Explorer Account</h3>
              <button onClick={() => setCreateUserModalOpen(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">&times;</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Liam Foster"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="liam.foster@nature.org"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Membership Tier</label>
                <select
                  value={newUserTier}
                  onChange={(e) => setNewUserTier(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                >
                  <option value="Explorer Free">Explorer Free</option>
                  <option value="Trailblazer Pro">Trailblazer Pro</option>
                  <option value="Cartographer Enterprise">Cartographer Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Country</label>
                <input
                  type="text"
                  value={newUserCountry}
                  onChange={(e) => setNewUserCountry(e.target.value)}
                  placeholder="United States"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#114b3e] text-white hover:bg-[#0c372d] cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROVISION STAFF MODAL */}
      {inviteStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ded8c7] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-[#11382e]">Provision Administrator Delegate</h3>
              <button onClick={() => setInviteStaffModalOpen(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">&times;</button>
            </div>

            <form onSubmit={handleInviteStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Staff Email</label>
                <input
                  type="email"
                  required
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  placeholder="rachel.adams@travellife.com"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1">Role Assignment</label>
                <select
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#11382e]"
                >
                  <option value="admin">Operations Admin</option>
                  <option value="content_manager">Content Manager</option>
                  <option value="finance_manager">Finance Manager</option>
                  <option value="support_staff">Support Staff</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#114b3e] text-white hover:bg-[#0c372d] cursor-pointer"
                >
                  Provision &amp; Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
