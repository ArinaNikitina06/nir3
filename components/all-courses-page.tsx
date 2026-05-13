"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/course-card";
import type { Course } from "@/types/course";

const mockCourses: Course[] = [
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
    description: "Python, Pandas, визуализация и базовые модели.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
    category: "IT",
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
    category: "IT",
    level: "Intermediate",
    durationMinutes: 240,
    priceRub: 1990,
    rating: 4.6,
    tags: ["react", "nextjs"]
  },
  {
    id: "c-mkt",
    title: "Digital-маркетинг",
    description: "Воронки, контент и аналитика кампаний.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=60",
    category: "Маркетинг",
    level: "Beginner",
    durationMinutes: 300,
    priceRub: 0,
    rating: 4.5,
    tags: ["smm"]
  },
  {
    id: "c-bus",
    title: "Управление продуктом",
    description: "Roadmap, метрики и работа со стейкхолдерами.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=60",
    category: "Управление",
    level: "Intermediate",
    durationMinutes: 420,
    priceRub: 2490,
    rating: 4.8,
    tags: ["product"]
  }
];

const chips: { key: string; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "Дизайн", label: "Дизайн" },
  { key: "Маркетинг", label: "Маркетинг" },
  { key: "IT", label: "IT" },
  { key: "Управление", label: "Управление" }
];

export function AllCoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockCourses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        (c.description?.toLowerCase().includes(q) ?? false) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">Каталог курсов</h1>
        <p className="text-[var(--muted)]">Выберите направление и начните учиться в удобном темпе.</p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block min-w-0 flex-1 lg:max-w-md">
          <span className="sr-only">Поиск</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 py-2.5 pl-4 pr-4 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            placeholder="Поиск курсов…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {chips.map(({ key, label }) => {
            const active = category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-[var(--border)] bg-white text-navy hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} variant="catalog" />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-[var(--muted)]">
          Ничего не найдено.{" "}
          <button type="button" className="font-semibold text-navy underline" onClick={() => { setQuery(""); setCategory("all"); }}>
            Сбросить фильтры
          </button>
        </p>
      ) : null}
    </section>
  );
}
