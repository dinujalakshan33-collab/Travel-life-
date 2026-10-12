import React, { useState } from 'react';
import { Destination, Currency } from '../types/travel';
import { 
  Star, 
  Heart, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  SlidersHorizontal,
  Compass,
  Sparkles,
  Layers
} from 'lucide-react';

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
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');

  const filterOptions = [
    'All',
    'Trending',
    'Historic Landmarks',
    'Natural Wonders',
    'Coastal & Beaches',
    'Adventure & Hiking',
    'Cities & Culture',
    'Wildlife Sanctuaries'
  ];

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

  const filtered = destinations.filter(dest => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Trending') return dest.trending || dest.rating >= 4.95;
    return dest.category === selectedFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.dailyCostUSD - b.dailyCostUSD;
    if (sortBy === 'price-desc') return b.dailyCostUSD - a.dailyCostUSD;
    return 0; // recommended order
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-[#ded8c7]">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Worldwide Destination Compendium</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#11382e] tracking-tight">
            Curated Global Destinations
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Verified travel sanctuaries across Asia, Europe, the Americas, Africa, and Oceania. Precision cartography and seasonal travel guides.
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-white border border-[#ded8c7] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e] cursor-pointer"
          >
            <option value="recommended">Featured / Curated</option>
            <option value="rating">Highest Traveler Rating</option>
            <option value="price-asc">Budget: Low to High</option>
            <option value="price-desc">Budget: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Segmented Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8">
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setSelectedFilter(option)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === option
                ? 'bg-[#11382e] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sorted.map(dest => {
          const isSaved = savedIds.includes(dest.id);

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group bg-white rounded-3xl border border-[#ded8c7] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo Banner */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#11382e]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {dest.category}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(dest.id);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isSaved ? 'bg-rose-50 text-rose-600' : 'bg-black/50 text-white hover:bg-black/80'
                  }`}
                  aria-label="Save destination"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                </button>

                {/* Bottom Overlay: City & Country + Rating */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-[11px] font-mono font-medium drop-shadow-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{dest.city}, {dest.country}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-xs">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{dest.rating.toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#11382e] group-hover:text-emerald-800 transition-colors line-clamp-1 leading-snug">
                    {dest.name}
                  </h3>
                  
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights or activities */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] text-stone-600 bg-[#f7f5ed] border border-[#e8e4d8] px-2 py-0.5 rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price, Season & Footer CTA */}
                <div className="mt-5 pt-3.5 border-t border-[#ede8dc] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-stone-400 block uppercase">
                      Daily Budget (Est.)
                    </span>
                    <span className="font-bold text-[#11382e] text-sm">
                      {formatPrice(dest.dailyCostUSD)} <span className="text-[10px] font-normal text-stone-500">/ day</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-stone-400 block uppercase">
                      Best Visiting Time
                    </span>
                    <span className="font-semibold text-stone-700 text-[11px] flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-emerald-700" />
                      <span>{dest.bestSeason.split('/')[0].trim()}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
