@echo off
rem Double-click to run. What it does is explained in WEBSITE-EDITING-GUIDE.md.
title Solar Gators Website - Preview (close this window to stop)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0website-tools.ps1" preview
echo.
pause
