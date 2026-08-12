// Mongoose Database Schemas for HYIP Monitor Pro

/*
  For production deployment with a live MongoDB instance, require mongoose and connect:
  import mongoose from 'mongoose';
  mongoose.connect(process.env.MONGODB_URI);
*/

export const ProjectSchema = {
  name: { type: String, required: true },
  domain: { type: String, required: true },
  url: { type: String, required: true },
  logo: String,
  banner: String,
  status: { type: String, enum: ['PAYING', 'WAITING', 'NOT PAYING', 'SCAM', 'NEW', 'FEATURED'], default: 'PAYING' },
  category: String,
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  votes: {
    excellent: { type: Number, default: 0 },
    good: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    bad: { type: Number, default: 0 },
    veryBad: { type: Number, default: 0 }
  },
  ourInvestment: Number,
  minDeposit: Number,
  maxDeposit: Number,
  roi: Number,
  duration: String,
  withdrawalType: { type: String, enum: ['Instant', 'Manual'], default: 'Manual' },
  referralPercent: String,
  lastPayoutDate: String,
  startDate: String,
  monitoredDays: Number,
  processors: [String],
  telegram: String,
  description: String,
  country: String,
  company: String,
  whois: Object,
  payoutHistory: Array,
  createdAt: { type: Date, default: Date.now }
};

export const ReviewSchema = {
  projectId: String,
  projectName: String,
  name: String,
  email: String,
  country: String,
  rating: Number,
  reviewText: String,
  paymentAmount: Number,
  wallet: String,
  screenshot: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  ip: String,
  createdAt: { type: Date, default: Date.now }
};

export const CommentSchema = {
  projectId: String,
  parentId: String,
  name: String,
  text: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
};

export const ReportSchema = {
  projectId: String,
  projectName: String,
  reason: String,
  wallet: String,
  proof: String,
  reporterEmail: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
};
