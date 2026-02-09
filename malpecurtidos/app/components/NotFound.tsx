import { Link } from "react-router";
import { Button } from "~/ui/button";

export function NotFound() {
    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B5A2B]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B5A2B]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] leading-none select-none">
                    404
                </h1>

                <div className="-mt-12 md:-mt-20 relative">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>

                    <div className="flex justify-center">
                        <Link to="/">
                            <Button variant="primary">
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
