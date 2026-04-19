"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { PropertyFilters } from "@/lib/filter";
import { collectDistricts } from "@/lib/filter";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  all: Property[];
  value: PropertyFilters;
  onChange: (next: PropertyFilters) => void;
  onReset: () => void;
}

const TYPES: (PropertyType | "all")[] = ["all", "villa", "apartment", "townhouse", "land", "commercial"];
const STATUSES: (PropertyStatus | "all")[] = ["all", "available", "booked", "reserved"];

export function FilterBar({ all, value, onChange, onReset }: Props) {
  const t = useTranslations("listings.filter");
  const ts = useTranslations("listings.sort");
  const tt = useTranslations("type");
  const tst = useTranslations("status");
  const locale = useLocale() as "ar" | "en";
  const [mobileOpen, setMobileOpen] = useState(false);

  const districts = useMemo(() => collectDistricts(all), [all]);

  const body = (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
      <div className="relative md:col-span-2 lg:col-span-2">
        <Search className="absolute top-1/2 -translate-y-1/2 start-3.5 size-4 text-mute pointer-events-none" />
        <input
          type="search"
          placeholder={t("search")}
          value={value.q ?? ""}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          className="w-full rounded-md border border-navy/15 bg-white ps-10 pe-4 py-3 text-sm text-ink placeholder:text-mute focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      <Select
        aria-label={t("type")}
        value={value.type ?? "all"}
        onChange={(e) => onChange({ ...value, type: e.target.value as PropertyType | "all" })}
      >
        {TYPES.map((x) => (
          <option key={x} value={x}>
            {x === "all" ? t("type") + ": " + t("any") : tt(x)}
          </option>
        ))}
      </Select>

      <Select
        aria-label={t("district")}
        value={value.district ?? "all"}
        onChange={(e) => onChange({ ...value, district: e.target.value })}
      >
        <option value="all">{t("district") + ": " + t("any")}</option>
        {districts.map((d) => (
          <option key={d.en} value={d.en}>{locale === "ar" ? d.ar : d.en}</option>
        ))}
      </Select>

      <Select
        aria-label={t("status")}
        value={value.status ?? "all"}
        onChange={(e) => onChange({ ...value, status: e.target.value as PropertyStatus | "all" })}
      >
        {STATUSES.map((x) => (
          <option key={x} value={x}>
            {x === "all" ? t("status") + ": " + t("any") : tst(x)}
          </option>
        ))}
      </Select>

      <Select
        aria-label={t("sort")}
        value={value.sort ?? "newest"}
        onChange={(e) => onChange({ ...value, sort: e.target.value as PropertyFilters["sort"] })}
      >
        <option value="newest">{ts("newest")}</option>
        <option value="priceAsc">{ts("priceAsc")}</option>
        <option value="priceDesc">{ts("priceDesc")}</option>
      </Select>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block rounded-lg bg-white border border-mute-100 shadow-card p-5">
        {body}
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onReset} className="text-sm font-medium text-mute hover:text-navy transition-colors">
            {t("reset")}
          </button>
        </div>
      </div>

      {/* Mobile trigger */}
      <div className="md:hidden flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-5 py-3 text-sm font-medium"
        >
          <SlidersHorizontal className="size-4" />
          {t("open")}
        </button>
        <Select
          aria-label={t("sort")}
          value={value.sort ?? "newest"}
          onChange={(e) => onChange({ ...value, sort: e.target.value as PropertyFilters["sort"] })}
          className="flex-1"
        >
          <option value="newest">{ts("newest")}</option>
          <option value="priceAsc">{ts("priceAsc")}</option>
          <option value="priceDesc">{ts("priceDesc")}</option>
        </Select>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <div
        className={cn(
          "md:hidden fixed z-50 inset-x-0 bottom-0 rounded-t-2xl bg-white transition-transform duration-300 ease-smooth",
          mobileOpen ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-mute-100">
          <h2 className="text-lg font-semibold text-navy">{t("open")}</h2>
          <button type="button" onClick={() => setMobileOpen(false)} className="size-9 rounded-full border border-navy/15 flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{body}</div>
        <div className="p-5 border-t border-mute-100 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onReset}>{t("reset")}</Button>
          <Button className="flex-1" onClick={() => setMobileOpen(false)}>{t("apply")}</Button>
        </div>
      </div>
    </>
  );
}
