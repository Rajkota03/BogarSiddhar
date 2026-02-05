import { createClient } from "@/lib/supabase/server";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/actions/settings";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider"; // Reuse provider for consistent font

export default async function ReferencesPage() {
    const supabase = await createClient();
    const settings = await getSiteSettings();

    const { data: references } = await supabase
        .from("references")
        .select("*")
        .order("sort_order", { ascending: true });

    // Group by category
    const grouped = references?.reduce((acc: any, ref: any) => {
        if (!acc[ref.category]) acc[ref.category] = [];
        acc[ref.category].push(ref);
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-background font-sans selection:bg-primary/30 text-foreground pt-32">
            <SectionContainer>
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Archive
                    </Link>
                </div>

                <SectionHeader
                    title="Sources & References"
                    summary="Acknowledging the lineage of texts, traditions, and oral histories that inform this educational archive."
                />

                <div className="max-w-3xl mx-auto space-y-12">
                    {grouped && Object.entries(grouped).map(([category, items]: [string, any]) => (
                        <div key={category} className="space-y-6">
                            <h3 className="text-xl font-serif text-primary border-b border-border pb-2">{category}</h3>
                            <div className="space-y-6">
                                {items.map((item: any) => (
                                    <div key={item.id} className="pl-4 border-l-2 border-muted hover:border-accent transition-colors">
                                        <h4 className="font-medium text-foreground">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
}
