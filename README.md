# A's Developer Portfolio

A full-stack developer portfolio built with Next.js, featuring a public recruiter-facing page, admin dashboard, and an interactive 3D lanyard powered by Three.js physics.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **3D:** React Three Fiber + Rapier Physics
- **Animations:** Motion (Framer Motion) + Custom WebGL Dither Shader
- **Auth & DB:** Supabase (Postgres + Email Auth)
- **Deployment:** Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-setup.sql` in the Supabase SQL Editor
3. Create a user in Authentication > Users for admin login
4. Copy your project URL and anon key

### 3. Set Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the portfolio.

## Project Structure

```
app/
  page.tsx              # Public portfolio (/, Hero + Projects + About + Contact)
  login/page.tsx        # Admin login
  dashboard/page.tsx    # Admin dashboard (CRUD projects)
  layout.tsx            # Root layout with Dither background
  globals.css           # Tailwind v4 theme tokens
components/
  hero-section.tsx      # Hero with animated text + 3D lanyard
  top-projects.tsx      # Featured projects section
  projects-section.tsx  # All projects with category filters
  project-card.tsx      # Individual project card
  project-filters.tsx   # Category filter pills
  about-me.tsx          # About section
  contact-links.tsx     # Contact links section
  header.tsx            # Navigation header
  footer.tsx            # Footer with social links
  ProjectForm.tsx       # Admin project form (create/edit)
  Dither.tsx            # WebGL animated dither background
  DecryptedText.tsx     # Encrypted text reveal animation
  dither-background.tsx # Client wrapper for Dither
  ui/                   # shadcn/ui components
  motion-primitives/    # Animation wrapper components
lib/
  utils.ts              # cn() helper + transition variants
  supabase.ts           # Supabase client (browser + server)
types/
  index.ts              # Project type definition
```

## Features

- **Public Portfolio** (`/`): Hero section with 3D lanyard, Top Projects, filtered project grid, About Me, Contact
- **Admin Dashboard** (`/dashboard`): Full CRUD for projects with category, visibility, and top project toggles
- **Authentication** (`/login`): Supabase email auth protecting the dashboard
- **Animations**: Dithered WebGL background, text reveal effects, scroll-triggered animations
- **3D Lanyard**: Physics-based interactive lanyard with draggable card (requires card.glb model)
- **Responsive**: Mobile-first design across all sections
- **Sample Data**: Shows sample projects when Supabase isn't configured

## 3D Lanyard Setup

The 3D lanyard requires a `card.glb` GLTF model in the `/public` directory. You can create one using [modelviewer.dev](https://modelviewer.dev/editor/) or any 3D modeling tool. The model should contain `card`, `clip`, and `clamp` meshes with a `base` and `metal` material.

## Deployment

```bash
vercel
```

Set the same environment variables in your Vercel project settings.
