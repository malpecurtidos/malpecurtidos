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
  imagePrefix?: string;
  variants: VariantDefinition[];
  featured?: boolean;
}

function buildVariantImagePath(folder: string, imagePrefix: string, variantSlug: string) {
  const filename = `${imagePrefix}_${variantSlug}`;
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
      const imagePrefix = definition.imagePrefix ?? definition.imageFolder;
      return {
        id: `${definition.id}-${variant.slug}`,
        name: variant.name,
        colorHex: variant.colorHex,
        images: [buildVariantImagePath(definition.imageFolder, imagePrefix, fileSlug)],
      };
    }),
    featured: Boolean(definition.featured),
  };
}

const COLOR_HEX_BY_VARIANT: Record<string, string> = {
  arena: "#C8B38B",
  bean: "#6F4E37",
  birch: "#D9C8A6",
  black: "#111111",
  bluesteel: "#4F6475",
  bone: "#E8E1D1",
  brightemerald: "#2ECC71",
  brown: "#7A4E2D",
  caramel: "#B97841",
  charcoal: "#36454F",
  cherry: "#8A1C2F",
  choco: "#4A2E1F",
  cocoa: "#6B4B3E",
  coffee: "#5B3A29",
  cogñac: "#9A5F2D",
  cobalt: "#0047AB",
  coldbrew: "#4B3621",
  darkchoco: "#3B2A20",
  darkolive: "#556B2F",
  deepblue: "#1F3B73",
  electrico: "#007BFF",
  electricorange: "#F36F21",
  emerald: "#2E8B57",
  expreso: "#4E342E",
  freshpurple: "#7D3C98",
  golden: "#C09A3E",
  greenglow: "#5AB552",
  grey: "#808080",
  grimm: "#5A5E63",
  indigo: "#33416F",
  jade: "#00A86B",
  magenta: "#C2185B",
  mango: "#FFB347",
  negro: "#111111",
  oak: "#8A5A3B",
  ochre: "#B8860B",
  pina: "#E6D37A",
  pistache: "#93C572",
  pitufo: "#1E5AA8",
  primalgreen: "#2E6B3B",
  raspberrypink: "#D72672",
  red: "#B22222",
  roble: "#6E4B2A",
  rojo: "#C0392B",
  sand: "#D2B48C",
  sepia: "#704214",
  steelblue: "#4C6E8A",
  tabaco: "#8B5E3C",
  tan: "#C69055",
  tangerine: "#F28500",
  turquoise: "#2CA6A4",
  verdemilitar: "#556B2F",
  zafiro: "#0F52BA",
};

const PRODUCT_NAME_OVERRIDES: Record<string, string> = {
  castaña: "Castana",
  fieldersChoice: "Fielders Choice",
};

const PRODUCT_SOURCES: Array<{ id: string; folder: string; imagePrefix?: string; variants: string[] }> = [
  { id: "abiyan", folder: "abiyan", variants: ["cogñac", "grimm", "sepia", "verdemilitar"] },
  { id: "baku", folder: "baku", variants: ["cogñac", "coldbrew", "oak", "tan"] },
  { id: "bison", folder: "bison", variants: ["bluesteel", "bone", "cocoa", "golden", "primalgreen"] },
  { id: "briana", folder: "briana", variants: ["deepblue", "emerald", "freshpurple", "jade", "red"] },
  { id: "cairo", folder: "cairo", variants: ["bone", "cocoa", "golden", "primalgreen", "steelblue"] },
  { id: "castana", folder: "castaña", variants: ["bean", "black", "brown", "coffee", "red"] },
  { id: "castellon", folder: "castellon", variants: ["choco", "pitufo", "rojo", "zafiro"] },
  { id: "cody", folder: "cody", variants: ["black", "brown", "sand"] },
  { id: "crazy", folder: "crazy", variants: ["choco", "mango", "roble", "tabaco", "tan"] },
  { id: "cupra", folder: "cupra", variants: ["bean", "black", "brown", "coffee", "red"] },
  { id: "desert", folder: "desert", variants: ["expreso", "negro", "turquoise"] },
  { id: "falcon", folder: "falcon", variants: ["brightemerald", "electricorange", "greenglow", "ochre", "raspberrypink"] },
  { id: "fielderschoice", folder: "fieldersChoice", imagePrefix: "fielderschoice", variants: ["arena", "mango"] },
  { id: "glaciar", folder: "glaciar", variants: ["bone", "cocoa", "golden", "primalgreen", "steelblue"] },
  { id: "gobi", folder: "gobi", variants: ["bone", "cocoa", "golden", "primalgreen", "steelblue"] },
  { id: "jurasic", folder: "jurasic", variants: ["bone", "cocoa", "golden", "primalgreen", "steelblue"] },
  { id: "mamut", folder: "mamut", variants: ["bone", "cocoa", "golden", "grimm", "primalgreen", "steelblue"] },
  { id: "maverick", folder: "maverick", variants: ["cobalt", "greenglow", "raspberrypink", "tangerine", "turquoise"] },
  { id: "monet", folder: "monet", variants: ["electrico", "magenta", "piña", "pistache", "rojo"] },
  { id: "mykonos", folder: "mykonos", variants: ["bean", "black", "brown", "coffee", "red"] },
  { id: "praga", folder: "praga", variants: ["electrico", "magenta", "piña", "pistache", "rojo"] },
  { id: "pretoria", folder: "pretoria", variants: ["black", "bone", "cocoa", "golden", "grey", "primalgreen", "steelblue"] },
  { id: "safari", folder: "safari", variants: ["birch", "cherry", "cogñac", "darkchoco", "darkolive", "grimm", "indigo", "sepia", "verdemilitar"] },
  { id: "tuskey", folder: "tuskey", variants: ["bone", "caramel", "charcoal", "cherry", "cogñac", "darkchoco", "darkolive", "indigo"] },
  { id: "wakanda", folder: "wakanda", variants: ["bone", "cocoa", "golden", "primalgreen", "steelblue"] },
];

function toLabel(value: string) {
  return value
    .replace(/ñ/g, "n")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getVariantColorHex(slug: string) {
  const normalized = slug.replace(/ñ/g, "n").toLowerCase();
  return COLOR_HEX_BY_VARIANT[slug] ?? COLOR_HEX_BY_VARIANT[normalized] ?? "#7A6A58";
}

const PRODUCT_DEFINITIONS: ProductDefinition[] = PRODUCT_SOURCES.map((source, index) => ({
  id: source.id,
  sku: `MAL-${String(index + 1).padStart(3, "0")}`,
  name: PRODUCT_NAME_OVERRIDES[source.folder] ?? toLabel(source.folder),
  description: "Piel premium disponible en multiples colores para calzado y marroquineria.",
  category: "marroquineria",
  thickness: "1.2 - 1.4 mm",
  articleType: "Napa",
  style: "Clasico",
  gloss: "Semi mate",
  grainType: "Grano natural",
  imageFolder: source.folder,
  imagePrefix: source.imagePrefix,
  featured: index < 8,
  variants: source.variants.map((variantSlug) => ({
    slug: variantSlug,
    name: toLabel(variantSlug),
    colorHex: getVariantColorHex(variantSlug),
  })),
}));

export const products: Product[] = PRODUCT_DEFINITIONS.map(createProduct);
