import { PlaceForm } from "@/components/admin/PlaceForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditPlacePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: place } = await supabase
        .from("sacred_places")
        .select("*")
        .eq("id", id)
        .single();

    if (!place) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Edit Sacred Place</h1>
            <PlaceForm place={place} />
        </div>
    );
}
