import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Update selected image if the images prop changes (e.g. variant change)
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-[#F9F7F2] rounded-2xl overflow-hidden relative shadow-lg border border-[#8B5A2B]/10">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === img
                  ? "border-[#8B5A2B] ring-2 ring-[#8B5A2B]/20"
                  : "border-transparent hover:border-[#8B5A2B]/50"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
