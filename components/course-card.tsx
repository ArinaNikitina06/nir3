import Link from "next/link";
import type { Course } from "@/types/course";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
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
          <div className="line-clamp-2 text-base font-semibold">{course.title}</div>
          {course.description ? (
            <div className="line-clamp-2 text-sm text-slate-600">
              {course.description}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {course.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
        <div className="text-xs text-slate-600">
          {course.category} · {Math.round(course.durationMinutes / 60)} ч ·{" "}
          {course.rating.toFixed(1)}★
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            Лайк
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            В избранное
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            Скрыть
          </button>
        </div>
      </div>
    </article>
  );
}

