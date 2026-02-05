import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, MoveVertical } from "lucide-react";
import { deleteNavItem } from "@/lib/actions/navigation";

export default async function NavigationPage() {
    const supabase = await createClient();
    const { data: items } = await supabase
        .from("navigation_items")
        .select("*")
        .order("sort_order", { ascending: true });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">Navigation Menu</h1>
                <Link
                    href="/admin/navigation/new"
                    className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" />
                    Add Link
                </Link>
            </div>

            <div className="bg-background border border-border rounded-lg divide-y divide-border">
                {items?.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 text-muted-foreground"><MoveVertical className="w-4 h-4" /></div>
                            <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-muted-foreground">{item.path}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`text-xs px-2 py-1 rounded ${item.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {item.is_active ? 'Active' : 'Hidden'}
                            </span>
                            <Link href={`/admin/navigation/${item.id}`} className="text-sm font-medium hover:underline">Edit</Link>
                            <form action={deleteNavItem.bind(null, item.id)}>
                                <button className="text-sm text-red-500 hover:underline">Delete</button>
                            </form>
                        </div>
                    </div>
                ))}
                {items?.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No links yet.
                    </div>
                )}
            </div>
        </div>
    );
}
