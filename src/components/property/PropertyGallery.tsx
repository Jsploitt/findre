"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { PropertyImage } from "./PropertyImage";
import type { Property } from "@/types/property";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function PropertyGallery({ property }: { property: Property }) {
  const locale = useLocale() as "ar" | "en";
  const images = property.images.length > 0
    ? property.images
    : [{ src: "", alt: property.title }];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [lightbox, images.length]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative md:col-span-3 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-[520px] rounded-lg overflow-hidden bg-mute-100 group"
        >
          <PropertyImage
            src={images[active]?.src ?? ""}
            alt={images[active]?.alt[locale] ?? ""}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="group-hover:scale-[1.02] transition-transform duration-500"
          />
        </button>
        {images.slice(0, 4).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-[4/3] rounded-md overflow-hidden bg-mute-100 hidden md:block",
              active === i && "ring-2 ring-gold",
            )}
          >
            <PropertyImage
              src={img.src}
              alt={img.alt[locale]}
              fill
              sizes="25vw"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-5 end-5 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X />
          </button>
          <button
            type="button"
            onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
            aria-label="Previous"
            className="absolute start-4 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronLeft className="icon-flip" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <PropertyImage
              src={images[active]?.src ?? ""}
              alt={images[active]?.alt[locale] ?? ""}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % images.length)}
            aria-label="Next"
            className="absolute end-4 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronRight className="icon-flip" />
          </button>
        </div>
      )}
    </>
  );
}
