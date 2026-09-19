# 📜 color-description

Color-Description is a class that turns a technical color representation into a human readable description.

## Installation

`npm install color-description`

## Usage

```js
import ColorDescription from "color-description/dist/index.esm";

const cd = new ColorDescription("#0a4a7a");

cd.nouns;
// ["blue", "navy"]

cd.descriptiveWords;
// ["deep", "rich", "dark", "dim", "somber", "matte", "dusty", "ashy",
//  "unsaturated", "cold", "cool", "blue", "blueish", "navy"]

cd.getDescriptiveList(false, 2);
// "deep and rich"

cd.color = "#e0b830";

cd.nouns;
// ["yellow", "gold"]

cd.getDescriptiveList(false, 3);
// "rich, golden and warm"

cd.meanings;
// ["enthusiasm", "opportunity", ...]

cd.effects;
// ["stimulate", "relax", ...]

cd.usage;
// ["sale", "cheap", "budget", ...]
```

**The order of the words matters.** Both `nouns` and `descriptiveWords` are sorted from the best fit to the loosest one:

- `nouns[0]` is the name most people would give the color. `#0a4a7a` is "blue" first and "navy" second; a colour can also be "grey" first and "blue" second when the tint is faint.
- `descriptiveWords[0]` is the single adjective that best describes the shade: `deep` for a dark saturated blue, `cool` for a faintly tinted grey, `rich` for a gold, `bright` for a turquoise at the gamut edge. The words after it are secondary: still true, but less specific.

So `descriptiveWords[0] + " " + nouns.join(" ")` gives a short, sensible name ("deep blue navy", "cool grey blue", "rich yellow gold"), and `getDescriptiveList(false, n)` gives the n most fitting adjectives as a sentence fragment. Ask for `getDescriptiveList(true)` only when you want a random order.

## Color Meaning & Translation

The default dataset is written in English, and its meanings, effects, and usage labels are subjective and written from a western perspective:
[English dataset](https://github.com/words/color-description/blob/21ffa6b522f1751b471907aac4173acdc5c92fae/src/en.js)

Interpretation model used by the dataset:

- `meanings` are symbolic associations
- `effects` are perceptual or behavioral effects
- `usage` is contextual fit such as industries, themes, and applications

## API

### `new ColorDescription(color, words?)`

- `color` (string | object): any color culori can parse (hex, `rgb()`, `hsl()`, `oklch()`, named colors, ...)
- `words` (object, optional): a word dataset in the shape of `src/en.js`; defaults to the English one

### Properties

- `color`: get or set the current color
- `nouns`: color names, best fit first (`["blue", "navy"]`)
- `descriptiveWords`: adjectives, best fit first (`["deep", "rich", "dark", ...]`)
- `description`: a short paragraph about the color family
- `meanings`: symbolic or emotional associations
- `effects`: typical effects or signals the color can create
- `usage`: contexts, industries, themes, or applications where the color fits
- `temperatureWords`: the closest correlated color temperature, `{ value: 1800, descriptive: ["ultra warm"] }`
- `bestContrast`: `"black"` or `"white"`, whichever has the higher WCAG contrast on this color
- `formats`: the parsed color in `rgb`, `hsl`, `oklch`, `okhsl` and `cmyk`

### Methods

- `getDescriptiveList(random?, limit?)`: the descriptive words joined into a phrase (`"deep, rich and dark"`). `limit` keeps the first n words, which are the best fitting ones; `random` shuffles them first
- `percentages(model?)`: channel values of the color as fractions, for `"rgb"` (default), `"hsl"` or `"cmyk"`
- `percentageWords(model?)`: those channels described in words (`["a good bit of", "a good bit of", "a little bit of"]`)

## Module Formats

This package supports multiple module formats:

- **ESM** (modern): `dist/index.esm.js`
- **CommonJS** (Node.js): `dist/index.js`
- **IIFE** (browser): `dist/index.iife.js`

## Development

```bash
# Build all formats
npm run build

# Run tests
npm run test

# Development with watch mode
npm run dev
```

## Perceptually Accurate Color Matching

All color matching is performed in **OKLCH** color space, which provides perceptually uniform lightness, chroma, and hue — unlike HSL where identical saturation/lightness values can look dramatically different across hues.

Color names are fitted to **~184,000 English-language responses** from the [Many Languages, Many Colors](https://uwdata.github.io/color-naming-in-different-languages) survey. For every point of a grid over the sRGB gamut in OKLCH, the names given to the nearest survey responses are counted; each entry in `src/en.js` covers the region where its name is the most common answer, or a close second. That is why a hue alone never names a color here: a dark muted yellow is olive, a pale red is pink, a muted mid-light orange is brown, a dark cyan is teal, and low-chroma colors are grey or black first.

The nouns are the names people actually used: red, orange, yellow, green, blue, purple, pink, brown, black, white and grey as the basic terms, then maroon, beige, peach, salmon, gold, olive, lime, mint, teal, turquoise, cyan, sky blue, navy, periwinkle, indigo, lavender, violet, magenta, plum and mauve where they are common enough to win or come second in the vote. Synonyms with the same region (burgundy, mustard, aqua, lilac, fuchsia) appear as descriptive words rather than separate nouns.

The adjectives are ordered the same way. The character words in `src/en.js` (pure, very dark, deep, dark, warm and cool for faint tints, pale, pastel, light, bright, muted, soft, medium, rich, vivid) are listed by priority, and the first entry whose region contains the color supplies `descriptiveWords[0]`; every later match only adds secondary words. Greyishness is judged on absolute OKLCH chroma, but vividness is judged on okhsl saturation, the chroma relative to what sRGB can show at that lightness and hue: a turquoise at the gamut edge is "bright" although its absolute chroma is small, and a darkened yellow is "muted" or a "rich gold" rather than vivid. Each region was checked by eye on a sheet of swatches per hue.

`node tools/testbench.mjs` renders the whole grid as an HTML page (`tools/testbench.html`) with the library's names next to the survey vote for each swatch, for checking by eye. `tools/survey-fit.mjs` and `tools/survey-finemap.mjs` rebuild `tools/survey-labels.json` from the raw survey file.

> Kim, Y., Thayer, K., Gorsky, G. S., & Heer, J. (2019). _Color Names Across Languages: Salient Colors and Term Translation in Multilingual Color Naming Models._ EuroVis 2019.
> [Project repository](https://github.com/uwdata/color-naming-in-different-languages)

## Data Sources

### Color Psychology

- [colorpsychology.org](https://www.colorpsychology.org/)
- [Color Poster](https://graf1x.com/color-psychology-emotion-meaning-poster/)
- [Wikipedia](https://en.wikipedia.org/wiki/Color_psychology#:~:text=Color%20psychology%20is%20the%20study,as%20the%20taste%20of%20food.&text=Colors%20can%20also%20enhance%20the,are%20generally%20used%20as%20stimulants.)

### Named Primary, Secondary and Tertiary Colors

- [Named color wheel](https://en.wikipedia.org/wiki/Hue#24_hues_of_HSL/HSV)
- [Named color wheel 2](https://www.color-meanings.com/primary-secondary-tertiary-colors/)

### Color Adjectives

- [Adjective List](https://grammar.yourdictionary.com/grammar/word-lists/list-of-words-to-describe-colors.html)
- [Human Colors](https://github.com/vasilisvg/human-colours/blob/master/js/human-colours-en-gb.js)

### Descriptions

- [color meanings](https://www.canva.com/colors/color-meanings/)

## License

MIT
