"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "@/components/ui/Logo";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Menu } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/", label: t("home") },
    { href: "/properties", label: t("properties") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-[0_1px_0_rgba(16,24,40,0.06)]"
          : "bg-white",
      )}
    >
      <div className="shell flex h-18 items-center justify-between py-4">
        <Link href="/" aria-label="FindRE" className="flex items-center">
          <Logo className="h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors py-1",
                  active ? "text-navy" : "text-ink/70 hover:text-navy",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 start-0 end-0 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle />
          <ButtonLink
            href={buildWhatsAppLink({ locale })}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
          >
            <WhatsAppIcon className="size-4" />
            {tc("whatsappShort")}
          </ButtonLink>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("menu")}
            className="inline-flex items-center justify-center size-10 rounded-full border border-navy/15 text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} />
    </header>
  );
}
