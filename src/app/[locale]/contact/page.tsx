import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as "ar" | "en";
  const t = await getTranslations("contact");
  const tc = await getTranslations("cta");
  const waLink = buildWhatsAppLink({ locale: l });

  return (
    <>
      <section className="relative bg-navy text-white overflow-hidden">
        <Pattern className="opacity-[0.06]" />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">{t("hero.eyebrow")}</div>
            <h1 className="h-display text-white">{t("hero.title")}</h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed">{t("hero.body")}</p>
          </div>
        </Container>
      </section>

      <Container className="py-20">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="rounded-lg border border-mute-100 bg-white p-6 sm:p-8 shadow-card">
              <h2 className="text-xl font-semibold text-navy">{tc("sendMessage")}</h2>
              <p className="mt-1 text-sm text-ink/70">{t("hero.body")}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 order-1 lg:order-2 space-y-5">
            <div className="rounded-lg bg-navy text-white p-6 sm:p-8 shadow-card">
              <div className="inline-flex size-11 items-center justify-center rounded-md bg-gold/15 text-gold">
                <WhatsAppIcon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t("info.whatsappTitle")}</h3>
              <p className="mt-2 text-white/75 text-sm leading-relaxed">
                {t("info.whatsappBody")}
              </p>
              <ButtonLink
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="mt-5 w-full"
              >
                <WhatsAppIcon className="size-5" />
                {tc("whatsapp")}
              </ButtonLink>
            </div>

            <div className="rounded-lg border border-mute-100 bg-white p-6 sm:p-8 space-y-5">
              <InfoRow icon={Phone} label={t("info.phone")} value={site.phoneDisplay} href={`tel:${site.whatsappNumber}`} />
              <InfoRow icon={Mail} label={t("info.email")} value={site.email} href={`mailto:${site.email}`} />
              <InfoRow icon={Clock} label={t("info.hours")} value={t("info.hoursValue")} />
              <InfoRow icon={MapPin} label={t("info.office")} value={site.address[l]} />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="shrink-0 inline-flex size-10 items-center justify-center rounded-md bg-cream text-navy">
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-mute">{label}</div>
        <div className="mt-0.5 text-navy font-medium">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-start gap-4 hover:text-gold transition-colors" dir="ltr">
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-4">{content}</div>
  );
}
