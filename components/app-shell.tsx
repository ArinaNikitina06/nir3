"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const mainNav = [
  { href: "/", label: "Обзор", icon: IconHome },
  { href: "/courses", label: "Каталог", icon: IconGrid },
  { href: "/my-courses", label: "Моё обучение", icon: IconBook }
];

function titleForPath(pathname: string): string {
  if (pathname === "/") return "Обзор";
  if (pathname.startsWith("/courses/")) return "Курс";
  if (pathname === "/courses") return "Каталог курсов";
  if (pathname === "/my-courses") return "Моё обучение";
  if (pathname.startsWith("/profile")) return "Настройки";
  if (pathname.startsWith("/auth")) return "Вход";
  return "НИР3";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pageTitle = titleForPath(pathname);

  return (
    <div className="flex min-h-dvh">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800/80 bg-sidebar text-slate-200 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-slate-700/80 px-5">
          <div className="grid size-9 place-items-center rounded-lg bg-accent text-white shadow-lg shadow-teal-900/30">
            <IconLayers className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">НИР3</div>
            <div className="text-[11px] text-slate-400">Персональные курсы</div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {mainNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <Icon className="size-[18px] shrink-0 opacity-90" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-700/80 p-3">
          <Link
            href="/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              pathname.startsWith("/profile")
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
            }`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-xs font-bold text-slate-900">
              АН
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium text-slate-100">Арина Никитина</div>
              <div className="truncate text-xs text-slate-500">Профиль и выход</div>
            </div>
          </Link>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-elevated)_88%,transparent)] px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--surface-elevated)_72%,transparent)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Рабочий стол
              </p>
              <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">{pageTitle}</h1>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2 sm:max-w-md">
              <label className="relative hidden min-w-0 flex-1 sm:block">
                <span className="sr-only">Поиск курсов</span>
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-xl border border-[var(--border)] bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none ring-accent/25 placeholder:text-slate-400 focus:ring-2"
                  placeholder="Поиск по курсам и темам…"
                  type="search"
                />
              </label>

              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                aria-label="Уведомления"
              >
                <IconBell className="size-[18px]" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 lg:pb-8">{children}</main>
      </div>

      <MobileDock pathname={pathname} />
    </div>
  );
}

function MobileDock({ pathname }: { pathname: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-[var(--border)] bg-white/95 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden">
      {mainNav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium ${
              active ? "text-accent" : "text-slate-500"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
      <Link
        href="/profile"
        className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium ${
          pathname.startsWith("/profile") ? "text-accent" : "text-slate-500"
        }`}
      >
        <span className="grid size-5 place-items-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-700">
          А
        </span>
        Профиль
      </Link>
    </nav>
  );
}

function IconHome(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGrid(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function IconBook(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M5 5a2 2 0 0 1 2-2h10v16H7a2 2 0 0 0-2 2V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 3v14" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconLayers(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="m12 4 9 4-9 4-9-4 9-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="m3 10 9 4 9-4M3 14l9 4 9-4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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
