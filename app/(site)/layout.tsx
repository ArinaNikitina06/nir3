import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";

/**
 * Оболочка с навигацией только для основного приложения.
 * `/auth/*` вынесен в `app/(auth)/` без AppShell — иначе `usePathname()` в Next 15
 * при prerender может выбросить InvariantError → 500 на страницах входа/регистрации.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-white" aria-busy="true" />}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
