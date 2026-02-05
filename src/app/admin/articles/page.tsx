import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export default async function ArticlesPage() {
    const supabase = await createClient();
    const { data: articles } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">Articles</h1>
                <Link
                    href="/admin/articles/new"
                    className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" />
                    New Article
                </Link>
            </div>

            <div className="bg-background rounded-md border border-border">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Created</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles?.map((article) => (
                            <tr key={article.id} className="border-b border-border hover:bg-muted/5">
                                <td className="px-6 py-4 font-medium">{article.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-xs text-xs ${article.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {format(new Date(article.created_at), "MMM d, yyyy")}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/articles/${article.id}`} className="text-primary hover:underline">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {articles?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                    No articles found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
