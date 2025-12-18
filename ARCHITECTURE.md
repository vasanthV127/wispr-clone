# Architecture Documentation

## Overview

This application follows a clean, layered architecture with clear separation of concerns between the UI layer, audio capture logic, and transcription service integration.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│                    (React Components)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           VoiceRecorder Component                    │   │
│  │  - Push-to-talk UI                                  │   │
│  │  - Recording controls                               │   │
│  │  - Transcription display                            │   │
│  │  - Statistics & download                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                   Audio Capture Layer                        │
│                 (Web Audio API + MediaRecorder)              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  - Microphone permission handling                   │   │
│  │  - Audio stream capture                             │   │
│  │  - Audio encoding (WebM)                            │   │
│  │  - Chunk management                                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                 Transcription Service Layer                  │
│                      (Deepgram API)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  - API authentication                               │   │
│  │  - Audio streaming                                  │   │
│  │  - Response parsing                                 │   │
│  │  - Error handling                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    Desktop Runtime Layer                     │
│                         (Tauri)                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  - Rust backend                                     │   │
│  │  - Native window management                         │   │
│  │  - System integration                               │   │
│  │  - Cross-platform support                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. UI Layer (`src/components/VoiceRecorder.jsx`)

**Responsibilities:**
- Render user interface components
- Handle user interactions (clicks, keyboard events)
- Display transcription results
- Show statistics and controls

**Key Features:**
- Push-to-talk button with visual feedback
- Keyboard shortcut handling (`Ctrl+Space`)
- Real-time statistics (word count, character count)
- Download and copy functionality
- Error message display

**State Management:**
```javascript
- isRecording: boolean          // Recording state
- transcription: string         // Accumulated text
- error: string                 // Error messages
- isProcessing: boolean         // Processing state
- recordingDuration: number     // Duration tracking
```

### 2. Audio Capture Layer

**Technologies:**
- `navigator.mediaDevices.getUserMedia()` - Microphone access
- `MediaRecorder API` - Audio recording
- WebM codec - Audio encoding

**Flow:**
```
User clicks → Request mic permission → Create MediaRecorder → 
Start recording → Collect audio chunks → Stop recording → 
Create blob → Send to transcription
```

**Audio Configuration:**
```javascript
{
  audio: {
    echoCancellation: true,    // Reduce echo
    noiseSuppression: true,    // Reduce background noise
    sampleRate: 16000          // Optimized for speech
  }
}
```

### 3. Transcription Service Integration

**API:** Deepgram Nova-2 Model

**Request Flow:**
```
Audio Blob → HTTP POST → Deepgram API → 
JSON Response → Parse transcript → Update UI
```

**API Configuration:**
```
Endpoint: https://api.deepgram.com/v1/listen
Model: nova-2
Parameters: smart_format=true
Authentication: Token-based
```

**Error Handling:**
- Network failures
- API errors (4xx, 5xx)
- Empty transcriptions
- Permission denials

### 4. Desktop Runtime (Tauri)

**Backend (`src-tauri/src/`):**
- `main.rs` - Application entry point
- `lib.rs` - Core Tauri functionality
- `tauri.conf.json` - App configuration

**Features:**
- Native window creation
- System tray integration (ready)
- Auto-updater (ready)
- File system access (ready)

**Build Output:**
- Windows: `.exe` (~10MB)
- macOS: `.dmg` / `.app`
- Linux: `.AppImage` / `.deb`

## Data Flow

### Recording Workflow

```
1. User Action
   ↓
2. Request Microphone Permission
   ↓
3. Create Audio Stream
   ↓
4. Initialize MediaRecorder
   ↓
5. Start Recording (visual feedback)
   ↓
6. Collect Audio Chunks
   ↓
7. User Stops Recording
   ↓
8. Stop MediaRecorder
   ↓
9. Create Audio Blob
   ↓
10. Send to Deepgram API
    ↓
11. Receive Transcription
    ↓
12. Update UI with Text
    ↓
13. Show Statistics
```

## Design Decisions

### 1. Technology Choices

**Tauri over Electron:**
- ✅ Smaller bundle size (~10MB vs ~100MB)
- ✅ Better performance (Rust backend)
- ✅ Lower memory usage
- ✅ Better security model

**React for UI:**
- ✅ Component-based architecture
- ✅ Efficient re-rendering
- ✅ Rich ecosystem
- ✅ Familiar to most developers

**Deepgram Nova-2:**
- ✅ High accuracy
- ✅ Low latency
- ✅ Smart formatting
- ✅ Good pricing

### 2. State Management

**Why useState over Redux:**
- Simple application state
- No complex state sharing
- Better performance for this use case
- Easier to understand and maintain

### 3. Audio Processing

**WebM Format:**
- ✅ Browser support
- ✅ Good compression
- ✅ Compatible with Deepgram
- ✅ Low overhead

**Chunk Collection:**
- Collect all chunks before sending
- Ensures complete audio capture
- Simplifies error handling

### 4. Error Handling Strategy

**Graceful Degradation:**
- Clear error messages
- User-friendly explanations
- Actionable suggestions
- No crashes on errors

## Performance Considerations

### 1. Audio Capture
- Optimized sample rate (16kHz for speech)
- Efficient codec (WebM)
- Minimal processing overhead

### 2. API Calls
- Single API call per recording
- Efficient blob handling
- Proper cleanup of resources

### 3. UI Updates
- React's efficient re-rendering
- Minimal state updates
- Debounced statistics calculations

## Security Considerations

### 1. API Key Management
- Environment variables (`.env`)
- Never committed to repository
- Client-side only (web version)

### 2. Permissions
- Explicit microphone permission request
- Clear permission denial handling
- No unnecessary permissions

### 3. Data Privacy
- No audio storage
- Direct API communication
- No third-party analytics

## Scalability & Extensions

### Future Enhancements

**1. Streaming Transcription:**
- Use Deepgram WebSocket API
- Real-time text updates
- Lower perceived latency

**2. Multi-language Support:**
- Language detection
- Multiple language options
- Translation capabilities

**3. Advanced Features:**
- Voice commands
- Custom vocabulary
- Speaker diarization
- Punctuation control

**4. Local Storage:**
- Save transcription history
- Export to multiple formats
- Cloud sync option

## Known Limitations

1. **Browser Compatibility:**
   - Requires modern browser with MediaRecorder API
   - WebM support required

2. **Audio Quality:**
   - Dependent on microphone quality
   - Background noise affects accuracy

3. **Network Dependency:**
   - Requires internet connection
   - API latency varies

4. **API Limits:**
   - Free tier limitations
   - Rate limiting considerations

## Testing Strategy

### Manual Testing
- ✅ Microphone permission flows
- ✅ Recording start/stop
- ✅ Transcription accuracy
- ✅ Error scenarios
- ✅ Keyboard shortcuts
- ✅ Download/copy functions

### Browser Testing
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS)

### Desktop Testing
- ✅ Windows build
- ⏳ macOS build (pending)
- ⏳ Linux build (pending)

## Deployment Architecture

### Web Deployment (Vercel)
```
GitHub Repository → Vercel Build → 
Static Assets → CDN → User Browser
```

**Benefits:**
- Automatic deployments
- Global CDN
- HTTPS by default
- Easy environment variables

### Desktop Distribution
```
Source Code → Tauri Build → 
Native Binary → Release → User Download
```

**Benefits:**
- Native performance
- Offline capable (after API integration)
- System integration
- Auto-updates ready

## Conclusion

This architecture prioritizes:
- **Simplicity** - Easy to understand and maintain
- **Separation of Concerns** - Clear component boundaries
- **Scalability** - Ready for future enhancements
- **User Experience** - Fast, reliable, intuitive

The modular design allows for easy testing, debugging, and extension while maintaining code quality and performance.
