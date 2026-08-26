import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/signup
// Real signup: name, email, password, role — password is hashed, never stored plain.
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }
    const user = new User({ name, email, role: role || 'citizen', provider: 'local' });
    await user.setPassword(password);
    await user.save();
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
// Real login: only succeeds if email exists AND password matches the stored hash.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// GOOGLE / GITHUB OAUTH — YAHAN KYA KARNA HAI:
// Sabse aasan tareeka: OAuth ke liye Firebase Authentication use karo
// (frontend mein src/services/firebaseClient.ts already scaffold hai).
// Firebase khud Google/GitHub verify kar deta hai, tumhe yahan sirf
// Firebase se aaya hua verified ID token check karke apna JWT issue
// karna hai. Neeche ek starter route diya hai:
//
// import admin from 'firebase-admin';
// router.post('/oauth/firebase', async (req, res) => {
//   const { idToken } = req.body;
//   const decoded = await admin.auth().verifyIdToken(idToken);
//   let user = await User.findOne({ email: decoded.email });
//   if (!user) {
//     user = await User.create({
//       name: decoded.name || decoded.email,
//       email: decoded.email,
//       provider: decoded.firebase.sign_in_provider.includes('google') ? 'google' : 'github',
//       providerId: decoded.uid,
//     });
//   }
//   const token = signToken(user);
//   res.json({ token, user });
// });
//
// Iske liye Firebase Admin SDK install karo: npm install firebase-admin
// aur Firebase console se service-account JSON key download karke
// server/.env mein path daalo.
// ============================================================

export default router;
