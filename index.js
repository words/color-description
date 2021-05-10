import chroma from 'chroma-js';

const temperatures = [
  {
    value: 1800,
    adjecives: [
      'ultra warm',
    ]
  },
  {
    value: 2400,
    adjecives: [
      'very warm',
    ]
  },
  {
    value: 2700,
    adjecives: [
      'warm',
    ]
  },
  {
    value: 3000,
    adjecives: [
      'warm white',
    ]
  },
  {
    value: 4000,
    adjecives: [
      'cool or cold',
    ]
  },
  {
    value: 6500,
    adjecives: [
      'cool',
    ]
  }
];

export default class ColorDescription {
  constructor (color) {
    this.color = this.#parseColor(color);
  }

  #parseColor (color) {
    if (chroma.valid(color)) {
      return chroma(color); 
    } else {
      throw new TypeError('Color is not a valid color, check the chroma.js documentation.', 'color-description', 14);
    }
  }

  get temeratureAdjectives () {
    const goal = this.color.temperature();
    return temperatures.reduce((prev, curr) =>
      (Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev)
    , {value: 0});
  }
}
