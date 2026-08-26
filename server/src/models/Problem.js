import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    affectedCount: { type: Number, default: 0 },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'assigned', 'in_progress', 'solution_proposed', 'resolved', 'routed'],
      default: 'submitted',
    },
    reporterName: { type: String },
    reporterContact: { type: String },
    reporterUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null if reported without login
    evidenceUrls: [{ type: String }], // Cloudinary/S3/Firebase Storage URLs go here
  },
  { timestamps: true }
);

export default mongoose.model('Problem', problemSchema);
