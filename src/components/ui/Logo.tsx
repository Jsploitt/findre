import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "dark" | "light" | "mark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/mark.svg"
        alt="FindRE"
        width={64}
        height={64}
        className={cn("h-8 w-8", className)}
      />
    );
  }

  return (
    <Image
      src="/brand/FindreLogo.png"
      alt="FindRE"
      width={773}
      height={323}
      priority
      className={cn(
        "h-8 w-auto object-contain",
        variant === "dark" && "drop-shadow-[0_0_1px_rgba(32,42,68,0.8)]",
        className,
      )}
    />
  );
}
