# MIRROU CREATIVE STUDIO
**Comprehensive Brand & Design System Guidelines (Dark Luxury v2.0)**

---

## 1. THE BRAND ETHOS & PHILOSOPHY
**Mirrou Creative Studio** is not merely an agency; it is a high-performance visual engine engineered for the modern digital era. We operate at the exact intersection of **hyper-aesthetic visual storytelling** and **data-driven performance marketing**. 

Our philosophy is grounded in the "Dark Luxury" paradigm: an aesthetic that commands authority, exclusivity, and technological supremacy. We serve high-end Beauty, Health, and Lifestyle brands by delivering assets that do not just look exquisite, but convert with ruthless efficiency.

**Core Values:**
- **Aesthetic Precision:** Every pixel is intentional. No superfluous elements.
- **Measurable Impact:** Creativity validated by data.
- **Technological Vanguard:** Seamless integration of AI, 3D (WebGL/Three.js), and traditional high-end photography.

---

## 2. THE DESIGN SYSTEM: DARK LUXURY V2.0

The *Dark Luxury v2.0* design language is defined by deep, absolute contrast. It utilizes infinite voids (true blacks) as a canvas, allowing content and neon-infused accents to illuminate the user's focus. 

### 2.1 Color Palette & Tokens
Colors are defined strictly by HSL values to ensure programmatic consistency across Tailwind CSS and CSS-in-JS environments.

**The Void (Backgrounds)**
- `Void Black`: `#050505` (Base Background, App Shell) — *The endless canvas.*
- `Onyx Surface`: `#0A0A0A` (Cards, Modals) — *Subtle elevation.*
- `Graphite Line`: `#1A1A1A` (Borders, Dividers) — *Almost imperceptible separation.*

**The Light (Typography & Foreground)**
- `Stellar White`: `#FFFFFF` (Headings, Primary Call-To-Action) — *Maximum contrast.*
- `Ash Grey`: `#A1A1AA` (Body Text, Secondary Information) — *Readable, muted, elegant.*
- `Ghost Grey`: `#52525B` (Disabled States, Metadata) — *Recessed information.*

**The Energy (Accents & Interactions)**
- `Mirrou Neon (Primary)`: `#E2FF46` (Electric Lime) — *Used sparingly for conversion points, hover states, and critical performance indicators. Commands immediate attention without breaking the luxury feel.*
- `Digital Orchid (Secondary)`: `#B886F8` (Soft Violet) — *Used for AI-driven features, WebGL lighting, and subtle gradients representing innovation.*

### 2.2 Typography Architecture
Typography is the backbone of the Dark Luxury aesthetic. We pair a brutalist, geometric sans-serif for headings with a highly legible, utilitarian sans-serif for body copy.

**Primary Typeface (Headlines / Display): `Space Grotesk` or `Inter Tight`**
- **Characteristics:** Wide, geometric, unapologetically modern.
- **Usage:** H1, H2, Hero statements, numbers, and data points.
- **Styling:** Tightly tracked (letter-spacing: -0.02em), leading (line-height) set to 1.1 for maximum impact.

**Secondary Typeface (Body / UI): `Inter` or `Geist`**
- **Characteristics:** Neutral, highly legible at small sizes, perfect x-height.
- **Usage:** Paragraphs, buttons, input fields, navigation.
- **Styling:** Loose tracking for small caps (letter-spacing: 0.05em), leading set to 1.6 for readability.

---

## 3. UI/UX & COMPONENT ENGINEERING

Every UI component is treated as a physical object in a digital space. 

### 3.1 Glassmorphism & Materials
We reject flat design in favor of subtle, realistic materials.
- **Surface Elevation:** Modals and floating navigation utilize a strict backdrop-blur (`blur-md` or `12px`) combined with a semi-transparent background (`rgba(10, 10, 10, 0.6)`).
- **Borders:** A 1px border of `rgba(255, 255, 255, 0.05)` is applied to glass surfaces to catch digital "light", mimicking a polished edge.

### 3.2 Buttons & Call-to-Actions
- **Primary Button:** Background: `Stellar White`. Text: `Void Black`. No border radius (`rounded-none` or `rounded-sm`) to reflect a sharp, brutalist, high-fashion editorial feel.
- **Hover State:** Background shifts to `Mirrou Neon`. The transition must take exactly `300ms` using an `ease-out` timing function.
- **Ghost Button:** Transparent background, 1px `Graphite Line` border, `Stellar White` text.

### 3.3 Spatial Awareness (Grid & Spacing)
- The layout is governed by a strict 8pt grid system.
- Macro-spacing (between sections) is expansive (min. `120px` to `240px`), allowing elements to breathe. In luxury, space is the ultimate premium.

---

## 4. MOTION & INTERACTION DYNAMICS

Motion must feel expensive. It should emulate real-world physics—specifically fluid dynamics and spring tension—never linear mechanics.

- **Easing Curves:** Avoid `ease-in-out`. Use custom bezier curves, specifically a "snappy but smooth" spring: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reveal Animations:** Elements should not simply "fade in". They should translate subtly along the Y-axis (`translateY(20px)`) while scaling from `0.98` to `1` over `800ms`.
- **Hover Physics:** Interactive elements scale up by exactly `1.02` with a `spring` configuration. No abrupt snapping.
- **Page Transitions:** The void remains static; content wipes or fades smoothly across the router.

---

## 5. VISUAL DIRECTION: PHOTOGRAPHY & AI

Mirrou’s visual assets must bridge the gap between organic human touch and algorithmic perfection.

### 5.1 High-End Photography
- **Lighting:** Chiaroscuro. High contrast, deep shadows, single directional light sources.
- **Subject:** Products or models must be razor-sharp. Skin textures must remain realistic but flawless.
- **Color Grading:** Desaturated backgrounds, preserving true skin tones or product colors. Cool shadows, warm highlights.

### 5.2 AI Visuals (The "Foto-KI-Hybrid")
- **Prompt Engineering Rules:** Assets generated via AI must never look synthetic or plastic. They must feature cinematic grain (ISO 400 equivalent), slight chromatic aberration, and hyper-realistic lighting physics.
- **Themation:** Surreal but grounded. E.g., a luxury skincare bottle resting on a bed of floating, obsidian-like neural networks.

---

## 6. THE CODE (DEVELOPER STANDARDS)

To execute this brand kit programmatically, the following Tailwind CSS v4 configuration represents the absolute baseline:

```css
@theme {
  --color-mirrou-bg: #050505;
  --color-mirrou-surface: #0A0A0A;
  --color-mirrou-border: #1A1A1A;
  --color-mirrou-text: #FFFFFF;
  --color-mirrou-muted: #A1A1AA;
  --color-mirrou-neon: #E2FF46;
  --color-mirrou-accent: #B886F8;
  
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;

  --ease-mirrou: cubic-bezier(0.16, 1, 0.3, 1);
}
```

*“Design is not just what it looks like and feels like. Design is how it works. And at Mirrou, it works to dominate.”*
