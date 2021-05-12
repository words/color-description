// https://www.writerswrite.co.za/204-words-that-describe-colours/

const cmyk2cmy = cmyk => {
  const [c, m, y, k] = cmyk;
  return [c + k, m + k, y + k]
};

const isInRange = (x, min, max) => (x >= min && x <= max);

const HSLadjectives = [
  {
    criteria: {
      hsl: [null, [0.75, 1], [0.4, 0.55]],
    },
    adjecives: [
      'saturated', 
      'strong', 
      'lush', 
      'ablaze', 
      'beaming', 
      'bold', 
      'brilliant', 
      'flamboyant',
      'vibrant',
      'vivid',
      'loud'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0, 0.07]],
    },
    adjecives: [
      'dark', 
      'dull', 
      'ashy', 
      'somber', 
      'bleak', 
      'dim', 
      'muddy', 
      'gloomy', 
      'sooty'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0, 0.3]],
    },
    adjecives: [
      'dark',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.1, 0.7], [0.15, 0.35]],
    },
    adjecives: [
      'bleak',
      'muted',
      'matte',
      'dusty'
    ],
  },
  {
    criteria: {
      hsl: [null, [0.12, 1], [0.7, 1]],
    },
    adjecives: [
      'tinted'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0.88, 1]],
    },
    adjecives: [
      'pale', 
      'light', 
      'faded', 
      'delicate',
      'glistening',
      'bleached'
    ],
  },
  {
    criteria: {
      hsl: [null, [0.5, 1], [0.7, 0.9]],
    },
    adjecives: [
      'fresh',
      'sparkling',
      'glittering',
      'glowing',
      'jazzy',
      'opalecent'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0.9, 1]],
    },
    adjecives: ['neutral'],
  },
  {
    criteria: {
      hsl: [null, [0.74, 1], [0.9, 1]],
    },
    adjecives: [
      'muted'
    ],
  },
  {
    criteria: {
      hsl: [null, null, 1],
    },
    adjecives: [
      'colorless', 
      'bright', 
      'briliant', 
      'high'
    ],
  },
  {
    criteria: {
      hsl: [null, null, 0],
    },
    adjecives: [
      'colorless', 
      'low',
      'dark'
    ],
  },

  // saturations
  {
    criteria: {
      hsl: [null, [0,0.04], [0.1, 0.99]],
    },
    adjecives: [
      'grey',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.04, 0.1], [0.17, 0.99]],
    },
    adjecives: [
      'almost grey',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.1, 0.3], [0.17, 0.99]],
    },
    adjecives: [
      'very unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.3, 0.46], null],
    },
    adjecives: [
      'unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.46, 0.6], [0.4, 0.55]],
    },
    adjecives: [
      'rather unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.601, 0.8], [0.45, 0.6]],
    },
    adjecives: [
      'saturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.801, 0.94], [0.45, 0.6]],
    },
    adjecives: [
      'rather saturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.941, 1], [0.45, 0.6]],
    },
    adjecives: [
      'very saturated',
    ],
  },

  // warm vs cold colors
  // loosly based on https://www.sensationalcolor.com/color-temperature/
  // https://discuss.pixls.us/t/color-choosing-paradox-also-warmer-vs-cooler/5722/40
  {
    criteria: {
      hsl: [[0, 90], [0.3, 1], [0.1 ,1]],
    },
    adjecives: [
      'warm',
      'mellow'
    ],
  },
  {
    criteria: {
      hsl: [[270,360], [0.3, 1], [.1,1]],
    },
    adjecives: [
      'warm',
      'mellow'
    ],
  },
  {
    criteria: {
      hsl: [[90.01,269.99], null, [.1,1]],
    },
    adjecives: [
      'cold',
      'cool'
    ],
  },

  // hues
  {
    criteria: {
      hsl: [[0,15], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'red', 
      'reddish'
    ],
    nouns: [
      'red'
    ]
  },
  {
    criteria: {
      hsl: [[15,45], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'orange',
    ],
    nouns: [
      'orange'
    ]
  },
  {
    criteria: {
      hsl: [[45,70], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'yellow',
    ],
    nouns: [
      'yellow'
    ]
  },
  {
    criteria: {
      hsl: [[70,79], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'lime',
    ],
    nouns: [
      'lime'
    ]
  },
  {
    criteria: {
      hsl: [[79,163], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'green'
    ],
    nouns: [
      'green'
    ]
  },
  {
    criteria: {
      hsl: [[163,193], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'cyan'
    ],
    nouns: [
      'cyan'
    ]
  },
  {
    criteria: {
      hsl: [[193,240], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'blue'
    ],
    nouns: [
      'blue'
    ]
  },
  {
    criteria: {
      hsl: [[240,260], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'indigo',
    ],
    nouns: [
      'indigo'
    ]
  },
  {
    criteria: {
      hsl: [[260,270], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'violet'
    ],
    nouns: [
      'violet'
    ]
  },
  {
    criteria: {
      hsl: [[270,291], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'purple'
    ],
    nouns: [
      'purple'
    ]
  },
  {
    criteria: {
      hsl: [[291,327], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'magenta'
    ],
    nouns: [
      'magenta'
    ]
  },
  {
    criteria: {
      hsl: [[327,344], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'rose'
    ],
    nouns: [
      'rose'
    ]
  },
  {
    criteria: {
      hsl: [[344,360], [0.1, 1], [.07, 0.99]],
    },
    adjecives: [
      'red'
    ],
    nouns: [
      'red'
    ]
  },
];

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
    this.color = color;
  }

  set color (color) {
    this.currentColor = this.#parseColor(color)
  }

  get color () {
    return this.currentColor;
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

  get rgbPercentages () {
    const gl = this.color.gl();
    gl.pop() // removes alpha
    const total = gl.reduce((r,d) => r + d, 0);
    return gl.map(c => c/total);
  }

  get adjectivesList () {
    const arr = [...this.adjectives];

    if (arr.length > 1) {
      const last = arr.pop()
      return `${arr.join(', ')} and ${last}`;
    } else {
      return arr[0];
    }
  }

  get adjectives () {
    const hsl = this.color.hsl();

    return HSLadjectives.reduce((rem, current) => {
      const colorModels = Object.keys(current.criteria);
      const matchesEveryCriteria = colorModels.every(colorModel => {
        const colorAsModel = this.color[colorModel]();
        if (colorModel === 'hsl' || colorModel === 'gl' || colorModel === 'rgb') {
          colorAsModel.pop() // removes alpha
        }
        
        return current.criteria[colorModel].every((criterium, i) => {
          if (criterium === null) {
            return true;
          } else if (Array.isArray(criterium)) {
            return isInRange(colorAsModel[i],criterium[0], criterium[1]); 
          } else if (!isNaN(criterium)) {
            return colorAsModel[i] === criterium;
          } else {
            return false;
          }
        });
      });

      if (matchesEveryCriteria) {
        return [...new Set([...rem, ...current.adjecives])];
      } else {
        return rem;
      }
    },[]);
  }
}
