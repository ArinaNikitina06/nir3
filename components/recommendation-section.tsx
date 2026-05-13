"use client";

import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";
import type { RecommendedCourse } from "@/types/recommendation";

type Props = {
  seedCourseId?: string;
  title?: string;
};

export function RecommendationSection({
  seedCourseId,
  title = "Рекомендовано для вас",
}: Props) {
  // Server state: результаты рекомендаций, загрузка, ошибка
  const [data, setData] = useState<RecommendedCourse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = seedCourseId ? `?seedCourseId=${encodeURIComponent(seedCourseId)}` : "";
    fetch(`/api/recommendations${params}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as RecommendedCourse[];
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Unknown error");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [seedCourseId]);

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>

      {loading && <p className="text-sm text-slate-600">Загрузка…</p>}
      {error && (
        <p className="text-sm text-red-700">
          Ошибка: <span className="font-mono">{error}</span>
        </p>
      )}
      {!loading && !error && data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((course) => (
            <div key={course.id} className="min-w-0">
              <CourseCard course={course} />
              {course.recommendation?.reasons?.length ? (
                <div className="mt-2 text-xs text-slate-500">
                  <div className="font-medium text-slate-600">Почему рекомендовано</div>
                  <div className="mt-1 line-clamp-2">
                    {course.recommendation.reasons.join(" · ")}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

