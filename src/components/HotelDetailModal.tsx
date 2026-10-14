import React from 'react';
import { HotelStay, Currency } from '../types/travel';
import { 
  X, 
  MapPin, 
  Star, 
  ExternalLink, 
  Check, 
  Heart, 
  Info, 
  BedDouble, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  DollarSign, 
  Calendar,
  Share2
} from 'lucide-react';

interface HotelDetailModalProps {
  hotel: HotelStay | null;
  onClose: () => void;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenMapCoordinates?: (lat: number, lng: number) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onOpenMapCoordinates
}) => {
  if (!hotel) return null;

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

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#ded8c7] shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hero Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#11382e] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {hotel.type}
            </span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-mono drop-shadow-sm mb-1 text-emerald-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hotel.city}, {hotel.country}</span>
              <span>•</span>
              <span>{hotel.destinationName}</span>
            </div>
            <h2 className="editorial-title text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
              {hotel.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Top Metric Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#faf8f2] border border-[#ded8c7]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-xl text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{hotel.rating}</span>
              </div>
              <div className="text-xs text-stone-600">
                <span className="font-semibold block">{hotel.reviewsCount}</span>
                <span className="text-[11px] text-stone-400 font-mono">Verified Traveler Feedback</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-400 block uppercase">Estimated Tariff</span>
                <span className="text-lg font-bold text-[#11382e]">{formatPrice(hotel.pricePerNightUSD)}</span>
                <span className="text-[11px] text-stone-500"> / night</span>
              </div>
              <button
                onClick={() => onToggleSave(hotel.id)}
                className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                  isSaved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                title="Bookmark Stay"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider mb-2 font-mono">
              About The Property
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Verified Facilities & Amenities */}
          <div>
            <h3 className="font-bold text-sm text-[#11382e] uppercase tracking-wider mb-3 font-mono">
              Verified Facilities &amp; Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {hotel.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Coordinates & Advisory */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Transparent Booking &amp; Location Policy</p>
              <p className="mt-0.5 text-stone-600 leading-relaxed text-[11px]">
                Coordinates verified at <strong className="font-mono">{hotel.coordinates.lat.toFixed(4)}, {hotel.coordinates.lng.toFixed(4)}</strong>. Nightly rates are calculated market estimates. When booking, select your precise dates on the official provider website to lock in real-time pricing and breakfast packages.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#ede8dc] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Back to Exploration
            </button>

            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#11382e] hover:bg-[#0c2f27] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Official Availability</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
