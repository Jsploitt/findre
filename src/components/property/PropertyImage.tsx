"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

// Wraps next/image with a graceful fallback to a neutral placeholder tile when
// the real client photo hasn't been added yet.
export function PropertyImage({ className, alt, ...props }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "w-full h-full bg-gradient-to-br from-navy/10 via-mute-100 to-cream flex items-center justify-center",
          className,
        )}
        aria-label={typeof alt === "string" ? alt : undefined}
      >
        <div className="text-mute text-xs tracking-widest uppercase">FindRE</div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setErrored(true)}
    />
  );
}
