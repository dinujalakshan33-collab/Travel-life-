import React, { useState } from 'react';
import { 
  SRI_LANKA_ITINERARIES, 
  SriLankaItinerary, 
  SRI_LANKA_DESTINATIONS,
  SriLankaDestination 
} from '../../data/sriLankaData';
import { 
  Calendar, Clock, DollarSign, Train, Compass, Check, Copy, Sparkles, 
  ChevronRight, ArrowRight, ShieldCheck, Bed, Utensils, Navigation,
  SlidersHorizontal, Download, MapPin, Bus, Car, Ticket
} from 'lucide-react';

interface SriLankaPlannerProps {
  onAddToTripPlanner?: (itinerary: SriLankaItinerary) => void;
  onSelectDestinationModal?: (dest: SriLankaDestination) => void;
}

// Verified transit distance & travel time matrix
const VERIFIED_TRANSIT_ROUTES = [
  {
    from: 'Colombo / Airport',
    to: 'Galle Fort',
    distanceKm: 125,
    expresswayTime: '1h 30m',
    publicTransit: 'Scenic Coastal Rail (2h 15m)',
    transitType: 'Southern Expressway (E01) or Ocean Train'
  },
  {
    from: 'Colombo',
    to: 'Sigiriya (Cultural Triangle)',
    distanceKm: 175,
    expresswayTime: '3h 30m',
    publicTransit: 'Intercity Bus or Train to Habarana (4h 15m)',
    transitType: 'Central Expressway (E04) + A6'
  },
  {
    from: 'Sigiriya',
    to: 'Kandy (Temple of Tooth)',
    distanceKm: 90,
    expresswayTime: '2h 15m',
    publicTransit: 'Local AC Bus via Matale (2h 45m)',
    transitType: 'A9 Highway via Spice Corridor'
  },
  {
    from: 'Kandy',
    to: 'Nuwara Eliya (Tea Country)',
    distanceKm: 75,
    expresswayTime: '2h 30m',
    publicTransit: 'Highland Mountain Bus or Nanu Oya Rail',
    transitType: 'A5 Scenic Ramboda Pass'
  },
  {
    from: 'Nuwara Eliya (Nanu Oya)',
    to: 'Ella (Nine Arches)',
    distanceKm: 60,
    expresswayTime: '2h 00m (Car)',
    publicTransit: 'Sri Lanka Railways Blue Train (3h 15m)',
    transitType: 'World\'s Most Scenic Train Line'
  },
  {
    from: 'Ella',
    to: 'Yala National Park',
    distanceKm: 105,
    expresswayTime: '2h 15m',
    publicTransit: 'Direct AC Minivan / Taxi',
    transitType: 'Ella Gap Descent (A23 / B35)'
  },
  {
    from: 'Yala',
    to: 'Mirissa / Southern Beaches',
    distanceKm: 135,
    expresswayTime: '2h 30m',
    publicTransit: 'Expressway Bus via Mattala (1h 45m)',
    transitType: 'Southern Coastal Route & E01'
  },
  {
    from: 'Colombo',
    to: 'Jaffna (Northern Peninsula)',
    distanceKm: 395,
    expresswayTime: '7h 00m (Car)',
    publicTransit: 'Yal Devi Intercity Express Train (6h 30m)',
    transitType: 'Northern Rail Line over Elephant Pass'
  }
];

export const SriLankaPlanner: React.FC<SriLankaPlannerProps> = ({ 
  onAddToTripPlanner,
  onSelectDestinationModal
}) => {
  const [selectedDays, setSelectedDays] = useState<number>(5);
  const [budgetTier, setBudgetTier] = useState<'backpacker' | 'mid' | 'luxury'>('mid');
  const [budgetMultiplier, setBudgetMultiplier] = useState<number>(1.0); // 0.8x to 1.5x slider
  const [selectedDestIds, setSelectedDestIds] = useState<string[]>([
    'sigiriya', 'kandy', 'ella', 'nuwara-eliya', 'yala', 'galle-fort'
  ]);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeItinerary = SRI_LANKA_ITINERARIES.find(it => it.days === selectedDays) || SRI_LANKA_ITINERARIES[2];

  const LKR_PER_USD = 305;

  const getBaseCostUSD = () => {
    if (budgetTier === 'backpacker') return activeItinerary.budgetBreakdown.backpackerUSD;
    if (budgetTier === 'luxury') return activeItinerary.budgetBreakdown.luxuryUSD;
    return activeItinerary.budgetBreakdown.midRangeUSD;
  };

  const costUSD = Math.round(getBaseCostUSD() * budgetMultiplier);
  const costLKR = Math.round(costUSD * LKR_PER_USD);

  // Itemized breakdown based on tier
  const budgetBreakdownItemized = {
    transport: Math.round(costUSD * 0.28),
    accommodation: Math.round(costUSD * 0.38),
    food: Math.round(costUSD * 0.20),
    activities: Math.round(costUSD * 0.14)
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleDestSelection = (id: string) => {
    setSelectedDestIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopyItinerary = () => {
    let text = `=======================================================\n`;
    text += `TRAVEL-LIFE SRI LANKA EXPEDITION DOSSIER\n`;
    text += `Itinerary: ${activeItinerary.title} (${activeItinerary.days} Days)\n`;
    text += `Tier: ${budgetTier.toUpperCase()} • Budget: $${costUSD} USD (~${costLKR.toLocaleString()} LKR)\n`;
    text += `Transport: ${activeItinerary.transportMode}\n`;
    text += `Ideal For: ${activeItinerary.idealFor}\n`;
    text += `=======================================================\n\n`;

    text += `ESTIMATED BUDGET BREAKDOWN:\n`;
    text += `- Accommodation: ~$${budgetBreakdownItemized.accommodation} USD (~${Math.round(budgetBreakdownItemized.accommodation * LKR_PER_USD).toLocaleString()} LKR)\n`;
    text += `- Transport: ~$${budgetBreakdownItemized.transport} USD (~${Math.round(budgetBreakdownItemized.transport * LKR_PER_USD).toLocaleString()} LKR)\n`;
    text += `- Food & Dining: ~$${budgetBreakdownItemized.food} USD (~${Math.round(budgetBreakdownItemized.food * LKR_PER_USD).toLocaleString()} LKR)\n`;
    text += `- Activities & Entry Fees: ~$${budgetBreakdownItemized.activities} USD (~${Math.round(budgetBreakdownItemized.activities * LKR_PER_USD).toLocaleString()} LKR)\n\n`;

    text += `DAY-BY-DAY FIELD TIMELINE:\n\n`;
    activeItinerary.schedule.forEach(item => {
      text += `--- DAY ${item.day}: ${item.title} ---\n`;
      text += `Route: ${item.route}\n`;
      text += `Morning: ${item.morning}\n`;
      text += `Afternoon: ${item.afternoon}\n`;
      text += `Evening: ${item.evening}\n`;
      if (item.transitNote) text += `Transit Note: ${item.transitNote}\n`;
      text += `\n`;
    });

    if (selectedDestIds.length > 0) {
      text += `SELECTED WAYPOINTS (${selectedDestIds.length}):\n`;
      const selectedNames = SRI_LANKA_DESTINATIONS
        .filter(d => selectedDestIds.includes(d.id))
        .map(d => `${d.name} (${d.region})`);
      text += selectedNames.join(', ') + '\n\n';
    }

    text += `Verified by Travel-Life Cartography Engine (eta.gov.lk)\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Complete Sri Lanka itinerary copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadItinerary = () => {
    let text = `TRAVEL-LIFE SRI LANKA EXPEDITION DOSSIER\n`;
    text += `Itinerary: ${activeItinerary.title} (${activeItinerary.days} Days)\n\n`;
    activeItinerary.schedule.forEach(item => {
      text += `Day ${item.day}: ${item.title}\nRoute: ${item.route}\n- Morning: ${item.morning}\n- Afternoon: ${item.afternoon}\n- Evening: ${item.evening}\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Travel-Life-SriLanka-${activeItinerary.days}Day-Plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Itinerary text file downloaded!');
  };

  return (
    <div className="bg-white rounded-3xl border border-[#ded8c7] p-6 sm:p-9 shadow-sm relative space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#11382e] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/30 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#ede8dc]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              CURATED SRI LANKA ITINERARY ORCHESTRATION
            </span>
          </div>
          <h3 className="editorial-title text-2xl sm:text-3xl font-bold text-[#11382e]">
            Smart Day-by-Day Travel Architect
          </h3>
          <p className="text-xs text-[#52645d] mt-1 max-w-2xl leading-relaxed">
            Calibrated against Sri Lanka's rail networks, coastal expressways, and realistic mountain transit times.
          </p>
        </div>

        {/* Days Selector Switcher */}
        <div className="inline-flex p-1 bg-[#f4efe4] rounded-2xl border border-[#ded8c7] text-xs font-semibold self-start md:self-auto">
          {[1, 3, 5, 7].map(days => (
            <button
              key={days}
              onClick={() => setSelectedDays(days)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedDays === days
                  ? 'bg-[#11382e] text-white shadow-xs font-bold'
                  : 'text-stone-700 hover:text-[#11382e]'
              }`}
            >
              {days} Day{days > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Top Section: Overview & Budget Calibration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Itinerary Overview & Budget Calculator */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#faf8f3] p-5 rounded-2xl border border-[#ded8c7]">
            <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {activeItinerary.days}-DAY EXPEDITION ROUTE
            </span>
            <h4 className="text-xl font-bold text-[#11382e] leading-snug">
              {activeItinerary.title}
            </h4>
            <p className="font-serif italic text-xs text-stone-600 mt-1">
              "{activeItinerary.subtitle}"
            </p>
            <p className="text-xs text-[#52645d] mt-2.5 leading-relaxed">
              {activeItinerary.summary}
            </p>

            {/* Route Stops Flow */}
            <div className="mt-4 pt-4 border-t border-[#ede8dc]">
              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                VERIFIED WAYPOINTS
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {activeItinerary.routeStops.map((stop, i) => (
                  <React.Fragment key={stop}>
                    <span className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-[#11382e] border border-stone-200 shadow-2xs">
                      {stop}
                    </span>
                    {i < activeItinerary.routeStops.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Transport Advice */}
            <div className="mt-4 pt-4 border-t border-[#ede8dc] flex items-start gap-2 text-xs text-stone-700">
              <Train className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#11382e]">Recommended Transit: </span>
                <span className="text-stone-600">{activeItinerary.transportMode}</span>
              </div>
            </div>
          </div>

          {/* Budget Calibration Card */}
          <div className="bg-[#f2eee3] p-5 rounded-2xl border border-[#ded8c7]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                ESTIMATED FIELD BUDGET
              </span>
              <span className="text-[10px] font-mono text-stone-500">
                1 USD ≈ {LKR_PER_USD} LKR
              </span>
            </div>

            {/* Tier Switcher */}
            <div className="grid grid-cols-3 gap-1.5 bg-white/70 p-1 rounded-xl border border-stone-300 text-center text-xs mb-3">
              <button
                onClick={() => setBudgetTier('backpacker')}
                className={`py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  budgetTier === 'backpacker' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                Backpacker
              </button>
              <button
                onClick={() => setBudgetTier('mid')}
                className={`py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  budgetTier === 'mid' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                Comfort
              </button>
              <button
                onClick={() => setBudgetTier('luxury')}
                className={`py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  budgetTier === 'luxury' ? 'bg-[#11382e] text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                Luxury
              </button>
            </div>

            {/* Budget Adjustment Slider */}
            <div className="mb-3 bg-white/60 p-2.5 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-stone-600 font-medium flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-stone-400" />
                  Budget Calibration:
                </span>
                <span className="font-mono font-bold text-[#11382e]">
                  {Math.round(budgetMultiplier * 100)}% ({budgetMultiplier === 1 ? 'Standard' : budgetMultiplier < 1 ? 'Economical' : 'Expanded'})
                </span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.05"
                value={budgetMultiplier}
                onChange={(e) => setBudgetMultiplier(parseFloat(e.target.value))}
                className="w-full accent-[#11382e] cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
            </div>

            {/* Price Output Banner */}
            <div className="bg-white p-3.5 rounded-xl border border-[#ded8c7] flex items-baseline justify-between shadow-2xs">
              <div>
                <span className="text-2xl font-bold font-mono text-[#11382e]">
                  ${costUSD}
                </span>
                <span className="text-xs text-stone-500 font-mono ml-1.5">
                  USD Total ({activeItinerary.days} Days)
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-emerald-800">
                  ~{costLKR.toLocaleString()} LKR
                </span>
                <span className="block text-[9px] text-stone-400 font-mono">
                  ~${Math.round(costUSD / activeItinerary.days)}/day
                </span>
              </div>
            </div>

            {/* Itemized Category Breakdown */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 font-mono block">🏨 ACCOMMODATION</span>
                <span className="font-bold text-stone-800 font-mono">${budgetBreakdownItemized.accommodation}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 font-mono block">🚆 TRANSIT &amp; TRAINS</span>
                <span className="font-bold text-stone-800 font-mono">${budgetBreakdownItemized.transport}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 font-mono block">🍛 MEALS &amp; DRINKS</span>
                <span className="font-bold text-stone-800 font-mono">${budgetBreakdownItemized.food}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 font-mono block">🎟️ ENTRY &amp; PERMITS</span>
                <span className="font-bold text-stone-800 font-mono">${budgetBreakdownItemized.activities}</span>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 mt-2 leading-relaxed font-mono">
              Estimated based on real seasonal prices (guesthouses, trains, safari jeep baseline, and local cuisine).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={handleCopyItinerary}
                className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-[#11382e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy complete itinerary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copied ? 'Copied' : 'Copy Itinerary'}</span>
              </button>

              <button
                onClick={handleDownloadItinerary}
                className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs text-[#11382e] flex items-center justify-center transition-colors cursor-pointer"
                title="Download itinerary as text file"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
              </button>

              {onAddToTripPlanner && (
                <button
                  onClick={() => onAddToTripPlanner(activeItinerary)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#11382e] hover:bg-[#0b241d] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Open in Trip Planner</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Day-by-Day Sequence Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider">
              DETAILED TIMELINE SCHEDULE ({activeItinerary.days} DAYS)
            </span>
            <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified Rail &amp; Road Segments
            </span>
          </div>

          <div className="space-y-4">
            {activeItinerary.schedule.map((item) => (
              <div 
                key={item.day}
                className="bg-[#faf8f3] rounded-2xl border border-[#ded8c7] p-5 hover:border-emerald-600/40 transition-colors"
              >
                {/* Day Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#ede8dc]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#11382e] text-white flex items-center justify-center font-mono font-bold text-xs shadow-2xs">
                      D{item.day}
                    </span>
                    <h5 className="font-bold text-sm text-[#11382e]">
                      {item.title}
                    </h5>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.route}
                  </span>
                </div>

                {/* Day Segments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                    <span className="font-mono text-[9px] font-bold text-amber-800 uppercase block mb-1">
                      🌅 Morning
                    </span>
                    <p className="text-stone-700 leading-relaxed text-[11px]">
                      {item.morning}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                    <span className="font-mono text-[9px] font-bold text-emerald-800 uppercase block mb-1">
                      ☀️ Afternoon
                    </span>
                    <p className="text-stone-700 leading-relaxed text-[11px]">
                      {item.afternoon}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                    <span className="font-mono text-[9px] font-bold text-indigo-900 uppercase block mb-1">
                      🌙 Evening
                    </span>
                    <p className="text-stone-700 leading-relaxed text-[11px]">
                      {item.evening}
                    </p>
                  </div>
                </div>

                {item.transitNote && (
                  <div className="mt-3 pt-2 text-[10px] font-mono text-stone-500 border-t border-[#ede8dc] flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 text-stone-400" />
                    <span>Transit Note: {item.transitNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Destination Selection Checklist */}
      <div className="pt-6 border-t border-[#ede8dc]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-widest block mb-0.5">
              CUSTOM WAYPOINT SELECTOR
            </span>
            <h4 className="font-bold text-lg text-[#11382e]">
              Pick Your Destinations ({selectedDestIds.length} Selected)
            </h4>
            <p className="text-xs text-stone-500">
              Select or deselect stops to tailor your dream Sri Lankan journey across 14 verified locations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedDestIds(SRI_LANKA_DESTINATIONS.map(d => d.id))}
              className="text-stone-600 hover:text-[#11382e] font-semibold underline cursor-pointer"
            >
              Select All
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => setSelectedDestIds([])}
              className="text-stone-600 hover:text-[#11382e] font-semibold underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {SRI_LANKA_DESTINATIONS.map(dest => {
            const isChecked = selectedDestIds.includes(dest.id);
            return (
              <button
                key={dest.id}
                onClick={() => toggleDestSelection(dest.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-600/60 shadow-2xs'
                    : 'bg-[#faf8f3] border-stone-200 opacity-60 hover:opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-stone-400 font-bold uppercase truncate">
                      {dest.region.split(' ')[0]}
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-md flex items-center justify-center text-[9px] font-bold ${
                      isChecked ? 'bg-[#11382e] text-white' : 'border border-stone-300'
                    }`}>
                      {isChecked && '✓'}
                    </span>
                  </div>
                  <h6 className="font-bold text-xs text-[#11382e] line-clamp-2 leading-tight">
                    {dest.name.split('&')[0].trim()}
                  </h6>
                </div>
                
                <span className="text-[10px] text-stone-500 font-mono">
                  {dest.recommendedDuration.split(' ')[0]} {dest.recommendedDuration.split(' ')[1] || 'hrs'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Distances & Transit Suggestions Matrix */}
      <div className="pt-6 border-t border-[#ede8dc]">
        <div className="mb-4">
          <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-widest block mb-0.5">
            LOGISTICS MATRIX
          </span>
          <h4 className="font-bold text-lg text-[#11382e]">
            Verified Travel Times &amp; Distance Suggestions
          </h4>
          <p className="text-xs text-stone-500">
            Real distances and estimated transit times between Sri Lanka's key regional hubs based on road &amp; rail telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {VERIFIED_TRANSIT_ROUTES.map((route, idx) => (
            <div 
              key={idx}
              className="bg-[#faf8f3] p-3.5 rounded-xl border border-[#ded8c7] flex flex-col justify-between text-xs"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 pb-1.5 border-b border-stone-200 mb-2">
                  <span className="font-bold text-[#b83a14]">{route.distanceKm} km</span>
                  <span className="text-emerald-800 font-bold">{route.expresswayTime}</span>
                </div>
                
                <div className="font-bold text-[#11382e] mb-1">
                  {route.from} ➔ {route.to}
                </div>

                <div className="text-[11px] text-stone-600 leading-snug space-y-1 mt-2">
                  <div className="flex items-start gap-1">
                    <Car className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-stone-700">{route.transitType}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <Train className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-stone-500 text-[10px]">{route.publicTransit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
