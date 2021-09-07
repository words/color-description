// https://www.writerswrite.co.za/204-words-that-describe-colours/
const isInRange = (x, min, max) => (x >= min && x <= max);

/*
meaning: [
  {
    color: 'red',
    adjecives: ['lust', 'power', 'excitement', 'love', 'speed', 'anger'],
    desc: "Red is a primary color across all models of colour space. It is often associated with love, passion, and lust but also danger. It is frequently used in relation to Valentine's Day.[5] It can also be used to signify danger or warning but it is also associated with importance. For instance, it is used for stop signs and fire engines. In China, red is often used to symbolize good luck or happiness, and is used for many holidays or weddings",
  },
  {
    color: 'yellow',
    adjecives: ['competence', 'happiness', 'inexpensive', 'low quality'],
    desc: "Yellow is a primary color in many models of colour space, and a secondary in all others. It is a color often associated with sunshine or joy.[13] It is sometimes used in association with cowardice or fear, i.e., the phrase 'yellow-bellied'.[14] Children tend to like this color, and it is used to market products to children;[15] it is also used for school buses and taxi cabs since it is such a bright, noticeable color."
  },
  {
    color: 'green',
    adjecives: ['good taste', 'envy', 'eco-friendly', 'health'],
    desc: "Green is a primary color in many models of colour space, and a secondary in all others. It is most often used to represent nature, healing, health, youth, or fertility, since it is such a dominant color in nature. It can be a very relaxing color[16] but is also used in the US to symbolize money, greed, sickness or jealousy.[16] Saying that someone is 'green' means they're inexperienced or new.[17]",
  },
  {
    color: 'blue',
    adjecives: ['masculine', 'competence', 'high quality', 'corporate', 'reliability'],
    desc: "Blue is a primary color across all models of colour space. It is the color of the ocean and the sky; it often symbolizes serenity, stability, inspiration, wisdom or health. It can be a calming color, and symbolize reliability. In the Catholic Church, the Virgin Mary is most often depicted wearing blue, to symbolize being 'full of grace' by divine favor. Blue is widely used for baby boys' clothes or bedrooms, although the reason blue is so strongly associated with boys is debated.[12] Blue can also mean sadness in most cultures. It can also be associated with life.",
  },
  {
    color: 'pink',
    adjecives: ['sophistication', 'sincerity', 'feminine'],
    desc: "Pink is a prominent secondary or tertiary colour in many colour space models. It is associated with softness, sweetness, and love.[22] There is an urban legend that pink was a masculine color before the mid 20th century, based on evidence of conflicting traditions before about 1940. Del Guicide (2012) argues that pink-blue gender coding has been broadly consistent in the UK and the US since it appeared around 1890.",
  },
  {
    color: 'purple',
    adjecives: ['authority', 'sophistication', 'power'],
    desc: "Purple has long been associated with wealth and royalty, as purple dye was precious and expensive. If green is the color of spring, then purple conjures up autumn, fading light, and shorter days. Purple is insouciant–associated with creativity and irreverence (as in the Purple Hat groups of women who embrace aging as an excuse to flout convention.) Purple also represents harmony–the balance between opposing forces.",
  },
  {
    color: 'orange',
    adjecives: ['Warmth', 'excitement'],
    desc: "Orange is the least favorite color of 33% of women, beating out other least favorite colors by quite a margin, and professionals tend to use orange sparingly and carefully. Though it certainly attracts attention and elicits emotion, the color orange can also turn people off.Interestingly, hues like peach, rust, and terracotta – while all part of the range of colors classified as orange – have broad appeal.",
  },
  {
    color: 'brown',
    adjecives: ['ruggedness'],
    desc: "Brown is the ultimate in sensible, grounded colors, so it makes sense that it’s featured in a thrifty expression about taking your lunch with you. Brown represents the earth, and it’s a symbol of balance and of nature. Since brown is a warm neutral, it complements and balances a wide range of colors, and its earthiness gives designers the opportunity to play with splashes of more vibrant hues without overwhelming a project. The physical effects of brown include an increase in tryptophan, which can promote drowsiness (the same effect of that Thanksgiving turkey!) Brown helps us feel connected to our roots and to home. Brown packaging is also used to indicate a product that’s natural or includes recycled content. Typically, brown is a relaxing color that provides a warm, nurturing background.",
  },
  {
    color: 'black',
    adjecives: ['grief', 'sophistication', 'ellegance', 'expensive', 'fear', 'death'],
    desc: "Black is a primary color across all models of colour space. In Western culture, it is considered a negative color and usually symbolizes death, grief, or evil.[18] People often wear black for mourning, although this practice isn't as widespread as it was in the past.",
  },
  {
    color: 'white',
    adjecives: ['happyness', 'sincerity', 'purity'],
    desc: "White is a primary color across all models of colour space. It most often symbolizes perfection, faith, innocence, softness, and cleanliness.[20] Brides often wear white dresses to symbolize virginity or purity.",
  }
],
*/

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
      hsl: [null, [0, 0.04], [0.1, 0.99]],
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

  /**
   * @param {string} color chroma.js compatible color string
   * @returns {object} chroma.js instance
   */
  #parseColor (color) {
    if (chroma.valid(color)) {
      return chroma(color); 
    } else {
      throw new TypeError(
        'Color is not a valid color, check the chroma.js documentation.', 
        'color-description', 
        14
      );
    }
  }

  /**
   * @returns {Array} adjectives describing the color temparature
   */
  get temeratureAdjectives () {
    const goal = this.color.temperature();
    return temperatures.reduce((prev, curr) =>
      (Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev)
    , {value: 0});
  }

  /**
   * 
   * @param {string} model color model in whitch the components are measured
   * @returns {Array} color component mix in percent
   */
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
            return isInRange(colorAsModel[i], criterium[0], criterium[1]); 
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

  get emotions () {
    return this.#getWords('emotions');
  }

  get usage() {
    return this.#getWords('usage');
  }

  get bestContrast () {
    return chroma.contrast(this.color, 'black') > chroma.contrast(this.color, 'white') ? 'black' : 'white';
  }

  /**
   * @param {Boolean} random randomizes sentense of adjectives
   * @param {Integer} limit maximum adjectives to return
   * @returns {String} Adjectives describing the color
   */
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
