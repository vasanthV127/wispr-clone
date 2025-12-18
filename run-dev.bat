@echo off
echo Starting Wispr Voice-to-Text App...
echo.
echo Make sure you have added your Deepgram API key to the .env file!
echo.

REM Add Rust to PATH for this session
set PATH=%USERPROFILE%\.cargo\bin;%PATH%

REM Start the development server
npm run dev

pause
