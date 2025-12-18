import { useState, useRef, useEffect } from 'react';
import './VoiceRecorder.css';

function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // Deepgram API configuration
  const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY || '';

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError('');
      
      // Check if API key is configured
      if (!DEEPGRAM_API_KEY) {
        setError('Deepgram API key not configured. Please add VITE_DEEPGRAM_API_KEY to .env file');
        return;
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        await transcribeAudio();
        setIsProcessing(false);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError(`Microphone access denied: ${err.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      // Send audio to Deepgram
      const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/webm'
        },
        body: audioBlob
      });

      if (!response.ok) {
        throw new Error(`Deepgram API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.results?.channels?.[0]?.alternatives?.[0]?.transcript) {
        const newTranscription = result.results.channels[0].alternatives[0].transcript;
        setTranscription(prev => prev ? `${prev} ${newTranscription}` : newTranscription);
      } else {
        setError('No transcription received. Please try speaking again.');
      }
    } catch (err) {
      console.error('Transcription error:', err);
      setError(`Transcription failed: ${err.message}`);
    }
  };

  const copyToClipboard = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
    }
  };

  const clearTranscription = () => {
    setTranscription('');
    setError('');
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-container">
        <h1>🎙️ Wispr Voice-to-Text</h1>
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="controls">
          <button
            className={`record-button ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            {isRecording ? (
              <>
                <span className="pulse"></span>
                🔴 Recording... (Click to Stop)
              </>
            ) : isProcessing ? (
              '⏳ Processing...'
            ) : (
              '🎤 Push to Talk'
            )}
          </button>

          {transcription && (
            <div className="action-buttons">
              <button onClick={copyToClipboard} className="copy-button">
                📋 Copy Text
              </button>
              <button onClick={clearTranscription} className="clear-button">
                🗑️ Clear
              </button>
            </div>
          )}
        </div>

        {transcription && (
          <div className="transcription-output">
            <h3>Transcription:</h3>
            <div className="transcription-text">
              {transcription}
            </div>
          </div>
        )}

        {!transcription && !error && (
          <div className="instructions">
            <p>Click the button and speak to start transcribing</p>
            <p className="hint">Make sure your microphone is connected and permissions are granted</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceRecorder;
