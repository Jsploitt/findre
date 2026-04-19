import type { Property, PropertyStatus, PropertyType } from "@/types/property";

export interface PropertyFilters {
  q?: string;
  type?: PropertyType | "all";
  district?: string | "all";
  status?: PropertyStatus | "all";
  minBedrooms?: number;
  sort?: "newest" | "priceAsc" | "priceDesc";
}

export function filterProperties(
  items: Property[],
  filters: PropertyFilters,
): Property[] {
  let out = [...items];
  const q = filters.q?.trim().toLowerCase();
  if (q) {
    out = out.filter((p) =>
      [p.title.ar, p.title.en, p.district.ar, p.district.en]
        .some((s) => s.toLowerCase().includes(q)),
    );
  }
  if (filters.type && filters.type !== "all") {
    out = out.filter((p) => p.type === filters.type);
  }
  if (filters.district && filters.district !== "all") {
    out = out.filter((p) => p.district.en === filters.district);
  }
  if (filters.status && filters.status !== "all") {
    out = out.filter((p) => p.status === filters.status);
  }
  if (filters.minBedrooms && filters.minBedrooms > 0) {
    out = out.filter((p) => (p.bedrooms ?? 0) >= filters.minBedrooms!);
  }
  switch (filters.sort) {
    case "priceAsc":
      out.sort((a, b) => (a.price?.amount ?? Infinity) - (b.price?.amount ?? Infinity));
      break;
    case "priceDesc":
      out.sort((a, b) => (b.price?.amount ?? -Infinity) - (a.price?.amount ?? -Infinity));
      break;
    case "newest":
    default:
      out.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return out;
}

export function collectDistricts(items: Property[]): { en: string; ar: string }[] {
  const map = new Map<string, { en: string; ar: string }>();
  for (const p of items) map.set(p.district.en, p.district);
  return Array.from(map.values()).sort((a, b) => a.en.localeCompare(b.en));
}
