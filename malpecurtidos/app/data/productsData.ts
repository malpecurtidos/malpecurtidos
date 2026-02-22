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
  style: ["Western", "Rustic", "Tamboreado", "Exótico", "Fashion", "Especialidad", "Clásico"],
  gloss: ["Mate", "Semi mate", "Semi brillante", "Brillante", "Alto brillo"],
  grainType: ["Grabado", "Liso", "Grano natural", "Lado carne"],
} as const;

export const products: Product[] = [
  {
    id: "pl-pu-002",
    sku: "PL-PU-002",
    name: "Pull-Up Efecto Vintage",
    description:
      "Cuero curtido al vegetal con efecto pull-up auténtico. Desarrolla una hermosa patina con el tiempo. Ideal para artículos de cuero y calzado que buscan una apariencia envejecida y resistente.",
    category: "marroquineria",
    thickness: "1.2 - 1.4 mm",
    thicknessRange: { range: "1.2 - 1.4 mm", values: ["1.20 mm", "1.25 mm", "1.30 mm", "1.35 mm", "1.40 mm"] },
    articleType: "Pull up",
    style: "Rustic",
    gloss: "Semi brillante",
    grainType: "Grano natural",
    variants: [
      { id: "pu-brown", name: "Marrón", colorHex: "#8B5A2B", images: [""] },
      { id: "pu-tan", name: "Beige", colorHex: "#D2B48C", images: [""] },
      { id: "pu-chestnut", name: "Castaño", colorHex: "#954535", images: [""] },
      { id: "pu-black", name: "Negro", colorHex: "#1A1A1A", images: [""] },
      { id: "pu-navy", name: "Azul Marino", colorHex: "#1B2432", images: [""] },
      { id: "pu-burgundy", name: "Borgoña", colorHex: "#4A0404", images: [""] },
    ],
    featured: true,
  },
  {
    id: "nb-sd-005",
    sku: "NB-SD-005",
    name: "Nubuck Gamuza Premium",
    description:
      "Cuero nubuck aterciopelado y suave con estructura de grano fino. Ofrece un tacto lujoso y apariencia elegante para artículos de moda de alta gama.",
    category: "confeccion",
    thickness: "0.8 - 1.0 mm",
    thicknessRange: { range: "0.8 - 1.0 mm", values: ["0.80 mm", "0.85 mm", "0.90 mm", "0.95 mm", "1.00 mm"] },
    articleType: "Nubuck",
    style: "Fashion",
    gloss: "Mate",
    grainType: "Liso",
    variants: [
      { id: "nb-sand", name: "Arena", colorHex: "#C2B280", images: [""] },
      { id: "nb-chocolate", name: "Chocolate", colorHex: "#7B3F00", images: [""] },
      { id: "nb-grey", name: "Gris", colorHex: "#808080", images: [""] },
      { id: "nb-black", name: "Negro Profundo", colorHex: "#0F0F0F", images: [""] },
      { id: "nb-navy", name: "Azul Medianoche", colorHex: "#101820", images: [""] },
      { id: "nb-olive", name: "Oliva", colorHex: "#556B2F", images: [""] },
    ],
    featured: true,
  },
  {
    id: "wx-pu-008",
    sku: "WX-PU-008",
    name: "Pull-Up Waxy Heritage",
    description:
      "Cuero pull-up ricamente encerado que muestra marcaciones naturales. Altamente resistente al agua y duradero, perfecto para equipo outdoor y botas.",
    category: "calzado",
    thickness: "1.4 - 1.6 mm",
    thicknessRange: { range: "1.4 - 1.6 mm", values: ["1.40 mm", "1.45 mm", "1.50 mm", "1.55 mm", "1.60 mm"] },
    articleType: "Wax",
    style: "Western",
    gloss: "Semi brillante",
    grainType: "Grano natural",
    variants: [
      { id: "wx-brandy", name: "Brandy", colorHex: "#874C05", images: [""] },
      { id: "wx-olive", name: "Oliva", colorHex: "#556B2F", images: [""] },
      { id: "wx-black", name: "Negro Humo", colorHex: "#2C2C2C", images: [""] },
      { id: "wx-russet", name: "Rojizo", colorHex: "#80461B", images: [""] },
      { id: "wx-tan", name: "Natural", colorHex: "#C69055", images: [""] },
    ],
    featured: true,
  },
  {
    id: "auto-an-012",
    sku: "AUTO-AN-012",
    name: "Anilina Grado Automotriz",
    description:
      "Cuero anilina de alto rendimiento tratado para resistencia UV y durabilidad. Cumple con estándares de la industria automotriz mientras mantiene un tacto natural.",
    category: "tapiceria-automotriz",
    thickness: "1.0 - 1.2 mm",
    thicknessRange: { range: "1.0 - 1.2 mm", values: ["1.00 mm", "1.05 mm", "1.10 mm", "1.15 mm", "1.20 mm"] },
    articleType: "Napa",
    style: "Especialidad",
    gloss: "Semi mate",
    grainType: "Liso",
    variants: [
      { id: "auto-black", name: "Negro", colorHex: "#000000", images: [""] },
      { id: "auto-beige", name: "Beige", colorHex: "#F5F5DC", images: [""] },
      { id: "auto-red", name: "Rojo Deportivo", colorHex: "#FF0000", images: [""] },
      { id: "auto-grey", name: "Gris Titanio", colorHex: "#545454", images: [""] },
      { id: "auto-white", name: "Blanco Polar", colorHex: "#FDFDFD", images: [""] },
    ],
    featured: false,
  },
  {
    id: "prem-an-015",
    sku: "PREM-AN-015",
    name: "Anilina Premium Grano Completo",
    description:
      "El más fino cuero anilina de grano completo, mostrando la belleza natural de la piel. Procesamiento mínimo asegura máxima transpirabilidad y comodidad.",
    category: "tapiceria-muebles",
    thickness: "1.0 - 1.2 mm",
    thicknessRange: { range: "1.0 - 1.2 mm", values: ["1.00 mm", "1.05 mm", "1.10 mm", "1.15 mm", "1.20 mm"] },
    articleType: "Napa",
    style: "Clásico",
    gloss: "Semi mate",
    grainType: "Grano natural",
    variants: [
      { id: "pa-cognac", name: "Cognac", colorHex: "#9A463D", images: [""] },
      { id: "pa-mocha", name: "Moca", colorHex: "#3B2F2F", images: [""] },
      { id: "pa-black", name: "Negro", colorHex: "#111111", images: [""] },
      { id: "pa-honey", name: "Miel", colorHex: "#DDA0DD", images: [""] },
      { id: "pa-navy", name: "Azul Real", colorHex: "#000080", images: [""] },
    ],
    featured: true,
  },
  {
    id: "sa-soft-020",
    sku: "SA-SOFT-020",
    name: "Semi-Anilina Tacto Suave",
    description:
      "Un equilibrio perfecto entre apariencia natural y protección. El acabado semi-anilina proporciona un color consistente y mayor resistencia al desgaste y manchas.",
    category: "tapiceria-muebles",
    thickness: "1.0 - 1.2 mm",
    thicknessRange: { range: "1.0 - 1.2 mm", values: ["1.00 mm", "1.05 mm", "1.10 mm", "1.15 mm", "1.20 mm"] },
    articleType: "Napa",
    style: "Clásico",
    gloss: "Semi mate",
    grainType: "Liso",
    variants: [
      { id: "sa-cream", name: "Crema", colorHex: "#FFFDD0", images: [""] },
      { id: "sa-taupe", name: "Taupe", colorHex: "#483C32", images: [""] },
      { id: "sa-grey", name: "Gris Perla", colorHex: "#E5E4E2", images: [""] },
      { id: "sa-chocolate", name: "Chocolate", colorHex: "#2B1B17", images: [""] },
      { id: "sa-teal", name: "Azul Petróleo", colorHex: "#008080", images: [""] },
    ],
    featured: false,
  },
  {
    id: "bl-belt-030",
    sku: "BL-BELT-030",
    name: "Cinturón Pesado",
    description:
      "Cuero de hombro grueso curtido al vegetal diseñado específicamente para cinturones y correas. Rígido pero flexible con excelentes propiedades de acabado de bordes.",
    category: "cinturones",
    thickness: "1.8 - 2.0 mm",
    thicknessRange: { range: "1.8 - 2.0 mm", values: ["1.80 mm", "1.85 mm", "1.90 mm", "1.95 mm", "2.00 mm"] },
    articleType: "Vegetalizado",
    style: "Especialidad",
    gloss: "Mate",
    grainType: "Lado carne",
    variants: [
      { id: "belt-natural", name: "Natural", colorHex: "#E6C288", images: [""] },
      { id: "belt-black", name: "Negro", colorHex: "#111111", images: [""] },
      { id: "belt-brown", name: "Café", colorHex: "#654321", images: [""] },
      { id: "belt-tan", name: "Habano", colorHex: "#AB6F42", images: [""] },
    ],
    featured: false,
  },
  {
    id: "emb-croc-045",
    sku: "EMB-CROC-045",
    name: "Cocodrilo Grabado",
    description:
      "Cuero de alta calidad grabado con patrón de escamas de cocodrilo realista. Añade un toque exótico a bolsos, billeteras y zapatos.",
    category: "marroquineria",
    thickness: "1.2 - 1.4 mm",
    thicknessRange: { range: "1.2 - 1.4 mm", values: ["1.20 mm", "1.25 mm", "1.30 mm", "1.35 mm", "1.40 mm"] },
    articleType: "Grabado",
    style: "Exótico",
    gloss: "Brillante",
    grainType: "Grabado",
    variants: [
      { id: "croc-black", name: "Black Gloss", colorHex: "#1A1A1A", images: [""] },
      { id: "croc-brown", name: "Brown Matte", colorHex: "#5D4037", images: [""] },
      { id: "croc-red", name: "Rojo Rubí", colorHex: "#9B111E", images: [""] },
      { id: "croc-navy", name: "Azul Profundo", colorHex: "#000033", images: [""] },
      { id: "croc-green", name: "Esmeralda", colorHex: "#50C878", images: [""] },
    ],
    featured: true,
  },
];

