import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ContactForm } from "@/components/forms/ContactForm";

export function CTASection() {
  const t = useTranslations("home.ctaSection");
  const tc = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";
  return (
    <section className="py-24 sm:py-28 bg-cream">
      <Container>
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="h-section">{t("title")}</h2>
            <p className="mt-4 body-lead max-w-md">{t("body")}</p>
            <div className="mt-8">
              <ButtonLink
                href={buildWhatsAppLink({ locale })}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                <WhatsAppIcon className="size-5" />
                {tc("whatsapp")}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-lg bg-white border border-mute-100 shadow-card p-6 sm:p-8">
            <ContactForm compact />
          </div>
        </div>
      </Container>
    </section>
  );
}
