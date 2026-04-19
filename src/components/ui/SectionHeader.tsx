import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  invert?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
  invert,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className={cn("h-section", invert && "text-white")}>{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 body-lead",
            invert && "text-white/75",
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
