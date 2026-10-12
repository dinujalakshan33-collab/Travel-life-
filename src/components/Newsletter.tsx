import React, { useState } from 'react';
import { Mail, Compass, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <div className="relative bg-[#10382e] text-white rounded-3xl p-8 sm:p-14 border border-[#235345] overflow-hidden shadow-xl">
        
        {/* Subtle decorative watermark */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 text-white/5 pointer-events-none">
          <Compass className="w-full h-full stroke-[0.8]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 font-mono text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>TRAVEL LIFE COMPENDIUM DISPATCH</span>
          </div>

          <h2 className="editorial-title text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-3">
            Seasonal Route Reports &amp; Verified Stay Alerts
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-6 font-light">
            Join over 78,000 thoughtful travelers worldwide. Receive monthly seasonal guides across Sri Lanka, the Mediterranean, Japan, and the Alps with transparent budgets and offline GPS coordinates.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-white/10 border border-emerald-400/30 text-emerald-200 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Worldwide travel dispatch confirmed!</p>
                <p className="text-[11px] text-emerald-200">We have sent the 2025 Worldwide Destination Guide directly to your email.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-emerald-300/70 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for the guide..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-[#0c2f25] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shrink-0 cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>Unlock Guide</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="mt-3 text-[11px] text-emerald-200/60 font-mono">
            Zero advertising fluff. Strict anti-spam standards with one-click unsubscribe.
          </p>
        </div>
      </div>
    </section>
  );
};
