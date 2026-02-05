import { NavForm } from "@/components/admin/NavForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditNavigationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: item } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("id", id)
        .single();

    if (!item) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Edit Navigation Link</h1>
            <NavForm item={item} />
        </div>
    );
}
