"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/profile", label: "Профиль" },
  { href: "/profile/notifications", label: "Уведомления" },
  { href: "/profile/security", label: "Безопасность" },
  { href: "/profile/billing", label: "Подписка" }
];

function isActive(pathname: string, href: string) {
  if (href === "/profile") return pathname === "/profile";
  return pathname.startsWith(href);
}

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-[var(--border)] bg-white p-2 shadow-soft">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active ? "bg-slate-100 text-navy" : "text-[var(--muted)] hover:bg-slate-50 hover:text-navy"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
