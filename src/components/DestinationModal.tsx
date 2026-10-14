import React, { useState } from 'react';
import { Destination, Currency, HotelStay } from '../types/travel';
import { 
  X, 
  Star, 
  Heart, 
  Calendar, 
  MapPin, 
  Plus, 
  Check, 
  BedDouble, 
  ExternalLink,
  Compass,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HOTELS } from '../data/travelData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToPlanner: (dest: Destination) => void;
  currency: Currency;
  onSelectHotel?: (hotel: HotelStay) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onAddToPlanner,
  currency,
  onSelectHotel
}) => {
  if (!destination) return null;

  const [activePhoto, setActivePhoto] = useState<string>(destination.imageUrl);

  const formatPrice = (usd: number) => {
    const rates: Record<Currency, { rate: number; sym: string }> = {
      USD: { rate: 1, sym: '$' },
      EUR: { rate: 0.92, sym: '€' },
      GBP: { rate: 0.79, sym: '£' },
      JPY: { rate: 154, sym: '¥' },
      AUD: { rate: 1.52, sym: 'A$' }
    };
    const c = rates[currency] || rates.USD;
    return `${c.sym}${Math.round(usd * c.rate).toLocaleString()}`;
  };

  const nearbyHotels = HOTELS.filter(h => 
    h.destinationId === destination.id || 
    h.country.toLowerCase() === destination.country.toLowerCase()
  );

  const allPhotos = destination.gallery && destination.gallery.length > 0 
    ? [destination.imageUrl, ...destination.gallery.filter(g => g !== destination.imageUrl)]
    : [destination.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#ded8c7] shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Header Photo */}
        <div className="relative h-72 sm:h-96 w-full bg-stone-900 overflow-hidden">
          <img
            src={activePhoto}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top category & region */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#11382e]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
              {destination.category}
            </span>
            <span className="bg-white/20 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
              {destination.region}
            </span>
          </div>

          {/* Bottom Title & Location */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-mono drop-shadow-sm mb-1 text-emerald-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.city}, {destination.country}</span>
              <span>•</span>
              <span>{destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}</span>
            </div>
            <h2 className="editorial-title text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {allPhotos.length > 1 && (
          <div className="px-6 sm:px-8 py-3 bg-stone-100 border-b border-[#ded8c7] flex items-center gap-2 overflow-x-auto">
            {allPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(photo)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhoto === photo ? 'border-[#11382e] ring-2 ring-emerald-500/40 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#faf8f2] border border-[#ded8c7]">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">
                Traveler Rating
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-sm text-stone-800">{destination.rating.toFixed(2)}</span>
                <span className="text-[10px] text-stone-500">/ 5.0</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">
                Daily Budget (Est.)
              </span>
              <span className="font-bold text-sm text-[#11382e] block mt-0.5">
                {formatPrice(destination.dailyCostUSD)} <span className="text-[10px] font-normal text-stone-500">/ day</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">
                Best Visiting Season
              </span>
              <span className="font-semibold text-xs text-stone-800 block mt-0.5">
                {destination.bestSeason}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">
                Ideal Stay Duration
              </span>
              <span className="font-semibold text-xs text-stone-800 block mt-0.5">
                {destination.recommendedStayDays || 3} Days Recommended
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider mb-2 font-mono">
              Destination Overview
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {destination.longDescription || destination.description}
            </p>
          </div>

          {/* Activities & Experiences */}
          {destination.activities && destination.activities.length > 0 && (
            <div>
              <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider mb-3 font-mono">
                Popular Activities &amp; Field Experiences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-medium">
                    <Compass className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider mb-3 font-mono">
                Key Highlights
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7f4ea] border border-[#ded8c7] text-xs font-semibold text-[#11382e]">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Nearby Accommodation */}
          {nearbyHotels.length > 0 && (
            <div className="pt-4 border-t border-[#ede8dc]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-amber-700" />
                  <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider font-mono">
                    Recommended Accommodation Nearby
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  {nearbyHotels.length} verified stays
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyHotels.slice(0, 2).map(hotel => (
                  <div
                    key={hotel.id}
                    onClick={() => {
                      if (onSelectHotel) {
                        onClose();
                        onSelectHotel(hotel);
                      }
                    }}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-[#11382e] transition-all cursor-pointer flex gap-3 group"
                  >
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-stone-500 uppercase block">
                          {hotel.type}
                        </span>
                        <h4 className="font-bold text-xs text-[#11382e] group-hover:text-emerald-800 line-clamp-1">
                          {hotel.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200 text-xs">
                        <span className="font-bold text-[#11382e]">
                          {formatPrice(hotel.pricePerNightUSD)} <span className="text-[10px] font-normal text-stone-500">/ night</span>
                        </span>
                        <span className="text-[11px] text-emerald-800 font-semibold group-hover:underline flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#ede8dc] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSaved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              <span>{isSaved ? 'Saved in Favorites' : 'Save to Favorites'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAddToPlanner(destination);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-[#11382e] hover:bg-[#0c2f27] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Trip Planner</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
