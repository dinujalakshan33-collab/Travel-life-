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
import { UserProfileModal } from './components/UserProfileModal';
import { DESTINATIONS, HOTELS, INITIAL_ITINERARY_ITEMS, EDITORIAL_ARTICLES } from './data/travelData';
import { Destination, HotelStay, Currency, EditorialArticle, ItineraryItem, MapPoi } from './types/travel';
import { LayoutGrid, Layers, Shield, Compass, Sparkles, Lock, BedDouble, Globe2, ArrowRight } from 'lucide-react';
import { authApi, AuthUser } from './services/authApi';
import { authService, UserProfile } from './services/supabase';

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
  
  // Supabase User Auth & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'signin'>('signup');
  const [signInOpen, setSignInOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Itinerary items
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(INITIAL_ITINERARY_ITEMS);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Subscribe to Supabase / local auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Check server-side admin session on load
  useEffect(() => {
    authApi.checkSession().then(res => {
      setIsAdminAuthenticated(res.authenticated);
      if (res.user) setAdminUser(res.user);
      setAuthLoading(false);
    });
  }, []);

  const handleOpenSignIn = () => {
    setAuthModalMode('signin');
    setSignInOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalMode('signup');
    setSignInOpen(true);
  };

  const renderAuthModals = () => (
    <>
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        initialMode={authModalMode}
        onSuccess={(u) => setCurrentUser(u)}
      />
      <UserProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={currentUser}
        savedDestinations={savedDestinationsList}
        onOpenSavedDrawer={() => setSavedDrawerOpen(true)}
        onOpenTripPlanner={() => setCurrentTab('planner')}
        onSelectDestination={(dest) => setActiveDestination(dest)}
        onUserUpdate={(updated) => setCurrentUser(updated)}
        onSignOut={async () => {
          await authService.signOut();
          setCurrentUser(null);
        }}
      />
    </>
  );

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
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onOpenProfile={() => setProfileOpen(true)}
          user={currentUser}
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

        {renderAuthModals()}

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
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onOpenProfile={() => setProfileOpen(true)}
          user={currentUser}
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

        {renderAuthModals()}
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

        {renderAuthModals()}
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
        {renderAuthModals()}
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
        onOpenSignIn={handleOpenSignIn}
        onOpenSignUp={handleOpenSignUp}
        onOpenProfile={() => setProfileOpen(true)}
        user={currentUser}
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

      {renderAuthModals()}

      {/* Screen Switcher Floating Dock */}
      <ScreenSwitcherDock />
    </div>
  );
}
// src/App.tsx
import { useState, useMemo } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DESTINATIONS, Destination } from "./data/travelData";
import { HeroSection } from "./components/HeroSection";
import { InteractiveMap } from "./components/InteractiveMap";
import { DestinationModal } from "./components/DestinationModal";
import { HotelDiscoverySection } from "./components/HotelDiscoverySection";
import { AuthModal } from "./components/AuthModal";

// Reusing your existing components seamlessly:
import { BudgetArchetypes } from "./components/BudgetArchetypes";
import { TripPlannerView } from "./components/TripPlannerView";

import {
  Compass,
  Heart,
  User as UserIcon,
  Globe2,
  Palmtree,
  Mountain,
  Trees,
  Search,
} from "lucide-react";

function TravelLifeMain() {
  const { user, logout, isSaved } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<"explore" | "planner" | "budgets">("explore");

  // Filtering Engine
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      if (showWishlistOnly && !isSaved(d.id)) return false;

      const matchesSearch =
        !searchQuery ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesContinent =
        selectedContinent === "All" || d.continent === selectedContinent;

      const matchesCategory =
        selectedCategory === "All" || d.category === selectedCategory;

      return matchesSearch && matchesContinent && matchesCategory;
    });
  }, [searchQuery, selectedContinent, selectedCategory, showWishlistOnly, isSaved]);

  const scrollToExplore = () => {
    document.getElementById("explore-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 antialiased font-sans">
      {/* ================= STICKY HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-900 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-slate-950">
                  Travel<span className="text-emerald-700">Life</span>
                </span>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                  Global Discovery
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
              <button
                onClick={() => { setActiveTab("explore"); setShowWishlistOnly(false); }}
                className={`px-4 py-2 rounded-xl transition ${activeTab === "explore" && !showWishlistOnly ? "bg-emerald-50 text-emerald-900 font-extrabold" : "hover:bg-slate-100"}`}
              >
                Destinations
              </button>
              <button
                onClick={() => setActiveTab("planner")}
                className={`px-4 py-2 rounded-xl transition ${activeTab === "planner" ? "bg-emerald-50 text-emerald-900 font-extrabold" : "hover:bg-slate-100"}`}
              >
                Trip Planner
              </button>
              <button
                onClick={() => setActiveTab("budgets")}
                className={`px-4 py-2 rounded-xl transition ${activeTab === "budgets" ? "bg-emerald-50 text-emerald-900 font-extrabold" : "hover:bg-slate-100"}`}
              >
                Budget Tiers
              </button>
            </nav>

            {/* User Account & Wishlist Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowWishlistOnly(!showWishlistOnly);
                  setActiveTab("explore");
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                  showWishlistOnly
                    ? "bg-rose-50 text-rose-700 border-rose-300"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
                title="View Saved Wishlist"
              >
                <Heart className={`w-4 h-4 ${showWishlistOnly ? "fill-rose-600 text-rose-600" : ""}`} />
                <span className="hidden sm:inline">Wishlist</span>
                {user?.savedDestinationIds && user.savedDestinationIds.length > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center font-bold">
                    {user.savedDestinationIds.length}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 hidden lg:inline">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 border rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-950 rounded-xl shadow-xs transition"
                >
                  <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= TAB 1: EXPLORE HOMEPAGE ================= */}
      {activeTab === "explore" && (
        <>
          {/* Full Screen Premium Hero */}
          <HeroSection
            onSearch={(q) => setSearchQuery(q)}
            onExploreClick={scrollToExplore}
            onSelectQuickDest={(d) => setActiveModalDest(d)}
          />

          {/* Dedicated Sri Lanka Spotlight Section */}
          <section className="bg-emerald-950 text-white py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    Island Spotlight
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
                    Discover Sri Lanka: The Wonder of South Asia
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/80 max-w-md">
                  From UNESCO rock fortresses in Sigiriya to highland tea mist and azure whale coves in Mirissa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DESTINATIONS.filter((d) => d.featuredInSriLanka).map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => setActiveModalDest(dest)}
                    className="cursor-pointer group relative rounded-3xl overflow-hidden h-72 border border-emerald-800/40 shadow-lg"
                  >
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2 py-0.5 bg-emerald-600 text-[10px] font-bold rounded-md">
                        {dest.category}
                      </span>
                      <h3 className="font-serif font-bold text-lg mt-1 group-hover:text-emerald-300 transition">
                        {dest.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{dest.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive World Map Exploration */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="mb-6">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Geographic Discovery
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mt-0.5">
                Explore Destinations on the Interactive Map
              </h2>
            </div>
            <InteractiveMap
              selectedDestination={activeModalDest}
              onSelectDestination={(d) => setActiveModalDest(d)}
            />
          </section>

          {/* Master Destination Catalog & Filtering */}
          <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Filter Chips Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 mb-8 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                <span className="text-xs font-bold text-slate-400 pl-2">Continent:</span>
                {["All", "Asia", "Europe", "Africa", "Americas", "Oceania"].map((continent) => (
                  <button
                    key={continent}
                    onClick={() => setSelectedContinent(continent)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                      selectedContinent === continent
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {continent}
                  </button>
                ))}
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Experience:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs bg-slate-100 font-bold border-none rounded-xl px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="All">All Experiences</option>
                  <option value="Beaches">Beaches & Islands</option>
                  <option value="Mountains">Mountains & Trekking</option>
                  <option value="Wildlife">Wildlife & Safaris</option>
                  <option value="Culture">Historic & Cultural</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setActiveModalDest(d)}
                  className="cursor-pointer group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-slate-900">
                      <img
                        src={d.image}
                        alt={d.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full">
                        {d.category}
                      </span>
                      <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-slate-900 text-[10px] font-bold rounded-full">
                        ★ {d.safetyRating}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-serif font-bold text-slate-900 text-xl group-hover:text-emerald-800 transition">
                          {d.title}
                        </h3>
                        <span className="text-xs font-bold text-slate-400">{d.country}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {d.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Est. Daily</p>
                      <p className="font-bold text-emerald-950">${d.estimatedDailyUSD} USD</p>
                    </div>
                    <span className="font-bold text-emerald-700 text-xs group-hover:translate-x-1 transition flex items-center gap-1">
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-700">No matching destinations found</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Try clearing your search filters or resetting your continent selection.
                </p>
              </div>
            )}
          </section>

          {/* Hotels & Accommodations Section */}
          <HotelDiscoverySection />
        </>
      )}

      {/* ================= TAB 2: TRIP PLANNER VIEW (PRESERVED) ================= */}
      {activeTab === "planner" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TripPlannerView />
        </main>
      )}

      {/* ================= TAB 3: BUDGET ARCHETYPES (PRESERVED) ================= */}
      {activeTab === "budgets" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BudgetArchetypes />
        </main>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            <div className="space-y-4">
              <span className="font-serif font-bold text-2xl text-white">TravelLife</span>
              <p className="text-slate-400 leading-relaxed">
                Empowering mindful international exploration through authentic destination guides, transparent budget archetypes, and verified stays.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white uppercase text-[11px] mb-3">Featured Regions</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Sri Lanka Central Highlands</a></li>
                <li><a href="#" className="hover:text-white">Greek Cyclades & Caldera</a></li>
                <li><a href="#" className="hover:text-white">Japanese Cultural Capitals</a></li>
                <li><a href="#" className="hover:text-white">Canadian Rocky Mountain Parks</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white uppercase text-[11px] mb-3">Community & Ethics</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Leave No Trace Wildlife Policy</a></li>
                <li><a href="#" className="hover:text-white">Transparent Hotel Rate Estimates</a></li>
                <li><a href="#" className="hover:text-white">Local Guides & Community Partners</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white uppercase text-[11px] mb-3">Stay In Touch</h5>
              <p className="mb-2">Receive our monthly global dispatches:</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Travel Life Dispatches!"); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="explorer@email.com"
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs flex-1 text-white outline-none focus:border-emerald-600"
                />
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-2 rounded-xl">
                  Join
                </button>
              </form>
            </div>
          </div>
          <p className="pt-8 text-center text-[11px] text-slate-500">
            © 2026 Travel Life International. Built for authentic explorers worldwide.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <DestinationModal dest={activeModalDest} onClose={() => setActiveModalDest(null)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TravelLifeMain />
    </AuthProvider>
  );
                               }
