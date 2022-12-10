#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог
cd dist

# инициализация репозитория и загрузка кода в Github
git init
git -add -A
git commit -m 'deploy'

git push -f git@github.com:ghosttim/vue-app.git master:gh-pages

cd -