# Sai Baba Transport - Website + Admin Panel

A Next.js 16 (App Router) website for Sai Baba Transport, backed by a
PostgreSQL database and a full admin panel for managing site content,
pricing, and enquiries - no code changes needed for day-to-day updates.

## Stack

- **Next.js 16** (App Router, Turbopack, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui** (`new-york-v4` style, manually vendored - see note below)
- **Framer Motion** for page/section/hover animations
- **PostgreSQL** (works with Neon, Supabase, or any standard Postgres host) via **Drizzle ORM**
- Custom signed-cookie session auth (no third-party auth service) with three roles: **Super Admin**, **Admin**, **Staff**
- Self-hosted fonts: **Manrope** (body) and **Bebas Neue** (display/headings) via `next/font/local`

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up the database.** Copy `.env.example` to `.env` and fill in:

   ```
   DATABASE_URL=postgres://...          # Neon, Supabase, or any Postgres instance
   AUTH_SECRET=<a long random string>   # used to sign admin session cookies
   SEED_ADMIN_NAME=Site Administrator
   SEED_ADMIN_EMAIL=admin@yourdomain.com
   SEED_ADMIN_PASSWORD=<a strong password>
   ```

3. **Push the schema and seed initial content:**

   ```bash
   npm run db:push
   npm run db:seed
   ```

   `db:seed` creates the first Super Admin login (from `SEED_ADMIN_*` in
   `.env`) and loads the current real branch/service/industry/FAQ/blog/pricing
   content into the database. Run it once - after that, all content is
   managed through the admin panel, not by re-running the seed script.

4. **Run it:**

   ```bash
   npm run dev
   ```

   Site: http://localhost:3000
   Admin panel: http://localhost:3000/admin/login (sign in with the
   `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set above)

`npm run build && npm run start` runs the production build. `npm run
db:studio` opens Drizzle Studio, a visual browser for the database.

## Admin Panel

Everything editable through the website (except legal pages and a handful of
static marketing sections) is managed at `/admin`:

- **Dashboard** - enquiry counts, quick links, recent activity.
- **Enquiries & Support** - every quote request, partnership enquiry,
  transporter registration, contact message and career application
  submitted on the public site lands here. Filter by type/status, open a
  submission to see full details, set status (New / In Progress / Resolved
  / Closed), assign it to a staff member, and leave internal resolution
  notes.
- **Branches** - add/edit/remove branches, including multiple phone numbers
  per branch, address, services offered, and head-office flag. Changes
  appear on `/branches`, `/contact` and the homepage automatically.
- **Services** - the services listed on `/services` and the homepage.
- **Industries** - industries served, shown on `/industries` and the homepage.
- **Pricing & Estimator** - vehicle types (rate/km, base fare, capacity) and
  material categories (price multiplier) that power the public transport
  cost estimator at `/estimate`, and the vehicle-type dropdowns on the quote
  and transporter-registration forms.
- **Gallery** - upload photos (fleet, ongoing loads, warehouse, etc.)
  directly from the admin panel; they appear on the public `/gallery` page
  with category filters and a lightbox. Uploaded files are stored under
  `public/uploads/gallery/` - make sure that folder persists across deploys
  (see **Deployment notes** below).
- **FAQs** - shown on `/faq` and the homepage.
- **Blog** - posts shown on `/blog`.
- **Admin Users** (Super Admin only) - create/edit/deactivate/delete staff
  logins and assign roles.

### Roles

- **Staff** - can view and resolve enquiries (status, notes, assignment).
- **Admin** - everything Staff can do, plus full CRUD on branches, services,
  industries, pricing, gallery, FAQs and blog.
- **Super Admin** - everything Admin can do, plus managing other admin
  panel logins.

## What's on the public site

- Home, About, Services (+ dedicated Textile Transportation page), Fleet &
  Network, Industries, Branches (with state filter), transport estimation
  calculator (live pricing from the database), Gallery, request-a-quote /
  business-partnership / transporter-registration forms, Contact (with real
  head office address, branch/support numbers, and a Google Maps embed),
  FAQ (filterable), Blog, Careers, Privacy Policy, Terms, Disclaimer, and a
  custom 404.
- All public forms submit to a real API (`/api/enquiries`) and land in the
  admin panel's Enquiries & Support screen - nothing is simulated.
- Sticky animated navbar (mobile drawer via shadcn `Sheet`), footer with
  live head-office contact info, floating call/WhatsApp buttons.
- Brand theme derived from the supplied logo (red `#DB2319`, charcoal
  `#1C1C1C`, warm gray) wired through `src/app/globals.css` as CSS variables.
- Framer Motion used throughout: hero entrance animations, scroll-reveal
  sections, hover/tap micro-interactions, animated counters, marquee logo
  strip, animated accordion/menus.

## Architecture notes

- **Data layer**: `src/db/schema.ts` (Drizzle schema) and
  `src/lib/services/*.ts` (query functions per resource - branches,
  services, industries, faqs, blog, gallery, pricing, enquiries, users).
  Public pages and admin pages both read through this same layer, so admin
  edits show up on the live site immediately (via Next.js `revalidatePath`
  calls in each admin Server Action).
- **Auth**: `src/lib/auth/*` - signed httpOnly cookie sessions using the Web
  Crypto API (Edge-runtime compatible), bcrypt password hashing. Protected
  by `src/proxy.ts`, which gates everything under `/admin` except
  `/admin/login`, and gates `/admin/users` to Super Admin only.
- **API routes**: `POST /api/enquiries` (accepts any public form
  submission), `GET /api/pricing` (vehicle types + material categories,
  used by the public estimate calculator).
- **Admin CRUD pattern**: each resource has its own `actions.ts` (Server
  Actions with role checks and input validation) and a table/dialog UI built
  on a small shared toolkit in `src/components/admin/crud/`.

## A few things still worth reviewing before launch

- **Legal pages** (privacy policy, terms, disclaimer) are template content
  and are explicitly flagged on-page as needing legal review before
  publishing.
- **Social links** in the footer point to `#` - add real profile URLs once
  available.
- **CRM/ERP link** (`crm.saibabat.com`) behind "Customer Login" in the
  navbar - confirm this is the correct URL before launch.
- **Gallery only has the 3 real truck photos supplied so far** - add more
  through Admin → Gallery → Upload Image whenever you have new photos of
  loads, branches, or fleet.

## Deployment notes

- This app needs a **persistent Node.js server** (not a static host) - it
  uses Server Actions, a database connection, and writes uploaded gallery
  images to disk. Any standard Node hosting (a VPS, Railway, Render, a
  Docker container, etc.) works.
- Point `DATABASE_URL` at a real Postgres instance for production - Neon
  and Supabase both have generous free tiers and work with this setup
  out of the box (SSL is enabled automatically for any non-localhost URL).
- The `public/uploads/gallery/` folder needs to persist across deploys, or
  point it at a mounted volume / object storage bucket if your host uses an
  ephemeral filesystem.
- Set a strong, random `AUTH_SECRET` in production - this is what signs the
  admin session cookies.

## Notes on the shadcn/ui Setup

The `shadcn` CLI's `init`/`add` commands call `ui.shadcn.com`, which wasn't
reachable from this build sandbox, so components were vendored by hand:
component source pulled directly from the shadcn/ui GitHub repo
(`new-york-v4` style) into `src/components/ui/`, with `components.json`
added for compatibility. **On a machine with normal internet access, `npx
shadcn@latest add <component>` will work normally** to add further
components - the project is set up to be fully compatible with the
standard CLI going forward.

## Logo Assets

Processed from the supplied logo into `public/`:

- `logo.png` - original lockup (icon + wordmark + tagline)
- `logo-transparent.png` - same, background removed
- `logo-mark.png` - icon + truck/train illustration only, no text
- `logo-emblem.png` - just the circular "S" emblem (used in navbar/favicon)
- `favicon.ico` - generated from the emblem
