import * as LucideIcons from "lucide-react";
import { Truck, type LucideIcon } from "lucide-react";

const icons = LucideIcons as unknown as Record<string, LucideIcon>;

/**
 * Resolves an admin-entered icon name (e.g. "Truck", "Shirt") to its
 * lucide-react component. Falls back to Truck if the name doesn't match a
 * known icon, so a typo in the admin panel never breaks a page render.
 */
export function getIcon(name: string | null | undefined, fallback: LucideIcon = Truck): LucideIcon {
  if (!name) return fallback;
  return icons[name] ?? fallback;
}
