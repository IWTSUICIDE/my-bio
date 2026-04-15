@echo off
chcp 1251 >nul
cd /d "C:\Scripts"
echo Syncing with GitHub...

:: Auto-increment version
for /f "tokens=2 delims=[]" %%a in ('findstr /i "Version" index.html') do set "ver=%%a"
set "ver=%ver:Version =%"
set "ver=%ver:]=%"
for /f "tokens=1,2,3 delims=." %%a in ("%ver%") do set "major=%%a" & set "minor=%%b" & set "patch=%%c"
set /a patch+=1
set "newver=%major%.%minor%.%patch%"
echo Version: %ver% -^> %newver%

:: Update version in files
powershell -Command "(Get-Content index.html) -replace 'Version %ver%', 'Version %newver%' | Set-Content index.html"
powershell -Command "(Get-Content style.css) -replace '--version: \"%ver%\"', '--version: \"%newver%\"' | Set-Content style.css"
powershell -Command "(Get-Content index.html) -replace 'style.css\?v=%ver%', 'style.css?v=%newver%' | Set-Content index.html"

git config --global credential.helper wincred
git add .
set /p msg=Comment (or press Enter for auto): 
if "%msg%"=="" set msg=chore: v%newver% auto-update
git commit -m "%msg%"
git push origin main
echo Done! v%newver% deploying to https://iwtsuicide.github.io/my-bio
pause