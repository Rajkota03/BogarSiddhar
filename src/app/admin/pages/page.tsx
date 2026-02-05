import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Copy, Trash2, Edit2, Search, CornerDownRight } from "lucide-react";
import { format } from "date-fns";
import { DuplicateButton, DeleteButton } from "@/components/admin/PageListActions";

export default async function PagesPage() {
    const supabase = await createClient();
    const { data: pages } = await supabase
        .from("pages")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Pages</h1>
                    <p className="text-muted-foreground mt-1">Manage all pages in the digital archive.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search pages..."
                            className="pl-9 h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Link
                        href="/admin/pages/new"
                        className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 font-medium h-10"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">New Page</span>
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="bg-background rounded-xl border border-border overflow-hidden shadow-xs">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-medium">
                        <tr>
                            <th className="px-6 py-4">Title / Url</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {pages?.map((page) => (
                            <div key={page.id} style={{ display: 'contents' }}>
                                {/* Main Page Row */}
                                <tr className="group hover:bg-muted/5 transition-colors bg-muted/5">
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/pages/${page.id}`} className="block">
                                            <div className="font-bold text-foreground group-hover:text-primary transition-colors text-base flex items-center gap-2">
                                                {page.title}
                                            </div>
                                            <div className="text-muted-foreground text-xs font-mono mt-0.5">/{page.slug}</div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
                                        ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {format(new Date(page.updated_at), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/pages/${page.id}`}
                                                className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-colors"
                                                title="Edit Page Structure"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <DuplicateButton id={page.id} />
                                            <DeleteButton id={page.id} />
                                        </div>
                                    </td>
                                </tr>

                                {/* Nested Sections Rows */}
                                {page.content_blocks && Array.isArray(page.content_blocks) && page.content_blocks.map((block: any) => (
                                    <tr key={block.id} className="hover:bg-muted/5 border-b-0">
                                        <td className="px-6 py-2 pl-12 relative">
                                            {/* Connector Line */}
                                            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/40"></div>
                                            <div className="absolute left-6 top-1/2 w-4 h-px bg-border/40"></div>

                                            <Link href={`/admin/pages/${page.id}?blockId=${block.id}`} className="flex items-center gap-2 group/block">
                                                <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center text-muted-foreground group-hover/block:border-primary/50 group-hover/block:text-primary transition-colors">
                                                    <CornerDownRight className="w-3 h-3" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-foreground/80 group-hover/block:text-primary transition-colors">
                                                        {block.content.title || block.content.heading || block.type}
                                                    </div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{block.type}</div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td colSpan={2} className="px-6 py-2 text-xs text-muted-foreground/50 italic">
                                            Content Section
                                        </td>
                                        <td className="px-6 py-2 text-right">
                                            <Link
                                                href={`/admin/pages/${page.id}?blockId=${block.id}`}
                                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline px-3 py-1 bg-primary/5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Edit <Edit2 className="w-3 h-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </div>
                        ))}
                        {pages?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="mb-2">No pages found</div>
                                    <Link href="/admin/pages/new" className="text-primary hover:underline font-medium">Create your first page</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
