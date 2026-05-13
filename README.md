# Mirrou Creative Studio

<p align="center">
  <em>Performance Creatives für Beauty-, Health- & Lifestyle-Brands. High-End-Fotografie, KI-Visuals und systematisches Creative-Testing als messbare Creative-Engine.</em>
</p>

## 📌 Project Overview
This repository serves a dual purpose:
1. **DCI Final Project**: A full-stack web development capstone demonstrating architecture, UI/UX, SEO, and technical implementation.
2. **Real-World Agency Website**: The actual production platform for **Mirrou Creative Studio**, functioning as a brand hub, lead generation tool, and interactive portfolio.

## 🚀 The DCI Course Connection
This project mirrors the 25-day practical agenda of the Digital Career Institute (DCI) final phase:
- **Phase 1 (Ideation & Planning)**: Conception of the brand, target audience definition, and initial UI/UX drafting.
- **Phase 2 (Marketing Mix & Branding)**: Establishment of the "Dark Luxury v2.0" design system. Strategy mapped within site architecture.
- **Phase 3 (Campaigns & Rollout)**: Advanced technical implementation (React + Vite + Tailwind + SSG + Three.js), building "Pillar/Cluster" SEO architecture.
- **Phase 4 (Final Presentation & Launch)**: Deployment readiness, robust documentation, static site generation, and performance metrics.

For detailed DCI evaluation criteria, please see [`docs/DCI_PROJECT.md`](./docs/DCI_PROJECT.md).

## 🛠️ Features & Architecture
- **Tech Stack**: React 19, Vite 6, Tailwind CSS 4, Motion (Framer Motion successor), Three.js (R3F) for interactive 3D hero background.
- **Architecture**: Apex / Pillar / Cluster SEO model.
  - **Apex**: `/` (Homepage)
  - **4 Pillars**: Deep dives into our core services (`/performance-creative`, `/creative-engine`, etc.)
  - **20 Clusters**: Focused blog/articles under `/blog/[slug]`.
- **Pre-Rendering (SSG)**: Uses `vite-react-ssg` to statically pre-render all routes, ensuring massive SEO performance without requiring a Node.js server.
- **Internationalization**: Ready for i18n (`react-i18next`).
- **Design System**: "Dark Luxury" — deep blacks, high-contrast typography, refined animations. See [`docs/BRANDING_MIRROU.md`](./docs/BRANDING_MIRROU.md).

For a deep dive into the code structure, see [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## 💻 Local Development
### Prerequisites
- Node.js 20+

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Running the App
```bash
npm run dev          # Start development server on port 3000
npm run build        # Create static production build (outputs to dist/)
npm run preview      # Preview the built production version locally
npm run lint         # Run TypeScript checks
```

### Environment Variables
Environment variables are securely managed. 
- Do **not** commit `.env` files to this repository.
- Use `.env.example` as a template for your local setup.
- Any secrets or API keys belong in `.env.local` which is ignored by git.

## 🚀 Deployment
This project is built for **Static Site Generation (SSG)**. 
Running `npm run build` generates a fully static `/dist` folder. 
- Deployment is as simple as connecting this repository to **Vercel**, **Netlify**, or **Cloudflare Pages**.
- Configure the build command to `npm run build` and the output directory to `dist`.
- Ensure environment variables are configured securely within your hosting provider's dashboard.

## 🤝 How to Contribute / Extend
1. **Adding Pages**: See `src/routes/` and update routing in `src/entry-client.tsx` or `src/App.tsx`.
2. **Adding Content**: Modify `src/content/site-data.ts` (Single Source of Truth). New cases or blog articles automatically generate pages if mapped correctly.
3. **Styling**: Tailored utility classes using Tailwind CSS v4 in `src/index.css`.
