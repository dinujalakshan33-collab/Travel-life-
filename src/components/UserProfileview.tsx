// src/components/UserProfileView.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { DESTINATIONS } from "../data/travelData";
import { User, Mail, ShieldCheck, Heart, LogOut, MapPin, Calendar } from "lucide-react";

interface Props {
  onBackToExplore: () => void;
  onOpenDest: (destId: string) => void;
}

export const UserProfileView: React.FC<Props> = ({ onBackToExplore, onOpenDest }) => {
  const { user, logoutUser, toggleSaveDestination } = useAuth();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800">You are not signed in.</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">Please log in to view your travel profile and wishlists.</p>
        <button
          onClick={onBackToExplore}
          className="px-6 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  const savedList = DESTINATIONS.filter((d) => user.savedDestinationIds.includes(d.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name}</h2>
              {user.emailVerified && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logoutUser}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500" />
            <span>Sign Out</span>
          </button>
          <button
            onClick={onBackToExplore}
            className="px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Explore More
          </button>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span>Saved Journeys & Wishlist</span>
            </h3>
            <p className="text-xs text-slate-500">Destinations bookmarked for your upcoming adventures.</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {savedList.length} Saved
          </span>
        </div>

        {savedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Your wishlist is currently empty.</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">Click the heart icon on any destination to save it here.</p>
            <button
              onClick={onBackToExplore}
              className="px-4 py-2 bg-emerald-900 text-white rounded-xl text-xs font-bold"
            >
              Browse Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44">
                    <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleSaveDestination(d.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-white"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-rose-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-900 text-base">{d.title}</h4>
                      <span className="text-xs text-slate-400">{d.country}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{d.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900">${d.estimatedDailyUSD} USD / day</span>
                  <button
                    onClick={() => onOpenDest(d.id)}
                    className="font-bold text-emerald-800 hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
