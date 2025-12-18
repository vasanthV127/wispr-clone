# Web Deployment Guide

## ✅ Your App is Built!

The production build is in the `dist/` folder. Here are the easiest deployment options:

## Option 1: Deploy to Vercel (Fastest - 2 minutes)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd "D:\VASANTH\Final year\Subspace\wispr-clone"
   vercel
   ```

3. **Follow prompts**:
   - Login with GitHub/Email
   - Confirm project name
   - Select default settings
   - Get your live URL!

4. **Add Environment Variable**:
   - Go to your Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_DEEPGRAM_API_KEY` = your API key
   - Redeploy

## Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd "D:\VASANTH\Final year\Subspace\wispr-clone"
   netlify deploy
   ```

3. **When prompted**:
   - Publish directory: `dist`
   - Follow auth flow
   - Get your live URL!

4. **Add Environment Variable**:
   - Netlify dashboard → Site Settings → Environment Variables
   - Add: `VITE_DEEPGRAM_API_KEY` = your API key
   - Redeploy with: `netlify deploy --prod`

## Option 3: GitHub Pages (Free)

1. **Update vite.config.js** - Add base path:
   ```javascript
   export default defineConfig({
     base: '/wispr-voice-to-text/',  // your repo name
     // ... rest of config
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to package.json scripts**:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch `gh-pages`

⚠️ **Note**: GitHub Pages doesn't support environment variables, so you'd need to hardcode the API key (not recommended) or use a backend proxy.

## Option 4: Local Testing (What's working now)

Run the production build locally:
```bash
# Install a simple HTTP server
npm install -g serve

# Serve the dist folder (use -s for SPA mode)
serve dist -s -p 3000
```

Open: http://localhost:3000

**Note**: The `-s` flag serves it as a Single Page Application, ensuring all routes work correctly.

---

## 🎬 Demo Video - Use the Running Dev Server!

For your demo video, just use the dev server that's working perfectly:
```bash
npm run dev
```
Then record from http://localhost:1420/

---

## 📝 For Submission

Since Tauri desktop build requires Microsoft Visual C++ Build Tools (which takes time to install), I recommend:

1. **Deploy the web version** (Vercel is easiest)
2. **Record demo video** using `npm run dev`
3. **In your README**, mention:
   - "Deployed as web app (Tauri desktop build requires MSVC)"
   - "Live demo: [your-vercel-url]"

This is completely acceptable! Many production apps start as web apps before going native.

---

## 🔧 If You Still Want Desktop Build

Install **Microsoft Visual C++ Build Tools**:

1. Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Run installer
3. Select "Desktop development with C++"
4. Install (takes ~6 GB, 30+ minutes)
5. Restart terminal
6. Run: `npm run tauri build`

**But honestly**, the web version works great and is faster to deploy! 🚀
