import { useLocale, useTranslations } from "next-intl";
import type { Property } from "@/types/property";
import { formatArea } from "@/lib/formatters";
import { BedDouble, Bath, Ruler, Car, Calendar, Home, Sofa } from "lucide-react";

export function PropertyFacts({ property }: { property: Property }) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("property.facts");
  const tt = useTranslations("type");

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Ruler className="size-4" />, label: t("area"), value: formatArea(property.area, locale) },
    { icon: <Home className="size-4" />, label: t("type"), value: tt(property.type) },
    ...(property.bedrooms != null
      ? [{ icon: <BedDouble className="size-4" />, label: t("bedrooms"), value: String(property.bedrooms) }]
      : []),
    ...(property.bathrooms != null
      ? [{ icon: <Bath className="size-4" />, label: t("bathrooms"), value: String(property.bathrooms) }]
      : []),
    ...(property.parking != null
      ? [{ icon: <Car className="size-4" />, label: t("parking"), value: String(property.parking) }]
      : []),
    ...(property.yearBuilt != null
      ? [{ icon: <Calendar className="size-4" />, label: t("year"), value: String(property.yearBuilt) }]
      : []),
    ...(property.furnished != null
      ? [{ icon: <Sofa className="size-4" />, label: t("furnished"), value: property.furnished ? t("furnishedYes") : t("furnishedNo") }]
      : []),
  ];

  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {rows.map((r, i) => (
        <div key={i} className="rounded-md border border-mute-100 bg-white px-4 py-3.5">
          <dt className="flex items-center gap-1.5 text-xs text-mute uppercase tracking-wider">
            <span className="text-gold">{r.icon}</span>
            {r.label}
          </dt>
          <dd className="mt-1 text-base font-semibold text-navy">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
