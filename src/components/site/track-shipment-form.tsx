"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Building2,
  CalendarDays,
  Check,
  Copy,
  Hash,
  Loader2,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Search,
  Tag,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data";
import {
  formatApiDate,
  getShipmentState,
  shipmentStateMeta,
  type TrackResult,
} from "@/lib/tracking";
import { TrackTimeline } from "@/components/site/track-timeline";

const RECENT_KEY = "sbt-recent-lr-numbers";
const MAX_RECENT = 5;

function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function saveRecent(lr: string) {
  try {
    const existing = readRecent().filter((v) => v !== lr);
    const next = [lr, ...existing].slice(0, MAX_RECENT);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    return next;
  } catch {
    return readRecent();
  }
}

export function TrackShipmentForm({ initialLr }: { initialLr?: string }) {
  const router = useRouter();
  const [lrNumber, setLrNumber] = useState(initialLr ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Deferred to a microtask (rather than calling setState directly in the
    // effect body) to avoid a synchronous cascading render.
    Promise.resolve().then(() => setRecent(readRecent()));
  }, []);

  // Support deep links like /track?lr=40018310 (e.g. from an SMS or WhatsApp
  // dispatch notification) by auto-running the search once on load.
  useEffect(() => {
    if (initialLr && initialLr.trim()) {
      void runTrack(initialLr.trim());
    }
    // Intentionally only re-run when the deep-link value itself changes -
    // runTrack and router are stable for our purposes here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLr]);

  async function runTrack(lr: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    // Reflect the LR being searched in the URL (?lr=...) without a full
    // navigation, so the address bar - and a copy/paste or bookmark of it -
    // always matches what's on screen.
    router.replace(`/track?lr=${encodeURIComponent(lr)}`, { scroll: false });

    try {
      const res = await fetch(`/api/track?lr=${encodeURIComponent(lr)}`, { cache: "no-store" });
      const data = await res.json().catch(() => null);

      if (!data?.ok) {
        setError(data?.error || "We couldn't find that shipment. Please check the LR number and try again.");
        return;
      }

      setResult(data.data as TrackResult);
      setRecent(saveRecent(lr));
    } catch {
      setError("Something went wrong while fetching tracking details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = lrNumber.trim();
    if (!value) {
      setError("Please enter your LR number.");
      return;
    }
    void runTrack(value);
  }

  function handleReset() {
    setResult(null);
    setError(null);
    setLrNumber("");
    router.replace("/track", { scroll: false });
  }

  async function handleCopyLink() {
    if (!result) return;
    const url = `${window.location.origin}/track?lr=${encodeURIComponent(result.LRNumber)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail silently (older browsers, permissions) -
      // not worth surfacing an error for a convenience action.
    }
  }

  return (
    <div className="relative z-10 mx-auto -mt-16 w-full max-w-3xl px-4 sm:-mt-20 sm:px-6 lg:px-8">
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-border bg-card p-5 shadow-premium-lg sm:p-7"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-brand-charcoal sm:text-lg">Track Your LR</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">Enter the LR number printed on your consignment note or receipt.</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Hash className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={lrNumber}
              onChange={(e) => {
                setLrNumber(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. 40018310"
              className="h-12 pl-10 text-base"
              inputMode="text"
              autoComplete="off"
              aria-label="LR number"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 shrink-0" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Tracking...
              </>
            ) : (
              <>
                <Search className="size-4" /> Track Shipment
              </>
            )}
          </Button>
        </div>

        {recent.length > 0 && !result && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Recent:</span>
            {recent.map((lr) => (
              <button
                key={lr}
                type="button"
                onClick={() => {
                  setLrNumber(lr);
                  void runTrack(lr);
                }}
                className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {lr}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-4 flex items-start gap-2 text-sm text-destructive" role="alert">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error}
          </p>
        )}
      </motion.form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-4 rounded-3xl border border-border bg-card p-7"
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="size-10 shrink-0 animate-pulse rounded-full bg-secondary" />
                <div className="flex-1 space-y-2 pt-1.5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {!loading && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-premium"
          >
            <ResultHeader result={result} onCopyLink={handleCopyLink} copied={copied} onReset={handleReset} />
            <ResultBody result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultHeader({
  result,
  onCopyLink,
  copied,
  onReset,
}: {
  result: TrackResult;
  onCopyLink: () => void;
  copied: boolean;
  onReset: () => void;
}) {
  const state = getShipmentState(result.CurStatus, result.TrackData);
  const meta = shipmentStateMeta[state];

  return (
    <div className="relative overflow-hidden bg-brand-charcoal px-6 py-7 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium uppercase tracking-wider text-white/50">LR Number</span>
            <Badge className={cn("border", meta.badgeClassName)}>
              <span className={cn("mr-1 size-1.5 rounded-full", meta.dotClassName)} />
              {result.CurStatus?.trim() || meta.label}
            </Badge>
          </div>
          <p className="mt-1.5 font-display text-3xl tracking-wide sm:text-4xl">{result.LRNumber}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/55">
            <CalendarDays className="size-3.5" /> Booked on {formatApiDate(result.LRDate)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyLink}
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy Link"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-3.5" /> New Search
          </Button>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 text-sm">
        <span className="font-semibold text-white">{result.BookingFrom || "—"}</span>
        <ArrowRight className="size-4 text-primary" />
        <span className="font-semibold text-white">{result.Destination || "—"}</span>
        {result.DeliveryLocation && (
          <span className="text-white/50">· Delivery at {result.DeliveryLocation}</span>
        )}
      </div>
    </div>
  );
}

function ResultBody({ result }: { result: TrackResult }) {
  const branch = result.LastLocation?.[0];

  return (
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Shipment Journey</h3>
        <div className="mt-5">
          <TrackTimeline entries={result.TrackData} />
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-secondary/30 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Consignment Details</h3>
          <dl className="mt-4 space-y-3.5">
            <DetailRow icon={User} label="Consignor" value={result.Consignor} />
            <DetailRow icon={Building2} label="Consignee" value={result.Consignee} />
            <DetailRow icon={Package} label="Goods" value={result.GoodsDetail} />
            <DetailRow
              icon={Boxes}
              label="Packages"
              value={[result.PkgType, result.TotParcel ? `${result.TotParcel} pkg${result.TotParcel === "1" ? "" : "s"}` : null]
                .filter(Boolean)
                .join(" · ")}
            />
            {result.PrivateMarc && <DetailRow icon={Tag} label="Private Mark" value={result.PrivateMarc} />}
          </dl>
        </div>

        {branch && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <MapPin className="size-4" /> Current / Delivering Branch
            </h3>
            <p className="mt-3 text-sm font-semibold text-brand-charcoal">{branch.BranchNM}</p>
            {branch.Address && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{branch.Address}</p>}
            {branch.ContactNo && (
              <div className="mt-3 flex flex-wrap gap-2">
                {branch.ContactNo.split(",").map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.trim()}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Phone className="size-3.5" /> {num.trim()}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
          Questions about this shipment? Call{" "}
          <a href={siteConfig.phoneHref} className="font-medium text-primary hover:underline">
            {siteConfig.phone}
          </a>{" "}
          or{" "}
          <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
            message us on WhatsApp
          </a>
          .
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="truncate text-sm font-medium text-brand-charcoal" title={value}>
          {value}
        </dd>
      </div>
    </div>
  );
}
