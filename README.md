# Insight AfriResearch Ltd — Website

Production website for **Insight AfriResearch Ltd**, a Nairobi-based multidisciplinary firm providing Architectural Design, Engineering Services, Research and Consultancy, Training and Capacity Building, and Project Supervision across East Africa.

The site serves as the firm's primary digital presence: showcasing projects, describing services, listing training programmes, and capturing client enquiries.

---

## Tech Stack

| Dependency | Role |
|---|---|
| Next.js 14 (App Router) | Framework — SSR, SSG, ISR, API routes |
| MySQL + Prisma | Database ORM and migrations |
| Tailwind CSS | Utility-first styling with custom design tokens |
| GSAP + ScrollTrigger | Scroll-driven animations |
| NextAuth.js | Admin authentication (magic link via email) |
| Resend | Transactional email delivery |
| Zustand | Client-side filter and UI state |
| Zod | Schema validation on client and server |
| Next/Font | Zero-layout-shift font loading |
| Next/Image | Optimised image delivery with WebP conversion |

---

## Project Structure

```
src/
  app/            Next.js App Router pages and API routes
  components/
    atoms/        Primitive UI elements (Button, Input, Badge)
    molecules/    Composed units (ProjectCard, ServiceCard, FormField)
    organisms/    Full page sections (Navbar, Footer, HeroTextureSlider)
    templates/    Full page shells (PageShell, AdminShell)
    animations/   GSAP-powered wrappers (FadeUp, ParallaxImage, StaggerText)
  config/         Static configuration (site, nav, images, tokens)
  hooks/          Custom React hooks for data fetching
  lib/            Server utilities (db, auth, email, seo)
  schemas/        Zod validation schemas
  store/          Zustand state stores
  types/          TypeScript type definitions
  utils/          Pure utility functions
prisma/
  schema.prisma   Database schema
  seed.ts         Realistic seed data
  migrations/     Auto-generated migration history
tests/
  unit/           Unit tests
  integration/    API integration tests
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+ (local or Railway)
- A Resend account for email

### Install

```bash
git clone https://github.com/philipondieki/afriresearch.git
cd afriresearch
npm install
```

### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values. Required before the dev server starts:

- `DATABASE_URL` — MySQL connection string
- `NEXTAUTH_SECRET` — random 32-byte string (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev
- `RESEND_API_KEY` — from resend.com dashboard

### Run Database

```bash
npm run db:migrate      # creates tables
npm run db:seed         # seeds with sample data
```

### Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Key | Description | Example |
|---|---|---|
| `DATABASE_URL` | MySQL connection string | `mysql://root:pw@localhost:3306/afriresearch` |
| `NEXTAUTH_SECRET` | NextAuth signing secret | `openssl rand -base64 32` output |
| `NEXTAUTH_URL` | Canonical URL for NextAuth | `https://insightafriresearch.com` |
| `RESEND_API_KEY` | Resend API key | `re_xxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Email sender address | `noreply@insightafriresearch.com` |
| `ADMIN_EMAIL` | Where enquiry notifications go | `insightafri@gmail.com` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob for image uploads | `vercel_blob_rw_xxxxxx` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO | `https://insightafriresearch.com` |
| `NEXT_PUBLIC_SITE_NAME` | Site name for metadata | `Insight AfriResearch Ltd` |

---

## Database

### Prisma Workflow

```bash
# Create a new migration after schema changes
npm run db:migrate

# Push schema changes without creating a migration (dev only)
npm run db:push

# Reset the database and re-run all migrations
npm run db:reset

# Seed with sample data
npm run db:seed

# Open Prisma Studio (visual database browser)
npm run db:studio

# Deploy migrations in production
npm run db:migrate:deploy
```

---

## Development Workflow

### Branches

- `main` — production-ready code only
- `claude/feature-name` — feature branches, merge to main via PR

### Commits

Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

### Code Quality

```bash
npm run lint          # ESLint
npm run format        # Prettier write
npm run format:check  # Prettier check (used in CI)
npm test              # Jest
```

---

## Design System

### Tokens

All design values live in `src/config/tokens.ts`. Never hard-code a colour, duration, or easing value outside this file.

### Typography

- **Serif** (Cormorant Garamond): Headlines, section titles, display text
- **Sans** (Inter): Body copy, labels, UI elements

Scale lives in `tailwind.config.ts` under `fontSize`. Use semantic names: `text-display-2xl`, `text-body-md`, `text-label-sm`.

### Colours

| Token | Hex | Use |
|---|---|---|
| `background` | `#FAFAF7` | Page backgrounds |
| `foreground` | `#1A1A1A` | Primary text |
| `accent` | `#C2642A` | CTAs, highlights, hover states |
| `muted` | `#6B6B6B` | Secondary text |
| `border` | `#E5E5E0` | Dividers, input borders |

### Spacing

8-point grid. All spacing values are multiples of 8px. Use Tailwind spacing tokens (e.g. `p-4` = 32px, `gap-3` = 24px).

### Adding a Component

1. Decide its level: atom, molecule, organism, template, or animation
2. Create the file in the correct folder
3. Define props with a TypeScript interface
4. Use only tokens from `tailwind.config.ts` — no arbitrary values
5. Export from the file, import by full path

---

## Animation Guide

### Setup

GSAP and ScrollTrigger import from `src/lib/gsap.ts`. Always use this import to keep the bundle lean.

```ts
import { gsap, ScrollTrigger } from '@/lib/gsap';
```

### Primitives

| Component | Use |
|---|---|
| `<FadeUp>` | Fade and translate-up on scroll enter |
| `<ParallaxImage>` | Vertical parallax on a wrapped image |
| `<StaggerText>` | Word-by-word or line-by-line text reveal |
| `<ScrollReveal>` | Generic scroll-triggered class toggle |

All primitives register `ScrollTrigger` and clean up on unmount.

---

## Image Management

All Unsplash URLs are centralised in `src/config/images.ts`. The `q()` helper appends width and quality parameters automatically.

To swap to Cloudinary or Vercel Blob:

1. Open `src/config/images.ts`
2. Change `BASE` and update the `q()` helper signature
3. No other file changes required

All images render through `<Image>` from `next/image` with explicit `width`, `height`, and a `blurDataURL` placeholder.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | List projects (cursor pagination, filter by category/status) |
| POST | `/api/projects` | Create project (admin only) |
| GET | `/api/projects/[slug]` | Get single project with images |
| PUT | `/api/projects/[slug]` | Update project (admin only) |
| GET | `/api/enquiries` | List enquiries (admin only) |
| POST | `/api/enquiries` | Submit public enquiry |
| GET | `/api/training/programs` | List training programmes |
| POST | `/api/training/programs` | Create programme (admin only) |
| GET | `/api/training/sessions` | List upcoming sessions |
| POST | `/api/training/sessions` | Create session (admin only) |
| POST | `/api/training/register` | Register for a session |
| GET | `/api/team` | List team members |
| POST | `/api/team` | Create team member (admin only) |
| GET | `/api/settings` | Get site settings |
| PUT | `/api/settings` | Update site settings (admin only) |
| POST | `/api/upload` | Upload image to Vercel Blob |

All list endpoints accept `cursor` and `limit` query parameters. Responses follow `{ data, meta }` shape.

---

## Deployment

### Vercel (Application)

1. Connect the GitHub repository to Vercel
2. Set all environment variables from `.env.example` in Vercel project settings
3. Vercel auto-detects Next.js — no build configuration needed
4. `main` branch deploys to production automatically

### Railway (MySQL)

1. Create a new MySQL service on Railway
2. Copy the `DATABASE_URL` from Railway and set it in Vercel env vars
3. Run `npm run db:migrate:deploy` in a Railway deploy command or via CLI

### Database Backups

Railway provides daily automated backups. For additional safety, schedule a weekly `mysqldump` via a Railway cron job and store exports in a separate S3 or Cloudflare R2 bucket.

---

## Troubleshooting

**`PrismaClientInitializationError`** — Check that `DATABASE_URL` is set and the MySQL server is running. Run `prisma db push` to verify connectivity.

**Fonts not loading** — Ensure `--font-cormorant` and `--font-inter` CSS variables are set on `<html>` in `layout.tsx`. Clear `.next` cache and restart.

**`NEXTAUTH_SECRET` error on login** — Set `NEXTAUTH_SECRET` in `.env`. It must be at least 32 characters.

**Images not showing** — Confirm `images.unsplash.com` is in `remotePatterns` in `next.config.js`. Check network tab for 400/403 errors.

**Hydration mismatch on animations** — All GSAP code must run inside `useEffect` or `useLayoutEffect`. Never read `window` or `document` at module level.

---

## Roadmap

- M-Pesa and Pesapal payment integration for training registrations
- Multilingual support (English and Swahili) via `next-intl`
- Blog module for research articles and project case studies
- Client portal for project progress tracking
- WhatsApp enquiry widget integration
- PDF report generation for research deliverables
