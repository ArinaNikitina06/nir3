import Link from "next/link";
import type { Course } from "@/types/course";

/** Горизонтальная плитка для полосы «Рекомендовано» */
export function CourseStripCard({ course }: { course: Course }) {
  return (
    <article className="w-[min(100%,280px)] shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft">
      <Link href={`/courses/${course.id}`} className="flex gap-3 p-3">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {course.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src={course.imageUrl} className="h-full w-full object-cover" loading="lazy" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
            {course.category}
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-navy">{course.title}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{Math.round(course.durationMinutes / 60)} ч</p>
        </div>
      </Link>
    </article>
  );
}
