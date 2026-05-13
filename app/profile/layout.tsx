import type { ReactNode } from "react";
import { ProfileSidebar } from "@/components/profile-sidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Настройки</h1>
        <p className="text-slate-600">
          Управляйте настройками аккаунта и предпочтениями.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside>
          <ProfileSidebar />
        </aside>

        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}

