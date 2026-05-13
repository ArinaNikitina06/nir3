"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/course-card";
import type { Course } from "@/types/course";

const mockCourses: Course[] = [
  {
    id: "c-1",
    title: "Основы Data Science",
    description: "Python, Pandas, визуализация и базовые модели.",
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
    description: "SSR/SSG, Route Handlers и архитектура приложения.",
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

export function AllCoursesPage() {
  // Client/UI state: фильтры, сортировка, поиск
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"All" | Course["level"]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockCourses.filter((c) => {
      if (level !== "All" && c.level !== level) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, level]);

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Каталог курсов</h1>
        <p className="text-slate-600">
          Изучите курсы по дизайну, разработке и анализу данных.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm sm:max-w-md"
          placeholder="Поиск курсов, навыков или преподавателей"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((v) => {
            const active = level === (v as any);
            const label =
              v === "All" ? "Все" : v === "Beginner" ? "Начальный" : v === "Intermediate" ? "Средний" : "Продвинутый";
            return (
              <button
                key={v}
                type="button"
                onClick={() => setLevel(v as any)}
                className={[
                  "rounded-full border px-3 py-1 text-sm",
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

