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
// src/components/DestinationModal.tsx
import React from "react";
import { X, MapPin, Calendar, Heart, Compass, CheckCircle } from "lucide-react";
import { Destination } from "../data/travelData";
import { useAuth } from "../context/AuthContext";

interface Props {
  dest: Destination | null;
  onClose: () => void;
}

export const DestinationModal: React.FC<Props> = ({ dest, onClose }) => {
  const { isSaved, toggleSaveDestination } = useAuth();

  if (!dest) return null;

  const saved = isSaved(dest.id);

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.coordinates[0]},${dest.coordinates[1]}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-800">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={dest.image}
            alt={dest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              {dest.category} • {dest.country}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">{dest.title}</h2>
            <p className="text-emerald-200 text-sm mt-1">{dest.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Best Season</p>
              <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {dest.bestMonths}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Est. Daily Cost</p>
              <p className="font-bold text-emerald-800 text-sm mt-0.5">${dest.estimatedDailyUSD} USD</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Safety Score</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">★ {dest.safetyRating} / 5.0</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Region</p>
              <p className="font-bold text-slate-800 mt-0.5">{dest.continent}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">About This Destination</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{dest.description}</p>
          </div>

          {/* Top Attractions & Insider Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-700" /> Top Attractions
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {dest.topAttractions.map((att, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{att}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider mb-3">
                💡 Local Naturalist & Travel Tips
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {dest.localTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => toggleSaveDestination(dest.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                saved
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-rose-600 text-rose-600" : ""}`} />
              <span>{saved ? "Saved to Wishlist" : "Save to Wishlist"}</span>
            </button>

            <button
              onClick={openDirections}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Maps & Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
