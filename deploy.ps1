# Wispr Voice-to-Text - Quick Deployment Script

Write-Host "🎯 Wispr Clone - Web Deployment" -ForegroundColor Cyan
Write-Host ""

# Check if dist folder exists
if (Test-Path "dist") {
    Write-Host "✅ Production build found in dist/" -ForegroundColor Green
} else {
    Write-Host "📦 Building production version..." -ForegroundColor Yellow
    npm run build
    Write-Host "✅ Build complete!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Choose deployment option:" -ForegroundColor Cyan
Write-Host "1. Deploy to Vercel (Recommended - Free, Fast)" -ForegroundColor White
Write-Host "2. Deploy to Netlify (Free, Easy)" -ForegroundColor White
Write-Host "3. Test locally with serve" -ForegroundColor White
Write-Host "4. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
        
        # Check if vercel is installed
        if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
            Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host "Starting deployment..." -ForegroundColor Green
        vercel
        
        Write-Host ""
        Write-Host "⚠️ Important: Add environment variable in Vercel dashboard:" -ForegroundColor Yellow
        Write-Host "   VITE_DEEPGRAM_API_KEY = your_api_key" -ForegroundColor White
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Deploying to Netlify..." -ForegroundColor Cyan
        
        # Check if netlify is installed
        if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
            Write-Host "📦 Installing Netlify CLI..." -ForegroundColor Yellow
            npm install -g netlify-cli
        }
        
        Write-Host "Starting deployment..." -ForegroundColor Green
        netlify deploy --prod --dir=dist
        
        Write-Host ""
        Write-Host "⚠️ Important: Add environment variable in Netlify dashboard:" -ForegroundColor Yellow
        Write-Host "   VITE_DEEPGRAM_API_KEY = your_api_key" -ForegroundColor White
    }
    "3" {
        Write-Host ""
        Write-Host "🌐 Starting local server..." -ForegroundColor Cyan
        
        # Check if serve is installed
        if (!(Get-Command serve -ErrorAction SilentlyContinue)) {
            Write-Host "📦 Installing serve..." -ForegroundColor Yellow
            npm install -g serve
        }
        
        Write-Host "Server starting at http://localhost:3000" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
        Write-Host ""
        serve dist -s -p 3000
    }
    "4" {
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
