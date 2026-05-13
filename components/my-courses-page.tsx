"use client";

import { CourseCard } from "@/components/course-card";
import type { Course } from "@/types/course";
import { useMemo, useState } from "react";

const mockMyCourses: Course[] = [
  {
    id: "c-1",
    title: "Продвинутые паттерны React",
    description: "Компонентные паттерны, состояние и оптимизация.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
    category: "Разработка",
    level: "Intermediate",
    durationMinutes: 520,
    priceRub: 0,
    rating: 4.8,
    tags: ["react", "patterns"],
  },
  {
    id: "c-2",
    title: "Мастерство Figma",
    description: "Auto Layout, компоненты и прототипирование.",
    imageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=1200&q=60",
    category: "Дизайн",
    level: "Beginner",
    durationMinutes: 300,
    priceRub: 0,
    rating: 4.6,
    tags: ["figma", "ui"],
  },
];

export function MyCoursesPage() {
  const [tab, setTab] = useState<"in_progress" | "saved" | "completed">(
    "in_progress"
  );

  const filtered = useMemo(() => {
    // Демо: показываем одинаковый список; в реальном приложении — фильтрация по Enrollment/Progress/Bookmark.
    return mockMyCourses;
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Моё обучение</h1>
          <p className="text-slate-600">Продолжайте с того места, где остановились.</p>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {[
            { key: "in_progress", label: "В процессе" },
            { key: "saved", label: "Сохранённые" },
            { key: "completed", label: "Завершённые" },
          ].map((t) => {
            const active = tab === (t.key as any);
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key as any)}
                className={[
                  "pb-3 text-sm",
                  active
                    ? "border-b-2 border-slate-900 font-medium text-slate-900"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {filtered.map((course, idx) => {
          const progress = tab === "in_progress" ? (idx === 0 ? 65 : 12) : tab === "completed" ? 100 : 0;
          const actionLabel =
            tab === "in_progress" ? (idx === 0 ? "Продолжить курс" : "Начать урок") : tab === "saved" ? "Открыть" : "Пересмотреть";

          return (
            <div key={`${tab}-${course.id}`} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {course.category}
                </div>
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                  aria-label="Play"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 text-slate-700"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="mt-3">
                <CourseCard course={course} />
              </div>

              <div className="mt-4 text-xs text-slate-500">Прогресс</div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded bg-slate-100">
                <div
                  className="h-2 rounded bg-slate-900"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
              >
                {actionLabel}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500">
        Данные в реальной версии приходят из <code className="rounded bg-slate-100 px-1">Enrollment</code> и{" "}
        <code className="rounded bg-slate-100 px-1">Progress</code>.
      </p>
    </section>
  );
}

