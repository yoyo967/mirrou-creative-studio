# PRESS DOCUMENTATION — WEB IMPLEMENTATION SPEC (v2)

**Section position:** `03 SOLUTIONS // INVESTMENT / SCALE` → Press Documentation
**Audience for this doc:** Web team / frontend / CMS

---

## 1. Section position inside Mirrou architecture

Sidebar (left rail):
```
00 APEX
01 LOGIC
02 GOVERNANCE
03 SOLUTIONS // INVESTMENT / SCALE   ← active
04 PHILOSOPHY
05 COLLISION
```

Vertical micro-text along the left edge: `SILENCE AS A MEANS OF DESIGN`
Header (top): Mirrou Creative Studio · Architecture · Performance Logic · Work · Compliance · Solutions · Philosophy · DE/EN · MASTER-X →
Footer status: `SYSTEM LOAD`

---

## 2. Section structure

```
[ PRESS DOCUMENTATION ]

┌──────────────────────────┐  ┌────────────┐ ┌────────────┐
│  Headline                │  │ Card 01    │ │ Card 02    │
│  PRESS DOCUMENTATION     │  └────────────┘ └────────────┘
│                          │  ┌────────────┐ ┌────────────┐
│  Intro paragraph         │  │ Card 03    │ │ Card 04    │
│  (curators / journalists)│  └────────────┘ └────────────┘
└──────────────────────────┘
```

**Final intro copy (verbatim):**
> Optimized for curators and journalists. All materials are available for download, including photo credits and usage rights from Mirrou Creative Studio.

---

## 3. Card anatomy

| Slot | Required | Notes |
|------|----------|-------|
| Mono label (file type + size) | Yes | e.g. `JPG // 45MB` (top of card, JetBrains Mono uppercase) |
| Title (Cormorant Italic) | Yes | e.g. "Personal Brand Portrait Kit" |
| Description (1-line) | Recommended | Optional editorial line under the title |
| Language | Recommended | `EN` / `DE` / `EN/DE` |
| Updated | Recommended | "Updated May 2026" |
| Rights label | Recommended | "Editorial use with credit" |
| Download icon (Lucide, extralight) | Yes | Functional, top-right |
| Hover state | Yes | Linger fade-in 500ms (per Motion Vocabulary) |
| Focus state | Yes | Visible keyboard focus ring |
| Disabled state | Required if asset offline | Greyed + "Temporarily unavailable" |

---

## 4. Asset data model

```json
{
  "id": "string (slug)",
  "title": "string",
  "fileType": "PDF | JPG | ZIP",
  "fileSize": "string (e.g. '12.1 MB')",
  "description": "string (≤ 90 chars)",
  "language": "EN | DE | EN/DE",
  "updatedAt": "ISO 8601 date",
  "rightsLabel": "string",
  "downloadUrl": "string (stable, public)",
  "previewUrl": "string (optional)",
  "available": "boolean (default true)"
}
```

### Concrete asset records (final)

```json
[
  {
    "id": "personal-brand-portrait-kit",
    "title": "Personal Brand Portrait Kit",
    "fileType": "JPG",
    "fileSize": "45 MB",
    "description": "Curated press portraits of Olha Yevtushenko.",
    "language": "EN",
    "updatedAt": "2026-05-09",
    "rightsLabel": "Editorial use with credit",
    "downloadUrl": "https://mirrou.studio/downloads/press/mirrou-personal-brand-portrait-kit.jpg",
    "previewUrl": "https://mirrou.studio/previews/press/mirrou-personal-brand-portrait-kit-preview.jpg",
    "available": true
  },
  {
    "id": "studio-mission-deck-2026",
    "title": "Mirrou Studio Mission Deck",
    "fileType": "PDF",
    "fileSize": "12.1 MB",
    "description": "Studio thesis, dual-city architecture, capabilities.",
    "language": "EN",
    "updatedAt": "2026-05-09",
    "rightsLabel": "Editorial reference, with credit",
    "downloadUrl": "https://mirrou.studio/downloads/press/mirrou-studio-mission-deck-2026.pdf",
    "previewUrl": "https://mirrou.studio/previews/press/mirrou-studio-mission-deck-2026-cover.jpg",
    "available": true
  },
  {
    "id": "press-photo-kit-high-res",
    "title": "Press Photo Kit — High Res",
    "fileType": "ZIP",
    "fileSize": "260 MB",
    "description": "~60 curated high-resolution images, credits and captions.",
    "language": "EN",
    "updatedAt": "2026-05-09",
    "rightsLabel": "Editorial use with credit",
    "downloadUrl": "https://mirrou.studio/downloads/press/mirrou-press-photo-kit-high-res.zip",
    "previewUrl": "https://mirrou.studio/previews/press/mirrou-press-photo-kit-cover.jpg",
    "available": true
  },
  {
    "id": "case-study-compilation-2026",
    "title": "Case Study Compilation 2026",
    "fileType": "PDF",
    "fileSize": "8.8 MB",
    "description": "Four conceptual brand systems — Luminous Aura, Vitality Pulse, Essence Drift, Neural Glow.",
    "language": "EN",
    "updatedAt": "2026-05-09",
    "rightsLabel": "Editorial reference, with credit",
    "downloadUrl": "https://mirrou.studio/downloads/press/mirrou-case-study-compilation-2026.pdf",
    "previewUrl": "https://mirrou.studio/previews/press/mirrou-case-study-compilation-2026-cover.jpg",
    "available": true
  }
]
```

---

## 5. Frontend rules

- Cards are semantic links or buttons, not divs with onClick.
- The `download` attribute is set where the asset is hosted on the same origin.
- `aria-label` per card: `"Download {title}, {fileType}, {fileSize}"`.
- Tab order follows visual order. Visible focus ring required (Mirrou Gold, 1px).
- File size is read from the storage layer, not hard-coded.

---

## 6. Storage and delivery

- Host files behind a stable public URL pattern: `https://mirrou.studio/downloads/press/{filename}.{ext}`.
- Serve with correct MIME type:
  - `application/pdf` for PDFs
  - `image/jpeg` for JPGs
  - `application/zip` for ZIPs
- Set `Content-Disposition: attachment; filename="{filename}.{ext}"` for the ZIP and JPG (force download).
- For PDFs, leave `Content-Disposition: inline` so editors can preview before downloading.
- Cache long; cache-bust on file replacement via filename version.

---

## 7. Tracking

```js
analytics.track("press_download_clicked", {
  asset_id: "press-photo-kit-high-res",
  asset_title: "Press Photo Kit — High Res",
  file_type: "zip",
  file_size_mb: 260,
  page: "press_documentation",
  section: "03_solutions",
  language: "EN"
});
```

Event names snake_case. No PII in payload.

---

## 8. Accessibility

- Cards reachable by keyboard, in visual order.
- Focus rings visible (`outline: 1px solid var(--mirrou-gold)`).
- Text contrast on Deep Ground: minimum 4.5:1 (Stone Grey is AA at 4.8:1, Ivory and Gold are AAA).
- Touch targets minimum 44 × 44 px.
- Screen reader label includes title, file type and size.
- Reduced-motion respected for hover transitions.

---

## 9. Responsive behaviour

- **Desktop ≥ 1024 px:** 2 × 2 grid.
- **Tablet 640–1023 px:** 2 columns, stacked rows. Intro stacks above grid.
- **Mobile < 640 px:** 1 column. File type / size remain visible. Download button full-width.

---

## 10. Error and edge states

- 404 / unreachable file: card shows `Temporarily unavailable`, action disabled, error event logged.
- Slow connection: download initiates without modal; native browser progress is sufficient.
- Cross-origin failure: in-card mailto fallback to `press@mirrou.studio`.

---

## 11. Brand tokens (CSS)

```css
:root {
  --mirrou-deep-ground: #0A0A0A;
  --mirrou-ivory: #F5F3EE;
  --mirrou-gold: #C6A56B;
  --mirrou-stone-grey: #7D8087;
  --mirrou-muted-grid: #333333;

  --font-display: "Cormorant Garamond", serif;
  --font-body: "Inter Variable", "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --motion-linger: 500ms ease-out;
  --motion-snap: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

---

## 12. QA checklist

- [ ] All four download URLs return HTTP 200.
- [ ] All four file sizes shown in the UI match the bytes on disk (within ±0.1 MB).
- [ ] Downloads work in Chrome, Safari, Firefox (desktop + mobile Safari + Android Chrome).
- [ ] Tab order logical; focus ring visible.
- [ ] Screen reader announces title + file type + size for each card.
- [ ] No mixed-content or insecure download warnings.
- [ ] `press_download_clicked` event fires once per click and reaches analytics.
- [ ] No PII in event payload.
- [ ] No authoring metadata or unwanted EXIF in any published file.
- [ ] All Olha-portraits / Hamburg-HQ / Berlin frames have model + property releases on file.
- [ ] Editorial concept frames carry the disclaimer caption in shipping captions.

---

## 13. Go-live gate

The section may go live only when:

1. All four cards point to real, signed-off assets.
2. Legal has approved the assets, credits and usage rights.
3. Analytics event verified end-to-end.
4. QA checklist (section 12) fully checked.
5. At least one full keyboard-only run-through performed.
6. Aether / Neuroflow / Mininium concept-frame decision implemented.
