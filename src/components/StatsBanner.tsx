import React from 'react';
import { ShieldCheck, Database, Globe, Compass, CheckCircle } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  return (
    <section className="bg-[#082820] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#0e3b30]">
      <div className="max-w-7xl mx-auto">
        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          {/* Stat 1 */}
          <div>
            <div className="editorial-title text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1.5">
              195+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono tracking-wide mb-1">
              Sovereign Nations
            </div>
            <div className="text-[11px] text-stone-400 font-sans">
              Full diplomatic &amp; entry protocols
            </div>
          </div>

          {/* Stat 2 */}
          <div>
            <div className="editorial-title text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1.5">
              12,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono tracking-wide mb-1">
              Verified Attractions
            </div>
            <div className="text-[11px] text-stone-400 font-sans">
              Field-validated coordinates
            </div>
          </div>

          {/* Stat 3 */}
          <div>
            <div className="editorial-title text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1.5">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono tracking-wide mb-1">
              Open Geospatial Data
            </div>
            <div className="text-[11px] text-stone-400 font-sans">
              Zero paywalled itinerary data
            </div>
          </div>

          {/* Stat 4 */}
          <div>
            <div className="editorial-title text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1.5">
              85,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono tracking-wide mb-1">
              Trips Engineered
            </div>
            <div className="text-[11px] text-stone-400 font-sans">
              Curated by global travelers
            </div>
          </div>
        </div>

        {/* Bottom Integrity Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-white">Strict Editorial &amp; Cartographic Integrity</span>
              <span className="text-stone-400 hidden sm:inline"> — Powered by REST Countries API, Wikivoyage standards &amp; OpenStreetMap geocoding</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-emerald-300/80">
            <span>REST Countries v3.1</span>
            <span className="text-emerald-600">•</span>
            <span>OpenStreetMap Leaflet</span>
            <span className="text-emerald-600">•</span>
            <span>CC-BY-SA Wikivoyage</span>
          </div>
        </div>
      </div>
    </section>
  );
};
