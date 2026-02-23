import React, { useState, useEffect, useRef, useMemo, type HTMLAttributes } from "react";
import { Link } from "react-router";
import { Button } from "~/ui/button";
import { showroomProducts, categoryLabels } from "~/data/showroomData";

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

// ─── Framer Motion Implementation ─────────────────────────────────────────────

import {
    motion,
    type PanInfo,
    animate,
    useAnimationFrame,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v))
}

function normalizeAngleDeg(a: number) {
    let x = ((a % 360) + 360) % 360
    if (x > 180) x -= 360
    return x
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia(query)
        const onChange = () => setMatches(mql.matches)
        onChange()

        if (mql.addEventListener) mql.addEventListener("change", onChange)
        else mql.addListener(onChange)

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange)
            else mql.removeListener(onChange)
        }
    }, [query])

    return matches
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
    item: GalleryItem
    index: number
    stepDeg: number
    angle: ReturnType<typeof useSpring>
    radiusX: number
    radiusZ: number
    cardW: number
    cardH: number
    isMobile: boolean
}) {
    const a = useTransform(angle, (deg) => ((index * stepDeg + deg) * Math.PI) / 180)

    // 0 deg -> front
    const x = useTransform(a, (rad) => Math.sin(rad) * radiusX)
    const z = useTransform(a, (rad) => Math.cos(rad) * radiusZ)
    const y = useTransform(a, (rad) => Math.cos(rad) * (isMobile ? -8 : -12))

    const depth01 = useTransform(z, (zz) => (zz + radiusZ) / (2 * radiusZ))

    const scale = useTransform(depth01, (d) => 0.6 + d * 0.4)
    const opacity = useTransform(depth01, (d) => 0.1 + d * 0.9)

    const zIndex = useTransform(depth01, (d) => Math.round(d * 100))

    const rotateY = useTransform(a, (rad) => (rad * 180) / Math.PI)

    const shadow = useTransform(depth01, (d) =>
        d > 0.85
            ? "0 28px 60px -16px rgba(255,255,255,0.18), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 12px 34px -14px rgba(255,255,255,0.10)",
    )

    const isFront = useTransform(depth01, (d) => d > 0.9)

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
            }}
        >
            <motion.div
                className="block relative overflow-hidden group border border-white/5 transition-colors duration-500 rounded-[2rem] pointer-events-auto"
                style={{
                    width: cardW,
                    height: cardH,
                    boxShadow: shadow as unknown as string,
                    backgroundColor: useTransform(isFront, (front) => front ? '#111' : 'rgba(24, 24, 27, 0.4)') as any
                }}
                onDragStart={(e) => e.preventDefault()}
            >
                <div className="absolute inset-x-0 top-12 md:top-14 bottom-[45%] md:bottom-[40%] flex items-center justify-center">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 shadow-inner md:shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
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
                    <span className="bg-zinc-800/80 border border-white/10 text-white text-[10px] font-semibold uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
                        {categoryLabels[item.category] || item.category}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[45%] md:h-[40%] p-4 md:p-8 flex flex-col justify-end">
                    <div className="space-y-3 md:space-y-4 text-center">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-white tracking-tight">
                            {item.name}
                        </h2>

                        <div className="w-8 h-0.5 bg-[#967D59] opacity-70 mx-auto transition-all duration-700 group-hover:w-24" />

                        <Link to={`/showroom/${item.id}`} className="block">
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-xl py-4 md:py-5 font-bold uppercase tracking-widest text-[10px]"
                            >
                                Ver producto
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

interface CircularGalleryCoreProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
}

function CircularGalleryCore({ items, className, ...props }: CircularGalleryCoreProps) {
    const total = items.length
    const stepDeg = useMemo(() => (total > 0 ? 360 / total : 0), [total])

    const isMobile = useMediaQuery("(max-width: 640px)")
    const isTablet = useMediaQuery("(max-width: 1024px)")

    const radius = isMobile ? 280 : (isTablet ? 400 : 550)
    const radiusX = radius
    const radiusZ = radius
    const cardW = isMobile ? 240 : (isTablet ? 260 : 280)
    const cardH = isMobile ? 400 : (isTablet ? 420 : 480)

    const perspective = isMobile ? 1400 : 2000
    const mobileRingScale = isMobile ? 0.9 : 1
    const mobileRingZ = isMobile ? -50 : 0

    const autoRotateSpeedDeg = 8 // Change this value to adjust rotation speed (degrees per second)

    const angleRaw = useMotionValue(0)
    const angle = useSpring(angleRaw, { stiffness: 220, damping: 32, mass: 1 })

    const isInteractingRef = useRef(false)
    const lastInteractTs = useRef(0)
    const inertiaAnimRef = useRef<ReturnType<typeof animate> | null>(null)

    const setInteracting = (v: boolean) => {
        isInteractingRef.current = v
        if (v) lastInteractTs.current = Date.now()
    }

    const stopInertia = () => {
        if (inertiaAnimRef.current) inertiaAnimRef.current.stop()
        inertiaAnimRef.current = null
    }

    useAnimationFrame((_t, deltaMs) => {
        if (total <= 1) return

        const now = Date.now()
        const recently = now - lastInteractTs.current < 800
        if (isInteractingRef.current || recently) return

        const a = angleRaw.get()
        if (Math.abs(a) > 100000) angleRaw.set(normalizeAngleDeg(a))

        const deltaSec = deltaMs / 1000
        angleRaw.set(angleRaw.get() + autoRotateSpeedDeg * deltaSec)
    })

    const handleDragStart = () => {
        setInteracting(true)
        stopInertia()
    }

    const handleDrag = (_: any, info: PanInfo) => {
        setInteracting(true)
        const sensitivity = 0.22
        const deltaDeg = info.delta.x * sensitivity
        angleRaw.set(angleRaw.get() + deltaDeg)
    }

    const handleDragEnd = (_: any, info: PanInfo) => {
        const v = info.velocity.x
        const velocityToDeg = 0.018
        const impulse = clamp(v * velocityToDeg, -28, 28)

        stopInertia()
        inertiaAnimRef.current = animate(angleRaw, angleRaw.get() + impulse, {
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.9,
        })

        setInteracting(false)
        lastInteractTs.current = Date.now()
    }

    return (
        <div
            className={cn("relative w-full h-full pb-16 flex items-center justify-center overflow-hidden touch-pan-y", className)}
            {...props}
        >
            <motion.div className="relative select-none" style={{ perspective }}>
                <motion.div
                    className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                    style={{
                        width: isMobile ? (typeof window !== "undefined" ? window.innerWidth : 320) : 800,
                        height: isMobile ? 500 : 700,
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
    )
}

// ─── Main Showroom Hero Component ─────────────────────────────────────────────

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
        []
    );

    return (
        <div className="w-full bg-[#121111] text-white overflow-hidden relative">
            <div className="w-full min-h-[100vh] md:min-h-[130vh] flex flex-col items-center relative">
                {/* Background gradient decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#967D59] rounded-full blur-[120px] opacity-10" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] opacity-[0.03]" />

                    {/* Subtle white shadow/glow from the center to provide the requested aesthetic */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-white rounded-[100%] blur-[180px] opacity-[0.05]" />

                    {/* Dark radial gradient to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#121111] via-transparent to-[#121111] pointer-events-none" />
                </div>

                {/* Title Section */}
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

                {/* Gallery Section */}
                <div className="w-full flex-1 min-h-[560px] sm:min-h-[800px] relative flex items-center justify-center z-0 perspective-container overflow-hidden">
                    <CircularGalleryCore items={galleryData} />
                </div>
            </div>
        </div>
    );
};
