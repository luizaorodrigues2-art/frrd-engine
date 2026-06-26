@echo off
chcp 65001 >nul
title AURYX MEDIA - Abrir no navegador

echo Abrindo http://localhost:3000 ...
start "" "http://localhost:3000"
timeout /t 2 >nul
