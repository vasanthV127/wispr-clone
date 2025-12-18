# 🔧 Installing Visual C++ Build Tools

## ⚠️ What You Need to Know:

**Download Size:** ~1.5 GB  
**Installed Size:** ~6 GB  
**Time:** 30-60 minutes  
**Internet:** Required during installation  

---

## 📥 Step-by-Step Installation:

### Step 1: Download Build Tools

**Option A: Direct Download (Recommended)**
https://aka.ms/vs/17/release/vs_BuildTools.exe

**Option B: Full Visual Studio Page**
https://visualstudio.microsoft.com/visual-cpp-build-tools/

---

### Step 2: Run the Installer

1. Run the downloaded `vs_BuildTools.exe`
2. Wait for the installer to load (may take a minute)

---

### Step 3: Select Workload

**IMPORTANT:** You must select the correct components!

In the installer window:
1. Check **"Desktop development with C++"**
2. On the right side, make sure these are checked:
   - ✅ MSVC v143 - VS 2022 C++ x64/x86 build tools
   - ✅ Windows 10/11 SDK
   - ✅ C++ CMake tools for Windows

3. Click **Install**

---

### Step 4: Wait for Installation

- This will take 30-60 minutes
- You can minimize and do other work
- DO NOT close the installer

---

### Step 5: Restart Your Computer

After installation completes, **restart Windows**

---

### Step 6: Verify Installation

After restart, open PowerShell and run:
```powershell
where.exe link.exe
```

You should see a path like:
```
C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\...\link.exe
```

---

### Step 7: Build Desktop App

```powershell
cd "D:\VASANTH\Final year\Subspace\wispr-clone"
npm run tauri build
```

---

## ⏰ Timeline:

- Download: 5-10 minutes
- Installation: 30-60 minutes
- Restart: 2 minutes
- Build: 10-15 minutes

**Total: ~1-1.5 hours**

---

## 🎯 While You Wait:

During the installation, you can:
- ✅ Get your Deepgram API key
- ✅ Plan your demo video script
- ✅ Test the live web app
- ✅ Review the VIDEO-SCRIPT.md

---

## ❌ If Installation Fails:

Don't worry! Your web version + live deployment is already excellent.

Just move on to recording the demo video.

---

## 🚀 Ready?

1. Download: https://aka.ms/vs/17/release/vs_BuildTools.exe
2. Run installer
3. Select "Desktop development with C++"
4. Install
5. Restart
6. Come back and tell me when done!

I'll be here to help with the build after installation completes! 👍
