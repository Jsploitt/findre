export type PropertyStatus = "available" | "booked" | "reserved";
export type PropertyType =
  | "villa"
  | "apartment"
  | "land"
  | "commercial"
  | "townhouse";

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface Property {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  type: PropertyType;
  status: PropertyStatus;
  district: LocalizedString;
  city: LocalizedString;
  price?: {
    amount: number;
    currency: "SAR";
    period?: "month" | "year" | null;
  };
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  yearBuilt?: number;
  furnished?: boolean;
  amenities: string[];
  images: { src: string; alt: LocalizedString }[];
  location: { lat: number; lng: number; mapUrl: string };
  featured?: boolean;
  createdAt: string;
}
