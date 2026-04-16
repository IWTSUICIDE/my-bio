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

for /f "tokens=2 delims=<>" %%a in ('findstr "app-version" index.html') do set "ver=%%a"
echo Current: %ver%

for /f "tokens=1,2,3 delims=." %%a in ("%ver%") do (
  set "major=%%a"
  set "minor=%%b"
  set "patch=%%c"
)
set /a patch+=1
set "newver=%major%.%minor%.%patch%"
echo New: %newver%

powershell -Command "(gc index.html) -replace '<span id=\"app-version\">%ver%</span>', '<span id=\"app-version\">%newver%</span>' | Out-File index.html -Encoding UTF8"
powershell -Command "(gc style.css) -replace '--version: \"%ver%\"', '--version: \"%newver%\"' | Out-File style.css -Encoding UTF8"
powershell -Command "(gc index.html) -replace 'style.css\?v=%ver%', 'style.css?v=%newver%' | Out-File index.html -Encoding UTF8"

git config --global credential.helper wincred
git add .
set /p msg=Comment (or Enter for auto): 
if "%msg%"=="" set msg=chore: v%newver% auto-update
git commit -m "%msg%"
git push origin main
echo Done! v%newver% deployed
goto end

:end
pause >nul