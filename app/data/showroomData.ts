// Showroom Data - Muestrario Virtual B2B
// Productos ejemplo que muestran aplicaciones de pieles MALPE

export interface ShowroomSkinOption {
  skinId: string;        // ID de la piel real en productsData
  skinName: string;      // Nombre de la piel (redundant if inside collection, but good for self-contained object)
  variantId: string;     // ID de la variante/color
  variantName: string;   // Nombre del color
  colorHex: string;      // Color hex para mostrar en selector
  productImage: string;  // Imagen del producto CON ESA PIEL aplicada
}

export interface SkinCollection {
  name: string;      // Nombre de la colección (ej. "Pull-Up Vintage")
  skinId: string;    // ID del producto padre en productsData
  options: ShowroomSkinOption[];
}

export interface ShowroomProduct {
  id: string;
  defaultImage: string;
  name: string;
  description: string;
  category: "calzado" | "marroquineria";
  collections: SkinCollection[]; // Must have exactly 2 collections
  tags: string[];
  featured: boolean;
}

export const showroomProducts: ShowroomProduct[] = [
  // ============ CALZADO ============
  {
    id: "bota-western",
    defaultImage: "/showroom-imgs/bota_western/bota_western.webp",
    name: "Bota Western",
    description: "Bota estilo vaquero con acabados artesanales. Visualiza cómo nuestras pieles premium resaltan el diseño western tradicional.",
    category: "calzado",
    collections: [
      {
        name: "Pull-Up Waxy Heritage",
        skinId: "wx-pu-008",
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-brandy", variantName: "Brandy", colorHex: "#874C05", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-black", variantName: "Negro Humo", colorHex: "#2C2C2C", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-russet", variantName: "Rojizo", colorHex: "#80461B", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-tan", variantName: "Natural", colorHex: "#C69055", productImage: "" },
        ]
      },
      {
        name: "Pull-Up Efecto Vintage",
        skinId: "pl-pu-002",
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castaño", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marrón", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ]
      }
    ],
    tags: ["western", "artesanal", "vaquero"],
    featured: true
  },
  {
    id: "bota-dama",
    defaultImage: "/showroom-imgs/bota_dama/bota_dama.webp",
    name: "Bota de Dama",
    description: "Calzado femenino elegante y versátil. Descubre la sofisticación de nuestras pieles en diseños de moda contemporánea.",
    category: "calzado",
    collections: [
      {
        name: "Nubuck Gamuza Premium",
        skinId: "nb-sd-005",
        options: [
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-chocolate", variantName: "Chocolate", colorHex: "#7B3F00", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-sand", variantName: "Arena", colorHex: "#C2B280", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-grey", variantName: "Gris", colorHex: "#808080", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-black", variantName: "Negro Profundo", colorHex: "#0F0F0F", productImage: "" },
        ]
      },
      {
        name: "Pull-Up Efecto Vintage",
        skinId: "pl-pu-002",
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marrón", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castaño", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-burgundy", variantName: "Borgoña", colorHex: "#4A0404", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ]
      }
    ],
    tags: ["dama", "moda", "elegante"],
    featured: true
  },
  {
    id: "sneaker-urbano",
    defaultImage: "/showroom-imgs/sneaker_casual/sneaker_casual.webp",
    name: "Sneaker Urbano",
    description: "Calzado casual para el día a día. Combina el estilo urbano con la durabilidad y confort de nuestras pieles genuinas.",
    category: "calzado",
    collections: [
      {
        name: "Nubuck Gamuza Premium",
        skinId: "nb-sd-005",
        options: [
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-grey", variantName: "Gris", colorHex: "#808080", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-black", variantName: "Negro Profundo", colorHex: "#0F0F0F", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-navy", variantName: "Azul Medianoche", colorHex: "#101820", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-chocolate", variantName: "Chocolate", colorHex: "#7B3F00", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-sand", variantName: "Arena", colorHex: "#C2B280", productImage: "" },
        ]
      },
      {
        name: "Pull-Up Efecto Vintage",
        skinId: "pl-pu-002",
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marrón", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castaño", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ]
      }
    ],
    tags: ["casual", "urbano", "confort"],
    featured: true
  },
  {
    id: "sneaker-formal",
    defaultImage: "/showroom-imgs/sneaker_formal/sneaker_formal.webp",
    name: "Sneaker Formal",
    description: "Diseño formal casual. Visualiza la aplicación de nuestras pieles técnicas en calzado dinámico.",
    category: "calzado",
    collections: [
      {
        name: "Anilina Grado Automotriz",
        skinId: "auto-an-012",
        options: [
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-black", variantName: "Negro", colorHex: "#000000", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-red", variantName: "Rojo Deportivo", colorHex: "#FF0000", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-white", variantName: "Blanco Polar", colorHex: "#FDFDFD", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-grey", variantName: "Gris Titanio", colorHex: "#545454", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-beige", variantName: "Beige", colorHex: "#F5F5DC", productImage: "" },
        ]
      },
      {
        name: "Semi-Anilina Tacto Suave",
        skinId: "sa-soft-020",
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-grey", variantName: "Gris Perla", colorHex: "#E5E4E2", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-chocolate", variantName: "Chocolate", colorHex: "#2B1B17", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-teal", variantName: "Azul Petróleo", colorHex: "#008080", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-taupe", variantName: "Taupe", colorHex: "#483C32", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cream", variantName: "Crema", colorHex: "#FFFDD0", productImage: "" },
        ]
      }
    ],
    tags: ["formal", "casual", "urbano"],
    featured: true
  },

  // ============ MARROQUINERÍA ============
  {
    id: "bolsa",
    defaultImage: "/showroom-imgs/bolsa/bolsa.webp",
    name: "Bolsa",
    description: "Accesorio de moda esencial para dama. Nuestras pieles ofrecen el tacto y la caída perfecta para bolsos de alta gama.",
    category: "marroquineria",
    collections: [
      {
        name: "Cocodrilo Grabado",
        skinId: "emb-croc-045",
        options: [
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-black", variantName: "Black Gloss", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-brown", variantName: "Brown Matte", colorHex: "#5D4037", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-red", variantName: "Rojo Rubí", colorHex: "#9B111E", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-navy", variantName: "Azul Profundo", colorHex: "#000033", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-green", variantName: "Esmeralda", colorHex: "#50C878", productImage: "" },
        ]
      },
      {
        name: "Anilina Premium Grano Completo",
        skinId: "prem-an-015",
        options: [
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cognac", variantName: "Coñac", colorHex: "#9A463D", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-mocha", variantName: "Moca", colorHex: "#3B2F2F", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-black", variantName: "Negro", colorHex: "#111111", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-honey", variantName: "Miel", colorHex: "#DDA0DD", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-navy", variantName: "Azul Real", colorHex: "#000080", productImage: "" },
        ]
      }
    ],
    tags: ["bolso", "dama", "lujo"],
    featured: true
  },
  {
    id: "portafolio-mano",
    defaultImage: "/showroom-imgs/portafolio_mano/portafolio_mano.webp",
    name: "Portafolio de Mano",
    description: "Elegancia profesional para el mundo ejecutivo. Descubre cómo nuestras pieles transmiten distinción y seriedad.",
    category: "marroquineria",
    collections: [
      {
        name: "Pull-Up Efecto Vintage",
        skinId: "pl-pu-002",
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marrón", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castaño", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ]
      },
      {
        name: "Cocodrilo Grabado",
        skinId: "emb-croc-045",
        options: [
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-black", variantName: "Black Gloss", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-brown", variantName: "Brown Matte", colorHex: "#5D4037", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-navy", variantName: "Azul Profundo", colorHex: "#000033", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-green", variantName: "Esmeralda", colorHex: "#50C878", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-red", variantName: "Rojo Rubí", colorHex: "#9B111E", productImage: "" },
        ]
      }
    ],
    tags: ["ejecutivo", "profesional", "portafolio"],
    featured: true
  },
  {
    id: "duffle-bag",
    defaultImage: "/showroom-imgs/duffle_bag/duffle_bag.webp",
    name: "Duffle Bag",
    description: "Maleta de viaje robusta y sofisticada. Ideal para pieles con cuerpo y carácter como nuestros acabados Pull-Up y Waxy.",
    category: "marroquineria",
    collections: [
      {
        name: "Pull-Up Waxy Heritage",
        skinId: "wx-pu-008",
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-brandy", variantName: "Brandy", colorHex: "#874C05", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-tan", variantName: "Natural", colorHex: "#C69055", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-black", variantName: "Negro Humo", colorHex: "#2C2C2C", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-russet", variantName: "Rojizo", colorHex: "#80461B", productImage: "" },
        ]
      },
      {
        name: "Anilina Premium Grano Completo",
        skinId: "prem-an-015",
        options: [
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cognac", variantName: "Coñac", colorHex: "#9A463D", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-mocha", variantName: "Moca", colorHex: "#3B2F2F", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-black", variantName: "Negro", colorHex: "#111111", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-navy", variantName: "Azul Real", colorHex: "#000080", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-honey", variantName: "Miel", colorHex: "#DDA0DD", productImage: "" },
        ]
      }
    ],
    tags: ["viaje", "equipaje", "duffle"],
    featured: true
  }
];

// Helper para obtener las categorías disponibles
export const showroomCategories = ["calzado", "marroquineria"] as const;

// Labels para mostrar en UI
export const categoryLabels: Record<string, string> = {
  calzado: "Calzado",
  marroquineria: "Marroquinería"
};
