import React from 'react';
import { Compass, Sparkles, MapPin, ChevronDown, Flame } from 'lucide-react';

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
  onQuickSelect: (destinationName: string) => void;
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
  onQuickSelect
}) => {
  return (
    <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Top Red Dot Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1ede4] border border-[#e2dccf] text-[11px] font-semibold tracking-wider text-[#614b36] uppercase mb-6 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-[#b83a14] animate-pulse"></span>
        <span className="font-mono text-[10px] tracking-wider text-stone-700">THE ARCHIVAL FIELD ENGINE 2025</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight text-[#11382e] leading-[1.08] max-w-4xl mx-auto mb-6">
        Discover the World,<br className="hidden sm:inline" />
        Unscripted. Plan Every<br className="hidden sm:inline" />
        Step.
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#4a5f57] max-w-2xl mx-auto leading-relaxed font-light mb-10">
        Explore over 195 sovereign nations, thousands of verified natural sanctuaries, and living cultural heritage with precision geospatial itinerary orchestration.
      </p>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {[
          { id: 'all', label: 'All Destinations' },
          { id: 'nature', label: 'Activities & Nature' },
          { id: 'culture', label: 'Cultural & Historic' },
          { id: 'budget', label: 'Budget Trips' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilterTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilterTab === tab.id
                ? 'bg-[#114b3e] text-white shadow-sm font-semibold'
                : 'bg-transparent text-[#445b53] hover:text-[#11382e] hover:bg-[#ede8dc]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Search & Filter Box */}
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl border border-[#ded8c7] shadow-lg shadow-stone-200/50 p-2 sm:p-2.5 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 text-left">
          
          {/* Field 1: Destination */}
          <div className="md:col-span-4 p-2 sm:p-2.5 rounded-xl hover:bg-[#faf8f2] transition-colors">
            <label className="block text-[10px] font-bold tracking-wider text-stone-600 uppercase font-mono">
              DESTINATION
            </label>
            <div className="mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to explore?"
                className="w-full bg-transparent text-sm text-[#11382e] placeholder-stone-400 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="hidden md:block w-px bg-stone-200 my-2"></div>

          {/* Field 2: Region / Continent */}
          <div className="md:col-span-3 p-2 sm:p-2.5 rounded-xl hover:bg-[#faf8f2] transition-colors relative">
            <label className="block text-[10px] font-bold tracking-wider text-stone-600 uppercase font-mono">
              REGION / CONTINENT
            </label>
            <div className="mt-1 relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#11382e] font-medium appearance-none cursor-pointer focus:outline-none pr-5"
              >
                <option value="all">All Continents</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Americas">Americas</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-0 top-1 pointer-events-none" />
            </div>
          </div>

          <div className="hidden md:block w-px bg-stone-200 my-2"></div>

          {/* Field 3: Category */}
          <div className="md:col-span-2 p-2 sm:p-2.5 rounded-xl hover:bg-[#faf8f2] transition-colors relative">
            <label className="block text-[10px] font-bold tracking-wider text-stone-600 uppercase font-mono">
              CATEGORY
            </label>
            <div className="mt-1 relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#11382e] font-medium appearance-none cursor-pointer focus:outline-none pr-4"
              >
                <option value="all">All Categories</option>
                <option value="Coastal & Beaches">Coastal & Beaches</option>
                <option value="Natural Wonders">Natural Wonders</option>
                <option value="Historic Landmarks">Historic Landmarks</option>
                <option value="Adventure & Hiking">Adventure & Hiking</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-0 top-1 pointer-events-none" />
            </div>
          </div>

          <div className="hidden md:block w-px bg-stone-200 my-2"></div>

          {/* Field 4: Est. Budget & Button */}
          <div className="md:col-span-3 flex items-center justify-between gap-2 p-1.5 pl-2 sm:pl-2.5">
            <div className="w-full">
              <label className="block text-[10px] font-bold tracking-wider text-stone-600 uppercase font-mono">
                EST. BUDGET
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#11382e] font-medium appearance-none cursor-pointer focus:outline-none mt-1"
              >
                <option value="all">Any Tier</option>
                <option value="budget">$ Budget-Friendly</option>
                <option value="mid">$$ Mid-Range</option>
                <option value="luxury">$$$ Luxury</option>
              </select>
            </div>

            <button
              onClick={onExplore}
              className="bg-[#103e33] hover:bg-[#0a2e26] text-white px-5 py-3 rounded-xl font-medium text-xs sm:text-sm tracking-wide flex items-center gap-2 shrink-0 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Suggestions & Trending */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#52665e]">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-stone-600">QUICK SUGGESTIONS:</span>
          {['Kyoto, Japan', 'Amalfi Coast, Italy', 'Banff, Canada', 'Serengeti, Tanzania'].map((item, idx) => (
            <React.Fragment key={item}>
              <button
                onClick={() => onQuickSelect(item)}
                className="hover:text-[#11382e] hover:underline cursor-pointer"
              >
                {item}
              </button>
              {idx < 3 && <span className="text-stone-300">•</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#b83a14]" />
          <span className="font-medium text-stone-600">Trending:</span>
          <button onClick={() => onQuickSelect('Kyoto, Japan')} className="text-[#96371a] hover:underline cursor-pointer font-medium">Sakura 2025</button>
          <span className="text-stone-300">•</span>
          <button onClick={() => onQuickSelect('Amalfi Coast, Italy')} className="text-[#96371a] hover:underline cursor-pointer font-medium">Swiss Alps</button>
          <span className="text-stone-300">•</span>
          <button onClick={() => onQuickSelect('Raja Ampat, Indonesia')} className="text-[#96371a] hover:underline cursor-pointer font-medium">Raja Ampat</button>
        </div>
      </div>
    </section>
  );
};
