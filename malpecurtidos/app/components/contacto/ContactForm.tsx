import { useState, useRef, useEffect } from "react";
import { Button } from "~/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const subjectOptions = [
  { value: "ventas", label: "Ventas / Cotización" },
  { value: "informacion", label: "Información General" },
  { value: "proveedores", label: "Proveedores" },
  { value: "otro", label: "Otro" },
];

export function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<typeof subjectOptions[0] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Envíanos un mensaje</h3>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Nombre</label>
            <input
              type="text"
              id="name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#967D59] focus:ring-1 focus:ring-[#967D59] transition-all hover:bg-white/10"
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#967D59] focus:ring-1 focus:ring-[#967D59] transition-all hover:bg-white/10"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#967D59] focus:ring-1 focus:ring-[#967D59] transition-all hover:bg-white/10"
              placeholder="(477) 000 0000"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-300 ml-1">Empresa</label>
            <input
              type="text"
              id="company"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#967D59] focus:ring-1 focus:ring-[#967D59] transition-all hover:bg-white/10"
              placeholder="Nombre de tu empresa"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Asunto</label>
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white flex items-center justify-between cursor-pointer transition-all hover:bg-white/10 ${isOpen ? 'border-[#967D59] ring-1 ring-[#967D59]' : ''
                }`}
            >
              <span className={selectedOption ? "text-white" : "text-gray-500"}>
                {selectedOption ? selectedOption.label : "Selecciona un asunto"}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 4 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 w-full bg-[#1a1a1a] border border-white/10 rounded-xl mt-1 shadow-2xl overflow-hidden py-2"
                >
                  {subjectOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelectedOption(option);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-[#967D59]/10 hover:text-[#967D59] ${selectedOption?.value === option.value ? "text-[#967D59] bg-[#967D59]/5" : "text-gray-300"
                        }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <input type="hidden" name="subject" value={selectedOption?.value || ""} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Mensaje</label>
          <textarea
            id="message"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#967D59] focus:ring-1 focus:ring-[#967D59] transition-all resize-none hover:bg-white/10"
            placeholder="¿Cómo podemos ayudarte?"
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full py-4 flex items-center justify-center gap-2"
        >
          <span>Enviar Mensaje</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        </Button>
      </form>
    </div>
  );
}

