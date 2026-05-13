"use client";

import Link from "next/link";
import { useMemo } from "react";
import { RecommendationSection } from "@/components/recommendation-section";
import type { Course } from "@/types/course";

const mockCourses: Course[] = [
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
  const course = useMemo(
    () => mockCourses.find((c) => c.id === courseId) ?? null,
    [courseId]
  );

  if (!course) {
    return (
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Курс не найден</h1>
        <Link className="text-slate-700 underline" href="/courses">
          Вернуться в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold">{course.title}</h1>
          {course.description ? (
            <p className="max-w-2xl text-slate-600">{course.description}</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
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
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
            {course.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" src={course.imageUrl} className="h-full w-full object-cover" />
            ) : null}
          </div>

          <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Записаться
          </button>

          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ Доступ к материалам</li>
            <li>✓ Практические задания</li>
            <li>✓ Сертификат по окончании</li>
          </ul>

          <p className="text-xs text-slate-500">
            Запись в прототипе:{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5">
              /api/courses/enroll
            </code>
            .
          </p>
        </aside>
      </div>

      <RecommendationSection title="Похожие курсы" seedCourseId={course.id} />
    </section>
  );
}

