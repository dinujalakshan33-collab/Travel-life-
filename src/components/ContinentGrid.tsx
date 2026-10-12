import React, { useState } from 'react';
import { CONTINENTS, POPULAR_COUNTRIES } from '../data/travelData';
import { ArrowRight, Compass, Globe2, Sparkles, MapPin } from 'lucide-react';

interface ContinentGridProps {
  onSelectContinent: (continentName: string) => void;
  onSelectCountry?: (countryName: string) => void;
}

export const ContinentGrid: React.FC<ContinentGridProps> = ({ 
  onSelectContinent,
  onSelectCountry 
}) => {
  const [activeTab, setActiveTab] = useState<'countries' | 'continents'>('countries');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-[#ded8c7]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-1">
            <Globe2 className="w-4 h-4 text-emerald-700" />
            <span>Worldwide Regional Directory</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-bold tracking-tight">
            Popular Countries &amp; Continents
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-xl">
            Discover verified field guides, cultural histories, and regional route maps by country or geographic sector.
          </p>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'countries' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Top Countries
          </button>
          <button
            onClick={() => setActiveTab('continents')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'continents' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All 5 Continents
          </button>
        </div>
      </div>

      {activeTab === 'countries' ? (
        /* Top Countries Cards Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {POPULAR_COUNTRIES.map(country => (
            <div
              key={country.id}
              onClick={() => {
                if (onSelectCountry) onSelectCountry(country.name);
                else onSelectContinent(country.region);
              }}
              className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-[#ded8c7] flex flex-col justify-end p-4 bg-stone-900"
            >
              <img
                src={country.imageUrl}
                alt={country.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Top Region Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                  {country.code} · {country.region}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white">
                <h3 className="font-bold text-lg leading-tight group-hover:text-emerald-300 transition-colors">
                  {country.name}
                </h3>
                <p className="text-[10px] text-stone-300 line-clamp-2 mt-1 leading-relaxed">
                  {country.tagline}
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-emerald-200">
                  <span>Explore Guides</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Continents Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTINENTS.map(cont => (
            <div
              key={cont.id}
              onClick={() => onSelectContinent(cont.name)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-[#ded8c7] flex flex-col justify-end p-6 bg-stone-900"
            >
              <img
                src={cont.imageUrl}
                alt={cont.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="bg-[#11382e]/90 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md border border-emerald-400/30 uppercase">
                  {cont.statLabel}
                </span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="editorial-title text-2xl font-bold leading-tight group-hover:text-emerald-300 transition-colors">
                  {cont.name}
                </h3>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2 leading-relaxed">
                  {cont.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span>View all destinations in {cont.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
