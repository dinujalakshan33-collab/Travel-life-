// src/components/AuthModal.tsx
import React, { useState } from "react";
import { X, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signup" | "login";
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, defaultMode = "signup" }) => {
  const { signUpUser, loginUser, loginWithOAuth, sendPasswordReset, isSupabaseLive } = useAuth();
  const [mode, setMode] = useState<"signup" | "login" | "forgot">(defaultMode);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreePromo, setAgreePromo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (mode === "forgot") {
      const res = await sendPasswordReset(email);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message || "Reset link dispatched.");
      } else {
        setErrorMsg(res.message || "Could not send reset link.");
      }
      return;
    }

    if (mode === "signup") {
      if (password.length < 6) {
        setLoading(false);
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
      const res = await signUpUser(name, email, password);
      setLoading(false);
      if (res.success) {
        if (res.message) {
          setSuccessMsg(res.message);
        } else {
          onClose();
        }
      } else {
        setErrorMsg(res.message || "Registration failed.");
      }
      return;
    }

    if (mode === "login") {
      const res = await loginUser(email, password);
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message || "Invalid email or password.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Tropical Beach Showcase Matching Screenshot */}
        <div className="relative hidden md:flex md:w-5/12 bg-slate-900 text-white flex-col justify-between p-8 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"
            alt="Aerial tropical turquoise ocean beach"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top Logo Mark */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/90 flex items-center justify-center font-bold text-slate-950 text-sm">
              TL
            </span>
            <span className="font-serif font-bold text-lg tracking-wide">Travel Life</span>
          </div>

          {/* Screenshot Hero Slogan */}
          <div className="relative z-10 space-y-3">
            <h2 className="font-serif text-3xl font-bold leading-tight drop-shadow-md">
              Find your next dream vacation with TRW.
            </h2>
            <p className="text-[11px] text-slate-300 font-medium">
              Photo by <span className="underline font-semibold">Shifaaz Shamoon</span> / Unsplash
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Form matching the screenshot */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-5">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {mode === "signup" && "Create your account"}
                {mode === "login" && "Welcome back"}
                {mode === "forgot" && "Reset your password"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {mode === "signup" && "Find even better travel routes with a personal account!"}
                {mode === "login" && "Sign in to access your saved journeys and bookings."}
                {mode === "forgot" && "Enter your email to receive recovery instructions."}
              </p>
            </div>

            {/* Social Authentication Row */}
            {mode !== "forgot" && (
              <>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => loginWithOAuth("google")}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#ea4335] hover:bg-[#d93829] text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <span>G</span>
                    <span className="truncate">Sign in with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginWithOAuth("facebook")}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#3b5998] hover:bg-[#304a82] text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <span>f</span>
                    <span className="truncate">Sign in with Facebook</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">or</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              </>
            )}

            {/* Notifications */}
            {errorMsg && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  What's your Email?
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      Choose a strong password.
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-[11px] text-blue-600 hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="6+ characters"
                      className="w-full text-xs pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Promotional Checkbox from Screenshot */}
              {mode === "signup" && (
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreePromo}
                    onChange={(e) => setAgreePromo(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-500 leading-tight">
                    I agree to receive promotional offers and occasional newsletters from TRW.{" "}
                    <span className="text-blue-600 underline cursor-pointer">Learn More</span>
                  </span>
                </label>
              )}

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#3370eb] hover:bg-[#255bd1] text-white rounded-xl text-xs font-bold transition shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>
                  {mode === "signup" && "Create Account"}
                  {mode === "login" && "Sign In"}
                  {mode === "forgot" && "Send Reset Instructions"}
                </span>
              </button>
            </form>

            {/* Toggle Modes */}
            <div className="pt-2 text-center text-xs text-slate-600">
              {mode === "signup" ? (
                <span>
                  Already a member?{" "}
                  <button
                    onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Sign In!
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account yet?{" "}
                  <button
                    onClick={() => { setMode("signup"); setErrorMsg(""); setSuccessMsg(""); }}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Sign Up!
                  </button>
                </span>
              )}
            </div>

            {/* Terms Footnote from Screenshot */}
            <p className="text-[10px] text-center text-slate-400">
              By tapping '{mode === "signup" ? "Create Account" : "Sign In"}', you agree to TRW's{" "}
              <span className="underline cursor-pointer">Terms and Conditions</span>
            </p>

            {/* Supabase Status Indicator (Development Helper) */}
            <div className="pt-2 text-center text-[10px] text-slate-400">
              Authentication Engine:{" "}
              <strong className={isSupabaseLive ? "text-emerald-600" : "text-amber-600"}>
                {isSupabaseLive ? "Live Supabase Cloud" : "Local Verified Sandbox"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
