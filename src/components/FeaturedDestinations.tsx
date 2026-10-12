import React, { useState } from 'react';
import { Destination, Currency } from '../types/travel';
import { Star, Bookmark, ArrowRight } from 'lucide-react';
import { CURRENCY_RATES } from '../data/travelData';

interface FeaturedDestinationsProps {
  destinations: Destination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  currency: Currency;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  destinations,
  savedIds,
  onToggleSave,
  onSelectDestination,
  currency
}) => {
  const [filterPill, setFilterPill] = useState<string>('All');

  const filterOptions = [
    'All',
    'Trending Now',
    'Coastal & Beaches',
    'Natural Wonders',
    'Historic Landmarks',
    'Adventure & Hiking'
  ];

  const filtered = destinations.filter(dest => {
    if (filterPill === 'All') return true;
    if (filterPill === 'Trending Now') return dest.rating >= 4.9;
    return dest.category === filterPill;
  });

  const getConvertedPrice = (usd: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1.0;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(usd * rate)}`;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#eae5d8]">
      {/* Header */}
      <div className="mb-8">
        <span className="block font-mono text-[10px] font-bold tracking-widest text-[#b83a14] uppercase mb-1.5">
          CURATED GLOBAL HIGHLIGHTS
        </span>
        <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-semibold tracking-tight">
          Featured Destinations
        </h2>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {filterOptions.map(option => (
            <button
              key={option}
              onClick={() => setFilterPill(option)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterPill === option
                  ? 'bg-[#114b3e] text-white shadow-xs font-semibold'
                  : 'bg-[#f0ece1] text-[#425850] hover:bg-[#e4decb]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(dest => {
          const isSaved = savedIds.includes(dest.id);

          return (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#ded8c7] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Section */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border border-white/20 uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {dest.badge}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(dest.id);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#114b3e] text-white border border-[#114b3e]'
                      : 'bg-black/40 text-white/90 hover:bg-black/60 border border-white/20'
                  }`}
                  title={isSaved ? 'Remove from saved' : 'Save destination'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                {/* Bottom Location Tag on Image */}
                {dest.locationTag && (
                  <div className="absolute bottom-2.5 left-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white/95 uppercase drop-shadow-md">
                      {dest.locationTag}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs text-[#5c7068] mb-1.5">
                    <span className="font-mono text-[11px] font-medium tracking-wide text-stone-600">
                      {dest.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-[#b83a14] font-semibold text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{dest.rating === 4.9 ? '4.9' : dest.rating.toFixed(2)}</span>
                      <span className="text-stone-500 font-normal">({dest.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#11382e] tracking-tight group-hover:text-[#0c4034] transition-colors mb-2">
                    {dest.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#52645d] leading-relaxed line-clamp-2 mb-4">
                    {dest.description}
                  </p>
                </div>

                {/* Footer Meta & Explore */}
                <div className="pt-3 border-t border-[#eae5d8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#465b53] font-mono text-[11px]">
                    <span className="font-semibold text-stone-800">{dest.budgetTier}</span>
                    <span className="text-stone-300">•</span>
                    <span>{dest.duration}</span>
                  </div>

                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="flex items-center gap-1 bg-[#f4f1e8] hover:bg-[#eae4d6] text-[#11382e] font-semibold px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer group-hover:bg-[#114b3e] group-hover:text-white"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
