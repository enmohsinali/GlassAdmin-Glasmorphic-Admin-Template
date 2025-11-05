#!/bin/bash

echo "🚀 GlassAdmin Quick Start Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js found: $(node --version)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
else
    echo "✅ npm found: $(npm --version)"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎨 Starting development server..."
    echo ""
    echo "🌐 The project will open at: http://localhost:3000"
    echo ""
    echo "📍 Available pages:"
    echo "   • Landing: http://localhost:3000/"
    echo "   • Analytics: http://localhost:3000/src/pages/dashboard/analytics.html"
    echo "   • E-commerce: http://localhost:3000/src/pages/dashboard/ecommerce.html"
    echo "   • CRM: http://localhost:3000/src/pages/dashboard/crm.html"
    echo ""
    echo "💡 Press Ctrl+C to stop the server"
    echo ""

    npm run dev
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above"
    exit 1
fi
