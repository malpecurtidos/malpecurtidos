// Showroom Data - Muestrario Virtual B2B
// Productos ejemplo que muestran aplicaciones de pieles MALPE

export interface ShowroomSkinOption {
  skinId: string;        // ID de la piel real en productsData
  skinName: string;      // Nombre legible de la piel
  variantId: string;     // ID de la variante/color
  variantName: string;   // Nombre del color
  colorHex: string;      // Color hex para mostrar en selector
  productImage: string;  // Imagen del producto CON ESA PIEL aplicada
}

export interface ShowroomProduct {
  id: string;
  name: string;
  description: string;
  category: "calzado" | "marroquineria" | "tapiceria" | "chamarras";
  skinOptions: ShowroomSkinOption[];
  tags: string[];
  featured: boolean;
}

export const showroomProducts: ShowroomProduct[] = [
  // ============ CALZADO ============
  {
    id: "boot-work-01",
    name: "Bota de Trabajo Premium",
    description: "Bota robusta ideal para uso industrial. Visualiza cómo se vería fabricada con nuestras pieles premium de alta resistencia.",
    category: "calzado",
    skinOptions: [
      {
        skinId: "wx-pu-008",
        skinName: "Pull-Up Waxy Heritage",
        variantId: "wx-brandy",
        variantName: "Brandy",
        colorHex: "#874C05",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "wx-pu-008",
        skinName: "Pull-Up Waxy Heritage",
        variantId: "wx-olive",
        variantName: "Oliva",
        colorHex: "#556B2F",
        productImage: "/home-imgs/hero/hero-2.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      }
    ],
    tags: ["trabajo", "industrial", "resistente"],
    featured: true
  },
  {
    id: "shoe-formal-01",
    name: "Zapato Oxford Ejecutivo",
    description: "Zapato formal clásico para profesionales. Ideal para mostrar pieles de alta calidad con acabados elegantes.",
    category: "calzado",
    skinOptions: [
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-chestnut",
        variantName: "Castaño",
        colorHex: "#954535",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "emb-croc-045",
        skinName: "Cocodrilo Grabado",
        variantId: "croc-black",
        variantName: "Black Gloss",
        colorHex: "#1A1A1A",
        productImage: "/home-imgs/hero/hero-1.webp"
      }
    ],
    tags: ["formal", "ejecutivo", "elegante"],
    featured: true
  },
  {
    id: "boot-casual-01",
    name: "Botín Chelsea Casual",
    description: "Botín versátil para uso diario. Combina comodidad y estilo con nuestras pieles de primera calidad.",
    category: "calzado",
    skinOptions: [
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-chocolate",
        variantName: "Chocolate",
        colorHex: "#7B3F00",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-sand",
        variantName: "Arena",
        colorHex: "#C2B280",
        productImage: "/home-imgs/hero/hero-2.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-tan",
        variantName: "Beige",
        colorHex: "#D2B48C",
        productImage: "/home-imgs/hero/hero-2.webp"
      }
    ],
    tags: ["casual", "versátil", "moderno"],
    featured: false
  },

  // ============ MARROQUINERÍA ============
  {
    id: "backpack-exec-01",
    name: "Mochila Ejecutiva",
    description: "Mochila moderna para profesionales. Perfecta para mostrar pieles de marroquinería con estilo contemporáneo.",
    category: "marroquineria",
    skinOptions: [
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "emb-croc-045",
        skinName: "Cocodrilo Grabado",
        variantId: "croc-black",
        variantName: "Black Gloss",
        colorHex: "#1A1A1A",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "emb-croc-045",
        skinName: "Cocodrilo Grabado",
        variantId: "croc-brown",
        variantName: "Brown Matte",
        colorHex: "#5D4037",
        productImage: "/home-imgs/hero/hero-3.webp"
      }
    ],
    tags: ["ejecutivo", "moderno", "profesional"],
    featured: true
  },
  {
    id: "handbag-classic-01",
    name: "Bolso Clásico Dama",
    description: "Bolso elegante y atemporal. Visualiza cómo lucen nuestras pieles premium en accesorios de moda.",
    category: "marroquineria",
    skinOptions: [
      {
        skinId: "emb-croc-045",
        skinName: "Cocodrilo Grabado",
        variantId: "croc-black",
        variantName: "Black Gloss",
        colorHex: "#1A1A1A",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-chestnut",
        variantName: "Castaño",
        colorHex: "#954535",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-grey",
        variantName: "Gris",
        colorHex: "#808080",
        productImage: "/home-imgs/hero/hero-3.webp"
      }
    ],
    tags: ["elegante", "moda", "clásico"],
    featured: true
  },
  {
    id: "wallet-bifold-01",
    name: "Billetera Bifold",
    description: "Billetera compacta y funcional. Ideal para apreciar el detalle y acabado de nuestras pieles en pequeño formato.",
    category: "marroquineria",
    skinOptions: [
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "emb-croc-045",
        skinName: "Cocodrilo Grabado",
        variantId: "croc-brown",
        variantName: "Brown Matte",
        colorHex: "#5D4037",
        productImage: "/home-imgs/hero/hero-3.webp"
      }
    ],
    tags: ["compacto", "funcional", "accesorio"],
    featured: false
  },

  // ============ TAPICERÍA ============
  {
    id: "sofa-modern-01",
    name: "Sofá Moderno 3 Plazas",
    description: "Sofá contemporáneo de líneas limpias. Descubre cómo nuestras pieles transforman espacios con elegancia.",
    category: "tapiceria",
    skinOptions: [
      {
        skinId: "prem-an-015",
        skinName: "Anilina Premium Grano Completo",
        variantId: "pa-cognac",
        variantName: "Coñac",
        colorHex: "#9A463D",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "prem-an-015",
        skinName: "Anilina Premium Grano Completo",
        variantId: "pa-mocha",
        variantName: "Moca",
        colorHex: "#3B2F2F",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "sa-soft-020",
        skinName: "Semi-Anilina Tacto Suave",
        variantId: "sa-cream",
        variantName: "Crema",
        colorHex: "#FFFDD0",
        productImage: "/home-imgs/hero/hero-2.webp"
      }
    ],
    tags: ["moderno", "hogar", "lujo"],
    featured: true
  },
  {
    id: "car-seat-01",
    name: "Asiento Automotriz Sport",
    description: "Interior automotriz deportivo. Visualiza cómo nuestras pieles de grado automotriz elevan cualquier vehículo.",
    category: "tapiceria",
    skinOptions: [
      {
        skinId: "auto-an-012",
        skinName: "Anilina Grado Automotriz",
        variantId: "auto-black",
        variantName: "Negro",
        colorHex: "#000000",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "auto-an-012",
        skinName: "Anilina Grado Automotriz",
        variantId: "auto-red",
        variantName: "Rojo Deportivo",
        colorHex: "#FF0000",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "auto-an-012",
        skinName: "Anilina Grado Automotriz",
        variantId: "auto-beige",
        variantName: "Beige",
        colorHex: "#F5F5DC",
        productImage: "/home-imgs/hero/hero-2.webp"
      }
    ],
    tags: ["automotriz", "deportivo", "premium"],
    featured: true
  },
  {
    id: "office-chair-01",
    name: "Silla Ejecutiva de Oficina",
    description: "Silla de oficina de alta gama. Muestra cómo nuestras pieles combinan confort y profesionalismo.",
    category: "tapiceria",
    skinOptions: [
      {
        skinId: "sa-soft-020",
        skinName: "Semi-Anilina Tacto Suave",
        variantId: "sa-taupe",
        variantName: "Taupe",
        colorHex: "#483C32",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "prem-an-015",
        skinName: "Anilina Premium Grano Completo",
        variantId: "pa-cognac",
        variantName: "Coñac",
        colorHex: "#9A463D",
        productImage: "/home-imgs/hero/hero-1.webp"
      }
    ],
    tags: ["oficina", "ejecutivo", "confort"],
    featured: false
  },

  // ============ CHAMARRAS ============
  {
    id: "jacket-bomber-01",
    name: "Chamarra Bomber Clásica",
    description: "Chamarra bomber icónica. Visualiza cómo nuestras pieles suaves crean prendas de confección premium.",
    category: "chamarras",
    skinOptions: [
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-chocolate",
        variantName: "Chocolate",
        colorHex: "#7B3F00",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-grey",
        variantName: "Gris",
        colorHex: "#808080",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      }
    ],
    tags: ["bomber", "clásico", "moda"],
    featured: true
  },
  {
    id: "jacket-biker-01",
    name: "Chamarra Biker",
    description: "Chamarra estilo motociclista. Perfecta para mostrar pieles resistentes con actitud y carácter.",
    category: "chamarras",
    skinOptions: [
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-brown",
        variantName: "Marrón",
        colorHex: "#8B5A2B",
        productImage: "/home-imgs/hero/hero-1.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-chestnut",
        variantName: "Castaño",
        colorHex: "#954535",
        productImage: "/home-imgs/hero/hero-3.webp"
      },
      {
        skinId: "wx-pu-008",
        skinName: "Pull-Up Waxy Heritage",
        variantId: "wx-brandy",
        variantName: "Brandy",
        colorHex: "#874C05",
        productImage: "/home-imgs/hero/hero-3.webp"
      }
    ],
    tags: ["biker", "rebelde", "resistente"],
    featured: true
  },
  {
    id: "vest-casual-01",
    name: "Chaleco Casual",
    description: "Chaleco versátil para cualquier ocasión. Ideal para mostrar la suavidad y flexibilidad de nuestras pieles.",
    category: "chamarras",
    skinOptions: [
      {
        skinId: "nb-sd-005",
        skinName: "Nubuck Gamuza Premium",
        variantId: "nb-sand",
        variantName: "Arena",
        colorHex: "#C2B280",
        productImage: "/home-imgs/hero/hero-2.webp"
      },
      {
        skinId: "pl-pu-002",
        skinName: "Pull-Up Efecto Vintage",
        variantId: "pu-tan",
        variantName: "Beige",
        colorHex: "#D2B48C",
        productImage: "/home-imgs/hero/hero-2.webp"
      }
    ],
    tags: ["casual", "versátil", "ligero"],
    featured: false
  }
];

// Helper para obtener las categorías disponibles
export const showroomCategories = ["calzado", "marroquineria", "tapiceria", "chamarras"] as const;

// Labels para mostrar en UI
export const categoryLabels: Record<string, string> = {
  calzado: "Calzado",
  marroquineria: "Marroquinería",
  tapiceria: "Tapicería",
  chamarras: "Chamarras y Confección"
};
