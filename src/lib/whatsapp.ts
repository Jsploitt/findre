import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import type { Property } from "@/types/property";

interface BuildLinkOptions {
  locale: Locale;
  property?: Property;
  propertyUrl?: string;
  customMessage?: string;
}

const defaultMessage: Record<Locale, string> = {
  ar: "مرحبًا FindRE، أرغب في الاستفسار عن عقاراتكم.",
  en: "Hello FindRE, I'd like to ask about your properties.",
};

export function buildWhatsAppLink({
  locale,
  property,
  propertyUrl,
  customMessage,
}: BuildLinkOptions): string {
  // Generic CTAs should open the WhatsApp catalog directly.
  if (!property && !customMessage) {
    return site.whatsappCatalogUrl;
  }

  let text = customMessage ?? defaultMessage[locale];
  if (property) {
    const title = property.title[locale];
    const url = propertyUrl ?? "";
    text =
      locale === "ar"
        ? `مرحبًا FindRE، أنا مهتم بـ «${title}»${url ? ` — ${url}` : ""}.`
        : `Hello FindRE, I'm interested in "${title}"${url ? ` — ${url}` : ""}.`;
  }
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
