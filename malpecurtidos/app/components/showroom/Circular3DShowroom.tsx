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
            setIsDragging(true);
            setStartX(e.clientX);
            setLastDragX(e.clientX);
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

            // Preventing text selection
            e.preventDefault();
        };

        const handlePointerMove = (e: React.PointerEvent) => {
            if (!isDragging) return;

            const currentX = e.clientX;
            const deltaX = currentX - lastDragX;
            setLastDragX(currentX);

            // Update TARGET, not visual rotation directly
            targetRotation.current += deltaX * dragSensitivity;
        };

        const handlePointerUp = () => {
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
                onPointerLeave={handlePointerUp}
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

                        return (
                            <div
                                key={item.id}
                                role="group"
                                aria-label={item.name}
                                className="absolute w-[260px] h-[350px] sm:w-[300px] sm:h-[400px] select-none"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-130px",
                                    marginTop: "-175px",
                                    opacity: opacity,
                                    // Remove CSS transition for opacity when dragging to avoid fighting with JS updates,
                                    // but keep it otherwise? With rapid JS updates, CSS transition might lag.
                                    // Best to just let JS handle it or keep it very fast.
                                    transition: isDragging ? "none" : "opacity 0.2s linear",
                                    pointerEvents: "auto"
                                }}
                            >
                                <div
                                    className="block relative w-full h-full rounded-2xl shadow-sm overflow-hidden group"
                                    style={{ transformStyle: "preserve-3d" }}
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    <div className="bg-white absolute top-0 left-0 w-full h-[70%] p-4 pb-0">
                                        <img
                                            src={item.photo.url}
                                            alt={item.photo.text}
                                            className="w-full h-full object-contain transition-transform duration-500"
                                            style={{ objectPosition: item.photo.pos || "center" }}
                                            draggable={false}
                                        />
                                    </div>

                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-[#967D59]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                                            {categoryLabels[item.category] || item.category}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-[35%] p-5 flex flex-col justify-center items-center text-center bg-white/80 backdrop-blur-sm z-10 border-t border-gray-100">
                                        <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-tight text-gray-900">
                                            {item.name}
                                        </h2>

                                        <Link to={`/showroom/${item.id}`}>
                                            <Button size="sm" variant="outline">
                                                Ver producto
                                            </Button>
                                        </Link>
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
        <div className="w-full bg-white text-white overflow-hidden relative">
            <div className="w-full h-screen min-h-[130vh] flex flex-col items-center relative pb-40">
                {/* Background gradient decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-50" />

                    {/* Dark radial gradient to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Title Section */}
                <div className="text-center z-10 px-4 py-24 md:py-32 shrink-0 relative pointer-events-none">
                    <p className="text-[#967D59] text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-4">
                        Showroom Virtual B2B
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
                        <span className="text-[#967D59] italic">Tus Productos</span>
                        <br />
                        <span className="text-black">con Nuestras Pieles</span>
                    </h1>
                    <p className="text-gray-400 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4">
                        Arrastra para girar · Haz clic en un producto para ver detalles
                    </p>
                </div>

                {/* Gallery Section */}
                <div className="w-full flex-grow relative flex items-center justify-center z-0 perspective-container">
                    <CircularGalleryCore items={galleryData} />
                </div>
            </div>
        </div>
    );
};
