import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SriLankaDestination } from '../../data/sriLankaData';
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Sparkles, Layers, ExternalLink } from 'lucide-react';

interface SriLankaInteractiveMapProps {
  destinations: SriLankaDestination[];
  selectedDestination: SriLankaDestination | null;
  onSelectDestination: (destination: SriLankaDestination) => void;
  onOpenModal?: (destination: SriLankaDestination) => void;
}

export const SriLankaInteractiveMap: React.FC<SriLankaInteractiveMapProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  onOpenModal
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [mapLayer, setMapLayer] = useState<'osm' | 'terrain' | 'satellite'>('osm');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Prevent double init
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Center of Sri Lanka
      const map = L.map(mapContainerRef.current, {
        center: [7.8731, 80.7718],
        zoom: 7.5,
        minZoom: 6,
        maxZoom: 16,
        zoomControl: false, // Custom controls
        attributionControl: true
      });

      // Default OpenStreetMap tile layer
      const tileUrl = 
        mapLayer === 'satellite'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : mapLayer === 'terrain'
            ? 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        attribution: mapLayer === 'satellite' 
          ? '&copy; Esri &mdash; Earthstar Geographics' 
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      });

      tileLayer.addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);
      setMapError(null);

      // Add markers
      const markers: { [id: string]: L.Marker } = {};

      destinations.forEach((dest, index) => {
        // Create custom SVG DivIcon
        const isSelected = selectedDestination?.id === dest.id;
        const iconHtml = `
          <div class="relative group cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
            <div class="flex items-center justify-center w-8 h-8 rounded-full shadow-lg ${
              isSelected 
                ? 'bg-[#114b3e] text-white ring-4 ring-emerald-300 ring-opacity-80' 
                : 'bg-white text-[#11382e] border-2 border-[#114b3e]'
            }">
              <span class="font-bold text-xs font-mono">${index + 1}</span>
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#114b3e] rotate-45"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: iconHtml,
          iconSize: [32, 36],
          iconAnchor: [16, 36],
          popupAnchor: [0, -36]
        });

        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
          icon: customIcon,
          title: dest.name
        }).addTo(map);

        // Bind popup with responsive content
        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 240px; padding: 2px;">
            <div style="position: relative; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 8px;">
              <img src="${dest.imageUrl}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.65); color: #fff; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">
                ${dest.region}
              </div>
            </div>
            <h4 style="font-weight: 700; font-size: 13px; color: #11382e; margin: 0 0 2px 0; line-height: 1.2;">
              ${dest.name}
            </h4>
            <p style="font-size: 11px; color: #52645d; margin: 0 0 8px 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${dest.description}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e7e3d8; padding-top: 6px;">
              <span style="font-size: 10px; color: #b83a14; font-weight: 600;">⭐ ${dest.rating} (${dest.reviewCount})</span>
              <button id="view-dest-btn-${dest.id}" style="background: #114b3e; color: #fff; border: none; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer;">
                Explore Details
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: true,
          maxWidth: 260
        });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`view-dest-btn-${dest.id}`);
          if (btn) {
            btn.onclick = () => {
              onSelectDestination(dest);
              if (onOpenModal) {
                onOpenModal(dest);
              } else {
                const element = document.getElementById(`destination-card-${dest.id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
            };
          }
        });

        marker.on('click', () => {
          onSelectDestination(dest);
        });

        markers[dest.id] = marker;
      });

      markersRef.current = markers;

      // Invalidate size to ensure crisp render in responsive layout
      setTimeout(() => {
        map.invalidateSize();
      }, 250);

    } catch (err: any) {
      console.error('Error initializing Leaflet map:', err);
      setMapError('Interactive map initialized with limited canvas mode.');
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLayer, destinations]);

  // Pan to selected destination when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedDestination) return;

    const marker = markersRef.current[selectedDestination.id];
    if (marker) {
      mapInstanceRef.current.setView(
        [selectedDestination.coordinates.lat, selectedDestination.coordinates.lng],
        10,
        { animate: true }
      );
      marker.openPopup();
    }
  }, [selectedDestination]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    mapInstanceRef.current?.setView([7.8731, 80.7718], 7.5, { animate: true });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-sm flex flex-col relative h-[540px] sm:h-[620px]">
      
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Region Title Badge */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 text-xs font-bold text-[#11382e] shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sri Lanka Coordinates (WGS84)</span>
          <span className="font-mono text-[10px] text-stone-500 font-normal hidden sm:inline">
            14 Verified Waypoints
          </span>
        </div>

        {/* Map Layers & Reset Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-xs text-xs">
          <button
            onClick={() => setMapLayer('osm')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
              mapLayer === 'osm' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Vector
          </button>
          <button
            onClick={() => setMapLayer('terrain')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
              mapLayer === 'terrain' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Topography
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
              mapLayer === 'satellite' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Satellite
          </button>
        </div>

      </div>

      {/* Zoom and Center Controls */}
      <div className="absolute right-3 top-16 z-[1000] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 text-stone-700 cursor-pointer"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 text-stone-700 cursor-pointer"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-stone-300 shadow-sm flex items-center justify-center hover:bg-stone-50 text-emerald-800 cursor-pointer"
          title="Reset to whole island view"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Location Pill at Bottom */}
      {selectedDestination && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[1000] max-w-sm pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3 shadow-xl flex items-center gap-3">
            <img
              src={selectedDestination.imageUrl}
              alt={selectedDestination.name}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono text-emerald-800 font-bold block uppercase truncate">
                {selectedDestination.region} • {selectedDestination.category}
              </span>
              <h4 className="text-xs font-bold text-[#11382e] truncate">
                {selectedDestination.name}
              </h4>
              <p className="text-[11px] text-stone-500 font-mono truncate">
                {selectedDestination.coordinates.lat.toFixed(4)}° N, {selectedDestination.coordinates.lng.toFixed(4)}° E
              </p>
            </div>
            <button
              onClick={() => {
                if (onOpenModal) {
                  onOpenModal(selectedDestination);
                } else {
                  const element = document.getElementById(`destination-card-${selectedDestination.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }
              }}
              className="p-2 rounded-xl bg-[#11382e] text-white hover:bg-[#0b241d] shrink-0 cursor-pointer"
              title="View full destination details"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Leaflet Map DOM Element */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full bg-[#f4f7f2]" 
        style={{ minHeight: '100%', zIndex: 1 }}
      />

      {mapError && (
        <div className="absolute inset-0 bg-[#f4f7f2] flex items-center justify-center p-6 text-center z-10">
          <div className="max-w-md bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            <MapPin className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-[#11382e]">Cartographic View</h4>
            <p className="text-xs text-stone-500 mt-1">{mapError}</p>
          </div>
        </div>
      )}

    </div>
  );
};
