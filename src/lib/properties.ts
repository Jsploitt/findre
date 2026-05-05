import { supabase } from "./supabase";
import { toProperty, type DbProperty } from "./property-adapter";
import type { Property } from "@/types/property";

const WITH_IMAGES = `
  *,
  property_images (id, image_url, alt_text_ar, alt_text_en, display_order)
` as const;

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select(WITH_IMAGES)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[properties] getProperties:", error.message);
    return [];
  }

  return (data as DbProperty[]).map(toProperty);
}

export async function getProperty(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select(WITH_IMAGES)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return toProperty(data as DbProperty);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select(WITH_IMAGES)
    .eq("is_published", true)
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[properties] getFeaturedProperties:", error.message);
    return [];
  }

  return (data as DbProperty[]).map(toProperty);
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("slug")
    .eq("is_published", true);

  if (error || !data) return [];
  return data.map((r) => r.slug as string);
}

export async function getRelatedProperties(
  slug: string,
  limit = 3,
): Promise<Property[]> {
  const current = await getProperty(slug);
  if (!current) return [];

  const { data, error } = await supabase
    .from("properties")
    .select(WITH_IMAGES)
    .eq("is_published", true)
    .neq("slug", slug)
    .limit(20);

  if (error || !data) return [];

  return (data as DbProperty[])
    .map(toProperty)
    .sort((a, b) => {
      const scoreA =
        (a.district.en === current.district.en ? 2 : 0) +
        (a.type === current.type ? 1 : 0);
      const scoreB =
        (b.district.en === current.district.en ? 2 : 0) +
        (b.type === current.type ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
