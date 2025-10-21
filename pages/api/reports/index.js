// Next.js API route for reports
// This allows the API to be deployed with the Next.js app on Vercel

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

// Daily Report Schema
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

const calculateSummary = (staffExpenses, expenses, revenues) => {
  const totalStaffExpenses = staffExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalAllExpenses = totalStaffExpenses + totalExpenses;
  
  const cashRevenue = revenues.general - revenues.pos;
  const cashTurnover = cashRevenue - totalAllExpenses;
  const generalTurnover = revenues.general - totalAllExpenses;
  
  return {
    total_expenses: totalAllExpenses,
    cash_turnover: cashTurnover,
    general_turnover: generalTurnover
  };
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { start_date, end_date } = req.query;
      let query = {};
      
      if (start_date && end_date) {
        query.date = { $gte: start_date, $lte: end_date };
      } else if (start_date) {
        query.date = { $gte: start_date };
      } else if (end_date) {
        query.date = { $lte: end_date };
      }
      
      const reports = await DailyReport.find(query).sort({ date: -1 });
      res.status(200).json({ success: true, data: reports });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { date, staff_expenses, expenses, revenues, notes } = req.body;
      
      if (!date || !revenues || revenues.general === undefined || revenues.pos === undefined) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: date, revenues.general, revenues.pos' 
        });
      }
      
      // Ensure arrays are properly parsed
      let parsedStaffExpenses = [];
      let parsedExpenses = [];
      
      if (Array.isArray(staff_expenses)) {
        parsedStaffExpenses = staff_expenses;
      } else if (typeof staff_expenses === 'string') {
        try {
          parsedStaffExpenses = JSON.parse(staff_expenses);
        } catch (e) {
          console.error('Error parsing staff_expenses:', e);
          parsedStaffExpenses = [];
        }
      }
      
      if (Array.isArray(expenses)) {
        parsedExpenses = expenses;
      } else if (typeof expenses === 'string') {
        try {
          parsedExpenses = JSON.parse(expenses);
        } catch (e) {
          console.error('Error parsing expenses:', e);
          parsedExpenses = [];
        }
      }
      
      const cashRevenue = revenues.general - revenues.pos;
      const summary = calculateSummary(
        parsedStaffExpenses, 
        parsedExpenses, 
        { ...revenues, cash: cashRevenue }
      );
      
      const report = await DailyReport.findOneAndUpdate(
        { date },
        {
          date,
          staff_expenses: parsedStaffExpenses,
          expenses: parsedExpenses,
          revenues: {
            general: revenues.general,
            pos: revenues.pos,
            cash: cashRevenue
          },
          summary,
          notes,
          updated_at: new Date()
        },
        { new: true, upsert: true }
      );
      
      res.status(200).json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

