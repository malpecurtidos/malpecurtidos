export interface ProductVariant {
  id: string;
  name: string; // ej., "Marrón", "Beige", "Castaño"
  colorHex: string;
  images: string[]; // URLs de imágenes
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string; // "calzado", "marroquineria", "tapiceria-muebles", "tapiceria-automotriz", "confeccion", "cinturones"
  finish: string; // "pull-up", "anilina", "semi-anilina", "grabado", "nubuck", "waxy", "encerado", "gamuza"
  thickness: string[]; // ["0.8mm", "1.0mm", "1.2mm", "1.4mm", "1.6mm", etc.]
  sizes: string[]; // ["140-160 dm²", "160-180 dm²", "180-200 dm²", "200-220 dm²"]
  variants: ProductVariant[];
  technicalSheet?: string;
  tags: string[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "pl-pu-002",
    sku: "PL-PU-002",
    name: "Pull-Up Efecto Vintage",
    description: "Cuero curtido al vegetal con efecto pull-up auténtico. Desarrolla una hermosa patina con el tiempo. Ideal para artículos de cuero y calzado que buscan una apariencia envejecida y resistente.",
    category: "marroquineria",
    finish: "pull-up",
    thickness: ["1.2mm", "1.4mm", "1.6mm"],
    sizes: ["140-160 dm²", "160-180 dm²"],
    variants: [
      { id: "pu-brown", name: "Marrón", colorHex: "#8B5A2B", images: [""] },
      { id: "pu-tan", name: "Beige", colorHex: "#D2B48C", images: [""] },
      { id: "pu-chestnut", name: "Castaño", colorHex: "#954535", images: [""] },
      { id: "pu-black", name: "Negro", colorHex: "#1A1A1A", images: [""] },
      { id: "pu-navy", name: "Azul Marino", colorHex: "#1B2432", images: [""] },
      { id: "pu-burgundy", name: "Borgoña", colorHex: "#4A0404", images: [""] }
    ],
    tags: ["vintage", "patina", "duradero", "calzado", "bolsos"],
    featured: true,
  },
  {
    id: "nb-sd-005",
    sku: "NB-SD-005",
    name: "Nubuck Gamuza Premium",
    description: "Cuero nubuck aterciopelado y suave con estructura de grano fino. Ofrece un tacto lujoso y apariencia elegante para artículos de moda de alta gama.",
    category: "confeccion",
    finish: "nubuck",
    thickness: ["0.8mm", "1.0mm", "1.2mm"],
    sizes: ["140-160 dm²"],
    variants: [
      { id: "nb-sand", name: "Arena", colorHex: "#C2B280", images: [""] },
      { id: "nb-chocolate", name: "Chocolate", colorHex: "#7B3F00", images: [""] },
      { id: "nb-grey", name: "Gris", colorHex: "#808080", images: [""] },
      { id: "nb-black", name: "Negro Profundo", colorHex: "#0F0F0F", images: [""] },
      { id: "nb-navy", name: "Azul Medianoche", colorHex: "#101820", images: [""] },
      { id: "nb-olive", name: "Oliva", colorHex: "#556B2F", images: [""] }
    ],
    tags: ["suave", "lujo", "terciopelo", "zapatos", "chamarras"],
    featured: true,
  },
  {
    id: "wx-pu-008",
    sku: "WX-PU-008",
    name: "Pull-Up Waxy Heritage",
    description: "Cuero pull-up ricamente encerado que muestra marcaciones naturales. Altamente resistente al agua y duradero, perfecto para equipo outdoor y botas.",
    category: "calzado",
    finish: "waxy",
    thickness: ["1.4mm", "1.6mm", "1.8mm"],
    sizes: ["170-190 dm²"],
    variants: [
      { id: "wx-brandy", name: "Brandy", colorHex: "#874C05", images: [""] },
      { id: "wx-olive", name: "Oliva", colorHex: "#556B2F", images: [""] },
      { id: "wx-black", name: "Negro Humo", colorHex: "#2C2C2C", images: [""] },
      { id: "wx-russet", name: "Rojizo", colorHex: "#80461B", images: [""] },
      { id: "wx-tan", name: "Natural", colorHex: "#C69055", images: [""] }
    ],
    tags: ["resistente-al-agua", "resistente", "botas", "western"],
    featured: true,
  },
  {
    id: "auto-an-012",
    sku: "AUTO-AN-012",
    name: "Anilina Grado Automotriz",
    description: "Cuero anilina de alto rendimiento tratado para resistencia UV y durabilidad. Cumple con estándares de la industria automotriz mientras mantiene un tacto natural.",
    category: "tapiceria-automotriz",
    finish: "anilina",
    thickness: ["1.1mm", "1.3mm"],
    sizes: ["190-210 dm²"],
    variants: [
      { id: "auto-black", name: "Negro", colorHex: "#000000", images: [""] },
      { id: "auto-beige", name: "Beige", colorHex: "#F5F5DC", images: [""] },
      { id: "auto-red", name: "Rojo Deportivo", colorHex: "#FF0000", images: [""] },
      { id: "auto-grey", name: "Gris Titanio", colorHex: "#545454", images: [""] },
      { id: "auto-white", name: "Blanco Polar", colorHex: "#FDFDFD", images: [""] }
    ],
    tags: ["automotriz", "resistente-uv", "duradero", "performance"],
    featured: false,
  },
  {
    id: "prem-an-015",
    sku: "PREM-AN-015",
    name: "Anilina Premium Grano Completo",
    description: "El más fino cuero anilina de grano completo, mostrando la belleza natural de la piel. Procesamiento mínimo asegura máxima transpirabilidad y comodidad.",
    category: "tapiceria-muebles",
    finish: "anilina",
    thickness: ["1.0mm", "1.2mm", "1.4mm"],
    sizes: ["180-200 dm²", "200-220 dm²"],
    variants: [
      { id: "pa-cognac", name: "Coñac", colorHex: "#9A463D", images: [""] },
      { id: "pa-mocha", name: "Moca", colorHex: "#3B2F2F", images: [""] },
      { id: "pa-black", name: "Negro", colorHex: "#111111", images: [""] },
      { id: "pa-honey", name: "Miel", colorHex: "#DDA0DD", images: [""] },
      { id: "pa-navy", name: "Azul Real", colorHex: "#000080", images: [""] }
    ],
    tags: ["grano-completo", "premium", "muebles", "lujo"],
    featured: true,
  },
  {
    id: "sa-soft-020",
    sku: "SA-SOFT-020",
    name: "Semi-Anilina Tacto Suave",
    description: "Un equilibrio perfecto entre apariencia natural y protección. El acabado semi-anilina proporciona un color consistente y mayor resistencia al desgaste y manchas.",
    category: "tapiceria-muebles",
    finish: "semi-anilina",
    thickness: ["1.0mm", "1.2mm"],
    sizes: ["200-220 dm²", "220-240 dm²"],
    variants: [
      { id: "sa-cream", name: "Crema", colorHex: "#FFFDD0", images: [""] },
      { id: "sa-taupe", name: "Taupe", colorHex: "#483C32", images: [""] },
      { id: "sa-grey", name: "Gris Perla", colorHex: "#E5E4E2", images: [""] },
      { id: "sa-chocolate", name: "Chocolate", colorHex: "#2B1B17", images: [""] },
      { id: "sa-teal", name: "Azul Petróleo", colorHex: "#008080", images: [""] }
    ],
    tags: ["protegido", "suave", "muebles"],
    featured: false,
  },
  {
    id: "bl-belt-030",
    sku: "BL-BELT-030",
    name: "Cinturón Pesado",
    description: "Cuero de hombro grueso curtido al vegetal diseñado específicamente para cinturones y correas. Rígido pero flexible con excelentes propiedades de acabado de bordes.",
    category: "cinturones",
    finish: "vegetal",
    thickness: ["3.0mm", "3.5mm", "4.0mm"],
    sizes: ["120-140 dm²"],
    variants: [
      { id: "belt-natural", name: "Natural", colorHex: "#E6C288", images: [""] },
      { id: "belt-black", name: "Negro", colorHex: "#111111", images: [""] },
      { id: "belt-brown", name: "Café", colorHex: "#654321", images: [""] },
      { id: "belt-tan", name: "Habano", colorHex: "#AB6F42", images: [""] }
    ],
    tags: ["peso-pesado", "cinturones", "curtido-vegetal"],
    featured: false,
  },
  {
    id: "emb-croc-045",
    sku: "EMB-CROC-045",
    name: "Cocodrilo Grabado",
    description: "Cuero de alta calidad grabado con patrón de escamas de cocodrilo realista. Añade un toque exótico a bolsos, billeteras y zapatos.",
    category: "marroquineria",
    finish: "grabado",
    thickness: ["1.2mm", "1.4mm"],
    sizes: ["140-160 dm²"],
    variants: [
      { id: "croc-black", name: "Black Gloss", colorHex: "#1A1A1A", images: [""] },
      { id: "croc-brown", name: "Brown Matte", colorHex: "#5D4037", images: [""] },
      { id: "croc-red", name: "Rojo Rubí", colorHex: "#9B111E", images: [""] },
      { id: "croc-navy", name: "Azul Profundo", colorHex: "#000033", images: [""] },
      { id: "croc-green", name: "Esmeralda", colorHex: "#50C878", images: [""] }
    ],
    tags: ["exótico", "grabado", "moda", "lujo"],
    featured: true,
  }
];
