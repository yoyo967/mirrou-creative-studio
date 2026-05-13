# Architecture Overview

## Tech Stack
- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + Motion (for advanced animations)
- **3D Graphics**: Three.js / React Three Fiber (`@react-three/fiber`)
- **Static Site Generation**: `vite-react-ssg`

## Routing & SSG Architecture
The application is pre-rendered at build time to provide optimal SEO and performance. It follows a highly structured content architecture based on the **Apex / Pillar / Cluster** model:
- **Apex** (`/`): The root homepage, acting as the central hub.
- **Pillars** (`/performance-creative`, `/creative-engine`, etc.): Core service category pages.
- **Clusters** (`/blog/:slug`): Distinct articles that provide deep dives into sub-topics and link back to their respective pillars.

All routes are statically generated into the `dist/` folder via `npm run build`.

## Content Layer
The Single Source of Truth for the site's content is located in `src/content/site-data.ts`.
This approach avoids a complex CMS setup for the initial launch, enabling rapid content iteration. Modifying this file automatically reflects changes across pages, blog articles, and case studies.

## Component Organization
- `src/components/`: Reusable, stateless UI primitives (Buttons, Inputs, Cards).
- `src/routes/`: Page-level components corresponding to actual routes.
- `src/content/`: Data files acting as a static API.
- `src/components/SEO.tsx`: Dedicated component for managing dynamic meta tags, structured data, and Canonical URLs per route.

## Design Tokens / Dark Luxury v2.0
The application implements the **Dark Luxury v2.0** design system.
Tokens are defined using modern CSS variables and Tailwind CSS 4 configuration. The system relies heavily on high-contrast palettes, smooth micro-interactions, and premium typography.
