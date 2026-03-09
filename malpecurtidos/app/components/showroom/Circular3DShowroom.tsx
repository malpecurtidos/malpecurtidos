import React, { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { Link } from "react-router";
import { Button } from "~/ui/button";
import { showroomProducts, categoryLabels } from "~/data/showroomData";
import {
  motion,
  type PanInfo,
  animate,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface GalleryItem {
  id: string;
  name: string;
  category: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function normalizeAngleDeg(a: number) {
  let x = ((a % 360) + 360) % 360;
  if (x > 180) x -= 360;
  return x;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

function loadImageAsset(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    img.decoding = "async";
    img.onload = finish;
    img.onerror = finish;
    img.src = url;

    if (img.complete) {
      finish();
      return;
    }

    if ("decode" in img) {
      img.decode().then(finish).catch(finish);
    }
  });
}

function stopGesturePropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

function GalleryRingCard({
  item,
  index,
  stepDeg,
  angle,
  radiusX,
  radiusZ,
  cardW,
  cardH,
  isMobile,
}: {
  item: GalleryItem;
  index: number;
  stepDeg: number;
  angle: ReturnType<typeof useSpring>;
  radiusX: number;
  radiusZ: number;
  cardW: number;
  cardH: number;
  isMobile: boolean;
}) {
  const a = useTransform(angle, (deg) => ((index * stepDeg + deg) * Math.PI) / 180);

  const x = useTransform(a, (rad) => Math.sin(rad) * radiusX);
  const z = useTransform(a, (rad) => Math.cos(rad) * radiusZ);
  const y = useTransform(a, (rad) => Math.cos(rad) * (isMobile ? -8 : -12));

  const depth01 = useTransform(z, (zz) => (zz + radiusZ) / (2 * radiusZ));
  const scale = useTransform(depth01, (d) => 0.64 + d * 0.36);
  const desktopOpacity = useTransform(depth01, (d) => 0.18 + d * 0.82);
  const mobileOpacity = useTransform(a, (rad) => {
    const frontness = Math.cos(rad);
    if (frontness > 0.92) return 1;

    const depth = (frontness + 1) / 2;
    return 0.22 + depth * 0.66;
  });
  const opacity = isMobile ? mobileOpacity : desktopOpacity;
  const zIndex = useTransform(depth01, (d) => Math.round(d * 100));

  const desktopRotateY = useTransform(a, (rad) => (rad * 180) / Math.PI);
  const mobileRotateYRaw = useTransform(a, (rad) => {
    const max = isMobile ? 16 : 22;
    return -Math.sin(rad) * max;
  });
  const mobileRotateY = useSpring(mobileRotateYRaw, { stiffness: 260, damping: 34, mass: 0.9 });
  const rotateY = isMobile ? mobileRotateY : desktopRotateY;

  const desktopShadow = useTransform(depth01, (d) =>
    d > 0.85
      ? "0 24px 52px -18px rgba(255,255,255,0.14), 0 0 0 1px rgba(255,255,255,0.05)"
      : "0 10px 28px -16px rgba(255,255,255,0.08)",
  );
  const mobileShadow = useTransform(depth01, (d) =>
    d > 0.85
      ? "0 24px 48px -18px rgba(255,255,255,0.14)"
      : "0 12px 28px -16px rgba(255,255,255,0.08)",
  );
  const shadow = isMobile ? mobileShadow : desktopShadow;
  const desktopBackgroundColor = useTransform(depth01, (d) =>
    d > 0.9 ? "#111" : "rgba(24, 24, 27, 0.4)",
  );
  const backgroundColor = isMobile ? "#18181b" : (desktopBackgroundColor as unknown as string);

  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          x,
          y,
          z,
          scale,
          opacity,
          rotateY,
          zIndex,
          willChange: "transform, opacity",
        }}
      >
      <motion.div
        className="block relative overflow-hidden group border border-white/8 transition-colors duration-500 rounded-[2rem] pointer-events-auto"
        style={{
          width: cardW,
          height: cardH,
          boxShadow: shadow as unknown as string,
          backgroundColor,
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="absolute inset-x-0 top-10 md:top-14 bottom-[45%] md:bottom-[40%] flex items-center justify-center">
          <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={item.photo.url}
              alt={item.photo.text}
              className="w-full h-full object-contain"
              style={{ objectPosition: item.photo.pos || "center" }}
              draggable={false}
              decoding="async"
            />
          </div>
        </div>

        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-zinc-900/80 border border-white/10 text-white text-[10px] font-semibold uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            {categoryLabels[item.category] || item.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[45%] md:h-[40%] p-4 md:p-8 flex flex-col justify-end">
          <div className="space-y-3 md:space-y-4 text-center">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-white tracking-tight">
              {item.name}
            </h2>

            <div className="w-8 h-0.5 bg-[#967D59] opacity-70 mx-auto transition-all duration-700 group-hover:w-24" />

            <Link
              to={`/showroom/${item.id}`}
              className="block"
              onPointerDownCapture={stopGesturePropagation}
              onTouchStartCapture={stopGesturePropagation}
              onMouseDownCapture={stopGesturePropagation}
            >
              <Button
                size="sm"
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-xl py-4 md:py-5 font-bold uppercase tracking-widest text-[10px]"
                onPointerDownCapture={stopGesturePropagation}
                onTouchStartCapture={stopGesturePropagation}
                onMouseDownCapture={stopGesturePropagation}
              >
                Ver producto
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CircularGalleryCoreProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
}

function CircularGalleryCore({ items, className, ...props }: CircularGalleryCoreProps) {
  const total = items.length;
  const stepDeg = useMemo(() => (total > 0 ? 360 / total : 0), [total]);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const radius = isMobile ? 250 : isTablet ? 400 : 550;
  const radiusX = radius;
  const radiusZ = radius;
  const cardW = isMobile ? 220 : isTablet ? 260 : 280;
  const cardH = isMobile ? 360 : isTablet ? 420 : 480;

  const perspective = isMobile ? 1700 : 2000;
  const mobileRingScale = isMobile ? 0.9 : 1;
  const mobileRingZ = isMobile ? -140 : 0;
  const stageWidth = isMobile ? 380 : isTablet ? 680 : 800;
  const stageHeight = isMobile ? 430 : isTablet ? 620 : 700;

  const autoRotateSpeedDeg = 8;
  const angleRaw = useMotionValue(0);
  const angle = useSpring(angleRaw, { stiffness: 220, damping: 32, mass: 1 });

  const isInteractingRef = useRef(false);
  const lastInteractTs = useRef(0);
  const inertiaAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  const setInteracting = (value: boolean) => {
    isInteractingRef.current = value;
    if (value) lastInteractTs.current = Date.now();
  };

  const stopInertia = () => {
    if (inertiaAnimRef.current) inertiaAnimRef.current.stop();
    inertiaAnimRef.current = null;
  };

  useAnimationFrame((_t, deltaMs) => {
    if (total <= 1) return;

    const now = Date.now();
    const recently = now - lastInteractTs.current < 800;
    if (isInteractingRef.current || recently) return;

    const currentAngle = angleRaw.get();
    if (Math.abs(currentAngle) > 100000) angleRaw.set(normalizeAngleDeg(currentAngle));

    const deltaSec = deltaMs / 1000;
    angleRaw.set(angleRaw.get() + autoRotateSpeedDeg * deltaSec);
  });

  const handleDragStart = () => {
    setInteracting(true);
    stopInertia();
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setInteracting(true);
    const sensitivity = 0.22;
    const deltaDeg = info.delta.x * sensitivity;
    angleRaw.set(angleRaw.get() + deltaDeg);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const velocityToDeg = 0.018;
    const impulse = clamp(velocity * velocityToDeg, -28, 28);

    stopInertia();
    inertiaAnimRef.current = animate(angleRaw, angleRaw.get() + impulse, {
      type: "spring",
      stiffness: 260,
      damping: 26,
      mass: 0.9,
    });

    setInteracting(false);
    lastInteractTs.current = Date.now();
  };

  return (
    <div
      className={cn("relative w-full h-full pb-16 flex items-center justify-center overflow-hidden touch-pan-y", className)}
      {...props}
    >
      <motion.div className="relative select-none" style={{ perspective }}>
        <motion.div
          className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            width: stageWidth,
            height: stageHeight,
            transformStyle: "preserve-3d",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${mobileRingZ}px) scale(${mobileRingScale})`,
            }}
          >
            {items.map((img, i) => (
              <GalleryRingCard
                key={img.id}
                item={img}
                index={i}
                stepDeg={stepDeg}
                angle={angle}
                radiusX={radiusX}
                radiusZ={radiusZ}
                cardW={cardW}
                cardH={cardH}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ShowroomFallbackStage({
  item,
  loadingLabel,
}: {
  item: GalleryItem;
  loadingLabel: string;
}) {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="w-full max-w-[320px] rounded-[2rem] border border-white/10 bg-zinc-900/75 overflow-hidden shadow-[0_18px_40px_-24px_rgba(255,255,255,0.18)]">
        <div className="aspect-[4/5] bg-[#111] overflow-hidden">
          <img
            src={item.photo.url}
            alt={item.photo.text}
            className="w-full h-full object-contain"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="p-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#967D59] mb-3">
            Showroom Virtual
          </p>
          <h2 className="text-2xl font-semibold text-white mb-3">{item.name}</h2>
          <p className="text-sm text-gray-400 font-sans">{loadingLabel}</p>
        </div>
      </div>
    </div>
  );
}

export const Circular3DShowroom = () => {
  const galleryData: GalleryItem[] = useMemo(
    () =>
      showroomProducts.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        photo: {
          url: product.defaultImage,
          text: `${product.name} - Showroom MALPE`,
          pos: "center",
        },
      })),
    [],
  );

  const [viewportMode, setViewportMode] = useState<"pending" | "mobile" | "desktop">("pending");
  const [isMobileSceneReady, setIsMobileSceneReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const onChange = () => {
      const nextMode = media.matches ? "mobile" : "desktop";
      setViewportMode(nextMode);
      if (nextMode === "desktop") {
        setIsMobileSceneReady(true);
      }
    };

    onChange();

    if (media.addEventListener) media.addEventListener("change", onChange);
    else media.addListener(onChange);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else media.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (viewportMode !== "mobile") return;

    let isCancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    setIsMobileSceneReady(false);

    const waitForAssets = async () => {
      await Promise.allSettled(galleryData.map((item) => loadImageAsset(item.photo.url)));
      if (isCancelled) return;

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => {
          if (!isCancelled) setIsMobileSceneReady(true);
        }, { timeout: 900 });
      } else {
        timeoutId = setTimeout(() => {
          if (!isCancelled) setIsMobileSceneReady(true);
        }, 180);
      }
    };

    void waitForAssets();

    return () => {
      isCancelled = true;
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [galleryData, viewportMode]);

  const shouldRenderInteractive =
    viewportMode === "desktop" || (viewportMode === "mobile" && isMobileSceneReady);

  return (
    <div className="w-full bg-[#121111] text-white overflow-hidden relative">
      <div className="w-full min-h-[100vh] md:min-h-[130vh] flex flex-col items-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl sm:hidden" />
          <div className="hidden sm:block absolute top-4 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[#967D59] rounded-full blur-[96px] opacity-[0.08]" />
          <div className="hidden sm:block absolute bottom-0 right-0 w-[520px] h-[520px] bg-white rounded-full blur-[120px] opacity-[0.02]" />
          <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[360px] bg-white rounded-[100%] blur-[140px] opacity-[0.04]" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-[#121111] via-transparent to-[#121111]" />
        </div>

        <div className="text-center z-10 px-4 pt-28 pb-12 md:pt-28 md:pb-16 shrink-0 relative pointer-events-none">
          <p className="text-[#967D59] text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-4">
            Showroom Virtual
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            <span className="text-[#967D59] italic">Tus Productos</span>
            <br />
            <span className="text-white">con Nuestras Pieles</span>
          </h1>
          <p className="text-gray-500 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4">
            Arrastra para girar · Haz clic en un producto para ver detalles
          </p>
        </div>

        <div className="w-full flex-1 min-h-[560px] sm:min-h-[800px] relative flex items-center justify-center z-0 overflow-hidden">
          {shouldRenderInteractive ? (
            <CircularGalleryCore items={galleryData} />
          ) : (
            <ShowroomFallbackStage
              item={galleryData[0]}
              loadingLabel={
                viewportMode === "mobile"
                  ? "Preparando la experiencia interactiva..."
                  : "Cargando showroom..."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
