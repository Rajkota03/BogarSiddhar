import { ArticleForm } from "@/components/admin/ArticleForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: article } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (!article) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Edit Article</h1>
            <ArticleForm article={article} />
        </div>
    );
}
