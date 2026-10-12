import React, { useState } from 'react';
import { ItineraryItem, Currency } from '../types/travel';
import { CURRENCY_RATES } from '../data/travelData';
import { 
  ArrowLeft, Plus, Trash2, Clock, DollarSign, Calendar, 
  Download, Share2, CheckCircle2, GripVertical, Luggage, MapPin, Sparkles, FileText
} from 'lucide-react';

interface TripPlannerViewProps {
  items: ItineraryItem[];
  setItems: React.Dispatch<React.SetStateAction<ItineraryItem[]>>;
  onBack: () => void;
  currency: Currency;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  items,
  setItems,
  onBack,
  currency
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'schedule' | 'budget' | 'packing'>('schedule');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // New item form
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newDuration, setNewDuration] = useState('2.0 hrs');
  const [newCost, setNewCost] = useState('0');
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState<'sightseeing' | 'food' | 'activity' | 'transit'>('sightseeing');

  // Packing checklist state
  const [packingList, setPackingList] = useState([
    { id: 'p1', item: 'Passport & International Driving Permit (valid > 6 mos)', packed: true },
    { id: 'p2', item: 'Universal multi-pin plug adapter & 65W GaN charger', packed: true },
    { id: 'p3', item: 'Offline OpenStreetMap cached regional tiles', packed: true },
    { id: 'p4', item: '28,000mm hydrostatic head waterproof technical shell', packed: false },
    { id: 'p5', item: 'Merino wool base layers & trail walking boots', packed: false },
    { id: 'p6', item: 'Microfiber travel towel & reusable filtered water flask', packed: false }
  ]);

  const togglePacked = (id: string) => {
    setPackingList(prev => prev.map(p => p.id === id ? { ...p, packed: !p.packed } : p));
  };

  const rate = CURRENCY_RATES[currency]?.rate || 1.0;
  const symbol = CURRENCY_RATES[currency]?.symbol || '$';

  const formatPrice = (usd: number) => {
    return `${symbol}${Math.round(usd * rate)}`;
  };

  const days = Array.from(new Set(items.map(i => i.day))).sort((a, b) => a - b);
  const dayItems = items.filter(i => i.day === selectedDay);

  const totalCostDay = dayItems.reduce((sum, item) => sum + item.costUSD, 0);
  const totalCostAll = items.reduce((sum, item) => sum + item.costUSD, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ItineraryItem = {
      id: `custom-${Date.now()}`,
      day: selectedDay,
      time: newTime,
      title: newTitle,
      duration: newDuration,
      costUSD: parseFloat(newCost) || 0,
      note: newNote,
      category: newCategory
    };

    setItems(prev => [...prev, newItem]);
    setNewTitle('');
    setNewNote('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const currentDayItems = [...dayItems];
    const temp = currentDayItems[index - 1];
    currentDayItems[index - 1] = currentDayItems[index];
    currentDayItems[index] = temp;

    const otherItems = items.filter(i => i.day !== selectedDay);
    setItems([...otherItems, ...currentDayItems]);
  };

  const handleExportMarkdown = () => {
    let md = `# Travel-Life Engineered Itinerary\n\nGenerated on: ${new Date().toLocaleDateString()}\nTotal Estimated Cost: ${formatPrice(totalCostAll)}\n\n`;
    days.forEach(d => {
      md += `## Day ${d}\n`;
      items.filter(i => i.day === d).forEach(item => {
        md += `- **${item.time}**: ${item.title} (${item.duration}) - ${formatPrice(item.costUSD)}\n  *${item.note || ''}*\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Travel-Life_Itinerary_Day${selectedDay}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] pb-20">
      {/* Top Planner Bar */}
      <div className="bg-white border-b border-[#ded8c7] px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
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
                <span className="w-2 h-2 rounded-full bg-[#b83a14]"></span>
                <h1 className="editorial-title text-xl sm:text-2xl font-bold text-[#11382e]">
                  Intelligent Day–by–Day Trip Architect
                </h1>
              </div>
              <p className="text-[11px] text-stone-600 font-mono">
                Dynamic sequencing • Buffer-time calibration • Live cost aggregation
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="bg-[#103e33] hover:bg-[#0b2f26] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export (.MD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs (Schedule vs Budget vs Packing) */}
        <div className="flex items-center justify-between border-b border-[#ded8c7] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-[#114b3e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#ede8dc]'
              }`}
            >
              Day-by-Day Schedule
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'budget'
                  ? 'bg-[#114b3e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#ede8dc]'
              }`}
            >
              Budget Analytics ({formatPrice(totalCostAll)})
            </button>

            <button
              onClick={() => setActiveTab('packing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'packing'
                  ? 'bg-[#114b3e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#ede8dc]'
              }`}
            >
              Field Packing List
            </button>
          </div>

          {/* Add Activity Button */}
          {activeTab === 'schedule' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#b83a14] hover:bg-[#9e3110] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Waypoint</span>
            </button>
          )}
        </div>

        {/* Tab 1: Schedule View */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Days Selector */}
            <div className="lg:col-span-3 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-stone-500 tracking-wider block mb-2">
                EXPEDITION TIMELINE
              </span>
              {days.map(d => {
                const count = items.filter(i => i.day === d).length;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedDay === d
                        ? 'bg-white border-[#114b3e] shadow-sm ring-1 ring-[#114b3e]'
                        : 'bg-white/60 border-stone-200 hover:bg-white text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-[#11382e]">Day {d}</div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">{count} waypoints scheduled</div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#114b3e] bg-emerald-50 px-2 py-1 rounded">
                      {formatPrice(items.filter(i => i.day === d).reduce((s, it) => s + it.costUSD, 0))}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  const nextDay = (days[days.length - 1] || 0) + 1;
                  setItems(prev => [...prev, {
                    id: `item-${Date.now()}`,
                    day: nextDay,
                    time: '09:00 AM',
                    title: `Day ${nextDay} Exploration Kickoff`,
                    duration: '2.0 hrs',
                    costUSD: 0,
                    note: 'Free morning walk',
                    category: 'sightseeing'
                  }]);
                  setSelectedDay(nextDay);
                }}
                className="w-full p-3 rounded-xl border border-dashed border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day {((days[days.length - 1] || 0) + 1)}</span>
              </button>
            </div>

            {/* Right: Items List */}
            <div className="lg:col-span-9 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ded8c7] shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="editorial-title text-2xl font-bold text-[#11382e]">
                    Day {selectedDay} Schedule
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    Auto-sequenced with buffer times between attractions
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">Est. Day Total</span>
                  <span className="font-mono text-xl font-bold text-[#114b3e]">{formatPrice(totalCostDay)}</span>
                </div>
              </div>

              {/* Waypoint List */}
              <div className="space-y-3">
                {dayItems.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
                    No waypoints scheduled for Day {selectedDay} yet. Click "Add Waypoint" above to build your day.
                  </div>
                ) : (
                  dayItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-xl border border-[#ede8dc] shadow-2xs hover:border-[#114b3e]/40 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        {/* Time Pill */}
                        <div className="w-20 pt-1 shrink-0">
                          <span className="font-mono text-xs font-bold text-[#114b3e] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block text-center">
                            {item.time}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#114b3e] transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1 font-mono">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-stone-400" />
                              {item.duration}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-stone-800">
                              {formatPrice(item.costUSD)}
                            </span>
                            {item.note && (
                              <>
                                <span>•</span>
                                <span className="text-stone-600 font-sans">{item.note}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0 pt-1">
                        {idx > 0 && (
                          <button
                            onClick={() => handleMoveUp(idx)}
                            className="p-1 text-stone-400 hover:text-stone-700 text-xs rounded hover:bg-stone-100"
                            title="Move Up"
                          >
                            ↑
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                          title="Delete waypoint"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Budget Breakdown View */}
        {activeTab === 'budget' && (
          <div className="bg-white p-8 rounded-2xl border border-[#ded8c7] shadow-xs max-w-4xl mx-auto space-y-8">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-wider block mb-1">
                EMPIRICAL EXPENDITURE AUDIT
              </span>
              <h3 className="editorial-title text-3xl font-bold text-[#11382e]">
                Trip Budget Aggregation: {formatPrice(totalCostAll)}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Calibrated against municipal entrance tariffs, gastronomy indices, and regional transit fares.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#faf8f2] rounded-xl border border-stone-200">
                <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Total Days</span>
                <span className="text-2xl font-bold text-[#11382e]">{days.length} Days</span>
              </div>
              <div className="p-4 bg-[#faf8f2] rounded-xl border border-stone-200">
                <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Avg / Day</span>
                <span className="text-2xl font-bold text-[#11382e]">{formatPrice(totalCostAll / Math.max(days.length, 1))}</span>
              </div>
              <div className="p-4 bg-[#faf8f2] rounded-xl border border-stone-200">
                <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Waypoints</span>
                <span className="text-2xl font-bold text-[#11382e]">{items.length} Activities</span>
              </div>
              <div className="p-4 bg-[#faf8f2] rounded-xl border border-stone-200">
                <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Currency Mode</span>
                <span className="text-2xl font-bold text-[#11382e] font-mono">{currency}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h4 className="font-mono text-xs font-bold text-stone-700 uppercase">
                Day-by-Day Cost Distribution
              </h4>
              {days.map(d => {
                const sub = items.filter(i => i.day === d).reduce((s, it) => s + it.costUSD, 0);
                const pct = totalCostAll > 0 ? (sub / totalCostAll) * 100 : 0;
                return (
                  <div key={d} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800">Day {d}</span>
                      <span className="font-mono font-bold text-[#11382e]">{formatPrice(sub)} ({Math.round(pct)}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#114b3e] rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Packing List View */}
        {activeTab === 'packing' && (
          <div className="bg-white p-8 rounded-2xl border border-[#ded8c7] shadow-xs max-w-3xl mx-auto space-y-6">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#b83a14] uppercase tracking-wider block mb-1">
                FIELD GEAR AUDIT
              </span>
              <h3 className="editorial-title text-3xl font-bold text-[#11382e]">
                Pre-Departure Field Packing Checklist
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Tailored for sustainable cross-continental travel, off-grid navigation, and unpredictable climate buffers.
              </p>
            </div>

            <div className="space-y-2.5">
              {packingList.map(item => (
                <div
                  key={item.id}
                  onClick={() => togglePacked(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    item.packed
                      ? 'bg-emerald-50/70 border-emerald-200 text-stone-500 line-through'
                      : 'bg-[#faf8f2] border-stone-200 text-stone-900 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs font-medium">{item.item}</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    item.packed ? 'bg-[#114b3e] border-[#114b3e] text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {item.packed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Waypoint Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-stone-200 shadow-2xl animate-in zoom-in-95">
            <h3 className="editorial-title text-xl font-bold text-[#11382e] mb-4">
              Add Field Waypoint (Day {selectedDay})
            </h3>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Philosopher's Path Morning Stroll"
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#114b3e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="2.0 hrs"
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                    Est. Cost (USD)
                  </label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={e => setNewCost(e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  >
                    <option value="sightseeing">Sightseeing</option>
                    <option value="food">Gastronomy</option>
                    <option value="activity">Trek / Excursion</option>
                    <option value="transit">Rail / Transit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-stone-500 uppercase mb-1">
                  Field Notes / Advice
                </label>
                <input
                  type="text"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="e.g. Wear sturdy trail boots, free entrance"
                  className="w-full p-2.5 rounded-lg border border-stone-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#114b3e] text-white font-semibold hover:bg-[#0b332a]"
                >
                  Add to Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
