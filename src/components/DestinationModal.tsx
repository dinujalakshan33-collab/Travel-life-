import React from 'react';
import { Destination, Currency } from '../types/travel';
import { X, Star, Bookmark, Calendar, MapPin, Mountain, Plus, ArrowRight, Check } from 'lucide-react';
import { CURRENCY_RATES } from '../data/travelData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToPlanner: (dest: Destination) => void;
  currency: Currency;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onAddToPlanner,
  currency
}) => {
  if (!destination) return null;

  const rate = CURRENCY_RATES[currency]?.rate || 1.0;
  const symbol = CURRENCY_RATES[currency]?.symbol || '$';
  const dailyCost = Math.round(destination.dailyCostUSD * rate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#ded8c7] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo */}
        <div className="relative h-72 sm:h-80 bg-stone-900">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer border border-white/20 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-md border border-white/20 uppercase">
              {destination.badge}
            </span>
            <span className="bg-[#114b3e]/80 backdrop-blur-md text-emerald-200 text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-md border border-emerald-400/30 uppercase">
              {destination.region}
            </span>
          </div>

          {/* Title & Coordinates on image bottom */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{destination.rating.toFixed(2)}</span>
              <span className="text-stone-300 font-normal">({destination.reviewsCount} verified reviews)</span>
            </div>

            <h2 className="editorial-title text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5">
              {destination.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {destination.coordinates.lat}° N, {destination.coordinates.lng}° E
              </span>
              {destination.elevation && (
                <span className="flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-amber-400" />
                  Elev. {destination.elevation}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#f8f6f0] rounded-2xl border border-[#ede8dc] text-center">
            <div>
              <span className="block text-[10px] font-mono uppercase text-stone-500 font-bold">Est. Daily Budget</span>
              <span className="text-base sm:text-lg font-bold text-[#11382e] font-mono">{symbol}{dailyCost}</span>
              <span className="block text-[10px] text-stone-400">{destination.budgetTier}</span>
            </div>
            <div className="border-x border-stone-200">
              <span className="block text-[10px] font-mono uppercase text-stone-500 font-bold">Ideal Duration</span>
              <span className="text-base sm:text-lg font-bold text-[#11382e]">{destination.duration}</span>
              <span className="block text-[10px] text-stone-400">Paced Expedition</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-stone-500 font-bold">Category</span>
              <span className="text-xs sm:text-sm font-bold text-[#11382e]">{destination.categoryLabel}</span>
              <span className="block text-[10px] text-stone-400">Curated Field Route</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-mono text-[11px] font-bold text-[#b83a14] uppercase tracking-wider mb-2">
              FIELD DOSSIER
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Best Time To Visit */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#114b3e] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#11382e] uppercase font-mono tracking-wide">
                Optimal Climate &amp; Seasonal Bloom
              </h4>
              <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
                {destination.bestMonths}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-mono text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-3">
              VERIFIED ATTRACTIONS &amp; WAYPOINTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#faf9f5] border border-stone-200 text-xs text-stone-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#114b3e]"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Day Sample Itinerary */}
          {destination.dayByDaySample && destination.dayByDaySample.length > 0 && (
            <div>
              <h3 className="font-mono text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-3">
                FIELD ITINERARY BLUEPRINT
              </h3>
              <div className="space-y-3">
                {destination.dayByDaySample.map((day) => (
                  <div key={day.day} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#114b3e] bg-emerald-100/60 px-2 py-0.5 rounded">
                        Day {day.day}
                      </span>
                      <span className="text-xs font-semibold text-stone-900">{day.title}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-600 pl-2">
                      {day.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-stone-400 font-mono text-[10px] mt-0.5">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#ede8dc] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#114b3e]' : ''}`} />
              <span>{isSaved ? 'Saved to Expeditions' : 'Save Destination'}</span>
            </button>

            <button
              onClick={() => {
                onAddToPlanner(destination);
                onClose();
              }}
              className="w-full sm:w-auto bg-[#103e33] hover:bg-[#0b2f26] text-white px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Import to Itinerary Architect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
