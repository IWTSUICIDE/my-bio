@echo off
chcp 1251 >nul
cd /d "C:\Scripts"

echo.
echo === BIO Deploy ===
echo.
echo Choose action:
echo [1] Open local preview
echo [2] Deploy to GitHub
echo [3] Exit
set /p choice=Enter (1/2/3): 

if "%choice%"=="1" goto preview
if "%choice%"=="2" goto deploy
if "%choice%"=="3" goto end
goto end

:preview
start "" "index.html"
goto end

:deploy
echo.
echo Syncing with GitHub...
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Scripts\update-version.ps1"
if %ERRORLEVEL% neq 0 (
  echo ❌ Version update failed
  goto end
)

git config --global credential.helper wincred
git add .
set /p msg=Comment (or Enter for auto): 
if "%msg%"=="" set msg=chore: auto-update
git commit -m "%msg%"
git push origin main
echo Done! Deployed
goto end

:end
pause >nul