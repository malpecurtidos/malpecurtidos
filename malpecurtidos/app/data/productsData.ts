export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  images: string[];
}

export interface ThicknessRange {
  range: string;
  values: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  thickness: string;
  thicknessRange: ThicknessRange;
  articleType: string;
  style: string;
  gloss: string;
  grainType: string;
  variants: ProductVariant[];
  technicalSheet?: string;
  featured: boolean;
}

export const PRODUCT_FILTER_OPTIONS = {
  thickness: [
    "0.8 - 1.0 mm",
    "1.0 - 1.2 mm",
    "1.1 - 1.3 mm",
    "1.2 - 1.4 mm",
    "1.4 - 1.6 mm",
    "1.6 - 1.8 mm",
    "1.8 - 2.0 mm",
    "2.0 - 2.2 mm",
  ],
  articleType: ["Nubuck", "Crazy", "Pull up", "Napa", "Grabado", "Crack", "Wax", "Vegetalizado"],
  style: ["Western", "Rustic", "Tamboreado", "Exotico", "Fashion", "Especialidad", "Clasico"],
  gloss: ["Mate", "Semi mate", "Semi brillante", "Brillante", "Alto brillo"],
  grainType: ["Grabado", "Liso", "Grano natural", "Lado carne"],
} as const;

const THICKNESS_VALUES_BY_RANGE: Record<string, string[]> = {
  "0.8 - 1.0 mm": ["0.80 mm", "0.85 mm", "0.90 mm", "0.95 mm", "1.00 mm"],
  "1.0 - 1.2 mm": ["1.00 mm", "1.05 mm", "1.10 mm", "1.15 mm", "1.20 mm"],
  "1.1 - 1.3 mm": ["1.10 mm", "1.15 mm", "1.20 mm", "1.25 mm", "1.30 mm"],
  "1.2 - 1.4 mm": ["1.20 mm", "1.25 mm", "1.30 mm", "1.35 mm", "1.40 mm"],
  "1.4 - 1.6 mm": ["1.40 mm", "1.45 mm", "1.50 mm", "1.55 mm", "1.60 mm"],
  "1.6 - 1.8 mm": ["1.60 mm", "1.65 mm", "1.70 mm", "1.75 mm", "1.80 mm"],
  "1.8 - 2.0 mm": ["1.80 mm", "1.85 mm", "1.90 mm", "1.95 mm", "2.00 mm"],
  "2.0 - 2.2 mm": ["2.00 mm", "2.05 mm", "2.10 mm", "2.15 mm", "2.20 mm"],
};

interface VariantDefinition {
  slug: string;
  name: string;
  colorHex: string;
  fileSlug?: string;
}

interface ProductDefinition {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  thickness: string;
  articleType: string;
  style: string;
  gloss: string;
  grainType: string;
  imageFolder: string;
  variants: VariantDefinition[];
  featured?: boolean;
}

function buildVariantImagePath(folder: string, variantSlug: string) {
  const filename = encodeURIComponent(`${folder}-${variantSlug}`);
  return `/products-imgs/${folder}/${filename}.avif`;
}

function createProduct(definition: ProductDefinition): Product {
  return {
    id: definition.id,
    sku: definition.sku,
    name: definition.name,
    description: definition.description,
    category: definition.category,
    thickness: definition.thickness,
    thicknessRange: {
      range: definition.thickness,
      values: THICKNESS_VALUES_BY_RANGE[definition.thickness] ?? [definition.thickness],
    },
    articleType: definition.articleType,
    style: definition.style,
    gloss: definition.gloss,
    grainType: definition.grainType,
    variants: definition.variants.map((variant) => {
      const fileSlug = variant.fileSlug ?? variant.slug;
      return {
        id: `${definition.id}-${variant.slug}`,
        name: variant.name,
        colorHex: variant.colorHex,
        images: [buildVariantImagePath(definition.imageFolder, fileSlug)],
      };
    }),
    featured: Boolean(definition.featured),
  };
}

const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  {
    id: "atanado",
    sku: "MAL-ATN-001",
    name: "Atanado",
    description:
      "Cuero napa suave con acabado uniforme y tacto flexible, pensado para proyectos de marroquineria y calzado contemporaneo.",
    category: "marroquineria",
    thickness: "1.0 - 1.2 mm",
    articleType: "Napa",
    style: "Clasico",
    gloss: "Semi mate",
    grainType: "Liso",
    imageFolder: "atanado",
    featured: true,
    variants: [
      { slug: "cafe", name: "Cafe", colorHex: "#6F4E37" },
      { slug: "miel", name: "Miel", colorHex: "#B9894A" },
      { slug: "negro", name: "Negro", colorHex: "#111111" },
      { slug: "perla", name: "Perla", colorHex: "#D5D0C5" },
    ],
  },
  {
    id: "burgos",
    sku: "MAL-BRG-002",
    name: "Burgos",
    description:
      "Linea pull up de alto cuerpo con caracter natural. Ideal para botas y articulos que necesitan profundidad de tono y envejecimiento atractivo.",
    category: "calzado",
    thickness: "1.4 - 1.6 mm",
    articleType: "Pull up",
    style: "Rustic",
    gloss: "Semi brillante",
    grainType: "Grano natural",
    imageFolder: "burgos",
    featured: true,
    variants: [
      { slug: "beige", name: "Beige", colorHex: "#C8AD7F" },
      { slug: "brandy", name: "Brandy", colorHex: "#874C05" },
      { slug: "cognac", name: "Cognac", colorHex: "#9A5F2D" },
      { slug: "miel", name: "Miel", colorHex: "#C08A4A" },
      { slug: "negro", name: "Negro", colorHex: "#121212" },
      { slug: "ochre", name: "Ochre", colorHex: "#B47E2E" },
      { slug: "redearth", name: "Red Earth", colorHex: "#7D3A2F" },
      { slug: "waxpaper", name: "Wax Paper", colorHex: "#B89E72" },
    ],
  },
  {
    id: "golden",
    sku: "MAL-GLD-003",
    name: "Golden",
    description:
      "Articulo grabado con look fashion y brillo controlado, recomendado para lineas diferenciadas en bolsos, accesorios y calzado premium.",
    category: "marroquineria",
    thickness: "1.2 - 1.4 mm",
    articleType: "Grabado",
    style: "Exotico",
    gloss: "Brillante",
    grainType: "Grabado",
    imageFolder: "golden",
    featured: true,
    variants: [
      { slug: "cherry", name: "Cherry", colorHex: "#8D1D2C" },
      { slug: "darkolive", name: "Dark Olive", colorHex: "#4B5320" },
      { slug: "indigo", name: "Indigo", colorHex: "#33416F" },
      { slug: "retro", name: "Retro", colorHex: "#8C5E3C" },
      { slug: "shedron", name: "Shedron", colorHex: "#A25F2A" },
    ],
  },
  {
    id: "himalaya",
    sku: "MAL-HIM-004",
    name: "Himalaya",
    description:
      "Cuero crazy de alto rendimiento para calzado robusto, con tonos profundos y gran resistencia al uso continuo.",
    category: "calzado",
    thickness: "1.6 - 1.8 mm",
    articleType: "Crazy",
    style: "Western",
    gloss: "Mate",
    grainType: "Grano natural",
    imageFolder: "himalaya",
    variants: [
      { slug: "cedro", name: "Cedro", colorHex: "#8A5A44" },
      { slug: "darkolive", name: "Dark Olive", colorHex: "#556B2F" },
      { slug: "ferrari", name: "Ferrari", colorHex: "#C21807" },
      { slug: "negro", name: "Negro", colorHex: "#111111" },
      { slug: "ochre", name: "Ochre", colorHex: "#B37A2C" },
      { slug: "primalgreen", name: "Primal Green", colorHex: "#2E6B3B" },
      { slug: "redearth", name: "Red Earth", colorHex: "#7A3B2E" },
      { slug: "softgrass", name: "Soft Grass", colorHex: "#7A8B5B" },
      { slug: "steelblue", name: "Steel Blue", colorHex: "#3E5C76" },
    ],
  },
  {
    id: "milano",
    sku: "MAL-MLN-005",
    name: "Milano",
    description:
      "Napa de perfil fashion con paleta vibrante. Funciona especialmente bien en colecciones modernas de bolsos y sneaker lifestyle.",
    category: "confeccion",
    thickness: "1.0 - 1.2 mm",
    articleType: "Napa",
    style: "Fashion",
    gloss: "Semi brillante",
    grainType: "Liso",
    imageFolder: "milano",
    variants: [
      { slug: "electricorange", name: "Electric Orange", colorHex: "#F36F21" },
      { slug: "freshpurple", name: "Fresh Purple", colorHex: "#6F42C1" },
      { slug: "greenglow", name: "Green Glow", colorHex: "#4CAF50" },
      { slug: "steelblue", name: "Steel Blue", colorHex: "#4682B4" },
      { slug: "timberland", name: "Timberland", colorHex: "#A1703A" },
      { slug: "turquoise", name: "Turquoise", colorHex: "#2CA6A4" },
    ],
  },
  {
    id: "phoenix",
    sku: "MAL-PHX-006",
    name: "Phoenix",
    description:
      "Articulo encerado de inspiracion western, con excelente respuesta al cepillado y gran presencia visual en botas y accesorios.",
    category: "calzado",
    thickness: "1.4 - 1.6 mm",
    articleType: "Wax",
    style: "Western",
    gloss: "Semi brillante",
    grainType: "Grano natural",
    imageFolder: "phoenix",
    featured: true,
    variants: [
      { slug: "cognac", name: "Cognac", colorHex: "#9A5F2D" },
      { slug: "grass", name: "Grass", colorHex: "#5C7A3A" },
      { slug: "negro", name: "Negro", colorHex: "#111111" },
      { slug: "waxpaper", name: "Wax Paper", colorHex: "#B8A27A" },
    ],
  },
  {
    id: "seville",
    sku: "MAL-SEV-007",
    name: "Seville",
    description:
      "Napa clasica con tonos sobrios y consistencia de lote, adecuada para mobiliario, marroquineria fina y colecciones corporativas.",
    category: "tapiceria-muebles",
    thickness: "1.0 - 1.2 mm",
    articleType: "Napa",
    style: "Clasico",
    gloss: "Semi mate",
    grainType: "Grano natural",
    imageFolder: "seville",
    variants: [
      { slug: "cedro", name: "Cedro", colorHex: "#8C5A3C" },
      { slug: "cherry", name: "Cherry", colorHex: "#7E2639" },
      { slug: "darkchoco", name: "Dark Choco", colorHex: "#4A3428" },
      { slug: "darkolive", name: "Dark Olive", colorHex: "#556B2F" },
      { slug: "mahogany", name: "Mahogany", colorHex: "#5C2E2E" },
      { slug: "negro", name: "Negro", colorHex: "#101010" },
    ],
  },
  {
    id: "taos",
    sku: "MAL-TAS-008",
    name: "Taos",
    description:
      "Cuero wax de apariencia robusta para lineas outdoor y western, con excelente comportamiento en uso rudo y acabados artesanales.",
    category: "calzado",
    thickness: "1.4 - 1.6 mm",
    articleType: "Wax",
    style: "Rustic",
    gloss: "Mate",
    grainType: "Grano natural",
    imageFolder: "taos",
    variants: [
      { slug: "cocoa", name: "Cocoa", colorHex: "#6B4B3E" },
      { slug: "cognac", name: "Cognac", colorHex: "#9A5F2D" },
      { slug: "negro", name: "Negro", colorHex: "#111111" },
      { slug: "ochre", name: "Ochre", colorHex: "#B67A2B" },
      { slug: "waxpaper", name: "Wax Paper", colorHex: "#B39A72" },
    ],
  },
  {
    id: "wizard",
    sku: "MAL-WZD-009",
    name: "Wizard",
    description:
      "Pull up de identidad marcada y tonos contrastantes, orientado a colecciones con look vintage y personalidad fuerte.",
    category: "marroquineria",
    thickness: "1.2 - 1.4 mm",
    articleType: "Pull up",
    style: "Rustic",
    gloss: "Semi brillante",
    grainType: "Grano natural",
    imageFolder: "wizard",
    variants: [
      { slug: "deepblue", name: "Deep Blue", colorHex: "#223A5E" },
      { slug: "ochre", name: "Ochre", colorHex: "#B37A2C" },
      { slug: "primalgreen", name: "Primal Green", colorHex: "#2E6B3B" },
      { slug: "redearth", name: "Red Earth", colorHex: "#7C3A2D" },
      { slug: "waxpaper", name: "Wax Paper", colorHex: "#B89E78" },
    ],
  },
  {
    id: "yellowstone",
    sku: "MAL-YLW-010",
    name: "Yellowstone",
    description:
      "Napa fashion de alto impacto visual, ideal para lineas urbanas y colecciones estacionales con colores expresivos.",
    category: "confeccion",
    thickness: "1.0 - 1.2 mm",
    articleType: "Napa",
    style: "Fashion",
    gloss: "Semi mate",
    grainType: "Liso",
    imageFolder: "yellowstone",
    variants: [
      { slug: "electricorange", name: "Electric Orange", colorHex: "#F36F21" },
      { slug: "freshpurple", name: "Fresh Purple", colorHex: "#7547CC" },
      { slug: "greenglow", name: "Green Glow", colorHex: "#56B34D" },
      { slug: "robustgrey", name: "Robust Grey", colorHex: "#6A6F73" },
      { slug: "tranquilturquoise", name: "Tranquil Turquoise", colorHex: "#2BA7A0" },
    ],
  },
];

export const products: Product[] = PRODUCT_DEFINITIONS.map(createProduct);
