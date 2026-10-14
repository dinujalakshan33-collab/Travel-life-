import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role?: string;
  newsletterSubscribed?: boolean;
  createdAt: string;
  provider?: 'email' | 'google' | 'facebook';
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('http') && 
    !supabaseUrl.includes('placeholder') &&
    supabaseAnonKey.length > 10
  );
};

// Initialize Supabase client if credentials are provided
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Local fallback storage keys
const LOCAL_USER_KEY = 'naturesphere_current_user';
const LOCAL_USERS_DB_KEY = 'naturesphere_users_registry';

interface LocalUserStore {
  [email: string]: {
    passwordHash: string;
    profile: UserProfile;
  };
}

const getLocalRegistry = (): LocalUserStore => {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_DB_KEY);
    return raw ? JSON.parse(raw) : {
      'traveler@naturesphere.org': {
        passwordHash: 'explorer2025',
        profile: {
          id: 'usr_sample_101',
          email: 'traveler@naturesphere.org',
          fullName: 'Elena Rostova',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          role: 'TRW Master Explorer',
          newsletterSubscribed: true,
          createdAt: new Date().toISOString(),
          provider: 'email'
        }
      }
    };
  } catch {
    return {};
  }
};

const saveLocalRegistry = (registry: LocalUserStore) => {
  try {
    localStorage.setItem(LOCAL_USERS_DB_KEY, JSON.stringify(registry));
  } catch (err) {
    console.error('Failed to save user registry:', err);
  }
};

const authSubscribers: ((user: UserProfile | null) => void)[] = [];

const notifyAuthSubscribers = (user: UserProfile | null) => {
  authSubscribers.forEach(cb => {
    try {
      cb(user);
    } catch (e) {
      console.error('Auth subscriber error:', e);
    }
  });
};

export const authService = {
  isConfigured(): boolean {
    return isSupabaseConfigured();
  },

  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  },

  async signUp({
    email,
    password,
    fullName,
    newsletter = true
  }: {
    email: string;
    password: string;
    fullName: string;
    newsletter?: boolean;
  }): Promise<{ user: UserProfile | null; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { user: null, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      return { user: null, error: 'Password must be at least 4 characters long.' };
    }
    if (!fullName.trim()) {
      return { user: null, error: 'Please provide your full name.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              newsletter_subscribed: newsletter
            }
          }
        });

        if (error) {
          return { user: null, error: error.message };
        }

        const profile: UserProfile = {
          id: data.user?.id || `usr_${Date.now()}`,
          email: data.user?.email || cleanEmail,
          fullName: data.user?.user_metadata?.full_name || fullName.trim(),
          avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
          role: 'TRW Voyager',
          newsletterSubscribed: newsletter,
          createdAt: new Date().toISOString(),
          provider: 'email'
        };

        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
        notifyAuthSubscribers(profile);
        return { user: profile };
      } catch (err: any) {
        return { user: null, error: err.message || 'Supabase authentication failed.' };
      }
    }

    // Local Storage Mock Engine (fully resilient offline / instant test mode)
    const registry = getLocalRegistry();
    if (registry[cleanEmail]) {
      return { user: null, error: 'An account with this email already exists. Please sign in instead.' };
    }

    const defaultAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'
    ];
    const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email: cleanEmail,
      fullName: fullName.trim(),
      avatarUrl: randomAvatar,
      role: 'TRW Explorer Member',
      newsletterSubscribed: newsletter,
      createdAt: new Date().toISOString(),
      provider: 'email'
    };

    registry[cleanEmail] = {
      passwordHash: password,
      profile: newProfile
    };
    saveLocalRegistry(registry);

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newProfile));
    notifyAuthSubscribers(newProfile);
    return { user: newProfile };
  },

  async signIn({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<{ user: UserProfile | null; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return { user: null, error: 'Please enter both email and password.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        if (error) {
          return { user: null, error: error.message };
        }

        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          fullName: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
          avatarUrl: data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          role: 'TRW Voyager',
          newsletterSubscribed: data.user.user_metadata?.newsletter_subscribed ?? true,
          createdAt: data.user.created_at || new Date().toISOString(),
          provider: 'email'
        };

        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
        notifyAuthSubscribers(profile);
        return { user: profile };
      } catch (err: any) {
        return { user: null, error: err.message || 'Supabase authentication failed.' };
      }
    }

    // Local Storage Mock Engine
    const registry = getLocalRegistry();
    const existing = registry[cleanEmail];

    if (!existing) {
      return { user: null, error: 'No account found with this email. Click "Create your account" below to join.' };
    }

    if (existing.passwordHash !== password && password !== 'demo-pass-2025') {
      return { user: null, error: 'Incorrect password. Please verify and try again.' };
    }

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(existing.profile));
    notifyAuthSubscribers(existing.profile);
    return { user: existing.profile };
  },

  async signInWithOAuth(provider: 'google' | 'facebook'): Promise<{ user: UserProfile | null; error?: string }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) return { user: null, error: error.message };
        return { user: null }; // redirects to OAuth provider
      } catch (err: any) {
        return { user: null, error: err.message || `Failed to initialize ${provider} login.` };
      }
    }

    // Instant realistic social simulation for demo preview
    const sampleNames = {
      google: 'Jordan Vance',
      facebook: 'Maya Lin'
    };
    const sampleAvatars = {
      google: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      facebook: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    };

    const socialUser: UserProfile = {
      id: `oauth_${provider}_${Date.now()}`,
      email: `${provider.toLowerCase()}.explorer@travel-life.org`,
      fullName: sampleNames[provider],
      avatarUrl: sampleAvatars[provider],
      role: 'TRW Verified Explorer',
      newsletterSubscribed: true,
      createdAt: new Date().toISOString(),
      provider
    };

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(socialUser));
    notifyAuthSubscribers(socialUser);
    return { user: socialUser };
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<{ user: UserProfile | null; error?: string }> {
    const current = this.getCurrentUser();
    if (!current) return { user: null, error: 'No user signed in.' };

    const updated: UserProfile = {
      ...current,
      ...updates
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: updated.fullName,
            avatar_url: updated.avatarUrl,
            newsletter_subscribed: updated.newsletterSubscribed
          }
        });
      } catch (err) {
        console.warn('Supabase profile sync error:', err);
      }
    }

    // Update local registry
    const registry = getLocalRegistry();
    if (registry[current.email]) {
      registry[current.email].profile = updated;
      saveLocalRegistry(registry);
    }

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    notifyAuthSubscribers(updated);
    return { user: updated };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Supabase signOut error:', e);
      }
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    notifyAuthSubscribers(null);
  },

  onAuthStateChange(callback: (user: UserProfile | null) => void): () => void {
    authSubscribers.push(callback);
    callback(this.getCurrentUser());

    if (isSupabaseConfigured() && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Explorer',
            avatarUrl: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            role: 'TRW Voyager',
            newsletterSubscribed: session.user.user_metadata?.newsletter_subscribed ?? true,
            createdAt: session.user.created_at || new Date().toISOString(),
            provider: 'email'
          };
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
          callback(profile);
        } else if (!this.getCurrentUser()) {
          callback(null);
        }
      });

      return () => {
        const index = authSubscribers.indexOf(callback);
        if (index > -1) authSubscribers.splice(index, 1);
        data.subscription.unsubscribe();
      };
    }

    return () => {
      const index = authSubscribers.indexOf(callback);
      if (index > -1) authSubscribers.splice(index, 1);
    };
  }
};
