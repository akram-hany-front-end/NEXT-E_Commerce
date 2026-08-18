"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "./translation";

import {
  MessageSquare,
  Users,
  Package,
  ShoppingBag,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const { language } = useLanguage();

  const t = translations[language];

  const adminLinks = [
    {
      title: t.sidebar.message,
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      title: t.sidebar.users,
      href: "/admin/users",
      icon: Users,
    },
    {
      title: t.sidebar.products,
      href: "/admin/products",
      icon: Package,
    },
    {
      title: t.sidebar.orders,
      href: "/admin/orders",
      icon: ShoppingBag,
    },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-e border-[var(--border)] bg-[var(--surface)] p-5">

      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-wide text-[var(--foreground)]">
          ARKAN
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          {t.sidebar.dashboard}
        </p>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--background)]"
              }`}
            >
              <Icon size={19} />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}