import Link from "next/link";
import type { ReactNode } from "react";

function IconGradCap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
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

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--surface)] lg:grid lg:min-h-dvh lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#152a45] to-[#0c1222] lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14 xl:px-16">
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-12">
          <Link href="/" className="inline-flex w-fit items-center gap-3 text-white transition hover:opacity-90">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm">
              <IconGradCap className="size-6 text-white" />
            </span>
            <span className="text-xl font-semibold tracking-tight">EduFlow</span>
          </Link>

          <div className="max-w-md space-y-5">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white xl:text-[2rem]">
              Онлайн-обучение с персональными рекомендациями
            </h2>
            <p className="text-pretty text-base leading-relaxed text-slate-300">
              Собирайте курсы в одном месте, отслеживайте прогресс и возвращайтесь к урокам в любое время.
            </p>
          </div>

          <ul className="max-w-sm space-y-3.5 text-sm text-slate-200">
            <li className="flex gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/25 text-xs font-bold text-teal-300">
                ✓
              </span>
              <span>Каталог курсов и умные подборки под ваши интересы</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/25 text-xs font-bold text-teal-300">
                ✓
              </span>
              <span>Единый аккаунт для входа с компьютера или телефона</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/25 text-xs font-bold text-teal-300">
                ✓
              </span>
              <span>Настройки профиля и уведомления в пару кликов</span>
            </li>
          </ul>
        </div>

        <p className="relative z-10 text-xs text-slate-500">EduFlow · платформа онлайн-обучения</p>
      </aside>

      <div className="flex min-h-dvh flex-col justify-center px-4 py-10 sm:px-8 lg:bg-white lg:px-12 lg:py-14 xl:px-16">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2.5 text-navy">
              <span className="grid size-10 place-items-center rounded-xl bg-navy text-white shadow-sm">
                <IconGradCap className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">EduFlow</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
