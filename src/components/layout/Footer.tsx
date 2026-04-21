import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact.info");
  const locale = useLocale() as "ar" | "en";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="shell py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo variant="light" className="h-14 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {t("tagline")}
          </p>
          <a
            href={buildWhatsAppLink({ locale })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-gold transition-colors"
          >
            <WhatsAppIcon className="size-4 text-gold" />
            {site.phoneDisplay}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t("explore")}</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors">{tn("home")}</Link></li>
            <li><Link href="/properties" className="hover:text-gold transition-colors">{tn("properties")}</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">{tn("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">{tn("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t("contact")}</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-gold shrink-0" />
              <a href={`tel:${site.whatsappNumber}`} className="hover:text-gold transition-colors">{site.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-gold shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">{site.email}</a>
            </li>
            <li className="text-white/70 pt-2">{tc("officeValue")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <span>© {year} {site.name}. {t("rights")}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
