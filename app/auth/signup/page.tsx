import Link from "next/link";

export default function Page() {
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

      <form className="space-y-5 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-soft">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Email</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoComplete="email"
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
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-navy">Пароль</span>
          <input
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            type="password"
            name="password"
            autoComplete="new-password"
          />
        </label>

        <button
          className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy-hover"
          type="button"
        >
          Зарегистрироваться
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
