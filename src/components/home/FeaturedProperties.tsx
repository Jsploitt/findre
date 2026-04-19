import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { getFeaturedProperties } from "@/content/properties";
import { ArrowRight } from "lucide-react";

export function FeaturedProperties() {
  const t = useTranslations("home.featured");
  const tc = useTranslations("cta");
  const items = getFeaturedProperties(6);
  return (
    <section className="py-24 sm:py-28 bg-cream">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors"
          >
            {tc("viewAll")}
            <ArrowRight className="size-4 icon-flip" />
          </Link>
        </div>
        <div className="mt-12">
          <PropertyGrid items={items} />
        </div>
        <div className="mt-10 sm:hidden text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy"
          >
            {tc("viewAll")} <ArrowRight className="size-4 icon-flip" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
