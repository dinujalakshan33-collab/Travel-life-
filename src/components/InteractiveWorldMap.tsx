import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Destination, 
  HotelStay, 
  Currency 
} from '../types/travel';
import { 
  Search, 
  MapPin, 
  BedDouble, 
  Sparkles, 
  ExternalLink, 
  X, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Compass, 
  Star, 
  Calendar, 
  DollarSign, 
  Heart,
  Landmark,
  Trees,
  Waves,
  Mountain,
  Building2,
  Check
} from 'lucide-react';

interface InteractiveWorldMapProps {
  destinations: Destination[];
  hotels: HotelStay[];
  selectedDestinationId?: string | null;
  onSelectDestination: (destination: Destination) => void;
  onSelectHotel?: (hotel: HotelStay) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  currency: Currency;
  onAddToPlanner?: (destination: Destination) => void;
}

type MapFilterType = 'all' | 'destinations' | 'hotels' | 'beaches' | 'mountains' | 'historical' | 'nature' | 'cities';

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  destinations,
  hotels,
  selectedDestinationId,
  onSelectDestination,
  onSelectHotel,
  savedIds,
  onToggleSave,
  currency,
  onAddToPlanner
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<MapFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<{ type: 'destination'; data: Destination } | { type: 'hotel'; data: HotelStay } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // World view center
    const map = L.map(mapContainerRef.current, {
      center: [20, 15],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true
    });

    // High quality OpenStreetMap cartography tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Fix possible resize glitches
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Render Markers based on Active Filters & Search
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const q = searchQuery.toLowerCase().trim();

    // Filter Destinations
    const filteredDestinations = destinations.filter(d => {
      if (activeFilter === 'hotels') return false;
      if (activeFilter === 'beaches' && d.category !== 'Coastal & Beaches') return false;
      if (activeFilter === 'mountains' && d.category !== 'Adventure & Hiking') return false;
      if (activeFilter === 'historical' && d.category !== 'Historic Landmarks') return false;
      if (activeFilter === 'nature' && d.category !== 'Natural Wonders' && d.category !== 'Wildlife Sanctuaries') return false;
      if (activeFilter === 'cities' && d.category !== 'Cities & Culture') return false;

      if (q) {
        return (
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Filter Hotels
    const filteredHotels = hotels.filter(h => {
      if (activeFilter !== 'all' && activeFilter !== 'hotels') return false;
      if (q) {
        return (
          h.name.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Add Destination Markers
    filteredDestinations.forEach(dest => {
      const isSelected = activeItem?.type === 'destination' && activeItem.data.id === dest.id;

      const markerHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
            isSelected 
              ? 'bg-[#11382e] ring-4 ring-emerald-400 scale-125 z-30' 
              : 'bg-[#11382e] text-white hover:bg-emerald-800'
          }">
            <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"/>
              <circle cx="12" cy="10" r="3" fill="currentColor"/>
            </svg>
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            ${dest.name.split(' ')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customIcon });
      marker.on('click', () => {
        setActiveItem({ type: 'destination', data: dest });
        map.flyTo([dest.coordinates.lat, dest.coordinates.lng], Math.max(map.getZoom(), 7), {
          duration: 1.2
        });
      });

      marker.addTo(layer);
    });

    // Add Hotel Markers
    filteredHotels.forEach(hotel => {
      const isSelected = activeItem?.type === 'hotel' && activeItem.data.id === hotel.id;

      const markerHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 ${
            isSelected 
              ? 'bg-amber-600 ring-4 ring-amber-300 scale-125 z-30' 
              : 'bg-amber-700 text-white hover:bg-amber-600'
          }">
            <svg class="w-3.5 h-3.5 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 7v14M21 7v14M6 11h12M6 7h12M9 3h6v4H9z"/>
            </svg>
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            ${hotel.name.split(' ')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-hotel-marker',
        html: markerHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([hotel.coordinates.lat, hotel.coordinates.lng], { icon: customIcon });
      marker.on('click', () => {
        setActiveItem({ type: 'hotel', data: hotel });
        map.flyTo([hotel.coordinates.lat, hotel.coordinates.lng], Math.max(map.getZoom(), 8), {
          duration: 1.2
        });
      });

      marker.addTo(layer);
    });

  }, [destinations, hotels, activeFilter, searchQuery, activeItem]);

  // Synchronize initial selection if requested
  useEffect(() => {
    if (!selectedDestinationId) return;
    const dest = destinations.find(d => d.id === selectedDestinationId);
    if (dest) {
      setActiveItem({ type: 'destination', data: dest });
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([dest.coordinates.lat, dest.coordinates.lng], 8, { duration: 1.5 });
      }
    }
  }, [selectedDestinationId, destinations]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => {
    mapInstanceRef.current?.flyTo([20, 15], 3, { duration: 1.2 });
    setActiveItem(null);
  };

  const totalCount = destinations.length + hotels.length;

  return (
    <div className="relative w-full h-[650px] lg:h-[720px] rounded-3xl overflow-hidden border border-[#ded8c7] shadow-xl bg-stone-100">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11382e] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-emerald-400/30 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Top Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none">
        
        {/* Search Input Box */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-[#ded8c7] flex items-center gap-2 max-w-md w-full">
          <div className="pl-2.5 text-stone-400">
            <Search className="w-4 h-4 text-[#11382e]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search countries, cities, destinations, or hotels..."
            className="w-full bg-transparent text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none py-1.5"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] font-mono font-bold text-stone-400 px-2 hidden sm:inline">
            ESC
          </span>
        </div>

        {/* Legend Badge */}
        <div className="pointer-events-auto self-start md:self-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#ded8c7] flex items-center gap-4 text-xs font-medium text-stone-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#11382e]"></span>
            <span>Destinations ({destinations.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>Hotels &amp; Resorts ({hotels.length})</span>
          </div>
        </div>

      </div>

      {/* Floating Filter Bar (Bottom or Mid-Top) */}
      <div className="absolute bottom-5 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-[#ded8c7] max-w-[calc(100%-110px)] overflow-x-auto">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === 'all' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          All Coordinates
        </button>
        <button
          onClick={() => setActiveFilter('destinations')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeFilter === 'destinations' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Destinations</span>
        </button>
        <button
          onClick={() => setActiveFilter('hotels')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeFilter === 'hotels' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <BedDouble className="w-3.5 h-3.5" />
          <span>Hotels &amp; Stays</span>
        </button>
        <button
          onClick={() => setActiveFilter('beaches')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
            activeFilter === 'beaches' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          <span>Beaches</span>
        </button>
        <button
          onClick={() => setActiveFilter('mountains')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
            activeFilter === 'mountains' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Mountain className="w-3.5 h-3.5" />
          <span>Mountains</span>
        </button>
        <button
          onClick={() => setActiveFilter('historical')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
            activeFilter === 'historical' ? 'bg-[#11382e] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Heritage</span>
        </button>
      </div>

      {/* Zoom and Navigation Controls */}
      <div className="absolute bottom-5 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-[#ded8c7] shadow-lg flex items-center justify-center text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-[#ded8c7] shadow-lg flex items-center justify-center text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="w-10 h-10 rounded-xl bg-[#11382e] text-white shadow-lg flex items-center justify-center hover:bg-[#0c2e26] cursor-pointer transition-colors"
          title="Reset World View"
        >
          <Compass className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

      {/* Floating Selected Pin Preview Card (Side Drawer / Modal on Mobile) */}
      {activeItem && (
        <div className="absolute top-20 right-4 z-30 max-w-sm w-full bg-white rounded-3xl shadow-2xl border border-[#ded8c7] overflow-hidden animate-in fade-in slide-in-from-right-4">
          
          {/* Card Image */}
          <div className="relative h-44 w-full">
            <img
              src={activeItem.data.imageUrl}
              alt={activeItem.data.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="bg-[#11382e]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                {activeItem.type === 'destination' ? activeItem.data.category : activeItem.data.type}
              </span>
              <span className="bg-black/60 text-white text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{activeItem.data.rating}</span>
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono font-bold text-stone-500 uppercase block">
                  {activeItem.data.city}, {activeItem.data.country}
                </span>
                <h4 className="font-bold text-base text-[#11382e] leading-snug mt-0.5">
                  {activeItem.data.name}
                </h4>
              </div>
              <button
                onClick={() => {
                  onToggleSave(activeItem.data.id);
                  showToast(savedIds.includes(activeItem.data.id) ? 'Removed from favorites' : 'Saved to favorites');
                }}
                className={`p-2 rounded-full border transition-colors cursor-pointer shrink-0 ${
                  savedIds.includes(activeItem.data.id)
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-stone-200 text-stone-400 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${savedIds.includes(activeItem.data.id) ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
              {activeItem.data.description}
            </p>

            {/* Price & Season Info */}
            <div className="mt-3 pt-3 border-t border-[#ede8dc] flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block font-mono">
                  {activeItem.type === 'destination' ? 'ESTIMATED DAILY BUDGET' : 'ESTIMATED PER NIGHT'}
                </span>
                <span className="font-bold text-[#11382e]">
                  {activeItem.type === 'destination' 
                    ? `${formatPrice(activeItem.data.dailyCostUSD)} / day`
                    : formatPrice(activeItem.data.pricePerNightUSD)}
                </span>
              </div>
              {activeItem.type === 'destination' ? (
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-mono">BEST SEASON</span>
                  <span className="font-semibold text-stone-700 text-[11px]">{activeItem.data.bestSeason}</span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-mono">FACILITIES</span>
                  <span className="font-semibold text-stone-700 text-[11px]">{activeItem.data.facilities.length} Verified</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              {activeItem.type === 'destination' ? (
                <>
                  <button
                    onClick={() => onSelectDestination(activeItem.data)}
                    className="flex-1 py-2 px-3 bg-[#11382e] hover:bg-[#0c2e26] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    View Destination
                  </button>
                  {onAddToPlanner && (
                    <button
                      onClick={() => {
                        onAddToPlanner(activeItem.data);
                        showToast(`Added ${activeItem.data.name} to itinerary!`);
                      }}
                      className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Plan Trip
                    </button>
                  )}
                </>
              ) : (
                <>
                  {onSelectHotel ? (
                    <button
                      onClick={() => onSelectHotel(activeItem.data)}
                      className="flex-1 py-2 px-3 bg-[#11382e] hover:bg-[#0c2e26] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      View Hotel Stays
                    </button>
                  ) : null}
                  <a
                    href={activeItem.data.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Official Booking</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
// src/components/InteractiveMap.tsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DESTINATIONS, Destination } from "../data/travelData";

interface MapProps {
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
}

export const InteractiveMap: React.FC<MapProps> = ({
  selectedDestination,
  onSelectDestination,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map centered globally (or on Sri Lanka initially)
    const map = L.map(mapContainerRef.current, {
      center: [15, 65],
      zoom: 3,
      minZoom: 2,
      maxZoom: 14,
      scrollWheelZoom: false,
    });

    // Clean OpenStreetMap Humanitarian / Carto Voyager Tile Layers
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    // Create markers for every destination
    DESTINATIONS.forEach((dest) => {
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="
            background: ${dest.country === "Sri Lanka" ? "#047857" : "#0284c7"};
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            border: 2px solid white;
            white-space: nowrap;
          ">
            <span>📍</span>
            <span>${dest.title.split(" ")[0]}</span>
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const marker = L.marker(dest.coordinates, { icon: customIcon }).addTo(map);
      marker.on("click", () => {
        onSelectDestination(dest);
      });

      markersRef.current[dest.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onSelectDestination]);

  // Pan to destination when selected
  useEffect(() => {
    if (selectedDestination && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedDestination.coordinates, 8, {
        duration: 1.5,
      });
    }
  }, [selectedDestination]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden border border-slate-200 shadow-md">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating map legend / active pin badge */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200 text-xs flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
          Interactive World Atlas
        </span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600">Click any pin to inspect routes & guides</span>
      </div>
    </div>
  );
};
