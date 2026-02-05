import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";

export default async function GalleryPage() {
    const supabase = await createClient();
    const { data: items } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">Gallery</h1>
                <Link
                    href="/admin/gallery/new"
                    className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" />
                    Add Item
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items?.map((item) => (
                    <div key={item.id} className="group bg-background border border-border rounded-lg overflow-hidden relative">
                        <div className="aspect-square relative">
                            <Image src={item.image_path} alt={item.caption || "Gallery Item"} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                            <div className="font-medium truncate">{item.caption || "Untitled"}</div>
                            <div className="text-xs text-muted-foreground mt-1">{item.location}</div>
                        </div>

                        <Link
                            href={`/admin/gallery/${item.id}`}
                            className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                            <span className="bg-background px-3 py-1 rounded text-sm font-medium shadow-sm">Edit</span>
                        </Link>
                    </div>
                ))}
                {items?.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        No items yet. Upload your first image.
                    </div>
                )}
            </div>
        </div>
    );
}
