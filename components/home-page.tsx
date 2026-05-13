import Link from "next/link";
import { RecommendationSection } from "@/components/recommendation-section";
import type { Course } from "@/types/course";

const continueCourse: Course = {
  id: "c-continue-1",
  title: "Продвинутые паттерны React",
  description: "Практика и архитектурные подходы для масштабируемых интерфейсов.",
  imageUrl:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
  category: "Разработка",
  level: "Intermediate",
  durationMinutes: 520,
  priceRub: 0,
  rating: 4.8,
  tags: ["Разработка", "Продвинутый"]
};

export function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">Доброе утро, Арина</h1>
        <p className="text-[var(--muted)]">Готовы продолжить обучение сегодня?</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-navy">Продолжить обучение</h2>

        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-soft">
          <div className="flex flex-col md:flex-row">
            <Link
              href={`/courses/${continueCourse.id}`}
              className="relative aspect-[16/10] w-full shrink-0 bg-slate-100 md:aspect-auto md:w-[42%] md:min-h-[200px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={continueCourse.imageUrl}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {continueCourse.category}
                </p>
                <p className="mt-1 text-xl font-semibold text-navy">{continueCourse.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">{continueCourse.description}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[var(--muted)]">
                  <span>Прогресс</span>
                  <span>65%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[65%] rounded-full bg-navy" />
                </div>
              </div>
              <div>
                <Link
                  href={`/courses/${continueCourse.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-hover"
                >
                  Продолжить
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendationSection title="Рекомендовано для вас" layout="horizontal" />
    </div>
  );
}
