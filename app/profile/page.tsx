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
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Профиль</h2>
        <p className="mt-1 text-sm text-slate-600">
          Так вас будут видеть другие пользователи на сайте.
        </p>

        <div className="mt-5 flex items-center gap-4">
          <div className="size-14 rounded-full bg-slate-200" />
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Изменить аватар
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-1">
            <div className="text-sm font-medium">Имя пользователя</div>
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="grid gap-1">
            <div className="text-sm font-medium">О себе</div>
            <textarea
              className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Цели обучения</h2>
        <p className="mt-1 text-sm text-slate-600">
          Настройте свои рекомендации.
        </p>

        <div className="mt-5 grid gap-5">
          <label className="grid gap-1">
            <div className="text-sm font-medium">Основная цель</div>
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
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
            <div className="text-sm font-medium">Интересы</div>
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-800 hover:bg-slate-50"
                  onClick={() =>
                    setInterests((prev) => prev.filter((t) => t !== tag))
                  }
                >
                  {tag}
                  <span className="text-slate-500">×</span>
                </button>
              ))}

              <div className="flex items-center gap-2">
                <input
                  className="w-40 rounded-full border border-slate-300 px-3 py-1 text-sm"
                  placeholder="Добавить…"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-50 disabled:opacity-50"
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

          <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
            <div>
              <div className="text-sm font-medium">
                Персонализированные рекомендации
              </div>
              <div className="text-sm text-slate-600">
                Получайте предложения курсов на основе вашей активности.
              </div>
            </div>

            <button
              type="button"
              aria-label="Переключатель персонализации"
              className={[
                "relative h-7 w-12 rounded-full border transition-colors",
                personalized
                  ? "border-slate-900 bg-slate-900"
                  : "border-slate-300 bg-slate-200",
              ].join(" ")}
              onClick={() => setPersonalized((v) => !v)}
            >
              <span
                className={[
                  "absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform",
                  personalized ? "translate-x-5" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Сохранить изменения
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Технически: предпочтения читаются/обновляются через{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5">
            /api/user/preferences
          </code>
          .
        </p>
      </section>
    </>
  );
}

