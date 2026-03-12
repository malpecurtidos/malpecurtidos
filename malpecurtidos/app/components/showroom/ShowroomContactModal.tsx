import React, { useEffect, useRef, useState } from "react";
import { Link, useFetcher } from "react-router";
import { Button } from "~/ui/button";
import type { ShowroomProduct, ShowroomSkinOption } from "~/data/showroomData";
import { FormSecurityFields } from "~/components/forms/FormSecurityFields";
import { FormStatusMessage } from "~/components/forms/FormStatusMessage";

interface ShowroomContactModalProps {
  product: ShowroomProduct;
  selectedSkin: ShowroomSkinOption;
}

export function ShowroomContactModal({ product, selectedSkin }: ShowroomContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = fetcher.state !== "idle";
  const isSuccess = hasSubmitted && Boolean(fetcher.data?.success);
  const errorMessage = hasSubmitted && typeof fetcher.data?.error === "string" ? fetcher.data.error : "";

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    formRef.current?.reset();
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  useEffect(() => {
    if (!isOpen) {
      setHasSubmitted(false);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#4A3728] hover:bg-[#A67C52] text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-[#4A3728]/20 transition-all hover:-translate-y-1"
      >
        Contactar sobre este Producto
      </Button>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 bg-black text-white flex items-center justify-between shadow-lg border-b border-white/10">
          <h2 className="text-xl font-semibold flex items-center gap-3 uppercase tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Solicitar Información</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 p-4 bg-[#111] rounded-lg border border-zinc-700">
            <p className="text-sm font-semibold text-white mb-2 font-sans">Producto de Interés:</p>
            <p className="text-base text-[#967D59] font-bold font-sans">{product.name}</p>
            <p className="text-sm text-gray-400 mt-1 font-sans">
              Piel: {selectedSkin.skinName} - {selectedSkin.variantName}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white mb-2 font-sans">
                Solicitud enviada
              </p>
              <p className="text-gray-400 font-sans">Te contactaremos pronto.</p>
            </div>
          ) : (
            <fetcher.Form ref={formRef} method="post" action="/api/showroom" className="space-y-6" onSubmit={() => setHasSubmitted(true)}>
              <FormSecurityFields />
              <input type="hidden" name="productName" value={product.name} />
              <input type="hidden" name="productCategory" value={product.category} />
              <input type="hidden" name="skinName" value={selectedSkin.skinName} />
              <input type="hidden" name="skinVariant" value={selectedSkin.variantName} />
              <input type="hidden" name="skinId" value={selectedSkin.skinId} />
              <input type="hidden" name="variantId" value={selectedSkin.variantId} />

              {errorMessage ? <FormStatusMessage tone="error" message={errorMessage} /> : null}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                    Nombre Completo *
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 border border-zinc-700 bg-black rounded-lg focus:ring-2 focus:ring-[#967D59] focus:border-[#967D59] font-sans transition-all text-white placeholder:text-zinc-600"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                    Empresa
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full px-4 py-3 border border-zinc-700 bg-black rounded-lg focus:ring-2 focus:ring-[#967D59] focus:border-[#967D59] font-sans transition-all text-white placeholder:text-zinc-600"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                    Email Corporativo *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border border-zinc-700 bg-black rounded-lg focus:ring-2 focus:ring-[#967D59] focus:border-[#967D59] font-sans transition-all text-white placeholder:text-zinc-600"
                    placeholder="correo@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-zinc-700 bg-black rounded-lg focus:ring-2 focus:ring-[#967D59] focus:border-[#967D59] font-sans transition-all text-white placeholder:text-zinc-600"
                    placeholder="+52 (477) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-sans">
                  Mensaje Adicional
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-700 bg-black rounded-lg focus:ring-2 focus:ring-[#967D59] focus:border-[#967D59] resize-none font-sans transition-all text-white placeholder:text-zinc-600"
                  placeholder="¿Alguna especificación o duda particular sobre este producto o la piel seleccionada?"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#111] rounded-lg border border-zinc-700">
                <input
                  required
                  type="checkbox"
                  id="privacy-showroom"
                  name="privacy"
                  className="mt-1 w-4 h-4 text-[#967D59] border-zinc-600 bg-black rounded focus:ring-2 focus:ring-[#967D59]"
                />
                <label htmlFor="privacy-showroom" className="text-xs text-gray-400 font-sans leading-relaxed">
                  Acepto que mis datos sean procesados por MALPE Curtidos para contactarme sobre este producto, de acuerdo con el{" "}
                  <Link to="/aviso-de-privacidad" className="underline hover:text-[#967D59] transition-colors">Aviso de Privacidad</Link>
                  {" "}y los{" "}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-[#967D59] transition-colors">Términos y Condiciones</Link>.
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4A3728] hover:bg-[#6B4423] text-white py-6 text-base font-bold shadow-lg uppercase tracking-wider transition-all"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </fetcher.Form>
          )}
        </div>
      </div>
    </>
  );
}
