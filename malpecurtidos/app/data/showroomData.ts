// Showroom Data - Muestrario Virtual B2B
// Productos ejemplo que muestran aplicaciones de pieles MALPE

export interface ShowroomSkinOption {
  skinId: string;
  skinName: string;
  variantId: string;
  variantName: string;
  colorHex: string;
  productImage: string;
}

export interface SkinCollection {
  name: string;
  skinId: string;
  relatedProductIds: string[];
  options: ShowroomSkinOption[];
}

export interface ShowroomProduct {
  id: string;
  defaultImage: string;
  name: string;
  description: string;
  category: "calzado" | "marroquineria";
  collections: SkinCollection[];
  tags: string[];
  featured: boolean;
}

const PULL_UP_WAXY_PRODUCTS = ["wizard", "golden", "yuma"];
const PULL_UP_VINTAGE_PRODUCTS = ["wakanda", "glaciar", "gobi"];
const NUBUCK_PRODUCTS = ["milano", "maverick", "falcon"];
const ANILINE_PRODUCTS = ["luxury", "phoenix", "quetzal"];
const SEMI_ANILINE_PRODUCTS = ["habana", "luxury", "stanford"];
const CROC_PRODUCTS = ["cobra", "cobracharol", "cobralux"];

export const showroomProducts: ShowroomProduct[] = [
  {
    id: "bota-western",
    defaultImage: "/showroom-imgs/bota_western/bota_western.webp",
    name: "Bota Western",
    description:
      "Bota estilo vaquero con acabados artesanales. Visualiza como nuestras pieles premium resaltan el diseno western tradicional.",
    category: "calzado",
    collections: [
      {
        name: "Monaco",
        skinId: "wx-pu-008",
        relatedProductIds: PULL_UP_WAXY_PRODUCTS,
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-brandy", variantName: "Brandy", colorHex: "#874C05", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-black", variantName: "Negro Humo", colorHex: "#2C2C2C", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-russet", variantName: "Rojizo", colorHex: "#80461B", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-tan", variantName: "Natural", colorHex: "#C69055", productImage: "" },
        ],
      },
      {
        name: "Wakanda",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castano", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marron", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ],
      },
    ],
    tags: ["western", "artesanal", "vaquero"],
    featured: true,
  },
  {
    id: "bota-dama",
    defaultImage: "/showroom-imgs/bota_dama/bota_dama.webp",
    name: "Bota de Dama",
    description:
      "Calzado femenino elegante y versatil. Descubre la sofisticacion de nuestras pieles en disenos de moda contemporanea.",
    category: "calzado",
    collections: [
      {
        name: "Monaco",
        skinId: "nb-sd-005",
        relatedProductIds: NUBUCK_PRODUCTS,
        options: [
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-lavanda", variantName: "Lavanda", colorHex: "#A67979", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-sand", variantName: "Arena", colorHex: "#C2B280", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-grey", variantName: "Gris", colorHex: "#808080", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-monaco", variantName: "Negro Monaco", colorHex: "#000000", productImage: "/showroom-imgs/bota_dama/variants/monaco/bota_dama_negro_monaco.png" },
        ],
      },
      {
        name: "Wakanda",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marron", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castano", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-burgundy", variantName: "Borgona", colorHex: "#4A0404", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ],
      },
    ],
    tags: ["dama", "moda", "elegante"],
    featured: true,
  },
  {
    id: "sneaker-urbano",
    defaultImage: "/showroom-imgs/sneaker_casual/sneaker_casual.webp",
    name: "Sneaker Urbano",
    description:
      "Calzado casual para el dia a dia. Combina el estilo urbano con la durabilidad y confort de nuestras pieles genuinas.",
    category: "calzado",
    collections: [
      {
        name: "Monaco",
        skinId: "nb-sd-005",
        relatedProductIds: NUBUCK_PRODUCTS,
        options: [
          { skinId: "nb-sd-005", skinName: "Monaco", variantId: "nb-grey", variantName: "Gris", colorHex: "#808080", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Monaco", variantId: "nb-black", variantName: "Negro Profundo", colorHex: "#0F0F0F", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Monaco", variantId: "nb-navy", variantName: "Azul Medianoche", colorHex: "#101820", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Monaco", variantId: "nb-lavanda", variantName: "Lavanda", colorHex: "#634555", productImage: "" },
          { skinId: "nb-sd-005", skinName: "Monaco", variantId: "nb-sand", variantName: "Arena", colorHex: "#C2B280", productImage: "" },
        ],
      },
      {
        name: "Wakanda",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Wakanda", variantId: "pu-brown", variantName: "Marron", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Wakanda", variantId: "pu-chestnut", variantName: "Castano", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Wakanda", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Wakanda", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Wakanda", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ],
      },
    ],
    tags: ["casual", "urbano", "confort"],
    featured: true,
  },
  {
    id: "sneaker-formal",
    defaultImage: "/showroom-imgs/sneaker_formal/sneaker_formal.webp",
    name: "Sneaker Formal",
    description:
      "Diseno formal casual. Visualiza la aplicacion de nuestras pieles tecnicas en calzado dinamico.",
    category: "calzado",
    collections: [
      {
        name: "Monaco",
        skinId: "auto-an-012",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-black", variantName: "Negro", colorHex: "#000000", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-red", variantName: "Rojo Deportivo", colorHex: "#FF0000", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-white", variantName: "Blanco Polar", colorHex: "#FDFDFD", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-grey", variantName: "Gris Titanio", colorHex: "#545454", productImage: "" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-beige", variantName: "Beige", colorHex: "#F5F5DC", productImage: "" },
        ],
      },
      {
        name: "Wakanda",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-grey", variantName: "Gris Perla", colorHex: "#E5E4E2", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-chocolate", variantName: "Chocolate", colorHex: "#2B1B17", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-teal", variantName: "Azul Petroleo", colorHex: "#008080", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-taupe", variantName: "Taupe", colorHex: "#483C32", productImage: "" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cream", variantName: "Crema", colorHex: "#FFFDD0", productImage: "" },
        ],
      },
    ],
    tags: ["formal", "casual", "urbano"],
    featured: true,
  },
  {
    id: "bolsa",
    defaultImage: "/showroom-imgs/bolsa/bolsa.webp",
    name: "Bolsa",
    description:
      "Accesorio de moda esencial para dama. Nuestras pieles ofrecen el tacto y la caida perfecta para bolsos de alta gama.",
    category: "marroquineria",
    collections: [
      {
        name: "Cocodrilo Grabado",
        skinId: "emb-croc-045",
        relatedProductIds: CROC_PRODUCTS,
        options: [
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-black", variantName: "Black Gloss", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-brown", variantName: "Brown Matte", colorHex: "#5D4037", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-red", variantName: "Rojo Rubi", colorHex: "#9B111E", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-navy", variantName: "Azul Profundo", colorHex: "#000033", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-green", variantName: "Esmeralda", colorHex: "#50C878", productImage: "" },
        ],
      },
      {
        name: "Anilina Premium Grano Completo",
        skinId: "prem-an-015",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cognac", variantName: "Conac", colorHex: "#9A463D", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-mocha", variantName: "Moca", colorHex: "#3B2F2F", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-black", variantName: "Negro", colorHex: "#111111", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-honey", variantName: "Miel", colorHex: "#DDA0DD", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-navy", variantName: "Azul Real", colorHex: "#000080", productImage: "" },
        ],
      },
    ],
    tags: ["bolso", "dama", "lujo"],
    featured: true,
  },
  {
    id: "portafolio-mano",
    defaultImage: "/showroom-imgs/portafolio_mano/portafolio_mano.webp",
    name: "Portafolio de Mano",
    description:
      "Elegancia profesional para el mundo ejecutivo. Descubre como nuestras pieles transmiten distincion y seriedad.",
    category: "marroquineria",
    collections: [
      {
        name: "Pull-Up Efecto Vintage",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brown", variantName: "Marron", colorHex: "#8B5A2B", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-tan", variantName: "Beige", colorHex: "#D2B48C", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-black", variantName: "Negro", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-chestnut", variantName: "Castano", colorHex: "#954535", productImage: "" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-navy", variantName: "Azul Marino", colorHex: "#1B2432", productImage: "" },
        ],
      },
      {
        name: "Cocodrilo Grabado",
        skinId: "emb-croc-045",
        relatedProductIds: CROC_PRODUCTS,
        options: [
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-black", variantName: "Black Gloss", colorHex: "#1A1A1A", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-brown", variantName: "Brown Matte", colorHex: "#5D4037", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-navy", variantName: "Azul Profundo", colorHex: "#000033", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-green", variantName: "Esmeralda", colorHex: "#50C878", productImage: "" },
          { skinId: "emb-croc-045", skinName: "Cocodrilo Grabado", variantId: "croc-red", variantName: "Rojo Rubi", colorHex: "#9B111E", productImage: "" },
        ],
      },
    ],
    tags: ["ejecutivo", "profesional", "portafolio"],
    featured: true,
  },
  {
    id: "duffle-bag",
    defaultImage: "/showroom-imgs/duffle_bag/duffle_bag.webp",
    name: "Duffle Bag",
    description:
      "Maleta de viaje robusta y sofisticada. Ideal para pieles con cuerpo y caracter como nuestros acabados Pull-Up y Waxy.",
    category: "marroquineria",
    collections: [
      {
        name: "Pull-Up Waxy Heritage",
        skinId: "wx-pu-008",
        relatedProductIds: PULL_UP_WAXY_PRODUCTS,
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-brandy", variantName: "Brandy", colorHex: "#874C05", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-tan", variantName: "Natural", colorHex: "#C69055", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-black", variantName: "Negro Humo", colorHex: "#2C2C2C", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-olive", variantName: "Oliva", colorHex: "#556B2F", productImage: "" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-russet", variantName: "Rojizo", colorHex: "#80461B", productImage: "" },
        ],
      },
      {
        name: "Anilina Premium Grano Completo",
        skinId: "prem-an-015",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cognac", variantName: "Conac", colorHex: "#9A463D", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-mocha", variantName: "Moca", colorHex: "#3B2F2F", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-black", variantName: "Negro", colorHex: "#111111", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-navy", variantName: "Azul Real", colorHex: "#000080", productImage: "" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-honey", variantName: "Miel", colorHex: "#DDA0DD", productImage: "" },
        ],
      },
    ],
    tags: ["viaje", "equipaje", "duffle"],
    featured: true,
  },
];

export const showroomCategories = ["calzado", "marroquineria"] as const;

export const categoryLabels: Record<string, string> = {
  calzado: "Calzado",
  marroquineria: "Marroquineria",
};
