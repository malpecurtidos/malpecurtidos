export function ContactInfo() {
  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Información de Contacto</h3>

      <div className="space-y-8">
        {/* Address */}
        <div className="flex items-start gap-4 group">
          <div className="p-3 rounded-xl bg-[#A67B5B]/10 text-[#A67B5B] group-hover:bg-[#A67B5B] group-hover:text-[#1a1a1a] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Ubicación</h4>
            <p className="text-gray-400 leading-relaxed font-light">
              Blvd. Hermanos Aldama 4208<br />
              Ciudad Industrial, 37490<br />
              León, Gto., México
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 group">
          <div className="p-3 rounded-xl bg-[#A67B5B]/10 text-[#A67B5B] group-hover:bg-[#A67B5B] group-hover:text-[#1a1a1a] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Teléfono</h4>
            <a href="tel:+524777785045" className="text-gray-400 hover:text-[#A67B5B] transition-colors font-light">
              +52 (477) 778 5045
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 group">
          <div className="p-3 rounded-xl bg-[#A67B5B]/10 text-[#A67B5B] group-hover:bg-[#A67B5B] group-hover:text-[#1a1a1a] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Email</h4>
            <a href="mailto:ventas@malpe.com.mx" className="text-gray-400 hover:text-[#A67B5B] transition-colors font-light">
              ventas@malpe.com.mx
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4 group">
          <div className="p-3 rounded-xl bg-[#A67B5B]/10 text-[#A67B5B] group-hover:bg-[#A67B5B] group-hover:text-[#1a1a1a] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Horario</h4>
            <p className="text-gray-400 font-light">
              Lunes - Viernes: 9:00 AM - 6:00 PM<br />
              Sábado: 9:00 AM - 1:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
