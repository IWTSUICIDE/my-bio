Set-Location "C:\Scripts"
Write-Host "🔄 Синхронизация с GitHub..." -ForegroundColor Cyan
git add .
$msg = Read-Host "💬 Комментарий к обновлению (или нажмите Enter для авто)"
if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "auto: update $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
git commit -m $msg
git push origin master
Write-Host "✅ Готово! Сайт обновится на https://iwtsuicide.github.io/my-bio через 1-2 минуты" -ForegroundColor Green
Start-Sleep -Seconds 3