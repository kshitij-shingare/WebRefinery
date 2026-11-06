# Performance & Motion Budgeting (WebRefinery)

Vibecoded interfaces frequently suffer from severe rendering performance regressions: unthrottled mouse-parallax listeners, unbounded continuous 3D transforms, and heavy CSS blur filters that saturate mobile GPUs.

## 1. Motion Budget

- **Remove Infinite CPU Loops**:
  - Kill `animate-pulse` or `animate-ping` on static badges.
  - Eliminate rotating 3D carousels that churn paint cycles at 60fps in the background.
  - Replace unconstrained particle canvases with lightweight CSS gradients or static SVG vector elements.
- **Micro-Interactions Only**:
  - Restrict transitions to user-initiated states (`:hover`, `:active`, `:focus-visible`).
  - Cap durations between 120ms and 240ms with smooth cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced Motion Support**:
  Always honor user system preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

## 2. GPU Layer & Composite Containment

- **Composite Only**: Animate `transform` and `opacity`. Never animate `width`, `height`, `margin`, `padding`, or `left`/`top` as they trigger layout recalculations and repaint passes.
- **Filter Restraint**: Keep `backdrop-filter: blur(...)` to 1 or 2 elevated surfaces (e.g., a sticky navigation bar), never stacked on every card.
- **Will-Change**: Use `will-change: transform` only during active animations and remove it afterward to prevent persistent GPU memory reservation.
