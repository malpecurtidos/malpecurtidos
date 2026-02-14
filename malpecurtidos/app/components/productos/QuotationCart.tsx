import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { useQuotation } from "~/contexts/QuotationContext";
import { Button } from "~/ui/button";

export function QuotationCart() {
  const { items, isOpen, setIsOpen, removeFromQuotation, totalItems, clearQuotation } = useQuotation();
  const [showForm, setShowForm] = useState(false);
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success;

  // Reset form view when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset slightly to avoid UI jump while closing
      const timer = setTimeout(() => {
        setShowForm(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle success auto-close
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        clearQuotation();
        setIsOpen(false);
        // Reset form state is handled by the isOpen effect above effectively, 
        // but we can ensure it's reset after the animation.
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, clearQuotation, setIsOpen]);

  if (items.length === 0 && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && items.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-[#4A3728] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          aria-label="Ver solicitud de muestras"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            <span className="absolute -top-3 -right-3 bg-[#967D59] text-[#1A1816] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1A1816]">
              {totalItems}
            </span>
          </div>
        </button>
      )}

      {/* Slide-in Panel Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="p-6 bg-black text-white flex items-center justify-between shadow-lg border-b border-white/10">
          <div className="flex items-center gap-3">
            {showForm && !isSuccess && (
              <button onClick={() => setShowForm(false)} className="mr-2 hover:bg-white/10 p-1 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
            )}
            <h2 className="text-xl font-semibold flex items-center gap-2 uppercase tracking-wider">
              {showForm ? (
                <span>Confirmar Solicitud</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  <span>Muestras</span>
                  <span className="text-[#967D59]">({totalItems})</span>
                </>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Content */}
        {!showForm ? (
          // --- CART VIEW ---
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  <p>Tu lista de muestras está vacía</p>
                  <Button onClick={() => setIsOpen(false)} variant="link" className="text-[#4A3728]">
                    Volver al catálogo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={`${item.productId}-${item.variantId}-${idx}`} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-[#1A1816] truncate pr-8 text-sm">{item.productName}</h3>
                          <button
                            onClick={() => removeFromQuotation(item.productId, item.variantId)}
                            className="text-gray-400 hover:text-red-500 absolute top-4 right-4 p-1.5 hover:bg-red-50 rounded-full transition-all"
                            title="Eliminar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 font-sans font-medium">
                          {item.variantName} • {item.thickness}
                        </p>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[#F5F2ED] text-black rounded-lg text-sm border border-[#4A3728]/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4A3728] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                  <p className="font-sans text-black">Los precios y tiempos de entrega se confirmarán en la propuesta formal.</p>
                </div>

                <Button onClick={() => setShowForm(true)} className="w-full bg-[#4A3728] hover:bg-[#A67C52] text-white py-6 text-lg font-bold shadow-lg uppercase tracking-wider">
                  Solicitar Muestras
                </Button>
              </div>
            )}
          </>
        ) : (
          // --- FORM VIEW ---
          <div className="flex-1 overflow-y-auto p-6">
            {/* Resumen */}
            <div className="mb-6 p-4 bg-[#F5F2ED] rounded-lg border border-[#4A3728]/20">
              <p className="text-sm font-semibold text-[#1A1816] mb-1 font-sans">Solicitud de Muestras</p>
              <p className="text-base text-[#4A3728] font-bold font-sans">{items.length} productos seleccionados</p>
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
                <p className="text-gray-600 font-sans">Te contactaremos pronto para coordinar el envío de tus muestras.</p>
              </div>
            ) : (
              <fetcher.Form method="post" action="/api/quotation" className="space-y-6">
                {/* Hidden field for items JSON */}
                <input type="hidden" name="items" value={JSON.stringify(items)} />
                {/* Honeypot */}
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Nombre Completo *</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Empresa (Opcional)</label>
                    <input name="company" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400" placeholder="Nombre de tu empresa" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Email Corporativo *</label>
                    <input required name="email" type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400" placeholder="correo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Teléfono / WhatsApp *</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] font-sans transition-all text-black placeholder:text-gray-400" placeholder="+52 (477) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Mensaje Adicional</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A3728] focus:border-[#4A3728] resize-none font-sans transition-all text-black placeholder:text-gray-400" placeholder="¿Alguna especificación o duda particular?"></textarea>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F2ED] rounded-lg border border-[#4A3728]/20">
                  <input
                    required
                    type="checkbox"
                    id="privacy-cart"
                    name="privacy"
                    className="mt-1 w-4 h-4 text-[#4A3728] border-gray-300 rounded focus:ring-2 focus:ring-[#4A3728]"
                  />
                  <label htmlFor="privacy-cart" className="text-xs text-gray-600 font-sans leading-relaxed">
                    Acepto que mis datos sean procesados por MALPE Curtidos para gestionar esta solicitud, de acuerdo con su <a href="#" className="underline hover:text-[#4A3728] transition-colors">Política de Privacidad</a>.
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
        )}
      </div>
    </>
  );
}

