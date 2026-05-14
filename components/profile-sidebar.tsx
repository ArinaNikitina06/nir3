"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const items = [
  { href: "/profile", label: "Профиль" },
  { href: "/profile/notifications", label: "Уведомления" },
  { href: "/profile/security", label: "Безопасность" },
  { href: "/profile/billing", label: "Подписка" },
];

function isActive(pathname: string, href: string) {
  if (href === "/profile") return pathname === "/profile";
  return pathname.startsWith(href);
}

export function ProfileSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <nav className="flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-white p-2 shadow-card">
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active ? "bg-blue-50 font-semibold text-primary" : "text-[var(--muted)] hover:bg-slate-50 hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] pt-2">
        <button
          type="button"
          className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
          onClick={() =>
            signOut({
              callbackUrl: "/auth/signin",
            })
          }
        >
          Выйти из аккаунта
        </button>
        <p className="mt-1 px-1 text-[11px] leading-snug text-[var(--muted)]">
          После выхода откроется экран входа: можно снова войти или зарегистрироваться.
        </p>
      </div>
    </nav>
  );
}
