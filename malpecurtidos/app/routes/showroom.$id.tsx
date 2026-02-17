import { useState } from "react";
import type { Route } from "./+types/showroom.$id";
import { Link } from "react-router";
import { showroomProducts, categoryLabels } from "~/data/showroomData";
import { ShowroomContactModal } from "~/components/showroom/ShowroomContactModal";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Producto no encontrado | MALPE" }];
  }
  return [
    { title: `${data.name} | Showroom MALPE` },
    { name: "description", content: data.description },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const product = showroomProducts.find((p) => p.id === params.id);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return product;
}

export default function ShowroomDetail({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  // Initialize with first skin of first collection
  const [selectedSkin, setSelectedSkin] = useState(product.collections[0].options[0]);

  return (
    <div className="bg-[#121111] min-h-screen">
      <div className="max-w-[85%] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-10 md:mb-12" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-1.5">
            <li className="flex items-center shrink-0">
              <Link
                to="/"
                className="group flex items-center text-sm md:text-base text-gray-400 hover:text-white transition-all duration-200 font-medium"
              >
                <svg
                  className="w-4 h-4 mr-1.5 text-gray-600 group-hover:text-white transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
            </li>
            <li className="shrink-0">
              <svg
                className="w-4 h-4 text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="shrink-0">
              <Link
                to="/showroom"
                className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-200 font-medium"
              >
                Showroom
              </Link>
            </li>
            <li className="shrink-0">
              <svg
                className="w-4 h-4 text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="min-w-0">
              <span className="text-sm md:text-base text-white font-semibold break-words">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111]">
              <img
                src={selectedSkin.productImage || product.defaultImage}
                alt={`${product.name} con ${selectedSkin.skinName}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Producto Ejemplo
              </div>
            </div>
            {/* Mobile Skin Selector */}
            <div className="mt-8 lg:hidden">
              <SkinSelector
                product={product}
                selectedSkin={selectedSkin}
                setSelectedSkin={setSelectedSkin}
              />
            </div>
          </div>

          {/* Right Column: Details & Skin Selector */}
          <div className="space-y-8">
            <div>
              <div className="mb-4">
                <span className="text-[#967D59] text-xs font-semibold uppercase tracking-wider">
                  {categoryLabels[product.category] || product.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 text-sm font-sans">Showroom Virtual B2B</p>
            </div>

            <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
              {product.description}
            </p>

            <div className="h-px bg-zinc-800" />

            {/* Skin Selector Groups */}
            <div className="hidden lg:block">
              <SkinSelector
                product={product}
                selectedSkin={selectedSkin}
                setSelectedSkin={setSelectedSkin}
              />
            </div>

            <div className="h-px bg-zinc-800 mt-8" />

            {/* Contact Modal */}
            <ShowroomContactModal product={product} selectedSkin={selectedSkin} />

            {/* Info box */}
            <div className="bg-zinc-900 p-4 rounded-lg text-sm text-gray-400 font-sans flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#967D59] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>
              <p>
                Este es un producto ejemplo para mostrar aplicaciones de nuestras pieles.
                Contáctanos para discutir tus necesidades específicas de fabricación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkinSelector({ product, selectedSkin, setSelectedSkin }: { product: any, selectedSkin: any, setSelectedSkin: (skin: any) => void }) {
  return (
    <div className="space-y-8">
      <label className="block text-sm font-medium text-white">
        Piel Aplicada: <span className="font-bold text-[#967D59]">{selectedSkin.skinName} - {selectedSkin.variantName}</span>
      </label>

      {product.collections.map((collection: any, colIdx: number) => (
        <div key={colIdx} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              {collection.name}
            </span>
            <div className="h-px bg-zinc-800 flex-grow"></div>
            <Link
              to={`/productos/${collection.skinId}`}
              className="text-xs text-[#967D59] hover:underline font-medium"
            >
              Ver ficha técnica
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {collection.options.map((option: any) => (
              <div key={`${option.skinId}-${option.variantId}`} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSelectedSkin(option)}
                  className={`relative group focus:outline-none transition-all duration-200 ${selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId
                    ? "scale-110"
                    : "hover:scale-105"
                    }`}
                  aria-label={`Seleccionar color ${option.variantName}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId
                      ? "border-[#967D59] ring-2 ring-[#967D59]/20 shadow-md scale-110"
                      : "border-zinc-700 hover:border-gray-400"
                      }`}
                    style={{ backgroundColor: option.colorHex }}
                  />
                  {/* Checkmark */}
                  {selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
                <span className={`text-[10px] font-sans transition-colors ${selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId
                  ? "text-[#967D59] font-semibold"
                  : "text-gray-500"
                  }`}>
                  {option.variantName}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

