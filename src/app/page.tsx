import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/actions/settings";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { getHomeSections } from "@/lib/actions/home-sections";

// Sections
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TeachingsSection } from "@/components/home/TeachingsSection";
import { SacredPlacesSection } from "@/components/home/SacredPlacesSection";
import { GallerySection } from "@/components/home/GallerySection";

export default async function Home() {
  const settings = await getSiteSettings();
  const supabase = await createClient();

  // Fetch configured sections
  const sections = await getHomeSections();

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/30 text-foreground">
      {/* Hero */}
      <HeroSection settings={settings} />

      {/* About */}
      {sections.about && <AboutSection data={sections.about} />}

      {/* Teachings */}
      {sections.teachings && <TeachingsSection data={sections.teachings} />}

      {/* Sacred Places */}
      {sections.places && <SacredPlacesSection data={sections.places} />}

      {/* Footer */}
      <Footer settings={settings} />
    </main>
  );
}
