# WebRefinery ⚡

> **Autonomous Design System Refactoring & Visual Polish Engine for AI Agents & Modern Frontend Teams.**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](LICENSE)
[![Engine](https://img.shields.io/badge/Engine-Playwright_%2B_FFmpeg-green.svg)](#features)
[![Standards](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-orange.svg)](#accessibility--contrast-guardrails)
[![Frameworks](https://img.shields.io/badge/Frameworks-React_%7C_Next.js_%7C_Vue_%7C_Tailwind_%7C_HTML-purple.svg)](#supported-stacks)

Created by **Kshitij Shingare** ([@kshitij-shingare](https://github.com/kshitij-shingare)).  
*Evolved from and inspired by the Unslopping design principles initiated by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)) under CC BY 4.0.*

---

## The Problem: The "AI Slop" Epidemic

Modern AI coding agents (Cursor, Claude Code, Codex, Copilot, v0) produce functional logic, but their interfaces suffer from predictable, vibecoded hallmarks:
* **Hyper-saturated purple/blue radial gradients** that wash out content.
* **Shouting emoji badges & nav items** (`✨ Features`, `🚀 Sign Up Free`, `💸`).
* **Hype-word copy** (*"Supercharge your workflow 10x with AI"*).
* **Erratic spacing off the 4px rhythm grid** (`mt-[23px]`, `px-[19px]`).
* **GPU-choking continuous animation loops** (rotating 3D carousels, pulsing dots, unthrottled canvas particles).
* **Generic 3D glossy blobs** replacing real product demonstrations.

---

## The Solution: WebRefinery

**WebRefinery** is an autonomous agent skill and CLI suite that conducts an architectural redline review across your codebase. Rather than applying another generic theme, WebRefinery extracts the genuine character of your product and rebuilds the screen across a deterministic 10-step precision engineering pipeline.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      WEBREFINERY PIPELINE                              │
├───────────────┬──────────────────┬─────────────────┬───────────────────┤
│  1. AUDIT     │  2. DIRECTION    │  3. SEMANTICS   │  4. SPACING       │
│  Headless DOM │  World, Moment,  │  Landmarks,     │  Strict 4px       │
│  Slop Scoring │  Character       │  Heading Order  │  Rhythm Grid      │
├───────────────┼──────────────────┼─────────────────┼───────────────────┤
│  5. COLOR     │  6. TYPOGRAPHY   │  7. ICONS       │  8. COPY          │
│  Tinted Ramp  │  Tabular Figures │  Monochrome SVG │  Sentence Case,   │
│  WCAG AA      │  Weight 400-600  │  Zero Emojis    │  Zero Hype        │
├───────────────┴──────────────────┼─────────────────┴───────────────────┤
│  9. COMPONENT CRAFT              │  10. PRODUCT MOMENT & MOTION        │
│  Nested Radii, Hairline Depth    │  Real Data Ledger, GPU Budget       │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

## What Differentiates WebRefinery

| Feature | Vibecoded / Template Defaults | Basic Unslop Concept | **WebRefinery** |
| :--- | :--- | :--- | :--- |
| **Slop Detection** | Manual inspection | Checklist prompt | **Automated Headless Auditor (`audit.mjs`)** |
| **Scoring** | None | Subjective | **0–100 Objective Refinery Score** |
| **Accessibility** | Neglected (fails contrast) | Color-focused | **WCAG 2.2 AA Contrast & Focus Guardrails** |
| **Performance** | Unbounded CSS & JS loops | Basic removal | **Strict GPU Composite & Motion Budgeting** |
| **Visuals** | Floating glowing blobs | Single static mockup | **Authentic Product Ledger / Data Architecture** |
| **Video Stories** | N/A | Square 1:1 only | **Multi-Ratio (1:1, 16:9, 9:16 vertical)** |
| **Agent Ecosystem** | N/A | Claude Code / Codex | **Universal (Antigravity, Claude Code, Codex, CLI)** |

---

## Quickstart & Installation

### 1. Install as an Agent Skill

#### Antigravity
Copy the skill into your global Antigravity skills directory:
```bash
git clone https://github.com/kshitij-shingare/webrefinery.git
cp -r webrefinery/skills/webrefinery ~/.gemini/config/skills/
```

#### Claude Code
```bash
cp -r webrefinery/skills/webrefinery ~/.claude/skills/
```

#### Codex
```bash
cp -r webrefinery/skills/webrefinery ~/.agents/skills/
```

### 2. Standalone CLI Dependencies
For headless DOM audits, full-resolution snapshots, and before/after transformation videos:
```bash
npm install -D playwright
npx playwright install chromium
```
*Note: Story video rendering also requires `ffmpeg` available on your system `PATH`.*

---

## CLI & Tooling Suite

### 1. Automated Slop & Contrast Auditor (`audit.mjs`)
Audit any local HTML file or live web application to generate an instant diagnostic report:
```bash
node skills/webrefinery/scripts/audit.mjs https://example.com
# Or audit a local build with dark theme:
node skills/webrefinery/scripts/audit.mjs dist/index.html --dark
# Output raw JSON for CI/CD pipelines:
node skills/webrefinery/scripts/audit.mjs dist/index.html --json
```

**Sample Output:**
```
=======================================================
             WEBREFINERY AUDIT REPORT                 
=======================================================
Target:         https://example.com/dashboard
Refinery Score: 42 / 100 [Needs Refinement]
Issues Found:   4

[1] Surfaces & Color -> Gradient Text Clip
    Target:  "Supercharge Invoicing" (<h1>)
    Fix:     Replace with solid primary text ramp for crisp readability.

[2] Surfaces & Color -> Colored Box Glow
    Target:  ".cta-btn" (<button>)
    Fix:     Remove glow. Use quiet 1px hairlines at 8% opacity and surface elevation.

[3] Icons & Badges -> Emoji as UI Navigation/Action Icon
    Target:  "✨ Features" (<a>)
    Fix:     Replace decorative emojis with consistent monochromatic SVG line icons.

[4] Motion & Performance -> Unbounded Infinite Animation Loop
    Target:  ".orbit-track" (<div>)
    Fix:     Remove continuous infinite spin/pulse. Restrict motion to user-triggered transitions.
=======================================================
```

### 2. Full-Fidelity DOM Snapshot Engine (`snapshot.mjs`)
Capture inlined, fully standalone offline snapshots with matching full-page screenshot verification:
```bash
node skills/webrefinery/scripts/snapshot.mjs https://example.com output.html --dark
```

### 3. Transformation Story Video Generator (`story.mjs`)
Create a high-impact, 60fps MP4 video demonstrating your interface refining itself step-by-step with real-time measurement calipers and morphing copy:
```bash
node skills/webrefinery/scripts/story.mjs story.html story.mp4
# Or widescreen (16:9 1080p):
node skills/webrefinery/scripts/story.mjs story.html story.mp4 --wide
# Preview live in a looped browser window before exporting:
node skills/webrefinery/scripts/story.mjs story.html --play
```

---

## The 10 Engineering Passes

1. **Audit**: Run `audit.mjs` to score and locate all aesthetic and accessibility violations.
2. **Direction**: Establish the 5 Core Lines (Product, Character, World, Moments, Signature).
3. **Semantics**: Establish landmark tags (`main`, `nav`, `header`) and single `h1` hierarchy.
4. **Spacing**: Enforce 4px cadence. Outer section margins > group gaps > inner item padding.
5. **Color & Contrast**: Eliminate purple gradients and glowing borders. Tint neutral ramp to the World. Enforce 4.5:1 text contrast.
6. **Typography**: Pair clean interface sans with monospace numbers (`tabular-nums`). Weights strictly 400 and 500.
7. **Icons**: Replace all emojis with uniform 1.5px stroke monochromatic SVG line icons.
8. **Copy**: Sentence case, truthful claims, concise placeholders, zero exclamation points.
9. **Details**: Apply nested radii math (`R_inner = R_outer - Padding`). Clean hairlines at 8% opacity.
10. **Product Visual & Motion Budget**: Replace generic 3D blobs with authentic software views (e.g., invoices, real data tables). Enforce `prefers-reduced-motion`.

---

## Supported Stacks

WebRefinery operates at the AST, DOM, and CSS layer, making it completely stack-agnostic:
* **Frameworks**: React, Next.js, Vue, Nuxt, Svelte, Astro, Plain HTML/CSS.
* **Styling**: Tailwind CSS, CSS Modules, Vanilla CSS, Styled Components.

---

## Author & Credits

* **Architect & Developer**: [Kshitij Shingare](https://github.com/kshitij-shingare)
* **Inspiration & Upstream Foundations**: Built upon the Unslopping design principles and story animation technique pioneered by [Damir Sokolovsky](https://heydamir.design/unslop) ([@heydamir](https://x.com/heydamir)).

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE). You are free to share and adapt this work for personal and commercial applications, provided appropriate attribution is maintained.

