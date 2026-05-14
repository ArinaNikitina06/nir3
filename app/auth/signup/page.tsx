"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== password2) {
      setError("Пароли не совпадают.");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          password,
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Ошибка регистрации");
        return;
      }

      router.push("/auth/signin?registered=1");
    } catch {
      setError("Сеть недоступна. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-navy text-white shadow-soft">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
            <path
              d="M4 10 12 6l8 4-8 4-8-4Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M8 12v4.5c0 1.5 2.5 2.5 4 2.5s4-1 4-2.5V12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-navy">Регистрация</h1>
        <p className="text-sm text-[var(--muted)]">Создайте аккаунт, чтобы сохранять прогресс</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-soft"
      >
        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Email</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Имя пользователя</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            placeholder="arina_designer"
            type="text"
            name="name"
            autoComplete="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Пароль</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-xs text-[var(--muted)]">Не менее 8 символов</span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Повторите пароль</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            type="password"
            name="password2"
            autoComplete="new-password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>

        <button
          className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy-hover disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Регистрация…" : "Зарегистрироваться"}
        </button>

        <div className="text-center text-sm text-[var(--muted)]">
          Уже есть аккаунт?{" "}
          <Link href="/auth/signin" className="font-semibold text-navy hover:underline">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}
