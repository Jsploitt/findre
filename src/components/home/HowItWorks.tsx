import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search, BadgeCheck, MessageSquare } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("home.how");
  const steps = [
    { key: "browse", Icon: Search },
    { key: "check", Icon: BadgeCheck },
    { key: "contact", Icon: MessageSquare },
  ] as const;
  return (
    <section className="py-24 sm:py-28 bg-white">
      <Container>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} align="center" />
        <ol className="mt-16 grid gap-8 md:grid-cols-3 relative">
          {steps.map(({ key, Icon }, idx) => (
            <li key={key} className="relative text-center">
              <div className="mx-auto size-14 rounded-full border border-gold/40 bg-white text-gold flex items-center justify-center shadow-card">
                <Icon className="size-6" />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-gold font-medium">
                0{idx + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-navy">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-xs mx-auto">
                {t(`steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
