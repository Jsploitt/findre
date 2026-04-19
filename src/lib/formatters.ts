import type { Locale } from "@/i18n/routing";
import type { Property } from "@/types/property";

export function formatPrice(
  price: Property["price"],
  locale: Locale,
): string | null {
  if (!price) return null;
  const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  });
  const amount = formatter.format(price.amount);
  const currency = locale === "ar" ? "ر.س" : "SAR";
  const base = `${amount} ${currency}`;
  if (!price.period) return base;
  const period =
    locale === "ar"
      ? price.period === "month"
        ? "/ شهر"
        : "/ سنة"
      : `/ ${price.period}`;
  return `${base} ${period}`;
}

export function formatArea(area: number, locale: Locale): string {
  const fmt = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US");
  return `${fmt.format(area)} ${locale === "ar" ? "م²" : "m²"}`;
}
