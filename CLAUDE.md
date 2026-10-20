# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

Single-page static site (Astro 7 + Tailwind v4 via `@tailwindcss/vite`) for "Team Henry", a 365-day push-up challenge. UI copy is in Spanish; code identifiers are Spanish too. Built mobile-first for vertical (9:16) screen recording.

Requires Node >= 22.22.0. Not a git repository.

## Architecture

- `src/config.ts` holds every editable value (dates, milestone, links, `urlSitio` for absolute OG URLs).
- `src/lib/reto.ts` `calcularEstado()` is the single source of challenge logic (current day in `America/Guayaquil`, milestone texts, year-end countdown). It runs twice: at build time in `src/pages/index.astro` (initial HTML + OG title) and every second in the browser via the `<script>` in that page, so the day advances without redeploying.
- Components render build-time values and tag live nodes with `data-r="..."`; the page script updates them. Sections that swap for the "challenge completed" state use `data-vista="activo" | "completado"` + `hidden`.
- Theme tokens (`oro`, `noche`, fonts, animations) and the `sticker` / `sticker-oro` utilities live in `src/styles/global.css` (`@theme` / `@utility`). Luckiest Guy has odd lowercase glyphs: keep display-font text uppercase.
- Responsive layout lives in `src/pages/index.astro`: one column on mobile (DOM order = mobile order); at `lg` a CSS grid with named areas (`izq` hero+counter, `der`/`der2` right column, `extra` full-width story/places/videos, `pie`). Don't make the left column `sticky`: in a grid it sticks across the whole container and covers the videos.
- Photos are referenced by fixed paths in `config.ts` (`/fotos/*.jpg`); `src/lib/fotos.ts` `hayFoto()` checks the file exists in `public/` at build time. Dashed `Pendiente` placeholders render only in `npm run dev` (`import.meta.env.DEV`); in production, sections without data (historia text, `flexionesPorDia`) are omitted and places without photo fall back to a flag card (`Bandera.astro`, SVG because flag emojis don't render on Windows).
- `Videos.astro` carousel is driven by `config.videos`; section hidden when empty. Arrows (desktop) and dots appear only when cards overflow.
- Animations use `motion-safe:` so `prefers-reduced-motion` disables them.
- Scroll/3D effects: `src/scripts/efectos.ts` + the "Efectos" block in `global.css`. Attributes: `data-revelar` (`""`, `sello`, `lanzar`, `voltear`; stagger with `--retraso`), `data-tilt` (mouse 3D tilt + glare, fine pointers only), `data-paralaje` (scroll-driven `animation-timeline: view()`, depth via `--p`). They're layered on purpose: reveal uses the individual `translate`/`scale`/`rotate` properties, tilt and parallax use `transform`, so put tilt on the inner element and reveal/parallax on a wrapper. Hidden state only applies under `html.js-efectos`, so without JS everything stays visible.
- `public/og.jpg` (1200×630, keep < 300 KB for WhatsApp), `favicon.*`, `apple-touch-icon.png` were rendered with headless Chrome; regenerate the same way if branding changes.
- SEO: `astro.config.mjs` sets `site` from Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (override with `config.urlSitio`); without it OG image URLs are relative and WhatsApp shows no image. `<title>`/OG title and description are evergreen on purpose (previews get cached); the browser tab title shows the live day via the page script. `robots.txt` and `sitemap.xml` are endpoints in `src/pages/`.

## Commands

- `npm run dev` — dev server at `localhost:4321` (agents: use `astro dev --background` per AGENTS.md)
- `npm run build` — production build to `./dist/`
- `npm run preview` — serve the built `./dist/`
- `npm run astro -- add <integration>` — add integrations (e.g. `react`, `tailwind`, `mdx`, `sitemap`)

No lint, formatter, or test setup is configured. Type checking via `npx astro check` requires installing `@astrojs/check` and `typescript` first.

To preview other challenge states, temporarily change `fechaInicio` in `src/config.ts` and rebuild.
