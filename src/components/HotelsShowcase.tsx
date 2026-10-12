import React, { useState } from 'react';
import { 
  HotelStay, 
  AccommodationType, 
  Currency 
} from '../types/travel';
import { 
  BedDouble, 
  Star, 
  MapPin, 
  ExternalLink, 
  Check, 
  Heart, 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Waves,
  Trees,
  Crown,
  Home,
  Tag
} from 'lucide-react';

interface HotelsShowcaseProps {
  hotels: HotelStay[];
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectHotel: (hotel: HotelStay) => void;
}

export const HotelsShowcase: React.FC<HotelsShowcaseProps> = ({
  hotels,
  currency,
  savedIds,
  onToggleSave,
  onSelectHotel
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const countries = Array.from(new Set(hotels.map(h => h.country)));

  const filteredHotels = hotels.filter(hotel => {
    if (selectedType !== 'all' && hotel.type !== selectedType) return false;
    if (selectedCountry !== 'all' && hotel.country !== selectedCountry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        hotel.name.toLowerCase().includes(q) ||
        hotel.city.toLowerCase().includes(q) ||
        hotel.country.toLowerCase().includes(q) ||
        hotel.facilities.some(f => f.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#ded8c7]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
            <BedDouble className="w-4 h-4 text-amber-600" />
            <span>Worldwide Verified Accommodation</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#11382e] tracking-tight">
            Curated Stays &amp; Luxury Sanctuaries
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
            Hand-selected overwater pavilions, high-altitude alpine lodges, seaside villas, and boutique heritage stays. Real verified coordinates with transparent estimated pricing.
          </p>
        </div>

        {/* Estimation Notice */}
        <div className="bg-[#f5f1e4] border border-[#ded8c7] rounded-2xl p-3 max-w-sm flex items-start gap-2.5 text-[11px] text-[#4a5f57]">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <span>
            Rates are estimated market averages based on seasonal demand. Always verify real-time availability via official booking links.
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'all' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Types ({hotels.length})
          </button>
          <button
            onClick={() => setSelectedType('Luxury Resort')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'Luxury Resort' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Luxury Resorts
          </button>
          <button
            onClick={() => setSelectedType('Beach Resort')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'Beach Resort' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Beachfront
          </button>
          <button
            onClick={() => setSelectedType('Eco-Lodge')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'Eco-Lodge' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Eco-Lodges
          </button>
          <button
            onClick={() => setSelectedType('Boutique Stay')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'Boutique Stay' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Boutique Chalets
          </button>
          <button
            onClick={() => setSelectedType('Budget Hotel & Hostel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === 'Budget Hotel & Hostel' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hostels &amp; Budget
          </button>
        </div>

        {/* Country Select & Search Input */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="text-xs font-semibold bg-white border border-[#ded8c7] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e] cursor-pointer"
          >
            <option value="all">All Countries</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stays or amenities..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
            />
          </div>
        </div>

      </div>

      {/* Hotel Cards Grid */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <BedDouble className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800">No properties matched your criteria</h3>
          <p className="text-xs text-stone-500 mt-1">Try resetting your country or accommodation filters.</p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedCountry('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#11382e] text-white text-xs font-semibold rounded-xl hover:bg-[#0b2921]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map(hotel => {
            const isSaved = savedIds.includes(hotel.id);

            return (
              <div 
                key={hotel.id}
                className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => onSelectHotel(hotel)}
              >
                {/* Photo Banner */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Top Type Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#11382e]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {hotel.type}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(hotel.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isSaved ? 'bg-rose-50 text-rose-600' : 'bg-black/50 text-white hover:bg-black/80'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                  </button>

                  {/* Rating & City on Bottom of Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono font-medium drop-shadow-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{hotel.city}, {hotel.country}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{hotel.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#11382e] group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Facilities Preview */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {hotel.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                          {f}
                        </span>
                      ))}
                      {hotel.facilities.length > 3 && (
                        <span className="text-[10px] font-medium text-stone-400 py-0.5">
                          +{hotel.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-3.5 border-t border-[#ede8dc] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-400 block uppercase">
                        Estimated Rate
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-[#11382e]">
                          {formatPrice(hotel.pricePerNightUSD)}
                        </span>
                        <span className="text-[10px] text-stone-500">/ night</span>
                      </div>
                    </div>

                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-[#11382e] text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Check Rates</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
