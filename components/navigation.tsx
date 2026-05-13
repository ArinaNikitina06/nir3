import Link from "next/link";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/courses", label: "Каталог" },
  { href: "/my-courses", label: "Моё обучение" },
];

export function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10L12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c3 2 9 2 12 0v-5" />
              </svg>
            </span>
            EduFlow
          </Link>

          <nav className="flex gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Поиск курсов…"
            />
          </div>

          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
            aria-label="Уведомления"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <Link
            href="/profile"
            className="grid size-9 place-items-center rounded-full bg-slate-200"
            aria-label="Профиль"
          />
        </div>
      </div>
    </header>
  );
}

