// ============================================================
// Local fallback auth store — used ONLY when no real backend
// (server/ or python-backend/) is connected yet, so the app still
// works out of the box for demo/testing purposes.
//
// Passwords are hashed with the browser's built-in Web Crypto API
// (SHA-256) — better than plain text, but NOT a substitute for real
// bcrypt on a real server. Once you connect server/ or python-backend/,
// this file stops being used automatically (see authService.ts).
// ============================================================

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

const USERS_KEY = 'samadhansetu_local_users';

async function hash(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function localSignUp(name: string, email: string, password: string, role: string) {
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email already exists. Please log in instead.');
  }
  const passwordHash = await hash(password);
  const user: StoredUser = { id: crypto.randomUUID(), name, email, passwordHash, role };
  users.push(user);
  saveUsers(users);
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function localSignIn(email: string, password: string) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  const passwordHash = await hash(password);
  // Real check — email must exist AND password hash must match.
  // A random / made-up password will always be rejected here.
  if (!user || user.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password.');
  }
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
