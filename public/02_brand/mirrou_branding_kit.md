# Mirrou Creative Studio — Master Brand & Design System Kit

> **Version:** 1.0.0 (Extracted directly from production codebase)
> **Brand Name:** Mirrou Creative Studio
> **Tagline:** "Algorithm of Soul"
> **Core Domain:** Performance Creative for Beauty, Health & Lifestyle (E-Commerce)

This document serves as the absolute source of truth for the Mirrou Creative Studio visual identity, UI design tokens, and tone of voice. It is a 1:1 match with the production CSS architecture.

---

## 1. Brand Identity & Character

### Core Values & Archetype
- **Archetype:** Magier + Architekt ("Transformation through knowledge. Technical mastery in service of magical outcomes.")
- **Brand Character:** Dark, editorial, precise, system-oriented.
- **Tonality Matrix:**
  - **Status:** Authoritative
  - **Temperature:** Cool / Precise
  - **Pace:** Deliberate
  - **Quality:** Intellectual
- **Forbidden Lexicon:** "Cheap", "Billig", "Quick Fix", "Mass Production", "Generic", "Purely Aesthetic".

---

## 2. Color System (Exact CSS Tokens)

The visual system operates primarily in a dark mode "Mirrou Base" with specific "Cream" inversions and a signature "Gold" accent.

### Dark Base (Mirrou Primary)
| Role | Variable | Hex | Usage |
|------|----------|-----|-------|
| Background | `--color-bg` | `#080808` | Main application background (Deep Ground). |
| Surface | `--color-surface` | `#111113` | Elevated cards, containers. |
| Surface 2 | `--color-surface-2` | `#1A1A1E` | Hover states, secondary elevations. |
| Ink (Text) | `--color-ink` | `#F2EFE9` | Primary typography (Ivory White). |
| Body Text | `--color-body` | `#B8B4AE` | Secondary typography, long-form reading. |
| Muted | `--color-muted` | `#6E6B66` | Placeholders, technical micro-copy. |
| Subtle | `--color-subtle` | `#3A3835` | Inactive elements, deep borders. |

### Cream Base (Inverted / Editorial Sections)
| Role | Variable | Hex | Usage |
|------|----------|-----|-------|
| Background | `--color-cream` | `#F2EFE9` | Light section backgrounds. |
| Surface | `--color-cream-2` | `#E8E4DB` | Light elevated containers. |
| Ink (Text) | `--color-ink-on-cream`| `#0D0D0F` | Primary dark text on light backgrounds. |
| Body Text | `--color-body-on-cream`| `#2E2D2A` | Paragraphs on light backgrounds. |
| Muted | `--color-muted-on-cream`| `#6E6B66` | Subtle text on light backgrounds. |

### Signature Accents
| Role | Variable | Value | Usage |
|------|----------|-------|-------|
| Primary Gold | `--color-accent` | `#C8A25A` | Primary buttons, active states, text selection. |
| Light Gold | `--color-accent-light`| `#E4C07A` | Hover states for accents. |
| Soft Gold | `--color-accent-soft` | `rgba(200, 162, 90, 0.10)` | Subtle highlights, shimmer effects. |

### Structural Elements
| Role | Variable | RGBA | Usage |
|------|----------|------|-------|
| Grid Line | `--color-grid` | `rgba(242, 239, 233, 0.05)` | Faint architectural grid lines. |
| Strong Grid | `--color-grid-strong` | `rgba(242, 239, 233, 0.10)` | Prominent dividers. |

---

## 3. Typography Architecture

The typographic hierarchy relies on extreme contrast between elegant, tightly tracked serif display faces and highly technical, legible monospaced/sans-serif utility faces.

### Font Stacks
1. **Serif (Display):** `Cormorant Garamond`, `Times New Roman`, `serif` (`--font-serif`, `--font-display`)
2. **Sans-Serif (Body):** `Inter`, `ui-sans-serif`, `system-ui`, `sans-serif` (`--font-sans`)
3. **Monospace (Technical):** `JetBrains Mono`, `ui-monospace`, `monospace` (`--font-mono`)

### Type Scales & Rules
> [!NOTE]
> All font smoothing is set to `-webkit-font-smoothing: antialiased` for precision.

#### 3.1 Display (Headings `h1` - `h6`)
- **Font:** Cormorant Garamond (Light `300`)
- **Line Height:** Tight (`0.88` to `0.95`)
- **Letter Spacing (Tracking):** Tightly tracked (`-0.02em` to `-0.03em`)
- **Hero Scale (`.display-hero`):** `clamp(72px, 13vw, 220px)`

#### 3.2 Body Text (`p`, `.text-body`)
- **Font:** Inter (Light `300`)
- **Base Size:** `17px` (Mobile), `18px` (Desktop)
- **Line Height:** Open and readable (`1.65` to `1.7`)
- **Color:** `--color-body` (`#B8B4AE`)

#### 3.3 Eyebrows & Technical Labels (`.eyebrow`, `.counter-label`)
- **Font:** JetBrains Mono (Medium `500`)
- **Formatting:** Uppercase (`text-transform: uppercase`)
- **Size:** `10px` (Eyebrow), `9px` (Counter)
- **Letter Spacing:** Extremely wide (`0.4em` to `0.45em`)
- **Color:** `--color-accent` (Eyebrow), `--color-muted` (Counter)

---

## 4. UI Components & Interaction Primitives

### 4.1 Buttons
Mirrou uses sharp, non-rounded geometry (`border-radius: 0`) to reinforce the architectural, precise brand character.

* **Primary Button (`.btn-primary`)**
  * **Style:** Solid `--color-accent` background, `--color-bg` text.
  * **Typography:** `JetBrains Mono`, `10px`, `600` weight, uppercase, `0.2em` tracking.
  * **Padding:** `15px 26px`.
  * **Hover Interaction:** Magnetic lift (`-2px` Y-axis) with a subtle white overlay slide from the left (`rgba(255,255,255,0.12)`).

* **Ghost Button (`.btn-ghost`)**
  * **Style:** Transparent background, `1px solid rgba(242, 239, 233, 0.15)` border.
  * **Hover Interaction:** Border transitions to `--color-accent`. An animated background (`--color-accent`) sweeps in from the left (`transform: scaleX(1)`).

### 4.2 Cinematic Layers
* **Grain Overlay (`.grain-overlay`):** A fixed, animating SVG fractal noise layer (`mix-blend-mode: overlay`, opacity `0.032`) covers the entire viewport to give the interface an organic, high-end editorial feel.
* **Image Gradients (`.img-overlay-dark`):** Images utilize multi-stop linear gradients to ensure text legibility while maintaining a dark, moody atmosphere (fading from `30%` opacity at the top to `92%` opacity at the bottom).

### 4.3 Motion & Transitions
> [!IMPORTANT]
> The primary easing curve for all interactions is **`cubic-bezier(0.16, 1, 0.3, 1)`**.

* **Timing:** `300ms` for color/opacity changes, `400ms` for transforms/magnetic effects, `900ms` for heavy image reveals.
* **Image Reveal (`.img-reveal`):** Images load with a sophisticated shimmer placeholder (using `--color-surface-2` and `--color-accent-soft`) before cross-fading the actual asset.
* **Image Zoom (`.img-zoom`):** Hovering over editorial images triggers a slow, deliberate `1.06x` scale over `1.2s`.
* **Selection:** Text selection is universally styled with a `--color-accent` background and `--color-bg` text.

---

## 5. Localization Typographic Rules

To maintain the architectural integrity of the design across different alphabets:
- **RU/UK Locales:** Fall back to native `system-ui` for both Sans and Serif to handle Cyrillic characters perfectly without breaking the layout.
- **TR Locale:** Explicitly enables localized font forms (`font-feature-settings: "locl" 1`).
