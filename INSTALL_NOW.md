# 🚀 Install MongoDB NOW - Copy & Paste These Commands

## Step 1: Install Homebrew (Package Manager)

**Open your Terminal and paste this:**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Press Enter and follow the prompts:**
- It will ask for your password (type it - you won't see it, that's normal)
- Press Enter when asked
- Wait 3-5 minutes

**After it finishes, if you're on an M1/M2 Mac, run this too:**

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

---

## Step 2: Install MongoDB

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

Wait 2-3 minutes for installation.

---

## Step 3: Start MongoDB

```bash
brew services start mongodb-community@7.0
```

---

## Step 4: Verify It's Running

```bash
brew services list | grep mongodb
```

You should see: `mongodb-community started` ✅

---

## Step 5: Start Your Financial App

```bash
cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
npm run dev
```

---

## Step 6: Open in Browser

Go to: **http://localhost:3009**

---

## 🎉 Test It Works!

1. Click "Daily Input"
2. Add some data
3. Click "Save Report"
4. You should see: ✅ Report saved successfully
5. Click "Calendar" - you should see a green dot on today's date

**If you see the green dot = SUCCESS!** 🎉

---

## ⚡ Quick Copy-Paste (All-in-One)

If you want to run everything at once, copy this entire block:

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# For M1/M2 Macs, add to path
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Check status
sleep 3
brew services list | grep mongodb

echo ""
echo "✅ MongoDB installed and running!"
echo ""
echo "Now start your financial app:"
echo "  cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3009"
```

---

**That's it! MongoDB will be running and your financial system will work!** 💪

