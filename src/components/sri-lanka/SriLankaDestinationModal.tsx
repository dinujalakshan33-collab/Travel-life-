import React, { useState } from 'react';
import { SriLankaDestination } from '../../data/sriLankaData';
import { 
  X, MapPin, Clock, Sun, Star, Compass, Bookmark, Check, Copy, 
  ExternalLink, ShieldCheck, Sparkles, Navigation, Mountain, BookOpen
} from 'lucide-react';
import { Currency, ItineraryItem } from '../../types/travel';

interface SriLankaDestinationModalProps {
  destination: SriLankaDestination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToPlanner: (item: ItineraryItem) => void;
  onLocateOnMap: (dest: SriLankaDestination) => void;
  currency: Currency;
}

export const SriLankaDestinationModal: React.FC<SriLankaDestinationModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onAddToPlanner,
  onLocateOnMap,
  currency
}) => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [addedToPlanner, setAddedToPlanner] = useState(false);

  if (!destination) return null;

  const handleCopyCoords = () => {
    const text = `${destination.coordinates.lat.toFixed(6)}, ${destination.coordinates.lng.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleAdd = () => {
    const item: ItineraryItem = {
      id: `srilanka-${destination.id}-${Date.now()}`,
      day: 1,
      time: '09:30 AM',
      title: `${destination.name} (Sri Lanka)`,
      duration: destination.recommendedDuration.split('(')[0].trim() || '3.5 hrs',
      costUSD: 45,
      note: `Region: ${destination.region} • Highlights: ${destination.highlights[0]}`,
      category: 'sightseeing'
    };
    onAddToPlanner(item);
    setAddedToPlanner(true);
    setTimeout(() => setAddedToPlanner(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-[#faf8f3] w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-[#ded8c7] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner */}
          <div className="relative h-72 sm:h-80 bg-stone-900">
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11382e] via-black/40 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                🇱🇰 {destination.region}
              </span>
              <span className="bg-emerald-900/80 backdrop-blur-md text-emerald-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                {destination.category}
              </span>
            </div>

            {/* Title & Native Script */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              {destination.nativeName && (
                <span className="font-mono text-xs text-emerald-200 block mb-1">
                  {destination.nativeName}
                </span>
              )}
              <h2 className="editorial-title text-2xl sm:text-4xl font-bold text-white leading-tight">
                {destination.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-200">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{destination.rating}</span>
                  <span className="text-stone-300 font-normal">({destination.reviewCount} reviews)</span>
                </span>
                {destination.elevation && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Mountain className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{destination.elevation}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs text-xs">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                  COORDINATES
                </span>
                <button
                  onClick={handleCopyCoords}
                  className="mt-1 font-mono text-[11px] text-[#11382e] hover:underline flex items-center gap-1 font-semibold text-left cursor-pointer"
                  title="Click to copy GPS coordinates"
                >
                  <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                  <span>{destination.coordinates.lat.toFixed(4)}°, {destination.coordinates.lng.toFixed(4)}°</span>
                  {copiedCoords && <Check className="w-3 h-3 text-emerald-600 ml-1" />}
                </button>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                  RECOMMENDED TIME
                </span>
                <span className="mt-1 text-stone-800 font-medium block">
                  {destination.recommendedDuration}
                </span>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                  PEAK SEASON
                </span>
                <span className="mt-1 text-stone-800 font-medium block">
                  {destination.bestSeason.split('.')[0]}
                </span>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 font-bold block">
                  STATUS
                </span>
                <span className="mt-1 text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified POI</span>
                </span>
              </div>
            </div>

            {/* Historical Significance Callout */}
            {destination.historicalSignificance && (
              <div className="bg-[#f0ede4] p-4 sm:p-5 rounded-2xl border border-[#ded8c7]">
                <div className="flex items-center gap-2 mb-1.5">
                  <BookOpen className="w-4 h-4 text-[#11382e]" />
                  <span className="font-mono text-[10px] font-bold text-[#11382e] uppercase tracking-wider">
                    HERITAGE &amp; HISTORICAL CONTEXT
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                  "{destination.historicalSignificance}"
                </p>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-2">
                OVERVIEW
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Key Field Highlights */}
            <div>
              <h3 className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-3">
                KEY FIELD HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((hl, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-[#ded8c7] flex items-start gap-2 text-xs">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-stone-800 font-medium leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Advice & Travel Tips */}
            <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl">
              <span className="font-mono text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                PRACTICAL FIELD ADVICE
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {destination.travelTips}
              </p>
            </div>

          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#ded8c7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 text-amber-900 border-amber-300' 
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved to Bookmarks' : 'Save'}</span>
            </button>

            <button
              onClick={() => {
                onLocateOnMap(destination);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#11382e] bg-[#f0ede4] hover:bg-[#e6e1d5] border border-[#ded8c7] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-800" />
              <span>Locate on Map</span>
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
              addedToPlanner
                ? 'bg-emerald-700 text-white'
                : 'bg-[#11382e] hover:bg-[#0b241d] text-white'
            }`}
          >
            {addedToPlanner ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{addedToPlanner ? 'Added to Day Architect!' : 'Add to Day Architect'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
