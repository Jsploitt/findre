import type { Property } from "@/types/property";

export interface DbPropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  alt_text_ar: string | null;
  alt_text_en: string | null;
  display_order: number | null;
}

export interface DbProperty {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  description_en: string | null;
  short_description_ar: string | null;
  short_description_en: string | null;
  type: string;
  status: string;
  district_ar: string | null;
  district_en: string | null;
  city_ar: string | null;
  city_en: string | null;
  google_maps_url: string | null;
  price_amount: number | null;
  price_currency: string | null;
  price_period: string | null;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  year_built: number | null;
  furnished: boolean | null;
  amenities: string[] | null;
  latitude: number | null;
  longitude: number | null;
  featured: boolean | null;
  is_published: boolean | null;
  permit_number: string | null;
  display_order: number | null;
  created_at: string;
  property_images?: DbPropertyImage[];
}

export function toProperty(row: DbProperty): Property {
  const images = (row.property_images ?? [])
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map((img) => ({
      src: img.image_url,
      alt: {
        ar: img.alt_text_ar ?? "",
        en: img.alt_text_en ?? "",
      },
    }));

  const hasShortDesc =
    row.short_description_ar || row.short_description_en;

  return {
    id: row.id,
    slug: row.slug,
    title: { ar: row.title_ar, en: row.title_en },
    description: {
      ar: row.description_ar ?? "",
      en: row.description_en ?? "",
    },
    ...(hasShortDesc && {
      shortDescription: {
        ar: row.short_description_ar ?? "",
        en: row.short_description_en ?? "",
      },
    }),
    type: row.type as Property["type"],
    status: row.status as Property["status"],
    district: {
      ar: row.district_ar ?? "",
      en: row.district_en ?? "",
    },
    city: {
      ar: row.city_ar ?? "الرياض",
      en: row.city_en ?? "Riyadh",
    },
    ...(row.price_amount != null && {
      price: {
        amount: row.price_amount,
        currency: "SAR" as const,
        period: (row.price_period as "month" | "year") ?? null,
      },
    }),
    area: row.area ?? 0,
    ...(row.bedrooms != null && { bedrooms: row.bedrooms }),
    ...(row.bathrooms != null && { bathrooms: row.bathrooms }),
    ...(row.parking != null && { parking: row.parking }),
    ...(row.year_built != null && { yearBuilt: row.year_built }),
    ...(row.furnished != null && { furnished: row.furnished }),
    amenities: row.amenities ?? [],
    images,
    location: {
      lat: row.latitude ?? 0,
      lng: row.longitude ?? 0,
      mapUrl:
        row.google_maps_url ||
        `https://maps.google.com/?q=${row.latitude ?? 0},${row.longitude ?? 0}`,
    },
    featured: row.featured ?? false,
    ...(row.permit_number && { permitNumber: row.permit_number }),
    createdAt: row.created_at,
  };
}
