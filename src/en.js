// Hue boundaries informed by:
// "Color Names Across Languages: Salient Colors and Term Translation in
// Multilingual Color Naming Models" — Kim, Thayer, Gorsky & Heer (EuroVis 2019)
// https://github.com/uwdata/color-naming-in-different-languages
//
// Boundaries are placed at midpoints between adjacent survey-term centroids
// in OKLCH hue space, cross-validated against ~49K English-language responses.

export default {
  descriptions: [
    // ===========================
    // Character words (hue-agnostic, from OKLCH lightness and chroma plus
    // okhsl saturation, which is chroma relative to what sRGB can show at
    // that lightness and hue). Entries are in priority order: the first
    // entry that matches gives the first adjective, later matches add
    // secondary words. Every region was judged by eye on the testbench.
    // ===========================
    // -- neutral axis (chroma below 0.012)
    {
      // white
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.012],
          l: [0.97, 1.001],
        },
      },
      descriptive: ["bright", "pure", "clean", "colorless"],
    },
    {
      // light greys
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.012],
          l: [0.65, 0.97],
        },
      },
      descriptive: ["light", "pale", "neutral"],
    },
    {
      // mid greys
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.012],
          l: [0.35, 0.65],
        },
      },
      descriptive: ["neutral", "medium", "colorless"],
    },
    {
      // dark greys
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.012],
          l: [0.22, 0.35],
        },
      },
      descriptive: ["dark", "neutral", "shady"],
    },
    // -- black nouns (the near-black rule in the matcher skips hue entries)
    // Near black. In the survey "black" is the most common answer up to about
    // L 0.32 at low chroma. The matcher skips hue entries in the darkest part.
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.045],
          l: [0, 0.32],
        },
      },
      nouns: ["black"],
      description: [
        "Black is the absence of light: the deepest, most grounded color there is. It reads as formal, powerful and definitive, and it makes every other color beside it look brighter. Very dark tints of a hue are still black to the eye, with only a faint cast that shows up next to a pure black. In design, black carries weight and authority, from typography and luxury packaging to stage and cinema. Picture black as the velvet backdrop that lets everything else shine.",
      ],
      meanings: ["power", "elegance", "formality", "mystery", "authority"],
      usage: ["luxury", "typography", "fashion", "technology", "backgrounds"],
    },
    // Very dark but slightly more chromatic: black still wins or ties the
    // vote up to L 0.25; the hue noun comes second.
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.045, 0.1],
          l: [0, 0.25],
        },
      },
      nouns: ["black"],
      description: [
        "Black is the absence of light: the deepest, most grounded color there is. It reads as formal, powerful and definitive, and it makes every other color beside it look brighter. Very dark tints of a hue are still black to the eye, with only a faint cast that shows up next to a pure black. In design, black carries weight and authority, from typography and luxury packaging to stage and cinema. Picture black as the velvet backdrop that lets everything else shine.",
      ],
      meanings: ["power", "elegance", "formality", "mystery", "authority"],
      usage: ["luxury", "typography", "fashion", "technology", "backgrounds"],
    },
    // -- yellows and golds: dark yellow reads as mustard, not as vivid
    {
      criteria: {
        oklch: {
          h: [80, 115],
          c: [0.06, 0.16],
          l: [0.85, 1.001],
        },
      },
      descriptive: ["light", "pastel", "delicate"],
    },
    {
      criteria: {
        oklch: {
          h: [70, 115],
          c: [0.085, 0.5],
          l: [0.55, 0.85],
        },
        okhsl: {
          s: [0.4, 0.78],
        },
      },
      descriptive: ["muted", "mellow", "dull"],
    },
    {
      criteria: {
        oklch: {
          h: [70, 115],
          c: [0.085, 0.5],
          l: [0.55, 0.85],
        },
        okhsl: {
          s: [0.78, 1.01],
        },
      },
      descriptive: ["rich", "golden", "warm"],
    },
    // -- dark
    {
      // black
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.1],
        },
      },
      descriptive: ["pure", "pitch", "deep"],
    },
    {
      // off-black
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.025],
          l: [0.1, 0.28],
        },
      },
      descriptive: ["deep", "inky", "sooty"],
    },
    {
      // dark and colorful: deep red, deep blue
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.25, 0.42],
        },
        okhsl: {
          s: [0.6, 1.01],
        },
      },
      descriptive: ["deep", "rich", "dark"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.15, 0.25],
        },
        okhsl: {
          s: [0.8, 1.01],
        },
      },
      descriptive: ["deep", "rich", "inky"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.25],
        },
      },
      descriptive: ["very dark", "inky", "gloomy"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.25, 0.4],
        },
      },
      descriptive: ["dark", "dim", "somber"],
    },
    // -- low chroma
    // faint tints read as warm or cool greys: warm grey, cool grey blue
    {
      criteria: {
        oklch: {
          h: [330, 360],
          c: [0.012, 0.05],
          l: [0.4, 0.78],
        },
      },
      descriptive: ["warm", "muted", "greyish", "dusty"],
    },
    {
      criteria: {
        oklch: {
          h: [0, 125],
          c: [0.012, 0.05],
          l: [0.4, 0.78],
        },
      },
      descriptive: ["warm", "muted", "greyish", "dusty"],
    },
    {
      criteria: {
        oklch: {
          h: [125, 330],
          c: [0.012, 0.05],
          l: [0.4, 0.78],
        },
      },
      descriptive: ["cool", "muted", "greyish", "dusty"],
    },
    {
      // pale pink, pale blue
      criteria: {
        oklch: {
          h: null,
          c: [0.012, 0.06],
          l: [0.78, 1.001],
        },
      },
      descriptive: ["pale", "delicate", "faded"],
    },
    // -- very light
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.1, 0.5],
          l: [0.9, 1.001],
        },
        okhsl: {
          s: [0.75, 1.01],
        },
      },
      descriptive: ["bright", "light", "luminous"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.06, 0.5],
          l: [0.9, 1.001],
        },
      },
      descriptive: ["light", "pastel", "delicate"],
    },
    // -- light
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.11, 0.5],
          l: [0.75, 0.9],
        },
        okhsl: {
          s: [0.8, 1.01],
        },
      },
      descriptive: ["bright", "vivid", "brilliant", "glowing"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.75, 0.9],
        },
        okhsl: {
          s: [0.62, 1.01],
        },
      },
      descriptive: ["light", "soft", "fresh"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.75, 0.9],
        },
        okhsl: {
          s: [0, 0.62],
        },
      },
      descriptive: ["pastel", "soft", "light"],
    },
    // -- mid
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.65, 0.75],
        },
        okhsl: {
          s: [0.7, 1.01],
        },
      },
      descriptive: ["bright", "vivid", "brilliant", "glowing"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.4, 0.65],
        },
        okhsl: {
          s: [0.8, 1.01],
        },
      },
      descriptive: ["vivid", "vibrant", "strong", "bold", "saturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.4, 0.75],
        },
        okhsl: {
          s: [0.62, 0.8],
        },
      },
      descriptive: ["rich", "full", "medium"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.62, 0.75],
        },
        okhsl: {
          s: [0.45, 0.62],
        },
      },
      descriptive: ["soft", "light", "fresh"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.4, 0.62],
        },
        okhsl: {
          s: [0.45, 0.62],
        },
      },
      descriptive: ["medium", "moderate"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.05, 0.5],
          l: [0.4, 0.75],
        },
        okhsl: {
          s: [0, 0.45],
        },
      },
      descriptive: ["muted", "dull", "matte", "soft"],
    },
    // -- secondary words
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.2, 0.5],
          l: [0.75, 0.95],
        },
      },
      descriptive: ["neon", "fluorescent"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.02, 0.5],
          l: [0.92, 1],
        },
      },
      descriptive: ["luminous"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.012, 0.1],
          l: [0, 0.5],
        },
      },
      descriptive: ["dim", "gloomy", "dull"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.012, 0.12],
          l: [0.25, 0.65],
        },
      },
      descriptive: ["matte", "dusty", "ashy"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.15, 0.5],
          l: [0.55, 0.85],
        },
      },
      descriptive: ["fresh", "sparkling"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.01, 0.035],
          l: [0.22, 0.99],
        },
      },
      descriptive: ["almost grey"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.02, 0.07],
          l: [0.22, 0.99],
        },
      },
      descriptive: ["very unsaturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.07, 0.11],
          l: null,
        },
      },
      descriptive: ["unsaturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.11, 0.14],
          l: [0.45, 0.7],
        },
      },
      descriptive: ["rather unsaturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.14, 0.19],
          l: [0.45, 0.75],
        },
      },
      descriptive: ["fairly saturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.19, 0.25],
          l: [0.45, 0.75],
        },
      },
      descriptive: ["saturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.25, 0.5],
          l: [0.45, 0.75],
        },
      },
      descriptive: ["highly saturated"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.012],
          l: [0.15, 0.98],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [80, 345],
          c: [0.012, 0.045],
          l: [0.33, 0.92],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.012, 0.025],
          l: [0.33, 0.92],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 80],
          c: [0.012, 0.025],
          l: [0.33, 0.92],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.025, 0.045],
          l: [0.45, 0.92],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 80],
          c: [0.025, 0.045],
          l: [0.45, 0.92],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 120],
          c: [0.05, 0.5],
          l: [0.15, 1],
        },
      },
      descriptive: ["warm", "mellow"],
    },
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.05, 0.5],
          l: [0.15, 1],
        },
      },
      descriptive: ["warm", "mellow"],
    },
    {
      criteria: {
        oklch: {
          h: [163, 327],
          c: [0.05, 0.5],
          l: [0.15, 1],
        },
      },
      descriptive: ["cold", "cool"],
    },

    // ===========================
    // White & Black nouns
    // ===========================
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.97, 1.001],
        },
      },
      nouns: ["white"],
      description: [
        "White is commonly associated with clarity, simplicity, and cleanliness. It can evoke fresh snow, bright daylight, a blank page, or crisp fabric—space that feels open and breathable. In design, white creates room for content, improves legibility, and helps other colors feel more vivid by contrast. It can communicate honesty and calm, but in excess it may also feel sterile or impersonal. Picture white as a clean, bright backdrop that makes everything around it feel sharper and lighter.",
      ],
      meanings: [
        "purity",
        "cleanliness",
        "simplicity",
        "innocence",
        "freshness",
        "light",
        "goodness",
        "virtue",
        "safety",
        "peace",
        "tranquility",
        "wholeness",
        "perfection",
        "honesty",
        "truth",
        "sincerity",
      ],
      usage: [
        "health",
        "hospital",
        "sanitary",
        "weddings",
        "bridal",
        "minimalism",
        "dairy",
        "clean beauty",
        "winter themes",
      ],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.0, 0.15],
        },
      },
      nouns: ["black"],
      description: [
        "Black often reads as bold, serious, and refined. It brings strong contrast, visual weight, and a sense of depth—like night sky, ink, or polished stone. In design and fashion, black can signal luxury and confidence, while also suggesting mystery or formality. Used carefully, it makes layouts feel crisp and intentional; used heavily, it can feel severe or intimidating. Imagine black as a deep backdrop that sharpens silhouettes and pulls focus to what matters.",
      ],
      meanings: [
        "power",
        "control",
        "authority",
        "discipline",
        "discretion",
        "secrecy",
        "elegance",
        "mystery",
      ],
      effects: ["intimidate", "signal authority"],
      usage: [
        "luxury",
        "fashion",
        "elegance",
        "formal wear",
        "premium branding",
        "editorial",
        "typography",
      ],
    },

    // ===========================
    // Greyish blues and blue-violets (hue 250–300) are grey as well up to C 0.07.

    {
      criteria: {
        oklch: {
          h: [250, 300],
          c: [0.045, 0.07],
          l: [0.45, 0.85],
        },
      },
      nouns: ["grey"],
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite—present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak.",
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication",
      ],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture",
      ],
    },
    // Hue names — fitted to the survey data (Kim et al. 2019)
    // Hue boundaries: midpoints between term centroids. Lightness and chroma
    // limits: the region where the term is the most common answer among the
    // nearest survey responses (see tools/survey-finemap.mjs). Hue ranges are
    // half-open; L and C ranges are inclusive and overlap on purpose.
    // ===========================
    // Pink — wins from L 0.55 up across the pink hues, any chroma.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.075, 0.5],
          l: [0.55, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 12],
          c: [0.075, 0.5],
          l: [0.55, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Towards red, pink needs more lightness (crimson is red).
    {
      criteria: {
        oklch: {
          h: [12, 25],
          c: [0.075, 0.5],
          l: [0.62, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Dusty rose between pink and red (hue 12–25, mid chroma) is pink.
    {
      criteria: {
        oklch: {
          h: [12, 25],
          c: [0.095, 0.115],
          l: [0.52, 0.62],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Saturated magenta hues are pink from L 0.65; below that purple or magenta.
    {
      criteria: {
        oklch: {
          h: [318, 345],
          c: [0.075, 0.5],
          l: [0.65, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Greyish pinks only from L 0.65; below that they are brown and mauve.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.045, 0.075],
          l: [0.65, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 12],
          c: [0.045, 0.075],
          l: [0.65, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Very pale lilac-pinks.
    {
      criteria: {
        oklch: {
          h: [318, 325],
          c: [0.02, 0.075],
          l: [0.85, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Pale greyish magenta hues above L 0.72 are pink (the survey is 60–90%
    // sure); below that they are grey purple.
    {
      criteria: {
        oklch: {
          h: [325, 345],
          c: [0.02, 0.075],
          l: [0.72, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [12, 25],
          c: [0.02, 0.075],
          l: [0.78, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Very pale greyish pinks around hue 0.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.02, 0.045],
          l: [0.78, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 12],
          c: [0.02, 0.045],
          l: [0.78, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Pink reaches a little lower around hue 0 (raspberry, dusky rose).
    {
      criteria: {
        oklch: {
          h: [0, 12],
          c: [0.1, 0.5],
          l: [0.48, 0.55],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Vivid dusky pinks (raspberry) just below L 0.55 on the magenta side.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.1, 0.5],
          l: [0.48, 0.55],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Light salmon and peachy pinks.
    {
      criteria: {
        oklch: {
          h: [25, 35],
          c: [0.05, 0.5],
          l: [0.68, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Very pale warm pinks.
    {
      criteria: {
        oklch: {
          h: [25, 38],
          c: [0.02, 0.06],
          l: [0.85, 0.99],
        },
      },
      descriptive: ["pink"],
      nouns: ["pink"],
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds—gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene.",
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Red — only mid-light and saturated (C ≥ 0.135). Lighter is pink, darker is
    // maroon, muted is brown.
    {
      criteria: {
        oklch: {
          h: [5, 20],
          c: [0.115, 0.5],
          l: [0.42, 0.68],
        },
      },
      descriptive: ["red", "reddish"],
      nouns: ["red"],
      description: [
        "Red is energetic and attention-grabbing, often linked with passion, heat, and urgency. It can feel like firelight, ripe fruit, warning signs, or a racing heartbeat—immediate and hard to ignore. In design, red is frequently used for calls to action, alerts, and emphasis, because it reads as high-intensity and high-priority. It can communicate love and celebration, but also anger or danger depending on context. Picture red as a bright spark that pulls the eye and raises the emotional volume.",
      ],
      meanings: [
        "excitement",
        "energy",
        "passion",
        "courage",
        "attention",
        "lust",
        "power",
        "love",
        "speed",
        "anger",
        "danger",
        "ferocity",
        "violence",
        "fury",
        "vigor",
        "urgency",
      ],
      effects: [
        "stimulate",
        "create urgency",
        "draw attention",
        "encourage",
        "excite",
        "heighten arousal",
      ],
      usage: [
        "caution",
        "food industry",
        "sports",
        "sales",
        "entertainment",
        "romance",
        "emergency services",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [20, 40],
          c: [0.115, 0.5],
          l: [0.38, 0.68],
        },
      },
      descriptive: ["red", "reddish"],
      nouns: ["red"],
      description: [
        "Red is energetic and attention-grabbing, often linked with passion, heat, and urgency. It can feel like firelight, ripe fruit, warning signs, or a racing heartbeat—immediate and hard to ignore. In design, red is frequently used for calls to action, alerts, and emphasis, because it reads as high-intensity and high-priority. It can communicate love and celebration, but also anger or danger depending on context. Picture red as a bright spark that pulls the eye and raises the emotional volume.",
      ],
      meanings: [
        "excitement",
        "energy",
        "passion",
        "courage",
        "attention",
        "lust",
        "power",
        "love",
        "speed",
        "anger",
        "danger",
        "ferocity",
        "violence",
        "fury",
        "vigor",
        "urgency",
      ],
      effects: [
        "stimulate",
        "create urgency",
        "draw attention",
        "encourage",
        "excite",
        "heighten arousal",
      ],
      usage: [
        "caution",
        "food industry",
        "sports",
        "sales",
        "entertainment",
        "romance",
        "emergency services",
      ],
    },
    // Vivid light pinks near red (coral) are red as well.
    {
      criteria: {
        oklch: {
          h: [5, 25],
          c: [0.15, 0.5],
          l: [0.65, 0.75],
        },
      },
      descriptive: ["red", "reddish"],
      nouns: ["red"],
      description: [
        "Red is energetic and attention-grabbing, often linked with passion, heat, and urgency. It can feel like firelight, ripe fruit, warning signs, or a racing heartbeat—immediate and hard to ignore. In design, red is frequently used for calls to action, alerts, and emphasis, because it reads as high-intensity and high-priority. It can communicate love and celebration, but also anger or danger depending on context. Picture red as a bright spark that pulls the eye and raises the emotional volume.",
      ],
      meanings: [
        "excitement",
        "energy",
        "passion",
        "courage",
        "attention",
        "lust",
        "power",
        "love",
        "speed",
        "anger",
        "danger",
        "ferocity",
        "violence",
        "fury",
        "vigor",
        "urgency",
      ],
      effects: [
        "stimulate",
        "create urgency",
        "draw attention",
        "encourage",
        "excite",
        "heighten arousal",
      ],
      usage: [
        "caution",
        "food industry",
        "sports",
        "sales",
        "entertainment",
        "romance",
        "emergency services",
      ],
    },
    // Orange — mid-light and saturated. Red-oranges need more chroma.
    {
      criteria: {
        oklch: {
          h: [35, 50],
          c: [0.135, 0.5],
          l: [0.55, 0.86],
        },
      },
      descriptive: ["orange"],
      nouns: ["orange"],
      description: [
        "Orange feels warm, friendly, and optimistic—like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in.",
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      effects: ["stimulate", "draw attention", "express freedom", "fascinate"],
      usage: [
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [50, 78],
          c: [0.1, 0.5],
          l: [0.58, 0.85],
        },
      },
      descriptive: ["orange"],
      nouns: ["orange"],
      description: [
        "Orange feels warm, friendly, and optimistic—like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in.",
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      effects: ["stimulate", "draw attention", "express freedom", "fascinate"],
      usage: [
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween",
      ],
    },
    // Light red-oranges (coral orange) at slightly lower chroma.
    {
      criteria: {
        oklch: {
          h: [35, 50],
          c: [0.11, 0.135],
          l: [0.68, 0.86],
        },
      },
      descriptive: ["orange"],
      nouns: ["orange"],
      description: [
        "Orange feels warm, friendly, and optimistic—like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in.",
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      effects: ["stimulate", "draw attention", "express freedom", "fascinate"],
      usage: [
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween",
      ],
    },
    // Amber (hue 78–85) is orange only when light; darker it is gold or brown.
    {
      criteria: {
        oklch: {
          h: [78, 85],
          c: [0.1, 0.5],
          l: [0.74, 0.85],
        },
      },
      descriptive: ["orange"],
      nouns: ["orange"],
      description: [
        "Orange feels warm, friendly, and optimistic—like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in.",
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      effects: ["stimulate", "draw attention", "express freedom", "fascinate"],
      usage: [
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween",
      ],
    },
    // Amber at hue 76–83 is yellow as well as orange.
    {
      criteria: {
        oklch: {
          h: [76, 83],
          c: [0.12, 0.5],
          l: [0.76, 0.99],
        },
      },
      descriptive: ["yellow"],
      nouns: ["yellow"],
      description: [
        "Yellow is bright and uplifting, often linked with sunshine, optimism, and alertness. It can feel like morning light, gold, flowers, or caution tape—cheerful but highly noticeable. In design, yellow works well for highlights and friendly emphasis, but large blocks can become visually tiring if too intense. Softer yellows can feel warm and gentle; vivid yellows feel energetic and attention-focused. Imagine yellow as a beam of light that instantly warms a scene.",
      ],
      meanings: [
        "enthusiasm",
        "opportunity",
        "spontaneity",
        "happiness",
        "positivity",
      ],
      effects: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "convey competence",
      ],
      usage: ["sale", "cheap", "budget", "construction"],
    },
    // Olive — muted yellow-greens from dark to mid-light. Placed before brown
    // and green so it leads where it applies (olive brown, olive green).
    {
      criteria: {
        oklch: {
          h: [88, 125],
          c: [0.045, 0.16],
          l: [0.28, 0.72],
        },
      },
      descriptive: ["olive"],
      nouns: ["olive"],
      description: [
        "Olive is a dark, earthy yellow-green that feels natural and understated. It evokes Mediterranean landscapes, military camouflage, and ripe olive groves—rugged, organic, and grounded. In design, olive works well for outdoor, military, or natural aesthetics, adding warmth without brightness. It can signal durability and practicality, or a connection to the earth. Picture olive as the muted green of sun-dried leaves and weathered canvas.",
      ],
      meanings: [
        "nature",
        "earthiness",
        "peace",
        "resilience",
        "tradition",
        "humility",
      ],
      usage: [
        "military",
        "outdoor brands",
        "organic products",
        "nature themes",
        "fashion",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [125, 135],
          c: [0.045, 0.15],
          l: [0.4, 0.7],
        },
      },
      descriptive: ["olive"],
      nouns: ["olive"],
      description: [
        "Olive is a dark, earthy yellow-green that feels natural and understated. It evokes Mediterranean landscapes, military camouflage, and ripe olive groves—rugged, organic, and grounded. In design, olive works well for outdoor, military, or natural aesthetics, adding warmth without brightness. It can signal durability and practicality, or a connection to the earth. Picture olive as the muted green of sun-dried leaves and weathered canvas.",
      ],
      meanings: [
        "nature",
        "earthiness",
        "peace",
        "resilience",
        "tradition",
        "humility",
      ],
      usage: [
        "military",
        "outdoor brands",
        "organic products",
        "nature themes",
        "fashion",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [105, 125],
          c: [0.08, 0.16],
          l: [0.72, 0.85],
        },
      },
      descriptive: ["olive"],
      nouns: ["olive"],
      description: [
        "Olive is a dark, earthy yellow-green that feels natural and understated. It evokes Mediterranean landscapes, military camouflage, and ripe olive groves—rugged, organic, and grounded. In design, olive works well for outdoor, military, or natural aesthetics, adding warmth without brightness. It can signal durability and practicality, or a connection to the earth. Picture olive as the muted green of sun-dried leaves and weathered canvas.",
      ],
      meanings: [
        "nature",
        "earthiness",
        "peace",
        "resilience",
        "tradition",
        "humility",
      ],
      usage: [
        "military",
        "outdoor brands",
        "organic products",
        "nature themes",
        "fashion",
      ],
    },
    // Brown — the whole warm half of the wheel below L 0.72 at low chroma.
    {
      criteria: {
        oklch: {
          h: [15, 25],
          c: [0.02, 0.1],
          l: [0.15, 0.45],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [25, 88],
          c: [0.045, 0.1],
          l: [0.15, 0.68],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [25, 45],
          c: [0.02, 0.045],
          l: [0.15, 0.45],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [45, 75],
          c: [0.02, 0.045],
          l: [0.15, 0.52],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [88, 105],
          c: [0.045, 0.1],
          l: [0.15, 0.68],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [75, 105],
          c: [0.02, 0.045],
          l: [0.15, 0.45],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [15, 25],
          c: [0.045, 0.075],
          l: [0.45, 0.55],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Above L 0.55 the pink hues are brown only when greyish.
    {
      criteria: {
        oklch: {
          h: [15, 25],
          c: [0.045, 0.095],
          l: [0.55, 0.66],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Muted mid-light oranges and ochres carry brown as a second name.
    {
      criteria: {
        oklch: {
          h: [45, 90],
          c: [0.08, 0.135],
          l: [0.65, 0.74],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Rust, chocolate, cinnamon and dark ochre: mid-chroma dark oranges and
    // yellows are brown.
    {
      criteria: {
        oklch: {
          h: [30, 105],
          c: [0.1, 0.16],
          l: [0.15, 0.55],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [30, 45],
          c: [0.1, 0.135],
          l: [0.55, 0.62],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [45, 105],
          c: [0.1, 0.16],
          l: [0.55, 0.65],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Muted mid-light red-oranges (caramel) are brown, not orange.
    {
      criteria: {
        oklch: {
          h: [30, 50],
          c: [0.1, 0.135],
          l: [0.62, 0.68],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Pink hues (345–15) are brown only when nearly grey; the dusky ones are
    // plum, mauve and maroon.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.02, 0.045],
          l: [0.25, 0.45],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Faint pinkish beige (hue 25–35) at very low chroma.
    {
      criteria: {
        oklch: {
          h: [25, 35],
          c: [0.02, 0.05],
          l: [0.68, 0.85],
        },
      },
      descriptive: ["beige"],
      nouns: ["beige"],
      description: [
        "Beige is a light and versatile neutral color that subtly blends soft tones of brown and white. This hue is positioned toward the lighter end of the brown spectrum on the color wheel. It resembles a pale cream rather than spanning to darker hues like taupe, and offers a warm, understated elegance.",
      ],
      meanings: ["warmth", "elegance", "neutrality", "calm"],
      usage: [
        "backgrounds",
        "interiors",
        "fashion",
        "neutral accents",
        "cosmetics",
        "luxury packaging",
        "spa and wellness",
        "stationery",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 15],
          c: [0.02, 0.045],
          l: [0.15, 0.45],
        },
      },
      descriptive: ["brown"],
      nouns: ["brown"],
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort—useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on.",
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security",
      ],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro",
      ],
    },
    // Beige — light, low-chroma warm hues (sand, cream, khaki).
    {
      criteria: {
        oklch: {
          h: [35, 100],
          c: [0.045, 0.1],
          l: [0.68, 0.99],
        },
      },
      descriptive: ["beige"],
      nouns: ["beige"],
      description: [
        "Beige is a light and versatile neutral color that subtly blends soft tones of brown and white. This hue is positioned toward the lighter end of the brown spectrum on the color wheel. It resembles a pale cream rather than spanning to darker hues like taupe, and offers a warm, understated elegance.",
      ],
      meanings: ["warmth", "elegance", "neutrality", "calm"],
      usage: [
        "backgrounds",
        "interiors",
        "fashion",
        "neutral accents",
        "cosmetics",
        "luxury packaging",
        "spa and wellness",
        "stationery",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [100, 115],
          c: [0.045, 0.095],
          l: [0.68, 0.99],
        },
      },
      descriptive: ["beige"],
      nouns: ["beige"],
      description: [
        "Beige is a light and versatile neutral color that subtly blends soft tones of brown and white. This hue is positioned toward the lighter end of the brown spectrum on the color wheel. It resembles a pale cream rather than spanning to darker hues like taupe, and offers a warm, understated elegance.",
      ],
      meanings: ["warmth", "elegance", "neutrality", "calm"],
      usage: [
        "backgrounds",
        "interiors",
        "fashion",
        "neutral accents",
        "cosmetics",
        "luxury packaging",
        "spa and wellness",
        "stationery",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [35, 115],
          c: [0.02, 0.045],
          l: [0.78, 0.99],
        },
      },
      descriptive: ["beige"],
      nouns: ["beige"],
      description: [
        "Beige is a light and versatile neutral color that subtly blends soft tones of brown and white. This hue is positioned toward the lighter end of the brown spectrum on the color wheel. It resembles a pale cream rather than spanning to darker hues like taupe, and offers a warm, understated elegance.",
      ],
      meanings: ["warmth", "elegance", "neutrality", "calm"],
      usage: [
        "backgrounds",
        "interiors",
        "fashion",
        "neutral accents",
        "cosmetics",
        "luxury packaging",
        "spa and wellness",
        "stationery",
      ],
    },
    // Yellow — only light (L ≥ 0.74). Darker yellows are gold, mustard or olive.
    {
      criteria: {
        oklch: {
          h: [83, 120],
          c: [0.07, 0.5],
          l: [0.88, 0.99],
        },
      },
      descriptive: ["yellow"],
      nouns: ["yellow"],
      description: [
        "Yellow is bright and uplifting, often linked with sunshine, optimism, and alertness. It can feel like morning light, gold, flowers, or caution tape—cheerful but highly noticeable. In design, yellow works well for highlights and friendly emphasis, but large blocks can become visually tiring if too intense. Softer yellows can feel warm and gentle; vivid yellows feel energetic and attention-focused. Imagine yellow as a beam of light that instantly warms a scene.",
      ],
      meanings: [
        "enthusiasm",
        "opportunity",
        "spontaneity",
        "happiness",
        "positivity",
      ],
      effects: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "convey competence",
      ],
      usage: ["sale", "cheap", "budget", "construction"],
    },
    // Mid-light yellow needs a little more chroma; below it is beige or tan.
    {
      criteria: {
        oklch: {
          h: [83, 120],
          c: [0.1, 0.5],
          l: [0.74, 0.88],
        },
      },
      descriptive: ["yellow"],
      nouns: ["yellow"],
      description: [
        "Yellow is bright and uplifting, often linked with sunshine, optimism, and alertness. It can feel like morning light, gold, flowers, or caution tape—cheerful but highly noticeable. In design, yellow works well for highlights and friendly emphasis, but large blocks can become visually tiring if too intense. Softer yellows can feel warm and gentle; vivid yellows feel energetic and attention-focused. Imagine yellow as a beam of light that instantly warms a scene.",
      ],
      meanings: [
        "enthusiasm",
        "opportunity",
        "spontaneity",
        "happiness",
        "positivity",
      ],
      effects: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "convey competence",
      ],
      usage: ["sale", "cheap", "budget", "construction"],
    },
    {
      criteria: {
        oklch: {
          h: [95, 120],
          c: [0.08, 0.1],
          l: [0.74, 0.88],
        },
      },
      descriptive: ["yellow"],
      nouns: ["yellow"],
      description: [
        "Yellow is bright and uplifting, often linked with sunshine, optimism, and alertness. It can feel like morning light, gold, flowers, or caution tape—cheerful but highly noticeable. In design, yellow works well for highlights and friendly emphasis, but large blocks can become visually tiring if too intense. Softer yellows can feel warm and gentle; vivid yellows feel energetic and attention-focused. Imagine yellow as a beam of light that instantly warms a scene.",
      ],
      meanings: [
        "enthusiasm",
        "opportunity",
        "spontaneity",
        "happiness",
        "positivity",
      ],
      effects: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "convey competence",
      ],
      usage: ["sale", "cheap", "budget", "construction"],
    },
    // Lime — light and vivid yellow-greens only.
    {
      criteria: {
        oklch: {
          h: [108, 135],
          c: [0.12, 0.5],
          l: [0.76, 0.99],
        },
      },
      descriptive: ["lime"],
      nouns: ["lime"],
      description: [
        "Lime is a sharp, zesty green-yellow that feels fresh and high-energy. It can evoke citrus, neon signs, sportswear, or new leaves—bright, youthful, and a little electric. In design, lime is often used to signal novelty, motion, and visibility, especially as an accent or highlight. It can read as playful and modern, but it can also feel loud if overused. Picture lime as a vivid splash that wakes up a palette instantly.",
      ],
      meanings: ["growth", "harmony", "fertility", "kindness", "dependability"],
      effects: [
        "restore energy",
        "promote growth",
        "awake awareness",
        "rejuvenate",
      ],
      usage: ["nature", "energy drinks", "sports", "gaming"],
    },
    // Green — from yellow-green to blue-green, any lightness above near-black.
    {
      criteria: {
        oklch: {
          h: [113, 185],
          c: [0.02, 0.09],
          l: [0.15, 0.78],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [113, 178],
          c: [0.02, 0.09],
          l: [0.78, 0.99],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    // Faint light yellow-greens (hue 105–113) are grey green.
    {
      criteria: {
        oklch: {
          h: [105, 113],
          c: [0.02, 0.045],
          l: [0.66, 0.92],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    // Saturated olive-yellows (hue 105–113) are green as well as olive.
    {
      criteria: {
        oklch: {
          h: [105, 113],
          c: [0.08, 0.5],
          l: [0.66, 0.99],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    // Saturated blue-greens past hue 178 are teal and turquoise, not green.
    {
      criteria: {
        oklch: {
          h: [113, 178],
          c: [0.09, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    // Muted yellow-greens read as green (survey), not olive, unless mid-toned.
    {
      criteria: {
        oklch: {
          h: [105, 113],
          c: [0.02, 0.15],
          l: [0.15, 0.66],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        'Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.',
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },
    // Teal — bluish greens; at hue 165–180 only when light and saturated.
    {
      criteria: {
        oklch: {
          h: [165, 180],
          c: [0.07, 0.18],
          l: [0.6, 0.78],
        },
      },
      descriptive: ["teal"],
      nouns: ["teal"],
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon.",
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust",
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [180, 200],
          c: [0.02, 0.15],
          l: [0.15, 0.78],
        },
      },
      descriptive: ["teal"],
      nouns: ["teal"],
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon.",
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust",
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [200, 215],
          c: [0.02, 0.15],
          l: [0.15, 0.72],
        },
      },
      descriptive: ["teal"],
      nouns: ["teal"],
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon.",
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust",
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },
    // Muted blue-greens just before hue 180 are teal too.
    {
      criteria: {
        oklch: {
          h: [172, 180],
          c: [0.05, 0.15],
          l: [0.35, 0.65],
        },
      },
      descriptive: ["teal"],
      nouns: ["teal"],
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon.",
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust",
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },
    // Dark muted blues around hue 215–228 read as teal (petrol).
    {
      criteria: {
        oklch: {
          h: [215, 228],
          c: [0.02, 0.11],
          l: [0.15, 0.66],
        },
      },
      descriptive: ["teal"],
      nouns: ["teal"],
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon.",
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust",
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },
    // Blue — light greenish blues (hue 185–215) are blue to most people.
    {
      criteria: {
        oklch: {
          h: [185, 205],
          c: [0.02, 0.5],
          l: [0.75, 0.99],
        },
      },
      descriptive: ["blue", "blueish"],
      nouns: ["blue"],
      description: [
        "Blue often feels calm, steady, and trustworthy—like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order.",
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control",
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [215, 225],
          c: [0.02, 0.5],
          l: [0.48, 0.99],
        },
      },
      descriptive: ["blue", "blueish"],
      nouns: ["blue"],
      description: [
        "Blue often feels calm, steady, and trustworthy—like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order.",
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control",
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical",
      ],
    },
    // Very light aqua (hue 178–185) is blue to many people.
    {
      criteria: {
        oklch: {
          h: [178, 185],
          c: [0.02, 0.12],
          l: [0.85, 0.99],
        },
      },
      descriptive: ["blue", "blueish"],
      nouns: ["blue"],
      description: [
        "Blue often feels calm, steady, and trustworthy—like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order.",
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control",
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [205, 215],
          c: [0.02, 0.5],
          l: [0.68, 0.99],
        },
      },
      descriptive: ["blue", "blueish"],
      nouns: ["blue"],
      description: [
        "Blue often feels calm, steady, and trustworthy—like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order.",
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control",
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical",
      ],
    },
    // Blue proper, through to the purple boundary.
    {
      criteria: {
        oklch: {
          h: [225, 288],
          c: [0.02, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["blue", "blueish"],
      nouns: ["blue"],
      description: [
        "Blue often feels calm, steady, and trustworthy—like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order.",
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control",
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical",
      ],
    },
    // Purple — from the blue boundary to the pink boundary.
    {
      criteria: {
        oklch: {
          h: [295, 318],
          c: [0.02, 0.5],
          l: [0.15, 0.92],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // At the blue boundary (285–295) purple only below L 0.62; lighter is periwinkle and lavender.
    {
      criteria: {
        oklch: {
          h: [285, 295],
          c: [0.02, 0.5],
          l: [0.15, 0.62],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // Near the pink boundary, light tones are pink and lilac, not purple.
    {
      criteria: {
        oklch: {
          h: [318, 325],
          c: [0.02, 0.14],
          l: [0.15, 0.75],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // Magenta hues below L 0.72 read as purple.
    {
      criteria: {
        oklch: {
          h: [325, 345],
          c: [0.02, 0.14],
          l: [0.15, 0.72],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // Vivid magenta hues are purple only when darker.
    {
      criteria: {
        oklch: {
          h: [318, 345],
          c: [0.14, 0.5],
          l: [0.15, 0.65],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // Dark greyish pink hues read as purple (the rest are plum or maroon).
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.02, 0.05],
          l: [0.22, 0.45],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 15],
          c: [0.02, 0.05],
          l: [0.22, 0.45],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    // Navy — dark blues, not too vivid.
    {
      criteria: {
        oklch: {
          h: [225, 288],
          c: [0.02, 0.145],
          l: [0.18, 0.45],
        },
      },
      descriptive: ["navy"],
      nouns: ["navy"],
      description: [
        "Navy is a dark, authoritative blue that feels professional and dependable. It evokes naval uniforms, deep ocean water, and twilight sky—serious but approachable. In design, navy is a versatile near-neutral that works as a softer alternative to black, lending depth and formality without harshness. It pairs well with almost any accent color and reads as classic and timeless. Picture navy as the deep blue of a clear night sky just after sunset.",
      ],
      meanings: [
        "authority",
        "trust",
        "stability",
        "professionalism",
        "tradition",
        "confidence",
        "reliability",
      ],
      usage: [
        "corporate",
        "finance",
        "uniforms",
        "formal design",
        "nautical themes",
      ],
    },
    // Vivid dark blues are navy only when very dark.
    {
      criteria: {
        oklch: {
          h: [225, 288],
          c: [0.145, 0.22],
          l: [0.18, 0.34],
        },
      },
      descriptive: ["navy"],
      nouns: ["navy"],
      description: [
        "Navy is a dark, authoritative blue that feels professional and dependable. It evokes naval uniforms, deep ocean water, and twilight sky—serious but approachable. In design, navy is a versatile near-neutral that works as a softer alternative to black, lending depth and formality without harshness. It pairs well with almost any accent color and reads as classic and timeless. Picture navy as the deep blue of a clear night sky just after sunset.",
      ],
      meanings: [
        "authority",
        "trust",
        "stability",
        "professionalism",
        "tradition",
        "confidence",
        "reliability",
      ],
      usage: [
        "corporate",
        "finance",
        "uniforms",
        "formal design",
        "nautical themes",
      ],
    },
    // Muted mid blues just above the navy box still read as navy.
    {
      criteria: {
        oklch: {
          h: [235, 288],
          c: [0.045, 0.1],
          l: [0.45, 0.52],
        },
      },
      descriptive: ["navy"],
      nouns: ["navy"],
      description: [
        "Navy is a dark, authoritative blue that feels professional and dependable. It evokes naval uniforms, deep ocean water, and twilight sky—serious but approachable. In design, navy is a versatile near-neutral that works as a softer alternative to black, lending depth and formality without harshness. It pairs well with almost any accent color and reads as classic and timeless. Picture navy as the deep blue of a clear night sky just after sunset.",
      ],
      meanings: [
        "authority",
        "trust",
        "stability",
        "professionalism",
        "tradition",
        "confidence",
        "reliability",
      ],
      usage: [
        "corporate",
        "finance",
        "uniforms",
        "formal design",
        "nautical themes",
      ],
    },
    // Maroon / burgundy — dark reds and dark pinks.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.07, 0.18],
          l: [0.22, 0.48],
        },
      },
      descriptive: ["maroon", "burgundy"],
      nouns: ["maroon"],
      description: [
        "Maroon is a dark, rich red that feels grounded and dignified. It evokes aged wine, dark leather, and autumn foliage—warm but restrained. In design, maroon carries the intensity of red with added depth and formality, making it a popular choice for institutions, luxury branding, and elegant print. It can communicate tradition, confidence, and seriousness without the aggressiveness of brighter reds. Picture maroon as a deep ember that glows with quiet authority.",
      ],
      meanings: [
        "strength",
        "courage",
        "warmth",
        "intensity",
        "ambition",
        "confidence",
        "tradition",
      ],
      usage: [
        "luxury",
        "academic",
        "formal design",
        "autumn themes",
        "wine branding",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 32],
          c: [0.07, 0.18],
          l: [0.22, 0.48],
        },
      },
      descriptive: ["maroon", "burgundy"],
      nouns: ["maroon"],
      description: [
        "Maroon is a dark, rich red that feels grounded and dignified. It evokes aged wine, dark leather, and autumn foliage—warm but restrained. In design, maroon carries the intensity of red with added depth and formality, making it a popular choice for institutions, luxury branding, and elegant print. It can communicate tradition, confidence, and seriousness without the aggressiveness of brighter reds. Picture maroon as a deep ember that glows with quiet authority.",
      ],
      meanings: [
        "strength",
        "courage",
        "warmth",
        "intensity",
        "ambition",
        "confidence",
        "tradition",
      ],
      usage: [
        "luxury",
        "academic",
        "formal design",
        "autumn themes",
        "wine branding",
      ],
    },
    // Maroon reaches L 0.52 when not vivid.
    {
      criteria: {
        oklch: {
          h: [0, 30],
          c: [0.07, 0.145],
          l: [0.48, 0.52],
        },
      },
      descriptive: ["maroon", "burgundy"],
      nouns: ["maroon"],
      description: [
        "Maroon is a dark, rich red that feels grounded and dignified. It evokes aged wine, dark leather, and autumn foliage—warm but restrained. In design, maroon carries the intensity of red with added depth and formality, making it a popular choice for institutions, luxury branding, and elegant print. It can communicate tradition, confidence, and seriousness without the aggressiveness of brighter reds. Picture maroon as a deep ember that glows with quiet authority.",
      ],
      meanings: [
        "strength",
        "courage",
        "warmth",
        "intensity",
        "ambition",
        "confidence",
        "tradition",
      ],
      usage: [
        "luxury",
        "academic",
        "formal design",
        "autumn themes",
        "wine branding",
      ],
    },
    // --- Secondary names: returned after the primary name of their region ---
    // Gold and mustard: dark yellows.
    {
      criteria: {
        oklch: {
          h: [78, 110],
          c: [0.08, 0.18],
          l: [0.55, 0.74],
        },
      },
      descriptive: ["gold", "mustard"],
      nouns: ["gold"],
      description: [
        "Gold and mustard are dark, rich yellows. Gold is the warm, lustrous yellow of the metal and of autumn light; mustard is its earthier, more muted cousin. Both feel warm, confident and a little retro. In design they add richness where plain yellow would feel loud. Picture gold as a brass fixture catching the light, and mustard as a wool scarf in October.",
      ],
      meanings: ["wealth", "warmth", "success", "tradition"],
      usage: ["luxury", "autumn", "retro", "packaging"],
    },
    // Light saturated yellows are also gold.
    {
      criteria: {
        oklch: {
          h: [85, 110],
          c: [0.12, 0.18],
          l: [0.74, 0.82],
        },
      },
      descriptive: ["gold", "mustard"],
      nouns: ["gold"],
      description: [
        "Gold and mustard are dark, rich yellows. Gold is the warm, lustrous yellow of the metal and of autumn light; mustard is its earthier, more muted cousin. Both feel warm, confident and a little retro. In design they add richness where plain yellow would feel loud. Picture gold as a brass fixture catching the light, and mustard as a wool scarf in October.",
      ],
      meanings: ["wealth", "warmth", "success", "tradition"],
      usage: ["luxury", "autumn", "retro", "packaging"],
    },
    // Peach: light soft oranges.
    {
      criteria: {
        oklch: {
          h: [25, 70],
          c: [0.04, 0.14],
          l: [0.75, 0.93],
        },
      },
      descriptive: ["peach"],
      nouns: ["peach"],
      description: [
        "Peach is a soft, light orange with a touch of pink, like the skin of the fruit. It feels gentle, warm and friendly, and is a favourite for skin tones, sunsets and summery pastels. In design it works as a warm neutral or a tender accent that never shouts. Picture peach as late afternoon light on a plastered wall.",
      ],
      meanings: ["warmth", "gentleness", "youth", "friendliness"],
      usage: ["cosmetics", "wedding", "summer", "food"],
    },
    {
      criteria: {
        oklch: {
          h: [25, 70],
          c: [0.1, 0.14],
          l: [0.68, 0.75],
        },
      },
      descriptive: ["peach"],
      nouns: ["peach"],
      description: [
        "Peach is a soft, light orange with a touch of pink, like the skin of the fruit. It feels gentle, warm and friendly, and is a favourite for skin tones, sunsets and summery pastels. In design it works as a warm neutral or a tender accent that never shouts. Picture peach as late afternoon light on a plastered wall.",
      ],
      meanings: ["warmth", "gentleness", "youth", "friendliness"],
      usage: ["cosmetics", "wedding", "summer", "food"],
    },
    // Pale butter tones at hue 70–85 read as peach.
    {
      criteria: {
        oklch: {
          h: [70, 85],
          c: [0.04, 0.12],
          l: [0.85, 0.93],
        },
      },
      descriptive: ["peach"],
      nouns: ["peach"],
      description: [
        "Peach is a soft, light orange with a touch of pink, like the skin of the fruit. It feels gentle, warm and friendly, and is a favourite for skin tones, sunsets and summery pastels. In design it works as a warm neutral or a tender accent that never shouts. Picture peach as late afternoon light on a plastered wall.",
      ],
      meanings: ["warmth", "gentleness", "youth", "friendliness"],
      usage: ["cosmetics", "wedding", "summer", "food"],
    },
    // Tan: light warm brown.
    {
      criteria: {
        oklch: {
          h: [40, 88],
          c: [0.04, 0.11],
          l: [0.66, 0.78],
        },
      },
      descriptive: ["sandy"],
      nouns: ["brown"],
      description: [
        "Tan is a light, warm brown: sand, leather, camel hair, a summer suntan. It is one of the great quiet neutrals, warmer than grey and softer than brown, and it pairs with almost anything. In design it reads as natural, relaxed and a little classic. Picture tan as a worn leather satchel in the sun.",
      ],
      meanings: ["nature", "reliability", "comfort", "simplicity"],
      usage: ["fashion", "interiors", "leather goods", "outdoor"],
    },
    // Salmon: light pink-oranges.
    {
      criteria: {
        oklch: {
          h: [15, 40],
          c: [0.09, 0.2],
          l: [0.65, 0.78],
        },
      },
      descriptive: ["salmon"],
      nouns: ["salmon"],
      description: [
        "Salmon is a pinkish orange, between coral and peach, named after the flesh of the fish. It feels warm, healthy and appetising, softer than coral and livelier than peach. In design it works well for food, wellness and friendly consumer brands. Picture salmon as a sunset reflected on wet sand.",
      ],
      meanings: ["warmth", "health", "appetite", "friendliness"],
      usage: ["food", "wellness", "summer", "fashion"],
    },
    // Mauve: greyish and dusky pinks, down to L 0.45.
    {
      criteria: {
        oklch: {
          h: [318, 360],
          c: [0.02, 0.1],
          l: [0.45, 0.72],
        },
      },
      descriptive: ["mauve"],
      nouns: ["mauve"],
      description: [
        "Mauve is a greyish pinkish purple, dusty and restrained. It carries a Victorian, slightly faded elegance, and it is one of the few purples that works as a near-neutral. In design it reads as soft, mature and a little nostalgic. Picture mauve as dried rose petals.",
      ],
      meanings: ["nostalgia", "elegance", "softness", "maturity"],
      usage: ["fashion", "interiors", "cosmetics", "stationery"],
    },
    {
      criteria: {
        oklch: {
          h: [318, 360],
          c: [0.02, 0.06],
          l: [0.72, 0.85],
        },
      },
      descriptive: ["mauve"],
      nouns: ["mauve"],
      description: [
        "Mauve is a greyish pinkish purple, dusty and restrained. It carries a Victorian, slightly faded elegance, and it is one of the few purples that works as a near-neutral. In design it reads as soft, mature and a little nostalgic. Picture mauve as dried rose petals.",
      ],
      meanings: ["nostalgia", "elegance", "softness", "maturity"],
      usage: ["fashion", "interiors", "cosmetics", "stationery"],
    },
    {
      criteria: {
        oklch: {
          h: [0, 35],
          c: [0.02, 0.1],
          l: [0.45, 0.72],
        },
      },
      descriptive: ["mauve"],
      nouns: ["mauve"],
      description: [
        "Mauve is a greyish pinkish purple, dusty and restrained. It carries a Victorian, slightly faded elegance, and it is one of the few purples that works as a near-neutral. In design it reads as soft, mature and a little nostalgic. Picture mauve as dried rose petals.",
      ],
      meanings: ["nostalgia", "elegance", "softness", "maturity"],
      usage: ["fashion", "interiors", "cosmetics", "stationery"],
    },
    {
      criteria: {
        oklch: {
          h: [0, 25],
          c: [0.02, 0.06],
          l: [0.72, 0.85],
        },
      },
      descriptive: ["mauve"],
      nouns: ["mauve"],
      description: [
        "Mauve is a greyish pinkish purple, dusty and restrained. It carries a Victorian, slightly faded elegance, and it is one of the few purples that works as a near-neutral. In design it reads as soft, mature and a little nostalgic. Picture mauve as dried rose petals.",
      ],
      meanings: ["nostalgia", "elegance", "softness", "maturity"],
      usage: ["fashion", "interiors", "cosmetics", "stationery"],
    },
    // Mint: pale fresh greens.
    {
      criteria: {
        oklch: {
          h: [140, 182],
          c: [0.025, 0.18],
          l: [0.78, 0.97],
        },
      },
      descriptive: ["mint"],
      nouns: ["mint"],
      description: [
        "Mint is a pale, fresh green with a hint of blue, like the leaf or the sweet. It feels clean, cool and refreshing, and it is a natural pastel for spring and health themes. In design mint lifts a palette without adding weight. Picture mint as a scoop of ice cream on a hot day.",
      ],
      meanings: ["freshness", "cleanliness", "calm", "youth"],
      usage: ["health", "spring", "food", "pastel palettes"],
    },
    // Turquoise / aqua: light vivid blue-greens.
    {
      criteria: {
        oklch: {
          h: [172, 215],
          c: [0.05, 0.18],
          l: [0.7, 0.86],
        },
      },
      descriptive: ["turquoise", "aqua"],
      nouns: ["turquoise"],
      description: [
        "Turquoise and aqua are bright greenish blues named after the gemstone and after water. They feel tropical, clean and energetic, the colour of shallow seas over sand. In design they suggest holidays, swimming pools and freshness, and they carry more warmth than plain cyan. Picture turquoise as a lagoon seen from above.",
      ],
      meanings: ["freshness", "tropics", "clarity", "energy"],
      usage: ["travel", "swimwear", "summer", "water"],
    },
    // Cyan: only light and vivid; most people say blue or turquoise.
    {
      criteria: {
        oklch: {
          h: [178, 225],
          c: [0.13, 0.5],
          l: [0.68, 0.99],
        },
      },
      descriptive: ["cyan"],
      nouns: ["cyan"],
      description: [
        "Cyan is crisp and cool, often evoking clear water, bright skies, and clean air. It tends to feel refreshing and modern—light enough to be friendly, but cool enough to be precise. In design, cyan can suggest clarity, communication, and technology, and it works well for bright accents on dark backgrounds. Depending on context, it can feel playful and youthful or sleek and professional. Picture cyan as a splash of cold water: sharp, energizing, and clean.",
      ],
      meanings: [
        "freedom",
        "trust",
        "wisdom",
        "joy",
        "refreshing",
        "consciousness",
        "stimulating",
      ],
      effects: ["self-expression", "refresh"],
      usage: [
        "communication",
        "children's products",
        "technology",
        "aerospace",
        "entertainment",
        "productivity",
      ],
    },
    // Very light aquas are cyan at lower chroma.
    {
      criteria: {
        oklch: {
          h: [178, 225],
          c: [0.06, 0.13],
          l: [0.86, 0.99],
        },
      },
      descriptive: ["cyan"],
      nouns: ["cyan"],
      description: [
        "Cyan is crisp and cool, often evoking clear water, bright skies, and clean air. It tends to feel refreshing and modern—light enough to be friendly, but cool enough to be precise. In design, cyan can suggest clarity, communication, and technology, and it works well for bright accents on dark backgrounds. Depending on context, it can feel playful and youthful or sleek and professional. Picture cyan as a splash of cold water: sharp, energizing, and clean.",
      ],
      meanings: [
        "freedom",
        "trust",
        "wisdom",
        "joy",
        "refreshing",
        "consciousness",
        "stimulating",
      ],
      effects: ["self-expression", "refresh"],
      usage: [
        "communication",
        "children's products",
        "technology",
        "aerospace",
        "entertainment",
        "productivity",
      ],
    },
    // Sky blue: light blues.
    {
      criteria: {
        oklch: {
          h: [215, 265],
          c: [0.08, 0.16],
          l: [0.7, 0.85],
        },
      },
      descriptive: ["sky blue"],
      nouns: ["sky blue"],
      description: [
        "Sky blue is a light, clear blue, the colour of a cloudless day. It feels open, calm and optimistic, and it is the most universally liked of the blues. In design it reads as friendly and trustworthy without the weight of a dark blue. Picture sky blue as the view from a window in summer.",
      ],
      meanings: ["openness", "calm", "optimism", "freedom"],
      usage: ["air travel", "childhood", "wellness", "backgrounds"],
    },
    // Very light blues take sky blue at lower chroma.
    {
      criteria: {
        oklch: {
          h: [215, 265],
          c: [0.05, 0.16],
          l: [0.85, 0.96],
        },
      },
      descriptive: ["sky blue"],
      nouns: ["sky blue"],
      description: [
        "Sky blue is a light, clear blue, the colour of a cloudless day. It feels open, calm and optimistic, and it is the most universally liked of the blues. In design it reads as friendly and trustworthy without the weight of a dark blue. Picture sky blue as the view from a window in summer.",
      ],
      meanings: ["openness", "calm", "optimism", "freedom"],
      usage: ["air travel", "childhood", "wellness", "backgrounds"],
    },
    // Periwinkle: light blue-violets.
    {
      criteria: {
        oklch: {
          h: [265, 295],
          c: [0.06, 0.5],
          l: [0.55, 0.85],
        },
      },
      descriptive: ["periwinkle"],
      nouns: ["periwinkle"],
      description: [
        "Periwinkle is a soft blue with a touch of lavender, named after the flower. It feels calm, airy and slightly dreamy, sitting exactly where blue turns into purple. In design it is a gentle alternative to sky blue with a little more character. Picture periwinkle as a hazy morning sky.",
      ],
      meanings: ["calm", "dreaminess", "gentleness", "serenity"],
      usage: ["stationery", "wellness", "pastel palettes", "bedding"],
    },
    // Indigo: never the majority term; a secondary name for vivid dark blue-violets.
    {
      criteria: {
        oklch: {
          h: [278, 295],
          c: [0.12, 0.5],
          l: [0.28, 0.55],
        },
      },
      descriptive: ["indigo"],
      nouns: ["indigo"],
      description: [
        "Indigo is deep and contemplative, sitting between blue's steadiness and purple's imagination. It can evoke twilight, ink, denim, and night skies—quiet, thoughtful, and a little mysterious. In design, indigo often feels sophisticated and layered, adding depth without the starkness of pure black. It can suggest introspection, tradition, or spirituality depending on context. Picture indigo as dusk settling in: calm, rich, and full of hidden detail.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "spirituality",
        "meditation",
        "denim",
        "night sky themes",
        "creative industries",
      ],
    },
    // Lavender / lilac: light purples.
    {
      criteria: {
        oklch: {
          h: [285, 325],
          c: [0.02, 0.13],
          l: [0.62, 0.95],
        },
      },
      descriptive: ["lavender", "lilac"],
      nouns: ["lavender"],
      description: [
        "Lavender is a soft, light purple that feels gentle and refined. It evokes lavender fields, spring blossoms, and soft fabric—calm, romantic, and slightly whimsical. In design, lavender adds a feminine, soothing touch without the intensity of deeper purples. It works well for wellness brands, cosmetics, and any context that wants to feel approachable and delicate. Picture lavender as a light haze of purple that softens everything it touches.",
      ],
      meanings: [
        "grace",
        "elegance",
        "calm",
        "femininity",
        "youth",
        "serenity",
        "refinement",
      ],
      usage: [
        "cosmetics",
        "wellness",
        "spring themes",
        "weddings",
        "children's products",
      ],
    },
    // Violet: the bluer, saturated purples.
    {
      criteria: {
        oklch: {
          h: [295, 318],
          c: [0.13, 0.5],
          l: [0.3, 0.75],
        },
      },
      descriptive: ["violet"],
      nouns: ["violet"],
      description: [
        "Violet is the bluer side of purple, the colour of the flower and the last band of the rainbow. It feels mystical, refined and a little cooler than purple proper. In design it reads as creative and spiritual, and it sits well next to blues. Picture violet as the sky a few minutes after sunset.",
      ],
      meanings: ["mystery", "creativity", "spirituality", "refinement"],
      usage: ["beauty", "spiritual", "creative", "fashion"],
    },
    // Vivid blue-violets at the blue boundary are violet as well.
    {
      criteria: {
        oklch: {
          h: [285, 295],
          c: [0.18, 0.5],
          l: [0.55, 0.8],
        },
      },
      descriptive: ["violet"],
      nouns: ["violet"],
      description: [
        "Violet is the bluer side of purple, the colour of the flower and the last band of the rainbow. It feels mystical, refined and a little cooler than purple proper. In design it reads as creative and spiritual, and it sits well next to blues. Picture violet as the sky a few minutes after sunset.",
      ],
      meanings: ["mystery", "creativity", "spirituality", "refinement"],
      usage: ["beauty", "spiritual", "creative", "fashion"],
    },
    // Magenta / fuchsia: only vivid; muted magenta hues are pink or purple.
    {
      criteria: {
        oklch: {
          h: [318, 360],
          c: [0.14, 0.5],
          l: [0.42, 0.72],
        },
      },
      descriptive: ["magenta", "fuchsia"],
      nouns: ["magenta"],
      description: [
        "Magenta is bold and expressive, often associated with creativity, intensity, and modern flair. It can feel like neon signage, stage lights, or vivid flowers—lively and unapologetic. In design, magenta is often used as a punchy accent to add energy and personality, especially in contemporary or playful palettes. It can read as romantic and warm, but also edgy and unconventional. Imagine magenta as a bright pulse that makes a layout feel instantly more alive.",
      ],
      meanings: [
        "support",
        "kind",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness",
      ],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "nightlife",
        "confectionery",
        "romance",
        "floral",
      ],
    },
    // Plum: dark reddish purples.
    {
      criteria: {
        oklch: {
          h: [325, 345],
          c: [0.05, 0.18],
          l: [0.25, 0.5],
        },
      },
      descriptive: ["plum"],
      nouns: ["plum"],
      description: [
        "Plum is a dark, rich purple with a hint of red, like the skin of the fruit. It feels deep, luxurious and grown-up, warmer than navy and softer than black. In design plum works as a dramatic dark or a moody accent. Picture plum as velvet in low light.",
      ],
      meanings: ["luxury", "depth", "maturity", "drama"],
      usage: ["fashion", "wine", "interiors", "cosmetics"],
    },
    // Dark dusky pink hues (wine, plum) are plum.
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.05, 0.16],
          l: [0.24, 0.45],
        },
      },
      descriptive: ["plum"],
      nouns: ["plum"],
      description: [
        "Plum is a dark, rich purple with a hint of red, like the skin of the fruit. It feels deep, luxurious and grown-up, warmer than navy and softer than black. In design plum works as a dramatic dark or a moody accent. Picture plum as velvet in low light.",
      ],
      meanings: ["luxury", "depth", "maturity", "drama"],
      usage: ["fashion", "wine", "interiors", "cosmetics"],
    },
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.05, 0.12],
          l: [0.45, 0.52],
        },
      },
      descriptive: ["plum"],
      nouns: ["plum"],
      description: [
        "Plum is a dark, rich purple with a hint of red, like the skin of the fruit. It feels deep, luxurious and grown-up, warmer than navy and softer than black. In design plum works as a dramatic dark or a moody accent. Picture plum as velvet in low light.",
      ],
      meanings: ["luxury", "depth", "maturity", "drama"],
      usage: ["fashion", "wine", "interiors", "cosmetics"],
    },
    {
      criteria: {
        oklch: {
          h: [0, 15],
          c: [0.05, 0.16],
          l: [0.24, 0.48],
        },
      },
      descriptive: ["plum"],
      nouns: ["plum"],
      description: [
        "Plum is a dark, rich purple with a hint of red, like the skin of the fruit. It feels deep, luxurious and grown-up, warmer than navy and softer than black. In design plum works as a dramatic dark or a moody accent. Picture plum as velvet in low light.",
      ],
      meanings: ["luxury", "depth", "maturity", "drama"],
      usage: ["fashion", "wine", "interiors", "cosmetics"],
    },
    // Dusky wines and plums around hue 0 carry a purple cast (second name).
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.05, 0.16],
          l: [0.28, 0.5],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.05, 0.1],
          l: [0.5, 0.53],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 10],
          c: [0.05, 0.16],
          l: [0.28, 0.5],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
    {
      criteria: {
        oklch: {
          h: [0, 10],
          c: [0.05, 0.1],
          l: [0.5, 0.53],
        },
      },
      descriptive: ["purple", "purplish", "violet"],
      nouns: ["purple"],
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene—adding depth, mood, and personality.",
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration",
      ],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture",
      ],
    },
  ],

  temperatures: [
    {
      value: 1800,
      descriptive: ["ultra warm"],
    },
    {
      value: 2400,
      descriptive: ["very warm"],
    },
    {
      value: 2700,
      descriptive: ["warm"],
    },
    {
      value: 3000,
      descriptive: ["warm white"],
    },
    {
      value: 4000,
      descriptive: ["neutral white"],
    },
    {
      value: 5000,
      descriptive: ["cool white"],
    },
    {
      value: 6500,
      descriptive: ["cool daylight"],
    },
    {
      value: 10000,
      descriptive: ["very cool"],
    },
  ],
  percentWords: [
    {
      maxPercentile: 0.06,
      word: "a dash of",
    },
    {
      maxPercentile: 0.16,
      word: "a little bit of",
    },
    {
      maxPercentile: 0.31,
      word: "some",
    },
    {
      maxPercentile: 0.56,
      word: "a good bit of",
    },
    {
      maxPercentile: 0.71,
      word: "a lot of",
    },
    {
      maxPercentile: 0.86,
      word: "a whole lot of",
    },
    {
      maxPercentile: 0.99,
      word: "nearly entirely",
    },
    {
      maxPercentile: 1,
      word: "entirely",
    },
  ],
};
