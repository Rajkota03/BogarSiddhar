import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackingCards } from "@/components/siddhars/StackingCards";
import Image from "next/image";

export const metadata = {
    title: "The 18 Siddhars | Bhogar Siddhar Archive",
    description: "Explore the lives and lineages of the 18 Siddhars, the masters of alchemy, medicine, and yoga.",
};

export default async function SiddharsPage() {
    const supabase = await createClient();

    // Fetch siddhars
    const { data: siddhars } = await supabase
        .from("siddhars")
        .select("*")
        .order("sort_order", { ascending: true });

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <header className="text-center mb-24 space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-foreground">
                        The 18 Siddhars
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        The lineage of perfected masters who transcended the limitations of the body and mind through the science of alchemy and yoga.
                    </p>
                    <div className="w-16 h-[1px] bg-primary/40 mx-auto" />
                </header>

                <div className="min-h-screen">
                    <StackingCards siddhars={siddhars || []} />

                    {(!siddhars || siddhars.length === 0) && (
                        <div className="text-center py-20 opacity-50">
                            <p className="font-serif italic text-xl">The archives are currently being updated.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="py-12 border-t border-border/30 text-center text-muted-foreground text-sm relative z-20 bg-background">
                <p>&copy; {new Date().getFullYear()} Bhogar Siddhar Archive. All rights reserved.</p>
            </footer>
        </main>
    );
}
