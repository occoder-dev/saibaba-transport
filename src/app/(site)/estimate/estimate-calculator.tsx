"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Calculator, IndianRupee, Loader2, Package, Send } from "lucide-react";

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
import { LocationAutocomplete, type LocationValue } from "@/components/site/location-autocomplete";
import { siteConfig, popularLocations } from "@/lib/data";

type PricingVehicleType = { name: string; perKmRate: number; baseFare: number; capacityTons: number };
type PricingMaterialCategory = { name: string; multiplier: number };

type Result = {
  low: number;
  high: number;
  distance: number;
  vehicle: string;
};

export function EstimateCalculator() {
  const [vehicleTypes, setVehicleTypes] = useState<PricingVehicleType[]>([]);
  const [materialCategories, setMaterialCategories] = useState<PricingMaterialCategory[]>([]);
  const [loadingPricing, setLoadingPricing] = useState(true);
  const [pricingError, setPricingError] = useState(false);

  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [pickupPlace, setPickupPlace] = useState<LocationValue | null>(null);
  const [deliveryPlace, setDeliveryPlace] = useState<LocationValue | null>(null);
  const [distance, setDistance] = useState("");
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceAuto, setDistanceAuto] = useState(false);
  const [material, setMaterial] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [weight, setWeight] = useState("");
  const [loadType, setLoadType] = useState<"FTL" | "PTL">("FTL");
  const [notes, setNotes] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data?.ok) throw new Error("Failed to load pricing");
        setVehicleTypes(data.vehicleTypes);
        setMaterialCategories(data.materialCategories);
      })
      .catch(() => {
        if (!cancelled) setPricingError(true);
      })
      .finally(() => {
        if (!cancelled) setLoadingPricing(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-fill the approximate distance once both pickup and delivery have
  // been picked from the map suggestions, using the free OSRM routing API.
  useEffect(() => {
    if (!pickupPlace || !deliveryPlace) return;
    let cancelled = false;

    const params = new URLSearchParams({
      pickupLat: String(pickupPlace.lat),
      pickupLon: String(pickupPlace.lon),
      dropLat: String(deliveryPlace.lat),
      dropLon: String(deliveryPlace.lon),
    });

    // Kick the loading flag on from within a callback (rather than directly
    // in the effect body) so this doesn't trigger a synchronous cascading
    // render.
    Promise.resolve()
      .then(() => {
        if (!cancelled) setDistanceLoading(true);
      })
      .then(() => fetch(`/api/route-distance?${params.toString()}`))
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.ok && typeof data.distanceKm === "number") {
          setDistance(String(data.distanceKm));
          setDistanceAuto(true);
        }
      })
      .catch(() => { })
      .finally(() => {
        if (!cancelled) setDistanceLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pickupPlace, deliveryPlace]);

  const canCalculate = pickup && delivery && distance && vehicle && material;

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const dist = Number(distance);
    if (!dist || dist <= 0) {
      setError("Please enter a valid distance in kilometers.");
      return;
    }
    const rate = vehicleTypes.find((v) => v.name === vehicle);
    if (!rate) {
      setError("Please select a vehicle type.");
      return;
    }

    setCalculating(true);
    setResult(null);

    setTimeout(() => {
      const matMultiplier = materialCategories.find((m) => m.name === material)?.multiplier ?? 1;
      const loadFactor = loadType === "PTL" ? 0.62 : 1;

      const raw = (rate.baseFare + dist * rate.perKmRate) * matMultiplier * loadFactor;
      const low = Math.round((raw * 0.9) / 50) * 50;
      const high = Math.round((raw * 1.15) / 50) * 50;

      setResult({ low, high, distance: dist, vehicle });
      setCalculating(false);
    }, 700);
  }

  // Carry the shipment details the customer already entered over to the
  // formal quote request form, so they don't have to retype them.
  function buildQuoteHref(r: Result) {
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (delivery) params.set("delivery", delivery);
    if (material) params.set("material", material);
    if (r.vehicle) params.set("vehicle", r.vehicle);
    if (weight) params.set("weight", `${weight} tons`);
    params.set(
      "message",
      `Indicative estimate from the transport cost calculator: ₹${r.low.toLocaleString("en-IN")} – ₹${r.high.toLocaleString(
        "en-IN"
      )} for ${r.distance.toLocaleString("en-IN")} km via ${r.vehicle} (${loadType === "FTL" ? "Full Truck Load" : "Part Truck Load"
      }).${notes ? ` Additional requirements: ${notes}` : ""}`
    );
    return `/quote?${params.toString()}`;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <form
        onSubmit={handleCalculate}
        className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calculator className="size-5" />
          </div>
          <h2 className="text-lg font-semibold text-brand-charcoal">Enter Shipment Details</h2>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pickup">Pickup Location</Label>
            <LocationAutocomplete
              id="pickup"
              placeholder="Search city or address, e.g. Surat, Gujarat"
              value={pickup}
              onChange={(text) => {
                setPickup(text);
                setPickupPlace(null);
                setDistanceAuto(false);
              }}
              onSelect={(place) => {
                setPickup(place.label);
                setPickupPlace(place);
              }}
              popular={popularLocations}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="delivery">Delivery Location</Label>
            <LocationAutocomplete
              id="delivery"
              placeholder="Search city or address, e.g. Bengaluru, Karnataka"
              value={delivery}
              onChange={(text) => {
                setDelivery(text);
                setDeliveryPlace(null);
                setDistanceAuto(false);
              }}
              onSelect={(place) => {
                setDelivery(place.label);
                setDeliveryPlace(place);
              }}
              popular={popularLocations}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="distance">Approximate Distance (km)</Label>
            <div className="relative">
              <Input
                id="distance"
                type="number"
                min={1}
                placeholder="e.g. 950"
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value);
                  setDistanceAuto(false);
                }}
                className="pr-9"
                required
              />
              {distanceLoading && (
                <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {distanceLoading
                ? "Calculating approximate road distance..."
                : distanceAuto
                  ? "Auto-calculated from your selected locations - adjust if needed."
                  : "Auto-fills once you pick pickup and delivery from the suggestions."}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="weight">Approximate Weight (tons)</Label>
            <Input
              id="weight"
              type="number"
              min={0}
              step="0.1"
              placeholder="e.g. 4.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Material / Category</Label>
            <Select value={material} onValueChange={setMaterial} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select material category" />
              </SelectTrigger>
              <SelectContent>
                {materialCategories.map((m) => (
                  <SelectItem key={m.name} value={m.name}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Vehicle Type</Label>
            <Select value={vehicle} onValueChange={setVehicle} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={loadingPricing ? "Loading vehicle types..." : "Select vehicle type"} />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((v) => (
                  <SelectItem key={v.name} value={v.name}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>Required Transportation Type</Label>
            <div className="flex gap-2">
              {(["FTL", "PTL"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLoadType(t)}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${loadType === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-input text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {t === "FTL" ? "Full Truck Load (FTL)" : "Part Truck Load (PTL)"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="notes">Additional Requirements</Label>
            <Textarea
              id="notes"
              placeholder="Any special handling, packaging or scheduling requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        {pricingError && (
          <p className="mt-4 flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="size-4" /> Couldn&apos;t load current pricing. Please refresh and try again.
          </p>
        )}

        {error && (
          <p className="mt-4 flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="size-4" /> {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full"
          disabled={!canCalculate || calculating || loadingPricing || pricingError}
        >
          {calculating ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Calculating...
            </>
          ) : (
            <>
              <Calculator className="size-4" /> Calculate Transport Cost
            </>
          )}
        </Button>
      </form>

      <div className="flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl bg-brand-charcoal p-8 text-white"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Indicative Estimate
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <IndianRupee className="size-6 text-white/70" />
                <span className="font-display text-4xl tracking-wide sm:text-5xl">
                  {result.low.toLocaleString("en-IN")} – {result.high.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/60">
                For {result.distance.toLocaleString("en-IN")} km via {result.vehicle}
              </p>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/65">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
                <p>
                  This is an indicative, lead-generation estimate only - not a
                  final quotation. The final freight amount depends on actual
                  route, vehicle availability, fuel and toll charges,
                  loading/unloading, material type, market conditions and our
                  commercial terms.
                </p>
              </div>

              <Button variant="secondary" className="mt-6 w-full text-primary" asChild>
                <a href={buildQuoteHref(result)}>
                  <Send className="size-4" /> Convert to a Formal Quote Request
                </a>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden rounded-3xl border border-dashed border-border bg-secondary/30"
            >
              <div className="flex justify-center">
                <Image
                  src="/images/cost-estimater-v.png"
                  alt="Saibaba Transport truck"
                  width={1080}
                  height={1350}
                  className="block h-auto w-full object-contain"
                />
              </div>
              {/* <p className="mt-5 text-sm text-muted-foreground">
                Fill in your shipment details to see an indicative transport
                cost estimate.
              </p> */}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <Package className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-brand-charcoal">Need a formal quotation instead?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Use our{" "}
              <a href="/quote" className="text-primary underline underline-offset-2">
                Request a Quote
              </a>{" "}
              form, or call {siteConfig.phone} to speak with our team directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
