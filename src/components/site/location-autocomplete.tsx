"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Route } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type LocationValue = { label: string; lat: number; lon: number };

type GeocodeResult = { label: string; lat: number; lon: number };

/**
 * A location text input with a live autocomplete dropdown, backed by the
 * free OpenStreetMap Nominatim search API via /api/geocode. Selecting a
 * suggestion hands back coordinates (via onSelect) so callers can do things
 * like auto-calculate distance between two selected points.
 *
 * When a `popular` list is supplied, focusing the (empty) field shows those
 * as quick picks before the user types anything - e.g. the company's own
 * branch cities.
 */
export function LocationAutocomplete({
  id,
  placeholder,
  value,
  onChange,
  onSelect,
  required,
  className,
  popular,
}: {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  onSelect?: (place: LocationValue) => void;
  required?: boolean;
  className?: string;
  popular?: LocationValue[];
}) {
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showingPopular, setShowingPopular] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleInputChange(text: string) {
    onChange(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.trim().length < 3) {
      setResults([]);
      setLoading(false);
      if (popular && popular.length > 0) {
        setShowingPopular(true);
        setOpen(true);
      } else {
        setShowingPopular(false);
        setOpen(false);
      }
      return;
    }

    setShowingPopular(false);
    setOpen(true);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const currentRequestId = ++requestIdRef.current;
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(text.trim())}`);
        const data = await res.json();
        if (currentRequestId !== requestIdRef.current) return;
        setResults(Array.isArray(data?.results) ? data.results : []);
      } catch {
        if (currentRequestId === requestIdRef.current) setResults([]);
      } finally {
        if (currentRequestId === requestIdRef.current) setLoading(false);
      }
    }, 400);
  }

  function handleFocus() {
    if (value.trim().length >= 3) {
      if (results.length > 0) {
        setShowingPopular(false);
        setOpen(true);
      }
    } else if (popular && popular.length > 0) {
      setShowingPopular(true);
      setOpen(true);
    }
  }

  function handleSelect(place: GeocodeResult) {
    onChange(place.label);
    onSelect?.(place);
    setResults([]);
    setShowingPopular(false);
    setOpen(false);
  }

  const listItems = showingPopular ? popular ?? [] : results;

  return (
    <div ref={containerRef} className="relative">
      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleFocus}
        className={cn("pl-9 pr-9", className)}
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      )}

      {open && listItems.length > 0 && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
          {showingPopular && (
            <p className="flex items-center gap-1.5 px-3 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <Route className="size-3" /> Popular Routes
            </p>
          )}
          <ul className="max-h-64 overflow-y-auto py-1">
            {listItems.map((r, i) => (
              <li key={`${r.lat}-${r.lon}-${i}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(r)}
                  className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <span className="line-clamp-2">{r.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
