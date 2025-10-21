# 💰 Bar National Financial Management System

A modern, user-friendly financial management application for Bar National, built with Next.js and MongoDB Atlas.

---

## 🌟 Features

- **📝 Daily Input:** Record staff expenses, operational expenses, and revenues
- **📅 Calendar View:** Browse and manage historical records by date
- **📊 Reports:** Generate daily, weekly, monthly, quarterly, and annual P&L reports
- **💱 Currency Conversion:** Automatic BGN to EUR conversion
- **🎨 Modern UI:** Clean, intuitive dashboard design
- **📱 Mobile Responsive:** Works perfectly on all devices
- **☁️ Cloud Database:** MongoDB Atlas for reliable data storage

---

## 🚀 Quick Start

### **Local Development:**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   ```
   MONGODB_URI=mongodb+srv://BarNational:IliyaMarkovski@markovski.uhjxb6u.mongodb.net/bar-national-financial?retryWrites=true&w=majority&appName=Markovski
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3009
   ```

---

## 📦 Deployment

### **Deploy to Vercel (Recommended):**

**Quick Deploy (5 minutes):**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable when prompted:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

**📚 Detailed Guides:**
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Fast 5-minute deployment
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Next.js 13
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Deployment:** Vercel
- **Currency:** BGN with EUR conversion

---

## 📂 Project Structure

```
bar-national-financial/
├── pages/
│   ├── index.js              # Main application page
│   ├── _app.js               # Next.js app wrapper
│   ├── _document.js          # Custom document
│   └── api/
│       ├── categories.js     # Get staff/expense categories
│       └── reports/
│           ├── index.js      # Create/fetch reports
│           ├── [date].js     # Single report operations
│           └── aggregate/
│               └── [period].js  # Aggregated reports
├── components/
│   └── Financial/
│       ├── DailyInputForm.js    # Daily input form
│       ├── CalendarView.js      # Calendar interface
│       └── ReportsDashboard.js  # Reports & analytics
├── utils/
│   └── currency.js           # Currency conversion utilities
├── styles/
│   ├── globals.css           # Global styles
│   └── Financial.module.css  # Component styles
├── package.json              # Dependencies
├── vercel.json               # Vercel configuration
└── .env.local                # Environment variables (not in Git)
```

---

## 🎯 Key Features

### **Daily Input Dashboard:**
- Dropdown menus for staff selection
- Dynamic expense categories
- Automatic calculations:
  - Cash Revenue = General Revenue - POS Revenue
  - Cash Turnover = Cash Revenue - Expenses
  - General Turnover = General Revenue - Expenses
- Real-time BGN to EUR conversion

### **Calendar View:**
- Browse records by date
- Visual indicators for days with data
- Click to view/edit reports
- Month/year navigation

### **Reports:**
- Daily detailed breakdown
- Weekly summaries (7-day periods)
- Monthly aggregations
- Quarterly reports
- Annual analysis
- CSV export functionality

---

## 💱 Currency System

- **Base Currency:** BGN (Bulgarian Lev)
- **Conversion Rate:** 1 EUR = 1.95583 BGN (fixed rate)
- **Display Format:** `BGN 100.50 (€51.39)`
- **Rounding:** EUR amounts rounded to 2 decimal places

---

## 🔒 Security

- Environment variables for sensitive data
- MongoDB Atlas with authentication
- Network access controls
- No sensitive data in code
- Secure API endpoints

---

## 📊 Database Schema

```javascript
{
  date: "2025-10-21",
  staff_expenses: [
    { role: "Waiter 1", amount: 100 },
    { role: "Security 1", amount: 65 }
  ],
  expenses: [
    { type: "Stock Expenses", amount: 150 },
    { type: "POS Terminal", amount: 50 }
  ],
  revenues: {
    general: 695,
    pos: 220,
    cash: 475
  },
  summary: {
    total_expenses: 315,
    cash_turnover: 160,
    general_turnover: 380
  },
  notes: "Optional notes..."
}
```

---

## 🧪 Testing

### **Local Testing:**

1. Start the development server
2. Add test data through the UI
3. Check MongoDB Atlas for data persistence
4. Test all tabs (Daily Input, Calendar, Reports)
5. Test on different screen sizes

### **Production Testing:**

1. Deploy to Vercel
2. Run through the deployment checklist
3. Test all functionality on live site
4. Verify data persistence in Atlas
5. Test on mobile devices

---

## 📝 Available Scripts

```bash
# Development server (localhost:3009)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🌐 Environment Variables

Required environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## 📞 Support

### **Documentation:**
- [Quick Deploy Guide](QUICK_DEPLOY.md)
- [Full Deployment Guide](VERCEL_DEPLOYMENT.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

### **Common Issues:**
- **MongoDB Connection Failed:** Check Network Access in Atlas
- **Build Errors:** Verify all dependencies are installed
- **Environment Variables:** Make sure `MONGODB_URI` is set

---

## 🎉 Credits

**Built with ❤️ for Bar National**

- **Framework:** Next.js
- **Database:** MongoDB Atlas
- **Hosting:** Vercel
- **Currency:** BGN with EUR conversion

---

## 📄 License

ISC License - Bar National © 2025

---

## 🚀 Ready to Deploy?

Follow the [Quick Deploy Guide](QUICK_DEPLOY.md) to get your app live in 5 minutes!

**Your deployment URL will be:**
`https://bar-national-financial.vercel.app`

(or a similar Vercel-assigned URL)

---

**Happy coding! 💰📊🎉**
