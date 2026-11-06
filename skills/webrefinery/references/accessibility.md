# Accessibility & Usability Standards (WebRefinery)

Every refined interface must achieve baseline WCAG 2.2 AA compliance. Removing visual slop is incomplete if the screen fails basic accessibility and cognitive clarity.

## 1. Contrast Ratios (WCAG AA)

- **Normal Text (< 18pt / 24px regular)**: Minimum 4.5:1 contrast against its background.
- **Large Text (>= 18pt or >= 14pt bold)**: Minimum 3.0:1 contrast against its background.
- **UI Components & Graphical Objects**: Minimum 3.0:1 contrast against adjacent colors.
- **Never rely on low-opacity text for critical labels**: Avoid `opacity: 0.3` or `rgba(255,255,255,0.3)` on body text or form placeholders; use calibrated neutral ramps.

## 2. Focus Visible & Keyboard Navigation

- **Focus Rings**: Never remove outline with `outline: none` without providing an accessible `:focus-visible` replacement:
  ```css
  :focus-visible {
    outline: 2px solid var(--refinery-accent);
    outline-offset: 2px;
  }
  ```
- **Tab Order**: All interactive controls (`<button>`, `<a>`, `<input>`) must follow logical source-order navigation.
- **Skip Links**: Landing pages with heavy headers should offer `<a href="#main" class="skip-link">Skip to main content</a>`.

## 3. Semantic Structure

- **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>` rather than wrapping everything in nested generic `<div>`s.
- **Heading Order**: Exactly one `<h1>` per page context, followed logically by `<h2>` and `<h3>`. Never skip levels for cosmetic size preferences.
- **Accessible Icons**: Decorative icons get `aria-hidden="true"`. Actionable icons (e.g. icon-only buttons) require an `aria-label` or visually hidden text.

