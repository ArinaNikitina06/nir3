export default function Page() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto grid size-10 place-items-center rounded-xl bg-slate-900 text-white">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10L12 5 2 10l10 5 10-5Z" />
            <path d="M6 12v5c3 2 9 2 12 0v-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Вход в систему</h1>
        <p className="text-sm text-slate-600">Введите email для входа в аккаунт</p>
      </div>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block space-y-1">
          <div className="text-sm font-medium">Email</div>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoComplete="email"
          />
        </label>

        <label className="block space-y-1">
          <div className="text-sm font-medium">Пароль</div>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </label>

        <button
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          type="button"
        >
          Войти
        </button>

        <div className="pt-2 text-center text-sm text-slate-600">
          Нет аккаунта?{" "}
          <a className="font-medium text-slate-900 underline" href="/auth/signup">
            Зарегистрироваться
          </a>
        </div>
      </form>

      <p className="text-xs text-slate-500">
        Технически: NextAuth endpoint{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5">/api/auth/[...nextauth]</code>.
      </p>
    </section>
  );
}

