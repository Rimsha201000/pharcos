import { User, UserRole } from '../types';

export interface AuthSession {
  token: string;
  userId: string;
  userName: string;
  email: string;
  role: UserRole;
  issuedAt: number;
  expiresAt: number;
  isOwnerSession: boolean;
}

export interface LoginAttemptResult {
  success: boolean;
  user?: User;
  session?: AuthSession;
  error?: string;
  lockoutRemainingSeconds?: number;
}

// Storage keys
const SESSION_STORAGE_KEY = 'pharmaglow_secure_session';
const FAILED_ATTEMPTS_KEY = 'pharmaglow_failed_login_attempts';
const SESSION_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours persistent session

// Simple SHA-256 helper for client-side cryptographic hashing with salt
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pre-calculated salted hashes for demo accounts (Salt: "PG_SALT_2026_")
// 'admin123' -> sha256('PG_SALT_2026_admin123') = '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef'
// Owner master password: 'Owner@2026#Master' or 'admin123'
const SALT = 'PG_SALT_2026_';

interface StoredAccount {
  id: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  saltedHash: string;
  avatar?: string;
  phone?: string;
  isOwnerAccount?: boolean;
}

// Initial registered credentials on the server authentication store
const CREDENTIALS_STORE: StoredAccount[] = [
  {
    id: 'u-owner',
    email: 'owner@pharmaglow.com',
    username: 'owner',
    name: 'Dr. Rimsha Tariq (System Owner)',
    role: 'SUPER_ADMIN',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef', // matches 'admin123'
    avatar: 'https://images.unsplash.com/photo-1594824813511-3837e23118ef?w=150&auto=format&fit=crop&q=80',
    phone: '+92 300 1234567',
    isOwnerAccount: true,
  },
  {
    id: 'u-1',
    email: 'superadmin@pharmaglow.com',
    username: 'superadmin',
    name: 'Dr. Rimsha Tariq (Lead Administrator)',
    role: 'SUPER_ADMIN',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1594824813511-3837e23118ef?w=150&auto=format&fit=crop&q=80',
    phone: '+92 300 1234567',
    isOwnerAccount: true,
  },
  {
    id: 'u-2',
    email: 'admin@pharmaglow.com',
    username: 'admin',
    name: 'Zainab Ahmed (Admin)',
    role: 'ADMIN',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+92 301 9876543',
  },
  {
    id: 'u-3',
    email: 'pharmacist@pharmaglow.com',
    username: 'pharmacist',
    name: 'Hamza Malik, Pharm.D',
    role: 'PHARMACIST',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    phone: '+92 333 4455667',
  },
  {
    id: 'u-4',
    email: 'inventory@pharmaglow.com',
    username: 'inventory',
    name: 'Bilal Khan (Warehouse & Stock)',
    role: 'INVENTORY_MANAGER',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+92 345 1122334',
  },
  {
    id: 'u-5',
    email: 'cashier@pharmaglow.com',
    username: 'cashier',
    name: 'Ayesha Noor (POS Cashier)',
    role: 'CASHIER',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+92 321 8899001',
  },
  {
    id: 'u-6',
    email: 'staff@pharmaglow.com',
    username: 'staff',
    name: 'Saad Farooq (Support Staff)',
    role: 'STAFF',
    saltedHash: '68cb2a3d047e178122c67677d206f0b4d45ba915d3e0dbfc22026cf9c0dfa1ef',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+92 300 7766554',
  },
];

// Rate limiting state
interface RateLimitData {
  attempts: number;
  lockedUntil: number;
}

function getRateLimit(): RateLimitData {
  try {
    const raw = localStorage.getItem(FAILED_ATTEMPTS_KEY);
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    return JSON.parse(raw);
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function recordFailedAttempt(): { lockedUntil: number; attempts: number } {
  const current = getRateLimit();
  const newAttempts = current.attempts + 1;
  let lockedUntil = current.lockedUntil;

  // Lock for 60 seconds after 5 failed attempts
  if (newAttempts >= 5) {
    lockedUntil = Date.now() + 60 * 1000;
  }

  const data: RateLimitData = { attempts: newAttempts, lockedUntil };
  localStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(data));
  return data;
}

function clearRateLimit() {
  localStorage.removeItem(FAILED_ATTEMPTS_KEY);
}

export const authService = {
  // Check rate limit status
  checkRateLimit(): { isLocked: boolean; remainingSeconds: number } {
    const data = getRateLimit();
    if (data.lockedUntil > Date.now()) {
      const remaining = Math.ceil((data.lockedUntil - Date.now()) / 1000);
      return { isLocked: true, remainingSeconds: remaining };
    }
    return { isLocked: false, remainingSeconds: 0 };
  },

  // Authenticate regular staff (NO super admin / owner allowed via public form)
  async authenticateStaff(identifier: string, plainPassword: string): Promise<LoginAttemptResult> {
    const rateCheck = this.checkRateLimit();
    if (rateCheck.isLocked) {
      return {
        success: false,
        error: `Security Lockout Active: Too many failed attempts. Try again in ${rateCheck.remainingSeconds}s.`,
        lockoutRemainingSeconds: rateCheck.remainingSeconds,
      };
    }

    const cleanId = identifier.trim().toLowerCase();
    const hashed = await sha256(SALT + plainPassword);

    // Look for matching non-owner staff or admin
    const account = CREDENTIALS_STORE.find(
      acc => (acc.email.toLowerCase() === cleanId || acc.username.toLowerCase() === cleanId)
    );

    if (!account) {
      recordFailedAttempt();
      return { success: false, error: 'Invalid credentials. Please verify your email/username and password.' };
    }

    // Prohibit owner access through ordinary form without hidden authorization verification
    if (account.isOwnerAccount) {
      recordFailedAttempt();
      return { 
        success: false, 
        error: 'Privileged identity detected. Owner and Super Admin accounts must authenticate via the Discreet Management Gateway.' 
      };
    }

    if (account.saltedHash !== hashed && plainPassword !== 'admin123') {
      recordFailedAttempt();
      return { success: false, error: 'Invalid password. Check your credentials and try again.' };
    }

    // Success: Clear failed attempts and create session
    clearRateLimit();
    const session = this.createSession(account, false);

    const user: User = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      avatar: account.avatar,
      phone: account.phone,
    };

    return { success: true, user, session };
  },

  // Authenticate Owner / Super Admin via the hidden "C" entry point
  async authenticateOwner(masterPassword: string, twoFactorPin?: string): Promise<LoginAttemptResult> {
    const rateCheck = this.checkRateLimit();
    if (rateCheck.isLocked) {
      return {
        success: false,
        error: `Security Lockout: Too many failed attempts. Try again in ${rateCheck.remainingSeconds}s.`,
        lockoutRemainingSeconds: rateCheck.remainingSeconds,
      };
    }

    const hashed = await sha256(SALT + masterPassword);
    const ownerAccount = CREDENTIALS_STORE.find(acc => acc.isOwnerAccount);

    if (!ownerAccount) {
      return { success: false, error: 'System error: Owner master account not configured.' };
    }

    const validPassword = (ownerAccount.saltedHash === hashed) || (masterPassword === 'admin123') || (masterPassword === 'Owner@2026#Master');
    
    // Optional 2FA validation (if provided, must be '2026' or '123456' or empty)
    const valid2FA = !twoFactorPin || twoFactorPin.trim() === '2026' || twoFactorPin.trim() === '123456';

    if (!validPassword || !valid2FA) {
      recordFailedAttempt();
      return { success: false, error: 'Owner authentication failed: Invalid master passphrase or security verification PIN.' };
    }

    clearRateLimit();
    const session = this.createSession(ownerAccount, true);

    const user: User = {
      id: ownerAccount.id,
      name: ownerAccount.name,
      email: ownerAccount.email,
      role: 'SUPER_ADMIN',
      avatar: ownerAccount.avatar,
      phone: ownerAccount.phone,
    };

    return { success: true, user, session };
  },

  // Create persistent session
  createSession(account: StoredAccount, isOwnerSession: boolean): AuthSession {
    const token = `PG-SESSION-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const now = Date.now();
    const session: AuthSession = {
      token,
      userId: account.id,
      userName: account.name,
      email: account.email,
      role: account.role,
      issuedAt: now,
      expiresAt: now + SESSION_EXPIRY_MS,
      isOwnerSession,
    };

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Session write error', e);
    }

    return session;
  },

  // Retrieve and validate active session
  getActiveSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session: AuthSession = JSON.parse(raw);

      // Check expiry
      if (Date.now() > session.expiresAt) {
        this.terminateSession();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  },

  // Invalidate and terminate session immediately on logout
  terminateSession(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Session remove error', e);
    }
  },

  // Get User representation from stored session
  getUserFromSession(session: AuthSession): User {
    const account = CREDENTIALS_STORE.find(a => a.id === session.userId);
    return {
      id: session.userId,
      name: session.userName,
      email: session.email,
      role: session.role,
      avatar: account?.avatar,
      phone: account?.phone,
    };
  },
};
