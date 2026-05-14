"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass =
  "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const labelClass = "text-sm font-medium text-gray-900";

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
    <section>
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-gray-200 bg-white p-8 shadow-md shadow-gray-900/5"
      >
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-[32px] font-bold leading-[1.2] tracking-tight text-gray-900">Регистрация</h1>
          <p className="text-base leading-relaxed text-gray-500">Создайте аккаунт, чтобы сохранять курсы и прогресс</p>
        </div>

        {error ? (
          <p className="mb-6 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800 ring-1 ring-red-100" role="alert">
            {error}
          </p>
        ) : null}

        <div className="space-y-5">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-blue-600">Контакты</p>
          <div className="space-y-4">
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
              <span className={labelClass}>Имя пользователя</span>
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

        <div className="my-6 h-px bg-gray-100" aria-hidden />

        <div className="space-y-5">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-violet-600">Пароль</p>
          <div className="space-y-4">
            <label className="block space-y-1.5">
              <span className={labelClass}>Пароль</span>
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
              <span className="text-xs text-gray-500">Не менее 8 символов</span>
            </label>

            <label className="block space-y-1.5">
              <span className={labelClass}>Повторите пароль</span>
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
          className="mt-8 flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Регистрация…" : "Зарегистрироваться"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <Link href="/auth/signin" className="font-semibold text-blue-600 underline-offset-2 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
