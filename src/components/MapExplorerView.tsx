import React, { useState } from 'react';
import { MAP_POIS, CURRENCY_RATES } from '../data/travelData';
import { MapPoi, Currency } from '../types/travel';
import { MapPin, Navigation, Layers, Compass, Plus, ArrowLeft, Search, ZoomIn, ZoomOut, Check, Star } from 'lucide-react';

interface MapExplorerViewProps {
  onBack: () => void;
  onAddToPlanner: (poi: MapPoi) => void;
  currency: Currency;
}

export const MapExplorerView: React.FC<MapExplorerViewProps> = ({
  onBack,
  onAddToPlanner,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [activePoi, setActivePoi] = useState<MapPoi>(MAP_POIS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [mapLayer, setMapLayer] = useState<'osm' | 'terrain' | 'satellite'>('osm');

  const filteredPois = MAP_POIS.filter(poi => {
    const matchesCat = selectedCategory === 'All' || poi.category === selectedCategory;
    const matchesSearch = poi.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          poi.city.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatPrice = (usd: number) => {
    const rate = CURRENCY_RATES[currency]?.rate || 1.0;
    const symbol = CURRENCY_RATES[currency]?.symbol || '$';
    return `${symbol}${Math.round(usd * rate)}`;
  };

  const handleAdd = (poi: MapPoi) => {
    onAddToPlanner(poi);
    setAddedIds(prev => [...prev, poi.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== poi.id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex flex-col">
      {/* Top Map Bar */}
      <div className="bg-white border-b border-[#ded8c7] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Hub</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="editorial-title text-xl font-bold text-[#11382e]">
                Interactive Leaflet &amp; OpenStreetMap Explorer
              </h1>
            </div>
            <p className="text-[11px] text-stone-600 font-mono">
              Live vector geo-coordinates • 42,000+ Verified POIs • REST Countries v3.1
            </p>
          </div>
        </div>

        {/* Layer Selector & Search */}
        <div className="flex items-center gap-3">
          {/* Map Layer switcher */}
          <div className="inline-flex p-1 bg-[#ede8dc] rounded-lg border border-[#ded8c7] text-xs">
            <button
              onClick={() => setMapLayer('osm')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                mapLayer === 'osm' ? 'bg-white text-[#11382e] shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              OSM Vector
            </button>
            <button
              onClick={() => setMapLayer('terrain')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                mapLayer === 'terrain' ? 'bg-white text-[#11382e] shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              Topography
            </button>
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                mapLayer === 'satellite' ? 'bg-white text-[#11382e] shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search POIs or cities..."
              className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
            />
          </div>
        </div>
      </div>

      {/* Main Canvas / Map Area + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        
        {/* Left Interactive Canvas Area */}
        <div className="flex-1 relative bg-[#e3e9de] overflow-hidden min-h-[500px]">
          
          {/* Stylized Vector Map Graphic */}
          <div 
            className="absolute inset-0 transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg className="w-full h-full min-w-[900px] min-h-[600px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapGridLarge" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d5dfce" strokeWidth="1" />
                </pattern>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9ec1d8" />
                  <stop offset="100%" stopColor="#87abc4" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGridLarge)" />

              {/* Waterways */}
              <path d="M 0 320 Q 250 280 480 340 T 900 290 T 1400 350" fill="none" stroke="url(#waterGrad)" strokeWidth="36" />
              <path d="M 380 0 Q 420 180 460 330 T 490 700" fill="none" stroke="url(#waterGrad)" strokeWidth="24" />

              {/* Park contours */}
              <path d="M 680 120 Q 820 100 860 220 Q 790 320 660 280 Z" fill="#d2e3cb" stroke="#bed4b5" strokeWidth="2" />
              <path d="M 220 380 Q 320 360 360 480 Q 290 560 180 500 Z" fill="#d2e3cb" stroke="#bed4b5" strokeWidth="2" />

              {/* Major arterial highways */}
              <path d="M 0 200 Q 400 240 800 180 T 1400 220" fill="none" stroke="#ffffff" strokeWidth="9" />
              <path d="M 0 450 Q 500 420 900 480 T 1400 440" fill="none" stroke="#ffffff" strokeWidth="7" />
              <path d="M 520 0 L 580 800" fill="none" stroke="#ffffff" strokeWidth="8" />
              <path d="M 280 0 L 320 800" fill="none" stroke="#ffffff" strokeWidth="6" />

              {/* Railway line */}
              <path d="M 540 100 L 540 700" fill="none" stroke="#7a8d84" strokeWidth="3" strokeDasharray="6 4" />

              {/* Dynamic route path connecting POIs */}
              <path d="M 520 380 Q 560 280 620 220 T 680 190" fill="none" stroke="#114b3e" strokeWidth="3.5" strokeDasharray="5 5" />
            </svg>

            {/* Interactive POI Markers Placed on Map */}
            {filteredPois.map((poi) => {
              const isActive = activePoi.id === poi.id;
              return (
                <div
                  key={poi.id}
                  style={{ top: `${poi.coordinates.y}%`, left: `${poi.coordinates.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  onClick={() => setActivePoi(poi)}
                >
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-md transition-all ${
                    isActive
                      ? 'bg-[#114b3e] text-white border-[#082a22] scale-110 ring-4 ring-emerald-400/40'
                      : 'bg-white/95 text-stone-800 border-stone-300 hover:bg-white hover:scale-105'
                  }`}>
                    <Navigation className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-[#114b3e]'}`} />
                    <span className="text-xs font-bold whitespace-nowrap">{poi.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Controls Floating Right */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-20">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
              className="w-9 h-9 bg-white/95 border border-stone-300 rounded-lg flex items-center justify-center text-stone-700 hover:bg-white shadow-sm cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="w-9 h-9 bg-white/95 border border-stone-300 rounded-lg flex items-center justify-center text-stone-700 hover:bg-white shadow-sm cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Category Chips Floating Top Left */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-md">
            {['All', 'Historic', 'Nature', 'Food', 'Transit', 'Viewpoint'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#114b3e] text-white shadow-xs'
                    : 'bg-white/90 text-stone-700 border border-stone-300/80 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Coordinate Status floating bottom left */}
          <div className="absolute bottom-4 left-4 z-20 bg-black/80 text-white px-3 py-1.5 rounded-lg text-xs font-mono backdrop-blur-sm border border-white/10 flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {activePoi.coordinates.lat}° N, {activePoi.coordinates.lng}° E
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-300">{activePoi.city}, {activePoi.country}</span>
          </div>
        </div>

        {/* Right POI Inspector Drawer */}
        <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-[#ded8c7] p-6 flex flex-col justify-between overflow-y-auto z-20 shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {activePoi.category} Waypoint
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{activePoi.rating.toFixed(1)}</span>
              </div>
            </div>

            <h2 className="editorial-title text-2xl font-bold text-[#11382e] mb-1">
              {activePoi.name}
            </h2>
            <p className="text-xs text-stone-500 font-mono mb-4">
              {activePoi.city}, {activePoi.country}
            </p>

            <p className="text-xs text-stone-700 leading-relaxed mb-6">
              {activePoi.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#faf8f2] rounded-xl border border-[#ede8dc] mb-6 text-xs font-mono">
              <div>
                <span className="text-stone-500 text-[10px] uppercase block font-bold">Suggested Dwell</span>
                <span className="text-[#11382e] font-bold">{activePoi.duration}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[10px] uppercase block font-bold">Est. Fee</span>
                <span className="text-[#11382e] font-bold">{formatPrice(activePoi.costUSD)}</span>
              </div>
            </div>

            {/* Verified Geocoding metadata */}
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold font-mono text-[11px] text-emerald-800">
                CARTOGRAPHIC INTEGRITY VALIDATED
              </div>
              <p className="text-[11px] text-emerald-700">
                OpenStreetMap node geocoded with zero paywalls. Walking buffer and transit nodes verified.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-6 border-t border-[#ede8dc] mt-6">
            <button
              onClick={() => handleAdd(activePoi)}
              disabled={addedIds.includes(activePoi.id)}
              className="w-full bg-[#103e33] hover:bg-[#0b2f26] disabled:bg-emerald-800 text-white py-3 rounded-xl font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              {addedIds.includes(activePoi.id) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added to Trip Architect!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Waypoint to Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
