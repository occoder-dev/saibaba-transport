"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { SidebarNav } from "./sidebar-nav";
import type { Role } from "@/lib/auth/session";
import { logoutAction } from "@/app/admin/login/actions";

const ROLE_LABEL: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  STAFF: "Staff",
};

function UserFooter({ name, email, role }: { name: string; email: string; role: Role }) {
  return (
    <div className="border-t border-white/10 p-3">
      <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
          {name?.charAt(0)?.toUpperCase() || "A"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{name}</p>
          <p className="truncate text-xs text-white/45">{email}</p>
        </div>
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          {ROLE_LABEL[role]}
        </Badge>
      </div>
      <form action={logoutAction}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-lg text-white/65 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" /> Sign out
        </Button>
      </form>
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
      <Image src="/logo-mark.png" alt="" width={32} height={32} className="size-8 rounded-lg bg-white/5 p-0.5" />
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight text-white">Saibaba Transport</p>
        <p className="text-xs text-white/45">Admin Panel</p>
      </div>
    </div>
  );
}

export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: Role };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-charcoal lg:flex">
        <BrandHeader />
        <SidebarNav role={user.role} />
        <UserFooter {...user} />
      </aside>

      {/* Mobile sheet sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 border-white/10 bg-brand-charcoal p-0 text-white [&_svg]:text-white">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <BrandHeader />
            <SidebarNav role={user.role} onNavigate={() => setOpen(false)} />
            <UserFooter {...user} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border/70 bg-background/85 px-4 backdrop-blur-md lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
          <Link
            href="/"
            target="_blank"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            View live site
            <ExternalLink className="size-3.5" />
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
