"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { roleAtLeast, type Role } from "@/lib/auth/session";
import { NAV_ITEMS } from "./nav-items";

export function SidebarNav({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
        Menu
      </p>
      {NAV_ITEMS.filter((item) => !item.minRole || roleAtLeast(role, item.minRole)).map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-primary text-white shadow-sm shadow-primary/30"
                : "text-white/60 hover:bg-white/[0.07] hover:text-white"
            )}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                active ? "bg-white/15" : "bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/80"
              )}
            >
              <Icon className="size-4" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
