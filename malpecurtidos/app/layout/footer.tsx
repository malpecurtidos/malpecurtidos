import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#121212] via-[#0f0f0f] to-[#0a0a0a] text-white">
      <div className="max-w-[90%] mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Section 1: Brand Information */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logos/logo.png"
                alt="MALPE Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Proveeduría de cuero de alta calidad en Latinoamérica. Innovación,
              tecnología y tradición en cada pieza.
            </p>
          </div>

          {/* Section 2: Site Map */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Mapa del Sitio</h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Inicio
              </Link>
              <Link
                to="/nosotros"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Nosotros
              </Link>
              <Link
                to="/productos"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Productos
              </Link>
              <Link
                to="/showroom"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Showroom
              </Link>
              <Link
                to="/tendencias"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Tendencias
              </Link>
            </nav>
          </div>

          {/* Section 3: Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <div className="flex flex-col gap-4">
              {/* Location */}
              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#8B5A2B] flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-300 text-sm">
                  Blvd. Aeropuerto 123, León, Gto. México
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#8B5A2B] flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3528 21.3992C21.1483 21.5858 20.9074 21.7262 20.6446 21.8111C20.3818 21.896 20.103 21.9235 19.828 21.892C16.7432 21.4551 13.762 20.3406 11.07 18.62C8.63397 17.0522 6.53797 14.9562 4.96997 12.52C3.24997 9.82797 2.13547 6.84677 1.69897 3.76197C1.66747 3.48697 1.69497 3.20817 1.77987 2.94537C1.86477 2.68257 2.00517 2.44167 2.19177 2.23717C2.37837 2.03267 2.60677 1.86907 2.86177 1.75747C3.11677 1.64587 3.39247 1.58887 3.67097 1.58997H6.67097C7.19797 1.58597 7.70477 1.78297 8.08277 2.13597C8.46077 2.48897 8.68077 2.97097 8.69897 3.49797C8.76277 4.51297 8.93677 5.51797 9.21697 6.49797C9.34477 6.95197 9.29877 7.43797 9.08897 7.85797C8.87917 8.27797 8.52177 8.60197 8.07897 8.76197L6.60897 9.28197C7.82077 11.888 9.61197 14.2792 11.858 16.281C13.8598 18.5272 16.251 20.3184 18.858 21.53L19.378 20.06C19.538 19.6172 19.862 19.2598 20.282 19.05C20.702 18.8402 21.188 18.7942 21.642 18.922C22.622 19.2022 23.627 19.3762 24.642 19.44C25.169 19.4582 25.651 19.6782 26.004 20.0562C26.357 20.4342 26.554 20.941 26.55 21.468L22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="tel:+524777785045"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +52 (477) 778-5045
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#8B5A2B] flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="mailto:ventas@malpe.com.mx"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  ventas@malpe.com.mx
                </a>
              </div>
            </div>
          </div>

          {/* Section 4: Social Media */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal Links */}
        <div className="border-t border-[#2a2a2a] pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Curtidos Malpe. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/aviso-de-privacidad"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Aviso de Privacidad
              </Link>
              <Link
                to="/terminos-y-condiciones"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
