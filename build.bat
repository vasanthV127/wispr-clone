@echo off
echo Building Wispr Voice-to-Text Desktop App...
echo.
echo This may take several minutes...
echo.

REM Add Rust to PATH for this session
set PATH=%USERPROFILE%\.cargo\bin;%PATH%

REM Build the Tauri app
npm run tauri build

echo.
echo Build complete! Check src-tauri\target\release\ for the executable.
pause
