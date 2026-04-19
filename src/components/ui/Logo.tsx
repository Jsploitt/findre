import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "dark" | "light" | "mark";
  className?: string;
}

// Brand-accurate rendering of the FindRE house-Q mark + wordmark.
// Colors: house = gold (#AC9055), wordmark = navy (#202A44) or white.
export function Logo({ variant = "dark", className }: LogoProps) {
  const word = variant === "light" ? "#FFFFFF" : "#202A44";
  if (variant === "mark") {
    return <Mark className={className} />;
  }
  return (
    <svg viewBox="0 0 220 56" className={cn("h-8 w-auto", className)} aria-label="FindRE">
      <g transform="translate(0,4)">
        <Mark asGroup />
      </g>
      <text
        x="64"
        y="40"
        fontFamily="Montserrat, system-ui, sans-serif"
        fontWeight="700"
        fontSize="32"
        letterSpacing="-0.5"
        fill={word}
      >
        FindRE
      </text>
    </svg>
  );
}

function Mark({ className, asGroup }: { className?: string; asGroup?: boolean }) {
  const body = (
    <g fill="none" stroke="#AC9055" strokeWidth="4" strokeLinejoin="round">
      {/* house */}
      <path d="M6 44 V22 L24 6 L42 22 V44 H30 V32 H18 V44 Z" />
      {/* magnifier tail */}
      <line x1="40" y1="40" x2="52" y2="52" strokeLinecap="round" />
      {/* inner square */}
      <rect x="19" y="24" width="10" height="10" fill="#AC9055" stroke="none" />
    </g>
  );
  if (asGroup) return body;
  return (
    <svg viewBox="0 0 58 58" className={cn("h-8 w-8", className)} aria-label="FindRE">
      {body}
    </svg>
  );
}
