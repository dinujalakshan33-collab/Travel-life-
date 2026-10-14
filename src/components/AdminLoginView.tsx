import React, { useState, useEffect } from 'react';
import { 
  Compass, Lock, Mail, Eye, EyeOff, Shield, ShieldAlert, ArrowLeft, 
  Sparkles, AlertCircle, CheckCircle2, KeyRound, RefreshCw, Smartphone, 
  HelpCircle, ChevronDown, ChevronUp, Fingerprint, ShieldCheck, LifeBuoy
} from 'lucide-react';
import { authApi, AuthUser } from '../services/authApi';

interface AdminLoginViewProps {
  onLoginSuccess: (user: AuthUser) => void;
  onBackToHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onBackToHome
}) => {
  // Step 1: Primary credentials
  const [email, setEmail] = useState('dinujalakshan33@gmail.com');
  const [password, setPassword] = useState('TravelLife@Admin2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  // Step 2: MFA Challenge state
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaToken, setMfaToken] = useState<string>('');
  const [mfaCode, setMfaCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [mfaUserPreview, setMfaUserPreview] = useState<{ email: string; name?: string; role?: string } | null>(null);

  // Quick helper drawer for roles/demo accounts
  const [showRoleCredentials, setShowRoleCredentials] = useState(false);

  // Recovery modal state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoveryStage, setRecoveryStage] = useState<'request' | 'reset'>('request');
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  // Primary Login Submit (Step 1)
  const handleSubmitPrimary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setIsLoading(true);
    setErrorMessage(null);

    const result = await authApi.login(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      if (result.mfaRequired && result.mfaToken) {
        setMfaRequired(true);
        setMfaToken(result.mfaToken);
        setMfaUserPreview(result.user || { email });
        setMfaCode('');
      } else if (result.user) {
        onLoginSuccess(result.user);
      }
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify administrator credentials.');
      if (result.remainingSeconds && result.remainingSeconds > 0) {
        setLockoutSeconds(result.remainingSeconds);
      }
      if (typeof result.attemptsLeft === 'number') {
        setAttemptsLeft(result.attemptsLeft);
      }
    }
  };

  // MFA Submit (Step 2)
  const handleSubmitMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    const result = await authApi.verifyMfa(mfaToken, mfaCode.trim());
    setIsLoading(false);

    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setErrorMessage(result.error || 'Invalid verification code. Please check your Authenticator or backup code.');
    }
  };

  // Password recovery request
  const handleRequestRecoveryToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);
    setRecoveryError(null);
    setRecoveryMessage(null);

    const result = await authApi.forgotPassword(recoveryEmail.trim());
    setIsRecovering(false);

    if (result.success) {
      setRecoveryMessage(result.message || 'Recovery instructions sent.');
      if (result.resetToken) {
        setRecoveryToken(result.resetToken);
        setRecoveryStage('reset');
      }
    } else {
      setRecoveryError('Failed to initiate recovery. Please verify your administrator email.');
    }
  };

  // Password reset execution
  const handleExecutePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 10) {
      setRecoveryError('Password must be at least 10 characters.');
      return;
    }

    setIsRecovering(true);
    setRecoveryError(null);

    const result = await authApi.resetPassword(recoveryToken.trim(), newPassword);
    setIsRecovering(false);

    if (result.success) {
      setRecoveryMessage(result.message || 'Password updated successfully!');
      setTimeout(() => {
        setShowRecoveryModal(false);
        setRecoveryStage('request');
        setRecoveryToken('');
        setNewPassword('');
        setRecoveryMessage(null);
      }, 2000);
    } else {
      setRecoveryError(result.error || 'Password reset failed.');
    }
  };

  const handleSelectPreloadRole = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setMfaRequired(false);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ed] flex flex-col justify-between selection:bg-[#114b3e] selection:text-white px-4 py-6 sm:py-10">
      
      {/* Top Header Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#11382e] hover:text-[#0b241d] bg-white border border-[#ded8c7] px-3.5 py-2 rounded-xl shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to NatureSphere</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-[11px] text-stone-600 bg-white/90 px-3.5 py-1.5 rounded-full border border-[#ded8c7] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Enterprise MFA Enclave (AES-256 + TOTP)</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-xl shadow-stone-300/40 relative overflow-hidden">
          
          {/* Top Subtle Security Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#114b3e] to-teal-700" />

          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#114b3e] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-900/20 ring-4 ring-emerald-50">
              {mfaRequired ? (
                <Fingerprint className="w-7 h-7 text-emerald-300" />
              ) : (
                <Shield className="w-7 h-7 text-emerald-300" />
              )}
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#11382e] tracking-tight">
              {mfaRequired ? 'Multi-Factor Challenge' : 'Enterprise Admin Portal'}
            </h1>
            <p className="text-xs text-[#52635b] mt-1.5">
              {mfaRequired 
                ? 'Step 2 of 2: Confirm identity with Authenticator or Emergency Code' 
                : 'Server-authoritative Role-Based Security Gateway'}
            </p>
          </div>

          {/* Security alerts & lockout indicator */}
          {lockoutSeconds > 0 && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Security Lockout Active</p>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Too many unsuccessful attempts. Access paused for <span className="font-mono font-bold">{lockoutSeconds}s</span> to protect the server enclave.
                </p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Authentication Notice</p>
                <p className="text-rose-700 text-[11px] mt-0.5">{errorMessage}</p>
                {attemptsLeft !== null && attemptsLeft > 0 && (
                  <p className="text-rose-600 font-mono text-[10px] mt-1">
                    Warning: {attemptsLeft} attempt(s) remaining before automated security lockout.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 1: Email and Password Form */}
          {!mfaRequired ? (
            <form onSubmit={handleSubmitPrimary} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#11382e] mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@travellife.com"
                    disabled={lockoutSeconds > 0}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/70 border border-[#ded8c7] rounded-xl text-xs text-[#11382e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e] focus:bg-white transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#11382e]">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryEmail(email);
                      setShowRecoveryModal(true);
                    }}
                    className="text-[11px] font-medium text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    disabled={lockoutSeconds > 0}
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50/70 border border-[#ded8c7] rounded-xl text-xs text-[#11382e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e] focus:bg-white transition-all disabled:opacity-50 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || lockoutSeconds > 0}
                className="w-full mt-2 bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    <span>Authenticate &amp; Proceed to MFA</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: MFA Challenge Form */
            <form onSubmit={handleSubmitMfa} className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-3 text-xs text-[#11382e]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{mfaUserPreview?.name || 'Administrator'}</span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {mfaUserPreview?.role?.replace('_', ' ') || 'Super Admin'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 truncate">{mfaUserPreview?.email}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#11382e]">
                    {useBackupCode ? 'Emergency Single-Use Recovery Code' : '6-Digit Authenticator Code'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseBackupCode(!useBackupCode);
                      setMfaCode('');
                      setErrorMessage(null);
                    }}
                    className="text-[11px] text-emerald-800 hover:underline font-medium cursor-pointer"
                  >
                    {useBackupCode ? 'Use 6-digit TOTP instead' : 'Lost device? Use backup code'}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    {useBackupCode ? <KeyRound className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  </div>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder={useBackupCode ? 'REC-9921-ABCD' : '123456'}
                    className="w-full pl-10 pr-3.5 py-3 bg-stone-50/70 border border-[#ded8c7] rounded-xl text-base tracking-widest text-[#11382e] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e] focus:bg-white transition-all font-mono font-bold"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-1">
                  <span>Standard TOTP codes change every 30 seconds. (Dev fallback: <code className="bg-stone-100 px-1 py-0.2 rounded font-mono text-emerald-900 font-bold">123456</code> or <code className="bg-stone-100 px-1 py-0.2 rounded font-mono text-emerald-900 font-bold">REC-9921-ABCD</code>)</span>
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMfaRequired(false);
                    setMfaCode('');
                    setErrorMessage(null);
                  }}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !mfaCode.trim()}
                  className="flex-2 bg-[#114b3e] hover:bg-[#0c372d] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Confirm &amp; Launch Console</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Role credentials testing helper accordion */}
          <div className="mt-6 pt-5 border-t border-[#ded8c7]/70">
            <button
              type="button"
              onClick={() => setShowRoleCredentials(!showRoleCredentials)}
              className="w-full flex items-center justify-between text-xs text-stone-600 hover:text-[#11382e] font-medium transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Quick-fill Role Accounts for Review</span>
              </span>
              {showRoleCredentials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showRoleCredentials && (
              <div className="mt-3 space-y-2 text-[11px] bg-stone-50 rounded-2xl p-3 border border-[#e2dccf]">
                <div 
                  onClick={() => handleSelectPreloadRole('dinujalakshan33@gmail.com', 'TravelLife@Admin2025!')}
                  className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#11382e]">Super Admin</span>
                    <span className="text-[10px] text-stone-500 block">dinujalakshan33@gmail.com (Full Control)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Fill</span>
                </div>

                <div 
                  onClick={() => handleSelectPreloadRole('operations@travellife.com', 'StaffAccess@2025!')}
                  className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#11382e]">Operations Admin</span>
                    <span className="text-[10px] text-stone-500 block">operations@travellife.com</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Fill</span>
                </div>

                <div 
                  onClick={() => handleSelectPreloadRole('editorial@travellife.com', 'StaffAccess@2025!')}
                  className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#11382e]">Content Manager</span>
                    <span className="text-[10px] text-stone-500 block">editorial@travellife.com</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Fill</span>
                </div>

                <div 
                  onClick={() => handleSelectPreloadRole('finance@travellife.com', 'StaffAccess@2025!')}
                  className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#11382e]">Finance Manager</span>
                    <span className="text-[10px] text-stone-500 block">finance@travellife.com</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Fill</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer System Badges */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-stone-500 space-y-1">
        <p className="font-medium">
          Protected by NatureSphere Zero-Trust Server Architecture &bull; Session auto-revocation enabled
        </p>
        <p className="text-[10px] text-stone-400">
          TLS 1.3 Strict-Transport-Security &bull; HttpOnly SameSite Session Cookies &bull; Audit Trail v2.4
        </p>
      </div>

      {/* Password Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ded8c7] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif font-bold text-lg text-[#11382e]">
                  {recoveryStage === 'request' ? 'Password Recovery Token' : 'Set New Master Password'}
                </h3>
              </div>
              <button
                onClick={() => setShowRecoveryModal(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {recoveryMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{recoveryMessage}</span>
              </div>
            )}

            {recoveryError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{recoveryError}</span>
              </div>
            )}

            {recoveryStage === 'request' ? (
              <form onSubmit={handleRequestRecoveryToken} className="space-y-4">
                <p className="text-xs text-stone-600">
                  Enter the administrator email address. A one-time cryptographic recovery token valid for 30 minutes will be generated.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-[#11382e] mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="admin@travellife.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRecovering}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#114b3e] text-white hover:bg-[#0c372d] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isRecovering ? 'Generating...' : 'Issue Recovery Token'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleExecutePasswordReset} className="space-y-4">
                <p className="text-xs text-stone-600">
                  Enter your issued token and choose a new secure password (minimum 10 characters).
                </p>
                <div>
                  <label className="block text-xs font-semibold text-[#11382e] mb-1">
                    Recovery Token
                  </label>
                  <input
                    type="text"
                    required
                    value={recoveryToken}
                    onChange={(e) => setRecoveryToken(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs font-mono text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#11382e] mb-1">
                    New Master Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={10}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 10 characters"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#ded8c7] rounded-xl text-xs font-mono text-[#11382e] focus:outline-none focus:ring-2 focus:ring-[#114b3e]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecoveryStage('request')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isRecovering}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#114b3e] text-white hover:bg-[#0c372d] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isRecovering ? 'Updating...' : 'Update Password & Revoke Sessions'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
