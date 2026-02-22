import React, { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { Link } from "react-router";
import { Button } from "~/ui/button";
import { categoryLabels, showroomProducts } from "~/data/showroomData";

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

interface CircularGalleryCoreProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    radius?: number;
    autoRotateSpeed?: number;
}

const addMediaListener = (media: MediaQueryList, listener: () => void) => {
    media.addEventListener("change", listener);
};

const removeMediaListener = (media: MediaQueryList, listener: () => void) => {
    media.removeEventListener("change", listener);
};

const CircularGalleryCore = React.forwardRef<HTMLDivElement, CircularGalleryCoreProps>(
    (
        { items, className, radius: initialRadius = 550, autoRotateSpeed = 0.015, ...props },
        ref
    ) => {
        const [radius, setRadius] = useState(initialRadius);
        const [isDragging, setIsDragging] = useState(false);
        const [isLowPerfMode, setIsLowPerfMode] = useState(false);
        const [reducedMotion, setReducedMotion] = useState(false);

        const animationFrameRef = useRef<number | null>(null);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const ringRef = useRef<HTMLDivElement | null>(null);

        const rotationRef = useRef(0);
        const targetRotationRef = useRef(0);
        const isDraggingRef = useRef(false);
        const activePointerIdRef = useRef<number | null>(null);
        const pointerStartXRef = useRef(0);
        const pointerStartYRef = useRef(0);
        const lastDragXRef = useRef(0);

        useEffect(() => {
            const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
            const smallViewportQuery = window.matchMedia("(max-width: 640px)");
            const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

            const handleResize = () => {
                if (window.innerWidth < 640) {
                    setRadius(280);
                } else if (window.innerWidth < 1024) {
                    setRadius(400);
                } else {
                    setRadius(initialRadius);
                }
            };

            const handleMedia = () => {
                setIsLowPerfMode(
                    coarsePointerQuery.matches || smallViewportQuery.matches
                );
                setReducedMotion(reducedMotionQuery.matches);
            };

            handleResize();
            handleMedia();

            window.addEventListener("resize", handleResize, { passive: true });
            addMediaListener(coarsePointerQuery, handleMedia);
            addMediaListener(smallViewportQuery, handleMedia);
            addMediaListener(reducedMotionQuery, handleMedia);

            return () => {
                window.removeEventListener("resize", handleResize);
                removeMediaListener(coarsePointerQuery, handleMedia);
                removeMediaListener(smallViewportQuery, handleMedia);
                removeMediaListener(reducedMotionQuery, handleMedia);
            };
        }, [initialRadius]);

        useEffect(() => {
            const animate = () => {
                if (!isDraggingRef.current && !reducedMotion) {
                    const speed = isLowPerfMode ? autoRotateSpeed * 0.7 : autoRotateSpeed;
                    targetRotationRef.current += speed;
                }

                const smoothing = isLowPerfMode ? 0.12 : 0.08;
                const diff = targetRotationRef.current - rotationRef.current;
                rotationRef.current += diff * smoothing;

                if (ringRef.current) {
                    ringRef.current.style.transform = `translateZ(0) rotateY(${rotationRef.current}deg)`;
                }

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationFrameRef.current !== null) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [autoRotateSpeed, isLowPerfMode, reducedMotion]);

        const beginDragging = (e: React.PointerEvent<HTMLDivElement>) => {
            isDraggingRef.current = true;
            setIsDragging(true);
            lastDragXRef.current = e.clientX;
            targetRotationRef.current = rotationRef.current;

            if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.setPointerCapture(e.pointerId);
            }
        };

        const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;

            const target = e.target as HTMLElement | null;
            const isInteractiveTarget =
                !!target?.closest("a, button, input, textarea, select, label");
            if (isInteractiveTarget) return;

            activePointerIdRef.current = e.pointerId;
            pointerStartXRef.current = e.clientX;
            pointerStartYRef.current = e.clientY;
            lastDragXRef.current = e.clientX;

            if (e.pointerType === "mouse") {
                beginDragging(e);
            }
        };

        const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (activePointerIdRef.current !== e.pointerId) return;

            if (!isDraggingRef.current) {
                if (e.pointerType === "mouse") return;

                const totalDeltaX = e.clientX - pointerStartXRef.current;
                const totalDeltaY = e.clientY - pointerStartYRef.current;
                const crossedThreshold = Math.abs(totalDeltaX) > 6;
                const isHorizontalGesture = Math.abs(totalDeltaX) > Math.abs(totalDeltaY);

                if (!crossedThreshold || !isHorizontalGesture) return;

                beginDragging(e);
            }

            if (e.pointerType !== "mouse") {
                e.preventDefault();
            }

            const deltaX = e.clientX - lastDragXRef.current;
            lastDragXRef.current = e.clientX;

            const dragSensitivity = isLowPerfMode ? 0.22 : 0.3;
            targetRotationRef.current += deltaX * dragSensitivity;
        };

        const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
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

        const anglePerItem = 360 / items.length;

        return (
            <div
                ref={(node) => {
                    containerRef.current = node;
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                role="region"
                aria-label="Galeria 3D Circular"
                className={cn(
                    "relative w-full h-full flex items-center justify-center touch-pan-y",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                    className
                )}
                style={{ perspective: "2000px", WebkitTapHighlightColor: "transparent" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handleLostPointerCapture}
                {...props}
            >
                <div
                    ref={ringRef}
                    className="relative w-full h-full will-change-transform"
                    style={{
                        transform: `translateZ(0) rotateY(${rotationRef.current}deg)`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;

                        return (
                            <div
                                key={item.id}
                                role="group"
                                aria-label={item.name}
                                className="absolute w-[240px] h-[400px] sm:w-[280px] sm:h-[480px] select-none"
                                style={{
                                    transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    pointerEvents: "auto",
                                    willChange: "transform",
                                }}
                            >
                                <div
                                    className={cn(
                                        "block relative w-full h-full rounded-[2rem] overflow-hidden group border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-colors duration-500",
                                        isLowPerfMode
                                            ? "bg-zinc-900/85"
                                            : "bg-zinc-900/40 backdrop-blur-md"
                                    )}
                                    style={{ transformStyle: "preserve-3d" }}
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    <div className="absolute inset-x-0 top-12 h-[50%] flex items-center justify-center">
                                        <div className="relative w-46 h-46 md:w-56 md:h-56 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
                                            <img
                                                src={item.photo.url}
                                                alt={item.photo.text}
                                                className="w-full h-full object-contain"
                                                style={{ objectPosition: item.photo.pos || "center" }}
                                                draggable={false}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                                        <span className="bg-zinc-800/80 border border-white/10 text-white text-[10px] font-semibold uppercase px-4 py-2 rounded-full shadow-lg">
                                            {categoryLabels[item.category] || item.category}
                                        </span>
                                    </div>

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

export const Circular3DShowroom = () => {
    const galleryData: GalleryItem[] = showroomProducts.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        photo: {
            url: product.defaultImage,
            text: `${product.name} - Showroom MALPE`,
            pos: "center",
        },
    }));

    return (
        <div className="w-full bg-[#121111] text-white overflow-hidden relative">
            <div className="w-full min-h-[130vh] flex flex-col items-center relative pb-24 md:pb-32">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#967D59] rounded-full blur-[120px] opacity-10" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] opacity-[0.03]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-white rounded-[100%] blur-[180px] opacity-[0.05]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#121111] via-transparent to-[#121111] pointer-events-none" />
                </div>

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
                        Arrastra para girar - Haz clic en un producto para ver detalles
                    </p>
                </div>

                <div className="w-full flex-1 min-h-[560px] sm:min-h-[800px] relative flex items-center justify-center z-0 perspective-container overflow-hidden">
                    <CircularGalleryCore items={galleryData} />
                </div>
            </div>
        </div>
    );
};
