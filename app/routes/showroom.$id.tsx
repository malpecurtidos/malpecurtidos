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
  const [selectedSkin, setSelectedSkin] = useState(product.skinOptions[0]);

  const handleContact = () => {
    const subject = encodeURIComponent(`Interés en producto: ${product.name}`);
    const body = encodeURIComponent(
      `Hola,\n\nMe interesa el siguiente producto del showroom:\n\n` +
      `Producto: ${product.name}\n` +
      `Piel de interés: ${selectedSkin.skinName} - ${selectedSkin.variantName}\n\n` +
      `Me gustaría recibir más información sobre costos y disponibilidad de esta piel para fabricar este tipo de producto.\n\n` +
      `Gracias,\n[Tu nombre y empresa]`
    );
    const email = "ventas@malpe.com.mx";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[85%] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-10 md:mb-12" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 md:space-x-3">
            <li>
              <Link 
                to="/" 
                className="group flex items-center text-sm md:text-base text-gray-500 hover:text-[#8B5A2B] transition-all duration-200 font-medium"
              >
                <svg 
                  className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-[#8B5A2B] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
            </li>
            <li>
              <svg 
                className="w-4 h-4 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link 
                to="/showroom" 
                className="text-sm md:text-base text-gray-500 hover:text-[#8B5A2B] transition-all duration-200 font-medium"
              >
                Showroom
              </Link>
            </li>
            <li>
              <svg 
                className="w-4 h-4 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <span className="text-sm md:text-base text-[#2A2522] font-semibold truncate max-w-[200px] md:max-w-none">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Gallery - muestra SOLO la imagen de la piel seleccionada */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={selectedSkin.productImage}
                alt={`${product.name} con ${selectedSkin.skinName}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Producto Ejemplo
              </div>
            </div>
          </div>

          {/* Right Column: Details & Skin Selector */}
          <div className="space-y-8">
            <div>
              <div className="mb-4">
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                  {categoryLabels[product.category] || product.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2A2522] mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm font-sans">Showroom Virtual B2B</p>
            </div>

            <p className="text-black leading-relaxed text-base md:text-lg font-sans">
              {product.description}
            </p>

            <div className="h-px bg-gray-200" />

            {/* Skin Selector */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-black">
                  Piel Aplicada: <span className="font-bold text-[#8B5A2B]">{selectedSkin.skinName} - {selectedSkin.variantName}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.skinOptions.map((option) => (
                    <button
                      key={`${option.skinId}-${option.variantId}`}
                      onClick={() => setSelectedSkin(option)}
                      className={`relative group focus:outline-none transition-all duration-200 ${
                        selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId
                          ? "scale-110"
                          : "hover:scale-105"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                          selectedSkin.skinId === option.skinId && selectedSkin.variantId === option.variantId
                            ? "border-[#8B5A2B] ring-2 ring-[#8B5A2B]/20"
                            : "border-gray-200 hover:border-gray-400"
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
                      {/* Tooltip */}
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#2A2522] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {option.skinName} - {option.variantName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Link to actual skin product */}
              <div className="bg-[#F9F7F2] p-4 rounded-lg border border-[#8B5A2B]/20">
                <p className="text-sm text-gray-700 mb-2 font-sans">
                  Esta visualización usa la piel:
                </p>
                <Link 
                  to={`/productos/${selectedSkin.skinId}`}
                  className="text-[#8B5A2B] font-semibold hover:underline flex items-center gap-2"
                >
                  {selectedSkin.skinName} - {selectedSkin.variantName}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </Link>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Contact Modal */}
            <ShowroomContactModal product={product} selectedSkin={selectedSkin} />

            {/* Info box */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 font-sans flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5A2B] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
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
