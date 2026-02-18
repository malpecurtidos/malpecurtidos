import React, { useState, useEffect, useRef, type HTMLAttributes } from "react";
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
        // Visual rotation (what is rendered)
        const [rotation, setRotation] = useState(0);
        // Logical target rotation (what we are moving towards)
        const targetRotation = useRef(0);

        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [lastDragX, setLastDragX] = useState(0);

        const animationFrameRef = useRef<number | null>(null);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const activePointerIdRef = useRef<number | null>(null);

        // Smooth drag settings
        const dragSensitivity = 0.3; // How much mouse move affects target
        const smoothingFactor = 0.08; // Lower = "slacker" / heavier (0.01 - 1.0)

        // Responsive radius state
        const [radius, setRadius] = useState(initialRadius);

        // Handle responsive radius
        useEffect(() => {
            const handleResize = () => {
                // Mobile: Smaller radius for "less gap" and closer feel
                // Desktop: Default radius
                if (window.innerWidth < 640) {
                    setRadius(280); // Reduced from default ~550
                } else if (window.innerWidth < 1024) {
                    setRadius(400);
                } else {
                    setRadius(initialRadius);
                }
            };

            handleResize(); // Initial check
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [initialRadius]);


        // Animation Loop (Lerp & Auto-rotate)
        useEffect(() => {
            const animate = () => {
                if (!isDragging) {
                    // Auto-rotate by incrementing target
                    targetRotation.current += autoRotateSpeed;
                }

                // Smoothly interpolate current visual rotation towards target
                setRotation((prev) => {
                    const diff = targetRotation.current - prev;

                    // If difference is tiny and not dragging/auto-rotating, snap to it? 
                    // But we are always auto-rotating usually.
                    // Just standard lerp:
                    return prev + diff * smoothingFactor;
                });

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [isDragging, autoRotateSpeed]);

        const handlePointerDown = (e: React.PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;

            const target = e.target as HTMLElement | null;
            const isInteractiveTarget =
                !!target?.closest("a, button, input, textarea, select, label");
            if (isInteractiveTarget) return;

            if (e.pointerType !== "mouse") e.preventDefault();

            setIsDragging(true);
            setStartX(e.clientX);
            setLastDragX(e.clientX);
            activePointerIdRef.current = e.pointerId;
            e.currentTarget.setPointerCapture(e.pointerId);
            // Don't reset rotation, we just start influencing targetRotation from where it is
            // However, targetRotation needs to be synced with current visual rotation 
            // to avoid a jump if the user grabs it while it's spinning fast (though here it's slow).
            // Actually, for "catching" a spinning wheel, we usually want to grab the inertia.
            // For simplicity: set target exactly to current to stop auto-spin momentum effectively?
            // No, user wants slack. Let's keep momentum or just start adding delta.

            // If we want it to feel like we "grabbed" it, we stop the auto-rotation drift relative to hand.
            // Sync target to current visual so there's no massive jump if they drifted apart
            // targetRotation.current = rotation; 
            // Wait, if we sync, we lose the "smooth stop" if we were implementing momentum throw.
            // But here we just want smooth drag.

            // Prevent native touch scroll while dragging
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            if (!isDragging) return;
            if (activePointerIdRef.current !== e.pointerId) return;
            if (e.pointerType !== "mouse") e.preventDefault();

            const currentX = e.clientX;
            const deltaX = currentX - lastDragX;
            setLastDragX(currentX);

            // Update TARGET, not visual rotation directly
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
            setIsDragging(false);
        };

        const handleLostPointerCapture = () => {
            activePointerIdRef.current = null;
            setIsDragging(false);
        };

        const anglePerItem = 360 / items.length;

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
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        // Use rotation for calculation to keep opacity updates smooth
                        const totalRotation = rotation % 360;
                        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                        const normalizedAngle = Math.abs(
                            relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
                        );
                        // Make opacity falloff a bit smoother/wider
                        const opacity = Math.max(0.3, 1 - (normalizedAngle / 180) * 0.8);

                        // Check if item is in front (active)
                        const isFront = normalizedAngle < 15;

                        return (
                            <div
                                key={item.id}
                                role="group"
                                aria-label={item.name}
                                className="absolute w-[240px] h-[400px] sm:w-[280px] sm:h-[480px] select-none"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-120px", // Updated for w-[240px]
                                    marginTop: "-200px",  // Updated for h-[400px]
                                    opacity: opacity,
                                    // Smooth transition for opacity
                                    transition: isDragging ? "none" : "opacity 0.3s ease-out",
                                    pointerEvents: "auto"
                                }}
                            >
                                <div
                                    className={`block relative w-full h-full rounded-[2rem] overflow-hidden group border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-colors duration-500
                                        ${isFront ? "bg-[#111]" : "bg-zinc-900/40 backdrop-blur-md"}
                                    `}
                                    style={{ transformStyle: "preserve-3d" }}
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    {/* Image Section - Locked RoundSquare Container */}
                                    <div className="absolute inset-x-0 top-12 h-[50%] flex items-center justify-center">
                                        <div className="relative w-46 h-46 md:w-56 md:h-56 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                            {/* Subtle vignette or inner shadow for depth */}
                                            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />

                                            <img
                                                src={item.photo.url}
                                                alt={item.photo.text}
                                                className="w-full h-full object-contain"
                                                style={{ objectPosition: item.photo.pos || "center" }}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>

                                    {/* Category Floating Label - Moved to top center for balance and to avoid overlap */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                                        <span className="bg-zinc-800/80  border border-white/10 text-white text-[10px] font-semibold uppercase px-4 py-2 rounded-full shadow-lg">
                                            {categoryLabels[item.category] || item.category}
                                        </span>
                                    </div>

                                    {/* Content Section - Adjusted for circular image spacing */}
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
