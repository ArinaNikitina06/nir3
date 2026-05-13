import Link from "next/link";
import { RecommendationSection } from "@/components/recommendation-section";
import type { Course } from "@/types/course";

const continueCourse: Course = {
  id: "c-continue-1",
  title: "Продвинутые паттерны React",
  description: "Практика и архитектурные подходы для масштабируемых интерфейсов.",
  imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
  category: "Разработка",
  level: "Intermediate",
  durationMinutes: 520,
  priceRub: 0,
  rating: 4.8,
  tags: ["Разработка", "Продвинутый"]
};

export function HomePage() {
  const today = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm capitalize text-slate-500">{today}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Доброе утро, Арина
          </h2>
          <p className="max-w-xl text-slate-600">
            Продолжите с того места, где остановились, или выберите курс из персональной подборки.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-accent-soft px-3 py-1 text-xs font-medium text-teal-900">
            Рекомендации обновлены
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            3 новых курса на неделе
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Часов в этом месяце", value: "18", hint: "+4 к прошлому" },
          { label: "Курсов в работе", value: "2", hint: "1 почти завершён" },
          { label: "Серия дней", value: "5", hint: "Продолжайте!" }
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-card"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">{s.value}</p>
            <p className="mt-1 text-xs text-slate-500">{s.hint}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Продолжить обучение</h3>
          <Link
            href={`/courses/${continueCourse.id}`}
            className="text-sm font-medium text-accent hover:text-teal-700"
          >
            Открыть курс
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <Link
              href={`/courses/${continueCourse.id}`}
              className="relative block aspect-[16/10] bg-slate-100 md:aspect-auto md:min-h-[220px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={continueCourse.imageUrl}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 via-slate-900/20 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 right-4 text-white md:max-w-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                  {continueCourse.category}
                </p>
                <p className="mt-1 text-lg font-semibold leading-snug">{continueCourse.title}</p>
              </div>
            </Link>

            <div className="flex flex-col justify-center gap-4 p-6">
              <p className="text-sm leading-relaxed text-slate-600">{continueCourse.description}</p>
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Прогресс модуля</span>
                  <span>65%</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[65%] rounded-full bg-accent shadow-sm" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {continueCourse.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendationSection title="Рекомендовано для вас" />
    </div>
  );
}
