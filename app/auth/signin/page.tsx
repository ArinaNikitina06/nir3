"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

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
        <h1 className="text-2xl font-semibold text-navy">Вход в систему</h1>
        <p className="text-sm text-[var(--muted)]">Введите свои данные для входа</p>
      </div>

      {registered ? (
        <p className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-center text-sm text-teal-900">
          Регистрация прошла успешно. Войдите с указанным email и паролем.
        </p>
      ) : null}

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
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm text-navy outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
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
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm text-navy outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy-hover disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Вход…" : "Войти"}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <span className="font-medium text-[var(--muted)]">Забыли пароль?</span>
          <Link href="/auth/signup" className="font-semibold text-navy hover:underline">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md py-12 text-center text-sm text-[var(--muted)]">Загрузка…</div>}>
      <SignInForm />
    </Suspense>
  );
}
