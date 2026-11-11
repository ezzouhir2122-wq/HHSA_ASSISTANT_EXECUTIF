# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-11-11

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** HHSA ASSISTANT EXECUTIF
- **CSS Animation + Tailwind:** When using custom keyframe animations, define `@keyframes` in `globals.css` directly — NOT only in `tailwind.config.ts`. Tailwind purges keyframes if the corresponding `animate-*` class isn't found in source files. Use CSS class (e.g., `.stagger-card`) with `animation-fill-mode: both` to handle delay-period visibility.
- **Next.js inner scroll layout:** Dashboard uses `h-screen overflow-hidden` root + inner `overflow-y-auto` div for scrolling. Playwright `fullPage: true` screenshot only captures window scroll, not inner element scroll. Use JS scroll + viewport screenshots for inner containers.
- **Hydration mismatch:** `new Date()` in JSX causes SSR/client mismatch. Fix with `suppressHydrationWarning` on the containing element or use `useEffect` + state.
- **TypeScript naming:** Never name a local type the same as an imported icon (e.g., `type Settings` conflicts with `import { Settings } from 'lucide-react'`). Use `Settings as SettingsIcon` pattern.
- **Fragment keys:** Use `<Fragment key={...}>` (named import) not `<>...</>` when a key prop is needed in a list map.
- **Mods Claude Code (`mods/`):** un mod = `.claude-plugin/plugin.json` + `hooks/hooks.json` (`modules`) + `hooks/register.ts(x)` ; `types/index.d.ts` si `$.state`. Vérifier avec `claude plugin validate ./mods/<mod>` et `claude plugin test ./mods/<mod>`. Listés dans `.claude-plugin/marketplace.json` à la racine. API en accès anticipé (écrits pour 2.1.322).
- **Mods — règles du scan:** une fonction qui reçoit `$` doit être une déclaration au niveau du fichier (pas une closure dans `register`). `atom({ plugin, key })` exige des littéraux, pas une constante. `$.command.register({ name })` avec un littéral, sinon le hook `command.run` est lu comme un garde.
- **Mods — tests:** `$.fs.*` reçoit des chemins absolus résolus depuis le cwd ; `mock.clock(on)` / `mock.store(on)` sont requis dès que le mod appelle `$.clock` / `$.store` ; `$.command.run` attend `origin` et `presentation` ; un hook de test `prompt.fill` répond `{ isFilled, text, cursor }`.
- **Regex FR:** `\b` ignore les lettres accentuées en JS (« évalue », « étiquette »). Utiliser `(?<![\p{L}])…(?![\p{L}])` avec le flag `u`.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
- [2026-11-11] Mods Claude Code versionnés dans `mods/` (un dossier par mod) plutôt que dans equipment/ : ce sont des plugins du harness, pas des scripts de workflow. `easy-task-router` livré en mode aperçu par défaut : aucun changement de modèle sans activation explicite.
