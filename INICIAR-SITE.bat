@echo off
chcp 65001 >nul
title AURYX MEDIA - Site
color 0A

cd /d "%~dp0"

echo.
echo  AURYX MEDIA - Abrindo site...
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo  [ERRO] Node.js NAO instalado!
    echo.
    echo  1. Acesse: https://nodejs.org
    echo  2. Baixe a versao LTS
    echo  3. Instale e REINICIE o computador
    echo  4. Clique neste arquivo de novo
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo  Instalando... primeira vez pode demorar 2 minutos.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo  [ERRO] Falha na instalacao.
        pause
        exit /b 1
    )
    echo.
)

REM Libera porta 3000 se estava travada
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

node scripts\iniciar-site.js

pause
