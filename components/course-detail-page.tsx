"use client";

import Link from "next/link";
import { useMemo } from "react";
import { RecommendationSection } from "@/components/recommendation-section";
import type { Course } from "@/types/course";

const mockCourses: Course[] = [
  {
    id: "c-continue-1",
    title: "Продвинутые паттерны React",
    description:
      "Курс для разработчиков, которые хотят уверенно проектировать интерфейсы и состояние в больших React-приложениях: композиция, производительность, тестирование и соглашения в команде.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
    category: "Разработка",
    level: "Intermediate",
    durationMinutes: 520,
    priceRub: 0,
    rating: 4.8,
    tags: ["react", "patterns"]
  },
  {
    id: "c-ui",
    title: "Основы UI-дизайна",
    description: "Композиция, типографика, цвет и интерфейсные паттерны.",
    imageUrl:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=60",
    category: "Дизайн",
    level: "Beginner",
    durationMinutes: 480,
    priceRub: 0,
    rating: 4.9,
    tags: ["figma", "ui"]
  },
  {
    id: "c-1",
    title: "Основы Data Science",
    description: "Базовые навыки работы с данными: Python, Pandas и визуализация.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
    category: "Data",
    level: "Beginner",
    durationMinutes: 360,
    priceRub: 0,
    rating: 4.7,
    tags: ["python", "pandas"]
  },
  {
    id: "c-2",
    title: "Next.js App Router",
    description: "Маршрутизация, серверные компоненты и best practices для Next.js.",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=60",
    category: "Web",
    level: "Intermediate",
    durationMinutes: 240,
    priceRub: 1990,
    rating: 4.6,
    tags: ["react", "nextjs"]
  }
];

type CourseDetailExtra = {
  /** Абзацы под заголовком */
  paragraphs: string[];
  /** Блок «Что вы узнаете» в сайдбаре */
  outcomes: string[];
  /** Программа: модули */
  modules: { title: string; lessons: string }[];
  /** Кому подойдёт курс */
  audience: string[];
  studentsLabel?: string;
};

const detailById: Record<string, CourseDetailExtra> = {
  "c-ui": {
    paragraphs: [
      "Курс знакомит с основами проектирования пользовательских интерфейсов: от визуальной иерархии и сеток до работы с цветом, типографикой и состояниями компонентов. Вы научитесь переводить задачу пользователя в понятный и предсказуемый экран.",
      "Практика построена вокруг реальных сценариев: лендинг продукта, форма записи, каталог курсов. Вы разберёте типичные паттерны (карточки, фильтры, навигацию) и соберёте макет в Figma с Auto Layout и компонентной структурой.",
      "По окончании вы сможете самостоятельно подготовить UI-спецификацию для разработки: отступы, размеры, состояния кнопок и список экранов для передачи в команду."
    ],
    outcomes: [
      "Строить сетку и иерархию на экране",
      "Подбирать типографику и цветовую палитру под бренд",
      "Собирать интерфейс из компонентов в Figma",
      "Описывать состояния: default, hover, error, disabled",
      "Готовить макеты к передаче в разработку"
    ],
    modules: [
      { title: "Введение: роль UI в продукте", lessons: "3 урока · 45 мин" },
      { title: "Композиция, сетка и отступы", lessons: "5 уроков · 2 ч" },
      { title: "Типографика и читаемость", lessons: "4 урока · 1.5 ч" },
      { title: "Цвет, контраст и доступность", lessons: "4 урока · 1.5 ч" },
      { title: "Компоненты и Auto Layout в Figma", lessons: "6 уроков · 3 ч" },
      { title: "Финальный проект: экран каталога", lessons: "2 урока · 2 ч" }
    ],
    audience: [
      "Начинающим дизайнерам и студентам профильных направлений",
      "Веб-разработчикам, которым нужно уверенно общаться с дизайном",
      "Продуктовым менеджерам, готовящим прототипы и ТЗ"
    ],
    studentsLabel: "2 400+ студентов"
  },
  "c-continue-1": {
    paragraphs: [
      "Разбираем композицию React-приложений: когда выносить логику в хуки, как избегать лишних ререндеров и как строить библиотеку UI-компонентов, которой удобно пользоваться в команде.",
      "Темы: контролируемые формы, асинхронные данные, разделение серверного и клиентского кода в Next.js, тестирование компонентов и соглашения по именованию и структуре папок."
    ],
    outcomes: [
      "Паттерны композиции компонентов",
      "Оптимизация производительности списков и форм",
      "Практики тестирования UI",
      "Сертификат по окончании"
    ],
    modules: [
      { title: "Архитектура UI-слоя", lessons: "4 урока" },
      { title: "Состояние и данные", lessons: "6 уроков" },
      { title: "Производительность", lessons: "3 урока" },
      { title: "Тесты и качество", lessons: "4 урока" }
    ],
    audience: ["Разработчикам с базовым знанием React", "Фронтенд-командам на Next.js"]
  },
  "c-1": {
    paragraphs: [
      "Практический вход в анализ данных: от установки окружения до первых графиков и простых моделей. Упор на чистый код и воспроизводимые ноутбуки."
    ],
    outcomes: ["Python и Pandas", "Визуализация", "Постановка задачи данных", "Сертификат"],
    modules: [
      { title: "Python для анализа", lessons: "5 уроков" },
      { title: "Pandas и таблицы", lessons: "6 уроков" },
      { title: "Визуализация", lessons: "4 урока" }
    ],
    audience: ["Новичкам в Data Science", "Аналитикам, переходящим к коду"]
  },
  "c-2": {
    paragraphs: [
      "Современный Next.js: App Router, серверные компоненты, маршруты API и деплой. Соберём учебный проект с нуля до рабочей сборки."
    ],
    outcomes: ["App Router", "Server Components", "Route Handlers", "Сборка и деплой"],
    modules: [
      { title: "Основы App Router", lessons: "5 уроков" },
      { title: "Данные и кэш", lessons: "4 урока" },
      { title: "Аутентификация и API", lessons: "5 уроков" }
    ],
    audience: ["Знакомым с React", "Бэкенд-разработчикам во фронт"]
  }
};

function levelRu(level: Course["level"]): string {
  switch (level) {
    case "Beginner":
      return "Начальный";
    case "Intermediate":
      return "Средний";
    case "Advanced":
      return "Продвинутый";
    default:
      return level;
  }
}

function priceLabel(priceRub: number): string {
  if (priceRub <= 0) return "Бесплатно";
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(
    priceRub
  );
}

function getDetail(courseId: string): CourseDetailExtra {
  return (
    detailById[courseId] ?? {
      paragraphs: [
        "Курс поможет системно пройти тему: от теории к практическим заданиям. Материалы доступны в удобном темпе, с обратной связью по ключевым работам."
      ],
      outcomes: [
        "Структурированная программа",
        "Практические задания",
        "Доступ к материалам после старта",
        "Сертификат по окончании"
      ],
      modules: [{ title: "Модуль 1 — основы", lessons: "Вводные уроки" }],
      audience: ["Широкой аудитории, интересующейся темой курса"]
    }
  );
}

export function CourseDetailPage({ courseId }: { courseId: string }) {
  const course = useMemo(() => mockCourses.find((c) => c.id === courseId) ?? null, [courseId]);
  const detail = useMemo(() => (course ? getDetail(course.id) : null), [course]);

  if (!course || !detail) {
    return (
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-navy">Курс не найден</h1>
        <Link className="text-sm font-medium text-navy underline" href="/courses">
          Вернуться в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-12">
      <nav className="text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-navy">
          Главная
        </Link>
        <span className="mx-2">›</span>
        <Link href="/courses" className="hover:text-navy">
          Каталог курсов
        </Link>
        <span className="mx-2">›</span>
        <span className="font-medium text-navy">{course.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
        <div className="min-w-0 space-y-8">
          <header className="space-y-4">
            <p className="text-sm font-medium text-[var(--muted)]">{course.category}</p>
            <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-[2rem] lg:text-[2.25rem] lg:leading-tight">
              {course.title}
            </h1>
            <p className="text-lg leading-relaxed text-[var(--muted)]">{course.description}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
              <span className="font-medium text-navy">{course.rating.toFixed(1)} ★</span>
              <span>·</span>
              <span>{Math.round(course.durationMinutes / 60)} ч материала</span>
              <span>·</span>
              <span>{levelRu(course.level)}</span>
              <span>·</span>
              <span>{priceLabel(course.priceRub)}</span>
              {detail.studentsLabel ? (
                <>
                  <span>·</span>
                  <span>{detail.studentsLabel}</span>
                </>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {course.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--border)] bg-slate-50 px-3 py-1 text-xs font-medium text-navy"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-2xl font-bold leading-snug text-navy">О курсе</h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[var(--muted)]">
              {detail.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-2xl font-bold leading-snug text-navy">Программа курса</h2>
            <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-card">
              {detail.modules.map((m, i) => (
                <li key={i} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="font-medium text-navy">
                      <span className="mr-2 text-sm font-normal text-[var(--muted)]">{i + 1}.</span>
                      {m.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-[var(--muted)]">{m.lessons}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-2xl font-bold leading-snug text-navy">Кому подойдёт</h2>
            <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--muted)]">
              {detail.audience.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-card">
            <div className="relative aspect-video bg-slate-900">
              {course.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" src={course.imageUrl} className="h-full w-full object-cover opacity-90" />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                <button
                  type="button"
                  className="grid size-16 place-items-center rounded-full bg-white/95 text-navy shadow-lg transition hover:scale-105"
                  aria-label="Смотреть введение к курсу"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/90">
                Вводное видео · 4 мин
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-[var(--muted)]">Стоимость</span>
                <span className="text-lg font-semibold text-navy">{priceLabel(course.priceRub)}</span>
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                Записаться на курс
              </button>

              <div>
                <p className="text-sm font-semibold text-navy">Что вы узнаете</p>
                <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
                  {detail.outcomes.map((line, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-0.5 shrink-0 text-navy">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <RecommendationSection title="Похожие курсы" seedCourseId={course.id} layout="horizontal" />
    </section>
  );
}
