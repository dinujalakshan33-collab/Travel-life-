import React, { useState, useEffect } from 'react';
import { 
  Compass, Lock, Mail, Eye, EyeOff, Shield, ShieldAlert, ArrowLeft, 
  Sparkles, AlertCircle, CheckCircle2, KeyRound, RefreshCw, Smartphone, Laptop
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setIsLoading(true);
    setErrorMessage(null);

    const result = await authApi.login(email.trim(), password);

    setIsLoading(false);

    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      if (result.remainingSeconds && result.remainingSeconds > 0) {
        setLockoutSeconds(result.remainingSeconds);
      }
      if (typeof result.attemptsLeft === 'number') {
        setAttemptsLeft(result.attemptsLeft);
      }
    }
  };

  const handleRequestRecoveryToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);
    setRecoveryError(null);
    setRecoveryMessage(null);

    const result = await authApi.forgotPassword(recoveryEmail.trim());
    setIsRecovering(false);

    if (result.success) {
      setRecoveryMessage(result.message);
      if (result.resetToken) {
        setRecoveryToken(result.resetToken);
        setRecoveryStage('reset');
      }
    } else {
      setRecoveryError('Failed to initiate recovery. Please verify your administrator email.');
    }
  };

  const handleExecutePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setRecoveryError('Password must be at least 8 characters.');
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

  return (
    <div className="min-h-screen bg-[#f7f5ed] flex flex-col justify-between selection:bg-[#114b3e] selection:text-white px-4 py-6 sm:py-10">
      
      {/* Top Header Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#11382e] hover:text-[#0b241d] bg-white border border-[#ded8c7] px-3.5 py-2 rounded-xl shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Travel-Life</span>
        </button>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-500 bg-white/80 px-3 py-1.5 rounded-full border border-[#ded8c7]">
          <Shield className="w-3.5 h-3.5 text-emerald-700" />
          <span>Server-Side Secure Enclave</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-xl shadow-stone-300/40 relative overflow-hidden">
          
          {/* Top Subtle Security Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#114b3e] to-emerald-800" />

          {/* Brand Header */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-[#114b3e] text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-emerald-900/20 ring-4 ring-emerald-50">
              <Compass className="w-7 h-7 text-emerald-300" strokeWidth={2.2} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3 text-amber-700" />
              <span>Private Administrator Access</span>
            </div>

            <h1 className="editorial-title text-2xl sm:text-3xl font-bold text-[#11382e] tracking-tight">
              Travel-Life
            </h1>
            <p className="text-xs text-[#52645d] mt-1">
              Cartography Operations &amp; Verification Portal
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-[#faf8f2] rounded-xl p-3 border border-[#ded8c7] mb-6 text-[11px] text-[#4a5f57] flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#11382e]">Authorized Personnel Only</p>
              <p className="text-stone-500 text-[10px] mt-0.5 leading-relaxed">
                Public registration is strictly disabled. You can securely log in from any phone, tablet, or desktop computer using your administrator credentials.
              </p>
            </div>
          </div>

          {/* Lockout Warning */}
          {lockoutSeconds > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5 text-xs text-red-900 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Security Lockout Active</p>
                <p className="mt-0.5 text-[11px] text-red-700">
                  Too many failed attempts. Brute-force protection enabled. Please wait <strong className="font-mono text-red-900">{lockoutSeconds}s</strong> before retrying.
                </p>
              </div>
            </div>
          )}

          {/* Standard Error Notice */}
          {errorMessage && lockoutSeconds === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <span>{errorMessage}</span>
                {attemptsLeft !== null && attemptsLeft > 0 && (
                  <span className="block font-semibold mt-0.5 text-amber-800">
                    Remaining attempts: {attemptsLeft}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@travel-life.org"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e]/30 focus:border-[#114b3e] text-xs font-medium transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-mono text-[10px] font-bold text-stone-600 uppercase">
                  Private Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowRecoveryModal(true);
                    setRecoveryEmail(email);
                  }}
                  className="text-[11px] font-semibold text-[#114b3e] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e]/30 focus:border-[#114b3e] text-xs font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || lockoutSeconds > 0}
              className="w-full py-3 bg-[#11382e] hover:bg-[#0c2f26] disabled:opacity-50 text-white font-bold text-xs tracking-wide rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-emerald-300" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Multi-Device Support Badge */}
          <div className="mt-6 pt-5 border-t border-[#ede8dc] flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-800" />
              <span>Android &amp; iOS</span>
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-emerald-800" />
              <span>Tablets &amp; PC</span>
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-800 font-bold">24h Session</span>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-stone-500 font-mono">
        <p>© 2025 Travel-Life Cartography Ltd. All administrative operations are encrypted and audited.</p>
      </div>

      {/* Self-Service Password Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#ded8c7] p-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#ded8c7]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#11382e]" />
                <h3 className="text-sm font-bold text-[#11382e]">Administrator Password Reset</h3>
              </div>
              <button 
                onClick={() => setShowRecoveryModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {recoveryMessage && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{recoveryMessage}</span>
              </div>
            )}

            {recoveryError && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <span>{recoveryError}</span>
              </div>
            )}

            {recoveryStage === 'request' ? (
              <form onSubmit={handleRequestRecoveryToken} className="mt-4 space-y-3.5 text-xs">
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Enter your registered administrator email address. A secure recovery token will be verified against the server.
                </p>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="admin@travel-life.org"
                    className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(false)}
                    className="flex-1 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRecovering}
                    className="flex-1 py-2 rounded-xl bg-[#11382e] hover:bg-[#0c2f26] text-white font-bold flex items-center justify-center gap-1.5"
                  >
                    {isRecovering ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Issue Recovery Token</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleExecutePasswordReset} className="mt-4 space-y-3.5 text-xs">
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Recovery token validated. Set your new private password (minimum 8 characters).
                </p>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Recovery Token
                  </label>
                  <input
                    type="text"
                    required
                    value={recoveryToken}
                    onChange={(e) => setRecoveryToken(e.target.value)}
                    placeholder="32-byte recovery token"
                    className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl font-mono text-[11px] text-stone-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                    New Private Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(false)}
                    className="flex-1 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRecovering}
                    className="flex-1 py-2 rounded-xl bg-[#11382e] hover:bg-[#0c2f26] text-white font-bold flex items-center justify-center gap-1.5"
                  >
                    {isRecovering ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Update Password</span>
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
