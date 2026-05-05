-- ─────────────────────────────────────────────────────────────────────────────
-- FindRE — Seed: 8 properties from static data
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO properties (
  slug, title_ar, title_en,
  description_ar, description_en,
  type, status,
  district_ar, district_en, city_ar, city_en,
  price_amount, price_currency, price_period,
  area, bedrooms, bathrooms, parking, year_built,
  furnished, amenities,
  latitude, longitude, google_maps_url,
  featured, is_published, display_order, created_at
) VALUES

-- 1 ─ al-arid-modern-villa
(
  'al-arid-modern-villa',
  'فيلا حديثة في حي العارض', 'Modern Villa in Al Arid',
  'فيلا حديثة بتصميم راقٍ ومساحات مفتوحة، ضمن حي العارض الهادئ. تشطيبات فاخرة، إضاءة طبيعية وفيرة، وحديقة خاصة.',
  'A contemporary villa with refined finishes and open layouts in the quiet Al Arid neighborhood. Abundant natural light and a private garden.',
  'villa', 'available',
  'حي العارض', 'Al Arid', 'الرياض', 'Riyadh',
  2850000, 'SAR', NULL,
  420, 5, 6, 2, 2023,
  false, ARRAY['majlis','maidRoom','driverRoom','garden','smart_home','central_ac'],
  24.9215, 46.6724, 'https://maps.google.com/?q=24.9215,46.6724',
  true, true, 1, '2026-03-20T00:00:00Z'
),

-- 2 ─ al-yasmin-duplex-apartment
(
  'al-yasmin-duplex-apartment',
  'دوبلكس فاخر في حي الياسمين', 'Premium Duplex in Al Yasmin',
  'شقة دوبلكس بإطلالة مميزة ومساحات مدروسة، قريبة من الخدمات الرئيسية في حي الياسمين.',
  'A duplex apartment with thoughtful proportions and a refined view, minutes from Al Yasmin''s main amenities.',
  'apartment', 'available',
  'حي الياسمين', 'Al Yasmin', 'الرياض', 'Riyadh',
  1450000, 'SAR', NULL,
  260, 4, 4, 2, 2024,
  true, ARRAY['elevator','covered_parking','smart_home','kitchen_fitted','central_ac'],
  24.8392, 46.6165, 'https://maps.google.com/?q=24.8392,46.6165',
  true, true, 2, '2026-03-15T00:00:00Z'
),

-- 3 ─ al-narjis-family-villa
(
  'al-narjis-family-villa',
  'فيلا عائلية في حي النرجس', 'Family Villa in Al Narjis',
  'فيلا مثالية للعائلات الكبيرة، تصميم عملي ومساحات خارجية واسعة في حي النرجس.',
  'An ideal home for larger families with a practical layout and generous outdoor space in Al Narjis.',
  'villa', 'booked',
  'حي النرجس', 'Al Narjis', 'الرياض', 'Riyadh',
  3250000, 'SAR', NULL,
  480, 6, 7, 3, 2022,
  false, ARRAY['majlis','maidRoom','driverRoom','garden','pool','security_24_7'],
  24.8601, 46.6532, 'https://maps.google.com/?q=24.8601,46.6532',
  true, true, 3, '2026-02-28T00:00:00Z'
),

-- 4 ─ an-nafal-garden-apartment
(
  'an-nafal-garden-apartment',
  'شقة بحديقة في حي النفل', 'Garden Apartment in An Nafal',
  'شقة أرضية بحديقة خاصة في حي النفل، تشطيبات حديثة وإضاءة طبيعية وفيرة.',
  'A ground-floor apartment with private garden access in An Nafal. Modern finishes and ample natural light.',
  'apartment', 'available',
  'حي النفل', 'An Nafal', 'الرياض', 'Riyadh',
  1180000, 'SAR', NULL,
  210, 3, 3, 2, 2024,
  false, ARRAY['garden','elevator','covered_parking','kitchen_fitted','central_ac'],
  24.7993, 46.6218, 'https://maps.google.com/?q=24.7993,46.6218',
  false, true, 4, '2026-02-20T00:00:00Z'
),

-- 5 ─ al-malqa-penthouse
(
  'al-malqa-penthouse',
  'بنتهاوس في حي الملقا', 'Penthouse in Al Malqa',
  'بنتهاوس راقٍ بإطلالة بانورامية وتشطيبات فاخرة في قلب حي الملقا.',
  'A refined penthouse with panoramic views and luxury finishes in the heart of Al Malqa.',
  'apartment', 'reserved',
  'حي الملقا', 'Al Malqa', 'الرياض', 'Riyadh',
  4200000, 'SAR', NULL,
  340, 4, 5, 3, 2023,
  true, ARRAY['elevator','covered_parking','gym','smart_home','security_24_7','central_ac'],
  24.7738, 46.6018, 'https://maps.google.com/?q=24.7738,46.6018',
  true, true, 5, '2026-03-05T00:00:00Z'
),

-- 6 ─ hittin-land-plot
(
  'hittin-land-plot',
  'أرض سكنية في حي حطين', 'Residential Land in Hittin',
  'أرض سكنية بموقع مميز وشوارع نافذة في حي حطين، مناسبة لبناء فيلا خاصة.',
  'A well-located residential plot in Hittin, suitable for a custom villa build.',
  'land', 'available',
  'حي حطين', 'Hittin', 'الرياض', 'Riyadh',
  NULL, 'SAR', NULL,
  625, NULL, NULL, NULL, NULL,
  false, ARRAY[]::text[],
  24.7691, 46.5861, 'https://maps.google.com/?q=24.7691,46.5861',
  false, true, 6, '2026-01-30T00:00:00Z'
),

-- 7 ─ al-arid-townhouse
(
  'al-arid-townhouse',
  'تاون هاوس في حي العارض', 'Townhouse in Al Arid',
  'تاون هاوس عصري بتصميم عملي وموقع هادئ، مناسب للعائلات الصغيرة.',
  'A modern townhouse with a practical layout in a quiet pocket of Al Arid — ideal for smaller families.',
  'townhouse', 'available',
  'حي العارض', 'Al Arid', 'الرياض', 'Riyadh',
  1650000, 'SAR', NULL,
  245, 4, 4, 2, 2024,
  false, ARRAY['covered_parking','kitchen_fitted','central_ac','smart_home'],
  24.9183, 46.6691, 'https://maps.google.com/?q=24.9183,46.6691',
  false, true, 7, '2026-03-10T00:00:00Z'
),

-- 8 ─ al-malqa-commercial-office
(
  'al-malqa-commercial-office',
  'مكتب تجاري في حي الملقا', 'Commercial Office in Al Malqa',
  'مكتب تجاري بموقع استراتيجي على شارع رئيسي في حي الملقا، مناسب للشركات الناشئة والمكاتب التنفيذية.',
  'A strategically located commercial office on a main street in Al Malqa — suited to startups and executive teams.',
  'commercial', 'available',
  'حي الملقا', 'Al Malqa', 'الرياض', 'Riyadh',
  180000, 'SAR', 'year',
  180, NULL, NULL, 4, 2022,
  false, ARRAY['elevator','covered_parking','central_ac','security_24_7'],
  24.7754, 46.6062, 'https://maps.google.com/?q=24.7754,46.6062',
  false, true, 8, '2026-02-08T00:00:00Z'
);


-- ─────────────────────────────────────────────────────────────────────────────
-- Seed images for properties that had external (Unsplash) URLs
-- Properties 1–5 used local test photos — upload those manually via the admin
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO property_images (property_id, image_url, alt_text_ar, alt_text_en, display_order)
VALUES

-- hittin-land-plot
(
  (SELECT id FROM properties WHERE slug = 'hittin-land-plot'),
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
  'الأرض', 'Land plot', 0
),

-- al-arid-townhouse
(
  (SELECT id FROM properties WHERE slug = 'al-arid-townhouse'),
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
  'الواجهة', 'Facade', 0
),
(
  (SELECT id FROM properties WHERE slug = 'al-arid-townhouse'),
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
  'الصالة', 'Living room', 1
),

-- al-malqa-commercial-office
(
  (SELECT id FROM properties WHERE slug = 'al-malqa-commercial-office'),
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  'المكتب', 'Office space', 0
);


-- ─────────────────────────────────────────────────────────────────────────────
-- Verify
-- ─────────────────────────────────────────────────────────────────────────────
SELECT slug, title_ar, status, featured, is_published FROM properties ORDER BY display_order;
SELECT p.slug, i.image_url FROM property_images i JOIN properties p ON p.id = i.property_id ORDER BY p.display_order, i.display_order;
