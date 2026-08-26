import mongoose from 'mongoose';

// ============================================================
// MONGODB SETUP — YAHAN KYA KARNA HAI:
// 1. https://www.mongodb.com/cloud/atlas par free account banao
// 2. Ek cluster banao, "Connect" > "Drivers" se connection string copy karo
// 3. Us string ko server/.env file mein MONGODB_URI= ke aage paste karo
// 4. `npm install` phir `npm run dev` chalao — yeh function apne aap connect ho jaayega
// ============================================================

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
