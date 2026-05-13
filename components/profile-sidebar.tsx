"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/profile", label: "Общие" },
  { href: "/profile/notifications", label: "Уведомления" },
  { href: "/profile/billing", label: "Оплата" },
  { href: "/profile/security", label: "Безопасность" },
];

function isActive(pathname: string, href: string) {
  if (href === "/profile") return pathname === "/profile";
  return pathname.startsWith(href);
}

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="rounded-xl border border-slate-200 bg-white p-2">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "block rounded-lg px-3 py-2 text-sm",
              active
                ? "bg-slate-100 font-medium text-slate-900"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

