@echo off
chcp 1251 >nul
cd /d "C:\Scripts"
echo 👁 Opening local preview...
start "" "index.html"
echo.
echo Choose action:
echo [1] Local only (fast)
echo [2] Local + deploy to GitHub
echo [3] Exit
set /p choice=Enter (1/2/3):
if "%choice%"=="1" goto end
if "%choice%"=="3" goto end
echo.
echo 🔄 Syncing with GitHub...
for /f "tokens=2 delims=[]" %%a in ('findstr /i "Version" index.html') do set "ver=%%a"
set "ver=%ver:Version =%"
set "ver=%ver:]=%"
for /f "tokens=1,2,3 delims=." %%a in ("%ver%") do set "major=%%a" & set "minor=%%b" & set "patch=%%c"
set /a patch+=1
set "newver=%major%.%minor%.%patch%"
echo Version: %ver% -^> %newver%
powershell -Command "(Get-Content index.html) -replace 'Version %ver%', 'Version %newver%' | Set-Content index.html"
powershell -Command "(Get-Content style.css) -replace '--version: \"%ver%\"', '--version: \"%newver%\"' | Set-Content style.css"
git config --global credential.helper wincred
git add .
set /p msg=Comment (or Enter for auto):
if "%msg%"=="" set msg=chore: v%newver% auto-update
git commit -m "%msg%"
git push origin main
echo ✅ Done! v%newver% at https://iwtsuicide.github.io/my-bio
:end
echo.
echo Press any key to exit...
pause