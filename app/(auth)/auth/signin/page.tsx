"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

const inputClass =
  "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const labelClass = "text-sm font-medium text-gray-900";

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
    <section className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md shadow-gray-900/5">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-[32px] font-bold leading-[1.2] tracking-tight text-gray-900">Вход в систему</h1>
          <p className="text-base leading-relaxed text-gray-500">Введите email и пароль для входа</p>
        </div>

        {registered ? (
          <p className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-center text-sm text-emerald-900">
            Регистрация прошла успешно. Войдите с указанным email и паролем.
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800 ring-1 ring-red-100" role="alert">
              {error}
            </p>
          ) : null}

          <label className="block space-y-1.5">
            <span className={labelClass}>Email</span>
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

          <label className="block space-y-1.5">
            <span className={labelClass}>Пароль</span>
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
            className="mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Вход…" : "Войти"}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2 text-sm text-gray-500">
            <span className="font-medium">Забыли пароль?</span>
            <span className="text-gray-300">·</span>
            <Link href="/auth/signup" className="font-semibold text-blue-600 underline-offset-2 hover:underline">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">Загрузка…</div>}>
      <SignInForm />
    </Suspense>
  );
}
