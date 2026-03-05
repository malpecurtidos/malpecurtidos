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

function buildVariantImagePath(
  folder: string,
  imagePrefix: string,
  variantSlug: string,
  fileSlug?: string,
) {
  const filename = fileSlug ?? `${imagePrefix}_${variantSlug}`;
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
      const imagePrefix = definition.imagePrefix ?? definition.imageFolder;
      return {
        id: `${definition.id}-${variant.slug}`,
        name: variant.name,
        colorHex: variant.colorHex,
        images: [buildVariantImagePath(definition.imageFolder, imagePrefix, variant.slug, variant.fileSlug)],
      };
    }),
    featured: Boolean(definition.featured),
  };
}

const COLOR_HEX_BY_VARIANT: Record<string, string> = {
  arena: "#C8B38B",
  bean: "#6F4E37",
  beige: "#C8AD7F",
  birch: "#D9C8A6",
  black: "#111111",
  bluesteel: "#4F6475",
  bone: "#E8E1D1",
  brandy: "#874C05",
  brightemerald: "#2ECC71",
  brown: "#7A4E2D",
  burgundy: "#6E2636",
  cafe: "#6F4E37",
  canela: "#A56B46",
  caoba: "#5B2C1E",
  caouccino: "#8B5E3C",
  caramel: "#B97841",
  cedro: "#8A5A44",
  charcoal: "#36454F",
  cherry: "#8A1C2F",
  choco: "#4A2E1F",
  chocolate: "#4A2E1F",
  cobalt: "#0047AB",
  cocoa: "#6B4B3E",
  coffee: "#5B3A29",
  cognac: "#9A5F2D",
  coldbrew: "#4B3621",
  darkbrown: "#4B3025",
  darkchoco: "#3B2A20",
  darkolive: "#556B2F",
  deepblue: "#1F3B73",
  electrico: "#007BFF",
  electricorange: "#F36F21",
  emerald: "#2E8B57",
  expreso: "#4E342E",
  ferrari: "#C21807",
  freshpurple: "#7D3C98",
  golden: "#C09A3E",
  grass: "#5C7A3A",
  greenglow: "#5AB552",
  grey: "#808080",
  grimm: "#5A5E63",
  grisoscuro: "#3F4144",
  hueso: "#E6D9C4",
  indigo: "#33416F",
  jade: "#00A86B",
  magenta: "#C2185B",
  mahogany: "#5C2E2E",
  mango: "#FFB347",
  marfil: "#F0EAD6",
  miel: "#C08A4A",
  negro: "#111111",
  niquel: "#8A8F98",
  oak: "#8A5A3B",
  ochre: "#B8860B",
  olive: "#556B2F",
  ororosa: "#B76E79",
  peltre: "#70777B",
  perla: "#D5D0C5",
  pina: "#E6D37A",
  pistache: "#93C572",
  pitufo: "#1E5AA8",
  plata: "#C0C0C0",
  primalgreen: "#2E6B3B",
  raspberrypink: "#D72672",
  red: "#B22222",
  redearth: "#7D3A2F",
  retro: "#8C5E3C",
  roble: "#6E4B2A",
  robustgrey: "#6A6F73",
  rojo: "#C0392B",
  rojoquemado: "#8A3B2D",
  sand: "#D2B48C",
  sepia: "#704214",
  shedron: "#A25F2A",
  softgrass: "#7A8B5B",
  steelblue: "#4C6E8A",
  sublimegreen: "#6B8E23",
  tabaco: "#8B5E3C",
  tan: "#C69055",
  tangerine: "#F28500",
  tibetanred: "#A13D2D",
  timberland: "#A1703A",
  tranquilturquoise: "#2BA7A0",
  turquoise: "#2CA6A4",
  verde: "#2E8B57",
  verdemilitar: "#556B2F",
  vino: "#722F37",
  waxpaper: "#B89E78",
  zafiro: "#0F52BA",
};

interface ProductSourceVariant {
  slug: string;
  fileSlug?: string;
}

const PRODUCT_SOURCES: Array<{ id: string; folder: string; imagePrefix?: string; variants: ProductSourceVariant[] }> = [
  { id: "abiyan", folder: "abiyan", variants: [{ slug: "cogñac" }, { slug: "grimm" }, { slug: "sepia" }, { slug: "verdemilitar" }] },
  { id: "atanado", folder: "atanado", variants: [{ slug: "cafe" }, { slug: "miel" }, { slug: "negro" }, { slug: "perla" }] },
  { id: "baku", folder: "baku", variants: [{ slug: "cogñac" }, { slug: "coldbrew" }, { slug: "oak" }, { slug: "tan" }] },
  { id: "bensoncharol", folder: "bensonCharol", imagePrefix: "bensoncharol", variants: [{ slug: "caouccino" }, { slug: "chocolate" }, { slug: "hueso" }, { slug: "negro" }, { slug: "rojo" }] },
  { id: "bensonmetalic", folder: "bensonMetalic", imagePrefix: "bensonmetalic", variants: [{ slug: "beige" }, { slug: "niquel" }, { slug: "peltre" }, { slug: "plata" }] },
  { id: "berlin", folder: "berlin", variants: [{ slug: "beige" }, { slug: "brandy" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }, { slug: "ochre" }, { slug: "redearth" }, { slug: "waxpaper" }] },
  { id: "bison", folder: "bison", variants: [{ slug: "bluesteel" }, { slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }] },
  { id: "briana", folder: "briana", variants: [{ slug: "deepblue" }, { slug: "emerald" }, { slug: "freshpurple" }, { slug: "jade" }, { slug: "red" }] },
  { id: "burgos", folder: "burgos", variants: [{ slug: "beige" }, { slug: "brandy" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }, { slug: "ochre" }, { slug: "redearth" }, { slug: "waxpaper" }] },
  { id: "caiman", folder: "caiman", imagePrefix: "caimancharol", variants: [{ slug: "negro" }, { slug: "cafe", fileSlug: "caimanlux_cafe" }] },
  { id: "cairo", folder: "cairo", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "cascabelmetalic", folder: "cascabelMetalic", imagePrefix: "cascabelmetalic", variants: [{ slug: "niquel" }, { slug: "ororosa" }, { slug: "peltre" }, { slug: "plata" }] },
  { id: "castana", folder: "castaña", variants: [{ slug: "bean" }, { slug: "black" }, { slug: "brown" }, { slug: "coffee" }, { slug: "red" }] },
  { id: "castellon", folder: "castellon", variants: [{ slug: "choco" }, { slug: "pitufo" }, { slug: "rojo" }, { slug: "zafiro" }] },
  { id: "charoltamboreado", folder: "charolTamboreado", imagePrefix: "charoltamboreado", variants: [{ slug: "beige" }, { slug: "negro" }, { slug: "rojo" }, { slug: "vino" }] },
  { id: "cobra", folder: "cobra", variants: [{ slug: "cogñac" }, { slug: "marfil" }, { slug: "negro" }] },
  { id: "cobracharol", folder: "cobraCharol", imagePrefix: "cobracharol", variants: [{ slug: "negro" }, { slug: "rojo" }, { slug: "verde" }, { slug: "canela", fileSlug: "cobracharollux_canela" }] },
  { id: "cobralux", folder: "cobraLux", imagePrefix: "cobralux", variants: [{ slug: "burgundy" }, { slug: "darkbrown" }, { slug: "grisoscuro" }] },
  { id: "cody", folder: "cody", variants: [{ slug: "black" }, { slug: "brown" }, { slug: "sand" }] },
  { id: "crazy", folder: "crazy", variants: [{ slug: "choco" }, { slug: "mango" }, { slug: "roble" }, { slug: "tabaco" }, { slug: "tan" }] },
  { id: "crocco", folder: "crocco", imagePrefix: "croccolux", variants: [{ slug: "negro", fileSlug: "croccocharol_negro" }, { slug: "rojoquemado" }, { slug: "tabaco" }] },
  { id: "cupra", folder: "cupra", variants: [{ slug: "bean" }, { slug: "black" }, { slug: "brown" }, { slug: "coffee" }, { slug: "red" }] },
  { id: "desert", folder: "desert", variants: [{ slug: "expreso" }, { slug: "negro" }, { slug: "turquoise" }] },
  { id: "falcon", folder: "falcon", variants: [{ slug: "brightemerald" }, { slug: "electricorange" }, { slug: "greenglow" }, { slug: "ochre" }, { slug: "raspberrypink" }] },
  { id: "fielderschoice", folder: "fieldersChoice", imagePrefix: "fielderschoice", variants: [{ slug: "arena" }, { slug: "mango" }] },
  { id: "glaciar", folder: "glaciar", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "gobi", folder: "gobi", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "golden", folder: "golden", variants: [{ slug: "cherry" }, { slug: "darkolive" }, { slug: "indigo" }, { slug: "retro" }, { slug: "shedron" }] },
  { id: "habana", folder: "habana", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }] },
  { id: "himalaya", folder: "himalaya", variants: [{ slug: "cedro" }, { slug: "darkolive" }, { slug: "ferrari" }, { slug: "negro" }, { slug: "ochre" }, { slug: "primalgreen" }, { slug: "redearth" }, { slug: "softgrass" }, { slug: "steelblue" }] },
  { id: "hindi", folder: "hindi", variants: [{ slug: "beige" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "ochre" }, { slug: "redearth" }, { slug: "waxpaper" }] },
  { id: "jurasic", folder: "jurasic", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "koblenz", folder: "koblenz", variants: [{ slug: "beige" }, { slug: "brandy" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }] },
  { id: "leopardo", folder: "leopardo", imagePrefix: "leopardocrack", variants: [{ slug: "miel" }] },
  { id: "luxcrack", folder: "luxCrack", imagePrefix: "luxcrack", variants: [{ slug: "negro" }, { slug: "niquel" }, { slug: "peltre" }, { slug: "plata" }] },
  { id: "luxury", folder: "luxury", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }] },
  { id: "mamut", folder: "mamut", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "grimm" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "maverick", folder: "maverick", variants: [{ slug: "cobalt" }, { slug: "greenglow" }, { slug: "raspberrypink" }, { slug: "tangerine" }, { slug: "turquoise" }] },
  { id: "milano", folder: "milano", variants: [{ slug: "electricorange" }, { slug: "freshpurple" }, { slug: "greenglow" }, { slug: "steelblue" }, { slug: "timberland" }, { slug: "turquoise" }] },
  { id: "monet", folder: "monet", variants: [{ slug: "electrico" }, { slug: "magenta" }, { slug: "piña" }, { slug: "pistache" }, { slug: "rojo" }] },
  { id: "mykonos", folder: "mykonos", variants: [{ slug: "bean" }, { slug: "black" }, { slug: "brown" }, { slug: "coffee" }, { slug: "red" }] },
  { id: "phoenix", folder: "phoenix", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "grass" }, { slug: "negro" }, { slug: "waxpaper" }] },
  { id: "portugal", folder: "portugal", variants: [{ slug: "caoba" }, { slug: "negro" }, { slug: "tabaco" }] },
  { id: "praga", folder: "praga", variants: [{ slug: "electrico" }, { slug: "magenta" }, { slug: "piña" }, { slug: "pistache" }, { slug: "rojo" }] },
  { id: "pretoria", folder: "pretoria", variants: [{ slug: "black" }, { slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "grey" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "quetzal", folder: "quetzal", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }] },
  { id: "safari", folder: "safari", variants: [{ slug: "birch" }, { slug: "cherry" }, { slug: "cogñac" }, { slug: "darkchoco" }, { slug: "darkolive" }, { slug: "grimm" }, { slug: "indigo" }, { slug: "sepia" }, { slug: "verdemilitar" }] },
  { id: "senna", folder: "senna", variants: [{ slug: "ochre" }, { slug: "robustgrey" }, { slug: "softgrass" }, { slug: "sublimegreen" }, { slug: "waxpaper" }] },
  { id: "seville", folder: "seville", variants: [{ slug: "cedro" }, { slug: "cherry" }, { slug: "darkchoco" }, { slug: "darkolive" }, { slug: "mahogany" }, { slug: "negro" }] },
  { id: "stanford", folder: "stanford", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "miel" }, { slug: "negro" }] },
  { id: "storm", folder: "storm", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "negro" }, { slug: "primalgreen" }, { slug: "tibetanred" }] },
  { id: "taos", folder: "taos", variants: [{ slug: "cocoa" }, { slug: "cogñac" }, { slug: "negro" }, { slug: "ochre" }, { slug: "waxpaper" }] },
  { id: "tuskey", folder: "tuskey", variants: [{ slug: "bone" }, { slug: "caramel" }, { slug: "charcoal" }, { slug: "cherry" }, { slug: "cogñac" }, { slug: "darkchoco" }, { slug: "darkolive" }, { slug: "indigo" }] },
  { id: "wakanda", folder: "wakanda", variants: [{ slug: "bone" }, { slug: "cocoa" }, { slug: "golden" }, { slug: "primalgreen" }, { slug: "steelblue" }] },
  { id: "wizard", folder: "wizard", variants: [{ slug: "deepblue" }, { slug: "ochre" }, { slug: "primalgreen" }, { slug: "redearth" }, { slug: "waxpaper" }] },
  { id: "yellowstone", folder: "yellowstone", variants: [{ slug: "electricorange" }, { slug: "freshpurple" }, { slug: "greenglow" }, { slug: "robustgrey" }, { slug: "tranquilturquoise" }] },
  { id: "yosemite", folder: "yosemite", variants: [{ slug: "burgundy" }, { slug: "negro" }, { slug: "olive" }] },
  { id: "yuma", folder: "yuma", variants: [{ slug: "jade" }, { slug: "waxpaper" }] },
];

function toLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getVariantColorHex(slug: string) {
  const normalized = slug
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return COLOR_HEX_BY_VARIANT[slug] ?? COLOR_HEX_BY_VARIANT[normalized] ?? "#7A6A58";
}

const PRODUCT_DEFINITIONS: ProductDefinition[] = PRODUCT_SOURCES.map((source, index) => ({
  id: source.id,
  sku: `MAL-${String(index + 1).padStart(3, "0")}`,
  name: toLabel(source.folder),
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
  variants: source.variants.map((variant) => ({
    slug: variant.slug,
    fileSlug: variant.fileSlug,
    name: toLabel(variant.slug),
    colorHex: getVariantColorHex(variant.slug),
  })),
}));

export const products: Product[] = PRODUCT_DEFINITIONS.map(createProduct);
