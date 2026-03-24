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
    // Character words (hue-agnostic, based on OKLCH lightness & chroma)
    // Survey-informed L/C ranges from compound terms (dark X, pale X, etc.)
    // ===========================
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.15, 0.5],
          l: [0.45, 0.75],
        },
      },
      descriptive: [
        "saturated",
        "strong",
        "lush",
        "ablaze",
        "beaming",
        "bold",
        "brilliant",
        "flamboyant",
        "vibrant",
        "vivid",
        "loud",
      ],
      meanings: ["energy", "intensity", "excitement", "attention"],
      usage: ["highlights", "calls to action", "accents"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.18],
        },
      },
      descriptive: ["dark", "ashy", "somber", "bleak", "muddy", "sooty"],
      meanings: ["mystery", "seriousness", "depth", "gloom"],
      usage: ["backgrounds", "contrast", "moody designs"],
    },
    {
      // Survey: "dark X" terms span L 0.34–0.66 (p10–p90)
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.50],
        },
      },
      descriptive: ["dark", "dim", "gloomy", "dull"],
      meanings: ["mystery", "seriousness", "depth", "gloom"],
      usage: ["backgrounds", "contrast", "moody designs"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.02, 0.12],
          l: [0.25, 0.65],
        },
      },
      descriptive: ["bleak", "muted", "matte", "dusty"],
      meanings: ["subtlety", "calm", "understatement"],
      usage: ["backgrounds", "supporting elements"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.02, 0.5],
          l: [0.75, 1],
        },
      },
      descriptive: ["tinted"],
    },
    {
      // Survey: "pastel X" terms span L 0.70–0.85, C 0.08–0.13
      criteria: {
        oklch: {
          h: null,
          c: [0.04, 0.13],
          l: [0.70, 0.96],
        },
      },
      descriptive: ["pastel"],
      meanings: ["softness", "peace", "gentleness", "youth"],
      usage: ["backgrounds", "spring themes", "baby products"],
    },
    {
      // Survey: "pale X" terms span L 0.68–0.92, C 0.07–0.12
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.80, 1.001],
        },
      },
      descriptive: [
        "pale",
        "light",
        "faded",
        "delicate",
        "glistening",
        "bleached",
      ],
      meanings: ["delicacy", "fragility", "cleanliness", "airiness"],
      usage: ["backgrounds", "minimalism", "open space"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0.08, 0.5],
          l: [0.75, 0.92],
        },
      },
      descriptive: [
        "fresh",
        "sparkling",
        "glittering",
        "glowing",
        "jazzy",
        "opalescent",
      ],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.02],
          l: [0.92, 1],
        },
      },
      descriptive: ["neutral"],
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
          c: null,
          l: [0.999, 1.001],
        },
      },
      descriptive: ["colorless", "bright", "brilliant", "high"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.001],
        },
      },
      descriptive: ["colorless", "low", "dark"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.01],
          l: null,
        },
      },
      descriptive: ["colorless", "neutral"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.09, 0.50],
        },
      },
      descriptive: ["shady"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.08],
          l: [0, 0.85],
        },
      },
      descriptive: ["ashy", "dusty"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.05, 0.18],
        },
      },
      descriptive: ["almost black"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0.0, 0.10],
        },
      },
      descriptive: ["black"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: null,
          l: [0, 0.20],
        },
      },
      descriptive: ["very dark"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.06],
          l: [0, 0.38],
        },
      },
      descriptive: ["dark"],
    },
    {
      // Survey: "deep X" terms at L 0.39–0.42, C 0.09–0.21
      criteria: {
        oklch: {
          h: null,
          c: [0.02, 0.10],
          l: [0, 0.55],
        },
      },
      descriptive: ["dark", "inky", "dim", "gloomy"],
    },
    {
      criteria: {
        oklch: {
          h: null,
          c: [0, 0.01],
          l: [0.15, 0.98],
        },
      },
      descriptive: ["grey"],
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
          c: [0.035, 0.07],
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
          l: [0.45, 0.70],
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

    // Survey-informed character words: deep, bright, neon
    {
      // Survey: "deep X" at L 0.39–0.42, C 0.09–0.21
      criteria: {
        oklch: {
          h: null,
          c: [0.08, 0.5],
          l: [0.25, 0.45],
        },
      },
      descriptive: ["deep"],
    },
    {
      // Survey: "bright X" at L 0.58–0.82, C 0.17–0.24
      criteria: {
        oklch: {
          h: null,
          c: [0.15, 0.5],
          l: [0.55, 0.85],
        },
      },
      descriptive: ["bright"],
    },
    {
      // Survey: "neon X" at L 0.60–0.93, C 0.14–0.26
      criteria: {
        oklch: {
          h: null,
          c: [0.14, 0.5],
          l: [0.70, 0.95],
        },
      },
      descriptive: ["neon"],
    },

    // ===========================
    // Warm / Cool (OKLCH hue-based)
    // ===========================
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
      usage: [
        "intimidate",
        "authority",
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
    // Hue names — survey-informed OKLCH boundaries
    // Centroids and boundaries from ~49K English responses (Kim et al. 2019)
    // ===========================

    // Red — survey centroid H=25°, 3811 responses
    {
      criteria: {
        oklch: {
          h: [7, 40],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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
      usage: [
        "stimulate",
        "create urgency",
        "draw attention",
        "caution",
        "encourage",
        "excite",
        "food industry",
        "sports",
        "sales",
        "entertainment",
        "romance",
        "emergency services",
      ],
    },

    // Orange — survey centroid H=55°, 3126 responses
    {
      criteria: {
        oklch: {
          h: [40, 80],
          c: [0.01, 0.5],
          l: [0.50, 0.99],
        },
      },
      descriptive: ["orange"],
      nouns: ["orange"],
      description: [
        "Orange feels warm, friendly, and optimistic—like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in.",
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      usage: [
        "stimulate",
        "draw attention",
        "express freedom",
        "fascinate",
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween",
      ],
    },

    // Brown — survey centroid H=58°, L=0.50, C=0.08, 4605 responses
    {
      criteria: {
        oklch: {
          h: [40, 80],
          c: [0.01, 0.5],
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

    // Beige — survey centroid H=84°, L=0.80, C=0.065, 914 responses
    {
      criteria: {
        oklch: {
          h: [70, 105],
          c: [0.02, 0.08],
          l: [0.78, 0.97],
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

    // Yellow — survey centroid H=106°, 2633 responses
    {
      criteria: {
        oklch: {
          h: [80, 120],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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
      usage: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "sale",
        "cheap",
        "budget",
        "construction",
        "convey competence",
      ],
    },

    // Lime — survey centroid H=134°, 768 responses
    {
      criteria: {
        oklch: {
          h: [120, 138],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["lime"],
      nouns: ["lime"],
      description: [
        "Lime is a sharp, zesty green-yellow that feels fresh and high-energy. It can evoke citrus, neon signs, sportswear, or new leaves—bright, youthful, and a little electric. In design, lime is often used to signal novelty, motion, and visibility, especially as an accent or highlight. It can read as playful and modern, but it can also feel loud if overused. Picture lime as a vivid splash that wakes up a palette instantly.",
      ],
      meanings: ["growth", "harmony", "fertility", "kindness", "dependability"],
      usage: [
        "restore energy",
        "promote growth",
        "awake awareness",
        "rejuvenate",
        "nature",
        "energy drinks",
        "sports",
        "gaming",
      ],
    },

    // Green — survey centroid H=143°, 11902 responses
    {
      criteria: {
        oklch: {
          h: [138, 163],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["green", "greenish"],
      nouns: ["green"],
      description: [
        "Green is strongly associated with nature, growth, and renewal—grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and \"safe/ok\" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.",
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      usage: [
        "relax",
        "balance",
        "revitalize",
        "encourage",
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco",
      ],
    },

    // Teal — survey centroid H=183°, 2646 responses
    {
      criteria: {
        oklch: {
          h: [163, 190],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality",
      ],
    },

    // Cyan — survey centroid H=198°, 878 responses
    {
      criteria: {
        oklch: {
          h: [190, 228],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["cyan"],
      nouns: ["cyan", "sky blue"],
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
      usage: [
        "self-expression",
        "communication",
        "children's products",
        "technology",
        "aerospace",
        "entertainment",
        "productivity",
      ],
    },

    // Blue — survey centroid H=257°, 9554 responses
    {
      criteria: {
        oklch: {
          h: [228, 271],
          c: [0.01, 0.5],
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
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
      ],
    },

    // Indigo — survey centroid H=285°, 845 responses
    {
      criteria: {
        oklch: {
          h: [271, 285],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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

    // Purple — survey centroid H=312°, 9896 responses (absorbs violet at H=309°)
    {
      criteria: {
        oklch: {
          h: [285, 327],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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

    // Magenta — survey centroid H=341°, 2673 responses
    {
      criteria: {
        oklch: {
          h: [327, 345],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
        },
      },
      descriptive: ["magenta"],
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

    // Pink — survey centroid H=349°, 5958 responses (wraps around 0°)
    {
      criteria: {
        oklch: {
          h: [345, 360],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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
          h: [0, 7],
          c: [0.01, 0.5],
          l: [0.15, 0.99],
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
        "nightlife",
        "confectionery",
        "romance",
        "floral",
      ],
    },

    // Brick red — terracotta tones in the red range
    {
      criteria: {
        oklch: {
          h: [10, 35],
          c: [0.10, 0.17],
          l: [0.45, 0.65],
        },
      },
      descriptive: ["brick red", "terracotta"],
      nouns: ["brick red"],
      description: [
        "Brick red is a warm, earthy shade that sits between red and brown. Its connection to natural clay and masonry gives it a sense of groundedness and stability, while its red undertones retain a touch of boldness. In design, it evokes rustic charm, autumn warmth, and traditional craftsmanship.",
      ],
      meanings: [
        "groundedness",
        "boldness",
        "confidence",
        "warmth",
        "stability",
        "rustic",
      ],
      usage: [
        "rustic design",
        "autumn themes",
        "traditional aesthetics",
        "warm accents",
      ],
    },

    // Maroon — survey centroid H=13°, L=0.42, C=0.13, 1424 responses
    // Dark red, like brown is dark orange
    {
      criteria: {
        oklch: {
          h: [7, 40],
          c: [0.05, 0.5],
          l: [0.15, 0.45],
        },
      },
      descriptive: ["maroon"],
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

    // Navy — survey centroid H=268°, L=0.35, C=0.11, 865 responses
    // Dark blue
    {
      criteria: {
        oklch: {
          h: [228, 285],
          c: [0.05, 0.5],
          l: [0.15, 0.42],
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

    // Olive — survey centroid H=117°, L=0.63, C=0.11, 736 responses
    // Dark/muted yellow-green
    {
      criteria: {
        oklch: {
          h: [80, 138],
          c: [0.03, 0.13],
          l: [0.35, 0.68],
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

    // Lavender — survey centroid H=307°, L=0.70, C=0.11, 1591 responses
    // Light/pale purple
    {
      criteria: {
        oklch: {
          h: [285, 327],
          c: [0.03, 0.14],
          l: [0.62, 0.88],
        },
      },
      descriptive: ["lavender"],
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
