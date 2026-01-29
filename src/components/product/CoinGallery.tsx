"use client";

import { useState } from "react";
import Image from "next/image";
import type { CoinImages } from "@/types/coin";

interface CoinGalleryProps {
  images: CoinImages;
  coinName: string;
}

interface GalleryImage {
  key: string;
  src: string;
  label: string;
}

export function CoinGallery({ images, coinName }: CoinGalleryProps) {
  // Build array of available images
  const allImages: GalleryImage[] = [
    { key: "obverse", src: images.obverse, label: "Obverse" },
    { key: "reverse", src: images.reverse, label: "Reverse" },
    ...(images.slab ? [{ key: "slab", src: images.slab, label: "Slab" }] : []),
    ...(images.edge ? [{ key: "edge", src: images.edge, label: "Edge" }] : []),
    ...(images.detail?.map((src, i) => ({
      key: `detail-${i}`,
      src,
      label: `Detail ${i + 1}`,
    })) || []),
  ];

  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className={`
          relative aspect-square overflow-hidden rounded-xl
          bg-dark-elevated border border-[var(--color-line)]
          ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
        `}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={activeImage.src}
          alt={`${coinName} - ${activeImage.label}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`
            object-contain transition-transform duration-200 ease-out
            ${isZoomed ? "scale-150" : "scale-100"}
          `}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          priority
        />

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 bg-dark-primary/80 text-[var(--color-muted)] text-xs px-3 py-1.5 rounded-full">
            Hover to zoom
          </div>
        )}

        {/* Image label */}
        <div className="absolute top-4 left-4 bg-dark-primary/80 text-[var(--color-text)] text-sm px-3 py-1.5 rounded-full font-medium">
          {activeImage.label}
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 justify-center">
          {allImages.map((img) => (
            <button
              key={img.key}
              onClick={() => setActiveImage(img)}
              className={`
                relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden
                border-2 transition-all duration-200
                ${
                  activeImage.key === img.key
                    ? "border-gold-400 shadow-gold"
                    : "border-[var(--color-line)] hover:border-[var(--color-border)]"
                }
              `}
              aria-label={`View ${img.label}`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
