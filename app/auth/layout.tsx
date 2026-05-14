import Link from "next/link";
import type { ReactNode } from "react";

/** Визуальная система как в разделе про макеты: фон #f9fafb, primary #3b82f6, secondary #8b5cf6 (см. addinfo/NIR_Текст_работы_ФИНАЛ.md). */

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
    <div className="relative min-h-dvh overflow-hidden bg-[#f9fafb]">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 80% at 100% -20%, rgba(59, 130, 246, 0.14), transparent 50%), radial-gradient(ellipse 100% 70% at -10% 110%, rgba(139, 92, 246, 0.12), transparent 45%)"
        }}
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[400px] flex-col justify-center px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3 text-gray-900 transition hover:opacity-90"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-md shadow-blue-500/25 ring-1 ring-white/30">
            <IconGradCap className="size-[22px]" />
          </span>
          <span className="text-xl font-bold tracking-tight">EduFlow</span>
        </Link>

        {children}
      </div>
    </div>
  );
}
