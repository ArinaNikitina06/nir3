# Материалы к НИР (веб-часть)

Здесь лежат текст работы в Markdown, инструкции по оформлению и черновики. Само приложение — в корне репозитория (`app/`, `components/`, `lib/`).

## Стек (по `package.json`)

- Next.js 15, React 19, TypeScript
- Tailwind CSS, PostCSS
- Prisma, PostgreSQL
- NextAuth.js

## Запуск приложения из корня репозитория

```bash
npm install
npx prisma generate
npm run dev
```

Нужны переменные окружения для БД и NextAuth (см. корневой `README.md`).

## Полезные файлы в этой папке

- `NIR_Текст_работы*.md` — варианты текста
- `NIR_Инструкция_по_оформлению.md` — требования к оформлению
- `QUICK_START.md` — кратко про установку и БД
