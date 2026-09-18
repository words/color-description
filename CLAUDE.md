# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A JavaScript library (`color-description`) that converts any CSS-compatible color into human-readable descriptive words, meanings, and usage suggestions. It uses criteria-based matching in HSL color space against a curated English word dataset (`src/en.js`).

## Build & Development

```bash
npm run build          # Build all formats (ESM, CommonJS, IIFE) with prettier
npm test               # Build + run Jest tests (requires --experimental-vm-modules for ESM)
npm run dev            # Watch mode + live-server for dist/index.html demo
```

Build tool is esbuild, configured inline in package.json scripts. Three output formats:

- `dist/index.esm.js` (ESM, `module` field)
- `dist/index.js` (CommonJS/Node, `main` field)
- `dist/index.iife.js` (Browser IIFE, global `ColorDescription`)

## Architecture

**`src/index.js`** — `ColorDescription` class. Constructor takes any culori-compatible color string + optional word dictionary. Getters (`descriptiveWords`, `nouns`, `meanings`, `usage`, `temperatureWords`, `bestContrast`, etc.) lazily compute results by matching the parsed color against criteria in the word data.

**`src/en.js`** — English language dataset. Array of objects, each with:

- `criteria.oklch` — ranges for `l`, `c`, `h` (null = wildcard). A color matches if all non-null components fall within their ranges.
- `descriptive`, `meanings`, `usage`, `nouns`, `description` — word arrays returned when criteria match.

**`src/utils.js`** — Utility functions: `rgb2temperature` (CCT algorithm, binary search 1000-40000K), `temperature2rgb`, `rgbToCMYK`, `isInRange`, `randomizeArr` (Fisher-Yates shuffle).

**Matching flow:** Color input → culori parses to RGB/HSL/OKLCH → each entry in `en.js` checked via `isInRange` on its criteria components → matching entries' words collected → formatted via `getDescriptiveList(random?, limit?)`. Hue ranges are half-open (`[min, max)`) and the hue is rounded modulo 360; lightness and chroma ranges are inclusive so entries can overlap on purpose (e.g. "olive green"). Near-black colors (OKLCH l < 0.22 and c < 0.04) skip every entry with a hue criterion and get the "black" noun instead.

**Hue nouns** need lightness/chroma floors, not just a hue range: yellow, lime, cyan, indigo, magenta and pink are only real at certain lightness or chroma, and the darker/muted region of each hue belongs to olive, brown, beige, teal, navy, maroon or purple. A name can be split over several entries with the same words and different criteria.

## Testing

Tests live in `tests/`. Jest with babel-jest transform, node environment. Tests must build first (the test script does this automatically). Key test areas: color parsing, temperature words, descriptive word generation, percentage calculations, WCAG contrast, and hue naming coverage (no deadzones).

**Visual testbench:** `npm run build && node tools/testbench.mjs` samples the sRGB gamut on an OKLCH grid, scores hue nouns against the survey centroids, and writes `tools/testbench.html` (ignored by git). Click a swatch to see it full screen. `--baseline a.json` marks changed cells, `--json out.json` dumps cell data, `--hues 80,100` renders a subset. The survey score is a guide only; judge the swatches by eye before changing a boundary.

## Key Dependency

**culori** — handles all color parsing and conversion. Colors can be passed in any format culori supports (hex, rgb(), hsl(), named colors, etc.).
