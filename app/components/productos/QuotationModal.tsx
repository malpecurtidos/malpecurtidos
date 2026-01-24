import React, { useState } from "react";
import { useFetcher } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"; // Assuming UI components exist or I'll create a basic modal
import { Button } from "~/ui/button";
import { useQuotation } from "~/contexts/QuotationContext";

export function QuotationModal() {
  const { items, clearQuotation, setIsOpen } = useQuotation();
  const fetcher = useFetcher();
  const [open, setModalOpen] = useState(false);

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success;

  React.useEffect(() => {
    if (isSuccess) {
      // Cerrar después de 2 segundos para que el usuario vea la confirmación
      const timer = setTimeout(() => {
        clearQuotation();
        setModalOpen(false);
        setIsOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, clearQuotation, setIsOpen]);

  return (
    <Dialog open={open} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-6 text-lg font-bold shadow-lg">
          Solicitar Cotización
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white p-0 gap-0 rounded-xl shadow-2xl">
        <div className="bg-black p-6 md:p-8 text-white border-b border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Confirmar Solicitud</DialogTitle>
            <DialogDescription className="text-white/70 text-sm md:text-base font-sans mt-2">
              Completa tus datos para enviarte la propuesta formal.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6">
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
              <p className="text-lg font-semibold text-[#2A2522] mb-2 font-sans">
                ¡Solicitud Enviada!
              </p>
              <p className="text-gray-600 font-sans">Te contactaremos pronto.</p>
            </div>
          ) : (
            <fetcher.Form method="post" action="/api/quotation" className="space-y-6">
              {/* Hidden field for items JSON */}
              <input type="hidden" name="items" value={JSON.stringify(items)} />
              
              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Nombre Completo *</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5A2B] focus:border-[#8B5A2B] font-sans transition-all text-black placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Empresa (Opcional)</label>
                  <input name="company" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5A2B] focus:border-[#8B5A2B] font-sans transition-all text-black placeholder:text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Email Corporativo *</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5A2B] focus:border-[#8B5A2B] font-sans transition-all text-black placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Teléfono / WhatsApp *</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5A2B] focus:border-[#8B5A2B] font-sans transition-all text-black placeholder:text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider font-sans">Mensaje Adicional</label>
                <textarea name="message" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5A2B] focus:border-[#8B5A2B] resize-none font-sans transition-all text-black placeholder:text-gray-400" placeholder="¿Alguna especificación o duda particular?"></textarea>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F9F7F2] rounded-lg border border-[#8B5A2B]/20">
                 <input 
                   required 
                   type="checkbox" 
                   id="privacy" 
                   name="privacy" 
                   className="mt-1 w-4 h-4 text-[#8B5A2B] border-gray-300 rounded focus:ring-2 focus:ring-[#8B5A2B]"
                 />
                 <label htmlFor="privacy" className="text-xs text-gray-600 font-sans leading-relaxed">
                   Acepto que mis datos sean procesados por MALPE Curtidos para generar esta cotización, de acuerdo con su <a href="#" className="underline hover:text-[#8B5A2B] transition-colors">Política de Privacidad</a>.
                 </label>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#8B5A2B] hover:bg-[#6B4423] text-white py-6 text-base font-bold shadow-lg uppercase tracking-wider transition-all"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </fetcher.Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
