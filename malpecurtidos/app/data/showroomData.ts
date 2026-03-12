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
      "Bota estilo vaquero con acabados artesanales. Visualiza cómo nuestras pieles premium resaltan el diseño western tradicional.",
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
      "Calzado femenino elegante y versátil. Descubre la sofisticación de nuestras pieles en diseños de moda contemporánea.",
    category: "calzado",
    collections: [
      {
        name: "Briana",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-jade", variantName: "Jade", colorHex: "#3AAE9A", productImage: "/showroom-imgs/bota_dama/variants/briana/bota_dama_briana_jade.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-deepblue", variantName: "Deep Blue", colorHex: "#234A8A", productImage: "/showroom-imgs/bota_dama/variants/briana/bota_dama_briana_deepblue.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-emerald", variantName: "Emerald", colorHex: "#0F8A5F", productImage: "/showroom-imgs/bota_dama/variants/briana/bota_dama_briana_emerald.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-freshpurple", variantName: "Fresh Purple", colorHex: "#8B5FBF", productImage: "/showroom-imgs/bota_dama/variants/briana/bota_dama_briana_freshpurple.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-red", variantName: "Red", colorHex: "#B4232E", productImage: "/showroom-imgs/bota_dama/variants/briana/bota_dama_briana_red.avif" },
        ],
      },
      {
        name: "Burgos",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-beige", variantName: "Beige", colorHex: "#D2B48C", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_beige.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brandy", variantName: "Brandy", colorHex: "#8B5A2B", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_brandy.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_cognac.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_miel.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-negro", variantName: "Negro", colorHex: "#1A1A1A", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_negro.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_ochre.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_redearth.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/bota_dama/variants/burgos/bota_dama_burgos_waxpaper.avif" },
        ],
      },
      {
        name: "Golden",
        skinId: "wx-pu-008",
        relatedProductIds: PULL_UP_WAXY_PRODUCTS,
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-cherry", variantName: "Cherry", colorHex: "#7A1E2C", productImage: "/showroom-imgs/bota_dama/variants/golden/bota_dama_golden_cherry.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-darkolive", variantName: "Dark Olive", colorHex: "#4B5320", productImage: "/showroom-imgs/bota_dama/variants/golden/bota_dama_golden_darkolive.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-indigo", variantName: "Indigo", colorHex: "#274690", productImage: "/showroom-imgs/bota_dama/variants/golden/bota_dama_golden_indigo.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-retro", variantName: "Retro", colorHex: "#7B4B2A", productImage: "/showroom-imgs/bota_dama/variants/golden/bota_dama_golden_retro.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-shedron", variantName: "Shedron", colorHex: "#8A3D24", productImage: "/showroom-imgs/bota_dama/variants/golden/bota_dama_golden_shedron.avif" },
        ],
      },
      {
        name: "Phoenix",
        skinId: "auto-an-012",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-cocoa", variantName: "Cocoa", colorHex: "#6B4F3A", productImage: "/showroom-imgs/bota_dama/variants/phoenix/bota_dama_phoenix_cocoa.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/bota_dama/variants/phoenix/bota_dama_phoenix_cognac.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-grass", variantName: "Grass", colorHex: "#5C8A3D", productImage: "/showroom-imgs/bota_dama/variants/phoenix/bota_dama_phoenix_grass.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-negro", variantName: "Negro", colorHex: "#101010", productImage: "/showroom-imgs/bota_dama/variants/phoenix/bota_dama_phoenix_negro.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/bota_dama/variants/phoenix/bota_dama_phoenix_waxpaper.avif" },
        ],
      },
      {
        name: "Yellowstone",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-electricorange", variantName: "Electric Orange", colorHex: "#D96B1C", productImage: "/showroom-imgs/bota_dama/variants/yellowstone/bota_dama_yellowstone_electricorange.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-freshpurple", variantName: "Fresh Purple", colorHex: "#8B5FBF", productImage: "/showroom-imgs/bota_dama/variants/yellowstone/bota_dama_yellowstone_freshpurple.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-greenglow", variantName: "Green Glow", colorHex: "#4FAE65", productImage: "/showroom-imgs/bota_dama/variants/yellowstone/bota_dama_yellowstone_greenglow.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-robustgrey", variantName: "Robust Grey", colorHex: "#6B7078", productImage: "/showroom-imgs/bota_dama/variants/yellowstone/bota_dama_yellowstone_robustgrey.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-tranquilturquoise", variantName: "Tranquil Turquoise", colorHex: "#4CB7B5", productImage: "/showroom-imgs/bota_dama/variants/yellowstone/bota_dama_yellowstone_tranquilturquoise.avif" },
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
      "Diseño formal casual. Visualiza la aplicación de nuestras pieles técnicas en calzado dinámico.",
    category: "calzado",
    collections: [
      {
        name: "Atanado",
        skinId: "veg-at-001",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "veg-at-001", skinName: "Atanado", variantId: "at-cafe", variantName: "Cafe", colorHex: "#6F4E37", productImage: "/showroom-imgs/sneaker_formal/variants/atanado/sneaker_formal_atanado_cafe.avif" },
          { skinId: "veg-at-001", skinName: "Atanado", variantId: "at-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/sneaker_formal/variants/atanado/sneaker_formal_atanado_miel.avif" },
          { skinId: "veg-at-001", skinName: "Atanado", variantId: "at-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/sneaker_formal/variants/atanado/sneaker_formal_atanado_negro.avif" },
          { skinId: "veg-at-001", skinName: "Atanado", variantId: "at-perla", variantName: "Perla", colorHex: "#D9D6CF", productImage: "/showroom-imgs/sneaker_formal/variants/atanado/sneaker_formal_atanado_perla.avif" },
        ],
      },
      {
        name: "Habana",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cocoa", variantName: "Cocoa", colorHex: "#6B4F3A", productImage: "/showroom-imgs/sneaker_formal/variants/habana/sneaker_formal_habana_cocoa.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/sneaker_formal/variants/habana/sneaker_formal_habana_cognac.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/sneaker_formal/variants/habana/sneaker_formal_habana_miel.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/sneaker_formal/variants/habana/sneaker_formal_habana_negro.avif" },
        ],
      },
      {
        name: "Luxury",
        skinId: "prem-an-015",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cocoa", variantName: "Cocoa", colorHex: "#6B4F3A", productImage: "/showroom-imgs/sneaker_formal/variants/luxury/sneaker_formal_luxury_cocoa.avif" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/sneaker_formal/variants/luxury/sneaker_formal_luxury_cognac.avif" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/sneaker_formal/variants/luxury/sneaker_formal_luxury_miel.avif" },
          { skinId: "prem-an-015", skinName: "Anilina Premium", variantId: "pa-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/sneaker_formal/variants/luxury/sneaker_formal_luxury_negro.avif" },
        ],
      },
      {
        name: "Quetzal",
        skinId: "auto-an-012",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-cocoa", variantName: "Cocoa", colorHex: "#6B4F3A", productImage: "/showroom-imgs/sneaker_formal/variants/quetzal/sneaker_formal_quetzal_cocoa.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/sneaker_formal/variants/quetzal/sneaker_formal_quetzal_cognac.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/sneaker_formal/variants/quetzal/sneaker_formal_quetzal_miel.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/sneaker_formal/variants/quetzal/sneaker_formal_quetzal_negro.avif" },
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
        name: "Briana",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-jade", variantName: "Jade", colorHex: "#3AAE9A", productImage: "/showroom-imgs/bolsa/variants/briana/bolsa_briana_jade.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-deepblue", variantName: "Deep Blue", colorHex: "#234A8A", productImage: "/showroom-imgs/bolsa/variants/briana/bolsa_briana_deepblue.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-emerald", variantName: "Emerald", colorHex: "#0F8A5F", productImage: "/showroom-imgs/bolsa/variants/briana/bolsa_briana_emerald.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-freshpurple", variantName: "Fresh Purple", colorHex: "#8B5FBF", productImage: "/showroom-imgs/bolsa/variants/briana/bolsa_briana_freshpurple.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-red", variantName: "Red", colorHex: "#B4232E", productImage: "/showroom-imgs/bolsa/variants/briana/bolsa_briana_red.avif" },
        ],
      },
      {
        name: "Falcon",
        skinId: "nb-sd-005",
        relatedProductIds: NUBUCK_PRODUCTS,
        options: [
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-brightemerald", variantName: "Bright Emerald", colorHex: "#1FA463", productImage: "/showroom-imgs/bolsa/variants/falcon/bolsa_falcon_brightemerald.avif" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-darkolive", variantName: "Dark Olive", colorHex: "#4B5320", productImage: "/showroom-imgs/bolsa/variants/falcon/bolsa_falcon_darkolive.avif" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-electricorange", variantName: "Electric Orange", colorHex: "#D96B1C", productImage: "/showroom-imgs/bolsa/variants/falcon/bolsa_falcon_electricorange.avif" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/bolsa/variants/falcon/bolsa_falcon_ochre.avif" },
          { skinId: "nb-sd-005", skinName: "Nubuck Premium", variantId: "nb-raspberrypink", variantName: "Raspberry Pink", colorHex: "#B33A6A", productImage: "/showroom-imgs/bolsa/variants/falcon/bolsa_falcon_raspberrypink.avif" },
        ],
      },
      {
        name: "Senna",
        skinId: "auto-an-012",
        relatedProductIds: ANILINE_PRODUCTS,
        options: [
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/bolsa/variants/senna/bolsa_senna_ochre.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-robustgrey", variantName: "Robust Grey", colorHex: "#6B7078", productImage: "/showroom-imgs/bolsa/variants/senna/bolsa_senna_robustgrey.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-softgrass", variantName: "Soft Grass", colorHex: "#7BA05B", productImage: "/showroom-imgs/bolsa/variants/senna/bolsa_senna_softgrass.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-sublimegreen", variantName: "Sublime Green", colorHex: "#38A169", productImage: "/showroom-imgs/bolsa/variants/senna/bolsa_senna_sublimegreen.avif" },
          { skinId: "auto-an-012", skinName: "Anilina Performance", variantId: "auto-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/bolsa/variants/senna/bolsa_senna_waxpaper.avif" },
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
        name: "Berlin",
        skinId: "pl-pu-002",
        relatedProductIds: PULL_UP_VINTAGE_PRODUCTS,
        options: [
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-beige", variantName: "Beige", colorHex: "#D2B48C", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_beige.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-brandy", variantName: "Brandy", colorHex: "#8B5A2B", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_brandy.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-cognac", variantName: "Cognac", colorHex: "#9A463D", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_cognac.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-miel", variantName: "Miel", colorHex: "#C78F45", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_miel.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-negro", variantName: "Negro", colorHex: "#1A1A1A", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_negro.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_ochre.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_redearth.avif" },
          { skinId: "pl-pu-002", skinName: "Pull-Up Vintage", variantId: "pu-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/portafolio_mano/variants/berlin/portafolio_mano_berlin_waxpaper.avif" },
        ],
      },
      {
        name: "Himalaya",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cedro", variantName: "Cedro", colorHex: "#8C5A3C", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_cedro.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-darkolive", variantName: "Dark Olive", colorHex: "#4B5320", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_darkolive.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-ferrari", variantName: "Ferrari", colorHex: "#C1272D", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_ferrari.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_negro.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_ochre.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-primalgreen", variantName: "Primal Green", colorHex: "#2F7A4F", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_primalgreen.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_redearth.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-softgrass", variantName: "Soft Grass", colorHex: "#7BA05B", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_softgrass.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-steelblue", variantName: "Steel Blue", colorHex: "#4682B4", productImage: "/showroom-imgs/portafolio_mano/variants/himalaya/portafolio_mano_himalaya_steelblue.avif" },
        ],
      },
      {
        name: "Wizard",
        skinId: "wx-pu-008",
        relatedProductIds: PULL_UP_WAXY_PRODUCTS,
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-deepblue", variantName: "Deep Blue", colorHex: "#234A8A", productImage: "/showroom-imgs/portafolio_mano/variants/wizard/portafolio_mano_wizard_deepblue.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/portafolio_mano/variants/wizard/portafolio_mano_wizard_ochre.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-primalgreen", variantName: "Primal Green", colorHex: "#2F7A4F", productImage: "/showroom-imgs/portafolio_mano/variants/wizard/portafolio_mano_wizard_primalgreen.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/portafolio_mano/variants/wizard/portafolio_mano_wizard_redearth.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/portafolio_mano/variants/wizard/portafolio_mano_wizard_waxpaper.avif" },
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
        name: "Himalaya",
        skinId: "sa-soft-020",
        relatedProductIds: SEMI_ANILINE_PRODUCTS,
        options: [
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-cedro", variantName: "Cedro", colorHex: "#8C5A3C", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_cedro.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-darkolive", variantName: "Dark Olive", colorHex: "#4B5320", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_darkolive.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-ferrari", variantName: "Ferrari", colorHex: "#C1272D", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_ferrari.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-negro", variantName: "Negro", colorHex: "#111111", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_negro.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_ochre.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-primalgreen", variantName: "Primal Green", colorHex: "#2F7A4F", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_primalgreen.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_redearth.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-softgrass", variantName: "Soft Grass", colorHex: "#7BA05B", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_softgrass.avif" },
          { skinId: "sa-soft-020", skinName: "Semi-Anilina", variantId: "sa-steelblue", variantName: "Steel Blue", colorHex: "#4682B4", productImage: "/showroom-imgs/duffle_bag/variants/himalaya/duffle_bag_himalaya_steelblue.avif" },
        ],
      },
      {
        name: "Wizard",
        skinId: "wx-pu-008",
        relatedProductIds: PULL_UP_WAXY_PRODUCTS,
        options: [
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-deepblue", variantName: "Deep Blue", colorHex: "#234A8A", productImage: "/showroom-imgs/duffle_bag/variants/wizard/duffle_bag_wizard_deepblue.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-ochre", variantName: "Ochre", colorHex: "#B8792F", productImage: "/showroom-imgs/duffle_bag/variants/wizard/duffle_bag_wizard_ochre.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-primalgreen", variantName: "Primal Green", colorHex: "#2F7A4F", productImage: "/showroom-imgs/duffle_bag/variants/wizard/duffle_bag_wizard_primalgreen.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-redearth", variantName: "Red Earth", colorHex: "#8D3F2D", productImage: "/showroom-imgs/duffle_bag/variants/wizard/duffle_bag_wizard_redearth.avif" },
          { skinId: "wx-pu-008", skinName: "Pull-Up Waxy", variantId: "wx-waxpaper", variantName: "Wax Paper", colorHex: "#B2875A", productImage: "/showroom-imgs/duffle_bag/variants/wizard/duffle_bag_wizard_waxpaper.avif" },
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
