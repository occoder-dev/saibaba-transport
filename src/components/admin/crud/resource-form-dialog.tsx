"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type FieldConfig =
  | { type: "hidden"; name: string }
  | { type: "text" | "password" | "email"; name: string; label: string; required?: boolean; placeholder?: string }
  | { type: "date"; name: string; label: string; required?: boolean }
  | {
      type: "textarea" | "lines";
      name: string;
      label: string;
      required?: boolean;
      rows?: number;
      placeholder?: string;
      hint?: string;
    }
  | {
      type: "number";
      name: string;
      label: string;
      required?: boolean;
      step?: string;
      min?: string;
      placeholder?: string;
    }
  | { type: "switch"; name: string; label: string }
  | {
      type: "select";
      name: string;
      label: string;
      options: { value: string; label: string }[];
      required?: boolean;
    };

export type ActionResult = { error?: string } | void | undefined;

export function ResourceFormDialog({
  trigger,
  title,
  description,
  fields,
  defaultValues,
  action,
  submitLabel = "Save",
}: {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  fields: FieldConfig[];
  defaultValues?: Record<string, unknown>;
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [switches, setSwitches] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const f of fields) {
      if (f.type === "switch") init[f.name] = Boolean(defaultValues?.[f.name] ?? true);
    }
    return init;
  });

  function handleSubmit(formData: FormData) {
    setError(null);
    for (const f of fields) {
      if (f.type === "switch") formData.set(f.name, switches[f.name] ? "true" : "false");
    }
    startTransition(async () => {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
        return;
      }
      toast.success("Saved successfully");
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setError(null);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {fields.map((f) => {
            if (f.type === "hidden") {
              return (
                <input key={f.name} type="hidden" name={f.name} defaultValue={(defaultValues?.[f.name] as string) ?? ""} />
              );
            }

            const defaultVal = defaultValues?.[f.name];

            if (f.type === "switch") {
              return (
                <div
                  key={f.name}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-3.5 py-3"
                >
                  <Label htmlFor={f.name}>{f.label}</Label>
                  <Switch
                    id={f.name}
                    checked={switches[f.name]}
                    onCheckedChange={(v) => setSwitches((s) => ({ ...s, [f.name]: v }))}
                  />
                </div>
              );
            }

            if (f.type === "select") {
              return (
                <div key={f.name} className="space-y-1.5">
                  <Label htmlFor={f.name}>{f.label}</Label>
                  <Select
                    name={f.name}
                    defaultValue={((defaultVal as string | undefined) ?? f.options[0]?.value) || undefined}
                  >
                    <SelectTrigger id={f.name} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            if (f.type === "textarea" || f.type === "lines") {
              return (
                <div key={f.name} className="space-y-1.5">
                  <Label htmlFor={f.name}>{f.label}</Label>
                  <Textarea
                    id={f.name}
                    name={f.name}
                    required={f.required}
                    rows={f.rows ?? (f.type === "lines" ? 4 : 3)}
                    placeholder={f.placeholder}
                    defaultValue={
                      Array.isArray(defaultVal) ? defaultVal.join("\n") : ((defaultVal as string | undefined) ?? "")
                    }
                  />
                  {f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
                </div>
              );
            }

            return (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name}>{f.label}</Label>
                <Input
                  id={f.name}
                  name={f.name}
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type}
                  step={f.type === "number" ? f.step : undefined}
                  min={f.type === "number" ? f.min : undefined}
                  required={f.required}
                  placeholder={f.type === "number" || f.type === "date" ? undefined : f.placeholder}
                  defaultValue={(defaultVal as string | number | undefined) ?? ""}
                />
              </div>
            );
          })}

          {error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
