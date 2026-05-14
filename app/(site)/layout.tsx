import { AppShell } from "@/components/app-shell";

/**
 * Оболочка с навигацией для основного приложения.
 * `/auth/*` вынесен в `app/(auth)/` без AppShell — без `usePathname` на экранах входа.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
