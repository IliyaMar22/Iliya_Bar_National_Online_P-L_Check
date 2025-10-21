#!/bin/bash

echo "🔧 MongoDB Installation Script for macOS"
echo "========================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for M1/M2 Macs
    if [ -f "/opt/homebrew/bin/brew" ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo "✅ Homebrew already installed"
fi

echo ""
echo "📦 Installing MongoDB..."
brew tap mongodb/brew
brew install mongodb-community@7.0

echo ""
echo "🚀 Starting MongoDB..."
brew services start mongodb-community@7.0

echo ""
echo "⏳ Waiting for MongoDB to start..."
sleep 5

echo ""
echo "✅ Checking MongoDB status..."
brew services list | grep mongodb

echo ""
echo "🎉 MongoDB installation complete!"
echo ""
echo "To verify MongoDB is running:"
echo "  brew services list | grep mongodb"
echo ""
echo "To connect to MongoDB:"
echo "  mongosh"
echo ""
echo "Now you can start your financial app:"
echo "  cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3009"

