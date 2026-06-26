@echo off
chcp 65001 >nul
title AURYX MEDIA - Abrir no VS Code

cd /d "%~dp0"

where code >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  VS Code nao encontrado no PATH.
    echo.
    echo  Abra manualmente:
    echo  1. Abra o VS Code
    echo  2. Arquivo - Abrir Pasta
    echo  3. Selecione esta pasta: %~dp0
    echo.
    pause
    exit /b 1
)

code "%~dp0"
echo  Pasta aberta no VS Code!
timeout /t 2 >nul
