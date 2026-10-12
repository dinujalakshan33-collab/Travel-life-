import React from 'react';
import { CONTINENTS } from '../data/travelData';
import { ArrowRight, Compass } from 'lucide-react';

interface ContinentGridProps {
  onSelectContinent: (continentName: string) => void;
}

export const ContinentGrid: React.FC<ContinentGridProps> = ({ onSelectContinent }) => {
  const europe = CONTINENTS.find(c => c.id === 'europe')!;
  const asia = CONTINENTS.find(c => c.id === 'asia')!;
  const americas = CONTINENTS.find(c => c.id === 'americas')!;
  const africa = CONTINENTS.find(c => c.id === 'africa')!;
  const oceania = CONTINENTS.find(c => c.id === 'oceania')!;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#eae5d8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="block font-mono text-[10px] font-bold tracking-widest text-[#b83a14] uppercase mb-1.5">
            REGIONAL FIELD GUIDES
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-semibold tracking-tight">
            Explore by Continent
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#465b53] max-w-xl">
            Choose a region to begin your cross-continental journey with verified municipal databases.
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-medium">
            5 Global Geographic Sectors
          </span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="space-y-4">
        {/* Top Row: 2 Large Cards (Europe & Asia) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Europe */}
          <div
            onClick={() => onSelectContinent('Europe')}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-stone-800/10"
          >
            <img
              src={europe.imageUrl}
              alt={europe.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                {europe.countriesCount} COUNTRIES
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-mono text-[10px] tracking-wider text-stone-300 uppercase mb-1">
                {europe.subtitle}
              </p>
              <h3 className="editorial-title text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {europe.name}
              </h3>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-stone-200">
                <span className="font-mono text-[11px] text-stone-300">{europe.statLabel}</span>
                <span className="flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform text-white">
                  Browse Countries <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Asia */}
          <div
            onClick={() => onSelectContinent('Asia')}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-stone-800/10"
          >
            <img
              src={asia.imageUrl}
              alt={asia.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                {asia.countriesCount} COUNTRIES
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-mono text-[10px] tracking-wider text-stone-300 uppercase mb-1">
                {asia.subtitle}
              </p>
              <h3 className="editorial-title text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {asia.name}
              </h3>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-stone-200">
                <span className="font-mono text-[11px] text-stone-300">{asia.statLabel}</span>
                <span className="flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform text-white">
                  Browse Countries <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Medium Cards (Americas, Africa, Oceania) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Americas */}
          <div
            onClick={() => onSelectContinent('Americas')}
            className="group relative h-56 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-stone-800/10"
          >
            <img
              src={americas.imageUrl}
              alt={americas.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            <div className="absolute top-3.5 left-3.5">
              <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border border-white/20">
                {americas.countriesCount} COUNTRIES
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <p className="font-mono text-[9px] tracking-wider text-stone-300 uppercase mb-0.5">
                {americas.subtitle}
              </p>
              <h3 className="editorial-title text-2xl font-bold text-white mb-1">
                {americas.name}
              </h3>
              <p className="font-mono text-[10px] text-stone-300">{americas.statLabel}</p>
            </div>
          </div>

          {/* Africa */}
          <div
            onClick={() => onSelectContinent('Africa')}
            className="group relative h-56 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-stone-800/10"
          >
            <img
              src={africa.imageUrl}
              alt={africa.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            <div className="absolute top-3.5 left-3.5">
              <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border border-white/20">
                {africa.countriesCount} COUNTRIES
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <p className="font-mono text-[9px] tracking-wider text-stone-300 uppercase mb-0.5">
                {africa.subtitle}
              </p>
              <h3 className="editorial-title text-2xl font-bold text-white mb-1">
                {africa.name}
              </h3>
              <p className="font-mono text-[10px] text-stone-300">{africa.statLabel}</p>
            </div>
          </div>

          {/* Oceania */}
          <div
            onClick={() => onSelectContinent('Oceania')}
            className="group relative h-56 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-stone-800/10 sm:col-span-2 md:col-span-1"
          >
            <img
              src={oceania.imageUrl}
              alt={oceania.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            <div className="absolute top-3.5 left-3.5">
              <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border border-white/20">
                {oceania.countriesCount} COUNTRIES
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <p className="font-mono text-[9px] tracking-wider text-stone-300 uppercase mb-0.5">
                {oceania.subtitle}
              </p>
              <h3 className="editorial-title text-2xl font-bold text-white mb-1">
                {oceania.name}
              </h3>
              <p className="font-mono text-[10px] text-stone-300">{oceania.statLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
