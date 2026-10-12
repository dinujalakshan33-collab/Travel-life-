import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Download, 
  Plus, Search, Bell, User, ExternalLink, Check, X, ArrowRight, ArrowLeft, 
  MapPin, Globe, Database, Cpu, Radio, GitPullRequest, Eye, FileText, 
  ChevronRight, Compass, Layers, Lock, Sparkles, Sliders, LogOut
} from 'lucide-react';
import { authApi, AuthUser } from '../services/authApi';

export interface AuditCandidate {
  id: string;
  code: string;
  name: string;
  location: string;
  category: string;
  provenance: string;
  provenanceTime: string;
  osmStatus: 'valid' | 'drift' | 'missing';
  osmText: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'revision';
  liveContent: string;
  draftContent: string;
  coordinates: { lat: number; lng: number };
  nominatimMatch: number;
  osmRelation: string;
  attribution: string;
  photographer: string;
}

const INITIAL_CANDIDATES: AuditCandidate[] = [
  {
    id: 'jiufen',
    code: 'POI #GT-88402',
    name: 'Jiufen Old Street & Mines',
    location: 'Ruifang District, New Taipei • TW',
    category: 'Heritage / Cultural Village',
    provenance: 'Wikivoyage Crawl #814 Via Auto-Parser',
    provenanceTime: '2h ago',
    osmStatus: 'drift',
    osmText: 'OSM Drift +0.038°',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Historic gold mining village. Famous for street food and staircases. Lanterns line streets. Fee: Free entrance',
    draftContent: 'Historic gold mining town built on steep sea-facing slopes. Renowned for A-Mei Teahouse and panoramic Keelung mountain views. Fee: Free; Teahouse: ~NT$400',
    coordinates: { lat: 25.1099, lng: 121.8452 },
    nominatimMatch: 0.98,
    osmRelation: '#891104',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Wikimedia @Chunghao_TW'
  },
  {
    id: 'fushimi',
    code: 'POI #GT-10492',
    name: 'Fushimi Inari-taisha',
    location: 'Kyoto, Kansai Region • JP',
    category: 'Shinto Shrine / Sacred Trail',
    provenance: '@kenjiro_c Master Contributor',
    provenanceTime: '3h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #2841908',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Shrine with red gates in southern Kyoto.',
    draftContent: 'Primary shrine of Kami Inari with 10,000 senbon torii mountain pass extending 4km to the sacred summit peak.',
    coordinates: { lat: 34.9671, lng: 135.7727 },
    nominatimMatch: 1.0,
    osmRelation: '#2841908',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Kenjiro Cartography'
  },
  {
    id: 'plitvice',
    code: 'POI #GT-41902',
    name: 'Plitvice Lakes National Park',
    location: 'Lika-Senj County • HR',
    category: 'UNESCO Nature Reserve',
    provenance: 'Balkans Eco-Syndicate Verified Partner API',
    provenanceTime: '5h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #4190211',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Lakes in Croatia with waterfalls and boardwalks.',
    draftContent: 'Karst mountain lake cascade formed by biodynamic travertine barriers with 8.0km designated hiking trail loops.',
    coordinates: { lat: 44.8654, lng: 15.6036 },
    nominatimMatch: 0.99,
    osmRelation: '#4190211',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Croatia Nature Bureau'
  },
  {
    id: 'sigiriya',
    code: 'POI #GT-11094',
    name: 'Sigiriya Citadel & Water Gardens',
    location: 'Matale District, Central Prov. • LK',
    category: 'Ancient Citadel / Archaeology',
    provenance: 'Community Submission User #U-94021',
    provenanceTime: '6h ago',
    osmStatus: 'valid',
    osmText: 'Valid OSM #110948',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Ancient rock fortress in Sri Lanka.',
    draftContent: 'Fifth-century palace fortress built atop a 200m monolithic column of magma featuring hydraulic water gardens and lion gate.',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    nominatimMatch: 0.97,
    osmRelation: '#110948',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Lanka Heritage Fund'
  },
  {
    id: 'ny-alesund',
    code: 'POI #GT-77201',
    name: 'Ny-Ålesund Arctic Research Base',
    location: 'Svalbard Archipelago • NO',
    category: 'Polar Outpost / Science',
    provenance: 'NPI Norway Feed Automated GeoJSON',
    provenanceTime: '7h ago',
    osmStatus: 'missing',
    osmText: 'Missing Geotag',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
    liveContent: 'Northernmost research town in the world.',
    draftContent: 'Year-round international scientific research settlement on Spitsbergen island requiring zero active radio transmission emissions.',
    coordinates: { lat: 78.9244, lng: 11.9286 },
    nominatimMatch: 0.81,
    osmRelation: '#000000',
    attribution: 'CC-BY-SA 4.0 Verified',
    photographer: 'Polar Research Inst.'
  }
];

interface AdminConsoleViewProps {
  onBackToMain: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({ 
  onBackToMain,
  currentUser,
  onLogout 
}) => {
  const [candidates, setCandidates] = useState<AuditCandidate[]>(INITIAL_CANDIDATES);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('jiufen');
  const [activeTab, setActiveTab] = useState<'pending' | 'outdated' | 'community' | 'archive'>('pending');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [cartographerNote, setCartographerNote] = useState<string>(
    'Aligned coordinates with Ruifang District survey; teahouse pricing verified.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [auditRunning, setAuditRunning] = useState(false);
  const [newPoiModalOpen, setNewPoiModalOpen] = useState(false);

  // New POI form state
  const [newPoiName, setNewPoiName] = useState('');
  const [newPoiLocation, setNewPoiLocation] = useState('');
  const [newPoiCategory, setNewPoiCategory] = useState('Heritage / Cultural Village');
  const [newPoiOsm, setNewPoiOsm] = useState('');

  const activeCandidate = candidates.find(c => c.id === activeCandidateId) || candidates[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = async (id: string) => {
    const res = await authApi.approveWaypoint(id, cartographerNote);
    if (res.success) {
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
      showToast(res.message || `Approved ${activeCandidate.name} and synced to live production database v4.0!`);
    } else {
      showToast(res.error || 'Server rejected approval. Admin authorization expired.');
    }
  };

  const handleRequestRevision = (id: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'revision' } : c));
    showToast(`Requested revision for ${activeCandidate.name}. Notification sent to contributor.`);
  };

  const handleRunAudit = async () => {
    setAuditRunning(true);
    showToast('Running live OpenStreetMap Overpass & Nominatim spatial drift audit...');
    const auditRes = await authApi.triggerAudit();
    setAuditRunning(false);
    if (auditRes.success) {
      showToast(auditRes.summary || 'Audit complete: 14,198 nodes aligned. 1 minor drift flag resolved.');
    } else {
      showToast(auditRes.error || 'Audit failed. Please re-authenticate.');
    }
  };

  const handleExportSchema = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(candidates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "travel-life-cartography-schema.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported verified GeoJSON cartography schema.');
  };

  const handleCreatePoi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoiName) return;
    const newEntry: AuditCandidate = {
      id: `poi-${Date.now()}`,
      code: `POI #GT-${Math.floor(10000 + Math.random() * 89999)}`,
      name: newPoiName,
      location: newPoiLocation || 'Global Coordinates',
      category: newPoiCategory,
      provenance: 'Manual Editorial Input by Dr. Vance',
      provenanceTime: 'Just now',
      osmStatus: 'valid',
      osmText: newPoiOsm || 'Valid OSM #991024',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      status: 'pending',
      liveContent: 'Unpublished entry.',
      draftContent: `${newPoiName} in ${newPoiLocation}. Newly logged cartographic waypoint.`,
      coordinates: { lat: 35.0, lng: 135.0 },
      nominatimMatch: 1.0,
      osmRelation: '#991024',
      attribution: 'CC-BY-SA 4.0 Verified',
      photographer: 'Dr. Eleanor Vance'
    };
    setCandidates(prev => [newEntry, ...prev]);
    setActiveCandidateId(newEntry.id);
    setNewPoiModalOpen(false);
    setNewPoiName('');
    setNewPoiLocation('');
    showToast(`Added ${newEntry.name} to the verification queue!`);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ed] text-[#1c2723] flex flex-col font-sans selection:bg-[#114b3e] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#103e33] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-emerald-400/40 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar (Screenshot 3 Header) */}
      <header className="bg-white border-b border-[#ded8c7] px-4 sm:px-6 py-2.5 sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Brand & System Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToMain}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-[#114b3e] flex items-center justify-center text-white">
                <Compass className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-[#11382e] block">
                  Travel-Life
                </span>
                <span className="font-mono text-[9px] font-bold text-amber-700 tracking-wider block -mt-1">
                  CARTOGRAPHY OPS
                </span>
              </div>
            </button>

            <div className="hidden md:block w-px h-6 bg-[#ded8c7]"></div>

            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="font-semibold text-stone-700">
                Travel-Life Admin Console &amp; Verification Portal
              </span>
              <span className="text-stone-400">—</span>
              <span className="font-mono text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold border border-red-200">
                PRODUCTION DATABASE — READ/WRITE ACCESS
              </span>
            </div>
          </div>

          {/* Right Tools: Search, Notification, Dr. Eleanor Vance Profile */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search POIs, trails, maps... ⌘K"
                className="pl-8 pr-3 py-1 text-xs bg-[#faf8f3] border border-[#ded8c7] rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none w-52 lg:w-64"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* Authorized Admin User Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#ded8c7]">
              <div className="w-8 h-8 rounded-full bg-[#11382e] text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/40">
                {currentUser?.email ? currentUser.email.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <span className="font-bold text-[#11382e] block truncate max-w-[160px]">
                  {currentUser?.email || 'Authorized Administrator'}
                </span>
                <span className="font-mono text-[10px] text-emerald-800 font-semibold block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Private Admin Session
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Terminate administrator session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-700" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            {/* Return to Explorer Button */}
            <button
              onClick={onBackToMain}
              className="ml-1 px-3 py-1.5 rounded-lg bg-[#11382e] hover:bg-[#0c2f27] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Site</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Body: Left Navigation + Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Admin Navigation Sidebar */}
        <aside className="w-full md:w-56 shrink-0 bg-white border-r border-[#ded8c7] p-3 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[9px] font-bold text-stone-500 uppercase tracking-widest px-3">
              ADMIN NAVIGATION
            </span>
            <nav className="space-y-1 text-xs">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#11382e] text-white font-semibold cursor-pointer">
                <Layers className="w-4 h-4 text-emerald-300" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => showToast('Switched to Verification Queue queue view')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf8f3] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-stone-500" />
                  <span>Verification Queue</span>
                </div>
                <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                  38
                </span>
              </button>
              <button 
                onClick={() => showToast('Map Registry open: 14,284 spatial footprints indexed')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf8f3] cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-stone-500" />
                <span>Map Registry</span>
              </button>
              <button 
                onClick={() => showToast('Itinerary Approvals: 12 peer-reviewed proposals pending')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf8f3] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-stone-500" />
                <span>Itinerary Approvals</span>
              </button>
              <button 
                onClick={() => showToast('POI Catalog filtered by WGS84 nodes')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf8f3] cursor-pointer"
              >
                <Globe className="w-4 h-4 text-stone-500" />
                <span>POI Catalog</span>
              </button>
              <button 
                onClick={() => showToast('Audit logs: 1,420 automated commits logged today')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf8f3] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>System Audit Logs</span>
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-[#ede8dc] px-3 py-2">
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>CONSOLE V4.8 Online</span>
            </div>
          </div>
        </aside>

        {/* Center Main Stage + Right Inspection Drawer */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col xl:flex-row gap-6 overflow-hidden">
          
          {/* Main Verification Stage */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Top Pipeline Bar & Action Buttons */}
            <div className="bg-white rounded-2xl border border-[#ded8c7] p-5 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#11382e]" />
                    <h2 className="text-base font-bold text-[#11382e] tracking-tight">
                      Content Verification &amp; Cartography QAPIPELINE V4.81
                    </h2>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Editorial review queue, spatial OSM geofencing integrity, and multilingual syndication ledger.
                  </p>
                </div>

                {/* Pipeline Buttons */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={() => setNewPoiModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#11382e] hover:bg-[#0c2f27] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New POI Entry</span>
                  </button>

                  <button
                    onClick={handleRunAudit}
                    disabled={auditRunning}
                    className="px-3 py-1.5 rounded-lg border border-[#ded8c7] hover:bg-[#faf8f3] font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-stone-500 ${auditRunning ? 'animate-spin text-emerald-700' : ''}`} />
                    <span>Run OSM Geocode Audit</span>
                  </button>

                  <button
                    onClick={handleExportSchema}
                    className="px-3 py-1.5 rounded-lg border border-[#ded8c7] hover:bg-[#faf8f3] font-semibold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-500" />
                    <span>Export Schema</span>
                  </button>

                  <button
                    onClick={() => showToast('Synchronized with OSM Overpass API')}
                    className="p-1.5 rounded-lg border border-[#ded8c7] hover:bg-[#faf8f3] text-stone-500 cursor-pointer"
                    title="Refresh cache"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Global Catalog */}
              <div className="bg-white rounded-2xl border border-[#ded8c7] p-4 shadow-2xs">
                <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  GLOBAL CATALOG
                </span>
                <span className="block text-2xl font-bold text-[#11382e] mt-1 font-mono">
                  14,284
                </span>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-[#ede8dc]">
                  <span className="text-emerald-700 font-semibold">+124 POIs this week</span>
                  <span>98.2% localized</span>
                </div>
              </div>

              {/* Card 2: Verification Queue */}
              <div className="bg-white rounded-2xl border border-[#ded8c7] p-4 shadow-2xs">
                <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  VERIFICATION QUEUE
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-[#11382e] font-mono">38</span>
                  <span className="text-xs font-bold text-amber-700 font-mono">6 Urgent SLA</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-[#ede8dc]">
                  <span>Avg turn: 4.2h</span>
                  <span className="text-emerald-700 font-medium">Within Target</span>
                </div>
              </div>

              {/* Card 3: OSM Geocode Precision */}
              <div className="bg-white rounded-2xl border border-[#ded8c7] p-4 shadow-2xs">
                <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  OSM GEOCODE PRECISION
                </span>
                <span className="block text-2xl font-bold text-[#11382e] mt-1 font-mono">
                  99.4%
                </span>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-[#ede8dc]">
                  <span>14,198 nodes aligned</span>
                  <span className="text-amber-700 font-semibold">86 drift flags</span>
                </div>
              </div>

              {/* Card 4: API Pipeline Feeds */}
              <div className="bg-white rounded-2xl border border-[#ded8c7] p-4 shadow-2xs">
                <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  API PIPELINE FEEDS
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xl font-bold text-[#11382e]">All Live</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mt-2 pt-2 border-t border-[#ede8dc]">
                  <span>Overpass 42ms • Wiki 94 req/m</span>
                  <span className="text-emerald-700 font-bold">100% SLA</span>
                </div>
              </div>
            </div>

            {/* Queue Filter Tabs & Candidate Table */}
            <div className="bg-white rounded-2xl border border-[#ded8c7] overflow-hidden shadow-2xs">
              
              {/* Queue Sub-tabs */}
              <div className="border-b border-[#ded8c7] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-[#faf8f3]">
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeTab === 'pending'
                        ? 'bg-white text-[#11382e] font-bold shadow-2xs border border-[#ded8c7]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Pending Verification (38)
                  </button>
                  <button
                    onClick={() => setActiveTab('outdated')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeTab === 'outdated'
                        ? 'bg-white text-[#11382e] font-bold shadow-2xs border border-[#ded8c7]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Flagged Outdated (12)
                  </button>
                  <button
                    onClick={() => setActiveTab('community')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeTab === 'community'
                        ? 'bg-white text-[#11382e] font-bold shadow-2xs border border-[#ded8c7]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Community Reports (7)
                  </button>
                  <button
                    onClick={() => setActiveTab('archive')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeTab === 'archive'
                        ? 'bg-white text-[#11382e] font-bold shadow-2xs border border-[#ded8c7]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Verified Archive
                  </button>
                </div>

                {/* Filter Controls: Sort & Continent */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-stone-500 uppercase">SORT:</span>
                    <select className="bg-white border border-[#ded8c7] rounded-lg px-2.5 py-1 text-xs text-stone-800 font-medium focus:outline-none cursor-pointer">
                      <option>Highest Integrity Urgency</option>
                      <option>Newest Crawl Batch</option>
                      <option>Geospatial Drift Delta</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-600">
                    <span>Continent:</span>
                    <select
                      value={selectedContinent}
                      onChange={(e) => setSelectedContinent(e.target.value)}
                      className="bg-white border border-[#ded8c7] rounded-lg px-2 py-1 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="all">All (Global)</option>
                      <option value="asia">East Asia (14)</option>
                      <option value="europe">Europe (11)</option>
                      <option value="africa">North Africa (8)</option>
                      <option value="polar">Arctic/Polar (5)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Candidates Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f5f2e8] border-b border-[#ded8c7] font-mono text-[10px] text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4 font-bold">DESTINATION / POI</th>
                      <th className="py-2.5 px-3 font-bold">CATEGORY &amp; ZONE</th>
                      <th className="py-2.5 px-3 font-bold">SOURCE PROVENANCE</th>
                      <th className="py-2.5 px-3 font-bold">OSM GEOCODING INTEGRITY</th>
                      <th className="py-2.5 px-3 font-bold">FACT CHECK CHECKLIST</th>
                      <th className="py-2.5 px-4 font-bold text-right">VERIFICATION ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ede8dc]">
                    {candidates.map((cand) => {
                      const isSelected = cand.id === activeCandidateId;

                      return (
                        <tr
                          key={cand.id}
                          onClick={() => setActiveCandidateId(cand.id)}
                          className={`hover:bg-[#faf7f0] transition-colors cursor-pointer ${
                            isSelected ? 'bg-amber-50/70 ring-1 ring-amber-300/60' : ''
                          }`}
                        >
                          {/* POI & Image */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={cand.imageUrl}
                                alt={cand.name}
                                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-stone-200"
                              />
                              <div>
                                <h4 className="font-bold text-[#11382e]">{cand.name}</h4>
                                <p className="text-[11px] text-stone-500 font-mono">{cand.location}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category & Zone */}
                          <td className="py-3 px-3">
                            <span className="inline-block bg-[#f0ede4] text-stone-700 px-2 py-0.5 rounded text-[11px] font-medium border border-[#ded8c7]">
                              {cand.category}
                            </span>
                          </td>

                          {/* Provenance */}
                          <td className="py-3 px-3">
                            <span className="block font-medium text-stone-800">{cand.provenance}</span>
                            <span className="block text-[10px] font-mono text-stone-400">{cand.provenanceTime}</span>
                          </td>

                          {/* OSM Integrity */}
                          <td className="py-3 px-3">
                            {cand.osmStatus === 'valid' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>{cand.osmText}</span>
                              </span>
                            )}
                            {cand.osmStatus === 'drift' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 font-semibold">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                <span>{cand.osmText}</span>
                              </span>
                            )}
                            {cand.osmStatus === 'missing' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-semibold">
                                <AlertCircle className="w-3 h-3 text-red-600" />
                                <span>{cand.osmText}</span>
                              </span>
                            )}
                          </td>

                          {/* Fact Check Checklist icons */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2 text-stone-400">
                              <span className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center text-[10px]" title="CC License checked">
                                ©
                              </span>
                              <span className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center text-[10px]" title="Hours verified">
                                ⏱
                              </span>
                              <span className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center text-[10px]" title="Currency updated">
                                $
                              </span>
                            </div>
                          </td>

                          {/* Action Button */}
                          <td className="py-3 px-4 text-right">
                            {cand.status === 'approved' ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                <Check className="w-3.5 h-3.5" />
                                <span>Live</span>
                              </span>
                            ) : isSelected ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#11382e] text-white font-bold text-xs shadow-xs">
                                Reviewing
                              </span>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApprove(cand.id);
                                }}
                                className="p-1.5 rounded-lg border border-[#ded8c7] hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 transition-colors"
                                title="Quick Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Bottom Pagination */}
              <div className="bg-[#faf8f3] border-t border-[#ded8c7] px-4 py-3 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>Showing batch 1-5 of 38 records queued for Dr. Vance's sign-off</span>
                <div className="flex items-center gap-1">
                  <button className="px-2 py-0.5 rounded border border-stone-300 disabled:opacity-40">&lt;</button>
                  <button className="px-2 py-0.5 rounded bg-[#11382e] text-white font-bold">1</button>
                  <button className="px-2 py-0.5 rounded hover:bg-stone-100 text-stone-700">2</button>
                  <button className="px-2 py-0.5 rounded hover:bg-stone-100 text-stone-700">3</button>
                  <span>...</span>
                  <button className="px-2 py-0.5 rounded hover:bg-stone-100 text-stone-700">8</button>
                  <button className="px-2 py-0.5 rounded border border-stone-300">&gt;</button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Inspection Drawer ("UNDER AUDIT POI #GT-88402") */}
          <aside className="w-full xl:w-[420px] 2xl:w-[460px] shrink-0 bg-white rounded-2xl border border-[#ded8c7] p-5 shadow-sm space-y-5">
            
            {/* Header with Close */}
            <div className="flex items-start justify-between pb-3 border-b border-[#ede8dc]">
              <div>
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  UNDER AUDIT {activeCandidate.code}
                </span>
                <h3 className="text-base font-bold text-[#11382e] mt-0.5">
                  {activeCandidate.name}
                </h3>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                  Submitted via Wikivoyage Import • Revision #4
                </p>
              </div>

              <button
                onClick={() => showToast('Audit drawer minimized')}
                className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Diff Comparison */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  Content Diff Comparison
                </span>
                <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +18 additions / -4 deletions
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Current Live v3.2 */}
                <div className="bg-[#fbf9f4] p-2.5 rounded-xl border border-stone-200">
                  <span className="block font-mono text-[9px] font-bold text-stone-400 uppercase mb-1">
                    CURRENT LIVE (V3.2)
                  </span>
                  <p className="text-stone-600 text-xs leading-relaxed font-mono line-through opacity-70">
                    "{activeCandidate.liveContent}"
                  </p>
                </div>

                {/* Proposed Draft v4.0 */}
                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                  <span className="block font-mono text-[9px] font-bold text-emerald-800 uppercase mb-1">
                    PROPOSED DRAFT (V4.0)
                  </span>
                  <p className="text-emerald-900 text-xs leading-relaxed font-mono font-medium">
                    "{activeCandidate.draftContent}"
                  </p>
                </div>
              </div>
            </div>

            {/* Spatial Geofence & Coordinate Inspector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  Spatial Geofence &amp; Coordinate Inspector
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                  Candidate Pin Valid
                </span>
              </div>

              {/* Mini Map Widget */}
              <div className="h-36 rounded-xl bg-[#e3ecd6] border border-[#ded8c7] overflow-hidden relative p-3 flex flex-col justify-between">
                <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10,40 Q80,20 180,90 T360,110" fill="none" stroke="#b3cfb6" strokeWidth="20" />
                  <path d="M20,120 L280,20" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4,4" />
                  <ellipse cx="220" cy="70" rx="35" ry="20" fill="#a4d4cb" />
                </svg>

                {/* Pin in center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-[#11382e] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-300">
                    <MapPin className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>

                <div className="relative z-10 flex justify-between text-[10px] font-mono bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md border border-stone-200">
                  <span>Nominatim Status: Match ({activeCandidate.nominatimMatch})</span>
                  <span>OSM Relation: {activeCandidate.osmRelation}</span>
                </div>

                <div className="relative z-10 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md border border-stone-200 text-[10px] font-mono text-stone-700">
                  OSM Node: {activeCandidate.coordinates.lat}° N, {activeCandidate.coordinates.lng}° E
                </div>
              </div>
            </div>

            {/* Media Rights & CC Compliance */}
            <div className="space-y-1.5 text-xs bg-[#faf8f3] p-3 rounded-xl border border-[#ded8c7]">
              <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Media Rights &amp; CC Compliance
              </span>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-600">Attribution Status:</span>
                <span className="font-bold text-emerald-800">{activeCandidate.attribution}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-600">Photographer Credit:</span>
                <span className="font-mono text-stone-700">{activeCandidate.photographer}</span>
              </div>
            </div>

            {/* Cartographer Verification Note */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Cartographer Verification Note
              </label>
              <textarea
                value={cartographerNote}
                onChange={(e) => setCartographerNote(e.target.value)}
                rows={2}
                placeholder="e.g., Aligned coordinates with Ruifang District survey; teahouse pricing verified."
                className="w-full p-2.5 text-xs bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
              />
            </div>

            {/* Actions: Approve & Push Live + Request Revision */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleApprove(activeCandidate.id)}
                className="w-full py-2.5 bg-[#11382e] hover:bg-[#0c2e26] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Approve &amp; Push Live</span>
              </button>

              <button
                onClick={() => handleRequestRevision(activeCandidate.id)}
                className="w-full py-2 bg-white hover:bg-stone-50 text-stone-700 border border-[#ded8c7] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Request Revision
              </button>
            </div>

            {/* Live Audit Stream */}
            <div className="pt-2 border-t border-[#ede8dc]">
              <span className="block font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                Live Audit Stream
              </span>
              <div className="space-y-2 text-[11px]">
                <div className="bg-[#faf8f3] p-2 rounded-lg border border-[#ede8dc]">
                  <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
                    <span className="font-bold text-[#11382e]">Sarah K. (Senior Lead)</span>
                    <span>14m ago</span>
                  </div>
                  <p className="text-stone-700 mt-0.5">
                    "Approved OSM relation #12903 for Machu Picchu after elevation calibration."
                  </p>
                </div>

                <div className="bg-[#faf8f3] p-2 rounded-lg border border-[#ede8dc]">
                  <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
                    <span className="font-bold text-amber-800">Crawler Daemon #04</span>
                    <span>32m ago</span>
                  </div>
                  <p className="text-stone-700 mt-0.5">
                    "Flagged admission fee fluctuation (€15.50 -&gt; €17.50) at Neuschwanstein Castle."
                  </p>
                </div>

                <div className="bg-[#faf8f3] p-2 rounded-lg border border-[#ede8dc]">
                  <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
                    <span className="font-bold text-[#11382e]">Kenjiro C. (Contributor)</span>
                    <span>1h ago</span>
                  </div>
                  <p className="text-stone-700 mt-0.5">
                    "Submitted revised trail waypoint map for Kumano Kodo Pilgrimage."
                  </p>
                </div>
              </div>
            </div>

          </aside>

        </main>
      </div>

      {/* Bottom Telemetry Bar (Screenshot 3 Bottom) */}
      <footer className="bg-white border-t border-[#ded8c7] px-4 sm:px-6 py-3">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          
          {/* Left: Taxonomy & Spatial Tagging Matrix */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#faf8f3] p-2.5 rounded-xl border border-[#ded8c7]">
            <div>
              <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
                Taxonomy &amp; Spatial Tagging Matrix
              </span>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-600 mt-1">
                <span>Temples &amp; Shinto: <strong className="text-[#11382e]">2,140 verified</strong></span>
                <span>Nature &amp; Cascades: <strong className="text-[#11382e]">1,890 verified</strong></span>
                <span>Coastal &amp; Fjords: <strong className="text-[#11382e]">940 verified</strong></span>
                <span>Ancient Citadels: <strong className="text-[#11382e]">612 verified</strong></span>
              </div>
            </div>
            <button
              onClick={() => showToast('Opened taxonomy tag rule creation editor')}
              className="text-[11px] font-bold text-[#11382e] hover:underline whitespace-nowrap cursor-pointer"
            >
              + Define New Tag Rule
            </button>
          </div>

          {/* Right: Sync Pipelines & External Knowledge Adapters */}
          <div className="bg-[#faf8f3] p-2.5 rounded-xl border border-[#ded8c7]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                Sync Pipelines &amp; External Knowledge Adapters
              </span>
              <span className="font-mono text-[9px] text-emerald-700">Real-time health telemetry</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-stone-600 mt-1 pt-1 border-t border-[#ede8dc]">
              <div>
                <span className="font-bold text-[#11382e] block">REST Countries v3.1</span>
                <span className="text-emerald-700">Synchronized (250/250)</span>
              </div>
              <div>
                <span className="font-bold text-[#11382e] block">Wikivoyage Extractor</span>
                <span className="text-emerald-700">Healthy (94 req/min)</span>
              </div>
              <div>
                <span className="font-bold text-[#11382e] block">OSM Overpass / Nominatim</span>
                <span className="text-emerald-700">Optimal (HTTP 200, 42ms)</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* New POI Modal */}
      {newPoiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#ded8c7] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#ded8c7]">
              <h3 className="text-base font-bold text-[#11382e]">Add New Verified POI Entry</h3>
              <button onClick={() => setNewPoiModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePoi} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                  POI Name
                </label>
                <input
                  type="text"
                  required
                  value={newPoiName}
                  onChange={(e) => setNewPoiName(e.target.value)}
                  placeholder="e.g., Mount Fuji 5th Station"
                  className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Location &amp; Country
                </label>
                <input
                  type="text"
                  value={newPoiLocation}
                  onChange={(e) => setNewPoiLocation(e.target.value)}
                  placeholder="e.g., Yamanashi Prefecture • Japan"
                  className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Category
                </label>
                <select
                  value={newPoiCategory}
                  onChange={(e) => setNewPoiCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 focus:outline-none"
                >
                  <option>Heritage / Cultural Village</option>
                  <option>Shinto Shrine / Sacred Trail</option>
                  <option>UNESCO Nature Reserve</option>
                  <option>Alpine Antiquities</option>
                  <option>Arctic Coastal &amp; Fjords</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-600 uppercase mb-1">
                  OSM Waypoint / Relation Tag
                </label>
                <input
                  type="text"
                  value={newPoiOsm}
                  onChange={(e) => setNewPoiOsm(e.target.value)}
                  placeholder="e.g., Valid OSM #981240"
                  className="w-full p-2.5 bg-[#faf8f3] border border-[#ded8c7] rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPoiModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#11382e] hover:bg-[#0c2f27] text-white font-bold"
                >
                  Submit for QA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
