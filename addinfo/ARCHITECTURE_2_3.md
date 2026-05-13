# Архитектура фронтенд‑приложения (раздел 2.3)

Ниже — краткая “проектная архитектура” прототипа рекомендательного интерфейса, привязанная к реальной структуре проекта `/Users/user/Desktop/NIR`.

## 1) Структура проекта и компонентов React

### Маршруты и страницы (Next.js App Router)

- **Публичные страницы и витрина**
  - `app/page.tsx` — главная (лента + секции рекомендаций)
  - `app/courses/page.tsx` — каталог курсов
  - `app/courses/[id]/page.tsx` — детальная страница курса

- **Пользовательские разделы**
  - `app/my-courses/page.tsx` — “Мои курсы”
  - `app/profile/page.tsx` — профиль/настройки
  - `app/profile/notifications/page.tsx` — уведомления (подраздел настроек)
  - `app/profile/billing/page.tsx` — оплата (подраздел настроек)
  - `app/profile/security/page.tsx` — безопасность (подраздел настроек)
  - `app/auth/signin/page.tsx`, `app/auth/signup/page.tsx` — вход/регистрация

### API‑слой (Route Handlers)

- `app/api/recommendations/route.ts` — получение рекомендаций
- `app/api/user/preferences/route.ts` — чтение/обновление предпочтений
- `app/api/courses/enroll/route.ts` — запись на курс
- `app/api/auth/[...nextauth]/route.ts` — NextAuth endpoint
- `app/api/auth/signup/route.ts` — регистрация (создание пользователя)

### Компоненты UI (React)

Компонентный слой выделен в `components/`:

- `components/home-page.tsx` — контейнер главной страницы
- `components/recommendation-section.tsx` — секция рекомендаций
- `components/all-courses-page.tsx` — контейнер каталога
- `components/course-card.tsx` — карточка курса (единица выбора)
- `components/course-detail-page.tsx` — контейнер детальной страницы курса
- `components/my-courses-page.tsx` — контейнер “Мои курсы”
- `components/navigation.tsx` — навигация

### Провайдеры и контекст (сессия)

- `components/providers.tsx` — подключение `SessionProvider` (NextAuth) для клиентских компонентов
- `app/layout.tsx` — оборачивает приложение в `Providers`

## 2) Концептуальная схема управления состоянием интерфейса

Для рекомендательного интерфейса удобно разделять состояния на 3 слоя:

### A. Session state (аутентификация)

- Источник: NextAuth (JWT session)
- Где живёт: `SessionProvider` в `components/providers.tsx`, конфигурация в `lib/auth.ts`
- Зачем: `userId` из сессии используется как ключ персонализации при запросах рекомендаций/предпочтений.

### B. Server state (данные с сервера)

Это данные, которые приходят из API и/или рассчитываются на сервере:

- каталог курсов (списки `Course`)
- рекомендации (список курсов + “reasons”)
- предпочтения пользователя (`UserPreference`)
- мои курсы/прогресс (`Enrollment`, `Progress`)

Обновление server state происходит через повторные запросы после действий пользователя
(лайк/скрытие/запись/смена предпочтений).

### C. Client/UI state (локальные состояния интерфейса)

Это состояния, не требующие сохранения на сервер:

- выбранные фильтры/сортировка/поисковая строка каталога
- раскрытие секций/локальные toggles
- состояния модалок/тостов/индикаторов

Обычно хранится в `useState`/`useReducer` внутри “контейнерных” компонентов страниц.
Если нужно разделять состояние между несколькими компонентами в пределах экрана — допустим React Context.

## 3) Ключевые модели данных

Модели определены в `prisma/schema.prisma` и используются через Prisma Client (`lib/db.ts`).

### Базовые сущности домена

- **`User`**
  - связи: `Enrollment[]`, `UserPreference[]`, `UserInteraction[]`, `Progress[]`

- **`Course`**
  - атрибуты выбора: `category`, `level`, `duration`, `price`, `rating`, `tags[]` и др.
  - связи: `Lesson[]`, `Enrollment[]`, `UserInteraction[]`

- **`UserPreference`** (явные предпочтения)
  - `category?`, `level?`, `interests[]`

- **`UserInteraction`** (неявные/явные сигналы)
  - `type` (например: `view`, `like`, `bookmark`, `search`, `enroll`)
  - `metadata` (JSON) — контекст (например, запрос поиска/фильтры/позиция в ленте)

- **`Enrollment`** и **`Progress`**
  - отражают запись на курс и ход обучения (в т.ч. % выполнения)

### Представление рекомендаций в интерфейсе (типизация)

- `types/recommendation.ts`
  - `RecommendationScore { courseId, score, reasons[] }`

### Где формируются рекомендации

- `lib/recommendations.ts` — функция `getPersonalizedRecommendations(userId, limit)`:
  - учитывает `UserPreference`, `UserInteraction`, `Enrollment`, свойства `Course`
  - формирует `reasons[]` для объяснимости (почему рекомендовано)

