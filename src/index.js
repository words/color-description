import { rgb2temperature, isInRange, randomizeArr, rgbToCMYK } from "./utils";
import { wcagContrast, parse, converter, clampChroma } from "culori";
import wordsEN from "./en";

const converters = {
  rgb: converter("rgb"),
  hsl: converter("hsl"),
  oklch: converter("oklch"),
};

// Contradictory descriptive groups. Within each axis only the words from the
// bucket that matches the color's computed saturation may survive — this stops
// e.g. "pale" and "vivid" (or "muted" and "saturated") both appearing when
// entry ranges overlap. Order is muted -> vivid.
const SATURATION_CONFLICT_GROUPS = [
  ["pale", "faded", "bleached"],
  ["muted", "matte", "dusty", "bleak"],
  ["saturated", "vivid", "vibrant", "bold", "brilliant", "lush", "ablaze"],
];

// Maximum in-gamut OKLCH chroma is far below this for sRGB at every hue/L,
// so it is a safe upper probe value for clampChroma.
const OKLCH_CHROMA_PROBE = 0.5;

/**
 * Maximum sRGB-displayable OKLCH chroma for a given lightness + hue.
 * Found by asking culori to clamp an over-saturated color back into gamut.
 * @param {number} l OKLCH lightness
 * @param {number} h OKLCH hue (degrees); may be undefined for achromatic
 * @returns {number} gamut-boundary chroma (Cmax)
 */
const maxChroma = (l, h) => {
  const clamped = converters.oklch(
    clampChroma({ mode: "oklch", l, c: OKLCH_CHROMA_PROBE, h: h || 0 }, "oklch"),
  );
  return clamped && typeof clamped.c === "number" ? clamped.c : 0;
};

const formatComponents = {
  rgb: ["r", "g", "b"],
  cmyk: ["c", "m", "y", "k"],
  hsl: ["h", "s", "l"],
};

class ColorDescription {
  formats = {};
  currentColor = null;

  constructor(color, words = wordsEN) {
    this.color = color;
    this.descriptions = words.descriptions;
    this.temperatures = words.temperatures;
    this.percentWords = words.percentWords
      ? [...words.percentWords].sort(
          (a, b) => a.maxPercentile - b.maxPercentile,
        )
      : [];
  }

  set color(color) {
    this.currentColor = this.#parseColor(color);

    const rgb = converters["rgb"](this.currentColor);
    this.formats.rgb = rgb;
    this.formats.hsl = converters["hsl"](this.currentColor);
    this.formats.oklch = converters["oklch"](this.currentColor);
    this.formats.cmyk = rgbToCMYK(rgb);

    // Relative saturation: absolute OKLCH chroma normalized against the most
    // saturated in-gamut color of the same lightness + hue (Cmax). Absolute C
    // is not perceptually uniform — Cmax differs a lot across hues/lightness —
    // so muted-vs-vivid bucketing uses this 0..1 ratio (`relC`) instead.
    // Criteria entries can reference `relC` on the oklch model.
    const oklch = this.formats.oklch;
    if (oklch && typeof oklch.c === "number") {
      const cmax = maxChroma(oklch.l, oklch.h);
      oklch.relC = cmax > 0 ? Math.min(1, oklch.c / cmax) : 0;
    }
  }

  get color() {
    return this.currentColor;
  }

  /**
   * @param {string} color culori-js compatible color string
   * @returns {object} culori-js instance
   * @throws {TypeError} if the color is not valid
   */
  #parseColor(color) {
    const parsed = parse(color);

    if (!parsed) {
      throw new TypeError(
        `Invalid color: "${color}". Check the culori documentation.`,
      );
    }

    return parsed;
  }

  /**
   * @returns {{value: number, descriptive?: string[]}} closest color temperature bucket
   */
  get temperatureWords() {
    const goal = rgb2temperature(this.formats.rgb);
    return this.temperatures.reduce(
      (prev, curr) =>
        Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev,
      { value: 0 },
    );
  }

  /**
   * @param {string} model color model in which the components are measured
   *                 possible values: "rgb", "cmyk"
   * @returns {Array} color component mix in percent
   */
  percentages(model = "rgb") {
    // validate model
    if (!["rgb", "cmyk"].includes(model)) {
      throw new TypeError(
        'Invalid color model. Use "rgb" or "cmyk" for percentages.',
      );
    }
    if (!this.formats[model]) {
      throw new TypeError(
        `Color format "${model}" is not available. Ensure color is set.`,
      );
    }
    const color = this.formats[model];
    const props = formatComponents[model].map((c) => color[c]);
    const total = props.reduce((r, d) => r + d, 0);
    return props.map((c) => (total ? c / total : 0));
  }

  /**
   * @param {string} model color model in which the components are measured
   * @returns {Array} descriptive words for color percentages
   */
  percentageWords(model = "rgb") {
    return this.percentages(model).map((component) => {
      const found = this.percentWords.find(
        (words) => words.maxPercentile >= component,
      );
      return found ? found.word : "entirely";
    });
  }

  /**
   * @param {string} scope the scope of words to retrieve
   * @param {boolean} randomize whether to randomize the words
   * @param {number} wordLimit the maximum number of words to retrieve
   * @returns {Array} words matching the criteria
   * @note null criteria values are treated as wildcards (match any value)
   */
  #getWords(scope = "descriptive", randomize = false, wordLimit) {
    const words = this.descriptions.reduce((rem, current) => {
      if (!current.hasOwnProperty(scope)) {
        return rem;
      }

      const scopeWords = current[scope].filter(
        (w) => typeof w === "string" && w.trim().length > 0,
      );

      const colorModels = Object.keys(current.criteria);

      const matchesEveryCriteria = colorModels.every((colorModel) => {
        const colorAsModel = this.formats[colorModel];

        if (!colorAsModel) {
          return false;
        }

        return Object.entries(current.criteria[colorModel]).every(
          ([key, criterium]) => {
            // Check if the key exists in colorAsModel
            // null criteria = wildcard, always matches
            if (criterium === null) return true;

            // If the criterion requires a specific value but the color
            // doesn't have this component (e.g. hue on achromatic colors),
            // this entry should NOT match.
            if (
              !(key in colorAsModel) ||
              colorAsModel[key] === undefined ||
              colorAsModel[key] === null
            )
              return false;

            let value = colorAsModel[key];

            if (key === "h") {
              // not sure if this is the best way to handle hue since other color models can have a component with the same name
              value = Math.round(value);
            }

            if (Array.isArray(criterium)) {
              return isInRange(value, criterium[0], criterium[1]);
            } else if (!isNaN(criterium)) {
              return value === criterium;
            } else {
              return false;
            }
          },
        );
      });

      if (matchesEveryCriteria) {
        return [...new Set([...rem, ...scopeWords])];
      } else {
        return rem;
      }
    }, []);

    const resolved =
      scope === "descriptive" ? this.#resolveConflicts(words) : words;

    if (randomize) {
      return randomizeArr(resolved).slice(0, wordLimit);
    }

    return resolved.slice(0, wordLimit);
  }

  /**
   * Remove contradictory saturation adjectives from a descriptive word list.
   * If words from more than one conflicting saturation group are present, keep
   * only the group whose saturation bucket matches the color's relative chroma
   * and drop the others.
   * @param {string[]} words deduped descriptive words
   * @returns {string[]} words with conflicting saturation groups resolved
   */
  #resolveConflicts(words) {
    const oklch = this.formats.oklch;
    const relC = oklch && typeof oklch.relC === "number" ? oklch.relC : 0;

    // Which saturation bucket does the color actually belong to?
    // 0 = pale/muted (low relative chroma), last = vivid (high).
    let bucket;
    if (relC < 0.35) {
      bucket = 0; // pale / faded / bleached
    } else if (relC < 0.6) {
      bucket = 1; // muted / dusty / matte
    } else {
      bucket = 2; // saturated / vivid
    }

    const present = SATURATION_CONFLICT_GROUPS.map((group) =>
      group.some((w) => words.includes(w)),
    );
    const presentCount = present.filter(Boolean).length;

    // No conflict if at most one group contributed words.
    if (presentCount <= 1) {
      return words;
    }

    const drop = new Set();
    SATURATION_CONFLICT_GROUPS.forEach((group, i) => {
      if (i !== bucket) {
        group.forEach((w) => drop.add(w));
      }
    });

    return words.filter((w) => !drop.has(w));
  }

  get descriptiveWords() {
    return this.#getWords("descriptive");
  }

  get nouns() {
    return this.#getWords("nouns");
  }

  get meanings() {
    return this.#getWords("meanings");
  }

  get effects() {
    return this.#getWords("effects");
  }

  get usage() {
    return this.#getWords("usage");
  }

  /**
   * @returns {Array<string>} an array of descriptions for the color
   */
  get description() {
    return this.#getWords("description");
  }

  get bestContrast() {
    return wcagContrast(this.color, "black") > wcagContrast(this.color, "white")
      ? "black"
      : "white";
  }

  /**
   * @param {boolean} random - if true, randomizes the order of descriptive words
   * @param {number} limit - maximum number of descriptive words to return (optional)
   * @returns {string} a formatted string of descriptive words joined with commas and "and"
   */
  getDescriptiveList(random, limit) {
    let arr = [...this.descriptiveWords];

    if (random) {
      arr = randomizeArr(arr);
    }

    if (limit) {
      arr = arr.slice(0, limit);
    }

    if (arr.length === 0) {
      return "";
    }

    if (arr.length > 1) {
      const last = arr.pop();
      return `${arr.join(", ")} and ${last}`;
    } else {
      return arr[0];
    }
  }
}

export default ColorDescription;
