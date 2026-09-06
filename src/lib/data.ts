import type { LucideIcon } from "lucide-react";
import {
  Truck,
  TrainFront,
  PackageSearch,
  Shirt,
  Factory,
  Building2,
  FileSignature,
  Network,
  MapPinned,
  Sparkles,
  ShoppingBag,
  Boxes,
  Car,
  HardHat,
  Pill,
  Warehouse,
  ShieldCheck,
  Clock,
  Users,
  Route,
} from "lucide-react";

export const siteConfig = {
  name: "Sai Baba Transport",
  tagline: "Moving Yourself for Success",
  description:
    "Pan-India multimodal transportation and logistics partner for textile, industrial and commercial goods - road (full truck load, part truck load) and rail freight, backed by dedicated fleet solutions.",
  phone: "+91 90334 70451",
  phoneHref: "tel:+919033470451",
  supportPhone: "+91 90334 70451",
  supportPhoneHref: "tel:+919033470451",
  whatsapp: "+91 90334 70451",
  whatsappHref: "https://wa.me/919033470451",
  email: "saibabatpt23@gmail.com",
  crmUrl: "http://crm.saibabat.com",
  erpUrl: "http://saibabat.com",
  address: "75-77, Niyol Transport Nagar, Niyolgam, Surat - 394325, Gujarat, India",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.657342650938!2d72.9278896!3d21.1660306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045004ea597bd%3A0xbd9afceeea1c6b53!2sSai%20Baba%20Transport!5e0!3m2!1sen!2sin!4v1787249494584!5m2!1sen!2sin",
  mapsLinkUrl: "https://maps.app.goo.gl/nwLYxXZ9aomAkFqbA",
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "full-truck-load",
    name: "Full Truck Load (FTL)",
    short: "Dedicated vehicles for bulk consignments, direct pickup to destination.",
    description:
      "When your consignment needs a dedicated vehicle, our FTL service moves it directly from origin to destination with no intermediate handling - faster transit, tighter schedules and better handling for bulk textile and industrial loads.",
    icon: Truck,
    points: ["Dedicated vehicle, no sharing", "Faster point-to-point transit", "Ideal for bulk & high-value loads", "Real-time dispatch coordination"],
  },
  {
    slug: "part-truck-load",
    name: "Part Truck Load (PTL)",
    short: "Cost-efficient shared-load transportation for smaller consignments.",
    description:
      "For shipments that don't need a full vehicle, our PTL network consolidates multiple consignments on shared routes - giving smaller businesses access to pan-India reach without paying for unused capacity.",
    icon: PackageSearch,
    points: ["Pay only for the space you use", "Wide network of shared routes", "Suited for regular small dispatches", "Careful load consolidation"],
  },
  {
    slug: "rail-transportation",
    name: "Rail / Train Transportation",
    short: "Multimodal rail freight for long-haul, high-volume consignments.",
    description:
      "Alongside our road fleet, we coordinate rail freight movement for long-haul, high-volume consignments - a cost-efficient, multimodal option for bulk textile, industrial and commercial cargo over longer distances, with road transport handling first- and last-mile pickup and delivery.",
    icon: TrainFront,
    points: ["Cost-efficient for long-haul bulk cargo", "Road pickup & delivery on both ends", "Suited to high-volume consignments", "Multimodal road + rail coordination"],
  },
  {
    slug: "textile-transportation",
    name: "Textile Transportation",
    short: "Our core specialty - factory-to-destination textile logistics.",
    description:
      "Textile transportation is where Sai Baba Transport began, and it remains our core strength. From grey fabric to finished garments, we handle bulk textile movement between mills, processing units, wholesale markets and retail destinations across India.",
    icon: Shirt,
    points: ["Deep textile-corridor experience", "Bulk & bale-safe handling", "Mill-to-market coverage", "Trusted by textile traders for years"],
  },
  {
    slug: "industrial-transportation",
    name: "Industrial Transportation",
    short: "Reliable movement of machinery, raw material and industrial goods.",
    description:
      "We support manufacturers with the movement of raw materials, semi-finished goods and machinery between plants, warehouses and distribution points, with vehicle types matched to load and handling requirements.",
    icon: Factory,
    points: ["Matched vehicle types for heavy loads", "Plant-to-warehouse movement", "Scheduled & on-demand dispatch", "Careful loading/unloading coordination"],
  },
  {
    slug: "commercial-transportation",
    name: "Commercial Transportation",
    short: "General commercial goods transportation for businesses of all sizes.",
    description:
      "General commercial cargo - retail stock, packaged goods, e-commerce bulk shipments - moved reliably across our branch and partner network with transparent tracking of dispatch status.",
    icon: Building2,
    points: ["Flexible for varied commercial cargo", "Suited to retail & wholesale supply chains", "Branch-supported dispatch", "Business-friendly documentation"],
  },
  {
    slug: "dedicated-transportation",
    name: "Dedicated Transportation",
    short: "Fixed vehicles and routes for businesses with regular volumes.",
    description:
      "For businesses with predictable, recurring dispatch volumes, we can dedicate specific vehicles and routes - improving reliability, planning and cost predictability for long-term relationships.",
    icon: Route,
    points: ["Fixed vehicle allocation", "Predictable recurring schedules", "Priority handling", "Long-term contract friendly"],
  },
  {
    slug: "contract-transportation",
    name: "Contract Transportation",
    short: "Structured long-term transportation contracts for enterprises.",
    description:
      "We work with enterprise clients on structured transportation contracts covering defined routes, volumes and service levels - supported by our own fleet and vetted third-party transporter network.",
    icon: FileSignature,
    points: ["Custom SLAs & reporting", "Combined own-fleet + partner capacity", "Volume-based commercial terms", "Dedicated account coordination"],
  },
  {
    slug: "third-party-transportation",
    name: "Third-Party Transportation",
    short: "Extended reach through our vetted transporter partner network.",
    description:
      "Beyond our own fleet, we coordinate a network of verified third-party transporters to extend coverage into additional routes and vehicle types - while managing quality and accountability centrally.",
    icon: Network,
    points: ["Verified partner transporters", "Extended route & vehicle coverage", "Centrally coordinated accountability", "Scales with demand spikes"],
  },
  {
    slug: "pan-india-transportation",
    name: "Pan-India Transportation",
    short: "Branch and network coverage connecting major business hubs.",
    description:
      "Our branch network and transporter partnerships are built to connect India's major manufacturing, trading and consumption hubs - giving businesses one point of contact for multi-state movement.",
    icon: MapPinned,
    points: ["Multi-state route coverage", "Single point of coordination", "Branch-backed local support", "Growing network of locations"],
  },
  {
    slug: "customized-logistics",
    name: "Customized Logistics Solutions",
    short: "Tailored transportation plans built around your business needs.",
    description:
      "Every business ships differently. We work with clients to design a transportation plan around their specific material type, frequency, budget and delivery expectations.",
    icon: Sparkles,
    points: ["Needs-based route planning", "Flexible commercial structures", "Scalable as your business grows", "Consultative onboarding"],
  },
];

export type Industry = {
  name: string;
  icon: LucideIcon;
  description: string;
};

export const industries: Industry[] = [
  { name: "Textile", icon: Shirt, description: "Our founding industry - mills, traders and garment units across India." },
  { name: "Manufacturing", icon: Factory, description: "Raw material and finished goods movement for manufacturers." },
  { name: "Retail", icon: ShoppingBag, description: "Store replenishment and wholesale-to-retail distribution." },
  { name: "FMCG", icon: Boxes, description: "High-frequency, time-sensitive consumer goods dispatch." },
  { name: "E-commerce", icon: PackageSearch, description: "Bulk fulfilment-center and warehouse-to-hub movement." },
  { name: "Industrial", icon: Warehouse, description: "Heavy and bulk industrial cargo between plants and depots." },
  { name: "Automotive", icon: Car, description: "Components and parts logistics for the auto supply chain." },
  { name: "Construction", icon: HardHat, description: "Material transportation for construction and infrastructure." },
  { name: "Pharmaceuticals", icon: Pill, description: "Careful, schedule-sensitive pharma goods transportation." },
];

export type Branch = {
  city: string;
  state: string;
  address?: string;
  phones: string[];
  email: string;
  services: string[];
  isHeadOffice?: boolean;
};

export const branches: Branch[] = [
  {
    city: "Surat",
    state: "Gujarat",
    address: "75-77, Niyol Transport Nagar, Niyolgam, Surat - 394325",
    phones: ["+91 90334 70451", "+91 88669 69284", "+91 99788 44479"],
    email: "saibabatpt23@gmail.com",
    services: ["FTL", "PTL", "Textile Transportation"],
    isHeadOffice: true,
  },
  {
    city: "Patna",
    state: "Bihar",
    phones: ["+91 90334 70453", "+91 70707 87702", "+91 99392 67455"],
    email: "saibabatpt23@gmail.com",
    services: ["FTL", "PTL", "Textile Transportation"],
  },
  {
    city: "Muzaffarpur",
    state: "Bihar",
    phones: ["+91 90334 70452", "+91 99398 30854", "+91 99315 76528"],
    email: "saibabatpt23@gmail.com",
    services: ["FTL", "PTL", "Textile Transportation"],
  },
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
    phones: ["+91 99980 40872", "+91 90441 00001"],
    email: "saibabatpt23@gmail.com",
    services: ["FTL", "PTL", "Textile Transportation"],
  },
  {
    city: "Begusarai",
    state: "Bihar",
    phones: ["+91 99980 40873", "+91 96080 47001"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Arrah",
    state: "Bihar",
    phones: ["+91 99980 40874", "+91 85216 16800"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Gopalganj",
    state: "Bihar",
    phones: ["+91 99980 40875", "+91 91228 82038"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Siwan",
    state: "Bihar",
    phones: ["+91 90334 70455", "+91 97094 67984"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Darbhanga",
    state: "Bihar",
    phones: ["+91 90334 70454"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Ballia",
    state: "Uttar Pradesh",
    phones: ["+91 90263 47186"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
  {
    city: "Jaynagar",
    state: "Bihar",
    phones: ["+91 95704 95601"],
    email: "saibabatpt23@gmail.com",
    services: ["PTL", "Textile Transportation"],
  },
];

// Quick-pick locations shown in the pickup/delivery autocomplete before the
// user types anything - our own branch network plus a couple of major
// national hubs we regularly ship to/from. Coordinates are approximate city
// centers, just precise enough for a distance estimate.
export const popularLocations: { label: string; lat: number; lon: number }[] = [
  { label: "Surat, Gujarat, India", lat: 21.1702, lon: 72.8311 },
  { label: "Patna, Bihar, India", lat: 25.5941, lon: 85.1376 },
  { label: "Muzaffarpur, Bihar, India", lat: 26.1209, lon: 85.3647 },
  { label: "Varanasi, Uttar Pradesh, India", lat: 25.3176, lon: 82.9739 },
  { label: "Begusarai, Bihar, India", lat: 25.4182, lon: 86.1272 },
  { label: "Arrah, Bihar, India", lat: 25.5541, lon: 84.6633 },
  { label: "Darbhanga, Bihar, India", lat: 26.1542, lon: 85.8918 },
  { label: "Mumbai, Maharashtra, India", lat: 19.076, lon: 72.8777 },
  { label: "Ahmedabad, Gujarat, India", lat: 23.0225, lon: 72.5714 },
  { label: "Delhi, India", lat: 28.7041, lon: 77.1025 },
];

export type FAQ = { question: string; answer: string; category: string };

export const faqs: FAQ[] = [
  {
    category: "Services",
    question: "What kind of transportation services does Sai Baba Transport offer?",
    answer:
      "We offer Full Truck Load (FTL), Part Truck Load (PTL), rail/train freight transportation, textile transportation, industrial and commercial transportation, dedicated and contract transportation, third-party network transportation, and customized logistics solutions across India.",
  },
  {
    category: "Services",
    question: "Do you offer rail/train transportation as well as trucking?",
    answer:
      "Yes. Alongside our road fleet, we coordinate rail freight movement for long-haul, high-volume consignments, with road transport handling pickup and delivery on both ends - a cost-efficient multimodal option for bulk cargo over longer distances.",
  },
  {
    category: "Services",
    question: "Do you only handle textile cargo?",
    answer:
      "Textile is our founding specialty, but we serve manufacturing, retail, FMCG, e-commerce, industrial, automotive, construction and pharmaceutical businesses as well.",
  },
  {
    category: "Booking",
    question: "How do I book a transportation service?",
    answer:
      "You can submit a Request a Quote form, use the transport estimation calculator for an indicative price, or contact your nearest branch directly by phone or WhatsApp.",
  },
  {
    category: "Pricing",
    question: "Is the estimate from the online calculator final?",
    answer:
      "No. The calculator gives an indicative, lead-generation estimate only. The final freight amount depends on actual route, vehicle availability, fuel and toll charges, loading/unloading, material type and current market conditions - confirmed by our team.",
  },
  {
    category: "Booking",
    question: "Which cities do you operate in?",
    answer:
      "We operate through branches across India, backed by a wider third-party transporter network for extended pan-India route coverage. See our Branches page for current locations.",
  },
  {
    category: "Partnerships",
    question: "How can my company become a business partner?",
    answer:
      "Use the 'Become Our Transportation Partner' form on the Partnerships page with your company and shipment details, and our team will get in touch.",
  },
  {
    category: "Partnerships",
    question: "I own trucks - how do I register as a transporter?",
    answer:
      "Fill out the Transporter Registration form with your vehicle, capacity and operating-region details. Our internal team reviews all registrations before onboarding.",
  },
  {
    category: "Support",
    question: "I'm an existing customer - where do I log in?",
    answer:
      "Existing customers can access their account through our CRM portal at crm.saibabat.com, linked from the header of this site.",
  },
];

export const stats = [
  { label: "Years of Transportation Experience", value: 20, suffix: "+" },
  { label: "Branches Across India", value: 15, suffix: "" },
  { label: "States Covered", value: 4, suffix: "+" },
  { label: "Consignments Moved", value: 25000, suffix: "+" },
];

export const whyChooseUs = [
  { title: "Pan-India Network", description: "Branches and partner transporters connecting major business hubs.", icon: MapPinned },
  { title: "Textile-First Expertise", description: "Deep experience in bulk textile transportation since our founding.", icon: Shirt },
  { title: "Road + Rail Multimodal Reach", description: "Flexible capacity combining company-owned trucks, rail freight tie-ups and vetted partners.", icon: TrainFront },
  { title: "Reliable, On-Time Delivery", description: "Coordinated dispatch and tracking discipline across every branch.", icon: Clock },
  { title: "Transparent Dealing", description: "Clear documentation, honest estimates and accountable partners.", icon: ShieldCheck },
  { title: "Dedicated Support Team", description: "A responsive team across branches for booking and support queries.", icon: Users },
];

export const partnerReasons = [
  "Access to a growing pan-India transportation network",
  "Combined capacity from own fleet and partner vehicles",
  "Dedicated account coordination for enterprise volumes",
  "Transparent, business-friendly commercial terms",
];

export const transporterBenefits = [
  "Consistent load opportunities across multiple routes",
  "Timely, transparent settlement processes",
  "Growing network across Indian states",
  "Long-term partnership opportunities",
];

export const vehicleTypes = [
  "Tata Ace / Mini Truck",
  "14-ft Truck",
  "17-ft Truck",
  "19-ft Truck",
  "22-ft Truck (Multi-axle)",
  "32-ft Trailer (Single/Multi-axle)",
  "Container Truck",
  "Open Body Truck",
];

export const materialCategories = [
  "Textile / Fabric / Garments",
  "Industrial Machinery / Parts",
  "FMCG / Packaged Goods",
  "Retail / E-commerce Cargo",
  "Construction Material",
  "Automotive Components",
  "Pharmaceuticals",
  "Other Commercial Goods",
];

export const blogPosts = [
  {
    slug: "pan-india-textile-corridors",
    title: "Understanding Pan-India Textile Transportation Corridors",
    excerpt:
      "A look at how bulk textile cargo moves between India's major mill towns, trading hubs and retail markets - and what shippers should plan for.",
    date: "2026-07-12",
    category: "Textile Logistics",
    content: [
      "India's textile trade runs on a handful of well-worn corridors - mill towns feeding processing units, processing units feeding wholesale markets, and wholesale markets feeding retail and export destinations. Understanding these routes is the first step to planning reliable dispatch schedules.",
      "Corridors like Surat–Mumbai, Tirupur–Bengaluru and Ludhiana–Delhi see some of the heaviest bulk textile movement in the country, each with its own seasonal peaks tied to festival and export cycles.",
      "For shippers, the practical takeaway is to plan capacity ahead of known peak periods, work with a transporter who understands bale-safe handling, and keep communication open on pickup windows - textile dispatch schedules are often tighter than other commercial cargo.",
      "Sai Baba Transport's branch network is built around these corridors, which is why textile transportation remains at the core of what we do.",
    ],
  },
  {
    slug: "ftl-vs-ptl",
    title: "FTL vs PTL: Choosing the Right Load Type for Your Shipment",
    excerpt:
      "Full truck load and part truck load each suit different shipment sizes and budgets. Here's how to decide which is right for your next dispatch.",
    date: "2026-06-03",
    category: "Logistics Basics",
    content: [
      "One of the first decisions in planning a shipment is whether it needs a dedicated vehicle (Full Truck Load) or can share space with other consignments (Part Truck Load).",
      "FTL makes sense when your consignment fills - or nearly fills - a vehicle, when transit time is critical, or when the cargo needs careful, undisturbed handling from pickup to delivery.",
      "PTL is the more cost-effective choice for smaller, regular shipments that don't require a dedicated vehicle, letting you pay only for the capacity you actually use while still reaching a wide network of destinations.",
      "In practice, many businesses use a mix of both - FTL for bulk or time-sensitive dispatches, PTL for smaller or routine restocking shipments. Our team can help assess which makes sense for your specific shipment pattern.",
    ],
  },
  {
    slug: "new-branch-tirupur",
    title: "Sai Baba Transport Expands Network with New Tirupur Branch",
    excerpt:
      "Our newest branch strengthens coverage for the knitwear cluster, improving turnaround times for textile exporters and traders in the region.",
    date: "2026-04-21",
    category: "Company Updates",
    content: [
      "We're pleased to announce the opening of our newest branch in Tirupur, Tamil Nadu - strengthening our presence in one of India's largest knitwear manufacturing clusters.",
      "The new branch will support local exporters and traders with faster dispatch coordination, dedicated vehicle access, and closer on-ground support for both FTL and PTL shipments.",
      "This expansion is part of our ongoing effort to build out branch coverage across India's major textile and industrial hubs, reducing turnaround times and improving local responsiveness for our clients.",
      "Businesses in and around Tirupur can now reach our local team directly - see the Branches page for contact details.",
    ],
  },
];

export const partnerLogosPlaceholder = [
  "Textile Traders Co.",
  "Metro Fabrics",
  "National Garments",
  "Apex Industrial",
  "Retail Chain India",
  "Auto Components Ltd.",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Rail / Train Transportation", href: "/services#rail-transportation" },
      { label: "Textile Transportation", href: "/services/textile-transportation" },
      { label: "Fleet & Network", href: "/fleet" },
      { label: "Gallery", href: "/gallery" },
      { label: "Calculate Transport Cost", href: "/estimate" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Branches", href: "/branches" },
  {
    label: "Partner With Us",
    href: "/partners",
    children: [
      { label: "Business Partnership", href: "/partners" },
      { label: "Transporter Registration", href: "/transporter-registration" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
