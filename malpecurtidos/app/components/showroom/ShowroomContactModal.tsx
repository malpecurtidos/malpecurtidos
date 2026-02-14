import React, { useState } from "react";
import { Button } from "~/ui/button";
import type { ShowroomProduct, ShowroomSkinOption } from "~/data/showroomData";

interface ShowroomContactModalProps {
  product: ShowroomProduct;
  selectedSkin: ShowroomSkinOption;
}

export function ShowroomContactModal({ product, selectedSkin }: ShowroomContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    // Construir información del showroom
    const showroomInfo = {
      productName: product.name,
      productCategory: product.category,
      skinName: selectedSkin.skinName,
      skinVariant: selectedSkin.variantName,
      skinId: selectedSkin.skinId,
      variantId: selectedSkin.variantId,
    };

    const contactData = {
      name,
      email,
      phone,
      company: company || "N/A",
      message: message || "N/A",
      showroomInfo,
    };

    // Por ahora solo mostrar en consola
    console.log("=== NEW SHOWROOM CONTACT REQUEST ===");
    console.log("Cliente:", name);
    console.log("Empresa:", company || "N/A");
    console.log("Email:", email);
    console.log("Teléfono:", phone);
    console.log("Mensaje:", message || "N/A");
    console.log("---");
    console.log("Producto de Interés:", product.name);
    console.log("Categoría:", product.category);
    console.log("Piel Seleccionada:", `${selectedSkin.skinName} - ${selectedSkin.variantName}`);
    console.log("ID Piel:", selectedSkin.skinId);
    console.log("ID Variante:", selectedSkin.variantId);
    console.log("================================");

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Cerrar sidebar después de 2 segundos
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      alert("¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.");
    }, 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#4A3728] hover:bg-[#A67C52] text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-[#4A3728]/20 transition-all hover:-translate-y-1"
      >
        Contactar sobre este Producto
      </Button>

      {/* Slide-in Panel Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 bg-black text-white flex items-center justify-between shadow-lg border-b border-white/10">
          <h2 className="text-xl font-semibold flex items-center gap-3 uppercase tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Solicitar Información</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Resumen del producto */}
          <div className="mb-6 p-4 bg-[#F5F2ED] rounded-lg border border-[#4A3728]/20">
            <p className="text-sm font-semibold text-[#1A1816] mb-2 font-sans">Producto de Interés:</p>
            <p className="text-base text-[#4A3728] font-bold font-sans">{product.name}</p>
            <p className="text-sm text-gray-600 mt-1 font-sans">
              Piel: {selectedSkin.skinName} - {selectedSkin.variantName}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#1A1816] mb-2 font-sans">
                ¡Solicitud Enviada!
              </p>
              <p className="text-gray-600 font-sans">Te contactaremos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">
                    Nombre Completo *
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">
                    Empresa *
                  </label>
                  <input
                    required
                    name="company"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">
                    Email Corporativo *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400"
                    placeholder="correo@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400"
                    placeholder="+52 (477) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">
                  Mensaje Adicional
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] resize-none font-sans transition-all text-black placeholder:text-gray-400"
                  placeholder="¿Alguna especificación o duda particular sobre este producto o la piel seleccionada?"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F5F2ED] rounded-lg border border-[#4A3728]/20">
                <input
                  required
                  type="checkbox"
                  id="privacy-showroom"
                  name="privacy"
                  className="mt-1 w-4 h-4 text-[#4A3728] border-gray-300 rounded focus:ring-2 focus:ring-[#4A3728]"
                />
                <label htmlFor="privacy-showroom" className="text-xs text-gray-600 font-sans leading-relaxed">
                  Acepto que mis datos sean procesados por MALPE Curtidos para contactarme sobre este producto, de
                  acuerdo con su{" "}
                  <a href="#" className="underline hover:text-[#4A3728] transition-colors">
                    Política de Privacidad
                  </a>
                  .
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4A3728] hover:bg-[#6B4423] text-white py-6 text-base font-bold shadow-lg uppercase tracking-wider transition-all"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

