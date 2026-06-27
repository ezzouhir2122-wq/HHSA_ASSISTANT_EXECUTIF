# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-27T17:54:43.028Z
> Files: 479 tracked | Anatomy hits: 0 | Misses: 0

## agent-ui/

- `package.json` — Next.js 15 + Tailwind 3 + Recharts + Framer Motion (~66 tok)
- `app/globals.css` — Design tokens, glass/grid/terminal CSS, custom keyframes (~150 tok)
- `app/layout.tsx` — Root layout: Syne + Outfit + JetBrains Mono fonts (~60 tok)
- `app/page.tsx` — Main dashboard: orchestrates all 12 components (~80 tok)
- `lib/types.ts` — Shared TypeScript types (AgentStatus, LogEntry, Tool, etc.) (~60 tok)
- `lib/utils.ts` — cn(), formatNumber(), formatCurrency() helpers (~40 tok)
- `components/Sidebar.tsx` — Collapsible sidebar + 6-agent selector dropdown + nav (~180 tok)
- `components/Header.tsx` — Sticky header + CPU/MEM/API metrics + notifications (~120 tok)
- `components/StatsCards.tsx` — 6 animated stat cards with sparklines + animated counters (~200 tok)
- `components/MissionCard.tsx` — Live mission with animated progress bar + task list (~130 tok)
- `components/QuickActions.tsx` — 6 agent control buttons + confirm dialogs + toasts (~160 tok)
- `components/LiveLogs.tsx` — Auto-scrolling terminal with real-time simulated logs (~150 tok)
- `components/WorkflowView.tsx` — Animated 7-step pipeline diagram with step cycling (~130 tok)
- `components/MemoryPanel.tsx` — Tabbed memory viewer: short/long/context/goals/priorities (~140 tok)
- `components/ToolsGrid.tsx` — Filterable grid of 10 tools (Google/AI/Automation) + status (~160 tok)
- `components/PerformanceCharts.tsx` — 6 recharts (Area/Line/Bar) analytics charts (~200 tok)
- `components/HistoryTable.tsx` — Sortable/paginated history table with expandable rows (~180 tok)
- `components/SettingsPanel.tsx` — Tabbed settings: agent/perf/budget with sliders + toggles (~160 tok)
- `components/Footer.tsx` — Minimal footer with version + model info (~20 tok)

## ./

- `.gitignore` — Git ignore rules (~74 tok)
- `.mcp.json` (~70 tok)
- `CLAUDE.local.md` — Local Overrides (~33 tok)
- `CLAUDE.md` — OpenWolf (~2716 tok)
- `package-lock.json` — npm lock file (~28597 tok)
- `package.json` — Node.js package manifest (~66 tok)
- `skills-lock.json` (~228 tok)
- `trigger.config.ts` (~175 tok)

## .agents/skills/copywriting/

- `SKILL.md` — Copywriting (~1940 tok)

## .agents/skills/copywriting/evals/

- `evals.json` (~2361 tok)

## .agents/skills/copywriting/references/

- `copy-frameworks.md` — Copy Frameworks Reference (~2057 tok)
- `natural-transitions.md` — Natural Transitions (~1489 tok)

## .agents/skills/frontend-design/

- `LICENSE.txt` (~2588 tok)
- `SKILL.md` — Design Thinking (~1121 tok)

## .claude/

- `settings.json` (~441 tok)
- `settings.local.json` (~232 tok)

## .claude/agents/

- `code-reviewer.md` — SÉQUENCE (~368 tok)
- `sous-agent-code-review.md` — SÉQUENCE (~411 tok)
- `sous-agent-delivery-monitor.md` — SÉQUENCE (~546 tok)
- `sous-agent-recherche.md` — SÉQUENCE (~411 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)
- `permissions.md` — Standing Restrictions (~242 tok)
- `voice.md` — Voice and Communication Rules (~198 tok)

## .claude/skills/

- `.gitkeep` (~0 tok)

## .claude/skills/client-communication/

- `SKILL.md` — Inputs Requis (~614 tok)

## .claude/skills/contenu-social/

- `SKILL.md` — Inputs (~802 tok)

## .claude/skills/devis-et-factures/

- `SKILL.md` — Inputs Requis (~737 tok)

## .claude/skills/faq-clients/

- `SKILL.md` — Déclencheurs (~965 tok)

## .claude/skills/lead-update-followup/

- `SKILL.md` — Inputs Requis (~830 tok)

## .claude/skills/onboarding-client/

- `SKILL.md` — Inputs Requis (~809 tok)

## .claude/skills/proposal-generation/

- `SKILL.md` — Inputs Requis (~1026 tok)

## .claude/skills/recap-pipeline/

- `SKILL.md` — Séquence (~731 tok)

## .claude/skills/recherche-tendances/

- `SKILL.md` — Inputs (~579 tok)

## .claude/skills/research-agentic-trends/

- `SKILL.md` — Skill — Research Agentic AI Trends (~2055 tok)

## .claude/skills/social-content/

- `SKILL.md` — Social Content (~3765 tok)

## .pytest_cache/

- `.gitignore` — Git ignore rules (~11 tok)
- `CACHEDIR.TAG` (~51 tok)
- `README.md` — Project documentation (~78 tok)

## .pytest_cache/v/cache/

- `lastfailed` (~1 tok)
- `nodeids` (~205 tok)

## .superpowers/brainstorm/1131-1778708423/content/

- `architecture.html` (~1081 tok)

## .superpowers/brainstorm/1131-1778708423/state/

- `server-info` (~87 tok)
- `server.pid` (~2 tok)

## .superpowers/brainstorm/288-1778708400/state/

- `server.pid` (~2 tok)

## .tmp/

- `.gitkeep` (~0 tok)

## .trigger/

- `active-runs.json` (~12 tok)
- `watchdog.pid` (~6 tok)

## .trigger/tmp/build-oHiOpW/

- `build.json` (~6648 tok)
- `chunk-5GOA6A2P.mjs` — Zustand store (~154986 tok)
- `chunk-5GOA6A2P.mjs.map` — DelayedStream: CombinedStream (~268731 tok)
- `chunk-5MSIOWHE.mjs` (~132 tok)
- `chunk-5MSIOWHE.mjs.map` — Exports DubaiHRLead (~315 tok)
- `chunk-AYJ3ZINT.mjs` — noop: typeIsObject, setFunctionName, newPromise + 25 more (~62273 tok)
- `chunk-AYJ3ZINT.mjs.map` — \n * Simple queue structure.\n *\n * Avoids scalability issues with using a packed array directly by using\n * multiple arrays in a linked list and... (~99478 tok)
- `chunk-CE7CZK5H.mjs` — assert: timingSafeEqual, __, Coder2 + 6 more (~84687 tok)
- `chunk-DCNPT4TM.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~5204 tok)
- `chunk-DCNPT4TM.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~9397 tok)
- `chunk-KOZ2UYCS.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~59806 tok)
- `chunk-KOZ2UYCS.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~79675 tok)
- `chunk-KRC5CGEQ.mjs` (~164 tok)
- `chunk-KRC5CGEQ.mjs.map` — Declares subtle (~211 tok)
- `chunk-LSWTVIUN.mjs` — Declares scoreLead (~487 tok)
- `chunk-LSWTVIUN.mjs.map` — Exports scoreLead (~912 tok)
- `chunk-NGXJSXMK.mjs` — Zustand store (~155077 tok)
- `chunk-NGXJSXMK.mjs.map` — DelayedStream: CombinedStream (~268919 tok)
- `chunk-NLO6ZACH.mjs` (~218 tok)
- `chunk-NLO6ZACH.mjs.map` — Exports execAsync (~302 tok)
- `chunk-Q7GSMU4M.mjs` — assert: timingSafeEqual, __, Coder2 + 6 more (~84690 tok)
- `chunk-QHYCNRXM.mjs` — Declares __require (~781 tok)
- `chunk-QHYCNRXM.mjs.map` — Declares __require (~1193 tok)
- `chunk-RPSFAVOQ.mjs` — __init: __require2 (~735 tok)
- `chunk-RPSFAVOQ.mjs.map` (~103 tok)
- `chunk-TH3KCX42.mjs` — concatty2: slicy2, bind, Empty2 + 4 more (~8025 tok)
- `chunk-TH3KCX42.mjs.map` — concatty: slicy, bind, Empty + 9 more (~11282 tok)
- `chunk-TWMX5QJS.mjs` — _makeCompatibilityCheck: isExactmatch, _reject, _accept + 8 more (~17673 tok)
- `chunk-TWMX5QJS.mjs.map` — only globals that common to node and browsers are allowed */\n// eslint-disable-next-line node/no-unsupported-features/es-builtins\nexport const _g... (~36231 tok)
- `crypto.node-VFJISHCZ.mjs` (~67 tok)
- `crypto.node-VFJISHCZ.mjs.map` (~25 tok)
- `crypto.node-XEMDJ4RR.mjs` (~185 tok)
- `crypto.node-XEMDJ4RR.mjs.map` — Declares subtle (~227 tok)
- `dist-WBEA6IJU.mjs` — Determine whether this is an `http` or `https` request. (~4934 tok)
- `dist-WBEA6IJU.mjs.map` (~2051 tok)
- `esm-LZLZIJRN.mjs` — concat: p2s, writeUInt32BE, uint64be + 11 more (~33390 tok)
- `esm-LZLZIJRN.mjs.map` — compactDecrypt: flattenedDecrypt (~59658 tok)
- `esm-Y47LFLJ7.mjs` — concat: p2s, writeUInt32BE, uint64be + 5 more (~36217 tok)
- `esm-Y47LFLJ7.mjs.map` (~61716 tok)
- `getMachineId-bsd-T6KP3DR7.mjs` — Declares getMachineId (~423 tok)
- `getMachineId-bsd-T6KP3DR7.mjs.map` — Declares getMachineId (~503 tok)
- `getMachineId-darwin-FE3KXNPC.mjs` — Declares getMachineId (~425 tok)
- `getMachineId-darwin-FE3KXNPC.mjs.map` — Declares getMachineId (~519 tok)
- `getMachineId-linux-3BRLNZFY.mjs` — Declares getMachineId (~368 tok)
- `getMachineId-linux-3BRLNZFY.mjs.map` — Declares getMachineId (~448 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs` — Declares getMachineId (~295 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs.map` — Declares getMachineId (~326 tok)
- `getMachineId-win-3TK25NZN.mjs` — Declares getMachineId (~469 tok)
- `getMachineId-win-3TK25NZN.mjs.map` — Declares getMachineId (~565 tok)
- `index.json` (~551 tok)
- `multipart-parser-BPWM3RUN.mjs` — _fileName: toFormData (~3203 tok)
- `multipart-parser-BPWM3RUN.mjs.map` — \n\t * @param {string} boundary\n\t */\n\tconstructor(boundary) {\n\t\tthis.index = 0;\n\t\tthis.flags = 0;\n\n\t\tthis.onHeaderEnd = noop;\n\t\tth... (~4850 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs` (~91 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs.map` (~80 tok)
- `s2s-EPQEZPE6.mjs` — Add data to the parser buffer (~7111 tok)
- `s2s-EPQEZPE6.mjs.map` (~3785 tok)
- `src-BNXQRTFJ.mjs` — API routes: GET (2 endpoints) (~12848 tok)
- `src-BNXQRTFJ.mjs.map` — \n * Returns a `Buffer` instance from the given data URI `uri`.\n *\n * @param {String} uri Data URI to turn into a Buffer instance\n * @returns {B... (~25246 tok)

## .trigger/tmp/build-oHiOpW/COHORT_2026/HHSA ASSISTANT EXECUTIF/

- `trigger.config.mjs` (~241 tok)
- `trigger.config.mjs.map` — Exports resolveEnvVars (~311 tok)

## .trigger/tmp/build-oHiOpW/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/

- `dubai-hr-leads.mjs` — Declares startMs (~961 tok)
- `dubai-hr-leads.mjs.map` — Exports dubaiHRLeadGeneration (~1540 tok)
- `example.mjs` (~189 tok)
- `example.mjs.map` — Exports helloWorldTask (~236 tok)

## .trigger/tmp/build-oHiOpW/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/lib/

- `claude-synthesizer.mjs` (~75 tok)
- `claude-synthesizer.mjs.map` (~25 tok)
- `firecrawl-scraper.mjs` (~120 tok)
- `firecrawl-scraper.mjs.map` (~25 tok)
- `lead-scorer.mjs` (~47 tok)
- `lead-scorer.mjs.map` (~25 tok)
- `sheets-writer.mjs` (~87 tok)
- `sheets-writer.mjs.map` (~25 tok)
- `types.mjs` (~48 tok)
- `types.mjs.map` (~25 tok)

## .trigger/tmp/build-pbtOIa/

- `build.json` (~6694 tok)
- `chunk-5GOA6A2P.mjs` — Zustand store (~154986 tok)
- `chunk-5GOA6A2P.mjs.map` — DelayedStream: CombinedStream (~268731 tok)
- `chunk-5MSIOWHE.mjs` (~132 tok)
- `chunk-5MSIOWHE.mjs.map` — Exports DubaiHRLead (~315 tok)
- `chunk-AYJ3ZINT.mjs` — noop: typeIsObject, setFunctionName, newPromise + 25 more (~62273 tok)
- `chunk-AYJ3ZINT.mjs.map` — \n * Simple queue structure.\n *\n * Avoids scalability issues with using a packed array directly by using\n * multiple arrays in a linked list and... (~99478 tok)
- `chunk-CE7CZK5H.mjs` — assert: timingSafeEqual, __, Coder2 + 6 more (~84687 tok)
- `chunk-DCNPT4TM.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~5204 tok)
- `chunk-DCNPT4TM.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~9397 tok)
- `chunk-KOZ2UYCS.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~59806 tok)
- `chunk-KOZ2UYCS.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~79675 tok)
- `chunk-KRC5CGEQ.mjs` (~164 tok)
- `chunk-KRC5CGEQ.mjs.map` — Declares subtle (~211 tok)
- `chunk-LSWTVIUN.mjs` — Declares scoreLead (~487 tok)
- `chunk-LSWTVIUN.mjs.map` — Exports scoreLead (~912 tok)
- `chunk-NGXJSXMK.mjs` — Zustand store (~155077 tok)
- `chunk-NGXJSXMK.mjs.map` — DelayedStream: CombinedStream (~268919 tok)
- `chunk-NLO6ZACH.mjs` (~218 tok)
- `chunk-NLO6ZACH.mjs.map` — Exports execAsync (~302 tok)
- `chunk-QHYCNRXM.mjs` — Declares __require (~781 tok)
- `chunk-QHYCNRXM.mjs.map` — Declares __require (~1193 tok)
- `chunk-RPSFAVOQ.mjs` — __init: __require2 (~735 tok)
- `chunk-RPSFAVOQ.mjs.map` (~103 tok)
- `chunk-TH3KCX42.mjs` — concatty2: slicy2, bind, Empty2 + 4 more (~8025 tok)
- `chunk-TH3KCX42.mjs.map` — concatty: slicy, bind, Empty + 9 more (~11282 tok)
- `chunk-TWMX5QJS.mjs` — _makeCompatibilityCheck: isExactmatch, _reject, _accept + 8 more (~17673 tok)
- `chunk-TWMX5QJS.mjs.map` — only globals that common to node and browsers are allowed */\n// eslint-disable-next-line node/no-unsupported-features/es-builtins\nexport const _g... (~36231 tok)
- `crypto.node-VFJISHCZ.mjs` (~67 tok)
- `crypto.node-VFJISHCZ.mjs.map` (~25 tok)
- `crypto.node-XEMDJ4RR.mjs` (~185 tok)
- `crypto.node-XEMDJ4RR.mjs.map` — Declares subtle (~227 tok)
- `dist-WBEA6IJU.mjs` — Determine whether this is an `http` or `https` request. (~4934 tok)
- `dist-WBEA6IJU.mjs.map` (~2051 tok)
- `esm-LZLZIJRN.mjs` — concat: p2s, writeUInt32BE, uint64be + 11 more (~33390 tok)
- `esm-LZLZIJRN.mjs.map` — compactDecrypt: flattenedDecrypt (~59658 tok)
- `esm-Y47LFLJ7.mjs` — concat: p2s, writeUInt32BE, uint64be + 5 more (~36217 tok)
- `esm-Y47LFLJ7.mjs.map` (~61716 tok)
- `getMachineId-bsd-T6KP3DR7.mjs` — Declares getMachineId (~423 tok)
- `getMachineId-bsd-T6KP3DR7.mjs.map` — Declares getMachineId (~503 tok)
- `getMachineId-darwin-FE3KXNPC.mjs` — Declares getMachineId (~425 tok)
- `getMachineId-darwin-FE3KXNPC.mjs.map` — Declares getMachineId (~519 tok)
- `getMachineId-linux-3BRLNZFY.mjs` — Declares getMachineId (~368 tok)
- `getMachineId-linux-3BRLNZFY.mjs.map` — Declares getMachineId (~448 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs` — Declares getMachineId (~295 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs.map` — Declares getMachineId (~326 tok)
- `getMachineId-win-3TK25NZN.mjs` — Declares getMachineId (~469 tok)
- `getMachineId-win-3TK25NZN.mjs.map` — Declares getMachineId (~565 tok)
- `index.json` (~550 tok)
- `multipart-parser-BPWM3RUN.mjs` — _fileName: toFormData (~3203 tok)
- `multipart-parser-BPWM3RUN.mjs.map` — \n\t * @param {string} boundary\n\t */\n\tconstructor(boundary) {\n\t\tthis.index = 0;\n\t\tthis.flags = 0;\n\n\t\tthis.onHeaderEnd = noop;\n\t\tth... (~4850 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs` (~91 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs.map` (~80 tok)
- `s2s-EPQEZPE6.mjs` — Add data to the parser buffer (~7111 tok)
- `s2s-EPQEZPE6.mjs.map` (~3785 tok)
- `src-BNXQRTFJ.mjs` — API routes: GET (2 endpoints) (~12848 tok)
- `src-BNXQRTFJ.mjs.map` — \n * Returns a `Buffer` instance from the given data URI `uri`.\n *\n * @param {String} uri Data URI to turn into a Buffer instance\n * @returns {B... (~25246 tok)

## .trigger/tmp/build-pbtOIa/COHORT_2026/HHSA ASSISTANT EXECUTIF/

- `trigger.config.mjs` (~241 tok)
- `trigger.config.mjs.map` — Exports resolveEnvVars (~311 tok)

## .trigger/tmp/build-pbtOIa/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/

- `dubai-hr-leads.mjs` — Declares startMs (~961 tok)
- `dubai-hr-leads.mjs.map` — Exports dubaiHRLeadGeneration (~1540 tok)
- `example.mjs` (~189 tok)
- `example.mjs.map` — Exports helloWorldTask (~236 tok)

## .trigger/tmp/build-pbtOIa/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/lib/

- `claude-synthesizer.mjs` (~75 tok)
- `claude-synthesizer.mjs.map` (~25 tok)
- `firecrawl-scraper.mjs` (~120 tok)
- `firecrawl-scraper.mjs.map` (~25 tok)
- `lead-scorer.mjs` (~47 tok)
- `lead-scorer.mjs.map` (~25 tok)
- `sheets-writer.mjs` (~87 tok)
- `sheets-writer.mjs.map` (~25 tok)
- `types.mjs` (~48 tok)
- `types.mjs.map` (~25 tok)

## .trigger/tmp/build-q9cdBt/

- `build.json` (~6694 tok)
- `chunk-5GOA6A2P.mjs` — Zustand store (~154986 tok)
- `chunk-5GOA6A2P.mjs.map` — DelayedStream: CombinedStream (~268731 tok)
- `chunk-5MSIOWHE.mjs` (~132 tok)
- `chunk-5MSIOWHE.mjs.map` — Exports DubaiHRLead (~315 tok)
- `chunk-AYJ3ZINT.mjs` — noop: typeIsObject, setFunctionName, newPromise + 25 more (~62273 tok)
- `chunk-AYJ3ZINT.mjs.map` — \n * Simple queue structure.\n *\n * Avoids scalability issues with using a packed array directly by using\n * multiple arrays in a linked list and... (~99478 tok)
- `chunk-CE7CZK5H.mjs` — assert: timingSafeEqual, __, Coder2 + 6 more (~84687 tok)
- `chunk-DCNPT4TM.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~5204 tok)
- `chunk-DCNPT4TM.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~9397 tok)
- `chunk-KOZ2UYCS.mjs` — parse: fmtShort, fmtLong, plural + 12 more (~59806 tok)
- `chunk-KOZ2UYCS.mjs.map` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~79675 tok)
- `chunk-KRC5CGEQ.mjs` (~164 tok)
- `chunk-KRC5CGEQ.mjs.map` — Declares subtle (~211 tok)
- `chunk-LSWTVIUN.mjs` — Declares scoreLead (~487 tok)
- `chunk-LSWTVIUN.mjs.map` — Exports scoreLead (~912 tok)
- `chunk-NGXJSXMK.mjs` — Zustand store (~155077 tok)
- `chunk-NGXJSXMK.mjs.map` — DelayedStream: CombinedStream (~268919 tok)
- `chunk-NLO6ZACH.mjs` (~218 tok)
- `chunk-NLO6ZACH.mjs.map` — Exports execAsync (~302 tok)
- `chunk-Q7GSMU4M.mjs` — assert: timingSafeEqual, __, Coder2 + 6 more (~84690 tok)
- `chunk-QHYCNRXM.mjs` — Declares __require (~781 tok)
- `chunk-QHYCNRXM.mjs.map` — Declares __require (~1193 tok)
- `chunk-RPSFAVOQ.mjs` — __init: __require2 (~735 tok)
- `chunk-RPSFAVOQ.mjs.map` (~103 tok)
- `chunk-TH3KCX42.mjs` — concatty2: slicy2, bind, Empty2 + 4 more (~8025 tok)
- `chunk-TH3KCX42.mjs.map` — concatty: slicy, bind, Empty + 9 more (~11282 tok)
- `chunk-TWMX5QJS.mjs` — _makeCompatibilityCheck: isExactmatch, _reject, _accept + 8 more (~17673 tok)
- `chunk-TWMX5QJS.mjs.map` — only globals that common to node and browsers are allowed */\n// eslint-disable-next-line node/no-unsupported-features/es-builtins\nexport const _g... (~36231 tok)
- `crypto.node-VFJISHCZ.mjs` (~67 tok)
- `crypto.node-VFJISHCZ.mjs.map` (~25 tok)
- `crypto.node-XEMDJ4RR.mjs` (~185 tok)
- `crypto.node-XEMDJ4RR.mjs.map` — Declares subtle (~227 tok)
- `dist-WBEA6IJU.mjs` — Determine whether this is an `http` or `https` request. (~4934 tok)
- `dist-WBEA6IJU.mjs.map` (~2051 tok)
- `esm-LZLZIJRN.mjs` — concat: p2s, writeUInt32BE, uint64be + 11 more (~33390 tok)
- `esm-LZLZIJRN.mjs.map` — compactDecrypt: flattenedDecrypt (~59658 tok)
- `esm-Y47LFLJ7.mjs` — concat: p2s, writeUInt32BE, uint64be + 5 more (~36217 tok)
- `esm-Y47LFLJ7.mjs.map` (~61716 tok)
- `getMachineId-bsd-T6KP3DR7.mjs` — Declares getMachineId (~423 tok)
- `getMachineId-bsd-T6KP3DR7.mjs.map` — Declares getMachineId (~503 tok)
- `getMachineId-darwin-FE3KXNPC.mjs` — Declares getMachineId (~425 tok)
- `getMachineId-darwin-FE3KXNPC.mjs.map` — Declares getMachineId (~519 tok)
- `getMachineId-linux-3BRLNZFY.mjs` — Declares getMachineId (~368 tok)
- `getMachineId-linux-3BRLNZFY.mjs.map` — Declares getMachineId (~448 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs` — Declares getMachineId (~295 tok)
- `getMachineId-unsupported-C6K4JOPF.mjs.map` — Declares getMachineId (~326 tok)
- `getMachineId-win-3TK25NZN.mjs` — Declares getMachineId (~469 tok)
- `getMachineId-win-3TK25NZN.mjs.map` — Declares getMachineId (~565 tok)
- `index.json` (~549 tok)
- `multipart-parser-BPWM3RUN.mjs` — _fileName: toFormData (~3203 tok)
- `multipart-parser-BPWM3RUN.mjs.map` — \n\t * @param {string} boundary\n\t */\n\tconstructor(boundary) {\n\t\tthis.index = 0;\n\t\tthis.flags = 0;\n\n\t\tthis.onHeaderEnd = noop;\n\t\tth... (~4850 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs` (~91 tok)
- `package-APBHZ5F3-RD4JDGDT.mjs.map` (~80 tok)
- `s2s-EPQEZPE6.mjs` — Add data to the parser buffer (~7111 tok)
- `s2s-EPQEZPE6.mjs.map` (~3785 tok)
- `src-BNXQRTFJ.mjs` — API routes: GET (2 endpoints) (~12848 tok)
- `src-BNXQRTFJ.mjs.map` — \n * Returns a `Buffer` instance from the given data URI `uri`.\n *\n * @param {String} uri Data URI to turn into a Buffer instance\n * @returns {B... (~25246 tok)

## .trigger/tmp/build-q9cdBt/COHORT_2026/HHSA ASSISTANT EXECUTIF/

- `trigger.config.mjs` (~241 tok)
- `trigger.config.mjs.map` — Exports resolveEnvVars (~311 tok)

## .trigger/tmp/build-q9cdBt/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/

- `dubai-hr-leads.mjs` — Declares startMs (~961 tok)
- `dubai-hr-leads.mjs.map` — Exports dubaiHRLeadGeneration (~1540 tok)
- `example.mjs` (~189 tok)
- `example.mjs.map` — Exports helloWorldTask (~236 tok)

## .trigger/tmp/build-q9cdBt/COHORT_2026/HHSA ASSISTANT EXECUTIF/src/trigger/lib/

- `claude-synthesizer.mjs` (~75 tok)
- `claude-synthesizer.mjs.map` (~25 tok)
- `firecrawl-scraper.mjs` (~120 tok)
- `firecrawl-scraper.mjs.map` (~25 tok)
- `lead-scorer.mjs` (~47 tok)
- `lead-scorer.mjs.map` (~25 tok)
- `sheets-writer.mjs` (~87 tok)
- `sheets-writer.mjs.map` (~25 tok)
- `types.mjs` (~48 tok)
- `types.mjs.map` (~25 tok)

## .trigger/tmp/store/

- `-9fbHCc27VQ` — DelayedStream: CombinedStream (~154986 tok)
- `0b4tlwmkM3g` (~25 tok)
- `1UDaK9-CITU` (~47 tok)
- `1WfbhosVNL4` — Declares getMachineId (~326 tok)
- `4mXbluWg8Vo` — Declares startMs (~961 tok)
- `5HUu9TSZEm0` (~132 tok)
- `6N9J7L_lmMQ` — concatty: slicy, bind, Empty + 9 more (~11282 tok)
- `6z3gAcTN5g8` — Declares startMs (~961 tok)
- `7fAqj1LfMhE` — Declares __require (~1193 tok)
- `A4Jpb-YEO3c` — Exports dubaiHRLeadGeneration (~1540 tok)
- `AEg9vwn08Vo` (~2051 tok)
- `aEUdoPf81cA` (~157749 tok)
- `bHHowCGHfto` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~79675 tok)
- `BptBOIwEsBM` — assert: timingSafeEqual, __, Coder2 + 6 more (~84690 tok)
- `brNwnV80J7U` — parse: fmtShort, fmtLong, plural + 12 more (~5204 tok)
- `C2RTWKzFKt0` — __init: __require2 (~735 tok)
- `daPUifo6iqE` (~75 tok)
- `dFjl30ngzms` — assert: timingSafeEqual, __, Coder2 + 6 more (~84687 tok)
- `dmfGBqRrLeY` (~120 tok)
- `eNUPuHY4pvY` — \n * Simple queue structure.\n *\n * Avoids scalability issues with using a packed array directly by using\n * multiple arrays in a linked list and... (~99478 tok)
- `eU-gf8JEaxg` (~218 tok)
- `fIzINlGFlnM` — dataUriToBuffer: name, consumeBody, body, bodyUsed (~12848 tok)
- `fsh81WKCKQY` — \n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or for... (~9397 tok)
- `fvGhmsK6iV0` — Declares __require (~781 tok)
- `FvkhHT17KJA` — Declares getMachineId (~295 tok)
- `gi6tpRGcLWc` — Declares getMachineId (~423 tok)
- `IQoj-zl5ngo` — Exports resolveEnvVars (~311 tok)
- `IRM7DrdaORk` — _fileName: toFormData (~3203 tok)
- `ITIbxJ03Bos` — \n * Returns a `Buffer` instance from the given data URI `uri`.\n *\n * @param {String} uri Data URI to turn into a Buffer instance\n * @returns {B... (~25246 tok)
- `ivySlbjqlrQ` — Declares getMachineId (~565 tok)
- `jfxu6WJ6w68` — Declares subtle (~227 tok)
- `JQtnncidjrI` — concat: p2s, writeUInt32BE, uint64be + 11 more (~33390 tok)
- `jy2_CeXJ0Js` — Exports DubaiHRLead (~315 tok)
- `JYcXcHl6RZg` — Exports scoreLead (~912 tok)
- `k5llgg_evZA` — DelayedStream: CombinedStream (~268919 tok)
- `KDpnrqviIUg` (~4395 tok)
- `KZB_SqurVXw` — Declares getMachineId (~519 tok)
- `LMPzUuAiOIM` — Declares subtle (~211 tok)
- `lqkz2PPdWDg` (~3785 tok)
- `nBBr6qVmB50` — noop: typeIsObject, setFunctionName, newPromise + 25 more (~62273 tok)
- `NCq3gGaF9J0` — concat: p2s, writeUInt32BE, uint64be + 5 more (~36217 tok)
- `oaGrTJzj44A` — only globals that common to node and browsers are allowed */\n// eslint-disable-next-line node/no-unsupported-features/es-builtins\nexport const _g... (~36231 tok)
- `OO6bjWAaoVk` (~189 tok)
- `OtB8mn3i1yc` — Declares getMachineId (~503 tok)
- `oTOIsWTxC4E` (~103 tok)
- `OyKq-JTmj3s` (~91 tok)
- `pCQz8Z459ik` (~87 tok)
- `Q_CdDq98spM` (~48 tok)
- `QovFf8uiA6c` (~75 tok)
- `QpkWQyDcs5U` — Declares startMs (~961 tok)
- `QUBWHJRIyOc` — parentContext: tracer, logger, safeSend (~8477 tok)
- `qy-vrDNK1r4` (~120 tok)
- `r_bnvmovvsQ` — Declares scoreLead (~487 tok)
- `rFsCuYI8KqY` (~185 tok)
- `RMiF0KdR9Jk` — concatty2: slicy2, bind, Empty2 + 4 more (~8025 tok)
- `RoS7Lq36HmU` — Add data to the parser buffer (~7111 tok)
- `rQRinx7Ma0I` (~61716 tok)
- `RtnW-R-JPLk` (~80 tok)
- `SSXQl2bV3Gw` (~241 tok)
- `T0Bi996x_0I` — DelayedStream: CombinedStream (~155077 tok)
- `u4sbuLV626k` — Exports execAsync (~302 tok)
- `uAIJvaGUpiU` — _makeCompatibilityCheck: isExactmatch, _reject, _accept + 8 more (~17673 tok)
- `vA2X_giAclk` — Declares getMachineId (~425 tok)
- `VAHztsGwwAw` (~67 tok)
- `voFe-2lYZ5Y` — Determine whether this is an `http` or `https` request. (~4934 tok)
- `VON93E1In1A` — compactDecrypt: flattenedDecrypt (~59658 tok)
- `vpLz45w081o` (~164 tok)
- `W3csMncq7B0` — Declares getMachineId (~448 tok)
- `XkAtigdjskY` — Declares getMachineId (~368 tok)
- `XmIsonJ1Ge8` — Declares getMachineId (~469 tok)
- `YdJD2Rw70x8` — DelayedStream: CombinedStream (~268731 tok)
- `Ygse-ugrfmM` — \n\t * @param {string} boundary\n\t */\n\tconstructor(boundary) {\n\t\tthis.index = 0;\n\t\tthis.flags = 0;\n\n\t\tthis.onHeaderEnd = noop;\n\t\tth... (~4850 tok)
- `YU2_6JRIkkU` — Exports helloWorldTask (~236 tok)
- `zubJXZbd_6k` — parse: fmtShort, fmtLong, plural + 12 more (~59806 tok)

## agent-ui/

- `next.config.ts` — Declares nextConfig (~38 tok)
- `package.json` — Node.js package manifest (~182 tok)
- `postcss.config.mjs` — Declares config (~42 tok)
- `tailwind.config.ts` — /*.{js,ts,jsx,tsx,mdx}", (~1138 tok)
- `tsconfig.json` — TypeScript configuration (~164 tok)

## agent-ui/app/

- `globals.css` — Styles: 30 rules, 3 vars (~1263 tok)
- `layout.tsx` — syne (~286 tok)
- `page.tsx` — HomePage (~1180 tok)

## agent-ui/components/

- `Footer.tsx` — Footer (~203 tok)
- `Header.tsx` — STATUS_CONFIG (~1480 tok)
- `HistoryTable.tsx` — HISTORY — renders table (~2689 tok)
- `LiveLogs.tsx` — LEVEL_STYLES (~1986 tok)
- `MemoryPanel.tsx` — TABS (~1822 tok)
- `MissionCard.tsx` — MISSION (~1282 tok)
- `PerformanceCharts.tsx` — tasksData (~2712 tok)
- `QuickActions.tsx` — ACTIONS (~2095 tok)
- `SettingsPanel.tsx` — DEFAULTS (~3180 tok)
- `Sidebar.tsx` — AGENTS (~2311 tok)
- `StatsCards.tsx` — STATS (~1646 tok)
- `ToolsGrid.tsx` — TOOLS (~1894 tok)
- `WorkflowView.tsx` — STEPS (~1562 tok)

## agent-ui/lib/

- `types.ts` — Exports AgentStatus, AgentConfig, LogLevel, LogEntry + 5 more (~281 tok)
- `utils.ts` — Exports cn, formatNumber, formatCurrency, formatTime, randomBetween (~255 tok)

## archive/

- `.gitkeep` (~0 tok)
- `generate_week_plan.py` — s, build_day_block, build_waiting_block, generate (~2565 tok)
- `onboarding-progress.json` (~970 tok)
- `pdf_b64.txt` (~2012 tok)
- `TASKS-semaine-4-9-mai-2026.md` — Tasks — Semaine du 4 au 9 mai 2026 (~780 tok)

## blueprints/

- `.gitkeep` (~0 tok)
- `client-communication.md` — Blueprint — Client Communication Handler (~759 tok)
- `contenu-social.md` — Blueprint — Création de Contenu Social (~1060 tok)
- `devis-et-factures.md` — Blueprint — Génération de Devis et Factures (~880 tok)
- `faq-clients.md` — Blueprint — Réponses FAQ Clients (~1035 tok)
- `lead-update-followup.md` — Blueprint — Lead Update + Email de Suivi (~1028 tok)
- `onboarding-client.md` — Blueprint — Onboarding Client (~833 tok)
- `pipeline-summary-lundi.md` — Blueprint — Pipeline Summary du Lundi Matin (~926 tok)
- `proposal-generation.md` — Blueprint — Génération de Document de Proposition (~1194 tok)
- `recherche-tendances.md` — Blueprint — Recherche et Analyse de Tendances (~804 tok)

## clients/

- `README.md` — Project documentation (~142 tok)

## clients/_template/contrats/

- `.gitkeep` (~0 tok)

## clients/_template/devis/

- `.gitkeep` (~0 tok)

## clients/_template/factures/

- `.gitkeep` (~0 tok)

## clients/_template/livrables/

- `.gitkeep` (~0 tok)

## clients/_template/propositions/

- `.gitkeep` (~0 tok)

## clients/riyadh-finpath/contrats/

- `.gitkeep` (~0 tok)

## clients/riyadh-finpath/devis/

- `.gitkeep` (~0 tok)

## clients/riyadh-finpath/livrables/

- `.gitkeep` (~0 tok)

## clients/riyadh-finpath/propositions/

- `.gitkeep` (~0 tok)

## decisions/

- `ledger.md` — Decision Ledger (~875 tok)

## docs/superpowers/plans/

- `2026-05-15-blueprints-tendances-social.md` — Blueprints Recherche Tendances + Contenu Social — Implementation Plan (~1770 tok)
- `2026-05-19-branding-pdf.md` — Branding System — PDF Documents Implementation Plan (~4133 tok)
- `2026-05-20-partie3.md` — PARTIE 3 — Branding, PAID Watermark, Social Standalone, Routines (~6375 tok)

## docs/superpowers/specs/

- `2026-05-15-blueprints-tendances-social-design.md` — Design Spec — Blueprints Recherche Tendances + Contenu Social (~1422 tok)
- `2026-05-19-branding-pdf-design.md` — Branding System — PDF Documents (~1049 tok)
- `2026-05-20-partie3-design.md` — Spec — PARTIE 3 : Nouvelles capacités EA (~1702 tok)

## equipment/

- `.gitkeep` (~0 tok)
- `brand.py` — brand.py — HHSA Agency centralized branding. Imported by all PDF scripts. (~676 tok)
- `generate_pdf_devis.py` — DevisPDF: ensure_fpdf, parse_markdown_table, generate_devis, extract_field + 2 more (~1892 tok)
- `generate_pdf_facture.py` — FacturePDF: ensure_fpdf, extract_field, generate_facture, header + 1 more (~1739 tok)
- `generate_pdf_report.py` — ReportPDF: ensure_fpdf, safe, generate_report, header + 1 more (~2276 tok)
- `generate_pdf_social.py` — SocialPDF: ensure_fpdf, generate_social_pdf, header, footer (~1578 tok)

## equipment/pdf/

- `README.md` — Project documentation (~55 tok)

## intel/

- `crew.md` — Crew (~102 tok)
- `focus.md` — Focus — Q2 2026 (~355 tok)
- `founder.md` — Founder (~66 tok)
- `stack.md` — Stack (~307 tok)
- `wins.md` — Goals and Milestones (~178 tok)

## live/

- `state.md` — Session State (~1023 tok)
- `tasks.md` — Task Tracker (~379 tok)

## live/consultant-rh/

- `README.md` — Project documentation (~71 tok)

## live/documents/

- `README.md` — Project documentation (~145 tok)

## live/documents/factures/

- `AAA-INV-2026-001.md` — EMETTEUR (~248 tok)
- `AAA-INV-2026-002.md` — EMETTEUR (~248 tok)
- `AAA-INV-2026-003.md` — EMETTEUR (~246 tok)
- `AAA-INV-2026-004.md` — EMETTEUR (~241 tok)
- `AAA-INV-2026-005.md` — EMETTEUR (~246 tok)
- `AAA-INV-2026-006.md` — EMETTEUR (~246 tok)
- `AAA-INV-2026-007.md` — EMETTEUR (~247 tok)
- `AAA-INV-2026-008.md` — EMETTEUR (~245 tok)
- `AAA-INV-2026-009.md` — EMETTEUR (~250 tok)
- `AAA-INV-2026-010.md` — EMETTEUR (~250 tok)
- `AAA-INV-2026-011.md` — EMETTEUR (~251 tok)
- `AAA-INV-2026-012.md` — EMETTEUR (~249 tok)
- `AAA-INV-2026-013.md` — EMETTEUR (~249 tok)
- `AAA-INV-2026-014.md` — EMETTEUR (~249 tok)
- `AAA-INV-2026-015.md` — EMETTEUR (~249 tok)
- `FAC-20260520-001.md` — Facture (~292 tok)
- `FAC-20260525-001.md` — EMETTEUR (~228 tok)

## live/lancement-agence/

- `README.md` — Project documentation (~69 tok)

## live/landing-page/

- `index.html` — HHSA Agency — Workflows Agentiques pour PME | Audit Gratuit (~7704 tok)

## live/leads/

- `.gitkeep` (~0 tok)
- `leads-20260525.json` (~1776 tok)
- `report-20260525.md` — Lead Gen Report — 25 Mai 2026 (~1047 tok)

## live/reports/

- `.gitkeep` (~0 tok)
- `kpi-20260521.md` — BILAN CASH — 21 mai 2026 (~706 tok)
- `kpi-20260522.md` — BILAN CASH — 22 mai 2026 (~598 tok)
- `kpi-20260523.md` — BILAN CASH — 23 mai 2026 (~589 tok)
- `kpi-20260524.md` — BILAN CASH — 24 mai 2026 (~870 tok)
- `kpi-20260525.md` — BILAN CASH — 25 mai 2026 (~414 tok)
- `kpi-20260526.md` — BILAN CASH — 26 Mai 2026 (~715 tok)
- `kpi-20260527.md` — BILAN CASH — 27 mai 2026 (~482 tok)
- `kpi-20260528.md` — BILAN CASH — 28 mai 2026 (~951 tok)
- `kpi-20260529.md` — BILAN CASH — 29 mai 2026 (~404 tok)
- `kpi-20260530.md` — BILAN CASH — 30 mai 2026 (~710 tok)

## live/research/

- `.gitkeep` (~0 tok)
- `findings-20260509.json` (~2542 tok)
- `findings-20260515.json` (~1902 tok)
- `posts-20260515.json` (~741 tok)
- `posts-20260521.json` (~697 tok)
- `posts-20260522.json` (~744 tok)

## live/reviews/

- `review-20260509.md` — Revue de code — 09 Mai 2026 (~994 tok)

## references/

- `three-engine-model.md` — The Three Engine Model — Full Reference (~532 tok)

## references/goldstandard/

- `.gitkeep` (~0 tok)
- `client-email-example.md` — Gold Standard — Client Email (~287 tok)

## references/playbooks/

- `.gitkeep` (~0 tok)

## routines/

- `bilan-semaine.md` — Routine : Bilan Semaine (~166 tok)
- `pipeline-recap.md` — Routine : Pipeline Recap (~144 tok)
- `veille-contenu.md` — Routine : Veille + Contenu Social (~129 tok)

## src/trigger/

- `dubai-hr-leads.ts` — Exports dubaiHRLeadGeneration (~969 tok)
- `example.ts` — Exports helloWorldTask (~131 tok)

## src/trigger/lib/

- `claude-synthesizer.ts` — Exports synthesizeLeads (~1283 tok)
- `firecrawl-scraper.ts` — Exports scrapeLeads (~790 tok)
- `lead-scorer.ts` — Exports scoreLead (~525 tok)
- `sheets-writer.ts` — Exports writeLeadsToSheets (~573 tok)
- `types.ts` — Exports DubaiHRLead, RawScrapedResult, SEARCH_QUERIES (~261 tok)

## templates/

- `closeout.md` — Session Closeout (~58 tok)
- `email-followup.md` — Template — Email Follow-up (Relance sans réponse) (~153 tok)
- `email-outbound.md` — Template — Email Outbound (Nouveau message client) (~186 tok)
- `email-reply.md` — Template — Email Reply (Réponse à un email entrant) (~161 tok)
- `README.md` — Project documentation (~78 tok)
- `session-brief.md` — Session Brief (~49 tok)

## templates/contrats/

- `contrat-template.md` — Template — Contrat de Prestation (~358 tok)

## templates/devis/

- `devis-template.md` — Template — Devis (~275 tok)

## templates/factures/

- `facture-template.md` — Template — Facture (~292 tok)

## templates/propositions/

- `proposition-template.md` — Template — Proposition Commerciale (~341 tok)

## tests/

- `test_brand.py` — Tests: brand_has_required_keys, brand_colors_are_rgb_tuples, brand_gold_is_correct, brand_dark_is_correct + 4 more (~336 tok)
- `test_pdf_integration.py` — Tests: generate_facture_standard, generate_facture_paid, cli_paid_flag, generate_devis_standard + 1 more (~651 tok)
