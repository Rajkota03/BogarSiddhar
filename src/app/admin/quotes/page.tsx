import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function QuotesPage() {
    const supabase = await createClient();
    const { data: quotes } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">Quotes</h1>
                <Link href="/admin/quotes/new" className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> New Quote
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotes?.map((quote) => (
                    <div key={quote.id} className="bg-background border border-border p-6 rounded-lg shadow-xs hover:border-accent transition-colors relative group">
                        <blockquote className="font-serif italic text-lg mb-4">"{quote.content}"</blockquote>
                        <div className="text-sm text-muted-foreground">— {quote.source || "Unknown"}</div>
                        <Link href={`/admin/quotes/${quote.id}`} className="absolute top-4 right-4 text-xs bg-muted px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
