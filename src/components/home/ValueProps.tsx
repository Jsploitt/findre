import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MapPin, ShieldCheck, MessageCircle } from "lucide-react";

export function ValueProps() {
  const t = useTranslations("home.valueProps");
  const items = [
    { key: "expertise", Icon: MapPin },
    { key: "curated", Icon: ShieldCheck },
    { key: "direct", Icon: MessageCircle },
  ] as const;

  return (
    <section className="py-24 sm:py-28 bg-white">
      <Container>
        <SectionHeader
          eyebrow=""
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon }) => (
            <article
              key={key}
              className="group relative rounded-lg border border-mute-100 bg-white p-8 hover:shadow-lift hover:border-gold/40 transition-all duration-300 ease-smooth"
            >
              <div className="size-12 rounded-md bg-gold/10 text-gold flex items-center justify-center mb-6">
                <Icon className="size-6" />
              </div>
              <h3 className="text-xl font-semibold text-navy">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{t(`items.${key}.body`)}</p>
              <div className="mt-8 h-px w-10 bg-gold/60" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
