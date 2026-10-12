import React, { useState } from 'react';
import { InteractiveWorldMap } from './InteractiveWorldMap';
import { DESTINATIONS, HOTELS } from '../data/travelData';
import { Destination, HotelStay, Currency, MapPoi } from '../types/travel';
import { ArrowLeft, Compass, Globe2, ShieldCheck, Sparkles, BedDouble, MapPin } from 'lucide-react';

interface MapExplorerViewProps {
  onBack: () => void;
  onAddToPlanner?: (poi: any) => void;
  currency: Currency;
  onSelectDestinationModal?: (dest: Destination) => void;
  onSelectHotelModal?: (hotel: HotelStay) => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
}

export const MapExplorerView: React.FC<MapExplorerViewProps> = ({
  onBack,
  onAddToPlanner,
  currency,
  onSelectDestinationModal,
  onSelectHotelModal,
  savedIds = [],
  onToggleSave = () => {}
}) => {
  return (
    <div className="min-h-screen bg-[#fbfaf6] flex flex-col">
      {/* Top Map Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#ded8c7] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Travel Life</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="font-bold text-sm sm:text-base text-[#11382e]">
                Interactive Worldwide Travel Map
              </h1>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-500 hidden sm:block">
              OpenStreetMap Verified Cartography · {DESTINATIONS.length} Destinations · {HOTELS.length} Hand-Selected Stays
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Leaflet Precision Coordinates Active</span>
          </div>
        </div>
      </header>

      {/* Main Full-Height Interactive Map */}
      <main className="flex-1 p-3 sm:p-6 max-w-[1700px] w-full mx-auto flex flex-col">
        <InteractiveWorldMap
          destinations={DESTINATIONS}
          hotels={HOTELS}
          onSelectDestination={(dest) => {
            if (onSelectDestinationModal) onSelectDestinationModal(dest);
          }}
          onSelectHotel={(hotel) => {
            if (onSelectHotelModal) onSelectHotelModal(hotel);
          }}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
          currency={currency}
          onAddToPlanner={(dest) => {
            if (onAddToPlanner) {
              onAddToPlanner({
                id: `dest-${Date.now()}`,
                name: dest.name,
                city: dest.city,
                country: dest.country,
                coordinates: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
                category: 'Historic',
                duration: `${dest.recommendedStayDays || 3} days`,
                costUSD: dest.dailyCostUSD,
                description: dest.description,
                rating: dest.rating
              });
            }
          }}
        />
      </main>
    </div>
  );
};
