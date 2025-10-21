# 🚨 URGENT: MongoDB Not Installed!

## ⚠️ **The Problem**

Your financial system **cannot save data** because MongoDB is not installed on your computer.

**Error you're seeing:**
```
connect ECONNREFUSED ::1:27017
Operation `dailyreports.find()` buffering timed out after 10000ms
```

This means: **No database = No data storage**

---

## ✅ **The Solution: Install MongoDB**

### **Option 1: Quick Install (Recommended)**

Run this command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && brew tap mongodb/brew && brew install mongodb-community@7.0 && brew services start mongodb-community@7.0
```

**Or use our installation script:**

```bash
cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
chmod +x INSTALL_MONGODB.sh
./INSTALL_MONGODB.sh
```

---

### **Option 2: Step-by-Step Manual Install**

**Step 1: Install Homebrew (if not installed)**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Important:** After installation, if you have an M1/M2 Mac, run:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Step 2: Install MongoDB**

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

**Step 3: Start MongoDB**

```bash
brew services start mongodb-community@7.0
```

**Step 4: Verify MongoDB is Running**

```bash
brew services list | grep mongodb
```

You should see: `mongodb-community started`

---

## 🧪 **Test the Connection**

After installing MongoDB, test it:

```bash
mongosh
```

If it connects, type:
```
show dbs
exit
```

If you see a list of databases, **MongoDB is working!**

---

## 🚀 **Start Your Financial App**

Once MongoDB is running:

```bash
cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
npm run dev
```

Then open: **http://localhost:3009**

---

## ✅ **How to Verify It's Working**

1. **Go to:** http://localhost:3009
2. **Click:** "Daily Input" tab
3. **Add some data:**
   - Date: Today
   - Staff: Waiter 1, Amount: 80
   - General Revenue: 1000
   - POS Revenue: 200
4. **Click:** "Save Report"
5. **You should see:** ✅ Report saved successfully

6. **Click:** "Calendar" tab
7. **You should see:** Today's date with a green dot

**If you see the green dot = Data is being saved!** 🎉

---

## 🐛 **Troubleshooting**

### Problem: "command not found: brew"

**Solution:** Homebrew not installed. Run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Problem: "mongod: command not found"

**Solution:** MongoDB not installed. Run:
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

### Problem: Still can't connect after installation

**Solution:** MongoDB might not be running. Start it:
```bash
brew services start mongodb-community@7.0
```

Check status:
```bash
brew services list | grep mongodb
```

### Problem: "Permission denied"

**Solution:** Give script permission:
```bash
chmod +x INSTALL_MONGODB.sh
```

---

## 📊 **Why MongoDB is Required**

Your financial system needs MongoDB to:
- ✅ Store daily financial reports
- ✅ Keep historical records
- ✅ Generate P&L reports
- ✅ Show calendar data
- ✅ Export to CSV

**Without MongoDB = No data storage = Nothing works!**

---

## 🎯 **Quick Commands Reference**

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community@7.0

# Stop MongoDB
brew services stop mongodb-community@7.0

# Restart MongoDB
brew services restart mongodb-community@7.0

# Connect to MongoDB shell
mongosh

# Check MongoDB logs
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

---

## ⚡ **Quick Start (All-in-One)**

Copy and paste this entire block:

```bash
# Install Homebrew (if not installed)
which brew || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew 2>/dev/null
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Wait for it to start
sleep 5

# Check status
brew services list | grep mongodb

echo ""
echo "✅ MongoDB should be running now!"
echo "🚀 Start your financial app:"
echo "   cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial"
echo "   npm run dev"
echo ""
echo "📱 Then open: http://localhost:3009"
```

---

## 🆘 **Still Having Issues?**

If MongoDB still won't start, try:

```bash
# Create data directory
sudo mkdir -p /opt/homebrew/var/mongodb
sudo chown -R $(whoami) /opt/homebrew/var/mongodb

# Create log directory
sudo mkdir -p /opt/homebrew/var/log/mongodb
sudo chown -R $(whoami) /opt/homebrew/var/log/mongodb

# Try starting again
brew services restart mongodb-community@7.0
```

---

## 📞 **Summary**

**Your Issue:** MongoDB not installed ❌  
**Solution:** Install MongoDB ✅  
**Command:** Use the "Quick Start (All-in-One)" above  
**Result:** Financial system will work perfectly! 🎉

**After MongoDB is running, your financial system will be bulletproof!** 💪

---

**Install MongoDB now to start using your financial system!** 🚀

