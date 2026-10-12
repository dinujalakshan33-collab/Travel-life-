import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Environment configurations with secure defaults
export const JWT_SECRET = process.env.JWT_SECRET || 'travel-life-secure-jwt-secret-key-32chars-min';
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'dinujalakshan33@gmail.com').toLowerCase().trim();

// Initial password: use ADMIN_PASSWORD from env or default secure starter
const INITIAL_PASSWORD = process.env.ADMIN_PASSWORD || 'TravelLife@Admin2025!';

// Store hashed password in memory (can be changed via password reset)
let adminPasswordHash = bcrypt.hashSync(INITIAL_PASSWORD, 12);

// Active password reset tokens: token -> { expiry: number, email: string }
const resetTokens = new Map<string, { expiry: number; email: string }>();

// Rate limiting & Brute-force protection:
// ipOrEmail -> { attempts: number, lockedUntil: number, firstAttempt: number }
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
  firstAttempt: number;
}
const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;   // 15 minutes window

export interface AuthUser {
  email: string;
  role: 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

/**
 * Checks rate limiting for a client IP or email.
 * Returns { isLocked: boolean, remainingSeconds: number }
 */
export function checkLoginRateLimit(key: string): { isLocked: boolean; remainingSeconds: number } {
  const record = loginAttempts.get(key);
  const now = Date.now();

  if (!record) {
    return { isLocked: false, remainingSeconds: 0 };
  }

  // If locked and lock period is still active
  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { isLocked: true, remainingSeconds };
  }

  // If window expired, reset attempts
  if (now - record.firstAttempt > ATTEMPT_WINDOW_MS && record.lockedUntil <= now) {
    loginAttempts.delete(key);
    return { isLocked: false, remainingSeconds: 0 };
  }

  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Records a failed login attempt. If attempts exceed threshold, locks the account/IP.
 */
export function recordFailedLogin(key: string): { locked: boolean; attemptsLeft: number; remainingSeconds: number } {
  const now = Date.now();
  let record = loginAttempts.get(key);

  if (!record || now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
    record = { attempts: 1, lockedUntil: 0, firstAttempt: now };
  } else {
    record.attempts += 1;
  }

  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(key, record);
    return {
      locked: true,
      attemptsLeft: 0,
      remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000)
    };
  }

  loginAttempts.set(key, record);
  return {
    locked: false,
    attemptsLeft: MAX_FAILED_ATTEMPTS - record.attempts,
    remainingSeconds: 0
  };
}

/**
 * Clears failed login record upon successful authentication.
 */
export function clearFailedLogin(key: string) {
  loginAttempts.delete(key);
}

/**
 * Validates admin credentials.
 */
export function verifyAdminCredentials(email: string, password: string):boolean {
  if (!email || !password) return false;
  if (email.toLowerCase().trim() !== ADMIN_EMAIL) {
    return false;
  }
  return bcrypt.compareSync(password, adminPasswordHash);
}

/**
 * Updates administrator password.
 */
export function updateAdminPassword(newPassword: string): void {
  adminPasswordHash = bcrypt.hashSync(newPassword, 12);
}

/**
 * Generates signed session JWT.
 */
export function generateAdminToken(email: string): string {
  return jwt.sign(
    { email: email.toLowerCase().trim(), role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * Verifies signed session token.
 */
export function verifyAdminToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded && decoded.email === ADMIN_EMAIL && decoded.role === 'admin') {
      return { email: decoded.email, role: 'admin' };
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Creates one-time password reset token valid for 30 minutes.
 */
export function createPasswordResetToken(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + 30 * 60 * 1000; // 30 minutes
  resetTokens.set(token, { expiry, email: email.toLowerCase().trim() });
  return token;
}

/**
 * Verifies one-time password reset token and consumes it.
 */
export function consumePasswordResetToken(token: string): string | null {
  const record = resetTokens.get(token);
  if (!record) return null;
  if (Date.now() > record.expiry) {
    resetTokens.delete(token);
    return null;
  }
  resetTokens.delete(token);
  return record.email;
}

/**
 * Server-side Express middleware protecting private admin endpoints.
 */
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check cookie or Authorization Bearer header
  const cookieToken = req.cookies?.travel_life_admin_session;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const token = cookieToken || headerToken;

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: Private administrator credentials required',
      code: 'AUTH_REQUIRED'
    });
    return;
  }

  const user = verifyAdminToken(token);
  if (!user) {
    res.status(401).json({
      error: 'Unauthorized: Invalid or expired administrator session',
      code: 'SESSION_EXPIRED'
    });
    return;
  }

  req.user = user;
  next();
}
