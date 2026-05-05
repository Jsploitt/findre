-- ─────────────────────────────────────────────────────────────────────────────
-- FindRE — Initial Schema Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Tables ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_roles (
  id          uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid  UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        text  NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS properties (
  id                    uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                  text    UNIQUE NOT NULL,
  title_ar              text    NOT NULL,
  title_en              text    NOT NULL,
  description_ar        text    DEFAULT '',
  description_en        text    DEFAULT '',
  short_description_ar  text    DEFAULT '',
  short_description_en  text    DEFAULT '',
  type                  text    NOT NULL CHECK (type IN ('villa','apartment','land','commercial','townhouse')),
  status                text    NOT NULL DEFAULT 'available' CHECK (status IN ('available','booked','reserved')),
  district_ar           text    DEFAULT '',
  district_en           text    DEFAULT '',
  city_ar               text    DEFAULT 'الرياض',
  city_en               text    DEFAULT 'Riyadh',
  google_maps_url       text    DEFAULT '',
  price_amount          numeric,
  price_currency        text    DEFAULT 'SAR',
  price_period          text    CHECK (price_period IN ('month','year') OR price_period IS NULL),
  area                  numeric,
  bedrooms              integer,
  bathrooms             integer,
  parking               integer,
  year_built            integer,
  furnished             boolean DEFAULT false,
  amenities             text[]  DEFAULT '{}',
  latitude              numeric,
  longitude             numeric,
  featured              boolean DEFAULT false,
  is_published          boolean DEFAULT true,
  permit_number         text    DEFAULT '',
  display_order         integer DEFAULT 0,
  created_by            uuid    REFERENCES auth.users(id),
  updated_by            uuid    REFERENCES auth.users(id),
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS property_images (
  id            uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id   uuid  NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url     text  NOT NULL,
  alt_text_ar   text  DEFAULT '',
  alt_text_en   text  DEFAULT '',
  display_order integer DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS properties_slug_idx        ON properties(slug);
CREATE INDEX IF NOT EXISTS properties_status_idx      ON properties(status);
CREATE INDEX IF NOT EXISTS properties_featured_idx    ON properties(featured);
CREATE INDEX IF NOT EXISTS properties_published_idx   ON properties(is_published);
CREATE INDEX IF NOT EXISTS property_images_prop_idx   ON property_images(property_id);

-- ── Role helper (SECURITY DEFINER bypasses RLS — prevents infinite recursion) ─

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- ── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE properties      ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles      ENABLE ROW LEVEL SECURITY;

-- properties: anon can read published; auth users with a role can write
CREATE POLICY "anon read published properties"
  ON properties FOR SELECT
  USING (is_published = true);

CREATE POLICY "auth read all properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (get_my_role() IS NOT NULL);

CREATE POLICY "auth update properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (get_my_role() IS NOT NULL);

CREATE POLICY "admin delete properties"
  ON properties FOR DELETE
  TO authenticated
  USING (get_my_role() = 'admin');

-- property_images: public read; auth write
CREATE POLICY "public read images"
  ON property_images FOR SELECT
  USING (true);

CREATE POLICY "auth insert images"
  ON property_images FOR INSERT
  TO authenticated
  WITH CHECK (get_my_role() IS NOT NULL);

CREATE POLICY "auth delete images"
  ON property_images FOR DELETE
  TO authenticated
  USING (get_my_role() IS NOT NULL);

-- user_roles: each user sees their own row; admins can manage all
CREATE POLICY "own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "admin manage roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');


-- ── Storage Bucket Policies ───────────────────────────────────────────────────
-- FIRST: create the bucket in Supabase Dashboard → Storage → New bucket
--   Name: property-images
--   Public: YES  (allows unauthenticated read for frontend display)
-- THEN run these policies:

CREATE POLICY "public view property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "auth upload property images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'property-images'
    AND get_my_role() IS NOT NULL
  );

CREATE POLICY "auth delete property images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'property-images'
    AND get_my_role() IS NOT NULL
  );


-- ── First Admin User Setup ────────────────────────────────────────────────────
-- After creating your first user via Supabase Auth (Dashboard → Auth → Users),
-- run this to grant admin role (replace the email):
--
-- INSERT INTO user_roles (user_id, role)
-- SELECT id, 'admin'
-- FROM auth.users
-- WHERE email = 'your-email@example.com';
