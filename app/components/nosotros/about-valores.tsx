
export function AboutValores() {
  const values = [
    { 
      name: "Generosidad", 
      x: 0, y: -120,
      description: "Compartimos nuestro éxito y conocimiento con la comunidad."
    },
    { 
      name: "Respeto", 
      x: 104, y: -60,
      description: "Valoramos la integridad de cada individuo y el medio ambiente."
    },
    { 
      name: "Responsabilidad", 
      x: 104, y: 60,
      description: "Cumplimos con excelencia nuestros compromisos y procesos."
    },
    { 
      name: "Disciplina", 
      x: 0, y: 120,
      description: "Mantenemos el rigor en la calidad y mejora continua."
    },
    { 
      name: "Colaboración", 
      x: -104, y: 60,
      description: "Trabajamos en equipo para alcanzar metas extraordinarias."
    },
    { 
      name: "Pasión", 
      x: -104, y: -60,
      description: "Ponemos el corazón en cada piel que transformamos."
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
   
      <div className="max-w-[80%] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#8B5A2B]/10 rounded-full">
              <span className="text-[#8B5A2B] text-xs font-bold tracking-[0.2em] uppercase">Nuestra Identidad</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Tradición que <br />
              <span className="text-[#8B5A2B]">Transforma</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Malpe es una empresa dedicada a la transformación de la piel en cuero para corte y tapicería. 
              Desde su fundación en el año 1998 hasta la fecha, ha mantenido la esencia en su filosofía y misión.
            </p>
          </div>

          {/* Right Side: Creative Values Diagram */}
          <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] scale-75 md:scale-100">
            {/* Geometric Structure (SVG Lines) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto">
                {/* Connecting lines to center */}
                {values.map((v, i) => (
                  <line 
                    key={i}
                    x1="200" y1="200" 
                    x2={200 + v.x} y2={200 + v.y} 
                    stroke="#8B5A2B" 
                    strokeWidth="1.5" 
                    strokeOpacity="0.3"
                  />
                ))}
                
                {/* Connecting outer nodes to form the complex geometric shape */}
                <path 
                  d="M200 80 L304 140 L304 260 L200 320 L96 260 L96 140 Z" 
                  fill="none" 
                  stroke="#8B5A2B" 
                  strokeWidth="2" 
                  strokeOpacity="0.5"
                />
                
                {/* Inner triangles for the icosahedron look */}
                <path 
                  d="M200 80 L304 260 L96 260 Z M96 140 L304 140 L200 320 Z" 
                  fill="none" 
                  stroke="#8B5A2B" 
                  strokeWidth="1" 
                  strokeOpacity="0.2"
                />
              </svg>
            </div>

            {/* Central Value */}
            <div className="relative z-20 w-28 h-28 md:w-32 md:h-32 rounded-full bg-white shadow-[0_0_50px_rgba(139,90,43,0.15)] border-2 border-[#8B5A2B] flex items-center justify-center p-4 text-center group transition-transform duration-500 hover:scale-110">
              <div className="relative">
                <span className="block text-[#8B5A2B] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Eje Central</span>
                <span className="block text-lg md:text-xl font-black text-gray-900 tracking-tighter uppercase">Calidad</span>
              </div>
            </div>

            {/* Surrounding Values */}
            {values.map((value, idx) => (
              <div 
                key={idx}
                className="absolute z-20 group cursor-default"
                style={{ 
                  transform: `translate(${value.x}px, ${value.y}px)`
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Small point */}
                  <div className="w-3 h-3 rounded-full bg-[#8B5A2B] shadow-lg shadow-[#8B5A2B]/40 group-hover:scale-150 transition-all duration-300"></div>
                  
                  {/* Label - Improved positioning and visibility */}
                  <div className={`absolute whitespace-nowrap px-4 py-2 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-300
                    ${value.x > 0 ? "left-6" : value.x < 0 ? "right-6" : "left-1/2 -translate-x-1/2"}
                    ${value.y > 0 ? "top-6" : "bottom-6"}
                    opacity-90 group-hover:opacity-100 group-hover:scale-110 z-30
                  `}>
                    <span className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-[0.15em]">{value.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
