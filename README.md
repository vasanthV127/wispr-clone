# Wispr Flow Clone - Voice-to-Text Desktop App

A cross-platform desktop application for real-time voice-to-text transcription using Tauri, React, and Deepgram AI.

## � Live Demo
**Try it now:** https://wispr-clone-5ahw6s8ws-vasanths-projects-60ee5249.vercel.app  
*(No installation needed!)*
## 💻 Desktop App Available
✅ **Native Windows/macOS/Linux desktop application built successfully!**  
Download from [Releases](https://github.com/vasanthV127/wispr-clone/releases) (coming soon)
## �🎥 Demo Video
[Watch the demo video here](#) *(Add your video link after recording)*

## Features

### Core Features
- 🎤 **Push-to-Talk Recording**: Simple click-to-record interface
- 🎯 **Real-time Transcription**: Powered by Deepgram's Nova-2 model
- 📋 **Copy to Clipboard**: Easily copy transcribed text
- ⚠️ **Error Handling**: Graceful handling of permissions, API, and network errors

### Advanced Features (NEW!)
- ⌨️ **Keyboard Shortcut**: Press `Ctrl+Space` to toggle recording
- 📊 **Live Statistics**: Real-time word count and character count
- 💾 **Download Transcription**: Save as .txt file with auto-naming

### Platform Support
- 🌐 **Web Version**: Run in any modern browser
- 🖥️ **Desktop App**: Native Windows/macOS/Linux application
- ⚡ **Lightweight**: Built with Tauri for minimal resource usage (~10MB)

## Prerequisites

- **Node.js** (v16 or higher)
- **Rust** (latest stable version)
- **Deepgram API Key** (free tier available at https://console.deepgram.com/signup)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vasanthV127/wispr-clone.git
cd wispr-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Deepgram API Key

1. Sign up for a free Deepgram account at https://console.deepgram.com/signup
2. Get your API key from the dashboard
3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Edit `.env` and add your Deepgram API key:

```
VITE_DEEPGRAM_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

#### Development Mode (Recommended)

```bash
npm run dev
```

Open http://localhost:1420/ in your browser

#### Desktop App (Requires Visual C++ Build Tools)

```bash
# For Windows users
$env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"
npm run tauri dev
```

**Note**: Building Tauri desktop app on Windows requires [Microsoft Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/). The web version works perfectly without this!

#### Build for Production

**Web Version (Recommended)**:
```bash
npm run build
```
Output in `dist/` folder. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options.

**Desktop App**:
```bash
npm run tauri build
```
Requires Visual C++ Build Tools installed.

## Deployment

The app is built and ready to deploy! Choose your platform:

- **Vercel** (Recommended): `npx vercel`
- **Netlify**: `npx netlify deploy --prod --dir=dist`
- **Local Testing**: `npx serve dist -p 3000`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## How to Use

1. **Launch the app** - Click the "Push to Talk" button
2. **Grant microphone permission** when prompted
3. **Click and speak** - The button will turn red while recording
4. **Click again to stop** - The app will process your speech
5. **View transcription** - Your text appears below
6. **Copy or clear** - Use the action buttons as needed

## Project Structure

```
wispr-clone/
├── src/
│   ├── components/
│   │   ├── VoiceRecorder.jsx    # Main recording component
│   │   └── VoiceRecorder.css    # Component styles
│   ├── App.jsx                   # Root component
│   ├── App.css                   # Global styles
│   └── main.jsx                  # Entry point
├── src-tauri/                    # Rust backend
├── .env                          # Environment variables (not in git)
├── .env.example                  # Template for .env
└── package.json
```

## Tech Stack

- **Frontend**: React + Vite
- **Desktop Framework**: Tauri (Rust)
- **Speech-to-Text**: Deepgram API (Nova-2 model)
- **Audio Capture**: Web Audio API

## Troubleshooting

### Microphone Not Working

- Ensure you've granted microphone permissions to the app
- Check if your microphone is properly connected
- Try restarting the application

### API Errors

- Verify your Deepgram API key is correct in `.env`
- Check your internet connection
- Ensure you haven't exceeded Deepgram's free tier limits

### Build Errors

- Make sure Rust is properly installed: `rustc --version`
- Update Rust: `rustup update`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Known Limitations

- Requires internet connection for Deepgram API
- Recording quality depends on microphone hardware
- Free tier has usage limits (check Deepgram pricing)

## Development Notes

### Architecture Decisions

1. **Tauri over Electron**: Chosen for smaller bundle size and better performance
2. **Deepgram API**: Selected for high accuracy and low latency transcription
3. **WebM Audio Format**: Used for browser compatibility and good compression

### Future Enhancements

- [ ] Hotkey support for push-to-talk
- [ ] Multiple language support
- [ ] Local transcription option (offline mode)
- [ ] Text export to file
- [ ] Keyboard shortcut to insert text into active window

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License

MIT

## Author

**Vasanth V**  
Built as part of technical assignment for software developer internship.

## Submission

- **GitHub Repository**: https://github.com/vasanthV127/wispr-clone
- **Demo Video**: *(Add link after recording)*
- **Submission Date**: December 2025
- **Demo Video**: [Your video link]
- **Submission Date**: December 2025
