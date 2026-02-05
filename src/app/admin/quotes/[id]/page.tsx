import { QuoteForm } from "@/components/admin/QuoteForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: quote } = await supabase
        .from("quotes")
        .select("*")
        .eq("id", id)
        .single();

    if (!quote) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Edit Quote</h1>
            <QuoteForm quote={quote} />
        </div>
    );
}
