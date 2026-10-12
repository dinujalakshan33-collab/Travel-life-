import React from 'react';
import { Destination, Currency } from '../types/travel';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDestinations: Destination[];
  onRemove: (id: string) => void;
  onSelect: (dest: Destination) => void;
  currency: Currency;
  onStartPlanning: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedDestinations,
  onRemove,
  onSelect,
  currency,
  onStartPlanning
}) => {
  if (!isOpen) return null;

  const rates: Record<Currency, { rate: number; sym: string }> = {
    USD: { rate: 1, sym: '$' },
    EUR: { rate: 0.92, sym: '€' },
    GBP: { rate: 0.79, sym: '£' },
    JPY: { rate: 154, sym: '¥' },
    AUD: { rate: 1.52, sym: 'A$' }
  };
  const c = rates[currency] || rates.USD;
  const rate = c.rate;
  const symbol = c.sym;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ded8c7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ded8c7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#114b3e] fill-current" />
            <h3 className="editorial-title text-xl font-bold text-[#11382e]">
              Saved Expeditions ({savedDestinations.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {savedDestinations.length === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <Bookmark className="w-8 h-8 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-semibold text-stone-700">No saved destinations yet</p>
              <p className="text-xs text-stone-400 mt-1">
                Click the bookmark icon on any destination card to assemble your personal wishlist.
              </p>
            </div>
          ) : (
            savedDestinations.map(dest => (
              <div
                key={dest.id}
                className="p-3 rounded-xl border border-stone-200 hover:border-[#114b3e]/40 transition-all flex items-center gap-3 bg-[#faf9f5]"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelect(dest);
                    onClose();
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onSelect(dest);
                      onClose();
                    }}
                    className="text-xs font-bold text-stone-900 truncate hover:text-[#114b3e] cursor-pointer"
                  >
                    {dest.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    {symbol}{Math.round(dest.dailyCostUSD * rate)}/day • {dest.duration}
                  </p>
                  <span className="inline-block mt-1 text-[9px] font-mono text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    {dest.badge}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(dest.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedDestinations.length > 0 && (
          <div className="p-5 border-t border-[#ded8c7] space-y-2">
            <button
              onClick={() => {
                onClose();
                onStartPlanning();
              }}
              className="w-full bg-[#103e33] text-white py-3 rounded-xl font-medium text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-[#0b2f26] transition-colors shadow-xs"
            >
              <span>Build Itinerary From Saved ({savedDestinations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
