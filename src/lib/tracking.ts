/**
 * Shared types and helpers for the Sai Baba Transport LR tracking feature.
 * The underlying data shape mirrors the "Get LR Tracking" API described in
 * the Sai Baba Transport Tracking API Usage Guide (crm.saibabat.com).
 */

export type TrackHistoryEntry = {
  OpType: string;
  OpDate: string;
  FromBranch: string;
  ToBranch: string;
  TotParcel: string;
  TruckNo: string;
  VIAStation: string;
  VPNumber: string;
  Description: string;
};

export type CurrentBranch = {
  BranchNM: string;
  Address: string;
  ContactNo: string;
};

export type TrackResult = {
  OpStatus: string;
  LRNumber: string;
  LRDate: string;
  BookingFrom: string;
  Destination: string;
  DeliveryLocation: string;
  Consignor: string;
  Consignee: string;
  GoodsDetail: string;
  PkgType: string;
  TotParcel: string;
  PrivateMarc: string;
  CurStatus: string;
  TrackData: TrackHistoryEntry[];
  LastLocation: CurrentBranch[];
};

/** The tracking API returns dates as "DD/MM/YYYY" strings. */
export function parseApiDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const [, d, m, y] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Formats an API "DD/MM/YYYY" date string as "11 Jul 2026". */
export function formatApiDate(value: string | undefined | null): string {
  const date = parseApiDate(value);
  if (!date) return value && value.trim() ? value : "—";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export type OpTypeKey = "OUT" | "TRANSIT" | "CROSSING" | "IN" | "DELIVERY" | "OTHER";

export function normalizeOpType(opType: string | undefined | null): OpTypeKey {
  const key = (opType || "").trim().toUpperCase();
  if (key === "OUT" || key === "TRANSIT" || key === "CROSSING" || key === "IN" || key === "DELIVERY") {
    return key;
  }
  return "OTHER";
}

export const opTypeLabels: Record<OpTypeKey, string> = {
  OUT: "Dispatched",
  TRANSIT: "In Transit",
  CROSSING: "Crossing Point",
  IN: "Reached Branch",
  DELIVERY: "Delivered",
  OTHER: "Update",
};

/**
 * Buckets the free-text current status into a small set of visual states so
 * the UI can color-code a badge without trying to parse every possible
 * status string the CRM might send back.
 */
export type ShipmentState = "delivered" | "in-transit" | "booked" | "unknown";

export function getShipmentState(curStatus: string | undefined | null, trackData?: TrackHistoryEntry[]): ShipmentState {
  const status = (curStatus || "").toUpperCase();
  const lastOp = trackData && trackData.length > 0 ? normalizeOpType(trackData[trackData.length - 1].OpType) : null;

  if (status.includes("DELIVER") || lastOp === "DELIVERY") return "delivered";
  if (
    status.includes("TRANSIT") ||
    status.includes("OUT") ||
    status.includes("WAY") ||
    status.includes("CROSS") ||
    lastOp === "TRANSIT" ||
    lastOp === "OUT" ||
    lastOp === "CROSSING" ||
    lastOp === "IN"
  ) {
    return "in-transit";
  }
  if (trackData && trackData.length === 0) return "booked";
  return "unknown";
}

export const shipmentStateMeta: Record<
  ShipmentState,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  delivered: {
    label: "Delivered",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  "in-transit": {
    label: "In Transit",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
    dotClassName: "bg-amber-500",
  },
  booked: {
    label: "Booked",
    badgeClassName: "border-primary/30 bg-primary/10 text-primary",
    dotClassName: "bg-primary",
  },
  unknown: {
    label: "Status Update",
    badgeClassName: "border-border bg-secondary text-secondary-foreground",
    dotClassName: "bg-brand-gray",
  },
};
