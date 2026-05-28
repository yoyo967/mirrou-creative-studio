# Mirrou Creative Studio

<p align="center">
  <strong>Algorithm of Soul</strong><br>
  <em>Performance Creatives for Beauty, Health & Lifestyle Brands in DACH.</em><br>
  High-end photography, AI-enhanced visuals, and systematic creative testing as a measurable creative engine.
</p>

---

## About This Repository

This repository serves a dual purpose:

1. **DCI Final Project (Abschlussprojekt)** — A full-stack web development capstone for the Digital Career Institute, demonstrating architecture, UI/UX, SEO, branding, and technical implementation.
2. **Real-World Agency Platform** — The production website and complete knowledge base for **Mirrou Creative Studio**, a Frontier Firm operating as a KI-integrated Performance Creative Agency.

**Team:** Olha Yevtushenko · Denys Demyanyshyn · Ralph Kindermann · Yahya Yildirim

---

## Project Structure

```
mirrou-creative-studio/
├── 00_abschlussbericht/    # Final report (~50 pages), AOS book chapters, task tracker
├── 01_strategie/           # Positioning, ICP, competitive analysis, business plan
├── 02_brand/               # Brand book, tone of voice, design tokens
├── 03_deliverables_pdf/    # PDF exports of key documents
├── 04_praesentationen/     # Pitch decks, presentation scripts
├── 05_sops_templates/      # SOPs, creative briefs, learning logs, onboarding
├── 06_perplexity_skills/   # Perplexity Space skills & prompts
├── 07_compliance/          # EU AI Act, DSGVO, C2PA documentation
├── 08_kursmaterial/        # DCI course-related materials
├── 09_medien/              # Media assets
├── docs/                   # Technical documentation (architecture, branding, DCI criteria)
├── src/                    # Website source code (React + Vite + TypeScript)
├── public/                 # Static assets
├── images/                 # Image assets
├── visuals/                # Visual production assets
├── scripts/                # Build and deployment scripts
├── PROJEKTSTRUKTUR.md      # Full project navigation guide (DE)
└── 00-PROJECT-INDEX.md     # Project index
```

---

## Website Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion successor) |
| **3D** | Three.js / @react-three/fiber |
| **SSG** | vite-react-ssg (static pre-rendering) |
| **i18n** | react-i18next (8 languages: DE/EN/ES/IT/FR/TR/RU/UK) |
| **Hosting** | GCP Cloud Run (europe-west3 Frankfurt) |
| **Container** | Docker + nginx |
| **Analytics** | Google Analytics 4 (IP-anonymized) |

### Design System: Dark Luxury v2.0

- **Background:** Deep Onyx `#080808`
- **Accent:** Gold `#C8A25A`
- **Text:** Ivory `#F2EFE9`
- **Typography:** Cormorant Garamond (headings) · Inter (body) · JetBrains Mono (code)

---

## SEO Architecture

The website follows the **Apex / Pillar / Cluster** model:

- **Apex:** `/` (Homepage)
- **4 Pillars:** Deep dives into core services (`/performance-creative`, `/creative-engine`, etc.)
- **20 Clusters:** Focused articles under `/blog/[slug]`

All routes are statically pre-rendered for maximum SEO performance.

---

## Lighthouse Audit (28.05.2026)

Tested against deployed production URL on **Google Cloud Run** (europe-west3).  
Lighthouse 13.3 — Simulated Slow 4G (150 ms RTT, 1.6 Mbps), 4× CPU throttle.

| Category | Score |
|----------|-------|
| **Performance** | 76 |
| **Accessibility** | 93 |
| **Best Practices** | 96 |
| **SEO** | 100 |

<details>
<summary>Core Web Vitals & Metrics</summary>

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 2.7 s |
| Largest Contentful Paint (LCP) | 3.9 s |
| Total Blocking Time (TBT) | 190 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index (SI) | 5.7 s |

</details>

<details>
<summary>Optimizations applied</summary>

- **Self-hosted variable fonts** — Inter, Cormorant Garamond, JetBrains Mono (preload critical, defer decorative)
- **Hero LCP image** — preloaded in `<head>` with `fetchpriority="high"`, compressed to 55 KB WebP
- **SSG hydration** — static `<img>` rendered server-side for instant LCP, animated sequence lazy-loaded post-hydration
- **Content-visibility: auto** — below-fold sections skip rendering until scrolled into view
- **Code-splitting** — `motion`, `react-router`, `lucide-react` in separate chunks; HeroImageSequence lazy-loaded
- **Dynamic i18n** — only the active locale bundle is loaded (not all 8)
- **nginx gzip level 9** — maximum compression for HTML/CSS/JS/JSON

</details>

---

## Local Development

### Prerequisites
- Node.js 20+

### Setup
```bash
npm install
```

### Commands
```bash
npm run dev          # Development server (port 3000)
npm run build        # Static production build → dist/
npm run preview      # Preview production build
npm run lint         # TypeScript checks
```

### Environment Variables
- Copy `.env.example` to `.env.local`
- Never commit `.env` files

---

## Deployment

```bash
npm run build                    # Generates static /dist folder
docker build -t mirrou .         # Build container
# Deploy to GCP Cloud Run (europe-west3)
```

Compatible with Vercel, Netlify, Cloudflare Pages, or any static hosting.
Set build command to `npm run build` and output directory to `dist`.

---

## Frontier Firm Architecture

Mirrou operates as a **Frontier Firm** — a new organizational model where AI is not a tool but a structural layer:

- **Intelligence Layer:** Perplexity Spaces (5 spaces, 44+ documents) as knowledge OS
- **Production Layer:** Hybrid Production (real photography + AI-generated backgrounds)
- **Infrastructure Layer:** Claude Code for web development, MCP connectors for automation
- **Performance Layer:** Systematic creative testing, data feedback loops

### EU AI Act Compliance (from Day 1)
- Limited-Risk classification (Art. 50)
- C2PA metadata on all AI-generated content
- DSGVO: IP anonymization, GCP EU-region, AVV-ready
- Trust Center on website

---

## Key Deliverables

| Deliverable | Status |
|-------------|--------|
| Live Website (8 languages) | Done |
| Abschlussbericht (~50 pages) | Done |
| Brand Book & Design System | Done |
| 4 Case Studies (visual) | Done |
| Frontier Firm Documentation | Done |
| Compliance Architecture | Done |
| SOPs & Templates (7 documents) | Done |
| Pitch Deck | Done |
| GitHub Repository | Done |

---

## Contributing

1. **Pages:** See `src/routes/` and `src/App.tsx`
2. **Content:** Modify `src/content/site-data.ts` (single source of truth)
3. **Styling:** Tailwind CSS v4 utilities in `src/index.css`
4. **Docs:** Follow the numbered folder structure (`00_` through `09_`)

---

## License

All rights reserved. Mirrou Creative Studio, 2026.
