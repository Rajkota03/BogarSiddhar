import { SiddharForm } from "@/components/admin/SiddharForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditSiddharPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: siddhar } = await supabase.from("siddhars").select("*").eq("id", id).single();

    if (!siddhar) return notFound();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif">Edit Siddhar</h1>
                <p className="text-muted-foreground">Update profile for {siddhar.name}</p>
            </div>
            <SiddharForm siddhar={siddhar} />
        </div>
    );
}
