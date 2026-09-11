"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Building2, CheckCircle2, IdCard, Loader2, ShieldCheck, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { siteConfig } from "@/lib/data";

// Standard 15-character GSTIN format, e.g. 24AAAAA0000A1Z5.
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
// Indian mobile numbers: 10 digits, starting 6-9.
const MOBILE_REGEX = /^[6-9]\d{9}$/;

type BranchOption = { value: string; label: string };
type FieldErrors = Partial<Record<"firmName" | "gstNumber" | "mobile" | "branch", string>>;

export function RegisterForm({ branches }: { branches: BranchOption[] }) {
  const [firmName, setFirmName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (firmName.trim().length < 2) {
      next.firmName = "Please enter your firm name.";
    }
    if (!GST_REGEX.test(gstNumber.trim().toUpperCase())) {
      next.gstNumber = "Enter a valid 15-character GST number (e.g. 24AAAAA0000A1Z5).";
    }
    if (!MOBILE_REGEX.test(mobile.replace(/\D/g, ""))) {
      next.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (!branch) {
      next.branch = "Please select a branch.";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "REGISTRATION",
          firmName: firmName.trim(),
          gstNumber: gstNumber.trim().toUpperCase(),
          mobile: mobile.replace(/\D/g, ""),
          branch,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setFirmName("");
    setGstNumber("");
    setMobile("");
    setBranch("");
    setErrors({});
    setFormError(null);
    setSubmitted(false);
  }

  return (
    <div>
      {/* The two columns stretch to match height (grid's default
          align-items), so the form card's border always reaches the same
          depth as the illustration beside it instead of stopping short and
          leaving a gap. */}
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CheckCircle2 className="size-8" />
            </motion.div>
            <h3 className="mt-5 text-xl font-semibold text-brand-charcoal">Registration received</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Thank you for registering. Our team will verify your details and share your Login ID
              on the mobile number you provided.
            </p>
            <Button variant="outline" className="mt-6" onClick={resetForm}>
              Register Another Firm
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="firmName">
                  Firm Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="firmName"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="Your firm / company name"
                  aria-invalid={Boolean(errors.firmName)}
                />
                {errors.firmName && <p className="text-xs text-destructive">{errors.firmName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gstNumber">
                  GST No. <span className="text-primary">*</span>
                </Label>
                <Input
                  id="gstNumber"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  placeholder="24AAAAA0000A1Z5"
                  maxLength={15}
                  className="uppercase"
                  aria-invalid={Boolean(errors.gstNumber)}
                />
                {errors.gstNumber && <p className="text-xs text-destructive">{errors.gstNumber}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-primary">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  maxLength={10}
                  aria-invalid={Boolean(errors.mobile)}
                />
                {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="branch">
                  Branch <span className="text-primary">*</span>
                </Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger id="branch" className="w-full" aria-invalid={Boolean(errors.branch)}>
                    <SelectValue placeholder="Select your nearest branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && <p className="text-xs text-destructive">{errors.branch}</p>}
              </div>
            </div>

            {formError && (
              <p className="mt-5 flex items-center gap-2 text-sm text-destructive" role="alert">
                <AlertTriangle className="size-4 shrink-0" /> {formError}
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
                    <UserPlus className="size-4" /> Submit Registration
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              By submitting, you agree to be contacted by our team to verify your details and issue
              your Login ID. We never share your information with third parties.
            </p>
          </form>
        )}

        <div className="overflow-hidden rounded-3xl border border-dashed border-border bg-secondary/30">
          <Image
            src="/images/registration.png"
            alt="Sai Baba Transport"
            width={1080}
            height={1350}
            className="block h-full w-full object-cover"
          />
        </div>
      </div>

      {/* A single aligned row beneath both columns, rather than stacking
          under just the image - keeps the section's bottom edge even
          regardless of how the form and illustration compare in height. */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <IdCard className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-brand-charcoal">A dedicated Login ID</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Track consignments, view booking history and raise support requests online.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-brand-charcoal">Verified by our team</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Every registration is checked before a Login ID is issued, for your account&apos;s security.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <Building2 className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-brand-charcoal">Already have a Login ID?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              <a
                href={siteConfig.crmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Sign in to your account
              </a>{" "}
              or call {siteConfig.phone} for help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
