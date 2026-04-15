=== ПЕРВЫЙ ЗАПУСК (сделать один раз) ===

1. Откройте PowerShell в папке C:\Scripts
2. Выполните по очереди:

git init
git remote add origin https://github.com/IWTSUICIDE/my-bio.git
git add .
git commit -m "initial: site launch"
git push -u origin master

3. Готово! Теперь можно использовать:
   - задеплоить.bat (двойной клик)
   - или deploy.ps1 (ПКМ → Выполнить с PowerShell)

=== Если спросит логин/пароль ===
- Логин: ваш ник на GitHub (IWTSUICIDE)
- Пароль: НЕ от аккаунта, а Personal Access Token
  Создать: https://github.com/settings/tokens
  Права: repo, workflow
  Скопировать и вставить вместо пароля

=== GitHub Pages ===
Убедитесь в настройках репозитория:
Settings → Pages → Build and deployment → Branch: master, folder: / (root)

Сайт будет доступен: https://iwtsuicide.github.io/my-bio
