# Wispr Clone - Quick Start Guide

## 🎯 Quick Setup (5 minutes)

### Step 1: Get Your Deepgram API Key

1. Visit: https://console.deepgram.com/signup
2. Sign up for a FREE account
3. Go to your project dashboard
4. Click "API Keys" in the left sidebar
5. Copy your API key

### Step 2: Configure the App

1. Open the `.env` file in the project root
2. Replace the empty value with your API key:
   ```
   VITE_DEEPGRAM_API_KEY=your_actual_api_key_here
   ```
3. Save the file

### Step 3: Run the App

#### Option A: Web Version (Faster - Recommended for testing)
```bash
npm run dev
```
Then open http://localhost:5173 in your browser

#### Option B: Desktop App (Tauri)
```bash
# Make sure Rust is in your PATH
$env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"

# Run the desktop app
npm run tauri dev
```

## 🎤 Using the App

1. Click **"Push to Talk"** button
2. Allow microphone permissions when prompted
3. Speak clearly into your microphone
4. Click the button again to stop recording
5. Wait a moment for processing
6. Your transcribed text will appear!
7. Use **"Copy Text"** to copy it to clipboard

## 🔧 Troubleshooting

### "Deepgram API key not configured"
- Make sure you added your API key to the `.env` file
- Restart the dev server after adding the key

### "Microphone access denied"
- Grant microphone permissions in your browser/system settings
- Refresh the page and try again

### "Transcription failed"
- Check your internet connection
- Verify your API key is correct
- Make sure you haven't exceeded free tier limits

### Rust/Cargo not found
- Run this command first:
  ```powershell
  $env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"
  ```
- Or restart your terminal after installing Rust

## 📦 Build for Production

```bash
# For desktop app
npm run tauri build

# Output will be in: src-tauri/target/release/
```

## 🎬 Recording Demo Video

1. Use OBS Studio, ShareX, or Windows Game Bar
2. Show:
   - Clicking "Push to Talk"
   - Speaking into microphone
   - Transcription appearing
   - Copy/Clear buttons working
3. Upload to YouTube or Google Drive
4. Add link to README

## 📝 Next Steps for Submission

1. ✅ Get Deepgram API key
2. ✅ Test the app works locally
3. ⬜ Create GitHub repository
4. ⬜ Push code to GitHub
5. ⬜ Record demo video
6. ⬜ Update README with your links
7. ⬜ Submit before Dec 22, 11:54 PM

---

**Need help?** Check the main README.md for detailed documentation.
