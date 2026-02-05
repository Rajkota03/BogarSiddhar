import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/actions/settings";
import { createClient } from "@/lib/supabase/server";
import { PageRenderer } from "@/components/blocks/PageRenderer";
import { Navbar } from "@/components/layout/Navbar";

export default async function Home() {
  const settings = await getSiteSettings();
  const supabase = await createClient();

  // Fetch the "Home" page content from CMS
  const { data: page } = await supabase
    .from("pages")
    .select("content_blocks")
    .eq("slug", "home")
    .single();

  const blocks = page?.content_blocks || [];

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/30 text-foreground">
      {/* Navbar is Global */}

      {/* If CMS has content, render it. Otherwise fallback to empty? */}
      {blocks.length > 0 ? (
        <PageRenderer blocks={blocks} />
      ) : (
        <div className="py-20 text-center">
          <h1 className="text-4xl font-serif">Welcome to Bhogar Siddhar</h1>
          <p className="text-muted-foreground mt-4">Please configure the Home page in the Admin Panel.</p>
        </div>
      )}

      <Footer settings={settings} />
    </main>
  );
}
