export interface AuthUser {
  email: string;
  role: 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
}

const TOKEN_KEY = 'travel_life_admin_jwt';

export const authApi = {
  getStoredToken(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setStoredToken(token: string) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  clearStoredToken() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {}
  },

  getAuthHeaders(): HeadersInit {
    const token = this.getStoredToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  /**
   * Check current session with the server
   */
  async checkSession(): Promise<{ authenticated: boolean; user?: AuthUser }> {
    try {
      const res = await fetch('/api/auth/me', {
        headers: this.getAuthHeaders(),
        credentials: 'same-origin'
      });
      if (!res.ok) {
        return { authenticated: false };
      }
      const data = await res.json();
      return {
        authenticated: Boolean(data.authenticated),
        user: data.user
      };
    } catch (err) {
      return { authenticated: false };
    }
  },

  /**
   * Private Administrator Login
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string; remainingSeconds?: number; attemptsLeft?: number }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Authentication failed',
          remainingSeconds: data.remainingSeconds,
          attemptsLeft: data.attemptsLeft
        };
      }

      if (data.token) {
        this.setStoredToken(data.token);
      }

      return {
        success: true,
        user: data.user
      };
    } catch (err) {
      return {
        success: false,
        error: 'Network error or server unreachable. Please check your connection.'
      };
    }
  },

  /**
   * Logout administrator session
   */
  async logout(): Promise<boolean> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'same-origin'
      });
    } catch {}
    this.clearStoredToken();
    return true;
  },

  /**
   * Request password recovery token
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

  /**
   * Reset administrator password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Password reset failed' };
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: 'Network error during password reset.' };
    }
  },

  /**
   * Protected Admin Action: Approve Waypoint
   */
  async approveWaypoint(id: string, notes?: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`/api/admin/approve/${id}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({ notes })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Approval failed' };
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: 'Network error during approval.' };
    }
  },

  /**
   * Protected Admin Action: Trigger Geocoding Audit
   */
  async triggerAudit(): Promise<{ success: boolean; summary?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/audit', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'same-origin'
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Audit failed' };
      }
      return { success: true, summary: data.summary };
    } catch (err) {
      return { success: false, error: 'Network error during audit.' };
    }
  }
};
