import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContinentGrid } from './components/ContinentGrid';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { BudgetArchetypes } from './components/BudgetArchetypes';
import { EditorDispatches } from './components/EditorDispatches';
import { StatsBanner } from './components/StatsBanner';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { HotelDetailModal } from './components/HotelDetailModal';
import { HotelsShowcase } from './components/HotelsShowcase';
import { InteractiveWorldMap } from './components/InteractiveWorldMap';
import { ArticleModal } from './components/ArticleModal';
import { MapExplorerView } from './components/MapExplorerView';
import { TripPlannerView } from './components/TripPlannerView';
import { CuratedExpeditionsView } from './components/CuratedExpeditionsView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { AdminLoginView } from './components/AdminLoginView';
import { SavedDrawer } from './components/SavedDrawer';
import { SignInModal } from './components/SignInModal';
import { DESTINATIONS, HOTELS, INITIAL_ITINERARY_ITEMS, EDITORIAL_ARTICLES } from './data/travelData';
import { Destination, HotelStay, Currency, EditorialArticle, ItineraryItem, MapPoi } from './types/travel';
import { LayoutGrid, Layers, Shield, Compass, Sparkles, Lock, BedDouble, Globe2, ArrowRight } from 'lucide-react';
import { authApi, AuthUser } from './services/authApi';

export default function App() {
  // Navigation & Screen view state: 'destinations' | 'hotels' | 'expeditions' | 'admin' | 'map' | 'planner'
  const [currentTab, setCurrentTab] = useState<string>('destinations');
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Private Administrator Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Bookmarks / Saved
  const [savedIds, setSavedIds] = useState<string[]>(['kyoto', 'amalfi', 'fushimi-inari']);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);

  // Search & Filters for Home
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [activeFilterTab, setActiveFilterTab] = useState('all');

  // Modals
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [activeHotel, setActiveHotel] = useState<HotelStay | null>(null);
  const [activeArticle, setActiveArticle] = useState<EditorialArticle | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);

  // Itinerary items
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(INITIAL_ITINERARY_ITEMS);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Check server-side admin session on load
  useEffect(() => {
    authApi.checkSession().then(res => {
      setIsAdminAuthenticated(res.authenticated);
      if (res.user) setAdminUser(res.user);
      setAuthLoading(false);
    });
  }, []);

  const handleAdminLoginSuccess = (user: AuthUser) => {
    setIsAdminAuthenticated(true);
    setAdminUser(user);
    setCurrentTab('admin');
  };

  const handleAdminLogout = async () => {
    await authApi.logout();
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setCurrentTab('destinations');
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToPlanner = (dest: Destination) => {
    const newItem: ItineraryItem = {
      id: `dest-${Date.now()}`,
      day: 1,
      time: '02:00 PM',
      title: `${dest.name} Discovery`,
      duration: '3.0 hrs',
      costUSD: Math.round(dest.dailyCostUSD * 0.4),
      note: `Highlights: ${dest.highlights[0] || 'Guided field route'}`,
      category: 'sightseeing'
    };
    setItineraryItems(prev => [...prev, newItem]);
  };

  const handleAddPoiToPlanner = (poi: MapPoi) => {
    const newItem: ItineraryItem = {
      id: `poi-${Date.now()}`,
      day: 1,
      time: '01:30 PM',
      title: `${poi.name} (${poi.city})`,
      duration: poi.duration,
      costUSD: poi.costUSD,
      note: poi.description,
      category: 'activity'
    };
    setItineraryItems(prev => [...prev, newItem]);
  };

  // Filtered destination list based on search/region/category/budget/filter tab
  const filteredDestinations = DESTINATIONS.filter(dest => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = dest.name.toLowerCase().includes(q) ||
                    dest.country.toLowerCase().includes(q) ||
                    dest.city.toLowerCase().includes(q) ||
                    dest.description.toLowerCase().includes(q) ||
                    dest.activities?.some(a => a.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
      return false;
    }

    if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
      return false;
    }

    if (selectedBudget === 'budget' && dest.budgetTier !== '$ Budget-Friendly') return false;
    if (selectedBudget === 'mid' && dest.budgetTier !== '$$ Mid-Range') return false;
    if (selectedBudget === 'luxury' && !dest.budgetTier.includes('$$$')) return false;

    if (activeFilterTab === 'nature' && dest.category !== 'Natural Wonders' && dest.category !== 'Adventure & Hiking') return false;
    if (activeFilterTab === 'culture' && dest.category !== 'Historic Landmarks') return false;
    if (activeFilterTab === 'budget' && dest.budgetTier !== '$ Budget-Friendly') return false;

    return true;
  });

  const handleContinentSelect = (continentName: string) => {
    setSelectedRegion(continentName);
    setSearchQuery('');
    const element = document.getElementById('featured-destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCountrySelect = (countryName: string) => {
    setSearchQuery(countryName);
    setSelectedRegion('all');
    const element = document.getElementById('featured-destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSelect = (destName: string) => {
    const found = DESTINATIONS.find(d => 
      d.name.toLowerCase().includes(destName.toLowerCase().split(',')[0]) ||
      d.country.toLowerCase().includes(destName.toLowerCase())
    );
    if (found) {
      setActiveDestination(found);
    } else {
      setSearchQuery(destName);
      const element = document.getElementById('featured-destinations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleArchetypeSelect = (_archetypeName: string) => {
    setCurrentTab('planner');
  };

  const savedDestinationsList = DESTINATIONS.filter(d => savedIds.includes(d.id));

  // Quick Screen Switcher Dock
  const ScreenSwitcherDock = () => (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#11382e]/95 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-1 text-xs max-w-[95vw] overflow-x-auto">
      <button
        onClick={() => setCurrentTab('destinations')}
        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium whitespace-nowrap ${
          currentTab === 'destinations' ? 'bg-white text-[#11382e] font-bold shadow-xs' : 'text-stone-200 hover:bg-white/10'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>1. Home Hub</span>
      </button>

      <button
        onClick={() => setCurrentTab('hotels')}
        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium whitespace-nowrap ${
          currentTab === 'hotels' ? 'bg-white text-[#11382e] font-bold shadow-xs' : 'text-stone-200 hover:bg-white/10'
        }`}
      >
        <BedDouble className="w-3.5 h-3.5 text-amber-300" />
        <span>2. Hotels &amp; Stays</span>
      </button>

      <button
        onClick={() => setCurrentTab('map')}
        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium whitespace-nowrap ${
          currentTab === 'map' ? 'bg-white text-[#11382e] font-bold shadow-xs' : 'text-stone-200 hover:bg-white/10'
        }`}
      >
        <Globe2 className="w-3.5 h-3.5 text-emerald-300" />
        <span>3. Interactive Map</span>
      </button>

      <button
        onClick={() => setCurrentTab('expeditions')}
        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium whitespace-nowrap ${
          currentTab === 'expeditions' ? 'bg-white text-[#11382e] font-bold shadow-xs' : 'text-stone-200 hover:bg-white/10'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        <span>4. Curated Expeditions</span>
      </button>

      <button
        onClick={() => setCurrentTab('admin')}
        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium whitespace-nowrap ${
          currentTab === 'admin' ? 'bg-white text-[#11382e] font-bold shadow-xs' : 'text-stone-200 hover:bg-white/10'
        }`}
      >
        <Lock className={`w-3.5 h-3.5 ${isAdminAuthenticated ? 'text-emerald-400' : 'text-amber-300'}`} />
        <span>{isAdminAuthenticated ? 'Admin Ops' : 'Admin Login'}</span>
      </button>
    </div>
  );

  // SCREEN 3: Cartography Ops Private Admin Portal (Protected)
  if (currentTab === 'admin') {
    return (
      <div className="min-h-screen bg-[#f7f5ed] pb-16">
        {isAdminAuthenticated ? (
          <AdminConsoleView
            currentUser={adminUser}
            onLogout={handleAdminLogout}
            onBackToMain={() => setCurrentTab('destinations')}
          />
        ) : (
          <AdminLoginView
            onLoginSuccess={handleAdminLoginSuccess}
            onBackToHome={() => setCurrentTab('destinations')}
          />
        )}
        <ScreenSwitcherDock />
      </div>
    );
  }

  // SCREEN 2: Curated Expeditions (482 Live Locations with Split Canvas & Map)
  if (currentTab === 'expeditions') {
    return (
      <div className="min-h-screen bg-[#fbfaf6] flex flex-col pb-16">
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currency={currency}
          onChangeCurrency={setCurrency}
          savedCount={savedIds.length}
          onOpenSaved={() => setSavedDrawerOpen(true)}
          onOpenSearch={() => {
            const el = document.getElementById('hero-search');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSignIn={() => setSignInOpen(true)}
          onStartPlanning={() => setCurrentTab('planner')}
        />

        <CuratedExpeditionsView
          onBackToHome={() => setCurrentTab('destinations')}
          onOpenPlanner={() => setCurrentTab('planner')}
          onOpenAdminOps={() => setCurrentTab('admin')}
          onSelectDestinationModal={setActiveDestination}
          currency={currency}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />

        <DestinationModal
          destination={activeDestination}
          onClose={() => setActiveDestination(null)}
          isSaved={activeDestination ? savedIds.includes(activeDestination.id) : false}
          onToggleSave={toggleSave}
          onAddToPlanner={handleAddToPlanner}
          currency={currency}
        />

        <SavedDrawer
          isOpen={savedDrawerOpen}
          onClose={() => setSavedDrawerOpen(false)}
          savedDestinations={savedDestinationsList}
          onRemove={toggleSave}
          onSelect={setActiveDestination}
          currency={currency}
          onStartPlanning={() => {
            setSavedDrawerOpen(false);
            setCurrentTab('planner');
          }}
        />

        <SignInModal
          isOpen={signInOpen}
          onClose={() => setSignInOpen(false)}
        />

        <ScreenSwitcherDock />
      </div>
    );
  }

  // Dedicated Hotels & Stays View
  if (currentTab === 'hotels') {
    return (
      <div className="min-h-screen bg-[#fbfaf6] flex flex-col pb-16">
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currency={currency}
          onChangeCurrency={setCurrency}
          savedCount={savedIds.length}
          onOpenSaved={() => setSavedDrawerOpen(true)}
          onOpenSearch={() => {
            const el = document.getElementById('hero-search');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSignIn={() => setSignInOpen(true)}
          onStartPlanning={() => setCurrentTab('planner')}
        />

        <main className="flex-1">
          <HotelsShowcase
            hotels={HOTELS}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectHotel={setActiveHotel}
          />
          <Newsletter />
        </main>

        <Footer onSelectTab={setCurrentTab} />

        <HotelDetailModal
          hotel={activeHotel}
          onClose={() => setActiveHotel(null)}
          currency={currency}
          isSaved={activeHotel ? savedIds.includes(activeHotel.id) : false}
          onToggleSave={toggleSave}
        />

        <DestinationModal
          destination={activeDestination}
          onClose={() => setActiveDestination(null)}
          isSaved={activeDestination ? savedIds.includes(activeDestination.id) : false}
          onToggleSave={toggleSave}
          onAddToPlanner={handleAddToPlanner}
          currency={currency}
          onSelectHotel={setActiveHotel}
        />

        <SavedDrawer
          isOpen={savedDrawerOpen}
          onClose={() => setSavedDrawerOpen(false)}
          savedDestinations={savedDestinationsList}
          onRemove={toggleSave}
          onSelect={setActiveDestination}
          currency={currency}
          onStartPlanning={() => {
            setSavedDrawerOpen(false);
            setCurrentTab('planner');
          }}
        />

        <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
        <ScreenSwitcherDock />
      </div>
    );
  }

  // Interactive Map View
  if (currentTab === 'map') {
    return (
      <div className="min-h-screen bg-[#fbfaf6] pb-16">
        <MapExplorerView
          onBack={() => setCurrentTab('destinations')}
          onAddToPlanner={handleAddPoiToPlanner}
          currency={currency}
          onSelectDestinationModal={setActiveDestination}
          onSelectHotelModal={setActiveHotel}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />

        <DestinationModal
          destination={activeDestination}
          onClose={() => setActiveDestination(null)}
          isSaved={activeDestination ? savedIds.includes(activeDestination.id) : false}
          onToggleSave={toggleSave}
          onAddToPlanner={handleAddToPlanner}
          currency={currency}
          onSelectHotel={setActiveHotel}
        />

        <HotelDetailModal
          hotel={activeHotel}
          onClose={() => setActiveHotel(null)}
          currency={currency}
          isSaved={activeHotel ? savedIds.includes(activeHotel.id) : false}
          onToggleSave={toggleSave}
        />

        <SavedDrawer
          isOpen={savedDrawerOpen}
          onClose={() => setSavedDrawerOpen(false)}
          savedDestinations={savedDestinationsList}
          onRemove={toggleSave}
          onSelect={setActiveDestination}
          currency={currency}
          onStartPlanning={() => {
            setSavedDrawerOpen(false);
            setCurrentTab('planner');
          }}
        />

        <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
        <ScreenSwitcherDock />
      </div>
    );
  }

  // Trip Planner View
  if (currentTab === 'planner') {
    return (
      <div className="min-h-screen bg-[#fbfaf6] pb-16">
        <TripPlannerView
          items={itineraryItems}
          setItems={setItineraryItems}
          onBack={() => setCurrentTab('destinations')}
          currency={currency}
        />
        <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
        <ScreenSwitcherDock />
      </div>
    );
  }

  // SCREEN 1: Primary Discovery / Home Landing Page (Matching Screenshot 1)
  return (
    <div className="min-h-screen bg-[#fbfaf6] flex flex-col selection:bg-[#114b3e] selection:text-white pb-16">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currency={currency}
        onChangeCurrency={setCurrency}
        savedCount={savedIds.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenSearch={() => {
          const el = document.getElementById('hero-search');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSignIn={() => setSignInOpen(true)}
        onStartPlanning={() => setCurrentTab('planner')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero-search">
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            activeFilterTab={activeFilterTab}
            setActiveFilterTab={setActiveFilterTab}
            onExplore={() => {
              const el = document.getElementById('featured-destinations');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onQuickSelect={handleQuickSelect}
            onOpenMap={() => setCurrentTab('map')}
          />
        </div>

        {/* Regional Field Guides / Explore by Continent */}
        <ContinentGrid 
          onSelectContinent={handleContinentSelect} 
          onSelectCountry={handleCountrySelect}
        />

        {/* Curated Global Highlights / Featured Destinations */}
        <div id="featured-destinations">
          <FeaturedDestinations
            destinations={filteredDestinations.length > 0 ? filteredDestinations : DESTINATIONS}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectDestination={setActiveDestination}
            currency={currency}
          />
        </div>

        {/* Interactive World Map Section (Leaflet + OpenStreetMap) */}
        <section id="world-map-preview" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-[#ded8c7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-1">
                <Globe2 className="w-4 h-4 text-emerald-700" />
                <span>OpenStreetMap Interactive Cartography</span>
              </div>
              <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#11382e] tracking-tight">
                Worldwide Interactive Travel Map
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Explore verified destinations and hand-selected luxury stays across 195+ countries with live GPS coordinates, satellite zoom, and instant route planning.
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('map')}
              className="px-4 py-2.5 bg-[#11382e] hover:bg-[#0c2f27] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 self-start md:self-auto"
            >
              <span>Full Screen Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractiveWorldMap
            destinations={DESTINATIONS}
            hotels={HOTELS}
            onSelectDestination={setActiveDestination}
            onSelectHotel={setActiveHotel}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            currency={currency}
            onAddToPlanner={handleAddToPlanner}
          />
        </section>

        {/* Worldwide Hotels & Stays Showcase */}
        <div id="hotels-showcase">
          <HotelsShowcase
            hotels={HOTELS}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectHotel={setActiveHotel}
          />
        </div>

        {/* Empirical Field Economics / Smart Budget Archetypes */}
        <BudgetArchetypes
          currency={currency}
          onSelectArchetypeItinerary={handleArchetypeSelect}
        />

        {/* Curated Dispatches / Editor's Picks */}
        <EditorDispatches
          onSelectArticle={setActiveArticle}
          onViewAllDispatches={() => {
            setActiveArticle(EDITORIAL_ARTICLES[0]);
          }}
        />

        {/* Stats & Trust Banner (Dark Green) */}
        <StatsBanner />

        {/* Newsletter Signup */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Modals & Drawers */}
      <DestinationModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
        isSaved={activeDestination ? savedIds.includes(activeDestination.id) : false}
        onToggleSave={toggleSave}
        onAddToPlanner={handleAddToPlanner}
        currency={currency}
        onSelectHotel={setActiveHotel}
      />

      <HotelDetailModal
        hotel={activeHotel}
        onClose={() => setActiveHotel(null)}
        currency={currency}
        isSaved={activeHotel ? savedIds.includes(activeHotel.id) : false}
        onToggleSave={toggleSave}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedDestinations={savedDestinationsList}
        onRemove={toggleSave}
        onSelect={setActiveDestination}
        currency={currency}
        onStartPlanning={() => {
          setSavedDrawerOpen(false);
          setCurrentTab('planner');
        }}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
      />

      {/* Screen Switcher Floating Dock */}
      <ScreenSwitcherDock />
    </div>
  );
}
