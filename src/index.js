import chroma from 'chroma-js';
import wordsEN from './en';

const isInRange = (x, min, max) => x >= min && x <= max;
const randomizeArr = (arr) => [...arr].sort(() => 0.5 - Math.random());

class ColorDescription {
  constructor(
    color,
    words = wordsEN
  ) {
    this.color = color;
    this.descriptions = words.descriptions;
    this.temperatures = words.temperatures;
    this.percentWords = words.percentWords;
  }

  set color(color) {
    this.currentColor = this.#parseColor(color);
  }

  get color() {
    return this.currentColor;
  }

  /**
   * @param {string} color chroma.js compatible color string
   * @returns {object} chroma.js instance
   */
  #parseColor(color) {
    if (chroma.valid(color)) {
      return chroma(color);
    } else {
      throw new TypeError(
        "Color is not a valid color, check the chroma.js documentation.",
        "color-description",
        14
      );
    }
  }

  /**
   * @returns {Array} descriptive describing the color temparature
   */
  get temeratureWords() {
    const goal = this.color.temperature();
    return this.temperatures.reduce(
      (prev, curr) =>
        Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev,
      { value: 0 }
    );
  }

  /**
   *
   * @param {string} model color model in whitch the components are measured
   * @returns {Array} color component mix in percent
   */
  percentages(model = "gl") {
    const props = this.color[model]();
    if (model === "gl") {
      props.pop(); // removes alpha
    }
    const total = props.reduce((r, d) => r + d, 0);
    return props.map((c) => (total ? c / total : 0));
  }

  percentageWords(model = "gl") {
    return this.percentages(model).map(
      (component) =>
        this.percentWords.find((words) => words.maxPercentile >= component).word
    );
  }

  #getWords(
    scope = "descriptive",
    randomize = false,
    wordLimit
  ) {
    return this.descriptions.reduce((rem, current) => {
      if (!current.hasOwnProperty(scope)) {
        return rem;
      }
 
      const colorModels = Object.keys(current.criteria);
      
      const matchesEveryCriteria = colorModels.every((colorModel) => {
        const colorAsModel = this.color[colorModel]();

        if (
          colorModel === "hsl" ||
          colorModel === "gl" ||
          colorModel === "rgb"
        ) {
          colorAsModel.pop(); // ignore alpha
        }

        return current.criteria[colorModel].every((criterium, i) => {
          if (criterium === null) {
            return true;
          } else if (Array.isArray(criterium)) {
            return isInRange(colorAsModel[i], criterium[0], criterium[1]);
          } else if (!isNaN(criterium)) {
            return colorAsModel[i] === criterium;
          } else {
            return false;
          }
        });
      });

      if (matchesEveryCriteria) {
        // gets rid of duplicates by creating a map first
        return [...new Set([...rem, ...current[scope]])];
      } else {
        return rem;
      }
    }, []);
  }

  get descriptiveWords() {
    return this.#getWords("descriptive");
  }

  get nouns() {
    return this.#getWords("nouns");
  }

  get emotions() {
    return this.#getWords("emotions");
  }

  get usage() {
    return this.#getWords("usage");
  }

  get bestContrast() {
    return chroma.contrast(this.color, "black") >
      chroma.contrast(this.color, "white")
      ? "black"
      : "white";
  }

  /**
   * @param {Boolean} random randomizes sentense of descriptive
   * @param {Integer} limit maximum descriptive to return
   * @returns {String} descriptive describing the color
   */
  getDescriptiveList(random, limit) {
    let arr = [...this.descriptiveWords];

    if (random) {
      arr = randomizeArr(arr);
    }

    if (limit) {
      arr = arr.slice(0, limit);
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
