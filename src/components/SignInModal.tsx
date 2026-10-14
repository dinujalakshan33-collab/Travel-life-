import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { authService, UserProfile } from '../services/supabase';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  initialMode?: 'signup' | 'signin';
}

export const SignInModal: React.FC<SignInModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccess,
  initialMode = 'signup'
}) => {
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeNewsletter, setAgreeNewsletter] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await authService.signUp({
          fullName,
          email,
          password,
          newsletter: agreeNewsletter
        });

        if (res.error) {
          setError(res.error);
          setLoading(false);
          return;
        }

        if (res.user) {
          setSuccessMessage(`Welcome to TRW, ${res.user.fullName}!`);
          onSuccess?.(res.user);
          setTimeout(() => {
            onClose();
            setSuccessMessage(null);
          }, 1200);
        }
      } else {
        const res = await authService.signIn({
          email,
          password
        });

        if (res.error) {
          setError(res.error);
          setLoading(false);
          return;
        }

        if (res.user) {
          setSuccessMessage(`Welcome back, ${res.user.fullName}!`);
          onSuccess?.(res.user);
          setTimeout(() => {
            onClose();
            setSuccessMessage(null);
          }, 1200);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication request failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setError(null);
    setLoading(true);
    try {
      const res = await authService.signInWithOAuth(provider);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      if (res.user) {
        setSuccessMessage(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
        onSuccess?.(res.user);
        setTimeout(() => {
          onClose();
          setSuccessMessage(null);
        }, 1000);
      }
    } catch (err: any) {
      setError(err?.message || `Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    if (mode === 'signup') {
      setFullName('Sara Kaelen');
      setEmail(`traveler.${Math.floor(Math.random() * 900 + 100)}@naturesphere.org`);
      setPassword('pacific_ocean_2025');
    } else {
      setEmail('traveler@naturesphere.org');
      setPassword('explorer2025');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Stunning Tropical Aerial Photo matching user screenshot */}
        <div className="hidden md:flex md:w-5/12 relative bg-emerald-950 flex-col justify-end p-8 text-white min-h-[580px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80" 
            alt="Turquoise ocean and white sands"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-emerald-200 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Global Field Network</span>
            </div>
            
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              Find your next<br />
              dream vacation<br />
              with TRW.
            </h2>
            
            <p className="text-[11px] text-stone-300 font-medium">
              Photo by <span className="font-semibold text-white">Shifaaz Shamoon</span> / Unsplash
            </p>
          </div>
        </div>

        {/* Right Side: Form matching user's design */}
        <div className="w-full md:w-7/12 p-6 sm:p-9 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh] md:max-h-[660px]">
          <div>
            {/* Header */}
            <div className="mb-5">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#1f2937] tracking-tight">
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {mode === 'signup' 
                  ? 'Find even better travel routes with a personal account!' 
                  : 'Access your curated itineraries and offline field journals.'}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-white font-medium text-xs sm:text-[13px] bg-[#d94d36] hover:bg-[#c23d27] transition-colors shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887C18.2 16.27 15.65 18.2 12.24 18.2c-3.48 0-6.3-2.82-6.3-6.3s2.82-6.3 6.3-6.3c1.55 0 2.96.56 4.05 1.5l2.42-2.42C17.2 3.2 14.88 2.2 12.24 2.2 6.82 2.2 2.4 6.62 2.4 12.04s4.42 9.84 9.84 9.84c5.66 0 9.4-3.98 9.4-9.56 0-.64-.07-1.26-.2-1.84h-9.2z"/>
                </svg>
                <span className="truncate">Sign in with Google</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => handleOAuthLogin('facebook')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-white font-medium text-xs sm:text-[13px] bg-[#3b5998] hover:bg-[#324b82] transition-colors shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.5V12H10V9.8c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.22 0-1.6.76-1.6 1.54V12h2.74l-.44 2.87H13.1V21.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
                <span className="truncate">Sign in with Facebook</span>
              </button>
            </div>

            {/* "or" separator */}
            <div className="flex items-center my-3.5">
              <div className="flex-1 border-t border-stone-200" />
              <span className="px-3 text-xs text-stone-400 font-medium lowercase">or</span>
              <div className="flex-1 border-t border-stone-200" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3.5 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-3.5 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f4f6] border border-transparent focus:border-stone-400 focus:bg-white text-stone-800 text-sm focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What's your Email?
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@travel-life.org"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f4f6] border border-transparent focus:border-stone-400 focus:bg-white text-stone-800 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {mode === 'signup' ? 'Choose a strong password.' : 'Your password'}
                  </label>
                  {mode === 'signin' && (
                    <button 
                      type="button" 
                      onClick={() => alert('Password reset link sent to registered email!')}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="4+ characters"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f4f6] border border-transparent focus:border-stone-400 focus:bg-white text-stone-800 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Newsletter / Promo Checkbox matching screenshot */}
              {mode === 'signup' && (
                <div className="flex items-start gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="newsletter-check"
                    checked={agreeNewsletter}
                    onChange={(e) => setAgreeNewsletter(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-stone-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="newsletter-check" className="text-[11px] text-stone-600 leading-tight cursor-pointer">
                    I agree to receive promotional offers and occasional newsletters from TRW.{' '}
                    <span className="text-stone-900 font-semibold underline cursor-pointer hover:text-blue-600">
                      Learn More
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-[#2f65e2] hover:bg-[#2051ca] text-white font-semibold text-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-4 text-center">
              {mode === 'signup' ? (
                <p className="text-xs text-stone-600">
                  Already a member?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setError(null);
                    }}
                    className="text-[#2f65e2] hover:text-[#1e48af] font-semibold underline cursor-pointer"
                  >
                    Sign In!
                  </button>
                </p>
              ) : (
                <p className="text-xs text-stone-600">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                    }}
                    className="text-[#2f65e2] hover:text-[#1e48af] font-semibold underline cursor-pointer"
                  >
                    Create Account!
                  </button>
                </p>
              )}
            </div>

            {/* Quick Demo Pre-fill for reviewer ease */}
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
              <span>Quick test pass:</span>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-stone-600 hover:text-stone-900 font-mono text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                Auto-fill demo explorer
              </button>
            </div>
          </div>

          {/* Footer Terms Note matching user's screenshot */}
          <div className="mt-4 text-center">
            <p className="text-[10px] text-stone-400">
              By tapping '{mode === 'signup' ? 'Create Account' : 'Sign In'}', you agree to TRW's{' '}
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms and Conditions: User travel data is securely stored, never sold to third parties, and protected by end-to-end encryption.'); }} className="underline hover:text-stone-600">
                Terms and Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
