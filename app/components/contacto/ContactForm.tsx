export function ContactForm() {
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:bg-white/10"
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:bg-white/10"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">Teléfono</label>
          <input
            type="tel"
            id="phone"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:bg-white/10"
            placeholder="(477) 000 0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Asunto</label>
          <select
             id="subject"
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all hover:bg-white/10 [&>option]:bg-[#1a1a1a]"
          >
            <option value="" disabled selected>Selecciona un asunto</option>
            <option value="ventas">Ventas / Cotización</option>
            <option value="informacion">Información General</option>
            <option value="proveedores">Proveedores</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Mensaje</label>
          <textarea
            id="message"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none hover:bg-white/10"
            placeholder="¿Cómo podemos ayudarte?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#2A2522] font-bold py-4 rounded-xl hover:bg-[#F2C94C] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
        >
          <span>Enviar Mensaje</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  );
}
