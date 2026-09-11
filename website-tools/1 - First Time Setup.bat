@echo off
rem Double-click to run. What it does is explained in WEBSITE-EDITING-GUIDE.md.
title Solar Gators Website - First Time Setup
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0website-tools.ps1" setup
echo.
pause
