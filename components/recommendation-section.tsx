"use client";

import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { CourseStripCard } from "@/components/course-strip-card";
import type { RecommendedCourse } from "@/types/recommendation";

type Props = {
  seedCourseId?: string;
  title?: string;
  layout?: "grid" | "horizontal";
};

export function RecommendationSection({
  seedCourseId,
  title = "Рекомендовано для вас",
  layout = "grid",
}: Props) {
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

  const horizontal = layout === "horizontal";

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>

      {loading && <p className="text-sm text-[var(--muted)]">Загрузка…</p>}
      {error && (
        <p className="text-sm text-red-700">
          Ошибка: <span className="font-mono">{error}</span>
        </p>
      )}
      {!loading && !error && data && (
        <>
          {horizontal ? (
            <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 pt-0.5">
              {data.map((course) => (
                <div key={course.id} className="shrink-0">
                  <CourseStripCard course={course} />
                  {course.recommendation?.reasons?.length ? (
                    <p className="mt-2 max-w-[280px] text-xs text-[var(--muted)] line-clamp-2">
                      {course.recommendation.reasons.join(" · ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((course) => (
                <div key={course.id} className="min-w-0">
                  <CourseCard course={course} />
                  {course.recommendation?.reasons?.length ? (
                    <div className="mt-2 text-xs text-[var(--muted)]">
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
        </>
      )}
    </section>
  );
}
