import React, { useState } from 'react';
import { 
  X, User, Mail, Shield, Bookmark, Calendar, Settings, 
  LogOut, CheckCircle, Database, Sparkles, ExternalLink, Camera 
} from 'lucide-react';
import { UserProfile, authService } from '../services/supabase';
import { Destination } from '../types/travel';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  savedDestinations: Destination[];
  onOpenSavedDrawer: () => void;
  onOpenTripPlanner: () => void;
  onSelectDestination: (dest: Destination) => void;
  onUserUpdate: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  savedDestinations,
  onOpenSavedDrawer,
  onOpenTripPlanner,
  onSelectDestination,
  onUserUpdate,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'integrations'>('profile');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [newsletter, setNewsletter] = useState(user?.newsletterSubscribed ?? true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if user changes
  React.useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setAvatarUrl(user.avatarUrl || '');
      setNewsletter(user.newsletterSubscribed ?? true);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    const res = await authService.updateProfile({
      fullName,
      avatarUrl,
      newsletterSubscribed: newsletter
    });

    if (res.user) {
      onUserUpdate(res.user);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
    setSaving(false);
  };

  const isSupabaseActive = authService.isConfigured();

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#fcfbf7] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full border border-stone-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#11382e] via-[#164e3f] to-[#1a5a4a] text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative group">
              <img
                src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user.fullName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {user.fullName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  {user.role || 'TRW Explorer'}
                </span>
              </div>
              <p className="text-xs text-stone-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{user.email}</span>
                {user.provider && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded uppercase font-mono ml-1">
                    {user.provider}
                  </span>
                )}
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </p>
            </div>

            <button
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="mt-2 sm:mt-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-600/80 hover:text-white text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-center sm:self-start"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/15 text-center">
            <button 
              onClick={() => { onClose(); onOpenSavedDrawer(); }} 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left sm:text-center cursor-pointer"
            >
              <span className="block text-lg font-bold text-emerald-300">{savedDestinations.length}</span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Saved Spots</span>
            </button>
            <button 
              onClick={() => { onClose(); onOpenTripPlanner(); }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left sm:text-center cursor-pointer"
            >
              <span className="block text-lg font-bold text-amber-300">Active</span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Trip Plan</span>
            </button>
            <div className="p-2 rounded-xl bg-white/5 text-left sm:text-center">
              <span className="block text-lg font-bold text-blue-300">
                {isSupabaseActive ? 'Cloud' : 'Local'}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Sync Engine</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#114b3e] text-[#114b3e]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile & Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'border-[#114b3e] text-[#114b3e]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Places ({savedDestinations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'integrations'
                ? 'border-[#114b3e] text-[#114b3e]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Cloud Integration</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#114b3e] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#114b3e] bg-white"
                />
                
                {/* Preset Avatars */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-stone-500">Pick preset:</span>
                  <div className="flex gap-1.5">
                    {presetAvatars.map((url, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setAvatarUrl(url)}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          avatarUrl === url ? 'border-[#114b3e] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Account Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm bg-stone-100 cursor-not-allowed"
                />
                <p className="text-[10px] text-stone-400 mt-1">Verified with TRW Identity Registry</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-stone-800">Weekly Field Dispatch Newsletter</p>
                  <p className="text-[11px] text-stone-500">Curated unscripted trails & seasonal logistics</p>
                </div>
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 rounded text-[#114b3e] focus:ring-[#114b3e] cursor-pointer"
                />
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#114b3e] hover:bg-[#0c362c] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  {saving ? 'Saving changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'saved' && (
            <div>
              {savedDestinations.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">No saved destinations yet</p>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Browse the world map or destinations grid and tap the bookmark icon to save places to your profile.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedDestinations.map(dest => (
                    <div 
                      key={dest.id}
                      onClick={() => {
                        onClose();
                        onSelectDestination(dest);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 transition-all cursor-pointer group shadow-2xs"
                    >
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name} 
                        className="w-16 h-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-[#114b3e]">
                          {dest.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate">{dest.country} • {dest.category}</p>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          ★ {dest.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border ${
                isSupabaseActive 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-amber-50/70 border-amber-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl text-white ${
                    isSupabaseActive ? 'bg-emerald-700' : 'bg-amber-700'
                  }`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {isSupabaseActive ? 'Supabase Connected' : 'Supabase Ready (Preview Mode Active)'}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {isSupabaseActive 
                        ? 'Your application is connected directly to your Supabase project. Accounts and sessions are verified using PostgreSQL and Supabase Auth.'
                        : 'The app currently uses a persistent local auth engine that supports user signup, login, avatar updates, and session state. To connect to your real remote Supabase project, provide the following environment variables:'}
                    </p>
                  </div>
                </div>

                {!isSupabaseActive && (
                  <div className="mt-4 p-3 rounded-xl bg-stone-900 text-stone-200 font-mono text-[11px] space-y-1">
                    <p><span className="text-emerald-400">VITE_SUPABASE_URL</span>=https://your-project.supabase.co</p>
                    <p><span className="text-emerald-400">VITE_SUPABASE_ANON_KEY</span>=eyJhbGciOiJIUzI1NiIsInR5cCI6...</p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Features Enabled</h5>
                <ul className="text-xs text-stone-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>User Signup & Login with password encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Social Login simulation (Google & Facebook)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom Profile Management & Avatar Selector</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Itinerary and Bookmark state linked to Explorer profile</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
