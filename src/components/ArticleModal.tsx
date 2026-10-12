import React from 'react';
import { EditorialArticle } from '../types/travel';
import { X, Calendar, User, Clock, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

interface ArticleModalProps {
  article: EditorialArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#ded8c7] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo */}
        <div className="relative h-64 sm:h-72 bg-stone-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer border border-white/20 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-md border border-white/20 uppercase">
              {article.badge}
            </span>
          </div>

          {/* Article Title on Cover */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-3 text-xs text-stone-300 font-mono mb-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                {article.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {article.readTime}
              </span>
            </div>

            <h2 className="editorial-title text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Seasonal Window Alert */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs text-amber-900 font-mono">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span className="font-bold">{article.seasonalWindow}</span>
            </div>
            <span className="text-[11px] text-amber-700 uppercase tracking-wider">Field Recommendation</span>
          </div>

          {/* Summary Lead */}
          <p className="text-base text-stone-800 font-serif leading-relaxed italic border-l-2 border-[#114b3e] pl-4 py-1">
            "{article.summary}"
          </p>

          {/* Paragraphs */}
          <div className="space-y-4 text-sm text-stone-700 leading-relaxed font-sans">
            {article.fullContent?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && (
            <div className="p-5 bg-[#faf8f2] rounded-2xl border border-[#ded8c7] space-y-3">
              <h4 className="font-mono text-[11px] font-bold text-[#b83a14] uppercase tracking-wider">
                ESSENTIAL FIELD PROTOCOLS
              </h4>
              <ul className="space-y-2 text-xs text-stone-800">
                {article.keyTakeaways.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#ede8dc] flex items-center justify-between">
            <span className="text-xs text-stone-600 font-mono">
              GlobeTrek Curated Field Dispatch #2025-08
            </span>
            <button
              onClick={onClose}
              className="bg-[#103e33] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#0b2f26] transition-colors"
            >
              Close Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
