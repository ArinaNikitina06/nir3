import Link from "next/link";
import type { Course } from "@/types/course";

type Props = {
  course: Course;
  /** Карточка каталога: без лайков, ссылка «Подробнее» */
  variant?: "default" | "catalog";
  /** Бейдж «Рекомендуем» — градиент primary → secondary по макету */
  recommended?: boolean;
};

export function CourseCard({ course, variant = "default", recommended = false }: Props) {
  const isCatalog = variant === "catalog";

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/courses/${course.id}`} className="block">
        <div className="relative aspect-[16/9] bg-slate-100">
          {recommended ? (
            <span className="absolute left-3 top-3 z-10 inline-flex h-6 items-center rounded-full bg-gradient-to-r from-primary to-secondary px-2.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              Рекомендуем
            </span>
          ) : null}
          {course.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={course.imageUrl}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-100" />
          )}
        </div>

        <div className="space-y-2 p-4">
          <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {course.category}
          </span>
          <div className="line-clamp-2 text-base font-bold text-navy">{course.title}</div>
          {course.description ? (
            <div className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{course.description}</div>
          ) : null}

          {!isCatalog ? (
            <div className="flex flex-wrap gap-2">
              {course.tags.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full bg-slate-50 px-2 py-1 text-xs text-[var(--muted)]">
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
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
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
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:border-primary/30 hover:bg-blue-50/50"
            >
              Лайк
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:border-primary/30 hover:bg-blue-50/50"
            >
              В избранное
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] bg-white px-2 py-1 text-xs text-navy hover:border-primary/30 hover:bg-blue-50/50"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
