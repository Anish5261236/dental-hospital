# Sri Vasavi Multispeciality Dental Hospital — Website

A full-stack Next.js site built for the clinic: public marketing site (home,
services, doctors, about, gallery, contact/booking) plus a full admin CMS.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Auth:** NextAuth v5 (credentials login for the admin panel)
- **Forms:** react-hook-form + zod

> **Note on ORM:** the original plan was Prisma, but during initial
> development Prisma's engine binaries couldn't be downloaded from the
> sandbox this was built in, so the project uses **Drizzle ORM** instead —
> pure TypeScript, no native binaries, and honestly a good fit for a project
> this size. If you'd strongly prefer Prisma, it's a swappable layer (see
> `lib/db/schema.ts` and `lib/db/queries.ts`).

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally (or a connection string to a hosted instance)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create the database**

   ```bash
   createdb dental_hospital
   # or, from psql:
   # CREATE DATABASE dental_hospital;
   ```

3. **Configure environment variables**

   The repo ships with a working `.env` for local development (see below).
   At minimum, check `DATABASE_URL` matches your local Postgres setup:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dental_hospital"
   NEXTAUTH_SECRET="dev-secret-change-in-production-please"
   AUTH_SECRET="dev-secret-change-in-production-please"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   **Before deploying anywhere real**, regenerate `NEXTAUTH_SECRET` /
   `AUTH_SECRET` with `openssl rand -base64 32`.

4. **Run migrations**

   ```bash
   npm run db:migrate
   ```

5. **Seed the database** (loads all 14 services, 7 doctors, FAQs,
   testimonials, clinic settings, and a default admin login)

   ```bash
   npm run db:seed
   ```

   This creates an admin login:
   - **Email:** `admin@srivasavidental.in`
   - **Password:** `admin123`

   **Change this password before the site goes live.**

6. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 for the public site and
   http://localhost:3000/admin/login for the admin panel.

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run db:generate` | Generate a new SQL migration from schema changes in `lib/db/schema.ts` |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:seed` | Re-run the seed script (safe to re-run — uses `onConflictDoNothing`) |
| `npm run db:studio` | Open Drizzle Studio, a visual database browser |

## Project Structure

```
app/
  (public pages)              -> /, /about, /services, /services/[slug],
                                  /doctors, /doctors/[slug], /gallery,
                                  /contact, /book-appointment
  api/appointments/           -> booking form submission endpoint
  api/contact/                -> contact form submission endpoint
  api/auth/[...nextauth]/     -> NextAuth handler
  admin/                      -> protected admin panel
    login/                    -> admin login page
    appointments/             -> view & update booking requests
    messages/                 -> view & manage contact messages
    services/ doctors/        -> content CRUD
    testimonials/ faqs/       -> content CRUD
    gallery/                  -> image upload + management
    settings/                 -> clinic info (phone, hours, address...)

components/
  layout/                     -> Header, Footer, mobile nav, chrome wrapper
  home/                       -> homepage sections
  ui/                         -> shared design system pieces (SmileArc, PageHeader...)
  forms/                      -> public-facing booking/contact forms
  admin/                      -> admin panel UI (sidebar, tables, form fields)

lib/
  db/                         -> Drizzle schema, client, query helpers, seed script
  actions/                    -> server actions used by the admin CMS
  auth.ts / auth.config.ts    -> NextAuth setup (split for Edge middleware compatibility)
  email.ts                    -> email notifications (currently stubbed, see below)
  validations.ts              -> shared zod schemas for the public forms

middleware.ts                 -> protects all /admin/* routes
```

## Email Notifications (currently stubbed)

Booking and contact form submissions are saved to the database and always
work, but the **email notification** to the clinic is currently stubbed —
it logs what would be sent to the console instead of actually sending it.
This was intentional (no email provider was set up yet during development).

To wire up real emails, open `lib/email.ts`:

1. Pick a provider (Gmail SMTP, Resend, SendGrid, etc.)
2. Add credentials to `.env`, e.g.:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=you@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=you@gmail.com
   ```
3. Set `EMAIL_PROVIDER_CONFIGURED = true` in `lib/email.ts` and uncomment
   the nodemailer block (already written, just commented out).

Nothing else in the app needs to change — every call site imports
`sendEmail` from that one file.

## Image Uploads

Gallery images uploaded through `/admin/gallery` are saved to
`public/uploads/`. This works out of the box for local development. For a
real deployment, especially on platforms with ephemeral filesystems (like
Vercel), you'll want to swap this for cloud storage (Cloudinary, S3, etc.) —
the upload logic is isolated in `lib/actions/gallery.ts`.

## Deployment Notes

- **Database:** any managed Postgres works (Neon, Supabase, Railway, RDS...).
  Update `DATABASE_URL` and run `npm run db:migrate` against it.
- **Hosting:** Vercel is the easiest fit for Next.js. If deploying there,
  switch the gallery upload storage to Cloudinary/S3 first (see above).
- **Secrets:** rotate `NEXTAUTH_SECRET`/`AUTH_SECRET` and the default admin
  password before going live.

## What's Built

- Full public site with 14 services, 7 doctor profiles, gallery, FAQ, testimonials
- Appointment booking + contact forms, validated client & server side, saved to DB
- Admin authentication (NextAuth, single admin account)
- Admin dashboard with live stats
- Full CRUD content management: services, doctors, testimonials, FAQs, gallery, site settings
- Appointment & message management (status tracking, read/unread, delete)

## Known Follow-ups

- Wire up real email notifications (see above)
- Add a "change admin password" flow
- Add real clinic/doctor photos (currently placeholders — the design uses an
  arc-masked frame for hero/doctor images, see `components/home/Hero.tsx` and
  `app/doctors/[slug]/page.tsx`)
- Swap gallery upload storage to cloud storage before deploying to a
  serverless host
- Consider adding a sitemap.xml and schema.org LocalBusiness/Dentist
  structured data for local SEO
