"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/cn";

interface Props {
  invert?: boolean;
  className?: string;
}

export function LanguageToggle({ invert, className }: Props) {
  const locale = useLocale() as "ar" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";

  const handleSwitch = () => {
    router.replace(pathname, { locale: other });
  };

  const base =
    "inline-flex items-center rounded-full border text-xs font-medium tracking-[0.08em] px-3 py-1.5 transition-colors";
  const styles = invert
    ? "border-white/30 text-white hover:bg-white hover:text-navy"
    : "border-navy/15 text-navy hover:border-navy hover:bg-navy hover:text-white";

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={other === "ar" ? "التبديل إلى العربية" : "Switch to English"}
      className={cn(base, styles, className)}
    >
      <span className={cn(locale === "ar" && "font-bold")}>AR</span>
      <span className="mx-1.5 opacity-40">|</span>
      <span className={cn(locale === "en" && "font-bold")}>EN</span>
    </button>
  );
}
