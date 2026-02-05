import { createClient } from "@/lib/supabase/server";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Navbar } from "@/components/layout/Navbar";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata = {
    title: "Gallery | Bhogar Siddhar Archive",
    description: "A visual journey through the sacred sites, manuscripts, and artistic representations of Bhogar Siddhar's legacy.",
};

export default async function GalleryPage() {
    const supabase = await createClient();

    const { data: items } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <header className="text-center mb-20 space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-foreground">
                        Visual Archive
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        Explore the sacred iconography, ancient temples, and manuscript illustrations associated with the lineage of Bhogar Siddhar.
                    </p>
                    <div className="w-16 h-[1px] bg-primary/40 mx-auto" />
                </header>

                <GalleryGrid items={items || []} />
            </div>

            <footer className="py-12 border-t border-border/30 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} Bhogar Siddhar Archive. All rights reserved.</p>
            </footer>
        </main>
    );
}
