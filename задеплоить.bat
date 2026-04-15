@echo off
cd /d "C:\Scripts"
echo 🔄 Синхронизация с GitHub...
git add .
set /p msg="💬 Комментарий к обновлению (или нажмите Enter для авто): "
if "%msg%"=="" set msg=auto: update %date% %time%
git commit -m "%msg%"
git push origin master
echo ✅ Готово! Сайт обновится на https://iwtsuicide.github.io/my-bio через 1-2 минуты.
pause