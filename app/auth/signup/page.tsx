export default function Page() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Регистрация</h1>
        <p className="text-sm text-slate-600">Создайте аккаунт, чтобы сохранять прогресс</p>
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
          <div className="text-sm font-medium">Имя пользователя</div>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="arina_designer"
            type="text"
            name="name"
            autoComplete="username"
          />
        </label>

        <button
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          type="button"
        >
          Зарегистрироваться
        </button>

        <div className="pt-2 text-center text-sm text-slate-600">
          Уже есть аккаунт?{" "}
          <a className="font-medium text-slate-900 underline" href="/auth/signin">
            Войти
          </a>
        </div>
      </form>

      <p className="text-xs text-slate-500">
        Технически: регистрация выполняется через{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5">/api/auth/signup</code>.
      </p>
    </section>
  );
}

