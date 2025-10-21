# 🗄️ Starting MongoDB - Quick Guide

## ⚠️ Important: MongoDB Must Be Running!

The financial system requires MongoDB to store data. You'll see connection errors if MongoDB isn't running.

---

## 🚀 How to Start MongoDB

### macOS:
```bash
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start on boot
```

### Windows:
MongoDB should start automatically as a service. If not:
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB" service
3. Right-click → Start

---

## ✅ Check if MongoDB is Running

### macOS:
```bash
brew services list | grep mongodb
```

Should show: `mongodb-community started`

### Linux:
```bash
sudo systemctl status mongod
```

Should show: `active (running)`

### Test Connection:
```bash
mongosh
```

If it connects, MongoDB is running! Type `exit` to quit.

---

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED"

**This means MongoDB is NOT running!**

**Fix:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Error: "command not found: brew"

**On macOS, install Homebrew first:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install MongoDB:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Error: "mongod: command not found"

**MongoDB not installed!**

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```

---

## 🎯 Complete Startup Sequence

```bash
# 1. Start MongoDB
brew services start mongodb-community  # macOS
# OR
sudo systemctl start mongod  # Linux

# 2. Wait 2-3 seconds for MongoDB to start

# 3. Start the financial app
cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
npm run dev

# 4. Open browser
open http://localhost:3009
```

---

## 🔄 Stop MongoDB

If you need to stop MongoDB:

```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

---

## 📊 MongoDB Status

### Check what's stored:
```bash
mongosh
use bar-national
db.dailyreports.find()
```

This shows all your saved financial reports!

---

## 💡 Pro Tips

1. **Auto-start MongoDB on boot** (recommended):
   ```bash
   # macOS (already done with brew services)
   # Linux
   sudo systemctl enable mongod
   ```

2. **Check MongoDB logs** if having issues:
   ```bash
   # macOS
   tail -f /usr/local/var/log/mongodb/mongo.log
   
   # Linux
   tail -f /var/log/mongodb/mongod.log
   ```

3. **Quick restart:**
   ```bash
   brew services restart mongodb-community  # macOS
   sudo systemctl restart mongod  # Linux
   ```

---

## ✨ Success!

When MongoDB is running properly, you'll see:
- No connection errors in the terminal
- Data saves successfully
- Calendar shows your reports
- Reports generate correctly

---

**Now you're ready to use the financial system!** 🚀

Open: **http://localhost:3009**

