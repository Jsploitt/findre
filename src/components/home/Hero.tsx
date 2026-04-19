import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ButtonLink, Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Pattern } from "@/components/ui/Pattern";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
      </div>
      <Pattern className="opacity-[0.04]" />

      <div className="shell relative py-24 sm:py-32 lg:py-44">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5">{t("eyebrow")}</div>
          <h1 className="h-display !text-white">{t("title")}</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <ButtonLink
              href={buildWhatsAppLink({ locale })}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              <WhatsAppIcon className="size-5" />
              {tc("whatsapp")}
            </ButtonLink>
            <Link href="/properties">
              <Button variant="secondary-dark" size="lg" className="w-full sm:w-auto">
                {tc("browse")}
                <ArrowRight className="size-4 icon-flip" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="shell grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 rtl:divide-x-reverse">
          {[
            { k: "8+", v: locale === "ar" ? "أحياء مغطاة" : "Districts covered" },
            { k: "100%", v: locale === "ar" ? "عقارات مُعاينة" : "Personally vetted" },
            { k: "<1h", v: locale === "ar" ? "متوسط الرد" : "Avg. response" },
            { k: "24/7", v: locale === "ar" ? "متاح عبر واتساب" : "WhatsApp" },
          ].map((s) => (
            <div key={s.k} className="py-5 px-4 text-center sm:text-start first:ps-0">
              <div className="text-2xl font-bold text-white">{s.k}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
