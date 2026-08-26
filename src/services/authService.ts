import { localSignIn, localSignUp } from '../utils/localAuthStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface AuthResult {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

// Tries your real backend (server/ Node.js or python-backend/ FastAPI) first.
// If it's not running yet (network error), falls back to a local, real
// email+password-matching store (see src/utils/localAuthStore.ts) so the
// app still works end-to-end while you're setting the real backend up.
export async function signUp(name: string, email: string, password: string, role: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Sign up failed');
    }
    const data = await res.json();
    return { ...data.user, token: data.token };
  } catch (err) {
    if (err instanceof TypeError) {
      // Network error — backend isn't running. Use local fallback.
      return localSignUp(name, email, password, role);
    }
    throw err;
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Invalid email or password');
    }
    const data = await res.json();
    return { ...data.user, token: data.token };
  } catch (err) {
    if (err instanceof TypeError) {
      return localSignIn(email, password);
    }
    throw err;
  }
}

export function signOut() {
  localStorage.removeItem('samadhansetu_token');
}
