import type { Property } from "@/types/property";

// Sample data — realistic Northern Riyadh districts.
// Replace images by dropping files into `public/images/properties/<slug>/` and
// updating the `images` array below. Change status to "booked" when unavailable.
export const properties: Property[] = [
  {
    id: "p-001",
    slug: "al-arid-modern-villa",
    title: {
      ar: "فيلا حديثة في حي العارض",
      en: "Modern Villa in Al Arid",
    },
    description: {
      ar: "فيلا حديثة بتصميم راقٍ ومساحات مفتوحة، ضمن حي العارض الهادئ. تشطيبات فاخرة، إضاءة طبيعية وفيرة، وحديقة خاصة.",
      en: "A contemporary villa with refined finishes and open layouts in the quiet Al Arid neighborhood. Abundant natural light and a private garden.",
    },
    type: "villa",
    status: "available",
    district: { ar: "حي العارض", en: "Al Arid" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 2850000, currency: "SAR" },
    area: 420,
    bedrooms: 5,
    bathrooms: 6,
    parking: 2,
    yearBuilt: 2023,
    furnished: false,
    amenities: ["majlis", "maidRoom", "driverRoom", "garden", "smart_home", "central_ac"],
    images: [
      { src: "/images/properties/al-arid-modern-villa/01.jpg", alt: { ar: "واجهة الفيلا", en: "Villa facade" } },
      { src: "/images/properties/al-arid-modern-villa/02.jpg", alt: { ar: "صالة المعيشة", en: "Living area" } },
      { src: "/images/properties/al-arid-modern-villa/03.jpg", alt: { ar: "المطبخ", en: "Kitchen" } },
      { src: "/images/properties/al-arid-modern-villa/04.jpg", alt: { ar: "الحديقة", en: "Garden" } },
    ],
    location: {
      lat: 24.9215,
      lng: 46.6724,
      mapUrl: "https://maps.google.com/?q=24.9215,46.6724",
    },
    featured: true,
    createdAt: "2026-03-20",
  },
  {
    id: "p-002",
    slug: "al-yasmin-duplex-apartment",
    title: {
      ar: "دوبلكس فاخر في حي الياسمين",
      en: "Premium Duplex in Al Yasmin",
    },
    description: {
      ar: "شقة دوبلكس بإطلالة مميزة ومساحات مدروسة، قريبة من الخدمات الرئيسية في حي الياسمين.",
      en: "A duplex apartment with thoughtful proportions and a refined view, minutes from Al Yasmin's main amenities.",
    },
    type: "apartment",
    status: "available",
    district: { ar: "حي الياسمين", en: "Al Yasmin" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 1450000, currency: "SAR" },
    area: 260,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    yearBuilt: 2024,
    furnished: true,
    amenities: ["elevator", "covered_parking", "smart_home", "kitchen_fitted", "central_ac"],
    images: [
      { src: "/images/properties/al-yasmin-duplex-apartment/01.jpg", alt: { ar: "المدخل", en: "Entrance" } },
      { src: "/images/properties/al-yasmin-duplex-apartment/02.jpg", alt: { ar: "الصالة", en: "Lounge" } },
      { src: "/images/properties/al-yasmin-duplex-apartment/03.jpg", alt: { ar: "غرفة النوم الرئيسية", en: "Master bedroom" } },
    ],
    location: {
      lat: 24.8392,
      lng: 46.6165,
      mapUrl: "https://maps.google.com/?q=24.8392,46.6165",
    },
    featured: true,
    createdAt: "2026-03-15",
  },
  {
    id: "p-003",
    slug: "al-narjis-family-villa",
    title: {
      ar: "فيلا عائلية في حي النرجس",
      en: "Family Villa in Al Narjis",
    },
    description: {
      ar: "فيلا مثالية للعائلات الكبيرة، تصميم عملي ومساحات خارجية واسعة في حي النرجس.",
      en: "An ideal home for larger families with a practical layout and generous outdoor space in Al Narjis.",
    },
    type: "villa",
    status: "booked",
    district: { ar: "حي النرجس", en: "Al Narjis" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 3250000, currency: "SAR" },
    area: 480,
    bedrooms: 6,
    bathrooms: 7,
    parking: 3,
    yearBuilt: 2022,
    furnished: false,
    amenities: ["majlis", "maidRoom", "driverRoom", "garden", "pool", "security_24_7"],
    images: [
      { src: "/images/properties/al-narjis-family-villa/01.jpg", alt: { ar: "الواجهة الأمامية", en: "Front facade" } },
      { src: "/images/properties/al-narjis-family-villa/02.jpg", alt: { ar: "المسبح", en: "Pool" } },
    ],
    location: {
      lat: 24.8601,
      lng: 46.6532,
      mapUrl: "https://maps.google.com/?q=24.8601,46.6532",
    },
    featured: true,
    createdAt: "2026-02-28",
  },
  {
    id: "p-004",
    slug: "an-nafal-garden-apartment",
    title: {
      ar: "شقة بحديقة في حي النفل",
      en: "Garden Apartment in An Nafal",
    },
    description: {
      ar: "شقة أرضية بحديقة خاصة في حي النفل، تشطيبات حديثة وإضاءة طبيعية وفيرة.",
      en: "A ground-floor apartment with private garden access in An Nafal. Modern finishes and ample natural light.",
    },
    type: "apartment",
    status: "available",
    district: { ar: "حي النفل", en: "An Nafal" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 1180000, currency: "SAR" },
    area: 210,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    yearBuilt: 2024,
    furnished: false,
    amenities: ["garden", "elevator", "covered_parking", "kitchen_fitted", "central_ac"],
    images: [
      { src: "/images/properties/an-nafal-garden-apartment/01.jpg", alt: { ar: "الصالة", en: "Living room" } },
      { src: "/images/properties/an-nafal-garden-apartment/02.jpg", alt: { ar: "الحديقة", en: "Garden" } },
    ],
    location: {
      lat: 24.7993,
      lng: 46.6218,
      mapUrl: "https://maps.google.com/?q=24.7993,46.6218",
    },
    createdAt: "2026-02-20",
  },
  {
    id: "p-005",
    slug: "al-malqa-penthouse",
    title: {
      ar: "بنتهاوس في حي الملقا",
      en: "Penthouse in Al Malqa",
    },
    description: {
      ar: "بنتهاوس راقٍ بإطلالة بانورامية وتشطيبات فاخرة في قلب حي الملقا.",
      en: "A refined penthouse with panoramic views and luxury finishes in the heart of Al Malqa.",
    },
    type: "apartment",
    status: "reserved",
    district: { ar: "حي الملقا", en: "Al Malqa" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 4200000, currency: "SAR" },
    area: 340,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    yearBuilt: 2023,
    furnished: true,
    amenities: ["elevator", "covered_parking", "gym", "smart_home", "security_24_7", "central_ac"],
    images: [
      { src: "/images/properties/al-malqa-penthouse/01.jpg", alt: { ar: "الإطلالة", en: "View" } },
      { src: "/images/properties/al-malqa-penthouse/02.jpg", alt: { ar: "صالة الاستقبال", en: "Reception" } },
    ],
    location: {
      lat: 24.7738,
      lng: 46.6018,
      mapUrl: "https://maps.google.com/?q=24.7738,46.6018",
    },
    featured: true,
    createdAt: "2026-03-05",
  },
  {
    id: "p-006",
    slug: "hittin-land-plot",
    title: {
      ar: "أرض سكنية في حي حطين",
      en: "Residential Land in Hittin",
    },
    description: {
      ar: "أرض سكنية بموقع مميز وشوارع نافذة في حي حطين، مناسبة لبناء فيلا خاصة.",
      en: "A well-located residential plot in Hittin, suitable for a custom villa build.",
    },
    type: "land",
    status: "available",
    district: { ar: "حي حطين", en: "Hittin" },
    city: { ar: "الرياض", en: "Riyadh" },
    area: 625,
    amenities: [],
    images: [
      { src: "/images/properties/hittin-land-plot/01.jpg", alt: { ar: "الأرض", en: "Land plot" } },
    ],
    location: {
      lat: 24.7691,
      lng: 46.5861,
      mapUrl: "https://maps.google.com/?q=24.7691,46.5861",
    },
    createdAt: "2026-01-30",
  },
  {
    id: "p-007",
    slug: "al-arid-townhouse",
    title: {
      ar: "تاون هاوس في حي العارض",
      en: "Townhouse in Al Arid",
    },
    description: {
      ar: "تاون هاوس عصري بتصميم عملي وموقع هادئ، مناسب للعائلات الصغيرة.",
      en: "A modern townhouse with a practical layout in a quiet pocket of Al Arid — ideal for smaller families.",
    },
    type: "townhouse",
    status: "available",
    district: { ar: "حي العارض", en: "Al Arid" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 1650000, currency: "SAR" },
    area: 245,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    yearBuilt: 2024,
    furnished: false,
    amenities: ["covered_parking", "kitchen_fitted", "central_ac", "smart_home"],
    images: [
      { src: "/images/properties/al-arid-townhouse/01.jpg", alt: { ar: "الواجهة", en: "Facade" } },
      { src: "/images/properties/al-arid-townhouse/02.jpg", alt: { ar: "الصالة", en: "Living" } },
    ],
    location: {
      lat: 24.9183,
      lng: 46.6691,
      mapUrl: "https://maps.google.com/?q=24.9183,46.6691",
    },
    createdAt: "2026-03-10",
  },
  {
    id: "p-008",
    slug: "al-malqa-commercial-office",
    title: {
      ar: "مكتب تجاري في حي الملقا",
      en: "Commercial Office in Al Malqa",
    },
    description: {
      ar: "مكتب تجاري بموقع استراتيجي على شارع رئيسي في حي الملقا، مناسب للشركات الناشئة والمكاتب التنفيذية.",
      en: "A strategically located commercial office on a main street in Al Malqa — suited to startups and executive teams.",
    },
    type: "commercial",
    status: "available",
    district: { ar: "حي الملقا", en: "Al Malqa" },
    city: { ar: "الرياض", en: "Riyadh" },
    price: { amount: 180000, currency: "SAR", period: "year" },
    area: 180,
    parking: 4,
    yearBuilt: 2022,
    amenities: ["elevator", "covered_parking", "central_ac", "security_24_7"],
    images: [
      { src: "/images/properties/al-malqa-commercial-office/01.jpg", alt: { ar: "المكتب", en: "Office" } },
    ],
    location: {
      lat: 24.7754,
      lng: 46.6062,
      mapUrl: "https://maps.google.com/?q=24.7754,46.6062",
    },
    createdAt: "2026-02-08",
  },
];

export function getProperties(): Property[] {
  return [...properties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit = 3): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProperties(
  slug: string,
  limit = 3,
): Property[] {
  const current = getProperty(slug);
  if (!current) return [];
  return properties
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const scoreA = (a.district.en === current.district.en ? 2 : 0) + (a.type === current.type ? 1 : 0);
      const scoreB = (b.district.en === current.district.en ? 2 : 0) + (b.type === current.type ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
