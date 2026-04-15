@echo off
chcp 1251 >nul
cd /d "C:\Scripts"
echo Syncing with GitHub...
git add .
set /p msg=Comment (or press Enter for auto): 
if "%msg%"=="" set msg=auto: update %date% %time%
git commit -m "%msg%"
git push origin main
echo Done! Site will update at https://iwtsuicide.github.io/my-bio
pause