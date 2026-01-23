"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageLabels = ["Obverse", "Reverse", "Detail", "Edge"];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomed) return;

      if (e.key === "Escape") {
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    },
    [isZoomed, selectedIndex, images.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  if (images.length === 0) {
    return (
      <div
        className="aspect-square rounded-lg flex items-center justify-center"
        style={{ backgroundColor: "var(--color-line)" }}
      >
        <span style={{ color: "var(--color-muted)" }}>
          Product Image Coming Soon
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <div className="space-y-4">
        {/* Primary Image */}
        <div
          className="relative aspect-square rounded-xl overflow-hidden cursor-zoom-in group"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-line)",
          }}
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={images[selectedIndex]}
            alt={`${productName} - ${imageLabels[selectedIndex] || `Image ${selectedIndex + 1}`}`}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoom hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div
              className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              }}
            >
              <svg
                className="inline-block w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              Click to zoom
            </div>
          </div>

          {/* Image label */}
          <div
            className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            {imageLabels[selectedIndex] || `Image ${selectedIndex + 1}`}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 justify-center">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedIndex === index
                    ? "ring-2 ring-offset-2 scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-line)",
                  ringColor: "var(--color-accent)",
                  ringOffsetColor: "var(--color-bg)",
                }}
                aria-label={`View ${imageLabels[index] || `image ${index + 1}`}`}
              >
                <Image
                  src={src}
                  alt={`${productName} - ${imageLabels[index] || `Thumbnail ${index + 1}`}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          onClick={() => setIsZoomed(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom view"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                className={`absolute left-4 p-3 rounded-full text-white transition-colors ${
                  selectedIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
                }}
                disabled={selectedIndex === 0}
                aria-label="Previous image"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className={`absolute right-4 p-3 rounded-full text-white transition-colors ${
                  selectedIndex === images.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex < images.length - 1)
                    setSelectedIndex(selectedIndex + 1);
                }}
                disabled={selectedIndex === images.length - 1}
                aria-label="Next image"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Zoomed image */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[85vh] m-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${productName} - ${imageLabels[selectedIndex] || `Image ${selectedIndex + 1}`}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <span className="text-white/80 text-sm">
              {imageLabels[selectedIndex] || `Image ${selectedIndex + 1}`}
            </span>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedIndex === index
                        ? "bg-white scale-125"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 right-6 text-white/50 text-xs hidden md:block">
            ESC to close &bull; Arrow keys to navigate
          </div>
        </div>
      )}
    </>
  );
}
