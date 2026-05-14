"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { href: "/my-courses", label: "Моё обучение" },
  { href: "/courses", label: "Каталог" },
  { href: "/profile", label: "Настройки" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-navy text-white shadow-sm">
              <IconGradCap className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-navy">EduFlow</span>
          </Link>

          <nav className="order-3 flex w-full gap-1 sm:order-none sm:flex sm:w-auto sm:gap-1">
            {nav.map(({ href, label }) => {
              const active =
                pathname === href ||
                (href === "/courses" && pathname.startsWith("/courses")) ||
                (href === "/profile" && pathname.startsWith("/profile")) ||
                (href === "/my-courses" && pathname.startsWith("/my-courses"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition sm:px-3.5 ${
                    active ? "bg-slate-100 text-navy" : "text-[var(--muted)] hover:bg-slate-50 hover:text-navy"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:max-w-sm">
            <label className="relative hidden min-w-0 flex-1 md:block">
              <span className="sr-only">Поиск</span>
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Поиск курсов…"
                className="w-full rounded-xl border border-[var(--border)] bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-white text-slate-600 hover:bg-slate-50"
              aria-label="Уведомления"
            >
              <IconBell className="size-[18px]" />
            </button>
            <Link
              href="/profile"
              className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--border)] bg-slate-200 text-xs font-semibold text-navy hover:border-slate-300"
              aria-label="Профиль"
            >
              <span className="text-[11px]">АН</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}

function IconGradCap(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M4 10 12 6l8 4-8 4-8-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 12v4.5c0 1.5 2.5 2.5 4 2.5s4-1 4-2.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16 20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconBell(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10.3 20a1.7 1.7 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
