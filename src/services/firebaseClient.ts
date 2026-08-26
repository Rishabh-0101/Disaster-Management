import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';

// ============================================================
// FIREBASE SETUP (Google / GitHub login) — YAHAN KYA KARNA HAI:
// 1. https://console.firebase.google.com par jao, "Add project" karo (free)
// 2. Project ke andar: Build > Authentication > Get Started
//    → "Sign-in method" tab me Google ON karo, GitHub ON karo
//    (GitHub ke liye apna GitHub OAuth App ka Client ID/Secret dena hoga —
//    yeh GitHub Developer Settings > OAuth Apps se milta hai)
// 3. Project Settings (gear icon) > "Your apps" > Web app (</>) add karo
//    → wahan se yeh config values milengi, unhe apne .env file me daalo:
//      VITE_FIREBASE_API_KEY=
//      VITE_FIREBASE_AUTH_DOMAIN=
//      VITE_FIREBASE_PROJECT_ID=
//      VITE_FIREBASE_APP_ID=
// 4. `npm install firebase` (already package.json me add kar diya hai)
// 5. Bas — Login page ke "Continue with Google" / "Continue with GitHub"
//    buttons apne aap kaam karne lagenge.
// ============================================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const firebaseApp = isConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;

export async function signInWithGoogle() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured yet. Add your Firebase keys to .env first.');
  }
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(firebaseAuth, provider);
  return result.user;
}

export async function signInWithGithub() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured yet. Add your Firebase keys to .env first.');
  }
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(firebaseAuth, provider);
  return result.user;
}

export async function firebaseLogout() {
  if (firebaseAuth) await firebaseSignOut(firebaseAuth);
}

export function watchFirebaseAuth(callback: (user: FirebaseUser | null) => void) {
  if (!firebaseAuth) return () => {};
  return onAuthStateChanged(firebaseAuth, callback);
}

export const isFirebaseConfigured = isConfigured;
