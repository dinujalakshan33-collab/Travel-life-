import React, { useState, useEffect } from 'react';
import { 
  SRI_LANKA_DESTINATIONS, 
  SRI_LANKA_KEY_FACTS, 
  SRI_LANKA_REGIONAL_CLIMATE, 
  SRI_LANKA_TRAVEL_TIPS,
  SriLankaDestination,
  SriLankaItinerary
} from '../../data/sriLankaData';
import { SriLankaInteractiveMap } from './SriLankaInteractiveMap';
import { SriLankaPlanner } from './SriLankaPlanner';
import { SriLankaDestinationModal } from './SriLankaDestinationModal';
import { 
  Compass, MapPin, Search, Filter, Calendar, Star, Clock, ArrowRight, 
  ShieldCheck, Info, Sparkles, Navigation, Globe, Layers, ArrowLeft,
  Sun, CloudRain, CheckCircle2, Bookmark, ExternalLink, Share2, 
  Mountain, Trees, Waves, Eye, ShieldAlert, Award
} from 'lucide-react';
import { ItineraryItem, Currency } from '../../types/travel';

interface SriLankaGuideViewProps {
  onBackToHome: () => void;
  onOpenTripPlanner: () => void;
  onAddToPlanner: (item: ItineraryItem) => void;
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const SriLankaGuideView: React.FC<SriLankaGuideViewProps> = ({
  onBackToHome,
  onOpenTripPlanner,
  onAddToPlanner,
  currency,
  savedIds,
  onToggleSave
}) => {
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<SriLankaDestination | null>(SRI_LANKA_DESTINATIONS[0]);
  const [modalDestination, setModalDestination] = useState<SriLankaDestination | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // SEO metadata update on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Sri Lanka Travel Guide — Travel-Life | 14 Verified Destinations, Leaflet Map & Smart Planner';
    
    // Update meta description dynamically for search engines
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        'Complete Sri Lanka travel guide on Travel-Life: Sigiriya Rock Fortress, Kandy Temple of Tooth, Ella Blue Train, Galle Fort, Yala leopard safari, interactive OpenStreetMap Leaflet map, and 1 to 7-day curated itineraries.'
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/destinations/sri-lanka');
      showToast('Guide link copied to clipboard: /destinations/sri-lanka');
    }
  };

  const filteredDestinations = SRI_LANKA_DESTINATIONS.filter(dest => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = dest.name.toLowerCase().includes(q) ||
                    dest.description.toLowerCase().includes(q) ||
                    dest.region.toLowerCase().includes(q) ||
                    dest.highlights.some(h => h.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
      return false;
    }
    if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleAddDestinationToPlan = (dest: SriLankaDestination) => {
    const item: ItineraryItem = {
      id: `srilanka-${dest.id}-${Date.now()}`,
      day: 1,
      time: '09:00 AM',
      title: `${dest.name} (Sri Lanka)`,
      duration: dest.recommendedDuration.split('(')[0].trim() || '3.0 hrs',
      costUSD: 45,
      note: `Highlights: ${dest.highlights[0]}`,
      category: 'sightseeing'
    };
    onAddToPlanner(item);
    showToast(`Added ${dest.name} to Travel-Life Day Architect!`);
  };

  const handleAddItineraryToPlanner = (itinerary: SriLankaItinerary) => {
    itinerary.schedule.forEach((daySchedule, idx) => {
      const item: ItineraryItem = {
        id: `srilanka-itin-${Date.now()}-${idx}`,
        day: daySchedule.day,
        time: '08:30 AM',
        title: `${daySchedule.title} (Sri Lanka)`,
        duration: 'Full Day',
        costUSD: Math.round(itinerary.budgetBreakdown.midRangeUSD / itinerary.days),
        note: `Route: ${daySchedule.route} • Morning: ${daySchedule.morning.slice(0, 80)}...`,
        category: 'sightseeing'
      };
      onAddToPlanner(item);
    });
    showToast(`Imported ${itinerary.days}-day Sri Lanka itinerary!`);
    onOpenTripPlanner();
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#1c2723] selection:bg-[#114b3e] selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#11382e] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/30 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Return Nav */}
      <div className="border-b border-[#ded8c7] bg-white/70 backdrop-blur-xs px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-30">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-stone-600 hover:text-[#11382e] font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Travel-Life Home</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500">Destinations</span>
            <span className="text-stone-300">/</span>
            <span className="font-bold text-[#11382e] flex items-center gap-1.5">
              <span>🇱🇰 Sri Lanka Field Guide</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 px-3 py-1.5 rounded-lg border border-[#ded8c7] transition-colors cursor-pointer flex items-center gap-1"
              title="Share Sri Lanka Dossier"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('sri-lanka-interactive-map');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#11382e] bg-[#f0ece1] hover:bg-[#e4ded0] px-3 py-1.5 rounded-lg border border-[#ded8c7] transition-colors cursor-pointer hidden sm:flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Interactive Island Map</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('sri-lanka-itineraries');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-white bg-[#11382e] hover:bg-[#0c2f26] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Trip Planner (1-7 Days)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0c2921] text-white">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=85"
            alt="Sigiriya Rock Fortress Sri Lanka"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2921] via-[#0c2921]/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] tracking-wider uppercase font-bold">
              <span className="text-base">🇱🇰</span>
              <span>SRI LANKA FIELD GUIDE</span>
            </span>

            <span className="font-mono text-[11px] text-emerald-200 tracking-wider">
              {SRI_LANKA_KEY_FACTS.nativeNames}
            </span>

            <span className="bg-amber-400/20 text-amber-200 border border-amber-300/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              14 Verified Waypoints
            </span>
          </div>

          {/* Title */}
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]">
            The Pearl of the Indian Ocean
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-200 max-w-3xl leading-relaxed font-light">
            An extraordinary teardrop island bridging three millennia of ancient UNESCO citadels, emerald Ceylon tea highlands, wild leopard corridors, and sun-drenched southern surf coves.
          </p>

          {/* Quick Island Facts Ribbon */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/20">
            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Capitals
              </span>
              <span className="block text-xs font-bold text-white mt-0.5 truncate" title={SRI_LANKA_KEY_FACTS.capital}>
                Kotte &amp; Colombo
              </span>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Currency
              </span>
              <span className="block text-xs font-bold text-white mt-0.5 font-mono">
                Rupee (LKR ~305/$1)
              </span>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Languages
              </span>
              <span className="block text-xs font-bold text-white mt-0.5">
                Sinhala, Tamil, English
              </span>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Time Zone
              </span>
              <span className="block text-xs font-bold text-white mt-0.5 font-mono">
                UTC+05:30 (SLST)
              </span>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Tourist Visa
              </span>
              <span className="block text-xs font-bold text-white mt-0.5">
                Online ETA (eta.gov.lk)
              </span>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                Emergency &amp; Police
              </span>
              <span className="block text-xs font-bold text-white mt-0.5 font-mono">
                Police: 119 • Tourist: 1912
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Core Pillars: Culture, History, Nature, Beaches, Wildlife */}
        <section className="bg-white rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest block mb-1">
              THE FIVE PILLARS OF CEYLON
            </span>
            <h2 className="editorial-title text-2xl sm:text-3xl font-bold text-[#11382e]">
              Culture, History, Nature, Beaches &amp; Wildlife
            </h2>
            <p className="text-xs text-[#52645d] mt-1.5 leading-relaxed">
              Few places on Earth pack as much geographic, biological, and historical variety into 65,610 square kilometers as Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="bg-[#faf8f3] p-4 rounded-2xl border border-[#ded8c7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-3">
                  🏛️
                </div>
                <h4 className="font-bold text-sm text-[#11382e]">Living Culture</h4>
                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Theravada Buddhist monasteries, sacred Jaya Sri Maha Bodhi tree planted in 288 BCE, vibrant Esala Perahera processions, and golden Hindu Kovils in Jaffna.
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase mt-4 block">
                UNESCO SITES: 8
              </span>
            </div>

            <div className="bg-[#faf8f3] p-4 rounded-2xl border border-[#ded8c7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-3">
                  👑
                </div>
                <h4 className="font-bold text-sm text-[#11382e]">Ancient Kingdoms</h4>
                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Over 2,500 years of recorded royal chronicles. Marvel at King Kashyapa's 5th-century Sigiriya sky palace and Polonnaruwa's Gal Vihara rock statues.
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase mt-4 block">
                ANCIENT DYNASTIES: 180+
              </span>
            </div>

            <div className="bg-[#faf8f3] p-4 rounded-2xl border border-[#ded8c7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-3">
                  🍃
                </div>
                <h4 className="font-bold text-sm text-[#11382e]">Emerald Highlands</h4>
                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Mist-shrouded Ceylon tea estates, cool alpine towns like Nuwara Eliya, the 880m World's End precipice at Horton Plains, and the world's most scenic blue train ride.
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase mt-4 block">
                PEAK ELEVATION: 2,524m
              </span>
            </div>

            <div className="bg-[#faf8f3] p-4 rounded-2xl border border-[#ded8c7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-3">
                  🌊
                </div>
                <h4 className="font-bold text-sm text-[#11382e]">Pristine Coasts</h4>
                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  1,340 km of tropical coastline. From Mirissa's palm-fringed whale sanctuaries and Galle's 17th-century ramparts to Arugam Bay's world-class right-hand surf breaks.
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase mt-4 block">
                COASTLINE: 1,340 KM
              </span>
            </div>

            <div className="bg-[#faf8f3] p-4 rounded-2xl border border-[#ded8c7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-3">
                  🐆
                </div>
                <h4 className="font-bold text-sm text-[#11382e]">Big-Game Wildlife</h4>
                <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                  Yala holds the world's densest leopard population. Spot wild Asian elephant herds, sloth bears, mugger crocodiles, and migrating blue whales offshore.
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase mt-4 block">
                NATIONAL PARKS: 26
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 1: Interactive Map of Sri Lanka */}
        <section id="sri-lanka-interactive-map" className="scroll-mt-18">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest block mb-1">
                GEOSPATIAL CARTOGRAPHY ENGINE
              </span>
              <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#11382e]">
                Interactive Map of Sri Lanka
              </h2>
              <p className="text-xs text-[#52645d] mt-1 max-w-xl">
                Explore 14 verified waypoints across the Cultural Triangle, Hill Country, Southern Coastline, and Jaffna Peninsula. Click any marker to view interactive popup dossier.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-[#ede8dc] px-3 py-1.5 rounded-xl border border-[#ded8c7]">
              <Compass className="w-3.5 h-3.5 text-[#11382e]" />
              <span>Leaflet &amp; OpenStreetMap WGS84</span>
            </div>
          </div>

          {/* Interactive Map Component */}
          <SriLankaInteractiveMap
            destinations={SRI_LANKA_DESTINATIONS}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
            onOpenModal={setModalDestination}
          />
        </section>

        {/* SECTION 2: 14 Iconic Destinations Catalog & Filter Feed */}
        <section id="sri-lanka-destinations" className="scroll-mt-18">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest block mb-1">
                CURATED EXPEDITIONS &amp; HERITAGE MONUMENTS
              </span>
              <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#11382e]">
                14 Iconic Places to Explore
              </h2>
              <p className="text-xs text-[#52645d] mt-1 max-w-xl">
                From ancient royal fortresses and venerated Buddhist sanctuaries to misty tea valleys and premier surf points.
              </p>
            </div>

            <span className="text-xs font-mono text-stone-500 font-semibold bg-[#faf8f3] px-3 py-1 rounded-lg border border-[#ded8c7]">
              Showing {filteredDestinations.length} of 14 Destinations
            </span>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-[#ded8c7] shadow-xs mb-8 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search Box */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sigiriya, Ella, Galle, Yala, Jaffna..."
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              {/* Region Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-xs text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Regions (Island-wide)</option>
                  <option value="Cultural Triangle">Cultural Triangle &amp; Ancient Kingdoms</option>
                  <option value="Central Hill Country">Central Highlands &amp; Tea Estates</option>
                  <option value="Southern Coast">Southern Coast &amp; Marine Sanctuaries</option>
                  <option value="Eastern Province">Eastern Coast &amp; Surf Bays</option>
                  <option value="Northern Peninsula">Northern Peninsula &amp; Tamil Heritage</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-xs text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="Culture & Heritage">Culture &amp; Heritage</option>
                  <option value="Hill Country & Hiking">Hill Country &amp; Hiking</option>
                  <option value="Wildlife & Safari">Wildlife &amp; Safari</option>
                  <option value="Coastal & Beaches">Coastal &amp; Beaches</option>
                </select>
              </div>

            </div>

            {/* Quick Category Chips */}
            <div className="pt-2 border-t border-[#ede8dc] flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                DISCOVERY THEMES:
              </span>
              {['All', 'Culture & Heritage', 'Hill Country & Hiking', 'Wildlife & Safari', 'Coastal & Beaches'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    (cat === 'All' && selectedCategory === 'all') || selectedCategory === cat
                      ? 'bg-[#11382e] text-white font-bold'
                      : 'bg-[#faf8f3] text-stone-700 border border-[#ded8c7] hover:bg-[#ede8dc]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const isSaved = savedIds.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  id={`destination-card-${dest.id}`}
                  className="bg-white rounded-3xl border border-[#ded8c7] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Box */}
                    <div 
                      className="relative h-60 overflow-hidden bg-stone-100 cursor-pointer"
                      onClick={() => setModalDestination(dest)}
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-md border border-white/20 uppercase">
                          {dest.region}
                        </span>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(dest.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                          isSaved ? 'bg-amber-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title={isSaved ? 'Saved to bookmarks' : 'Save destination'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      {/* Rating & Review */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1 text-[11px] text-white">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-bold">{dest.rating}</span>
                        <span className="text-stone-300 text-[10px]">({dest.reviewCount})</span>
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-3 left-3 right-24 text-white">
                        {dest.nativeName && (
                          <span className="font-mono text-[9px] text-stone-300 block mb-0.5">
                            {dest.nativeName}
                          </span>
                        )}
                        <h3 className="font-bold text-lg text-white leading-tight">
                          {dest.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3.5">
                      
                      {/* Coordinates & Category */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pb-2 border-b border-[#ede8dc]">
                        <span className="text-[#11382e] font-semibold flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{dest.coordinates.lat.toFixed(3)}°N, {dest.coordinates.lng.toFixed(3)}°E</span>
                        </span>
                        <span>{dest.category}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#4a5f57] leading-relaxed line-clamp-3">
                        {dest.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#ded8c7]">
                        <span className="font-mono text-[9px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                          KEY FIELD HIGHLIGHTS
                        </span>
                        <ul className="space-y-1 text-[11px] text-stone-700">
                          {dest.highlights.slice(0, 3).map((hl, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-700 font-bold shrink-0">•</span>
                              <span className="line-clamp-1">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Practical Metadata */}
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-start gap-1.5 text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span><strong>Duration:</strong> {dest.recommendedDuration}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-stone-600">
                          <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>Best Season:</strong> {dest.bestSeason}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-[#ede8dc] mt-2">
                    <button
                      onClick={() => setModalDestination(dest)}
                      className="px-3 py-1.5 rounded-xl border border-[#ded8c7] hover:bg-[#ede8dc] text-xs font-semibold text-[#11382e] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-stone-600" />
                      <span>Full Dossier</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedDestination(dest);
                          const el = document.getElementById('sri-lanka-interactive-map');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-1.5 rounded-xl border border-[#ded8c7] hover:bg-[#ede8dc] text-stone-600 transition-colors cursor-pointer"
                        title="Locate on Map"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-800" />
                      </button>

                      <button
                        onClick={() => handleAddDestinationToPlan(dest)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#11382e] hover:bg-[#0b241d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>+ Add to Plan</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* SECTION 3: Smart Travel Planner & Itineraries */}
        <section id="sri-lanka-itineraries" className="scroll-mt-18">
          <SriLankaPlanner 
            onAddToTripPlanner={handleAddItineraryToPlanner}
            onSelectDestinationModal={setModalDestination}
          />
        </section>

        {/* SECTION 4: Dual-Monsoon Climate & When to Visit */}
        <section className="bg-white rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest block mb-1">
              METEOROLOGICAL CALENDAR
            </span>
            <h3 className="editorial-title text-2xl sm:text-3xl font-bold text-[#11382e]">
              Understanding Sri Lanka's Dual Monsoons
            </h3>
            <p className="text-xs text-[#52645d] mt-1.5 leading-relaxed">
              Because Sri Lanka is influenced by two distinct monsoon systems (the southwest Yala monsoon and northeast Maha monsoon), you can find tranquil turquoise seas and sunny beaches on at least one side of the island 365 days a year!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SRI_LANKA_REGIONAL_CLIMATE.map((item) => (
              <div 
                key={item.region}
                className="bg-[#faf8f3] p-5 rounded-2xl border border-[#ded8c7] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {item.region}
                  </span>
                  <h4 className="font-bold text-sm text-[#11382e] mt-0.5">
                    {item.locations}
                  </h4>

                  <div className="mt-3 pt-3 border-t border-[#ede8dc] space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Peak: {item.peakSeason}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                      <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                      <span>Rain: {item.monsoonSeason}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Practical Travel & Cultural Etiquette */}
        <section className="bg-[#f5f2e8] rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-widest block mb-1">
              FIELD LOGISTICS &amp; LOCAL CUSTOMS
            </span>
            <h3 className="editorial-title text-2xl sm:text-3xl font-bold text-[#11382e]">
              Essential Travel Advice &amp; Safety Guidelines
            </h3>
            <p className="text-xs text-[#52645d] mt-1 leading-relaxed">
              Verified practical guidance compiled from the Sri Lanka Tourism Development Authority (SLTDA) and Department of Wildlife Conservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SRI_LANKA_TRAVEL_TIPS.map((tip, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#11382e] flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <h4 className="font-bold text-xs text-[#11382e] uppercase tracking-wider font-mono">
                    {tip.category}
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Sri Lanka Destination Full Dossier Modal */}
      <SriLankaDestinationModal
        destination={modalDestination}
        onClose={() => setModalDestination(null)}
        isSaved={modalDestination ? savedIds.includes(modalDestination.id) : false}
        onToggleSave={onToggleSave}
        onAddToPlanner={onAddToPlanner}
        onLocateOnMap={(dest) => {
          setSelectedDestination(dest);
          const el = document.getElementById('sri-lanka-interactive-map');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        currency={currency}
      />

      {/* Footer Navigation */}
      <footer className="border-t border-[#ded8c7] bg-white py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-stone-500 font-mono">
        <p>© 2025 Travel-Life Digital Cartography. Verified Sri Lanka Municipal Data Powered by OpenStreetMap &amp; Department of Wildlife Conservation.</p>
        <div className="mt-2 flex items-center justify-center gap-4 text-stone-600">
          <button onClick={onBackToHome} className="hover:underline cursor-pointer">Home Hub</button>
          <span>•</span>
          <button onClick={onOpenTripPlanner} className="hover:underline cursor-pointer">Trip Planner</button>
          <span>•</span>
          <a href="https://eta.gov.lk" target="_blank" rel="noopener noreferrer" className="hover:underline">Official Sri Lanka ETA</a>
        </div>
      </footer>

    </div>
  );
};
