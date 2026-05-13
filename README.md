# НИР3

Прототип веб-интерфейса платформы курсов с персональными рекомендациями: Next.js (App Router), Prisma, NextAuth.

Макет в Figma: https://www.figma.com/design/XQiGCFwKH7yWHQwnbhJIoK/Untitled?node-id=0-1

Итоговый текст работы: [docs/NIR3-Nikitina-final.pdf](docs/NIR3-Nikitina-final.pdf).

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
