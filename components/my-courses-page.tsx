"use client";

import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import type { Course } from "@/types/course";
import { useMemo, useState } from "react";

const mockMyCourses: Course[] = [
  {
    id: "c-continue-1",
    title: "Продвинутые паттерны React",
    description: "Компонентные паттерны, состояние и оптимизация.",
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
    tags: ["figma", "ui"]
  }
];

type Tab = "all" | "in_progress" | "completed";

export function MyCoursesPage() {
  const [tab, setTab] = useState<Tab>("all");

  const filtered = useMemo(() => {
    if (tab === "completed") return [];
    return mockMyCourses;
  }, [tab]);

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">Моё обучение</h1>
        <p className="text-[var(--muted)]">Продолжайте с того места, где остановились.</p>
      </div>

      <div className="border-b border-[var(--border)]">
        <div className="flex gap-2 sm:gap-8">
          {(
            [
              { key: "all" as const, label: "Все курсы" },
              { key: "in_progress" as const, label: "В процессе" },
              { key: "completed" as const, label: "Завершённые" }
            ] as const
          ).map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative pb-3 text-sm font-medium transition ${
                  active ? "text-navy" : "text-[var(--muted)] hover:text-navy"
                }`}
              >
                {label}
                {active ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-navy" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "completed" ? (
        <p className="rounded-2xl border border-dashed border-[var(--border)] bg-slate-50 py-12 text-center text-sm text-[var(--muted)]">
          Завершённых курсов пока нет — загляните в{" "}
          <Link href="/courses" className="font-semibold text-navy underline">
            каталог
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, idx) => {
            const progress = idx === 0 ? 65 : 12;
            return (
              <article
                key={`${tab}-${course.id}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={course.imageUrl} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {course.category}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-navy">{course.title}</h2>
                  <div className="mt-4 flex-1">
                    <div className="flex items-center justify-between text-xs font-medium text-[var(--muted)]">
                      <span>Прогресс</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-navy" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-navy py-2.5 text-sm font-semibold text-white transition hover:bg-navy-hover"
                  >
                    Продолжить
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
