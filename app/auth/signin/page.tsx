"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-slate-50/80 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Неверный email или пароль.");
        return;
      }
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-8">
      <header className="space-y-2 text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-[2rem]">Вход в систему</h1>
        <p className="text-sm leading-relaxed text-[var(--muted)]">Введите email и пароль, чтобы продолжить обучение.</p>
      </header>

      {registered ? (
        <p className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Регистрация прошла успешно. Войдите с указанным email и паролем.
        </p>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-soft sm:p-9"
      >
        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100" role="alert">
            {error}
          </p>
        ) : null}

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
          <span className="text-sm font-medium text-navy">Пароль</span>
          <input
            className={inputClass}
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          className="w-full rounded-xl bg-navy py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-hover disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Вход…" : "Войти"}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-[var(--muted)]">
          <span className="font-medium">Забыли пароль?</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/auth/signup" className="font-semibold text-navy underline-offset-4 hover:underline">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-[var(--muted)]">Загрузка…</div>}>
      <SignInForm />
    </Suspense>
  );
}
