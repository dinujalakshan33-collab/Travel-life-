import React, { useState } from 'react';
import { BUDGET_ARCHETYPES, CURRENCY_RATES } from '../data/travelData';
import { Currency } from '../types/travel';
import { Bed, Utensils, Train, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

interface BudgetArchetypesProps {
  currency: Currency;
  onSelectArchetypeItinerary: (name: string) => void;
}

export const BudgetArchetypes: React.FC<BudgetArchetypesProps> = ({
  currency,
  onSelectArchetypeItinerary
}) => {
  const [selectedTier, setSelectedTier] = useState<'Backpacker' | 'Comfort' | 'Luxury'>('Backpacker');

  const archetypes = BUDGET_ARCHETYPES.filter(a => a.tier === selectedTier);

  const formatPrice = (usd: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1.0;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(usd * rate)}`;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#eae5d8]">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <span className="block font-mono text-[10px] font-bold tracking-widest text-[#b83a14] uppercase mb-1.5">
            EMPIRICAL FIELD ECONOMICS
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-semibold tracking-tight">
            Smart Budget Archetypes
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#465b53] max-w-2xl leading-relaxed">
            Realistic daily spend models calibrated against regional price indexes, local transit, and verified stay rates.
          </p>
        </div>

        {/* Archetype Toggle Tabs */}
        <div className="inline-flex p-1 bg-[#ede8dc] rounded-xl self-start lg:self-auto border border-[#ded8c7]">
          <button
            onClick={() => setSelectedTier('Backpacker')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedTier === 'Backpacker'
                ? 'bg-white text-[#11382e] shadow-xs font-semibold'
                : 'text-[#4e645b] hover:text-[#11382e]'
            }`}
          >
            Backpacker (&lt;$45/day)
          </button>
          <button
            onClick={() => setSelectedTier('Comfort')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedTier === 'Comfort'
                ? 'bg-white text-[#11382e] shadow-xs font-semibold'
                : 'text-[#4e645b] hover:text-[#11382e]'
            }`}
          >
            Comfort ($50–$150/day)
          </button>
          <button
            onClick={() => setSelectedTier('Luxury')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedTier === 'Luxury'
                ? 'bg-white text-[#11382e] shadow-xs font-semibold'
                : 'text-[#4e645b] hover:text-[#11382e]'
            }`}
          >
            Luxury ($200+/day)
          </button>
        </div>
      </div>

      {/* 3 Archetype Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {archetypes.map((archetype) => (
          <div
            key={archetype.id}
            className="bg-white rounded-2xl border border-[#ded8c7] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Region Pill and Price */}
              <div className="flex items-center justify-between mb-3">
                <span className={`font-mono text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded border uppercase ${
                  archetype.regionLabel.includes('EUROPE')
                    ? 'text-teal-800 bg-teal-50 border-teal-200'
                    : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                }`}>
                  {archetype.regionLabel}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#11382e] font-mono">
                  {formatPrice(archetype.dailySpendUSD)} <span className="text-xs font-normal text-stone-500 font-sans">/ day</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="editorial-title text-xl font-bold text-[#11382e] mb-2 tracking-tight">
                {archetype.name}
              </h3>

              {/* Tagline */}
              <p className="text-xs text-[#52645d] leading-relaxed mb-5">
                {archetype.tagline}
              </p>

              {/* Itemized Spend Breakdown */}
              <div className="space-y-2.5 py-4 border-y border-[#ede8dc] text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <div className="flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5 text-stone-400" />
                    <span>{archetype.stays.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-stone-900">
                    {formatPrice(archetype.stays.cost)}/day
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-3.5 h-3.5 text-stone-400" />
                    <span>{archetype.food.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-stone-900">
                    {formatPrice(archetype.food.cost)}/day
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <div className="flex items-center gap-2">
                    <Train className="w-3.5 h-3.5 text-stone-400" />
                    <span>{archetype.transit.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-stone-900">
                    {formatPrice(archetype.transit.cost)}/day
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 flex items-center justify-between text-xs mt-4">
              <span className="text-stone-500 font-mono text-[11px]">
                Rec. Duration: <strong className="text-stone-700">{archetype.recommendedDuration}</strong>
              </span>

              <button
                onClick={() => onSelectArchetypeItinerary(archetype.name)}
                className="flex items-center gap-1 text-[#114b3e] font-semibold hover:text-[#0b2f26] hover:underline cursor-pointer transition-colors"
              >
                <span>View Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
