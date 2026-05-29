# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A JavaScript library (`color-description`) that converts any CSS-compatible color into human-readable descriptive words, meanings, and usage suggestions. It uses criteria-based matching in OKLCH color space (plus a relative-saturation axis) against a curated English word dataset (`src/en.js`).

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

- `criteria.oklch` — ranges for `h`, `c`, `l` (null = wildcard). A color matches if all non-null components fall within their ranges. Entries may also constrain `relC` (relative chroma, see below) on the `oklch` model for the muted-vs-vivid axis. Some entries constrain other models (`hsl`, `rgb`, `cmyk`) the same way.
- `descriptive`, `meanings`, `usage`, `nouns`, `description` — word arrays returned when criteria match.

**Relative saturation (`relC`):** absolute OKLCH chroma is not perceptually uniform — the maximum displayable chroma (`Cmax`) varies a lot by hue and lightness. So `src/index.js` computes `relC = C / Cmax(hue, L)` (0..1), where `Cmax` is found with culori's `clampChroma` (the sRGB gamut boundary for that hue+L). `relC` is attached to `this.formats.oklch.relC` and the muted/pale/tinted/deep entries in `en.js` bucket on it. This stops vivid light colors from being called "pale/faded" and stops different-chroma colors (e.g. clear teal vs dull brown) from collapsing to the same muted words.

**Conflict resolution:** `#getWords` runs a `#resolveConflicts` step on the `descriptive` scope. Contradictory saturation groups (pale/faded/bleached vs muted/dusty/matte vs saturated/vivid/...) cannot all appear — only the group matching the color's `relC` bucket is kept.

**`src/utils.js`** — Utility functions: `rgb2temperature` (CCT algorithm, binary search 1000-40000K), `temperature2rgb`, `rgbToCMYK`, `isInRange`, `randomizeArr` (Fisher-Yates shuffle).

**Matching flow:** Color input → culori parses to RGB/HSL/OKLCH (+ derived `relC`) → each entry in `en.js` checked via `isInRange` on the relevant model's components → matching entries' words collected → saturation conflicts resolved → formatted via `getDescriptiveList(random?, limit?)`.

## Testing

Tests live in `tests/`. Jest with babel-jest transform, node environment. Tests must build first (the test script does this automatically). Key test areas: color parsing, temperature words, descriptive word generation, percentage calculations, WCAG contrast, and hue naming coverage (no deadzones).

## Key Dependency

**culori** — handles all color parsing and conversion. Colors can be passed in any format culori supports (hex, rgb(), hsl(), named colors, etc.).
