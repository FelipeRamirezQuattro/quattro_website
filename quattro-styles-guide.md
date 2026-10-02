# Quattro Software — Design System Reference

Extracted from `WEBSITE_QUATTRO_V2`. Tailwind v3 project — no `@theme`/CSS-first config. **No single source of truth exists today**: colors are hand-duplicated between `tailwind.config.ts` and `app/globals.css`. Use this doc to consolidate into one token file in a new project.

---

## 1. Color Palette

| Token | Value | Role / Usage |
|---|---|---|
| `primary` | `rgb(23, 84, 154)` / `#17549A` | Main brand blue — buttons, links, borders, glows, gradient-text, scrollbar thumb |
| `primary-light` | `rgb(41, 112, 196)` / `#2970C4` | Hover state for primary buttons/links |
| `primary-dark` | `rgb(14, 55, 105)` | Dark-gradient stops (mesh backgrounds) |
| `primary-glow` | `rgba(23, 84, 154, 0.3)` | Box-shadow glow color |
| `accent` | `rgb(56, 189, 248)` / `#38BDF8` | Secondary accent (cyan) — eyebrow/kicker text on dark bg, gradient-text, active nav underline |
| `accent-2` | `rgb(99, 210, 255)` | Accent hover state |
| `surface-dark` | `rgb(8, 15, 30)` | Page background (dark theme base) |
| `surface-mid` | `rgb(12, 22, 45)` | Card backgrounds, dropdown panels, scrollbar track |
| `surface-light` | `rgb(248, 250, 253)` | Light-section backgrounds |
| `surface-white` | `rgb(255, 255, 255)` | White cards on light sections |
| `text-primary` | `rgb(240, 245, 255)` | Body text on dark backgrounds |
| `text-secondary` | `rgb(148, 172, 209)` | Muted/secondary text on dark backgrounds |
| `text-dark` | `rgb(15, 23, 42)` | Headings on light-section backgrounds |
| `border-dark` | `rgba(23, 84, 154, 0.25)` | Card/panel borders on dark backgrounds |
| `border-light` | `rgba(23, 84, 154, 0.12)` | Subtler border variant |
| `success` | `rgb(34, 197, 94)` | Success states/toasts |
| `error` | `rgb(239, 68, 68)` | Error/validation states |

**Gap in the source system:** light sections (`bg-white`, `bg-quattro-surface-light`) fall back to generic Tailwind `gray-*`/`slate-*` for text instead of a defined light-mode token — worth fixing when porting this (e.g. define `text-light-primary`/`text-light-secondary` tokens).

### Copy-paste: Tailwind config

```ts
colors: {
  brand: {
    primary: "rgb(23, 84, 154)",
    "primary-light": "rgb(41, 112, 196)",
    "primary-dark": "rgb(14, 55, 105)",
    "primary-glow": "rgba(23, 84, 154, 0.3)",
    accent: "rgb(56, 189, 248)",
    "accent-2": "rgb(99, 210, 255)",
    surface: {
      dark: "rgb(8, 15, 30)",
      mid: "rgb(12, 22, 45)",
      light: "rgb(248, 250, 253)",
      white: "rgb(255, 255, 255)",
    },
    text: {
      primary: "rgb(240, 245, 255)",
      secondary: "rgb(148, 172, 209)",
      dark: "rgb(15, 23, 42)",
    },
    border: {
      dark: "rgba(23, 84, 154, 0.25)",
      light: "rgba(23, 84, 154, 0.12)",
    },
    success: "rgb(34, 197, 94)",
    error: "rgb(239, 68, 68)",
  },
},
```

### Copy-paste: CSS variables

```css
:root {
  --color-primary: rgb(23, 84, 154);
  --color-primary-light: rgb(41, 112, 196);
  --color-primary-dark: rgb(14, 55, 105);
  --color-primary-glow: rgba(23, 84, 154, 0.3);
  --color-accent: rgb(56, 189, 248);
  --color-accent-2: rgb(99, 210, 255);
  --color-surface-dark: rgb(8, 15, 30);
  --color-surface-mid: rgb(12, 22, 45);
  --color-surface-light: rgb(248, 250, 253);
  --color-surface-white: rgb(255, 255, 255);
  --color-text-primary: rgb(240, 245, 255);
  --color-text-secondary: rgb(148, 172, 209);
  --color-text-dark: rgb(15, 23, 42);
  --color-border-dark: rgba(23, 84, 154, 0.25);
  --color-border-light: rgba(23, 84, 154, 0.12);
  --color-success: rgb(34, 197, 94);
  --color-error: rgb(239, 68, 68);
}
```

---

## 2. Typography

Loaded via `next/font/google` in `app/layout.tsx`:

| Role | Font | Weights | CSS var | Tailwind class |
|---|---|---|---|---|
| Display/headings | **Syne** | 400, 600, 700, 800 | `--font-syne` | `font-display` |
| Body | **DM Sans** | 300, 400, 500, 600, 700 | `--font-dm-sans` | `font-body` |
| Mono/labels | **JetBrains Mono** | 400, 500 | `--font-jetbrains-mono` | `font-mono` |

```ts
fontFamily: {
  display: ["var(--font-syne)", "sans-serif"],
  body: ["var(--font-dm-sans)", "sans-serif"],
  mono: ["var(--font-jetbrains-mono)", "monospace"],
},
```

**Type scale conventions (reuse these exact patterns):**
- Hero H1: `font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.1] sm:leading-tight`
- Section H2: `font-display font-bold text-2xl sm:text-4xl lg:text-5xl` (+ `text-quattro-text-dark` on light bg, `text-white` on dark bg)
- Eyebrow/kicker (always precedes H2): `font-mono text-sm tracking-widest uppercase mb-3` (+ `text-quattro-primary` light bg / `text-quattro-accent` dark bg)
- Card title: `font-display font-bold text-lg sm:text-xl`
- Body/lede: `font-body text-base sm:text-lg` or `text-xl` for hero subtext
- Responsive scaling almost always follows `base → sm → lg` steps only

---

## 3. Spacing / Layout / Radius / Shadows

**Breakpoints:** Tailwind defaults + one custom addition:

```ts
screens: { xs: "375px" }, // sm:640 md:768 lg:1024 xl:1280 2xl:1536 remain default
```

**Section vertical rhythm:**
- Standard section: `py-16 sm:py-20 lg:py-24`
- Page-hero section: `py-20 sm:py-24 lg:py-32`

**Container widths** (three tiers, used situationally):
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — nav/footer
- `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` — standard content sections
- `max-w-4xl` — hero/CTA sections

**Border radius** (no custom scale — default Tailwind values used semantically):
- `rounded-2xl` — cards (dominant)
- `rounded-xl` — buttons, icon tiles, inputs
- `rounded-lg` — form inputs, small buttons, social icons
- `rounded-full` — pills, badges, avatars, dots
- `rounded-3xl` — large hero panels (reserved for standout elements)

**Shadows** — two systems:

1. Tailwind built-ins (`shadow-sm/md/lg/xl/2xl`) on light-background cards/forms
2. Hand-written glow shadows using brand blue, e.g.:

```
shadow-[0_0_20px_rgba(23,84,154,0.4)]        /* button default */
hover:shadow-[0_0_30px_rgba(23,84,154,0.6)]  /* button hover */
shadow-[0_4px_30px_rgba(0,0,0,0.4)]          /* nav scrolled */
```

Canonical "card glow" CSS class (recommend porting this as a real Tailwind shadow token in a new project instead of leaving it CSS-only):

```css
.card-glow:hover {
  box-shadow: 0 0 0 1px var(--color-primary), 0 8px 32px rgba(23,84,154,0.25), 0 0 60px rgba(23,84,154,0.1);
}
```

**Gap frequency (most→least common):** `gap-2`, `gap-1`, `gap-3`, `gap-5`, `gap-4`, `gap-6`, `gap-8`, `gap-10/12/16`.

---

## 4. Logo & Iconography

- **No SVG or image logo is actually rendered.** Header/footer both use a **text wordmark**:

```tsx
<span className="font-display font-bold text-xl text-white tracking-tight">QUATTRO</span>
<span className="font-body font-light text-sm text-quattro-text-secondary mt-0.5 tracking-widest uppercase">SOFTWARE</span>
```

- **Favicon:** `app/icon.png` (Next.js App Router auto-detected convention)
- **Legacy/unused raster logo files** in `public/images/legacy/` (not referenced in live code — leftovers from WP migration): `quattro-logo.png`, `quattro.png`, `quattro--1--removebg-preview.png` (transparent bg), `logo-final-6.png`, `logo-outlines.jpg`/`logo-outlines-1.jpg`, old favicon set (16x16/32x32 ×2). All PNG/JPG — **no vector logo exists in the repo**.
- **Icons:** `lucide-react` throughout — no custom icon set.

---

## 5. Component Patterns

**Button** (`components/ui/Button.tsx`):

```tsx
// base (all variants):
"inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"

variants: {
  primary: "bg-quattro-primary hover:bg-quattro-primary-light text-white shadow-[0_0_20px_rgba(23,84,154,0.4)] hover:shadow-[0_0_30px_rgba(23,84,154,0.6)]",
  ghost:   "bg-transparent border border-quattro-border-dark hover:border-quattro-accent text-quattro-text-secondary hover:text-white",
  outline: "bg-transparent border border-quattro-primary text-quattro-primary hover:bg-quattro-primary hover:text-white",
  accent:  "bg-quattro-accent hover:bg-quattro-accent-2 text-quattro-surface-dark font-semibold",
}
sizes: { sm: "px-4 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-8 py-3.5 text-base" }
```

*(Note: the source repo doesn't consistently reuse this component — many CTAs hand-copy these classes onto raw `<Link>` tags. Worth fixing in a new build.)*

**Badge** (`components/ui/Badge.tsx`):

```tsx
"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase"
variants: {
  default: "bg-quattro-primary/20 text-quattro-accent border border-quattro-primary/30",
  accent:  "bg-quattro-accent/15 text-quattro-accent border border-quattro-accent/30",
  success: "bg-green-500/15 text-green-400 border border-green-500/30",
  outline: "bg-transparent text-quattro-text-secondary border border-quattro-border-dark",
}
```

**Card** (dark, e.g. service card):

```tsx
className="h-full flex flex-col p-8 bg-quattro-surface-mid rounded-2xl border border-quattro-border-dark card-glow transition-all duration-300 group"
style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
```

**Card** (light variant):

```tsx
"flex gap-4 sm:gap-5 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
```

**Navbar:** sticky `top-0 z-50`; translucent background via inline style `background: rgba(8,15,30,0.92)` + `backdropFilter: blur(12px)`; on scroll adds `border-b border-quattro-border-dark shadow-[0_4px_30px_rgba(0,0,0,0.4)]`. Links: `px-3 py-2 text-sm font-body transition-colors rounded-md`, active state `text-quattro-accent` with an animated underline bar (`h-0.5 bg-quattro-accent rounded-full`).

---

## 6. Animations (from tailwind.config.ts)

```ts
animation: {
  "gradient-shift": "gradientShift 8s ease infinite",
  float: "float 6s ease-in-out infinite",
  "pulse-glow": "pulseGlow 2s ease-in-out infinite",
  marquee: "marquee 30s linear infinite",
  "spin-slow": "spin 8s linear infinite",
},
keyframes: {
  gradientShift: { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
  float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
  pulseGlow: { "0%, 100%": { boxShadow: "0 0 20px rgba(23,84,154,0.3)" }, "50%": { boxShadow: "0 0 40px rgba(23,84,154,0.7)" } },
  marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
},
```

Plus utility classes defined only in `globals.css` (not in Tailwind config): `.gradient-mesh`, `.grid-overlay`, `.shimmer-border`, `.glow-pulse`, `.gradient-text`, `.card-glow`.

---

**No dedicated tokens file, theme.ts, or style-guide doc exists in the repo** — this document is effectively the first consolidated version. Recommend that in a new project the CSS variables become the single source of truth, referenced from Tailwind config via `var(--color-primary)` etc., rather than repeating raw values in both places as this repo does.
