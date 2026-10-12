import React from 'react';
import { Compass, Twitter, Instagram, Github, BookOpen, ShieldCheck, Shield } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#f2ece0] border-t border-[#ded8c7] text-[#2c3d36] pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-[#ded8c7]">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#114b3e] flex items-center justify-center text-white">
                <Compass className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#11382e] font-sans">
                Travel-Life
              </span>
            </div>

            <p className="text-xs text-[#52645d] leading-relaxed max-w-sm">
              Travel-Life empowers travelers with verified destination data, community itineraries, and real-time planning tools.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#465b53]">
              <a href="#" className="p-2 rounded-full hover:bg-[#e4decb] transition-colors" title="Twitter / X">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-[#e4decb] transition-colors" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-[#e4decb] transition-colors" title="Substack">
                <BookOpen className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-[#e4decb] transition-colors" title="GitHub Open Source">
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('admin')}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-900 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300 hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified Cartography Index</span>
              </button>
            </div>
          </div>

          {/* Col 1: EXPLORE */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3.5">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs text-[#465b53]">
              <li><button onClick={() => onSelectTab('destinations')} className="hover:text-[#11382e] hover:underline cursor-pointer">Continents</button></li>
              <li><button onClick={() => onSelectTab('expeditions')} className="hover:text-[#11382e] hover:underline cursor-pointer">Curated Expeditions</button></li>
              <li><button onClick={() => onSelectTab('destinations')} className="hover:text-[#11382e] hover:underline cursor-pointer">Hidden Gems</button></li>
              <li><button onClick={() => onSelectTab('map')} className="hover:text-[#11382e] hover:underline cursor-pointer">World Map</button></li>
            </ul>
          </div>

          {/* Col 2: TRAVEL PLANNER */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3.5">
              TRAVEL PLANNER
            </h4>
            <ul className="space-y-2 text-xs text-[#465b53]">
              <li><button onClick={() => onSelectTab('planner')} className="hover:text-[#11382e] hover:underline cursor-pointer">Itinerary Builder</button></li>
              <li><button onClick={() => onSelectTab('destinations')} className="hover:text-[#11382e] hover:underline cursor-pointer">Budget Calculator</button></li>
              <li><button onClick={() => onSelectTab('planner')} className="hover:text-[#11382e] hover:underline cursor-pointer">Packing Lists</button></li>
              <li><button onClick={() => onSelectTab('planner')} className="hover:text-[#11382e] hover:underline cursor-pointer">Group Trips</button></li>
              <li><button onClick={() => onSelectTab('map')} className="hover:text-[#11382e] hover:underline cursor-pointer">Offline Mode</button></li>
            </ul>
          </div>

          {/* Col 3: RESOURCES & DATA */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3.5">
              RESOURCES &amp; DATA
            </h4>
            <ul className="space-y-2 text-xs text-[#465b53]">
              <li><a href="#" className="hover:text-[#11382e] hover:underline">REST Countries API</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">OpenStreetMap Data</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">Travel Advisories</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">Editorial Standards</a></li>
            </ul>
          </div>

          {/* Col 4: COMPANY & LEGAL (with Admin CMS link) */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-stone-700 uppercase tracking-widest mb-3.5">
              DATA &amp; TRUST
            </h4>
            <ul className="space-y-2 text-xs text-[#465b53]">
              <li><a href="#" className="hover:text-[#11382e] hover:underline">About Travel-Life</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">Verified Source Policy</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#11382e] hover:underline">Terms of Service</a></li>
              <li className="pt-2">
                <button
                  onClick={() => onSelectTab('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11382e] text-white hover:bg-[#0a2f26] font-mono text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin CMS</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#52645d]">
          <p>
            © 2025 Travel-Life Cartography Ltd. All rights reserved. Data refreshed dynamically from global open repositories.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Data Feed Verified</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] bg-[#e6dfcf] px-2.5 py-1 rounded-full text-stone-700 border border-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Global Advisory Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
