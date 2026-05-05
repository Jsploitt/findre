import { setRequestLocale } from "next-intl/server";
import { PropertiesClient } from "./PropertiesClient";
import { getProperties } from "@/lib/properties";

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const all = await getProperties();
  return <PropertiesClient all={all} />;
}
