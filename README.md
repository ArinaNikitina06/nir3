# НИР3

Веб-приложение для рекомендаций учебных курсов (Next.js, NextAuth, Prisma). Репозиторий объединяет исходный код и материалы научно-исследовательской работы.

## Целевой интерфейс

Макет в Figma: [Untitled — основной фрейм](https://www.figma.com/design/XQiGCFwKH7yWHQwnbhJIoK/Untitled?node-id=0-1&p=f&t=6IS10DiDLF6HnIBN-0).

## Итоговый отчёт

Файл: [`docs/NIR3-Nikitina-final.pdf`](docs/NIR3-Nikitina-final.pdf).

## Запуск

```bash
npm install
# создайте .env с переменными БД (DATABASE_URL) и NextAuth
npx prisma generate
npm run dev
```

Сборка: `npm run build`.
