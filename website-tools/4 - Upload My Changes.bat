@echo off
rem Double-click to run. What it does is explained in WEBSITE-EDITING-GUIDE.md.
title Solar Gators Website - Upload My Changes
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0website-tools.ps1" upload
echo.
pause
