"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationAutocomplete } from "@/components/site/location-autocomplete";
import { popularLocations } from "@/lib/data";

export type EnquiryField =
  | {
    type: "text" | "email" | "tel" | "number";
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    span?: 1 | 2;
  }
  | {
    type: "location";
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    span?: 1 | 2;
  }
  | {
    type: "select";
    name: string;
    label: string;
    options: string[];
    placeholder?: string;
    required?: boolean;
    span?: 1 | 2;
  }
  | {
    type: "textarea";
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    span?: 1 | 2;
  };

export type EnquiryType = "QUOTE" | "PARTNER" | "TRANSPORTER" | "CONTACT" | "CAREER";

export function EnquiryForm({
  fields,
  enquiryType,
  submitLabel = "Submit Enquiry",
  successTitle = "Enquiry received",
  successDescription = "Thank you - our team will review your details and get back to you shortly.",
  initialValues,
}: {
  fields: EnquiryField[];
  enquiryType: EnquiryType;
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
  /** Pre-fill the form, e.g. when arriving from the transport cost calculator. */
  initialValues?: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initialValues ?? {});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setValue(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: enquiryType, ...values }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <CheckCircle2 className="size-8" />
        </motion.div>
        <h3 className="mt-5 text-xl font-semibold text-brand-charcoal">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{successDescription}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setValues({});
            setSubmitted(false);
            setError(null);
          }}
        >
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.span === 2 ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-primary"> *</span>}
            </Label>
            {field.type === "location" ? (
              <LocationAutocomplete
                id={field.name}
                placeholder={field.placeholder ?? "Search city or address"}
                value={values[field.name] ?? ""}
                onChange={(text) => setValue(field.name, text)}
                onSelect={(place) => setValue(field.name, place.label)}
                popular={popularLocations}
                required={field.required}
              />
            ) : field.type === "textarea" ? (
              <Textarea
                id={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) => setValue(field.name, e.target.value)}
                rows={4}
              />
            ) : field.type === "select" ? (
              <Select
                value={values[field.name] ?? ""}
                onValueChange={(v) => setValue(field.name, v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder ?? "Select an option"} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) => setValue(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-5 flex items-center gap-2 text-sm text-destructive" role="alert">
          <AlertTriangle className="size-4 shrink-0" /> {error}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={submitting}>
        <AnimatePresence mode="wait" initial={false}>
          {submitting ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="size-4 animate-spin" /> Submitting...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send className="size-4" /> {submitLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
