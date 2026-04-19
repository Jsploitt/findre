"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";

export function WhatsAppFAB() {
  const t = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildWhatsAppLink({ locale })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className={cn(
        "fixed z-30 bottom-5 end-5 size-14 rounded-full bg-gold text-navy shadow-lift flex items-center justify-center transition-all duration-300 ease-smooth hover:bg-gold-deep hover:text-white",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
