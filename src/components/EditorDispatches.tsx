import React from 'react';
import { EDITORIAL_ARTICLES } from '../data/travelData';
import { EditorialArticle } from '../types/travel';
import { ArrowRight, BookOpen } from 'lucide-react';

interface EditorDispatchesProps {
  onSelectArticle: (article: EditorialArticle) => void;
  onViewAllDispatches: () => void;
}

export const EditorDispatches: React.FC<EditorDispatchesProps> = ({
  onSelectArticle,
  onViewAllDispatches
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#eae5d8]">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="block font-mono text-[10px] font-bold tracking-widest text-[#b83a14] uppercase mb-1.5">
            CURATED DISPATCHES
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#11382e] font-semibold tracking-tight">
            Where to Go in 2025: Editor's Picks
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#465b53] max-w-xl">
            Deep dives into slow travel, regenerative routes, and under-the-radar cultural corridors.
          </p>
        </div>

        <button
          onClick={onViewAllDispatches}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#11382e] hover:text-[#092920] hover:underline cursor-pointer group"
        >
          <span>View All Editorial Dispatches</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 3 Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDITORIAL_ARTICLES.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white rounded-2xl overflow-hidden border border-[#ded8c7] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Image & Category Pill */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded border border-white/20 uppercase">
                    {article.badge}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5">
                <div className="text-[11px] font-mono text-stone-500 mb-2">
                  {article.author} • {article.readTime}
                </div>

                <h3 className="editorial-title text-xl font-bold text-[#11382e] leading-snug group-hover:text-[#0d3b30] transition-colors mb-2.5">
                  {article.title}
                </h3>

                <p className="text-xs text-[#52645d] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Bottom seasonal window */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-[#ede8dc] flex items-center justify-between text-xs text-[#b83a14] font-medium font-mono text-[11px]">
                <span>{article.seasonalWindow}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
