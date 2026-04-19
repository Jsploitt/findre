import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutStrip } from "@/components/home/AboutStrip";
import { CTASection } from "@/components/home/CTASection";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProperties />
      <HowItWorks />
      <AboutStrip />
      <CTASection />
    </>
  );
}
