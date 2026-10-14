export interface AuthUser {
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: AuthUser;
  token?: string;
  code?: string;
  attemptsLeft?: number;
  remainingSeconds?: number;
  lockoutRemainingMinutes?: number;
  resetToken?: string;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: AuthUser;
  error?: string;
}

// Client-side token storage key
const TOKEN_KEY = 'travel_life_admin_jwt';

export const authApi = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },

  async checkSession(): Promise<SessionResponse> {
    try {
      const token = this.getToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/auth/me', {
        headers,
        credentials: 'include'
      });

      if (!res.ok) {
        return { authenticated: false };
      }

      const data = await res.json();
      return {
        authenticated: !!data.authenticated,
        user: data.user
      };
    } catch {
      return { authenticated: false };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok && data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch {
      return {
        success: false,
        error: 'Network connection failed. Unable to reach authentication server.'
      };
    }
  },

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch('/api/auth/logout', {
        method: 'POST',
        headers,
        credentials: 'include'
      });
    } catch {}
    this.clearToken();
  },

  async approveWaypoint(id: string, note?: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const token = this.getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/approve/${id}`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ note })
      });

      return await res.json();
    } catch {
      return { success: false, error: 'Approval request failed' };
    }
  },

  async triggerAudit(): Promise<{ success: boolean; summary?: string; error?: string }> {
    try {
      const token = this.getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/audit', {
        method: 'POST',
        headers,
        credentials: 'include'
      });

      return await res.json();
    } catch {
      return { success: false, error: 'Audit trigger failed' };
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message?: string; error?: string; resetToken?: string }> {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Recovery request failed' };
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      return await res.json();
    } catch {
      return { success: false, error: 'Password reset request failed' };
    }
  }
};
