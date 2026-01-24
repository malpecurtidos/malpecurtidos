import { useQuotation } from "~/contexts/QuotationContext";
import { Button } from "~/ui/button";
import { QuotationModal } from "./QuotationModal";

export function QuotationCart() {
  const { items, isOpen, setIsOpen, removeFromQuotation, updateQuantity, totalItems } = useQuotation();

  if (items.length === 0 && !isOpen) {
    return null; // Don't show floating button if empty
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && items.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-[#8B5A2B] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          aria-label="Ver cotización"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span className="absolute -top-3 -right-3 bg-[#D4AF37] text-[#2A2522] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#2A2522]">
              {totalItems}
            </span>
          </div>
        </button>
      )}

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Cotización</span>
            <span className="text-[#D4AF37]">({totalItems})</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <p>Tu lista de cotización está vacía</p>
              <Button onClick={() => setIsOpen(false)} variant="link" className="text-[#8B5A2B]">
                Volver al catálogo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={`${item.productId}-${item.variantId}-${idx}`} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#2A2522] truncate pr-8 text-sm">{item.productName}</h3>
                      <button 
                        onClick={() => removeFromQuotation(item.productId, item.variantId)}
                        className="text-gray-400 hover:text-red-500 absolute top-4 right-4 p-1.5 hover:bg-red-50 rounded-full transition-all"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 font-sans font-medium">
                      {item.variantName} • {item.thickness} • {item.size}
                    </p>

                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="flex items-center border-2 border-gray-300 rounded-lg bg-gray-50 overflow-hidden h-10 md:h-11 shadow-sm hover:border-[#8B5A2B] transition-colors">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:text-[#8B5A2B] hover:bg-white transition-colors font-bold text-base md:text-lg leading-none disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold min-w-[2.5rem] md:min-w-[3rem] text-center bg-white border-x border-gray-300 text-gray-800">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-3 md:px-4 py-2.5 md:py-3 text-gray-700 hover:text-[#8B5A2B] hover:bg-white transition-colors font-bold text-base md:text-lg leading-none flex-shrink-0"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-600 font-sans font-semibold uppercase tracking-wider">piezas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-y-4">
             <div className="flex items-start gap-3 p-4 bg-[#F9F7F2] text-black rounded-lg text-sm border border-[#8B5A2B]/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5A2B] shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
               <p className="font-sans text-black">Los precios y tiempos de entrega se confirmarán en la propuesta formal.</p>
             </div>
             
             <QuotationModal />
          </div>
        )}
      </div>
    </>
  );
}
