import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-dark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-smooth disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-deep hover:text-white shadow-card hover:shadow-lift",
  secondary:
    "border border-navy/15 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "secondary-dark":
    "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
  ghost: "text-navy hover:text-gold underline-offset-4 hover:underline",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
