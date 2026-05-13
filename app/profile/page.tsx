"use client";

import { useMemo, useState } from "react";

const goalOptions = [
  "Смена карьеры",
  "Повышение квалификации",
  "Подготовка к экзамену",
  "Личный интерес",
] as const;

export default function Page() {
  const [username, setUsername] = useState("arina_designer");
  const [about, setAbout] = useState(
    "Продуктовый дизайнер. Изучаю React и Next.js."
  );
  const [goal, setGoal] = useState<(typeof goalOptions)[number]>("Смена карьеры");
  const [interests, setInterests] = useState<string[]>([
    "Дизайн",
    "Разработка",
    "UX",
  ]);
  const [personalized, setPersonalized] = useState(true);
  const [newInterest, setNewInterest] = useState("");

  const canAdd = useMemo(() => newInterest.trim().length > 0, [newInterest]);

  return (
    <>
      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-navy">Профиль</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Так вас будут видеть другие пользователи на сайте.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="size-16 shrink-0 rounded-full bg-slate-200 ring-2 ring-[var(--border)]" />
          <button
            type="button"
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-slate-50"
          >
            Изменить аватар
          </button>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Имя и фамилия</span>
            <input
              className="rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              defaultValue="Арина Никитина"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Email</span>
            <input
              type="email"
              className="rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              defaultValue="arina@example.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Имя пользователя</span>
            <input
              className="rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">О себе</span>
            <textarea
              className="min-h-28 rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-navy">Цели обучения</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Настройте свои рекомендации.</p>

        <div className="mt-6 grid gap-6">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-navy">Основная цель</span>
            <select
              className="rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value as (typeof goalOptions)[number])
              }
            >
              {goalOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-2">
            <span className="text-sm font-medium text-navy">Интересы</span>
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-sm text-navy hover:bg-slate-50"
                  onClick={() =>
                    setInterests((prev) => prev.filter((t) => t !== tag))
                  }
                >
                  {tag}
                  <span className="text-[var(--muted)]">×</span>
                </button>
              ))}

              <div className="flex flex-wrap items-center gap-2">
                <input
                  className="min-w-[10rem] flex-1 rounded-full border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-sm outline-none focus:bg-white"
                  placeholder="Добавить…"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm font-medium text-navy hover:bg-slate-50 disabled:opacity-50"
                  disabled={!canAdd}
                  onClick={() => {
                    const value = newInterest.trim();
                    if (!value) return;
                    setInterests((prev) =>
                      prev.includes(value) ? prev : [...prev, value]
                    );
                    setNewInterest("");
                  }}
                >
                  + Добавить
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-navy">
                Персонализированные рекомендации
              </div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                Получайте предложения курсов на основе вашей активности.
              </div>
            </div>

            <button
              type="button"
              aria-label="Переключатель персонализации"
              className={[
                "relative h-8 w-14 shrink-0 rounded-full border transition-colors",
                personalized
                  ? "border-navy bg-navy"
                  : "border-[var(--border)] bg-slate-200",
              ].join(" ")}
              onClick={() => setPersonalized((v) => !v)}
            >
              <span
                className={[
                  "absolute top-0.5 size-7 rounded-full bg-white shadow transition-transform",
                  personalized ? "translate-x-6" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-hover"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

