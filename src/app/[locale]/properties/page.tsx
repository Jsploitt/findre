import { setRequestLocale } from "next-intl/server";
import { PropertiesClient } from "./PropertiesClient";
import { getProperties } from "@/content/properties";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const all = getProperties();
  return <PropertiesClient all={all} />;
}
