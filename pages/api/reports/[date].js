// Next.js API route for single report operations

import mongoose from 'mongoose';

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bar-national';
  
  const db = await mongoose.connect(MONGODB_URI);

  cachedDb = db;
  return db;
};

const dailyReportSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  staff_expenses: [{
    role: String,
    amount: Number
  }],
  expenses: [{
    type: { type: String },  // 'type' is a reserved word, so we need to specify it explicitly
    amount: Number
  }],
  revenues: {
    general: Number,
    pos: Number,
    cash: Number
  },
  summary: {
    total_expenses: Number,
    cash_turnover: Number,
    general_turnover: Number
  },
  notes: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const DailyReport = mongoose.models.DailyReport || mongoose.model('DailyReport', dailyReportSchema);

export default async function handler(req, res) {
  await connectDB();
  
  const { date } = req.query;

  if (req.method === 'GET') {
    try {
      const report = await DailyReport.findOne({ date });
      if (!report) {
        return res.status(404).json({ success: false, error: 'Report not found' });
      }
      res.status(200).json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await DailyReport.findOneAndDelete({ date });
      if (!result) {
        return res.status(404).json({ success: false, error: 'Report not found' });
      }
      res.status(200).json({ success: true, message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

