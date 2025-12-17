import { rgb2temperature, isInRange, randomizeArr, rgbToCMYK } from "./utils";
import { wcagContrast, parse, converter, formatHex } from "culori";
import wordsEN from "./en";

const converters = {
  rgb: converter("rgb"),
  hsl: converter("hsl"),
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
    this.formats.cmyk = rgbToCMYK(rgb);
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

      const scopeWords = Array.isArray(current[scope])
        ? current[scope].filter(
            (w) => typeof w === "string" && w.trim().length > 0,
          )
        : [];

      const colorModels = Object.keys(current.criteria);

      const matchesEveryCriteria = colorModels.every((colorModel) => {
        const colorAsModel = this.formats[colorModel];

        if (!colorAsModel) {
          return false;
        }

        return Object.entries(current.criteria[colorModel]).every(
          ([key, criterium]) => {
            // Check if the key exists in colorAsModel
            if (
              !(key in colorAsModel) ||
              colorAsModel[key] === undefined ||
              colorAsModel[key] === null ||
              criterium === null
            )
              return true; // Skip if the component doesn't exist

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

    if (randomize) {
      return randomizeArr(words).slice(0, wordLimit);
    }

    return words.slice(0, wordLimit);
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
