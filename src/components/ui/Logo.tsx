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
        className={cn("h-6 w-6", className)}
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
      className={cn("h-6 w-auto object-contain", className)}
    />
  );
}
