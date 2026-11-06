---
name: webrefinery
description: Autonomous design system refactoring and visual polish engine. Transforms vibecoded, AI-looking interfaces into human-crafted, distinctive web products with intentional design tokens, WCAG AA contrast, and production-grade typography. Use when the user asks to unslop, polish, refactor, or elevate a UI screen, or when an interface exhibits telltale AI tropes like glowing radial gradients, floating 3D blobs, emoji badges, shouting copy, and irregular spacing.
license: CC-BY-4.0
metadata:
  author: Kshitij Shingare
  github: https://github.com/kshitij-shingare
  inspired_by: Damir Sokolovsky (@heydamir)
---

# WebRefinery

**WebRefinery** is an autonomous design system refactoring and visual polish engine created by Kshitij Shingare ([@kshitijshingare](https://github.com/kshitij-shingare)), expanding upon the Unslopping design principles initiated by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)) under CC BY 4.0.

AI-generated interfaces fail in consistent, repetitive patterns: arbitrary spacing, purple-to-blue glow gradients, emoji labels, shouting buzzword copy, and low-contrast text. Removing these tells is only step one. WebRefinery systematically refactors the screen into an intentional, production-ready design system that reflects the genuine identity of your product.

---

## The 10-Step Refinery Pipeline

Execute these passes sequentially across the entire screen before proceeding to the next:

```
[1. Audit] ➔ [2. Direction] ➔ [3. Semantics] ➔ [4. Spacing] ➔ [5. Color & Contrast]
     ➔ [6. Typography] ➔ [7. Icons] ➔ [8. Copy] ➔ [9. Details] ➔ [10. Product Visuals]
```

### 1. Audit & Slop Detection
Run the automated headless auditor or inspect against [`references/signs.md`](references/signs.md):
```bash
node skills/webrefinery/scripts/audit.mjs <target-url-or-file>
```
Identify every tell:
- Purple/blue glow backgrounds, radial blur blobs
- Gradient text clipping (`-webkit-background-clip: text`)
- Glowing box-shadows and pulsing animations
- Decorative emoji icons in headers, buttons, or badges
- Font weight 800-900 with arbitrary tracking
- Irregular spacing off the 4px grid

### 2. Direction Setting
Before editing any code, write the **5 Core Lines**:
- **Product:** Plain one-sentence summary of what the product does and for whom.
- **Character:** 2-3 precise tonal words (e.g., *calm, architectural, exact*). Avoid generic buzzwords like *sleek*, *modern*, or *clean*.
- **World:** The physical or functional realm the product inhabits (e.g., *terminal console, paper & ledger, drafting table, instrumentation bench*). This sets the tint of the neutrals.
- **Moments:** 1 or 2 focal points carrying rich craft (e.g., *an authentic invoice preview, a high-fidelity telemetry chart, a real product component*).
- **Signature:** One recurring, branded micro-detail (e.g., *monospaced telemetry line, phosphor status dot, keycap badge*).

*Stop and confirm the direction with the user before touching code.*

### 3. Semantic Architecture
- Ensure proper landmark structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Single `<h1>` per view, with logical `<h2>` and `<h3>` descending order.
- Ensure all interactive controls have accessible labels and keyboard focus states ([`references/accessibility.md`](references/accessibility.md)).

### 4. Spacing & Rhythm (4px Grid)
- All margins, paddings, gaps, and heights must be multiples of 4 (e.g., 8, 12, 16, 20, 24, 32, 48, 64px).
- Internal element padding must be smaller than the space between distinct sections.
- Equal components in a list share identical heights and gaps.

### 5. Color & Contrast
- Build from one neutral ramp tinted toward the World defined in Direction ([`references/tokens.md`](references/tokens.md)).
- Chrome (navigation, backgrounds, cards, dividers) stays quiet and monochrome.
- Hairline borders at 8% to 10% opacity (`rgba(255, 255, 255, 0.08)` for dark, `rgba(0, 0, 0, 0.08)` for light).
- Single accent color used with extreme restraint (CTA button, active tab, key metric).
- Minimum 4.5:1 contrast ratio for all readable text (WCAG AA).

### 6. Typography & Tabular Numerals
- Font pairings: Clean interface sans-serif (Inter, Geist, SF Pro) paired with a monospace partner (JetBrains Mono) for numbers and metadata.
- Limit weights to 400 (regular) and 500 (medium), with 600 reserved strictly for primary section headings. No weight 800 or 900.
- All numbers use `font-feature-settings: "tnum" 1` (tabular figures).
- Sentence case everywhere. No all-caps wide-tracked labels.

### 7. Icon Cohesion
- Purge all decorative emojis from buttons, navigation, and badges.
- Adopt a uniform line icon set (e.g., Lucide, Feather) at one stroke-width (1.5px or 2px) and fixed box sizing.
- Icons inherit their text role color rather than carrying standalone saturated colors.

### 8. Copy & Voice
- Remove exclamation marks (`!`, `!!`).
- Eliminate hype words (*supercharge*, *seamless*, *revolutionize*, *10x*).
- Headlines state specifically what the software does.
- Placeholders stay concise (`Search` instead of `Search anything here...`).

### 9. Details & Component States
- Nested border radius formula: `R_inner = R_outer - Padding`. Controls: 6-8px, Cards: 10-14px. Not everything is a pill.
- Replace glowing status indicators with monospaced keycaps or subtle status dots.
- Focus rings visible on keyboard focus (`:focus-visible`).

### 10. Product Visuals & Motion Budget
- Replace abstract 3D blobs, orbs, and floating gradients with authentic previews of your real software (data tables, code snippets, receipts, dashboard widgets).
- Remove continuous GPU-draining animations (`animate-pulse`, spinning 3D tracks).
- Respect `prefers-reduced-motion` ([`references/performance.md`](references/performance.md)).

---

## Transformation Story Videos

To generate a before/after video where the screen refines itself with live redline measurements:

1. Create a `story.html` specifying `<meta name="webrefinery-steps" content="Spacing, Color, Type, Details">` and `<meta name="webrefinery-frame" content="130 0 1180">`.
2. Add `data-gap`, `data-radius`, and `.swap` morph spans.
3. Render with Playwright and FFmpeg:
   ```bash
   node skills/webrefinery/scripts/story.mjs story.html story.mp4
   ```

