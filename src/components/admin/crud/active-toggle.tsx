"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function ActiveToggle({
  active,
  action,
}: {
  active: boolean;
  action: (next: boolean) => Promise<{ error?: string } | void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Switch
      checked={active}
      disabled={pending}
      onCheckedChange={(next) => {
        startTransition(async () => {
          const result = await action(next);
          if (result && "error" in result && result.error) {
            toast.error(result.error);
            return;
          }
          toast.success(next ? "Marked active" : "Marked inactive");
        });
      }}
    />
  );
}
