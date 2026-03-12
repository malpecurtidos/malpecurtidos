import { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/ui/dialog";
import { Button } from "~/ui/button";
import { FormSecurityFields } from "~/components/forms/FormSecurityFields";
import { FormStatusMessage } from "~/components/forms/FormStatusMessage";

interface ProductRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "sample" | "tech_sheet" | null;
  productId: string;
  productName: string;
  sku: string;
  variantName: string;
  thickness: string;
}

export function ProductRequestModal({
  isOpen,
  onClose,
  type,
  productId,
  productName,
  sku,
  variantName,
  thickness,
}: ProductRequestModalProps) {
  const fetcher = useFetcher();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isSubmitting = fetcher.state !== "idle";
  const isSuccess = hasSubmitted && Boolean(fetcher.data?.success);
  const errorMessage = hasSubmitted && typeof fetcher.data?.error === "string" ? fetcher.data.error : "";

  useEffect(() => {
    if (!isSuccess || !isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setHasSubmitted(false);
    }
  }, [isOpen]);

  if (!type) return null;

  const title = type === "sample" ? "Solicitar Muestra Física" : "Solicitar Ficha Técnica";
  const description =
    type === "sample"
      ? "Completa el formulario para solicitar una muestra de este producto."
      : "Completa el formulario para que ventas te envíe la ficha técnica manualmente.";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-zinc-900 border border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">{title}</DialogTitle>
          <DialogDescription className="text-gray-400 font-sans">{description}</DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Solicitud enviada</h3>
            <p className="text-gray-400">Ventas revisará la solicitud y te responderá a la brevedad.</p>
          </div>
        ) : (
          <fetcher.Form method="post" action="/api/request" className="space-y-4 mt-6" onSubmit={() => setHasSubmitted(true)}>
            <FormSecurityFields />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="productName" value={productName} />
            <input type="hidden" name="sku" value={sku} />
            <input type="hidden" name="variantName" value={variantName} />
            <input type="hidden" name="thickness" value={thickness} />

            {errorMessage ? <FormStatusMessage tone="error" message={errorMessage} /> : null}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nombre *</label>
                <input required name="name" id="name" type="text" className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg focus:ring-[#967D59] focus:border-[#967D59] text-sm text-white placeholder-zinc-600" placeholder="Su nombre" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Teléfono *</label>
                <input required name="phone" id="phone" type="tel" className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg focus:ring-[#967D59] focus:border-[#967D59] text-sm text-white placeholder-zinc-600" placeholder="(000) 000 0000" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Empresa (Opcional)</label>
              <input name="company" id="company" type="text" className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg focus:ring-[#967D59] focus:border-[#967D59] text-sm text-white placeholder-zinc-600" placeholder="Nombre de su empresa" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Corporativo *</label>
              <input required name="email" id="email" type="email" className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg focus:ring-[#967D59] focus:border-[#967D59] text-sm text-white placeholder-zinc-600" placeholder="correo@empresa.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-400">Mensaje Adicional</label>
              <textarea name="message" id="message" rows={3} className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg focus:ring-[#967D59] focus:border-[#967D59] text-sm text-white resize-none placeholder-zinc-600" placeholder="Comentarios adicionales..." />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input required type="checkbox" name="privacy" id="privacy-req" className="mt-1 w-4 h-4 text-[#967D59] bg-black border-zinc-700 rounded focus:ring-[#967D59]" />
              <label htmlFor="privacy-req" className="text-xs text-gray-400">
                Acepto que mis datos sean procesados para gestionar esta solicitud de acuerdo con el{" "}
                <Link to="/aviso-de-privacidad" className="underline hover:text-[#967D59]">Aviso de Privacidad</Link>
                {" "}y los{" "}
                <Link to="/terminos-y-condiciones" className="underline hover:text-[#967D59]">Términos y Condiciones</Link>.
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white">
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#967D59] hover:bg-[#B3936B] text-white min-w-[140px]" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </div>
          </fetcher.Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
