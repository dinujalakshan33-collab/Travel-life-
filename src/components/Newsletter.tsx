import React, { useState } from 'react';
import { Mail, Compass, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-[#f4f0e6] rounded-3xl p-8 sm:p-12 border border-[#ded8c7] overflow-hidden shadow-xs">
        {/* Subtle Watermark compass in bottom right */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 text-stone-300/40 pointer-events-none">
          <Compass className="w-full h-full stroke-[0.7]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-stone-300/60 text-[10px] font-mono font-bold tracking-widest text-stone-700 uppercase mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#b83a14]"></span>
            <span>THE WEEKLY FIELD BULLETIN</span>
          </div>

          {/* Heading */}
          <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#11382e] leading-tight mb-3">
            Curated Itineraries and Seasonal Alerts, Straight to Your Inbox.
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#465b53] leading-relaxed mb-6 font-light">
            Join over 64,000 independent explorers. Receive monthly route guides, currency shifts, rail pass discounts, and seasonal bloom forecasts. No promotional spam, ever.
          </p>

          {/* Subscribe Form */}
          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">Field dispatch access confirmed!</p>
                <p className="text-[11px] text-emerald-700">Check your inbox for the 2025 Global Rail &amp; Trail dispatch.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your field email address..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#ded8c7] text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#114b3e]/30 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="bg-[#b83a14] hover:bg-[#9e3110] text-white px-6 py-3 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all shadow-xs shrink-0 cursor-pointer active:scale-98"
              >
                Subscribe for Free
              </button>
            </form>
          )}

          {/* Disclaimer */}
          <p className="mt-3 text-[11px] text-stone-600 font-mono">
            Protected by anti-spam protocols. Instant one-click unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
