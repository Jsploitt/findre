import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Compass, Eye, HeartHandshake, MapPin, ShieldCheck, MessageCircle } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as "ar" | "en";
  const t = await getTranslations("about");
  const tc = await getTranslations("cta");
  const waLink = buildWhatsAppLink({ locale: l });

  const mvv = [
    { key: "mission", icon: Compass },
    { key: "vision", icon: Eye },
    { key: "values", icon: HeartHandshake },
  ] as const;

  const pillars = [
    { key: "rooted", icon: MapPin },
    { key: "transparent", icon: ShieldCheck },
    { key: "human", icon: MessageCircle },
  ] as const;

  return (
    <>
      <section className="relative bg-navy text-white overflow-hidden">
        <Pattern className="opacity-[0.06]" />
        <Container className="relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">{t("hero.eyebrow")}</div>
            <h1 className="h-display text-white">{t("hero.title")}</h1>
            <p className="mt-6 text-white/75 text-lg leading-relaxed">{t("hero.body")}</p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader title={t("story.title")} subtitle={t("story.body")} />
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/5] rounded-lg overflow-hidden bg-cream">
            <Image
              src="/images/about/story.jpg"
              alt=""
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-cream border-y border-mute-100">
        <Container className="py-24">
          <div className="grid md:grid-cols-3 gap-6">
            {mvv.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-lg bg-white border border-mute-100 shadow-card p-8"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-md bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-ink/75 leading-relaxed">{t(`${key}.body`)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24">
          <SectionHeader title={t("pillars.title")} />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {pillars.map(({ key, icon: Icon }) => (
              <div key={key} className="flex gap-4">
                <div className="shrink-0 inline-flex size-11 items-center justify-center rounded-md bg-navy text-gold">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy">
                    {t(`pillars.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-ink/75 leading-relaxed">
                    {t(`pillars.items.${key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-navy text-white overflow-hidden">
        <Pattern className="opacity-[0.05]" />
        <Container className="relative py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="h-section text-white">{t("hero.title")}</h2>
          </div>
          <ButtonLink href={waLink} target="_blank" rel="noopener noreferrer" size="lg">
            <WhatsAppIcon className="size-5" />
            {tc("whatsapp")}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
