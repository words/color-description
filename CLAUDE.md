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

**Descriptive words come in priority order.** The character-word section at the top of `en.js` (dark, deep, dusty, pale, pastel, light, muted, soft, medium, rich, vivid, bright, ...) is ordered so that the first entry that matches gives the first adjective and later matches only add secondary words; `descriptiveWords[0]` is meant to be the one word that best describes the shade. Vividness words use `okhsl.s` (chroma relative to what sRGB can show at that lightness and hue, exposed as `formats.okhsl`) because the same absolute chroma looks vivid in cyan and dull in yellow; greyishness words (dusty, pale) use absolute OKLCH chroma. Yellows and golds have their own entries because a darkened yellow reads as mustard, not as vivid. Entries can combine several color models in `criteria` (`oklch` plus `okhsl`).

**Hue nouns are fitted to the survey, not hand-drawn.** `tools/survey-labels.json` holds, for every cell of an OKLCH grid over sRGB, the most common names among the 60 nearest responses of the Kim et al. 2019 English survey. Each noun entry in `en.js` covers the region where its name wins or comes second in that vote, so yellow only exists light, olive is a small mid-toned region, brown owns most dark warm colors, cyan and magenta are only the vivid core of their hues, and low-chroma colors are grey or black first. Primary entries come before secondary ones in the file because nouns are returned in file order. A name can be split over several entries with the same words and different criteria. Regenerate the labels with `tools/survey-fit.mjs` then `tools/survey-finemap.mjs` (see their headers for the data file).

**A second reference, `tools/eye-labels.json`,** holds names given to every testbench swatch by eye: each color was rendered alone on neutral grey, in shuffled order with no label, and named before the hex was revealed. Where the survey vote and the eye disagree (dusky pinks the survey calls brown, light aquas it calls blue), the eye won. Keep both references when moving a boundary: the survey for what people say, the eye for what the color looks like.

## Testing

Tests live in `tests/`. Jest with babel-jest transform, node environment. Tests must build first (the test script does this automatically). Key test areas: color parsing, temperature words, descriptive word generation, percentage calculations, WCAG contrast, and hue naming coverage (no deadzones).

**Visual testbench:** `npm run build && node tools/testbench.mjs` samples the sRGB gamut on an OKLCH grid, scores the nouns against the survey vote in `tools/survey-labels.json`, and writes `tools/testbench.html` (ignored by git). Click a swatch to see it full screen. `--baseline a.json` marks changed cells, `--json out.json` dumps cell data, `--hues 80,100` renders a subset. Agreement should stay near 98%; the cells that disagree are ones where the survey vote itself is split. Judge the swatches by eye before moving a boundary.

## Key Dependency

**culori** — handles all color parsing and conversion. Colors can be passed in any format culori supports (hex, rgb(), hsl(), named colors, etc.).
