"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FilterBar } from "@/components/filters/FilterBar";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { filterProperties, type PropertyFilters } from "@/lib/filter";
import { Button } from "@/components/ui/Button";
import type { Property } from "@/types/property";

const initialFilters: PropertyFilters = {
  q: "",
  type: "all",
  district: "all",
  status: "all",
  sort: "newest",
};

export function PropertiesClient({ all }: { all: Property[] }) {
  const t = useTranslations("listings");
  const te = useTranslations("listings.empty");
  const tf = useTranslations("listings.filter");
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);

  const results = useMemo(() => filterProperties(all, filters), [all, filters]);

  return (
    <>
      <section className="bg-cream border-b border-mute-100">
        <Container className="py-12 sm:py-16">
          <div className="eyebrow mb-3">{t("count", { count: results.length })}</div>
          <h1 className="h-section">{t("title")}</h1>
          <p className="mt-3 body-lead max-w-xl">{t("subtitle")}</p>
        </Container>
      </section>

      <Container className="py-10">
        <FilterBar
          all={all}
          value={filters}
          onChange={setFilters}
          onReset={() => setFilters(initialFilters)}
        />
      </Container>

      <Container className="pb-24">
        {results.length === 0 ? (
          <div className="rounded-lg border border-mute-100 bg-cream text-center py-16 px-6">
            <h2 className="text-xl font-semibold text-navy">{te("title")}</h2>
            <p className="mt-2 text-ink/70 max-w-md mx-auto">{te("body")}</p>
            <div className="mt-6">
              <Button variant="secondary" onClick={() => setFilters(initialFilters)}>
                {tf("reset")}
              </Button>
            </div>
          </div>
        ) : (
          <PropertyGrid items={results} />
        )}
      </Container>
    </>
  );
}
