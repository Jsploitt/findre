import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyFacts } from "@/components/property/PropertyFacts";
import { PropertyStatusBadge } from "@/components/property/PropertyStatusBadge";
import { RelatedProperties } from "@/components/property/RelatedProperties";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/formatters";
import { Link } from "@/i18n/routing";
import { getProperty, getRelatedProperties, properties } from "@/content/properties";
import { MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import { site } from "@/content/site";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return properties.flatMap((p) => ["ar", "en"].map((locale) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return {
    title: property.title[locale as "ar" | "en"],
    description: property.description[locale as "ar" | "en"],
  };
}

export default async function PropertyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as "ar" | "en";
  const property = getProperty(slug);
  if (!property) notFound();

  const t = await getTranslations("property");
  const tc = await getTranslations("cta");
  const ta = await getTranslations("amenities");
  const lo = await getLocale();
  const price = formatPrice(property.price, l);
  const url = `https://${site.domain}/${lo}/properties/${property.slug}`;
  const waLink = buildWhatsAppLink({ locale: l, property, propertyUrl: url });
  const related = getRelatedProperties(slug, 3);

  return (
    <>
      <Container className="pt-8 pb-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-navy transition-colors"
        >
          <ArrowLeft className="size-4 icon-flip" />
          {t("backToListings")}
        </Link>
      </Container>

      <Container className="pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <PropertyStatusBadge status={property.status} />
            </div>
            <h1 className="h-section !text-navy">{property.title[l]}</h1>
            <div className="mt-2 inline-flex items-center gap-1.5 text-mute">
              <MapPin className="size-4" />
              <span>{property.district[l]}, {property.city[l]}</span>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-12">
        <PropertyGallery property={property} />
      </Container>

      <Container className="pb-24">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-semibold text-navy mb-4">{t("description")}</h2>
              <p className="text-ink/80 leading-relaxed whitespace-pre-line">{property.description[l]}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-4">{t("details")}</h2>
              <PropertyFacts property={property} />
            </section>

            {property.amenities.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-navy mb-4">{t("amenities")}</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((a) => (
                    <li
                      key={a}
                      className="inline-flex items-center gap-2 rounded-full bg-cream border border-mute-100 px-3.5 py-2 text-sm text-ink"
                    >
                      <span className="size-1.5 rounded-full bg-gold" />
                      {ta(a)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold text-navy mb-4">{t("location")}</h2>
              <div className="relative rounded-lg overflow-hidden border border-mute-100 aspect-[16/9] bg-gradient-to-br from-navy/10 to-cream">
                <div className="absolute inset-0 flex items-center justify-center text-navy/50 text-sm">
                  {property.district[l]}
                </div>
              </div>
              <a
                href={property.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors"
              >
                {tc("openInMaps")} <ExternalLink className="size-3.5" />
              </a>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-lg bg-white border border-mute-100 shadow-card p-6">
              <div className="text-xs uppercase tracking-wider text-mute">
                {price ? (lo === "ar" ? "السعر" : "Price") : ""}
              </div>
              <div className="mt-1 text-2xl font-bold text-navy">
                {price ?? t("priceOnRequest")}
              </div>
              <div className="mt-5">
                <PropertyStatusBadge status={property.status} />
              </div>
              <hr className="my-6 border-mute-100" />
              <h3 className="text-lg font-semibold text-navy">{t("inquire")}</h3>
              <p className="mt-2 text-sm text-ink/70">{t("inquireBody")}</p>
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
              <Link
                href="/contact"
                className="mt-3 block text-center text-sm font-medium text-navy hover:text-gold transition-colors"
              >
                {tc("sendMessage")}
              </Link>
            </div>
          </aside>
        </div>

        <RelatedProperties items={related} />
      </Container>
    </>
  );
}
