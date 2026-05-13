# НИР3

Прототип веб-интерфейса платформы курсов с персональными рекомендациями: Next.js (App Router), Prisma, NextAuth.

Макет в Figma: https://www.figma.com/design/XQiGCFwKH7yWHQwnbhJIoK/Untitled?node-id=0-1

Итоговый текст работы: [docs/NIR3-Nikitina-final.pdf](docs/NIR3-Nikitina-final.pdf).

## Где ссылка на сам сайт (HTTPS), а не на код

- **Страница проекта на GitHub** (код, коммиты): [github.com/ArinaNikitina06/nir3](https://github.com/ArinaNikitina06/nir3) — это не «сайт из макета», а хранилище исходников.
- Адрес с окончанием **`.git`** (`…/nir3.git`) нужен программе **git** (`git clone`), в браузере по нему открывается тот же GitHub.

**Работающее приложение в браузере** появляется только после **деплоя** (публикации) Next.js на хостинг. Тогда хостинг выдаст ссылку вида `https://имя-проекта.vercel.app` или другой домен.

Удобный вариант для Next.js — [Vercel](https://vercel.com): войти через GitHub → Add New Project → выбрать репозиторий `nir3` → в настройках проекта указать переменные окружения (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — для продакшена в `NEXTAUTH_URL` укажите уже **URL сайта с Vercel**, например `https://nir3-xxx.vercel.app`). После деплоя Vercel покажет готовый HTTPS-адрес сайта.

Пока деплоя нет, интерфейс можно смотреть только **локально**: `npm run dev` → в браузере [http://localhost:3000](http://localhost:3000) (это не публичный HTTPS в интернете).

## Запуск

```bash
npm install
```

В корне нужен файл `.env` с `DATABASE_URL` и переменными NextAuth (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`).

```bash
npx prisma generate
npm run dev
```

Сборка: `npm run build`.

Дополнительные заметки и черновики лежат в каталоге `addinfo/`.
