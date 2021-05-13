// https://www.writerswrite.co.za/204-words-that-describe-colours/

const isInRange = (x, min, max) => (x >= min && x <= max);

const HSLadjectives = [
  {
    criteria: {
      hsl: [null, [0.75, 1], [0.4, 0.55]],
    },
    adjectives: [
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
    adjectives: [
      'dark',
      'ashy', 
      'somber', 
      'bleak', 
      'muddy', 
      'sooty'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0, 0.3]],
    },
    adjectives: [
      'dark',
      'dim',
      'gloomy',
      'dull'
    ],
  },
  {
    criteria: {
      hsl: [null, [0.1, 0.7], [0.15, 0.5]],
    },
    adjectives: [
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
    adjectives: [
      'tinted',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.2, 1], [0.75, 0.95]],
    },
    adjectives: [
      'pastel',
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0.88, 1]],
    },
    adjectives: [
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
    adjectives: [
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
    adjectives: [
      'neutral'
    ],
  },
  {
    criteria: {
      hsl: [null, [0.74, 1], [0.9, 1]],
    },
    adjectives: [
      'muted'
    ],
  },
  {
    criteria: {
      hsl: [null, null, 1],
    },
    adjectives: [
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
    adjectives: [
      'colorless', 
      'low',
      'dark'
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0.01, 0.3]],
    },
    adjectives: [
      'shady'
    ],
  },

  // lightness
  {
    criteria: {
      hsl: [null, null, [0.01, 0.08]],
    },
    adjectives: [
      'almost black',
    ],
  },
  {
    criteria: {
      hsl: [null, null, [0, 0.09]],
    },
    adjectives: [
      'very dark',
    ],
  },
  {
    criteria: {
      hsl: [null, [0, 0.4], [0, 0.22]],
    },
    adjectives: [
      'dark',
    ],
  },


  // saturations
  {
    criteria: {
      hsl: [null, [0,0.04], [0.1, 0.99]],
    },
    adjectives: [
      'grey',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.04, 0.1], [0.17, 0.99]],
    },
    adjectives: [
      'almost grey',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.1, 0.3], [0.17, 0.99]],
    },
    adjectives: [
      'very unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.3, 0.46], null],
    },
    adjectives: [
      'unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.46, 0.6], [0.4, 0.55]],
    },
    adjectives: [
      'rather unsaturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.601, 0.8], [0.45, 0.6]],
    },
    adjectives: [
      'saturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.801, 0.94], [0.45, 0.6]],
    },
    adjectives: [
      'rather saturated',
    ],
  },
  {
    criteria: {
      hsl: [null, [0.941, 1], [0.45, 0.6]],
    },
    adjectives: [
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
    adjectives: [
      'warm',
      'mellow'
    ],
  },
  {
    criteria: {
      hsl: [[270,360], [0.3, 1], [.1,1]],
    },
    adjectives: [
      'warm',
      'mellow'
    ],
  },
  {
    criteria: {
      hsl: [[90.01,269.99], null, [.1,1]],
    },
    adjectives: [
      'cold',
      'cool'
    ],
  },

  // hues
  {
    criteria: {
      hsl: [[0,15], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'red', 
      'reddish'
    ],
    nouns: [
      'red'
    ],
    emotions: [
      'excitement',
      'energy',
      'passion',
      'courage',
      'attention',
      'lust',
      'power',
      'love',
      'speed',
      'anger'
    ],
    usage: [
      'stimulate',
      'createe urgency',
      'draw attention',
      'caution',
      'encurage'
    ]
  },
  {
    criteria: {
      hsl: [[15,45], [0.1, 1], [0.4, 0.99]],
    },
    adjectives: [
      'orange',
    ],
    nouns: [
      'orange'
    ],
    emotions: [
      'optimism',
      'idependence',
      'adventure',
      'creativity',
      'fun'
    ],
    usage: [
      'stimulate',
      'draw attention',
      'express freedom',
      'fascinate'
    ]
  },
  {
    criteria: {
      hsl: [[15,45], [0.1, 1], [.07, 0.4]],
    },
    adjectives: [
      'brown',
    ],
    nouns: [
      'brown'
    ],
  },
  {
    criteria: {
      hsl: [[45,70], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'yellow',
    ],
    nouns: [
      'yellow'
    ],
    emotions: [
      'ethusiasm',
      'opportunity',
      'spontaneity',
      'happyness',
      'positivity'
    ],
    usage: [
      'stimulate',
      'relax',
      'awake awareness',
      'egnergize',
      'affect mood',
      'sale',
      'cheap'
    ]
  },
  {
    criteria: {
      hsl: [[70,79], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'lime',
    ],
    nouns: [
      'lime'
    ],
    emotions: [
      'growth',
      'harmony',
      'fertility',
      'kindness',
      'dependability'
    ],
    usage: [
      'restore energy',
      'promote growth',
      'awake awareness',
      'rejuvinate',
      'nature'
    ]
  },
  {
    criteria: {
      hsl: [[79,163], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'green',
      'greenish',
    ],
    nouns: [
      'green'
    ],
    emotions: [
      'safety',
      'harmony',
      'stability',
      'reliability',
      'balance'
    ],
    usage: [
      'relax',
      'ballance',
      'revitalize',
      'encurage',
      'posses'
    ]
  },
  {
    criteria: {
      hsl: [[163,193], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
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
    adjectives: [
      'blue',
      'blueish'
    ],
    nouns: [
      'blue'
    ]
  },
  {
    criteria: {
      hsl: [[240,260], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
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
    adjectives: [
      'violet',
    ],
    nouns: [
      'violet'
    ]
  },
  {
    criteria: {
      hsl: [[270,291], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'purple',
      'purplish'
    ],
    nouns: [
      'purple'
    ]
  },
  {
    criteria: {
      hsl: [[291,327], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
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
    adjectives: [
      'pink'
    ],
    nouns: [
      'pink'
    ]
  },
  {
    criteria: {
      hsl: [[344,360], [0.1, 1], [.07, 0.99]],
    },
    adjectives: [
      'red', 
      'reddish'
    ],
    nouns: [
      'red'
    ],
    emotions: [
      'excitement',
      'energy',
      'passion',
      'courage',
      'attention',
      'lust',
      'power',
      'love',
      'speed',
      'anger'
    ],
    usage: [
      'stimulate',
      'createe urgency',
      'draw attention',
      'caution',
      'encurage'
    ],
  },
];

const temperatures = [
  {
    value: 1800,
    adjectives: [
      'ultra warm',
    ]
  },
  {
    value: 2400,
    adjectives: [
      'very warm',
    ]
  },
  {
    value: 2700,
    adjectives: [
      'warm',
    ]
  },
  {
    value: 3000,
    adjectives: [
      'warm white',
    ]
  },
  {
    value: 4000,
    adjectives: [
      'cool or cold',
    ]
  },
  {
    value: 6500,
    adjectives: [
      'cool',
    ]
  }
];

const percentAdjectives = [
  {
    maxPercentile: 0.06,
    word: 'a dash of',
  },
  {
    maxPercentile: 0.16,
    word: 'a little bit of',
  },
  {
    maxPercentile: 0.31,
    word: 'some',
  },
  {
    maxPercentile: 0.56,
    word: 'a good bit of',
  },
  {
    maxPercentile: 0.71,
    word: 'a lot of',
  },
  {
    maxPercentile: 0.86,
    word: 'a whole lot of',
  },
  {
    maxPercentile: 0.99,
    word: 'neatly entirely',
  },
  {
    maxPercentile: 1,
    word: 'entirely',
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

  percentages (model='gl') {
    const props = this.color[model]();
    if (
      model==='gl'
    ){
      props.pop() // removes alpha
    }
    const total = props.reduce((r,d) => r + d, 0);
    return props.map(c => total ? c/total : 0);
  }

  percentageWords (model='gl') {
    return this.percentages(model).map(component => 
      percentAdjectives.find(words => words.maxPercentile >= component).word
    );
  }

  #getWords (scope = 'adjectives') {
    const hsl = this.color.hsl();

    return HSLadjectives.reduce((rem, current) => {
      if( !current.hasOwnProperty(scope) ) {
        return rem;
      }
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
        return [...new Set([...rem, ...current[scope]])];
      } else {
        return rem;
      }
    },[]);
  }

  get adjectives () {
    return this.#getWords('adjectives');
  }

  get nouns () {
    return this.#getWords('nouns');
  }

  get bestContrast () {
    return chroma.contrast(this.color, 'black') > chroma.contrast(this.color, 'white') ? 'black' : 'white';
  }

  getAdjectivesList (random, limit) {
    let arr = [...this.adjectives];
    
    if (random) {
      arr = arr.sort(() => 0.5 - Math.random());
    }

    if (limit) {
      arr = arr.slice(0, limit);
    }

    if (arr.length > 1) {
      const last = arr.pop()
      return `${arr.join(', ')} and ${last}`;
    } else {
      return arr[0];
    }
  }
}
