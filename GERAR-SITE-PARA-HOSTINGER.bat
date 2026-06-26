@echo off
chcp 65001 >nul
title AURYX MEDIA - Gerar site para Hostinger
color 0E

echo.
echo  ========================================
echo    AURYX MEDIA - Preparar para Hostinger
echo  ========================================
echo.
echo  Isso vai criar a pasta OUT com o site pronto
echo  para enviar ao Hostinger (public_html).
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [ERRO] Node.js nao encontrado! Instale em https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo  Instalando dependencias...
    call npm install
)

echo  Gerando site... aguarde alguns minutos...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo  [ERRO] Falha ao gerar o site. Veja a mensagem acima.
    pause
    exit /b 1
)

echo.
echo  ========================================
echo    SUCESSO!
echo  ========================================
echo.
echo  A pasta com o site esta em:
echo  %~dp0out
echo.
echo  PROXIMO PASSO no Hostinger:
echo  1. Entre em hpanel.hostinger.com
echo  2. Arquivos - Gerenciador de Arquivos
echo  3. Abra a pasta public_html
echo  4. Apague o conteudo antigo (se houver)
echo  5. Envie TUDO que esta dentro da pasta OUT
echo  6. Acesse seu dominio no navegador
echo.

if exist "out" (
    explorer "%~dp0out"
)

pause
