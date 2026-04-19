import { useTranslations } from "next-intl";
import type { Property } from "@/types/property";
import { PropertyGrid } from "./PropertyGrid";

export function RelatedProperties({ items }: { items: Property[] }) {
  const t = useTranslations("property");
  if (items.length === 0) return null;
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="h-section">{t("related")}</h2>
      </div>
      <PropertyGrid items={items} />
    </section>
  );
}
