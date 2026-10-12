import React, { useState } from 'react';
import { Compass, Search, Bookmark, User, Menu, X, Globe, ArrowRight, ChevronDown, Bell, Shield } from 'lucide-react';
import { Currency } from '../types/travel';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currency: Currency;
  onChangeCurrency: (curr: Currency) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
  onOpenSignIn: () => void;
  onStartPlanning: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currency,
  onChangeCurrency,
  savedCount,
  onOpenSaved,
  onOpenSearch,
  onOpenSignIn,
  onStartPlanning
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

  return (
    <header className="sticky top-0 z-40 bg-[#fbfaf6]/95 backdrop-blur-md border-b border-[#e7e3d8]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6 xl:gap-8">
          <button 
            onClick={() => onSelectTab('destinations')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#114b3e] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0b352b] transition-colors">
              <Compass className="w-5 h-5 text-emerald-300" strokeWidth={2.2} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#11382e] font-sans block leading-none">
                Travel-Life
              </span>
              <span className="font-mono text-[9px] font-bold text-stone-500 tracking-wider block mt-0.5">
                EXPLORE THE WORLD
              </span>
            </div>
          </button>

          {/* Navigation Links (Matching Screenshot 1 & 2) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            <button
              onClick={() => onSelectTab('destinations')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-semibold flex items-center gap-1 ${
                currentTab === 'destinations'
                  ? 'bg-[#103e33] text-white shadow-xs'
                  : 'text-[#384a43] hover:text-[#11382e] hover:bg-[#ede9dc]'
              }`}
            >
              <span>Destinations</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            <button
              onClick={() => onSelectTab('expeditions')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-semibold flex items-center gap-1.5 ${
                currentTab === 'expeditions'
                  ? 'bg-[#103e33] text-white shadow-xs font-bold'
                  : 'text-[#384a43] hover:text-[#11382e] hover:bg-[#ede9dc]'
              }`}
            >
              <span>Curated Expeditions</span>
              <span className="bg-emerald-700/80 text-emerald-100 text-[9px] font-mono px-1.5 py-0.2 rounded font-bold">
                482 Live
              </span>
            </button>

            <button
              onClick={() => onSelectTab('map')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-medium ${
                currentTab === 'map'
                  ? 'bg-[#103e33] text-white shadow-xs font-semibold'
                  : 'text-[#384a43] hover:text-[#11382e] hover:bg-[#ede9dc]'
              }`}
            >
              Interactive Map
            </button>

            <button
              onClick={() => onSelectTab('planner')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-medium ${
                currentTab === 'planner'
                  ? 'bg-[#103e33] text-white shadow-xs font-semibold'
                  : 'text-[#384a43] hover:text-[#11382e] hover:bg-[#ede9dc]'
              }`}
            >
              Trip Planner
            </button>

            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-medium flex items-center gap-1.5 ${
                currentTab === 'admin'
                  ? 'bg-[#103e33] text-white shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-[#11382e] hover:bg-[#ede9dc]'
              }`}
              title="Cartography Operations Admin Console"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Cartography Ops</span>
            </button>
          </nav>
        </div>

        {/* Right Action Tools (From Screenshot 1 & 2) */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-[#30443d] hover:text-[#11382e] font-semibold py-1.5 px-2 rounded-lg hover:bg-[#ede9dc] transition-colors cursor-pointer"
            >
              <span>{currency} $</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-[#ded8c7] py-1 z-50 animate-in fade-in zoom-in-95">
                {currencies.map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      onChangeCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#f4efe4] flex items-center justify-between cursor-pointer ${
                      currency === curr ? 'text-[#114b3e] font-bold bg-[#ede9dc]' : 'text-stone-700'
                    }`}
                  >
                    <span>{curr} Currency</span>
                    {currency === curr && <span className="w-1.5 h-1.5 rounded-full bg-[#114b3e]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-stone-300">|</span>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center gap-1 text-[#30443d] hover:text-[#11382e] font-semibold py-1.5 px-2 rounded-lg hover:bg-[#ede9dc] transition-colors cursor-pointer"
            >
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl border border-[#ded8c7] py-1 z-50">
                {['EN', 'FR', 'DE', 'JA', 'ES'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#f4efe4] text-stone-700 cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-[#465b53] hover:text-[#11382e] hover:bg-[#ede9dc] rounded-full transition-colors cursor-pointer"
            title="Search destinations"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell with Badge (from Screenshot 2 & 3) */}
          <button
            onClick={() => onSelectTab('admin')}
            className="relative p-1.5 text-[#465b53] hover:text-[#11382e] hover:bg-[#ede9dc] rounded-full transition-colors cursor-pointer"
            title="Cartography alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenSaved}
            className="relative p-1.5 text-[#465b53] hover:text-[#11382e] hover:bg-[#ede9dc] rounded-full transition-colors cursor-pointer"
            title="View saved destinations"
          >
            <Bookmark className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 bg-[#103e33] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </button>

          {/* Sign In */}
          <button
            onClick={onOpenSignIn}
            className="text-[#384a43] hover:text-[#11382e] font-semibold px-2 py-1 hover:underline transition-colors cursor-pointer"
          >
            Sign In
          </button>

          {/* Start Planning CTA */}
          <button
            onClick={onStartPlanning}
            className="bg-[#103e33] hover:bg-[#0b2f26] text-white px-4 py-2 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer flex items-center gap-1.5"
          >
            <span>Plan a Trip</span>
          </button>

          {/* Profile User Icon */}
          <button
            onClick={onOpenSignIn}
            className="w-7 h-7 rounded-full border border-stone-300 hover:border-stone-400 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            title="Account Profile"
          >
            <User className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onSelectTab('admin')}
            className="p-1.5 text-stone-700 hover:bg-[#ede9dc] rounded-lg relative"
            title="Cartography Ops"
          >
            <Shield className="w-4 h-4 text-amber-700" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          <button
            onClick={onOpenSaved}
            className="relative p-2 text-[#465b53] hover:text-[#11382e]"
          >
            <Bookmark className="w-4 h-4" />
            <span className="absolute top-0 right-0 min-w-[15px] h-[15px] bg-[#114b3e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#384a43] hover:bg-[#ede9dc] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e7e3d8] bg-[#fbfaf6] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { onSelectTab('destinations'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'destinations' ? 'bg-[#114b3e] text-white font-semibold' : 'text-[#384a43]'
              }`}
            >
              Destinations (Home Hub)
            </button>
            <button
              onClick={() => { onSelectTab('expeditions'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentTab === 'expeditions' ? 'bg-[#114b3e] text-white font-semibold' : 'text-[#384a43]'
              }`}
            >
              <span>Curated Expeditions (482 Locations)</span>
              <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Live
              </span>
            </button>
            <button
              onClick={() => { onSelectTab('map'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'map' ? 'bg-[#114b3e] text-white font-semibold' : 'text-[#384a43]'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => { onSelectTab('planner'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'planner' ? 'bg-[#114b3e] text-white font-semibold' : 'text-[#384a43]'
              }`}
            >
              Trip Planner
            </button>
            <button
              onClick={() => { onSelectTab('admin'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentTab === 'admin' ? 'bg-[#114b3e] text-white font-semibold' : 'text-[#384a43]'
              }`}
            >
              <span>Cartography Ops (Admin Console)</span>
              <span className="font-mono text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                v4.8
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#e2dccf] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-600 font-medium">Currency:</span>
              <select
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value as Currency)}
                className="bg-white border border-stone-300 rounded px-2 py-1 text-xs"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button
              onClick={() => { onOpenSignIn(); setMobileMenuOpen(false); }}
              className="text-xs font-semibold text-[#114b3e]"
            >
              Sign In
            </button>
          </div>

          <button
            onClick={() => { onStartPlanning(); setMobileMenuOpen(false); }}
            className="w-full mt-2 bg-[#103e33] text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2"
          >
            <span>Plan a Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
