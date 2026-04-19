import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PropertyImage } from "./PropertyImage";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import { formatArea, formatPrice } from "@/lib/formatters";
import type { Property } from "@/types/property";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

export function PropertyCard({ property }: { property: Property }) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("property");
  const tc = useTranslations("cta");
  const price = formatPrice(property.price, locale);
  const muted = property.status !== "available";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block rounded-lg overflow-hidden bg-white shadow-card hover:shadow-lift transition-all duration-300 ease-smooth border border-mute-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mute-100">
        <PropertyImage
          src={property.images[0]?.src ?? ""}
          alt={property.images[0]?.alt[locale] ?? property.title[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "transition-transform duration-700 ease-smooth group-hover:scale-[1.04]",
            muted && "opacity-70 grayscale-[15%]",
          )}
        />
        <div className="absolute top-3 start-3 flex gap-2">
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy leading-snug line-clamp-1">
          {property.title[locale]}
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-mute">
          <MapPin className="size-3.5" />
          <span>{property.district[locale]}, {property.city[locale]}</span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-ink/70">
          {property.bedrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-4 text-gold" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4 text-gold" />
              {property.bathrooms}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-4 text-gold" />
            {formatArea(property.area, locale)}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-mute-100 pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-mute">
              {price ? "" : ""}
            </div>
            <div className="text-lg font-bold text-navy">
              {price ?? t("priceOnRequest")}
            </div>
          </div>
          <span className="text-xs font-medium text-gold group-hover:underline underline-offset-4">
            {tc("viewDetails")} →
          </span>
        </div>
      </div>
    </Link>
  );
}
