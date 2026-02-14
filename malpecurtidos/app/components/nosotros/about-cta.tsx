import { Link } from "react-router";
import { Button } from "~/ui/button";

export function AboutCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#FAF8F5]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#1A1816] rounded-[2.5rem] p-8 md:p-20 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
            {/* Textura de ruido sutil */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>

            {/* Gradiente de luz radial */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#4A3728]/20 to-transparent opacity-50" />

            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center relative z-10">
              <div className="lg:col-span-3 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A3728] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A3728]"></span>
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Innovación en cada piel</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  Lleva tu visión <br />
                  <span className="text-[#4A3728]">al siguiente nivel</span>
                </h2>
                
                <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                  Nuestra maestría en la transformación del cuero está a tu disposición para crear productos extraordinarios.
                </p>

                <div className="flex flex-wrap gap-5 pt-4">
                  <Button 
                    variant="primary" 
                    className="bg-[#4A3728] hover:bg-[#A67C52] text-white px-8 md:px-10 py-7 rounded-2xl text-base md:text-lg font-bold transition-all duration-500 shadow-xl shadow-[#4A3728]/20 hover:shadow-[#4A3728]/40 hover:-translate-y-1"
                  >
                    Contáctanos
                  </Button>
                  <Link to="/productos">
                    <Button 
                      variant="glassmorphism" 
                      className="border-white/10 text-white hover:bg-white/5 backdrop-blur-sm px-8 md:px-10 py-7 rounded-2xl text-base md:text-lg font-semibold transition-all duration-300"
                    >
                      Explorar Catálogo
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 relative hidden md:block">
                <div className="aspect-square relative flex items-center justify-center">
                  {/* Anillos orbitales */}
                  <div className="absolute inset-0 border border-[#4A3728]/20 rounded-full animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute inset-16 border border-[#4A3728]/10 rounded-full animate-[spin_25s_linear_infinite]" />
                  
                  {/* Elemento central: Imagen de Cuero Premium */}
                  <div className="relative w-64 h-80 bg-[#4A2D14] rounded-[2rem] shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-700 ease-out overflow-hidden">
                    <img
                      src="/about-imgs/about-cta.webp"
                      alt="Textura de cuero premium MALPE"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Brillo dinámico */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2A1808]/40 to-transparent opacity-60" />
                    
                    {/* Costura decorativa */}
                    <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-[1.5rem] pointer-events-none" />
                    
                    {/* Etiqueta flotante */}
                    <div className="absolute top-8 right-0 bg-[#967D59] px-3 py-1 -rotate-90 origin-right translate-x-2">
                      <span className="text-[10px] font-bold text-[#1A1816] uppercase tracking-tighter">Premium Grade</span>
                    </div>
                  </div>

                  {/* Elementos flotantes secundarios */}
                  <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl -rotate-12 translate-x-10 group-hover:translate-x-4 transition-transform duration-700">
                    <div className="w-8 h-8 rounded-full bg-[#4A3728]/20 flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-[#4A3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white text-[10px] font-bold uppercase tracking-wider">Calidad<br/>Total</p>
                  </div>

                  <div className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl rotate-12 -translate-x-10 group-hover:-translate-x-4 transition-transform duration-700">
                    <div className="w-8 h-8 rounded-full bg-[#4A3728]/20 flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-[#4A3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-white text-[10px] font-bold uppercase tracking-wider">Innovación<br/>Constante</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

