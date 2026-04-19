import { cn } from "@/lib/cn";

// Subtle brand-pattern decoration — absolute-positioned by parent.
export function Pattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-pattern", className)}
    />
  );
}
