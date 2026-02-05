-- 1. Create Site Settings Table
DROP TABLE IF EXISTS public.site_settings CASCADE;
CREATE TABLE public.site_settings (
    id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Single row enforcement
    site_title text,
    site_description text,
    contact_email text,
    
    -- Home Hero
    home_hero_title text,
    home_hero_subtitle text,
    home_hero_identity_text text,
    home_hero_bg_image text,
    home_hero_cta_text text,
    home_hero_cta_link text,
    hero_height text,
    hero_opacity integer DEFAULT 50,
    hero_cta_enabled boolean DEFAULT true,
    hero_padding text,

    -- Footer & Legal
    footer_text text,
    credits text,
    last_updated_text text,
    legal_disclaimer text,

    -- Theme
    heading_font text,
    body_font text,
    base_size integer DEFAULT 16,
    line_height numeric DEFAULT 1.5,
    theme_config jsonb,

    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Home Sections Table
DROP TABLE IF EXISTS public.home_sections CASCADE;
CREATE TABLE public.home_sections (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key text UNIQUE NOT NULL,
    title text,
    summary text,
    context_label text, -- "Legacy", "Alchemist", etc.
    content jsonb,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;

-- Policies (Public Read, Admin Write)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Public read settings') THEN
        CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Admins manage settings') THEN
        CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL USING (public.has_role('admin')); 
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'home_sections' AND policyname = 'Public read home_sections') THEN
        CREATE POLICY "Public read home_sections" ON public.home_sections FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'home_sections' AND policyname = 'Admins manage home_sections') THEN
        CREATE POLICY "Admins manage home_sections" ON public.home_sections FOR ALL USING (public.has_role('admin'));
    END IF;
END $$;


-- 3. Populate Data
-- Upsert settings to avoid constraint violation if exists
INSERT INTO public.site_settings (
  id,
  site_title,
  site_description,
  contact_email,
  home_hero_title,
  home_hero_subtitle,
  home_hero_identity_text,
  home_hero_cta_text,
  home_hero_cta_link,
  hero_height,
  hero_opacity
) VALUES (
  1,
  'Bhogar Siddhar Archive',
  'The official digital archive dedicated to the life and teachings of Bhogar Siddhar.',
  'contact@bhogarsiddhar.org',
  'Bhogar Siddhar',
  'The Alchemist Sage of Palani',
  'A digital archive dedicated to the life, teachings, and legacy of Bhogar Siddhar.',
  'Explore The Lineage',
  '/siddhars',
  '100vh',
  50
)
ON CONFLICT (id) DO UPDATE SET
  home_hero_title = EXCLUDED.home_hero_title,
  home_hero_subtitle = EXCLUDED.home_hero_subtitle,
  home_hero_identity_text = EXCLUDED.home_hero_identity_text;


-- Insert Home Sections
-- About Section
INSERT INTO public.home_sections (section_key, title, summary, context_label, content, sort_order)
VALUES (
  'about',
  'The Master of Alchemy',
  'One of the 18 celebrated Siddhars, Bhogar is renowned for his mastery over atomic transmutation and the creation of the Navapashanam.',
  'LEGACY',
  '{
    "images": [
      {
        "url": "/images/siddhars/bhogar.png",
        "alt": "Bhogar Siddhar in Meditation",
        "caption": "Traditional depiction of Bhogar Siddhar with the dhanda (staff).",
        "source": "Palani Temple Archives"
      }
    ],
    "body": "Bhogar Siddhar, a disciple of the legendary Kalangi Nathar, is a towering figure in the internal alchemy tradition of the Tamil Siddhars.\\n\\nHis greatest contribution to humanity is the creation of the Navapashanam idol of Lord Murugan at Palani. Conceived as a solid medicine made from nine poisonous substances (minerals and herbs), this idol was designed to cure terminal illnesses and prolong life for spiritual pursuit. Bhogar''s life is a testament to the Siddha goal: a deathless body (Kaya) capable of holding infinite consciousness."
  }',
  1
);

-- Teachings Section
INSERT INTO public.home_sections (section_key, title, summary, context_label, content, sort_order)
VALUES (
  'teachings',
  'The Seven Disciplines',
  'The path of the Siddhar is not merely intellectual; it is a rigorous transformation of the body, mind, and soul.',
  'DISCIPLINE',
  '{
    "cards": [
      {
        "title": "Kaya Kalpa",
        "description": "The science of bodily rejuvenation. Using alchemical preparations to arrest aging and reinforce the physical vessel for intense meditative states."
      },
      {
        "title": "Rasa Vadham",
        "description": "Metallurgical alchemy. The transmutation of base metals into gold, symbolizing the refinement of the human consciousness into the divine."
      },
      {
        "title": "Pranayama",
        "description": "Mastery of the vital life force (Vasi Yoga). Controlling the breath to unlock the dormant Kundalini energy."
      },
      {
        "title": "Soruba Samadhi",
        "description": "The ultimate state of physical immortality where the body glows with golden light and can dematerialize at will."
      }
    ]
  }',
  2
);

-- Sacred Places Section
INSERT INTO public.home_sections (section_key, title, summary, context_label, content, sort_order)
VALUES (
  'places',
  'Sacred Geography',
  'Specific energy centers (kshetras) are pivotal for spiritual acceleration. Bhogar identified and consecrated several such loci.',
  'KSHETRA',
  '{
    "places": [
      {
        "name": "Palani Malai",
        "description": "The primary seat of Bhogar''s work. It is here he installed the Navapashanam idol and entered Jeeva Samadhi.",
        "image": "/images/places/palani.jpg",
        "coordinates": "10.45° N, 77.52° E"
      },
      {
        "name": "Kathirguama",
        "description": "A sacred shrine in Sri Lanka closely associated with Bhogar''s guru, Kalangi Nathar, and Lord Murugan.",
        "image": "/images/places/kathirguama.jpg",
        "coordinates": "6.41° N, 81.33° E"
      },
      {
        "name": "Poombarai",
        "description": "Home to the Kuzhanthai Velappar temple, where Bhogar created another idol of Murugan.",
        "image": "/images/places/poombarai.jpg",
        "coordinates": "10.27° N, 77.41° E"
      }
    ]
  }',
  3
);
