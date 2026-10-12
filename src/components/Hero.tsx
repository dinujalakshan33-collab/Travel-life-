import React from 'react';
import { 
  Search, 
  MapPin, 
  Compass, 
  Sparkles, 
  Globe2, 
  SlidersHorizontal, 
  ArrowRight,
  BedDouble,
  Calendar,
  DollarSign
} from 'lucide-react';
import { POPULAR_COUNTRIES } from '../data/travelData';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedBudget: string;
  setSelectedBudget: (b: string) => void;
  activeFilterTab: string;
  setActiveFilterTab: (tab: string) => void;
  onExplore: () => void;
  onQuickSelect: (destinationOrCountry: string) => void;
  onOpenMap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  selectedBudget,
  setSelectedBudget,
  activeFilterTab,
  setActiveFilterTab,
  onExplore,
  onQuickSelect,
  onOpenMap
}) => {
  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      
      {/* Hero Visual Card with High-Res Panoramic Travel Image */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0e2a22] text-white shadow-2xl min-h-[520px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-10 lg:p-16 border border-[#23483c]/50">
        
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Scenic Worldwide Travel Horizon"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a22] via-[#0e2a22]/70 to-[#0e2a22]/40" />
        </div>

        {/* Top Kicker & Stats */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Travel Life Worldwide Cartography</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-white/80 font-mono text-[11px]">
            <span>195+ Countries Covered</span>
            <span>·</span>
            <span>Verified GPS Coordinates</span>
            <span>·</span>
            <span>Curated Accommodation</span>
          </div>
        </div>

        {/* Hero Center Typography */}
        <div className="relative z-10 max-w-4xl my-auto py-8">
          <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-2">
            EXPLORE THE WORLD
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.05] drop-shadow-sm">
            Discover Extraordinary Places. Plan Every Journey.
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mt-4 leading-relaxed font-light">
            From Sri Lanka’s ancient rock citadels and Swiss alpine pinnacles to the coral atolls of the Maldives — discover verified destinations, hand-selected luxury stays, and interactive worldwide maps.
          </p>
        </div>

        {/* Multi-Field Prominent Search Container */}
        <div className="relative z-20 w-full mt-4 bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 text-stone-800 shadow-2xl border border-white/40">
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (Takes 5 columns on large) */}
            <div className="lg:col-span-5 relative">
              <label className="block text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1">
                Where would you like to explore?
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-emerald-700 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Sri Lanka, Kyoto, Amalfi Coast, Zermatt..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#11382e]/30 focus:border-[#11382e]"
                />
              </div>
            </div>

            {/* Region Selector (2 columns) */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1">
                World Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#11382e] cursor-pointer"
              >
                <option value="all">All Continents</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Americas">Americas</option>
                <option value="Africa">Africa</option>
                <option value="Middle East">Middle East</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            {/* Travel Style / Category (3 columns) */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1">
                Travel Style &amp; Terrain
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#11382e] cursor-pointer"
              >
                <option value="all">All Travel Styles</option>
                <option value="Coastal & Beaches">Coastal &amp; Beaches</option>
                <option value="Natural Wonders">Natural Wonders</option>
                <option value="Historic Landmarks">Historic Landmarks</option>
                <option value="Adventure & Hiking">Adventure &amp; Hiking</option>
                <option value="Cities & Culture">Cities &amp; Culture</option>
                <option value="Wildlife Sanctuaries">Wildlife Sanctuaries</option>
              </select>
            </div>

            {/* Action Buttons (2 columns) */}
            <div className="lg:col-span-2 flex items-center gap-2 pt-1 sm:pt-0">
              <button
                onClick={onExplore}
                className="flex-1 py-2.5 px-4 bg-[#11382e] hover:bg-[#0c2c24] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Discover</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenMap}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Open Interactive Leaflet World Map"
              >
                <Globe2 className="w-4 h-4 text-emerald-800" />
              </button>
            </div>

          </div>

          {/* Quick Country Destination Chips */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider shrink-0">
              Trending Countries:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {POPULAR_COUNTRIES.slice(0, 9).map(country => (
                <button
                  key={country.id}
                  onClick={() => onQuickSelect(country.name)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-[#11382e] text-stone-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0"
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
