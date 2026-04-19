export const site = {
  name: "FindRE",
  domain: "findre.co",
  whatsappNumber: "966500000000",
  phoneDisplay: "+966 50 000 0000",
  email: "hello@findre.co",
  address: {
    ar: "شمال الرياض، المملكة العربية السعودية",
    en: "Northern Riyadh, Saudi Arabia",
  },
  social: {
    instagram: "https://instagram.com/findre",
    x: "https://x.com/findre",
  },
} as const;

export type SiteConfig = typeof site;
