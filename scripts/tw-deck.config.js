/** Standalone Tailwind v3 build for public/deck.html (self-hosted, CSP-safe).
 * Mirrors the deck's inline Play-CDN config. Scans the deck (incl. JS template
 * literals) so all arbitrary-value + gradient utilities are emitted statically. */
module.exports = {
  content: ['./public/deck.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
