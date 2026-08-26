import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User model — stores real hashed passwords (never plain text).
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String }, // not required if user signed up via Google/GitHub
    role: {
      type: String,
      enum: ['citizen', 'university', 'industry', 'government', 'admin'],
      default: 'citizen',
    },
    provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
    providerId: { type: String }, // Google/GitHub account id, if OAuth signup
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(plainPassword, salt);
};

userSchema.methods.comparePassword = async function (plainPassword) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(plainPassword, this.passwordHash);
};

export default mongoose.model('User', userSchema);
