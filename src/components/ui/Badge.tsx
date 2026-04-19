import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Tone = "available" | "booked" | "reserved" | "featured" | "neutral";

const tones: Record<Tone, string> = {
  available: "bg-navy text-white",
  booked: "bg-mute text-white",
  reserved: "bg-white text-navy border border-navy",
  featured: "bg-gold/15 text-gold-deep border border-gold/30",
  neutral: "bg-mute-100 text-ink",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ tone = "neutral", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-gold" aria-hidden />}
      {children}
    </span>
  );
}
