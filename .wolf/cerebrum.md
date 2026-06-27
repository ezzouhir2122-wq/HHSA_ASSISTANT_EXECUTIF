# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-06-05

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** HHSA ASSISTANT EXECUTIF
- **CSS Animation + Tailwind:** When using custom keyframe animations, define `@keyframes` in `globals.css` directly — NOT only in `tailwind.config.ts`. Tailwind purges keyframes if the corresponding `animate-*` class isn't found in source files. Use CSS class (e.g., `.stagger-card`) with `animation-fill-mode: both` to handle delay-period visibility.
- **Next.js inner scroll layout:** Dashboard uses `h-screen overflow-hidden` root + inner `overflow-y-auto` div for scrolling. Playwright `fullPage: true` screenshot only captures window scroll, not inner element scroll. Use JS scroll + viewport screenshots for inner containers.
- **Hydration mismatch:** `new Date()` in JSX causes SSR/client mismatch. Fix with `suppressHydrationWarning` on the containing element or use `useEffect` + state.
- **TypeScript naming:** Never name a local type the same as an imported icon (e.g., `type Settings` conflicts with `import { Settings } from 'lucide-react'`). Use `Settings as SettingsIcon` pattern.
- **Fragment keys:** Use `<Fragment key={...}>` (named import) not `<>...</>` when a key prop is needed in a list map.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
