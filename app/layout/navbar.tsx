import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useQuotation } from "~/contexts/QuotationContext";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/productos", label: "Productos" },
  { to: "/showroom", label: "Showroom" },
  { to: "/contacto", label: "Contacto" },
];

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems, setIsOpen } = useQuotation();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const whatsappNumber = "524777785045";
  const whatsappMessage = encodeURIComponent(
    "Hola, me gustaría obtener más información sobre sus productos."
  );

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism Container */}
      <div className="mx-4 mt-4 md:mx-8 lg:mx-12">
        <div
          className="relative rounded-2xl border border-white/10 px-4 py-3 md:px-6 md:py-4"
          style={{
            background: "rgba(15, 15, 15, 0.75)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Ir al inicio"
            >
              <img
                src="/logos/logo.png"
                alt="MALPE Logo"
                className="h-10 w-auto md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Navigation Links - Center (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-xl group ${isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                      }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Active/Hover Background */}
                    <span
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                        ? "bg-gradient-to-r from-white/30 to-white/10"
                        : "bg-white/0 group-hover:bg-white/5"
                        }`}
                    />
                    {/* Active Indicator Line */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-white/80 to-white/60 rounded-full transition-all duration-300 ${isActive ? "w-6" : "w-0 group-hover:w-4"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Section - Language & WhatsApp */}
            <div className="flex items-center gap-3">
              {/* Quotation Cart Trigger */}
              {totalItems > 0 && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#2A2522] bg-[#D4AF37] hover:bg-[#F2C94C] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 group"
                  aria-label="Ver cotización"
                >
                  <span className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  </span>
                  <span className="font-bold">{totalItems}</span>
                </button>
              )}

              {/* Language Selector */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  aria-label="Seleccionar idioma"
                >
                  <span>
                    {languages.find((l) => l.code === currentLang)?.label}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${isLangOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Language Dropdown */}
                <div
                  className={`absolute top-full right-0 mt-2 py-2 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 ease-out ${isLangOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                    }`}
                  style={{
                    background: "rgba(15, 15, 15, 0.95)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-center w-full px-4 py-2 text-sm transition-colors ${currentLang === lang.code
                        ? "text-white bg-white/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/30 hover:scale-105"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                aria-label="Contactar por WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  fill="#25D366"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                aria-label="Abrir menú"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-64 mt-4 pt-4 border-t border-white/10" : "max-h-0"
              }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                      ? "text-white bg-gradient-to-r from-white/30 to-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
