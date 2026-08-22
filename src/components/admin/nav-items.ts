import type { Role } from "@/lib/auth/session";
import {
  LayoutDashboard,
  Inbox,
  Building2,
  Truck,
  Factory,
  HelpCircle,
  Newspaper,
  Images,
  Calculator,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  minRole?: Role;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries & Support", icon: Inbox },
  { href: "/admin/branches", label: "Branches", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Truck },
  { href: "/admin/industries", label: "Industries", icon: Factory },
  { href: "/admin/pricing", label: "Pricing & Estimator", icon: Calculator },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/users", label: "Admin Users", icon: Users, minRole: "SUPER_ADMIN" },
];
