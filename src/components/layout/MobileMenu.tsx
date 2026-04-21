"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  nav: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, nav }: Props) {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={cn(
          "fixed z-50 top-0 bottom-0 end-0 w-[88%] max-w-sm bg-white shadow-lift transition-transform duration-300 ease-smooth flex flex-col",
          open ? "translate-x-0" : "rtl:-translate-x-full ltr:translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-mute-100">
          <Logo className="h-12 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block rounded-md px-4 py-3 text-lg font-medium transition-colors",
                      active
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-cream",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-5 border-t border-mute-100">
          <ButtonLink
            href={buildWhatsAppLink({ locale })}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full"
          >
            <WhatsAppIcon className="size-5" />
            {tc("whatsapp")}
          </ButtonLink>
        </div>
      </aside>
    </>
  );
}
