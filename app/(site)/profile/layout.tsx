import type { ReactNode } from "react";
import { Suspense } from "react";
import { ProfileSidebar } from "@/components/profile-sidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">Настройки</h1>
        <p className="text-[var(--muted)]">Управляйте аккаунтом и предпочтениями обучения.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<div className="h-48 rounded-2xl border border-[var(--border)] bg-white shadow-soft" aria-hidden />}>
            <ProfileSidebar />
          </Suspense>
        </aside>

        <div className="space-y-8">{children}</div>
      </div>
    </section>
  );
}
