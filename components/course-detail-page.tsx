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

export function CourseDetailPage({ courseId }: { courseId: string }) {
  const course = useMemo(() => mockCourses.find((c) => c.id === courseId) ?? null, [courseId]);

  if (!course) {
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
    <section className="space-y-10">
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

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{course.title}</h1>
          {course.description ? (
            <p className="max-w-2xl leading-relaxed text-[var(--muted)]">{course.description}</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            <span>{Math.round(course.durationMinutes / 60)} ч</span>
            <span>·</span>
            <span>{course.level}</span>
            <span>·</span>
            <span>{course.rating.toFixed(1)}★</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft">
            <div className="relative aspect-video bg-slate-900">
              {course.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="" src={course.imageUrl} className="h-full w-full object-cover opacity-90" />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-navy/30">
                <button
                  type="button"
                  className="grid size-16 place-items-center rounded-full bg-white/95 text-navy shadow-lg transition hover:scale-105"
                  aria-label="Смотреть введение"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <button
                type="button"
                className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy-hover"
              >
                Записаться
              </button>

              <div>
                <p className="text-sm font-semibold text-navy">Что вы узнаете</p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  <li className="flex gap-2">
                    <span className="text-navy">✓</span>
                    Структура модулей и практические задания
                  </li>
                  <li className="flex gap-2">
                    <span className="text-navy">✓</span>
                    Доступ к материалам на весь период обучения
                  </li>
                  <li className="flex gap-2">
                    <span className="text-navy">✓</span>
                    Сертификат по окончании курса
                  </li>
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
