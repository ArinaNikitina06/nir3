"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-slate-50/80 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80";

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
    <section className="space-y-8">
      <header className="space-y-2 text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-[2rem]">Регистрация</h1>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Создайте аккаунт EduFlow — сохраняйте курсы и прогресс в одном месте.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-soft sm:p-9"
      >
        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100" role="alert">
            {error}
          </p>
        ) : null}

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Контакты</p>
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-navy">Email</span>
              <input
                className={inputClass}
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
                className={inputClass}
                placeholder="arina_designer"
                type="text"
                name="name"
                autoComplete="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="h-px bg-[var(--border)]" aria-hidden />

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Пароль</p>
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-navy">Пароль</span>
              <input
                className={inputClass}
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
                className={inputClass}
                type="password"
                name="password2"
                autoComplete="new-password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>
          </div>
        </div>

        <button
          className="w-full rounded-xl bg-navy py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-hover disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Регистрация…" : "Зарегистрироваться"}
        </button>

        <p className="text-center text-sm text-[var(--muted)]">
          Уже есть аккаунт?{" "}
          <Link href="/auth/signin" className="font-semibold text-navy underline-offset-4 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
