import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Compass, Star, Bookmark, ExternalLink, 
  Navigation, Layers, ZoomIn, ZoomOut, RotateCcw, Check, ArrowRight, 
  ChevronRight, Shield, ShieldCheck, Filter, Globe, X, Sparkles, Plus, Calendar, AlertCircle
} from 'lucide-react';
import { Currency, Destination } from '../types/travel';
import { CURRENCY_RATES } from '../data/travelData';

export interface ExpeditionItem {
  id: string;
  name: string;
  location: string;
  country: string;
  region: 'Asia' | 'Europe' | 'The Americas' | 'Africa' | 'Oceania & Pacific';
  terrain: 'Historical & Temples' | 'Alpine & Passes' | 'Coastal & Archipelagos' | 'Wildlife Corridors' | 'Culinary Terroir' | 'Hidden Gems';
  rating: number;
  reviewsCount: string;
  categoryTag: string;
  durationTag: string;
  osmType: string;
  osmNumber: string;
  coordinates: { lat: number; lng: number; latStr: string; lngStr: string };
  seasonTag: string;
  description: string;
  stat1: { label: string; value: string };
  stat2: { label: string; value: string };
  stat3: { label: string; value: string };
  imageUrl: string;
  dailyCostUSD: number;
  optimumSeason: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
}

export const EXPEDITION_ITEMS: ExpeditionItem[] = [
  {
    id: 'fushimi-inari',
    name: 'Fushimi Inari-taisha & Torii Mountain Path',
    location: 'Kyoto, Honshu • Japan',
    country: 'Japan',
    region: 'Asia',
    terrain: 'Historical & Temples',
    rating: 4.92,
    reviewsCount: '21.8k',
    categoryTag: 'Historical & Temples',
    durationTag: '3 - 4 Hours Hike',
    osmType: 'OSM Node',
    osmNumber: '#2841908',
    coordinates: { lat: 34.9671, lng: 135.7727, latStr: '34.9671° N', lngStr: '135.7727° E' },
    seasonTag: 'Oct - Nov • Peak Autumn Foliage',
    description: 'Dedicated to Inari, the Shinto deity of harvest and industry. Ten thousand vermilion torii line the sacred forest path ascending the wooded slope of sacred Mount Inari.',
    stat1: { label: 'ADMISSION PASS', value: 'Free ($0.00)' },
    stat2: { label: 'TRANSIT FROM KYOTO STN', value: '$1.90 (JR Nara Line)' },
    stat3: { label: 'PACE / CROWD INDEX', value: 'Moderate Elevation' },
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 95,
    optimumSeason: 'Autumn'
  },
  {
    id: 'plitvice-lakes',
    name: 'Plitvice Lakes Terraced Cascade Network',
    location: 'Lika-Senj • Croatia',
    country: 'Croatia',
    region: 'Europe',
    terrain: 'Hidden Gems',
    rating: 4.88,
    reviewsCount: '14.2k',
    categoryTag: 'Nature & Cascades',
    durationTag: 'Full Day (6 - 8 Hrs)',
    osmType: 'OSM Way',
    osmNumber: '#329104',
    coordinates: { lat: 44.8654, lng: 15.6036, latStr: '44.8654° N', lngStr: '15.6036° E' },
    seasonTag: 'May - Jun or Sep • Ideal Water Flow',
    description: 'UNESCO World Heritage site featuring sixteen interconnected karst lakes formed by travertine barriers. Electric boats and panoramic train links connect cascading crystal falls.',
    stat1: { label: 'PARK PASS', value: '€40.00 (High) / €15 (Off)' },
    stat2: { label: 'BOAT & SHUTTLES', value: 'Included in Pass' },
    stat3: { label: 'BOARDWALK LENGTH', value: 'Guided Trek Route C: 8.0 km' },
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 110,
    optimumSeason: 'Spring'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu Historic Citadel',
    location: 'Urubamba • Cusco, Peru',
    country: 'Peru',
    region: 'The Americas',
    terrain: 'Alpine & Passes',
    rating: 4.96,
    reviewsCount: '34.1k',
    categoryTag: 'Alpine Antiquities',
    durationTag: '2,430m Elevation',
    osmType: 'OSM Relation',
    osmNumber: '#12903',
    coordinates: { lat: -13.1631, lng: -72.5450, latStr: '13.1631° S', lngStr: '72.5450° W' },
    seasonTag: 'May - Sep • Dry Alpine Season',
    description: '15th-century Inca citadel built without mortar. Circuit 2 entry permits access to classic postcard terrace and Temple of the Sun with strict preservation slot caps.',
    stat1: { label: 'SANCTUARY PERMIT', value: '152 PEN (~$42 USD)' },
    stat2: { label: 'CONSETTUR BUS', value: '$24 Roundtrip' },
    stat3: { label: 'INCA TRAIL ACCESS', value: 'Guided Trek Req.' },
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 130,
    optimumSeason: 'Summer'
  },
  {
    id: 'reine-lofoten',
    name: 'Reine & Lofoten Arctic Archipelago',
    location: 'Nordland • Norway',
    country: 'Norway',
    region: 'Europe',
    terrain: 'Coastal & Archipelagos',
    rating: 4.94,
    reviewsCount: '8.7k',
    categoryTag: 'Arctic Coastal & Fjords',
    durationTag: 'Aurora & Midnight Sun',
    osmType: 'OSM Node',
    osmNumber: '#7192154',
    coordinates: { lat: 67.9332, lng: 13.0894, latStr: '67.9332° N', lngStr: '13.0894° E' },
    seasonTag: 'Feb - Mar (Aurora) or Jul (Sun)',
    description: 'Classic Norwegian fishing enclave beneath the sheer 448-meter stairs of Reinebringen. Direct kayak expeditions through glacial fjords and midnight sun navigation.',
    stat1: { label: 'RORBU CABIN STAY', value: '~$190 - $310 / Night' },
    stat2: { label: 'MOSKENES FERRY', value: 'Bodø -> Moskenes ($28)' },
    stat3: { label: 'REINEBRINGEN TRAIL', value: '1,560 Sherpa Steps' },
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 240,
    optimumSeason: 'Summer'
  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro Volcanic Caldera Sanctuary',
    location: 'Arusha Region • Tanzania',
    country: 'Tanzania',
    region: 'Africa',
    terrain: 'Wildlife Corridors',
    rating: 4.91,
    reviewsCount: '7.2k',
    categoryTag: 'Wildlife Sanctuaries',
    durationTag: 'Big 5 Habitat',
    osmType: 'OSM Boundary',
    osmNumber: '#401920',
    coordinates: { lat: -3.2397, lng: 35.4875, latStr: '3.2397° S', lngStr: '35.4875° E' },
    seasonTag: 'Jun - Oct • Dry Season Game Viewing',
    description: "The world's largest intact, unflooded volcanic caldera spanning 260 square kilometers. Shelters over 25,000 large mammals including black rhinos and massive lion prides.",
    stat1: { label: 'CONSERVATION FEE', value: '$70.80 / 24h Permit' },
    stat2: { label: 'CRATER DESCENT FEE', value: '$295 / 4x4 Vehicle' },
    stat3: { label: 'SAFARI GUIDE', value: 'Licensed Driver Req.' },
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 360,
    optimumSeason: 'Summer'
  },
  {
    id: 'oia-santorini',
    name: 'Oia & Aegean Caldera Precipice',
    location: 'Santorini • Cyclades, Greece',
    country: 'Greece',
    region: 'Europe',
    terrain: 'Coastal & Archipelagos',
    rating: 4.87,
    reviewsCount: '29.5k',
    categoryTag: 'Cycladic Coast & Architecture',
    durationTag: 'Volcanic Terroir',
    osmType: 'OSM Place',
    osmNumber: '#109264',
    coordinates: { lat: 36.4618, lng: 25.3753, latStr: '36.4618° N', lngStr: '25.3753° E' },
    seasonTag: 'Apr - May or Sep - Oct • Mild Climate',
    description: 'Carved into the volcanic rim above the flooded lagoon. The Byzantine castle ruins provide the famed sunset panorama and access to the 10km cliff edge trail to Fira.',
    stat1: { label: 'VILLAGE ACCESS', value: 'Public / Free' },
    stat2: { label: 'KTEL LOCAL BUS', value: '€1.80 from Fira' },
    stat3: { label: 'CALDERA TREK ROUTE', value: 'Fira -> Oia (10.2 km)' },
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    dailyCostUSD: 210,
    optimumSeason: 'Autumn'
  }
];

interface CuratedExpeditionsViewProps {
  onBackToHome: () => void;
  onOpenPlanner: () => void;
  onOpenAdminOps?: () => void;
  onSelectDestinationModal: (dest: Destination) => void;
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const CuratedExpeditionsView: React.FC<CuratedExpeditionsViewProps> = ({
  onBackToHome,
  onOpenPlanner,
  onOpenAdminOps,
  onSelectDestinationModal,
  currency,
  savedIds,
  onToggleSave
}) => {
  // View mode switcher: 'split' | 'grid' | 'map'
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [sortOption, setSortOption] = useState<string>('rating');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [osmVerifiedOnly, setOsmVerifiedOnly] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState<string>('Asia');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('all');
  const [selectedTerrain, setSelectedTerrain] = useState<string>('Historical & Temples');
  const [maxBudget, setMaxBudget] = useState<number>(180);
  const [selectedSeason, setSelectedSeason] = useState<string>('Autumn');
  
  // Active selected POI on map
  const [activePoi, setActivePoi] = useState<ExpeditionItem>(EXPEDITION_ITEMS[0]);
  const [mapLayer, setMapLayer] = useState<'street' | 'topography' | 'satellite'>('street');
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [selectedSequenceIds, setSelectedSequenceIds] = useState<string[]>(['fushimi-inari', 'plitvice-lakes', 'machu-picchu']);
  
  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSequence = (id: string) => {
    if (selectedSequenceIds.includes(id)) {
      setSelectedSequenceIds(prev => prev.filter(item => item !== id));
      showToast('Removed from Expedition Sequence');
    } else {
      setSelectedSequenceIds(prev => [...prev, id]);
      showToast('Added to Expedition Sequence');
    }
  };

  // Filter items
  const filteredItems = EXPEDITION_ITEMS.filter(item => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = item.name.toLowerCase().includes(q) ||
                    item.location.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedContinent !== 'all') {
      if (selectedContinent === 'Asia' && item.region !== 'Asia') return false;
      if (selectedContinent === 'Europe' && item.region !== 'Europe') return false;
      if (selectedContinent === 'The Americas' && item.region !== 'The Americas') return false;
      if (selectedContinent === 'Africa' && item.region !== 'Africa') return false;
      if (selectedContinent === 'Oceania & Pacific' && item.region !== 'Oceania & Pacific') return false;
    }
    if (selectedTerritory !== 'all' && item.country.toLowerCase() !== selectedTerritory.toLowerCase()) {
      return false;
    }
    if (selectedTerrain && selectedTerrain !== 'all' && item.terrain !== selectedTerrain) {
      // soft match or strict
    }
    return true;
  });

  const displayList = filteredItems.length > 0 ? filteredItems : EXPEDITION_ITEMS;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedContinent('all');
    setSelectedTerritory('all');
    setSelectedTerrain('all');
    setSelectedSeason('all');
    showToast('Filters reset to default catalog');
  };

  const handleLocateOnMap = (item: ExpeditionItem) => {
    setActivePoi(item);
    showToast(`Focused map coordinates on ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex flex-col selection:bg-[#114b3e] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#11382e] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-500/30 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="border-b border-[#ded8c7] bg-[#fbfaf6] px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#11382e] font-sans">
                Curated Expeditions
              </h1>
              <span className="bg-[#ede8dc] text-[#11382e] font-mono text-xs px-2.5 py-0.5 rounded-full font-semibold border border-[#ded8c7]">
                482 Live Locations
              </span>
            </div>
            <p className="text-xs text-[#52645d] mt-0.5">
              Synchronized with OpenStreetMap and peer-reviewed field dispatches
            </p>
          </div>

          {/* Right Controls: View Switcher & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Split Canvas / Field Grid / Cartography Focus switch */}
            <div className="inline-flex p-1 bg-[#ede8dc] rounded-xl border border-[#ded8c7] text-xs font-medium">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'split' ? 'bg-white text-[#11382e] shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Split Canvas</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#11382e] shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Field Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'map' ? 'bg-white text-[#11382e] shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Cartography Focus</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-[#ded8c7] rounded-xl px-3 py-1.5 text-xs text-[#11382e] font-medium appearance-none cursor-pointer focus:outline-none pr-7 shadow-2xs"
              >
                <option value="rating">Highest Rated (4.8+)</option>
                <option value="cost-low">Lowest Daily Cost</option>
                <option value="popularity">Most Popular</option>
                <option value="recent">OSM Verified Recent</option>
              </select>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-2.5 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Row */}
        <div className="max-w-[1600px] mx-auto mt-3 pt-3 border-t border-[#ede8dc] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">ACTIVE FILTERS:</span>
          
          <span className="inline-flex items-center gap-1.5 bg-[#e4ded0] text-[#11382e] px-2.5 py-1 rounded-full font-medium">
            Asia (114)
            <button onClick={() => setSelectedContinent('all')} className="hover:text-red-700 cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 bg-[#e4ded0] text-[#11382e] px-2.5 py-1 rounded-full font-medium">
            Temples &amp; Antiquities
            <button onClick={() => setSelectedTerrain('all')} className="hover:text-red-700 cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 bg-[#e4ded0] text-[#11382e] px-2.5 py-1 rounded-full font-medium">
            Autumn (Sep - Nov)
            <button onClick={() => setSelectedSeason('all')} className="hover:text-red-700 cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-full font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>OpenStreetMap Verified Only</span>
          </span>

          <button 
            onClick={resetFilters}
            className="text-[11px] text-[#8c381c] font-semibold hover:underline ml-2 cursor-pointer"
          >
            Reset all criteria
          </button>
        </div>
      </div>

      {/* Main Workspace: 3 Columns (Sidebar Filters | POI Cards | Interactive Map) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Filter Sidebar (visible unless map mode) */}
        {viewMode !== 'map' && (
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-6">
            
            {/* Direct Discovery Search */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-2">
                DIRECT DISCOVERY
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="E.g., Kyoto, Shinto, Fjord..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              {/* OSM Geocoded Only Toggle */}
              <div className="mt-4 pt-3 border-t border-[#ede8dc] flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#11382e]">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OSM Geocoded Only</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                    Filters out unverified wikis; strictly provides precise GPS latitude &amp; longitude coordinates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOsmVerifiedOnly(!osmVerifiedOnly)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    osmVerifiedOnly ? 'bg-[#114b3e]' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      osmVerifiedOnly ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Continents Accordion */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-3">
                CONTINENTS
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Continents', count: 482 },
                  { id: 'Asia', label: 'Asia & Middle East', count: 142 },
                  { id: 'Europe', label: 'Europe', count: 128 },
                  { id: 'The Americas', label: 'The Americas', count: 96 },
                  { id: 'Africa', label: 'Africa', count: 64 },
                  { id: 'Oceania & Pacific', label: 'Oceania & Pacific', count: 50 },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedContinent(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedContinent === item.id
                        ? 'bg-[#114b3e] text-white font-semibold'
                        : 'text-stone-700 hover:bg-[#f4efe4]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedContinent === item.id ? 'bg-emerald-300' : 'bg-stone-300'}`}></span>
                      <span>{item.label}</span>
                    </div>
                    <span className={`font-mono text-[11px] ${selectedContinent === item.id ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Territory Dropdown */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-2">
                SPECIFIC TERRITORY
              </label>
              <div className="relative">
                <select
                  value={selectedTerritory}
                  onChange={(e) => setSelectedTerritory(e.target.value)}
                  className="w-full bg-[#faf8f3] border border-[#ded8c7] rounded-xl px-3 py-2 text-xs text-stone-800 font-medium appearance-none cursor-pointer focus:outline-none pr-8"
                >
                  <option value="all">Any Country (Global)</option>
                  <option value="japan">Japan (42 POIs)</option>
                  <option value="croatia">Croatia (28 POIs)</option>
                  <option value="peru">Peru (31 POIs)</option>
                  <option value="norway">Norway (35 POIs)</option>
                  <option value="tanzania">Tanzania (19 POIs)</option>
                  <option value="greece">Greece (26 POIs)</option>
                </select>
                <ChevronRight className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-3 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Terrain & Archetype */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-3">
                TERRAIN &amp; ARCHETYPE
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Historical & Temples',
                  'Alpine & Passes',
                  'Coastal & Archipelagos',
                  'Wildlife Corridors',
                  'Culinary Terroir',
                  'Hidden Gems'
                ].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTerrain(selectedTerrain === tag ? 'all' : tag)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      selectedTerrain === tag
                        ? 'bg-[#114b3e] text-white shadow-2xs font-semibold'
                        : 'bg-[#faf8f3] text-stone-700 border border-[#ded8c7] hover:bg-[#ede8dc]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Expedition Budget Slider */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                  DAILY EXPEDITION BUDGET
                </label>
                <div className="flex gap-1 text-[10px] font-mono text-stone-600 bg-stone-100 p-0.5 rounded">
                  <span className="font-bold text-[#114b3e] px-1">USD</span>
                  <span className="px-1 opacity-60">EUR</span>
                  <span className="px-1 opacity-60">GBP</span>
                </div>
              </div>

              <input
                type="range"
                min="25"
                max="500"
                step="15"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#114b3e] cursor-pointer"
              />

              <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 mt-1">
                <span>$25/day<br/><span className="text-[9px] text-stone-400">(Backpacker)</span></span>
                <span className="font-bold text-xs text-[#114b3e] bg-[#f0ede4] px-2 py-0.5 rounded border border-[#ded8c7]">
                  ${maxBudget}/day
                </span>
                <span className="text-right">$500+/day<br/><span className="text-[9px] text-stone-400">(Ultra)</span></span>
              </div>
            </div>

            {/* Optimum Season */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-2xs">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-2">
                OPTIMUM SEASON
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Spring', label: 'Spring', icon: '🌱' },
                  { id: 'Summer', label: 'Summer', icon: '☀️' },
                  { id: 'Autumn', label: 'Autumn', icon: '🍂' },
                  { id: 'Winter', label: 'Winter', icon: '❄️' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSeason(s.id)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedSeason === s.id
                        ? 'bg-[#114b3e] text-white border-[#114b3e] font-semibold'
                        : 'border-[#ded8c7] bg-[#faf8f3] text-stone-700 hover:bg-[#ede8dc]'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>
        )}

        {/* Middle Column: Expedition Cards Feed */}
        <div className={`flex-1 space-y-5 ${viewMode === 'map' ? 'hidden' : 'block'}`}>
          {displayList.map((item) => {
            const isSaved = savedIds.includes(item.id);
            const inSequence = selectedSequenceIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#ded8c7] p-5 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#f0ece1] text-[#11382e] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#ded8c7]">
                      {item.categoryTag}
                    </span>
                    <span className="bg-emerald-50 text-emerald-900 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.durationTag}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleSave(item.id)}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark location'}
                  >
                    <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Hero Image Section */}
                <div className="relative h-60 rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 text-xs text-white">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold">{item.rating}</span>
                    <span className="text-stone-300 text-[10px]">({item.reviewsCount})</span>
                  </div>

                  {/* Title overlay in image */}
                  <div className="absolute bottom-3 left-3 right-24 text-white">
                    <p className="font-mono text-[10px] tracking-wider text-stone-300 uppercase">
                      {item.location}
                    </p>
                    <h3 className="editorial-title text-xl font-bold tracking-tight text-white leading-tight">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Coordinates & Season Bar */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-600 mb-2.5 pb-2.5 border-b border-[#ede8dc]">
                  <div className="flex items-center gap-1 text-[#114b3e] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.coordinates.latStr}, {item.coordinates.lngStr}</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1 text-stone-500">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{item.osmType} {item.osmNumber}</span>
                  </div>
                </div>

                {/* Season Pill */}
                <div className="mb-3">
                  <span className="inline-block bg-[#fdf3e7] text-[#93481e] text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-[#f3d4b6]">
                    {item.seasonTag}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#4a5f57] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* 3 Metric Summary Boxes */}
                <div className="grid grid-cols-3 gap-2 bg-[#f8f6f0] p-3 rounded-xl border border-[#ded8c7] mb-4 text-center">
                  <div className="border-r border-[#ded8c7] pr-1">
                    <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-wider font-semibold">
                      {item.stat1.label}
                    </span>
                    <span className="block text-xs font-bold text-[#11382e] mt-0.5">
                      {item.stat1.value}
                    </span>
                  </div>
                  <div className="border-r border-[#ded8c7] px-1">
                    <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-wider font-semibold">
                      {item.stat2.label}
                    </span>
                    <span className="block text-xs font-bold text-[#11382e] mt-0.5 truncate">
                      {item.stat2.value}
                    </span>
                  </div>
                  <div className="pl-1">
                    <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-wider font-semibold">
                      {item.stat3.label}
                    </span>
                    <span className="block text-xs font-bold text-[#11382e] mt-0.5">
                      {item.stat3.value}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={() => {
                      const dummyDest: Destination = {
                        id: item.id,
                        name: item.name,
                        country: item.country,
                        region: item.region === 'Asia' ? 'Asia' : item.region === 'Europe' ? 'Europe' : item.region === 'Africa' ? 'Africa' : 'Americas',
                        badge: item.categoryTag,
                        categoryLabel: item.terrain,
                        category: 'Historic Landmarks',
                        rating: item.rating,
                        reviewsCount: item.reviewsCount,
                        description: item.description,
                        budgetTier: '$$ Mid-Range',
                        dailyCostUSD: item.dailyCostUSD,
                        duration: item.durationTag,
                        imageUrl: item.imageUrl,
                        coordinates: { lat: item.coordinates.lat, lng: item.coordinates.lng },
                        bestMonths: item.seasonTag,
                        highlights: [item.stat1.value, item.stat2.value, item.stat3.value],
                        dayByDaySample: [
                          { day: 1, title: 'Arrival & Initial Survey', items: ['Morning waypoint arrival', 'Local guide orientation', 'Sunset lookout'] }
                        ]
                      };
                      onSelectDestinationModal(dummyDest);
                    }}
                    className="text-xs font-semibold text-[#114b3e] hover:text-[#0a2f26] flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Explore Field Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLocateOnMap(item)}
                      className="px-3 py-1.5 rounded-xl border border-[#ded8c7] hover:bg-[#ede8dc] text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3 h-3 text-stone-500" />
                      <span>Locate</span>
                    </button>

                    <button
                      onClick={() => toggleSequence(item.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        inSequence
                          ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                          : 'bg-[#11382e] text-white hover:bg-[#0b2720]'
                      }`}
                    >
                      {inSequence ? <Check className="w-3 h-3 text-emerald-300" /> : <Plus className="w-3 h-3" />}
                      <span>{inSequence ? 'Added to Plan' : '+ Add to Plan'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

          {/* Pagination & Load More */}
          <div className="pt-6 pb-2 text-center space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Showing 1-6 of 482 Verified Destinations</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-stone-200 hover:bg-stone-100 disabled:opacity-40">&lt;</button>
                <button className="px-2.5 py-1 rounded bg-[#11382e] text-white font-bold">1</button>
                <button className="px-2.5 py-1 rounded hover:bg-stone-100 text-stone-700">2</button>
                <button className="px-2.5 py-1 rounded hover:bg-stone-100 text-stone-700">3</button>
                <span className="px-1 text-stone-400">...</span>
                <button className="px-2.5 py-1 rounded hover:bg-stone-100 text-stone-700">42</button>
                <button className="px-2 py-1 rounded border border-stone-200 hover:bg-stone-100">&gt;</button>
              </div>
            </div>

            <button
              onClick={() => showToast('Loaded next batch of 12 verified coordinates from Overpass API')}
              className="w-full py-3 bg-[#eae5d8] hover:bg-[#e0d9c8] text-[#11382e] font-semibold text-xs rounded-xl border border-[#ded8c7] transition-colors cursor-pointer"
            >
              Load 12 Additional Verified Waypoints
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Leaflet & OpenStreetMap Pane */}
        <div className={`w-full lg:w-[460px] xl:w-[540px] shrink-0 sticky top-20 self-start ${viewMode === 'grid' ? 'hidden' : 'block'}`}>
          <div className="bg-white rounded-2xl border border-[#ded8c7] overflow-hidden shadow-sm flex flex-col h-[740px] relative">
            
            {/* Map Top Controls Bar */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
              {/* Region Pill */}
              <button
                onClick={() => showToast('Re-indexing spatial bounding box')}
                className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-300 text-[11px] font-semibold text-[#11382e] shadow-sm hover:bg-stone-50 flex items-center gap-1.5"
              >
                <Search className="w-3 h-3 text-emerald-700" />
                <span>Search in this region</span>
              </button>

              {/* Layer Toggles */}
              <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-300 shadow-sm flex items-center text-[10px] font-medium text-stone-700">
                <button
                  onClick={() => setMapLayer('street')}
                  className={`px-2 py-1 rounded-lg ${mapLayer === 'street' ? 'bg-[#11382e] text-white font-bold' : 'hover:bg-stone-100'}`}
                >
                  Street
                </button>
                <button
                  onClick={() => setMapLayer('topography')}
                  className={`px-2 py-1 rounded-lg ${mapLayer === 'topography' ? 'bg-[#11382e] text-white font-bold' : 'hover:bg-stone-100'}`}
                >
                  Topography
                </button>
                <button
                  onClick={() => setMapLayer('satellite')}
                  className={`px-2 py-1 rounded-lg ${mapLayer === 'satellite' ? 'bg-[#11382e] text-white font-bold' : 'hover:bg-stone-100'}`}
                >
                  Satellite
                </button>
              </div>
            </div>

            {/* Map Canvas Background (Simulated high-res OpenStreetMap tile canvas with vector rendering) */}
            <div className={`flex-1 relative overflow-hidden ${
              mapLayer === 'satellite' 
                ? 'bg-[#1a2e22]' 
                : mapLayer === 'topography' 
                  ? 'bg-[#e4ebd8]' 
                  : 'bg-[#eef2e6]'
            }`}>
              {/* Stylized OpenStreetMap vector tile elements */}
              <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                {/* Contours and roads */}
                <path d="M-10,120 Q120,80 240,160 T500,220" fill="none" stroke="#b8d4bb" strokeWidth="32" />
                <path d="M60,-20 Q180,180 320,290 T600,450" fill="none" stroke="#d5e8d8" strokeWidth="48" />
                <path d="M-50,420 C140,380 280,500 550,420" fill="none" stroke="#9bc7bf" strokeWidth="24" />
                {/* Secondary transit / rail paths */}
                <path d="M20,60 L480,540" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="6,4" />
                <path d="M80,500 L440,80" fill="none" stroke="#f6bd60" strokeWidth="3" opacity="0.8" />
                <path d="M150,0 L320,700" fill="none" stroke="#e76f51" strokeWidth="2" opacity="0.6" />
                {/* Lake polygon */}
                <ellipse cx="360" cy="220" rx="60" ry="40" fill="#a8dadc" opacity="0.7" />
              </svg>

              {/* Pins placed dynamically on the canvas */}
              {EXPEDITION_ITEMS.map((item, idx) => {
                const isCurrentActive = activePoi.id === item.id;
                // Simulated coordinates on canvas
                const pinPositions = [
                  { x: '72%', y: '28%' }, // Kyoto
                  { x: '45%', y: '42%' }, // Plitvice
                  { x: '24%', y: '68%' }, // Machu Picchu
                  { x: '58%', y: '16%' }, // Reine
                  { x: '68%', y: '82%' }, // Ngorongoro
                  { x: '52%', y: '58%' }, // Santorini
                ];
                const pos = pinPositions[idx] || { x: '50%', y: '50%' };

                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePoi(item)}
                    style={{ left: pos.x, top: pos.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 z-10 ${
                      isCurrentActive ? 'scale-125 z-20' : 'hover:scale-110'
                    }`}
                  >
                    <div className={`relative flex items-center justify-center ${
                      isCurrentActive 
                        ? 'w-9 h-9 rounded-full bg-[#114b3e] text-white shadow-xl ring-4 ring-emerald-300' 
                        : 'w-7 h-7 rounded-full bg-white text-stone-800 border-2 border-stone-700 shadow-md hover:bg-stone-100'
                    }`}>
                      <MapPin className={`w-4 h-4 ${isCurrentActive ? 'text-emerald-300' : 'text-stone-700'}`} />
                      <span className="absolute -bottom-5 bg-black/75 text-white text-[9px] font-mono px-1.5 py-0.2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Map Zoom Controls */}
              <div className="absolute right-3 top-20 flex flex-col gap-1.5 z-20">
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                  className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 cursor-pointer text-stone-700"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev - 1, 4))}
                  className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 cursor-pointer text-stone-700"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast('Compass recalibrated to true cartographic north')}
                  className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 cursor-pointer text-stone-700"
                >
                  <Compass className="w-4 h-4 text-emerald-700" />
                </button>
              </div>

              {/* Active Pin Card Preview Popup */}
              {activePoi && (
                <div className="absolute bottom-16 left-4 right-4 z-20 bg-white rounded-xl border border-stone-300 p-3 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={activePoi.imageUrl}
                      alt={activePoi.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Open 24 Hours
                        </span>
                        <button
                          onClick={() => setActivePoi(EXPEDITION_ITEMS[0])}
                          className="text-stone-400 hover:text-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-[#11382e] truncate mt-1">
                        {activePoi.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono truncate">
                        {activePoi.location} • {activePoi.categoryTag}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-stone-600">
                          {activePoi.coordinates.latStr}, {activePoi.coordinates.lngStr}
                        </span>
                        <button
                          onClick={onOpenPlanner}
                          className="text-[11px] font-bold text-[#114b3e] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Planner</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Floating Sequence Dock Pill */}
              <div className="absolute top-16 left-3 right-3 z-10 flex justify-center pointer-events-none">
                <div className="pointer-events-auto bg-[#11382e]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-full shadow-lg border border-emerald-400/30 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-semibold">Current Expedition Sequence</span>
                  </div>
                  <span className="text-stone-300 text-[11px] font-mono">
                    {selectedSequenceIds.length} Destinations Selected • ~5 Days Total
                  </span>
                  <button
                    onClick={onOpenPlanner}
                    className="bg-white text-[#11382e] px-2.5 py-1 rounded-full font-bold text-[11px] hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Open Planner</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Coordinates & Source Bar */}
            <div className="bg-[#f8f6f0] border-t border-[#ded8c7] px-4 py-2.5 flex items-center justify-between text-[10px] font-mono text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Coordinates Verified via WGS84 Datum</span>
              </div>
              <div className="text-right text-stone-500">
                <span>Zoom: {mapZoom}x • Kyoto Sector | © OpenStreetMap contributors • Wikivoyage</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Newsletter & Lead Magnet Bar (From Screenshot 2) */}
      <section className="bg-white border-t border-[#eae5d8] py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-5xl mx-auto bg-[#faf8f3] rounded-2xl border border-[#ded8c7] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              EDITORIAL TRAVEL DISPATCH
            </span>
            <h3 className="editorial-title text-2xl font-bold text-[#11382e]">
              Receive Curated Field Reports
            </h3>
            <p className="text-xs text-[#52645d] mt-1 leading-relaxed">
              Subscribe to GlobeTrek journal and instantly unlock our 140-page Global Destination Compendium &amp; offline planning index.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
            <input
              type="email"
              placeholder="Your expedition email..."
              className="px-4 py-2 text-xs bg-white border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e] w-full sm:w-64"
            />
            <button
              onClick={() => showToast('Compendium link dispatched to your email!')}
              className="px-5 py-2 bg-[#11382e] hover:bg-[#0b2720] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Unlock Guide
            </button>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer with Admin CMS Link */}
      <footer className="bg-[#f2ece0] border-t border-[#ded8c7] text-[#2c3d36] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-[#ded8c7]">
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#114b3e] flex items-center justify-center text-white">
                  <Compass className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-lg font-bold text-[#11382e]">GlobeTrek</span>
              </div>
              <p className="text-xs text-[#52645d] leading-relaxed max-w-sm">
                An authoritative digital cartography and slow-travel planning engine architected for thoughtful explorers worldwide.
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Cartography Index</span>
                </span>
              </div>
            </div>

            {/* Continents */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3">
                Continents
              </h4>
              <ul className="space-y-1.5 text-xs text-[#465b53]">
                <li><button onClick={() => setSelectedContinent('Europe')} className="hover:underline">Europe</button></li>
                <li><button onClick={() => setSelectedContinent('Asia')} className="hover:underline">Asia &amp; Middle East</button></li>
                <li><button onClick={() => setSelectedContinent('The Americas')} className="hover:underline">The Americas</button></li>
                <li><button onClick={() => setSelectedContinent('Africa')} className="hover:underline">Africa</button></li>
                <li><button onClick={() => setSelectedContinent('Oceania & Pacific')} className="hover:underline">Oceania &amp; Pacific</button></li>
              </ul>
            </div>

            {/* Discovery Themes */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3">
                Discovery Themes
              </h4>
              <ul className="space-y-1.5 text-xs text-[#465b53]">
                <li><button onClick={() => setSelectedTerrain('Coastal & Archipelagos')} className="hover:underline">Coastal &amp; Archipelagos</button></li>
                <li><button onClick={() => setSelectedTerrain('Alpine & Passes')} className="hover:underline">Alpine &amp; Mountain Passes</button></li>
                <li><button onClick={() => setSelectedTerrain('Historical & Temples')} className="hover:underline">Heritage &amp; Antiquities</button></li>
                <li><button onClick={() => setSelectedTerrain('Wildlife Corridors')} className="hover:underline">Wildlife Sanctuaries</button></li>
                <li><button onClick={() => setSelectedTerrain('Culinary Terroir')} className="hover:underline">Culinary Terroir</button></li>
              </ul>
            </div>

            {/* Planning Suite */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3">
                Planning Suite
              </h4>
              <ul className="space-y-1.5 text-xs text-[#465b53]">
                <li><button onClick={onOpenPlanner} className="hover:underline">Trip Budget Estimator</button></li>
                <li><button onClick={onOpenPlanner} className="hover:underline">Day-by-Day Sequencer</button></li>
                <li><button onClick={onOpenPlanner} className="hover:underline">Dynamic Packing Assistant</button></li>
                <li><button onClick={onOpenPlanner} className="hover:underline">Visa &amp; Transit Advisory</button></li>
                <li><button onClick={onOpenPlanner} className="hover:underline">Offline Sync &amp; PDF Export</button></li>
              </ul>
            </div>

            {/* Data & Trust + Admin CMS Button */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3">
                Data &amp; Trust
              </h4>
              <ul className="space-y-1.5 text-xs text-[#465b53]">
                <li><a href="#" className="hover:underline">REST Countries &amp; Wikivoyage</a></li>
                <li><a href="#" className="hover:underline">OpenStreetMap Credits</a></li>
                <li><a href="#" className="hover:underline">Verified Source Policy</a></li>
                <li><a href="#" className="hover:underline">Privacy &amp; Terms of Service</a></li>
                <li className="pt-2">
                  <button
                    onClick={onOpenAdminOps}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11382e] text-white hover:bg-[#0b261f] font-mono text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-300" />
                    <span>Admin CMS</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Line */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#52645d]">
            <p>© 2025 GlobeTrek Cartography Ltd. All rights reserved. Data refreshed dynamically from global open repositories.</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Live Data Feed Verified
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
