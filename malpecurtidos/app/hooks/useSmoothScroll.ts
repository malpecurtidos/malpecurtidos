import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const getLenisInstance = (): Lenis | null => lenisInstance;

const useSmoothScroll = (shouldEnable: boolean = true) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Solo inicializar si está habilitado
    if (!shouldEnable) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, [shouldEnable]);

  return lenisRef;
};

export default useSmoothScroll;
