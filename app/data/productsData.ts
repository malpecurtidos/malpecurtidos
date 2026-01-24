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
      {
        id: "pu-brown",
        name: "Marrón",
        colorHex: "#8B5A2B",
        images: [""] // Imágenes placeholder por ahora
      },
      {
        id: "pu-tan",
        name: "Beige",
        colorHex: "#D2B48C",
        images: [""]
      },
      {
        id: "pu-chestnut",
        name: "Castaño",
        colorHex: "#954535",
        images: [""]
      }
    ],
    tags: ["vintage", "patina", "duradero"],
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
      {
        id: "nb-sand",
        name: "Arena",
        colorHex: "#C2B280",
        images: [""]
      },
      {
        id: "nb-chocolate",
        name: "Chocolate",
        colorHex: "#7B3F00",
        images: [""]
      },
      {
        id: "nb-grey",
        name: "Gris",
        colorHex: "#808080",
        images: [""]
      }
    ],
    tags: ["suave", "lujo", "terciopelo"],
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
      {
        id: "wx-brandy",
        name: "Brandy",
        colorHex: "#874C05",
        images: [""]
      },
      {
        id: "wx-olive",
        name: "Oliva",
        colorHex: "#556B2F",
        images: [""]
      }
    ],
    tags: ["resistente-al-agua", "resistente", "botas"],
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
      {
        id: "auto-black",
        name: "Negro",
        colorHex: "#000000",
        images: [""]
      },
      {
        id: "auto-beige",
        name: "Beige",
        colorHex: "#F5F5DC",
        images: [""]
      },
      {
        id: "auto-red",
        name: "Rojo Deportivo",
        colorHex: "#FF0000",
        images: [""]
      }
    ],
    tags: ["automotriz", "resistente-uv", "duradero"],
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
      {
        id: "pa-cognac",
        name: "Coñac",
        colorHex: "#9A463D",
        images: [""]
      },
      {
        id: "pa-mocha",
        name: "Moca",
        colorHex: "#3B2F2F",
        images: [""]
      }
    ],
    tags: ["grano-completo", "premium", "muebles"],
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
      {
        id: "sa-cream",
        name: "Crema",
        colorHex: "#FFFDD0",
        images: [""]
      },
      {
        id: "sa-taupe",
        name: "Taupe",
        colorHex: "#483C32",
        images: [""]
      }
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
      {
        id: "belt-natural",
        name: "Natural",
        colorHex: "#E6C288",
        images: [""]
      },
      {
        id: "belt-black",
        name: "Negro",
        colorHex: "#111111",
        images: [""]
      }
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
      {
        id: "croc-black",
        name: "Black Gloss",
        colorHex: "#1A1A1A",
        images: [""]
      },
      {
        id: "croc-brown",
        name: "Brown Matte",
        colorHex: "#5D4037",
        images: [""]
      }
    ],
    tags: ["exótico", "grabado", "moda"],
    featured: true,
  }
];
