import React, { useState } from "react";
import type { Route } from "./+types/productos.$id";
import { Link, useNavigate } from "react-router";
import { products, type Product } from "~/data/productsData";
import { ProductGallery } from "~/components/productos/ProductGallery";
import { ProductVariantSelector } from "~/components/productos/ProductVariantSelector";
import { ProductSpecSelector } from "~/components/productos/ProductSpecSelector";
import { Button } from "~/ui/button";
import { useQuotation } from "~/contexts/QuotationContext";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Producto no encontrado | MALPE" }];
  }
  return [
    { title: `${data.name} | Catálogo MALPE` },
    { name: "description", content: data.description },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return product;
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  const navigate = useNavigate();
  const { addToQuotation } = useQuotation();

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedThickness, setSelectedThickness] = useState(product.thickness[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleAddToQuotation = () => {
    addToQuotation({
      productId: product.id,
      variantId: selectedVariant.id,
      thickness: selectedThickness,
      size: selectedSize,
      quantity,
      notes,
      productName: product.name,
      productImage: selectedVariant.images[0],
      variantName: selectedVariant.name,
      sku: product.sku
    });
  };

  const handleRequestSample = () => {
    // Create email with pre-filled message
    const subject = encodeURIComponent(`Solicitud de Muestra: ${product.name}`);
    const body = encodeURIComponent(
      `Hola,\n\nMe gustaría solicitar una muestra del siguiente producto:\n\n` +
      `Producto: ${product.name}\n` +
      `SKU: ${product.sku}\n` +
      `Variante: ${selectedVariant.name}\n` +
      `Grosor: ${selectedThickness}\n` +
      `Tamaño: ${selectedSize}\n\n` +
      `Por favor, contáctenme para coordinar el envío de la muestra.\n\n` +
      `Gracias,\n[Tu nombre]`
    );
    const email = "ventas@malpe.com.mx";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[85%] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-10 md:mb-12" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-1.5">
            <li className="flex items-center shrink-0">
              <Link 
                to="/" 
                className="group flex items-center text-sm md:text-base text-gray-500 hover:text-[#8B5A2B] transition-all duration-200 font-medium"
              >
                <svg 
                  className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-[#8B5A2B] transition-colors shrink-0" 
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
                className="w-4 h-4 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="shrink-0">
              <Link 
                to="/productos" 
                className="text-sm md:text-base text-gray-500 hover:text-[#8B5A2B] transition-all duration-200 font-medium"
              >
                Catálogo
              </Link>
            </li>
            <li className="shrink-0">
              <svg 
                className="w-4 h-4 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="min-w-0">
              <span className="text-sm md:text-base text-[#2A2522] font-semibold break-words">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Gallery */}
          <div>
            <ProductGallery 
              images={selectedVariant.images} 
              productName={product.name} 
            />
          </div>

          {/* Right Column: Details & Selection */}
          <div className="space-y-8">
            <div>
              <div className="mb-4">
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                  {product.category.replace("-", " ")}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2A2522] mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm font-sans">SKU: {product.sku}</p>
            </div>

            <p className="text-black leading-relaxed text-base md:text-lg font-sans">
              {product.description}
            </p>

            <div className="h-px bg-gray-200" />

            {/* Selectors */}
            <div className="space-y-6">
              <ProductVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProductSpecSelector
                  label="Grosor"
                  options={product.thickness}
                  selectedOption={selectedThickness}
                  onSelectOption={setSelectedThickness}
                />
                
                <ProductSpecSelector
                  label="Tamaño / Área"
                  options={product.sizes}
                  selectedOption={selectedSize}
                  onSelectOption={setSelectedSize}
                />
              </div>

              {/* Quantity & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-black">
                    Cantidad (piezas)
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg bg-gray-50 overflow-hidden h-11 md:h-12 hover:border-[#8B5A2B] transition-colors w-full max-w-[200px]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:text-[#8B5A2B] hover:bg-white transition-colors font-bold text-base md:text-lg leading-none disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-center bg-white border-x border-gray-300 text-gray-800 font-semibold focus:outline-none focus:ring-0 text-sm md:text-base min-w-0 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      style={{ WebkitAppearance: 'textfield' }}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:text-[#8B5A2B] hover:bg-white transition-colors font-bold text-base md:text-lg leading-none flex-shrink-0"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-black">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Especifique requerimientos especiales..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8B5A2B] focus:border-[#8B5A2B] h-20 resize-none text-sm text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleAddToQuotation}
                className="flex-1 bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-[#8B5A2B]/20 transition-all hover:-translate-y-1"
              >
                Agregar a Cotización
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestSample}
                className="flex-1 border-gray-300 hover:border-[#8B5A2B] hover:text-[#8B5A2B] py-6 rounded-xl text-lg font-semibold"
              >
                Solicitar Muestra
              </Button>
            </div>

            {/* Tech Sheet Download */}
            {product.technicalSheet && (
              <div className="pt-4 flex justify-center">
                <a
                  href={product.technicalSheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-[#8B5A2B] transition-colors gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Descargar Ficha Técnica PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
