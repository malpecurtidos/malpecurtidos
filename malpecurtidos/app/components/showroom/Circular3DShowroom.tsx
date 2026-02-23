import React, { useState, useEffect, useRef, useMemo, type HTMLAttributes } from "react";
import { Link } from "react-router";
import { Button } from "~/ui/button";
import { showroomProducts, categoryLabels } from "~/data/showroomData";

// ─── Utilities ────────────────────────────────────────────────────────────────

const cn = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" ");

// ─── Gallery Item Type ────────────────────────────────────────────────────────

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

// ─── Circular Gallery Core ────────────────────────────────────────────────────

interface CircularGalleryCoreProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    radius?: number;
    autoRotateSpeed?: number;
}

const CircularGalleryCore = React.forwardRef<HTMLDivElement, CircularGalleryCoreProps>(
    (
        { items, className, radius: initialRadius = 550, autoRotateSpeed = 0.015, ...props },
        ref
    ) => {
        const targetRotation = useRef(0);
        const currentRotation = useRef(0);

        const [isDragging, setIsDragging] = useState(false);
        const lastDragXRef = useRef(0);
        const isDraggingRef = useRef(false);

        const animationFrameRef = useRef<number | null>(null);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const innerRef = useRef<HTMLDivElement | null>(null);
        const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
        const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
        const activePointerIdRef = useRef<number | null>(null);

        const imageLoadedRef = useRef<boolean[]>(new Array(items.length).fill(false));
        const imageRevealProgress = useRef<number[]>(new Array(items.length).fill(0));

        const dragSensitivity = 0.3;
        const smoothingFactor = 0.08;

        const [radius, setRadius] = useState(initialRadius);
        // Handle responsive radius

        const anglePerItem = 360 / items.length;

        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth < 640) {
                    setRadius(280);
                } else if (window.innerWidth < 1024) {
                    setRadius(400);
                } else {
                    setRadius(initialRadius);
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [initialRadius]);

        useEffect(() => {
            const animate = () => {
                if (!isDraggingRef.current) {
                    targetRotation.current += autoRotateSpeed;
                }

                const prev = currentRotation.current;
                const diff = targetRotation.current - prev;
                currentRotation.current = prev + diff * smoothingFactor;

                if (innerRef.current) {
                    innerRef.current.style.transform = `rotateY(${currentRotation.current}deg)`;
                }

                const totalRotation = currentRotation.current % 360;

                for (let i = 0; i < items.length; i++) {
                    const el = itemRefs.current[i];
                    if (!el) continue;

                    const itemAngle = i * anglePerItem;
                    const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                    const normalizedAngle = Math.abs(
                        relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
                    );
                    const baseOpacity = Math.max(0.3, 1 - (normalizedAngle / 180) * 0.8);

                    const loaded = imageLoadedRef.current[i] ? 1 : 0;
                    imageRevealProgress.current[i] += (loaded - imageRevealProgress.current[i]) * 0.06;
                    
                    // Apply opacity based on position AND load progress
                    el.style.opacity = String(baseOpacity * imageRevealProgress.current[i]);

                    const card = cardRefs.current[i];
                    if (card) {
                        const isFront = normalizedAngle < 15;
                        card.style.backgroundColor = isFront ? '#111' : 'rgba(24, 24, 27, 0.4)';
                    }
                }

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [autoRotateSpeed, anglePerItem, items.length]);

        const handlePointerDown = (e: React.PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;

            const target = e.target as HTMLElement | null;
            if (target?.closest("a, button, input, textarea, select, label")) return;

            if (e.pointerType !== "mouse") e.preventDefault();

            isDraggingRef.current = true;
            setIsDragging(true);
            lastDragXRef.current = e.clientX;
            activePointerIdRef.current = e.pointerId;
            e.currentTarget.setPointerCapture(e.pointerId);
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            if (!isDraggingRef.current) return;
            if (activePointerIdRef.current !== e.pointerId) return;
            if (e.pointerType !== "mouse") e.preventDefault();

            const currentX = e.clientX;
            const deltaX = currentX - lastDragXRef.current;
            lastDragXRef.current = currentX;

            targetRotation.current += deltaX * dragSensitivity;
        };

        const handlePointerUp = (e: React.PointerEvent) => {
            if (activePointerIdRef.current !== null && activePointerIdRef.current !== e.pointerId) {
                return;
            }

            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
            }

            activePointerIdRef.current = null;
            isDraggingRef.current = false;
            setIsDragging(false);
        };

        const handleLostPointerCapture = () => {
            activePointerIdRef.current = null;
            isDraggingRef.current = false;
            setIsDragging(false);
        };

        return (
            <div
                ref={(node) => {
                    containerRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                role="region"
                aria-label="Galería 3D Circular"
                className={cn(
                    "relative w-full h-full flex items-center justify-center touch-none",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                    className
                )}
                style={{ perspective: "2000px" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handleLostPointerCapture}
                {...props}
            >
                <div
                    ref={innerRef}
                    className="relative w-full h-full"
                    style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                role="group"
                                aria-label={item.name}
                                className="absolute w-[240px] h-[400px] sm:w-[280px] sm:h-[480px] select-none"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-120px",
                                    marginTop: "-200px",
                                    opacity: 0,
                                    pointerEvents: "auto",
                                    willChange: "transform, opacity", // Hint to browser
                                }}
                            >
                                <div
                                    ref={(el) => { cardRefs.current[i] = el; }}
                                    className="block relative w-full h-full rounded-[2rem] overflow-hidden group border border-white/5 shadow-lg md:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-colors duration-500"
                                    style={{ transformStyle: "preserve-3d" }}
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    {/* Image Section */}
                                    <div className="absolute inset-x-0 top-12 h-[50%] flex items-center justify-center">
                                        <div className="relative w-46 h-46 md:w-56 md:h-56 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                            <div className="absolute inset-0 shadow-inner md:shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />

                                            <img
                                                src={item.photo.url}
                                                alt={item.photo.text}
                                                className="w-full h-full object-contain"
                                                style={{ objectPosition: item.photo.pos || "center" }}
                                                draggable={false}
                                                decoding="async"
                                                // Removed loading="lazy" for immediate fetch
                                                // Added fetchPriority for hero images
                                                // @ts-ignore - React types might not have fetchPriority yet
                                                fetchPriority="high"
                                                onLoad={() => { imageLoadedRef.current[i] = true; }}
                                            />
                                        </div>
                                    </div>

                                    {/* Category Floating Label */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                                        <span className="bg-zinc-800/80 border border-white/10 text-white text-[10px] font-semibold uppercase px-4 py-2 rounded-full shadow-lg">
                                            {categoryLabels[item.category] || item.category}
                                        </span>
                                    </div>

                                    {/* Content Section */}
                                    <div className="absolute bottom-0 left-0 w-full h-[40%] p-8 flex flex-col justify-end">
                                        <div className="space-y-4 text-center">
                                            <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-white tracking-tight">
                                                {item.name}
                                            </h2>

                                            <div className="w-8 h-0.5 bg-[#967D59] opacity-70 mx-auto group-hover:w-24 transition-all duration-700" />

                                            <Link to={`/showroom/${item.id}`} className="block">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-xl py-5 font-bold uppercase tracking-widest text-[10px]"
                                                >
                                                    Ver producto
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

CircularGalleryCore.displayName = "CircularGalleryCore";

// ─── Main Showroom Hero Component ─────────────────────────────────────────────

export const Circular3DShowroom = () => {
    // Removed IntersectionObserver - this is a hero component, needs to load ASAP
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
            <div className="w-full min-h-[130vh] flex flex-col items-center relative pb-24 md:pb-32">
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
                <div className="text-center z-10 px-4 pt-16 pb-12 md:pt-28 md:pb-16 shrink-0 relative pointer-events-none">
                    <p className="text-[#967D59] text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-4">
                        Showroom Virtual B2B
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
