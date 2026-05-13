import Link from "next/link";
import type { Course } from "@/types/course";

type Props = {
  course: Course;
  /** Карточка каталога: без лайков, ссылка «Подробнее» */
  variant?: "default" | "catalog";
};

export function CourseCard({ course, variant = "default" }: Props) {
  const isCatalog = variant === "catalog";

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft">
      <Link href={`/courses/${course.id}`} className="block">
        <div className="relative aspect-[16/9] bg-slate-100">
          {course.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={course.imageUrl}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-100" />
          )}
        </div>

        <div className="space-y-2 p-4">
          <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-navy">
            {course.category}
          </span>
          <div className="line-clamp-2 text-base font-semibold text-navy">{course.title}</div>
          {course.description ? (
            <div className="line-clamp-2 text-sm text-[var(--muted)]">{course.description}</div>
          ) : null}

          {!isCatalog ? (
            <div className="flex flex-wrap gap-2">
              {course.tags.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full bg-slate-50 px-2 py-1 text-xs text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>

      {isCatalog ? (
        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3">
          <span className="text-xs text-[var(--muted)]">
            {Math.round(course.durationMinutes / 60)} ч · {course.rating.toFixed(1)}★
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            Подробнее
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-3">
          <div className="text-xs text-[var(--muted)]">
            {course.category} · {Math.round(course.durationMinutes / 60)} ч · {course.rating.toFixed(1)}★
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:bg-slate-50"
            >
              Лайк
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:bg-slate-50"
            >
              В избранное
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:bg-slate-50"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
