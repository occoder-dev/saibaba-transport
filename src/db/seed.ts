import "dotenv/config";
import { db } from "./index";
import {
  users,
  branches,
  services,
  industries,
  faqs,
  blogPosts,
  galleryImages,
  vehicleTypes,
  materialCategories,
} from "./schema";
import { hashPassword } from "@/lib/auth/password";
import { branches as branchData, faqs as faqData, blogPosts as blogData } from "@/lib/data";

const serviceSeed = [
  {
    slug: "full-truck-load",
    name: "Full Truck Load (FTL)",
    short: "Dedicated vehicles for bulk consignments, direct pickup to destination.",
    description:
      "When your consignment needs a dedicated vehicle, our FTL service moves it directly from origin to destination with no intermediate handling - faster transit, tighter schedules and better handling for bulk textile and industrial loads.",
    icon: "Truck",
    points: ["Dedicated vehicle, no sharing", "Faster point-to-point transit", "Ideal for bulk & high-value loads", "Real-time dispatch coordination"],
    sortOrder: 0,
  },
  {
    slug: "part-truck-load",
    name: "Part Truck Load (PTL)",
    short: "Cost-efficient shared-load transportation for smaller consignments.",
    description:
      "For shipments that don't need a full vehicle, our PTL network consolidates multiple consignments on shared routes - giving smaller businesses access to pan-India reach without paying for unused capacity.",
    icon: "PackageSearch",
    points: ["Pay only for the space you use", "Wide network of shared routes", "Suited for regular small dispatches", "Careful load consolidation"],
    sortOrder: 1,
  },
  {
    slug: "rail-transportation",
    name: "Rail / Train Transportation",
    short: "Multimodal rail freight for long-haul, high-volume consignments.",
    description:
      "Alongside our road fleet, we coordinate rail freight movement for long-haul, high-volume consignments - a cost-efficient, multimodal option for bulk textile, industrial and commercial cargo over longer distances, with road transport handling first- and last-mile pickup and delivery.",
    icon: "TrainFront",
    points: ["Cost-efficient for long-haul bulk cargo", "Road pickup & delivery on both ends", "Suited to high-volume consignments", "Multimodal road + rail coordination"],
    sortOrder: 2,
  },
  {
    slug: "textile-transportation",
    name: "Textile Transportation",
    short: "Our core specialty - factory-to-destination textile logistics.",
    description:
      "Textile transportation is where Sai Baba Transport began, and it remains our core strength. From grey fabric to finished garments, we handle bulk textile movement between mills, processing units, wholesale markets and retail destinations across India.",
    icon: "Shirt",
    points: ["Deep textile-corridor experience", "Bulk & bale-safe handling", "Mill-to-market coverage", "Trusted by textile traders for years"],
    sortOrder: 3,
  },
  {
    slug: "industrial-transportation",
    name: "Industrial Transportation",
    short: "Reliable movement of machinery, raw material and industrial goods.",
    description:
      "We support manufacturers with the movement of raw materials, semi-finished goods and machinery between plants, warehouses and distribution points, with vehicle types matched to load and handling requirements.",
    icon: "Factory",
    points: ["Matched vehicle types for heavy loads", "Plant-to-warehouse movement", "Scheduled & on-demand dispatch", "Careful loading/unloading coordination"],
    sortOrder: 4,
  },
  {
    slug: "commercial-transportation",
    name: "Commercial Transportation",
    short: "General commercial goods transportation for businesses of all sizes.",
    description:
      "General commercial cargo - retail stock, packaged goods, e-commerce bulk shipments - moved reliably across our branch and partner network with transparent tracking of dispatch status.",
    icon: "Building2",
    points: ["Flexible for varied commercial cargo", "Suited to retail & wholesale supply chains", "Branch-supported dispatch", "Business-friendly documentation"],
    sortOrder: 5,
  },
  {
    slug: "dedicated-transportation",
    name: "Dedicated Transportation",
    short: "Fixed vehicles and routes for businesses with regular volumes.",
    description:
      "For businesses with predictable, recurring dispatch volumes, we can dedicate specific vehicles and routes - improving reliability, planning and cost predictability for long-term relationships.",
    icon: "Route",
    points: ["Fixed vehicle allocation", "Predictable recurring schedules", "Priority handling", "Long-term contract friendly"],
    sortOrder: 6,
  },
  {
    slug: "contract-transportation",
    name: "Contract Transportation",
    short: "Structured long-term transportation contracts for enterprises.",
    description:
      "We work with enterprise clients on structured transportation contracts covering defined routes, volumes and service levels - supported by our own fleet and vetted third-party transporter network.",
    icon: "FileSignature",
    points: ["Custom SLAs & reporting", "Combined own-fleet + partner capacity", "Volume-based commercial terms", "Dedicated account coordination"],
    sortOrder: 7,
  },
  {
    slug: "third-party-transportation",
    name: "Third-Party Transportation",
    short: "Extended reach through our vetted transporter partner network.",
    description:
      "Beyond our own fleet, we coordinate a network of verified third-party transporters to extend coverage into additional routes and vehicle types - while managing quality and accountability centrally.",
    icon: "Network",
    points: ["Verified partner transporters", "Extended route & vehicle coverage", "Centrally coordinated accountability", "Scales with demand spikes"],
    sortOrder: 8,
  },
  {
    slug: "pan-india-transportation",
    name: "Pan-India Transportation",
    short: "Branch and network coverage connecting major business hubs.",
    description:
      "Our branch network and transporter partnerships are built to connect India's major manufacturing, trading and consumption hubs - giving businesses one point of contact for multi-state movement.",
    icon: "MapPinned",
    points: ["Multi-state route coverage", "Single point of coordination", "Branch-backed local support", "Growing network of locations"],
    sortOrder: 9,
  },
  {
    slug: "customized-logistics",
    name: "Customized Logistics Solutions",
    short: "Tailored transportation plans built around your business needs.",
    description:
      "Every business ships differently. We work with clients to design a transportation plan around their specific material type, frequency, budget and delivery expectations.",
    icon: "Sparkles",
    points: ["Needs-based route planning", "Flexible commercial structures", "Scalable as your business grows", "Consultative onboarding"],
    sortOrder: 10,
  },
];

const industrySeed = [
  { name: "Textile", icon: "Shirt", description: "Our founding industry - mills, traders and garment units across India.", sortOrder: 0 },
  { name: "Manufacturing", icon: "Factory", description: "Raw material and finished goods movement for manufacturers.", sortOrder: 1 },
  { name: "Retail", icon: "ShoppingBag", description: "Store replenishment and wholesale-to-retail distribution.", sortOrder: 2 },
  { name: "FMCG", icon: "Boxes", description: "High-frequency, time-sensitive consumer goods dispatch.", sortOrder: 3 },
  { name: "E-commerce", icon: "PackageSearch", description: "Bulk fulfilment-center and warehouse-to-hub movement.", sortOrder: 4 },
  { name: "Industrial", icon: "Warehouse", description: "Heavy and bulk industrial cargo between plants and depots.", sortOrder: 5 },
  { name: "Automotive", icon: "Car", description: "Components and parts logistics for the auto supply chain.", sortOrder: 6 },
  { name: "Construction", icon: "HardHat", description: "Material transportation for construction and infrastructure.", sortOrder: 7 },
  { name: "Pharmaceuticals", icon: "Pill", description: "Careful, schedule-sensitive pharma goods transportation.", sortOrder: 8 },
];

const vehicleTypeSeed = [
  { name: "Tata Ace / Mini Truck", perKmRate: "18", baseFare: "800", capacityTons: "0.75", sortOrder: 0 },
  { name: "14-ft Truck", perKmRate: "26", baseFare: "1500", capacityTons: "3.5", sortOrder: 1 },
  { name: "17-ft Truck", perKmRate: "30", baseFare: "1800", capacityTons: "5", sortOrder: 2 },
  { name: "19-ft Truck", perKmRate: "34", baseFare: "2100", capacityTons: "7", sortOrder: 3 },
  { name: "22-ft Truck (Multi-axle)", perKmRate: "40", baseFare: "2600", capacityTons: "9", sortOrder: 4 },
  { name: "32-ft Trailer (Single/Multi-axle)", perKmRate: "52", baseFare: "3800", capacityTons: "16", sortOrder: 5 },
  { name: "Container Truck", perKmRate: "48", baseFare: "3400", capacityTons: "14", sortOrder: 6 },
  { name: "Open Body Truck", perKmRate: "32", baseFare: "1700", capacityTons: "6", sortOrder: 7 },
];

const materialCategorySeed = [
  { name: "Textile / Fabric / Garments", multiplier: "1.00", sortOrder: 0 },
  { name: "Industrial Machinery / Parts", multiplier: "1.15", sortOrder: 1 },
  { name: "FMCG / Packaged Goods", multiplier: "1.00", sortOrder: 2 },
  { name: "Retail / E-commerce Cargo", multiplier: "1.05", sortOrder: 3 },
  { name: "Construction Material", multiplier: "1.20", sortOrder: 4 },
  { name: "Automotive Components", multiplier: "1.10", sortOrder: 5 },
  { name: "Pharmaceuticals", multiplier: "1.25", sortOrder: 6 },
  { name: "Other Commercial Goods", multiplier: "1.00", sortOrder: 7 },
];

const gallerySeed = [
  { url: "/images/truck-02.jpeg", caption: "Sai Baba Transport container truck ready for dispatch", category: "Fleet", sortOrder: 0 },
  { url: "/images/truck-01.jpeg", caption: "Sai Baba Transport truck on the road at dusk", category: "Fleet", sortOrder: 1 },
  { url: "/images/truck-03.jpeg", caption: "Two Sai Baba Transport trucks parked at the warehouse", category: "Warehouse", sortOrder: 2 },
];

async function main() {
  console.log("Seeding database...");

  const adminName = process.env.SEED_ADMIN_NAME ?? "Site Administrator";
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "admin@saibabat.com").toLowerCase().trim();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await db.select().from(users);
  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      name: adminName,
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: "SUPER_ADMIN",
    });
    console.log(`Created SUPER_ADMIN user: ${adminEmail} (password from SEED_ADMIN_PASSWORD)`);
  } else {
    console.log(`Skipped user seed - ${existingAdmin.length} user(s) already exist.`);
  }

  await db.delete(branches);
  await db.insert(branches).values(
    branchData.map((b, i) => ({
      city: b.city,
      state: b.state,
      address: b.address ?? null,
      phones: b.phones,
      email: b.email,
      services: b.services,
      isHeadOffice: b.isHeadOffice ?? false,
      sortOrder: i,
    }))
  );
  console.log(`Seeded ${branchData.length} branches.`);

  await db.delete(services);
  await db.insert(services).values(serviceSeed);
  console.log(`Seeded ${serviceSeed.length} services.`);

  await db.delete(industries);
  await db.insert(industries).values(industrySeed);
  console.log(`Seeded ${industrySeed.length} industries.`);

  await db.delete(faqs);
  await db.insert(faqs).values(faqData.map((f, i) => ({ ...f, sortOrder: i })));
  console.log(`Seeded ${faqData.length} FAQs.`);

  await db.delete(blogPosts);
  await db.insert(blogPosts).values(
    blogData.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      publishedAt: new Date(p.date),
    }))
  );
  console.log(`Seeded ${blogData.length} blog posts.`);

  await db.delete(vehicleTypes);
  await db.insert(vehicleTypes).values(vehicleTypeSeed);
  console.log(`Seeded ${vehicleTypeSeed.length} vehicle types.`);

  await db.delete(materialCategories);
  await db.insert(materialCategories).values(materialCategorySeed);
  console.log(`Seeded ${materialCategorySeed.length} material categories.`);

  await db.delete(galleryImages);
  await db.insert(galleryImages).values(gallerySeed);
  console.log(`Seeded ${gallerySeed.length} gallery images.`);

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
