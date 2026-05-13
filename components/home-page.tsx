import { RecommendationSection } from "@/components/recommendation-section";
import { CourseCard } from "@/components/course-card";
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
  tags: ["Разработка", "Продвинутый"],
};

export function HomePage() {
  return (
    <section className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold">Доброе утро, Арина</h1>
        <p className="text-slate-600">Готовы продолжить обучение сегодня?</p>
      </header>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold">Продолжить обучение</h2>
        </div>

        <div className="max-w-[520px]">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Разработка
                </div>
                <div className="mt-1">
                  <CourseCard course={continueCourse} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Прогресс</span>
              <span>65%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded bg-slate-100">
              <div className="h-2 w-2/3 rounded bg-slate-900" />
            </div>
          </div>
        </div>
      </section>

      <RecommendationSection title="Рекомендовано для вас" />
    </section>
  );
}

