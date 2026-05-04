# Insight AfriResearch Ltd — Website

Production website for **Insight AfriResearch Ltd**, a Nairobi-based multidisciplinary firm providing Architectural Design, Engineering Services, Research and Consultancy, Training and Capacity Building, and Project Supervision across East Africa.

The site serves as the firm's primary digital presence: showcasing projects, describing services, listing training programmes, and capturing client enquiries via email.

---

## Tech Stack

| Dependency | Role |
|---|---|
| Next.js 14 (App Router) | Framework — SSR, SSG, API routes |
| Tailwind CSS | Utility-first styling with custom design tokens |
| GSAP + ScrollTrigger | Scroll-driven animations |
| Resend | Transactional email delivery for enquiries and training registrations |
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
    organisms/    Full page sections (Navbar, Footer, HeroSlideshow)
    templates/    Full page shells (PageShell)
    animations/   GSAP-powered wrappers (FadeUp, ParallaxImage, StaggerText)
  config/         Static data and configuration (projects, services, team, training, images, tokens)
  hooks/          Custom React hooks
  lib/            Server utilities (email, seo, gsap)
  schemas/        Zod validation schemas
  store/          Zustand state stores
  types/          TypeScript type definitions
  utils/          Pure utility functions
```

### Data model

All site content — projects, services, team members, training programmes, and sessions — lives as **static TypeScript files** in `src/config/`. There is no database. To add or update content, edit the relevant config file directly.

| File | Content |
|---|---|
| `src/config/projects.ts` | Project listings and categories |
| `src/config/services.ts` | Service descriptions |
| `src/config/team.ts` | Team member profiles |
| `src/config/training.ts` | Training programmes and upcoming sessions |
| `src/config/images.ts` | Centralised image URL registry |
| `src/config/site.ts` | Site name, contact details, social links |
| `src/config/tokens.ts` | Design tokens (colours, easing, duration) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Resend account for transactional email

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

Edit `.env` with your values:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@insightafriresearch.com
ADMIN_EMAIL=insightafri@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Insight AfriResearch Ltd
```

### Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Key | Description | Required |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for sending emails | Yes (production) |
| `RESEND_FROM_EMAIL` | Sender address for outgoing emails | Yes (production) |
| `ADMIN_EMAIL` | Where enquiry and registration notifications are delivered | Yes (production) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO and OG tags | Yes |
| `NEXT_PUBLIC_SITE_NAME` | Site name for metadata | Optional |

> **Note:** Email sending is skipped gracefully if `RESEND_API_KEY` is not set — the API routes still return success. This means the dev server works without any email config.

---

## API Routes

The site has two lightweight API routes for form submissions. Both fire emails and return immediately — there is no database persistence.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/enquiries` | Submit a general enquiry — sends notification to admin and confirmation to sender |
| `POST` | `/api/training/register` | Register for a training session — sends confirmation to registrant and notification to admin |

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
| `<ScrollColourScene>` | Transitions body background colour as section enters viewport |

All primitives register `ScrollTrigger` and clean up on unmount.

---

## Image Management

All Unsplash URLs are centralised in `src/config/images.ts`. The `q()` helper appends width and quality parameters automatically.

To swap to a real CDN:

1. Open `src/config/images.ts`
2. Change `BASE` and update the `q()` helper signature
3. No other file changes required

All images render through `<Image>` from `next/image` with explicit `width`, `height`, and `sizes`.

---

## Deployment

### Vercel (Application)

1. Connect the GitHub repository to Vercel
2. Set environment variables from `.env.example` in Vercel project settings
3. Vercel auto-detects Next.js — no build configuration needed
4. `main` branch deploys to production automatically at **https://afriresearch.vercel.app/**

### CI/CD (GitHub Actions)

The workflow at `.github/workflows/frontend-ci-cd.yml` runs on every push and PR to `main`:

1. **Lint & Test** — ESLint + Jest
2. **Build** — `next build` with production env vars
3. **Deploy** — Vercel CLI deployment (push to `main` only, skipped on PRs)

GitHub secrets required:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | From vercel.com → Account Settings → Tokens |
| `NEXT_PUBLIC_SITE_URL` | `https://afriresearch.vercel.app` |
| `RESEND_API_KEY` | From resend.com dashboard |
| `RESEND_FROM_EMAIL` | `noreply@insightafriresearch.com` |
| `ADMIN_EMAIL` | `insightafri@gmail.com` |

---

## Troubleshooting

**Fonts not loading** — Ensure `--font-cormorant` and `--font-inter` CSS variables are set on `<html>` in `layout.tsx`. Clear `.next` cache and restart.

**Images not showing** — Confirm `images.unsplash.com` is in `remotePatterns` in `next.config.js`. Check network tab for 400/403 errors.

**Hydration mismatch on animations** — All GSAP code must run inside `useEffect` or `useLayoutEffect`. Never read `window` or `document` at module level.

**Enquiry emails not sending in development** — Expected. Set `RESEND_API_KEY` in `.env` if you need to test email locally, otherwise the API route silently skips sending and still returns a success response.

---

## Roadmap

- M-Pesa and Pesapal payment integration for training registrations
- Multilingual support (English and Swahili) via `next-intl`
- Blog module for research articles and project case studies
- Client portal for project progress tracking
- WhatsApp enquiry widget integration
- PDF report generation for research deliverables
- CMS integration (Sanity or Contentful) to allow non-technical content updates