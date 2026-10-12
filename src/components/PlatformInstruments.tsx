import React, { useState } from 'react';
import { Map, Layers, Navigation, Calendar, Plus, Clock, DollarSign, ExternalLink, Settings, Sparkles, CheckCircle2 } from 'lucide-react';
import { Currency } from '../types/travel';
import { CURRENCY_RATES } from '../data/travelData';

interface PlatformInstrumentsProps {
  onOpenMap: () => void;
  onOpenPlanner: () => void;
  currency: Currency;
}

export const PlatformInstruments: React.FC<PlatformInstrumentsProps> = ({
  onOpenMap,
  onOpenPlanner,
  currency
}) => {
  const [activePoi, setActivePoi] = useState<string>('tokyo-station');
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const formatPrice = (usd: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1.0;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(usd * rate)}`;
  };

  const toggleItemDone = (id: string) => {
    setCompletedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#eae5d8]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block font-mono text-[10px] font-bold tracking-widest text-[#b83a14] uppercase mb-1.5">
          INTEGRATED PLATFORM INSTRUMENTS
        </span>
        <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-semibold tracking-tight">
          Cartography Meets Seamless Itinerary Engineering
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#465b53] leading-relaxed">
          Zero fragmented tabs. Switch effortlessly between live open-source geo-coordinates and day-by-day draggable schedules.
        </p>
      </div>

      {/* Two Instruments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Instrument: Interactive Leaflet & OpenStreetMap */}
        <div className="bg-white rounded-2xl border border-[#ded8c7] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            {/* Header tags */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#114b3e] flex items-center justify-center">
                  <Map className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-900 tracking-wider uppercase">
                  GEO-CARTOGRAPHY ENGINE
                </span>
              </div>
              <span className="font-mono text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                OSM Vector Engine
              </span>
            </div>

            {/* Title & Desc */}
            <h3 className="editorial-title text-2xl font-bold text-[#11382e] mb-2 tracking-tight">
              Interactive Leaflet &amp; OpenStreetMap Discovery
            </h3>
            <p className="text-xs text-[#52645d] leading-relaxed mb-5">
              Filter geospatial markers by density, elevation, seasonal bloom, and offline availability with real-time vector route calculations.
            </p>

            {/* Mini Interactive Map Component */}
            <div className="relative h-60 bg-[#e8ece5] rounded-xl overflow-hidden border border-[#d5ded0] p-3 shadow-inner">
              {/* Stylized Map Grid and Streets */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cfd6c7" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Stylized River */}
                  <path d="M 280 0 Q 240 80 260 160 T 290 260" fill="none" stroke="#a9c7db" strokeWidth="12" />
                  {/* Stylized Main Avenues */}
                  <path d="M 0 130 Q 150 110 320 150 T 500 130" fill="none" stroke="#ffffff" strokeWidth="5" />
                  <path d="M 120 0 L 190 260" fill="none" stroke="#ffffff" strokeWidth="4" />
                  <path d="M 330 0 L 300 260" fill="none" stroke="#ffffff" strokeWidth="3" />
                  {/* Route dashed line between Tokyo Station and Ueno */}
                  <path d="M 180 140 Q 210 100 230 60" fill="none" stroke="#114b3e" strokeWidth="2.5" strokeDasharray="4 4" />
                  {/* Route dashed line to Shibuya */}
                  <path d="M 180 140 Q 130 170 90 190" fill="none" stroke="#114b3e" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Status pill top left */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm border border-stone-300 rounded-md px-2.5 py-1 text-[10px] font-mono font-medium text-stone-800 shadow-xs flex items-center gap-1.5 z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Mode: Tokyo Station</span>
              </div>

              {/* Map Nodes */}
              {/* Ueno Park */}
              <button
                onClick={() => setActivePoi('ueno')}
                className={`absolute top-6 right-28 px-2 py-0.5 rounded text-[9px] font-semibold border shadow-xs transition-transform cursor-pointer flex items-center gap-1 ${
                  activePoi === 'ueno'
                    ? 'bg-[#114b3e] text-white border-[#114b3e] scale-105'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Ueno Park</span>
              </button>

              {/* Asakusa */}
              <button
                onClick={() => setActivePoi('asakusa')}
                className={`absolute top-12 right-6 px-2 py-0.5 rounded text-[9px] font-semibold border shadow-xs transition-transform cursor-pointer flex items-center gap-1 ${
                  activePoi === 'asakusa'
                    ? 'bg-[#114b3e] text-white border-[#114b3e] scale-105'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-white'
                }`}
              >
                <span>Asakusa</span>
              </button>

              {/* Tokyo Central Station (Primary) */}
              <button
                onClick={() => setActivePoi('tokyo-station')}
                className={`absolute top-28 left-40 px-2.5 py-1 rounded text-[10px] font-bold border shadow-md transition-transform cursor-pointer flex items-center gap-1.5 z-20 ${
                  activePoi === 'tokyo-station'
                    ? 'bg-[#114b3e] text-white border-[#0b352b] ring-2 ring-emerald-400/50 scale-110'
                    : 'bg-white text-emerald-900 border-emerald-300'
                }`}
              >
                <Navigation className="w-3 h-3 text-emerald-300" />
                <span>Tokyo Station</span>
              </button>

              {/* Ginza */}
              <button
                onClick={() => setActivePoi('ginza')}
                className={`absolute bottom-10 left-44 px-2 py-0.5 rounded text-[9px] font-semibold border shadow-xs transition-transform cursor-pointer flex items-center gap-1 ${
                  activePoi === 'ginza'
                    ? 'bg-[#114b3e] text-white border-[#114b3e] scale-105'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-white'
                }`}
              >
                <span>Ginza</span>
              </button>

              {/* Shibuya */}
              <button
                onClick={() => setActivePoi('shibuya')}
                className={`absolute bottom-6 left-14 px-2 py-0.5 rounded text-[9px] font-semibold border shadow-xs transition-transform cursor-pointer flex items-center gap-1 ${
                  activePoi === 'shibuya'
                    ? 'bg-[#114b3e] text-white border-[#114b3e] scale-105'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-white'
                }`}
              >
                <span>Shibuya City</span>
              </button>

              {/* Dynamic Coordinate read out bottom */}
              <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                35.6812° N, 139.7671° E • Transit: 12 min
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-[#ede8dc] flex items-center justify-between text-xs mt-4">
            <span className="font-mono text-[11px] text-stone-600">
              42,000+ Verified Geocoded POIs
            </span>

            <button
              onClick={onOpenMap}
              className="bg-[#103e33] hover:bg-[#0b2f26] text-white px-4 py-2 rounded-lg font-medium text-xs tracking-wide flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Open World Map Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Instrument: Intelligent Day-by-Day Trip Architect */}
        <div className="bg-white rounded-2xl border border-[#ded8c7] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            {/* Header tags */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-100 text-[#b83a14] flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#b83a14] tracking-wider uppercase">
                  DYNAMIC SEQUENCING
                </span>
              </div>
              <span className="font-mono text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                Smart Drag &amp; Drop
              </span>
            </div>

            {/* Title & Desc */}
            <h3 className="editorial-title text-2xl font-bold text-[#11382e] mb-2 tracking-tight">
              Intelligent Day–by–Day Trip Architect
            </h3>
            <p className="text-xs text-[#52645d] leading-relaxed mb-5">
              Auto-calculate walking distances, buffer times between attractions, and live cost aggregations with group collaboration tools.
            </p>

            {/* Timed Schedule Preview Cards matching exact screenshot */}
            <div className="space-y-2.5">
              {/* Item 1 */}
              <div
                onClick={() => toggleItemDone('node-1')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  completedItems.includes('node-1')
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-[#faf9f5] border-[#eae5d8] hover:border-[#114b3e]/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-8 rounded-full bg-emerald-600 mt-0.5 shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      09:00 AM • Fushimi Inari Early Ascent
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      2.5 hrs • Estimated {formatPrice(0)} Entrance Fee
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Day 1
                </span>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => toggleItemDone('node-2')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  completedItems.includes('node-2')
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-[#faf9f5] border-[#eae5d8] hover:border-[#114b3e]/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-8 rounded-full bg-amber-500 mt-0.5 shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      11:30 AM • Nishiki Market Tasting Tour
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      1.5 hrs • {formatPrice(25)} Food Budget
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Day 1
                </span>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => toggleItemDone('node-3')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  completedItems.includes('node-3')
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-[#faf9f5] border-[#eae5d8] hover:border-[#114b3e]/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-8 rounded-full bg-rose-500 mt-0.5 shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      05:00 PM • Kiyomizu-dera Sunset Overlook
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      2.0 hrs • {formatPrice(4)} Ticket • Golden Hour
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Day 1
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-[#ede8dc] flex items-center justify-between text-xs mt-4">
            <span className="font-mono text-[11px] text-stone-600">
              Group Sync • Offline Export
            </span>

            <button
              onClick={onOpenPlanner}
              className="bg-[#96371a] hover:bg-[#7e2b10] text-white px-4 py-2 rounded-lg font-medium text-xs tracking-wide flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Build My Free Itinerary</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
