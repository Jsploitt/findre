import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { ArrowRight } from "lucide-react";

export function AboutStrip() {
  const t = useTranslations("home.aboutStrip");
  const tc = useTranslations("cta");
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <Pattern className="opacity-[0.05]" />
      <Container className="relative py-24 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="eyebrow mb-4">{t("eyebrow")}</div>
          <h2 className="h-section text-white">{t("title")}</h2>
          <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-xl">
            {t("body")}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-white transition-colors"
          >
            {tc("learnMore")} <ArrowRight className="size-4 icon-flip" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5 row-span-2">
            <Image src="/images/findre-test-photos/1.jpeg" alt="" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
            <Image src="/images/findre-test-photos/2.jpeg" alt="" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
            <Image src="/images/findre-test-photos/3.jpeg" alt="" fill sizes="25vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
