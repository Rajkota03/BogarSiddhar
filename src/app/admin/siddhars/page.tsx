import { createClient } from "@/lib/supabase/server";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteSiddhar } from "@/lib/actions/siddhars";

export default async function SiddharsPage() {
    const supabase = await createClient();
    const { data: siddhars } = await supabase.from("siddhars").select("*").order("sort_order", { ascending: true });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif">Siddhars</h1>
                    <p className="text-muted-foreground">Manage the 18 Siddhars and their profiles.</p>
                </div>
                <Link
                    href="/admin/siddhars/new"
                    className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Siddhar</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {siddhars?.map((siddhar) => (
                    <div
                        key={siddhar.id}
                        className="flex items-center gap-4 bg-muted/30 border border-border p-4 rounded-lg group hover:border-primary/50 transition-colors"
                    >
                        <div className="relative w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                            {siddhar.image_path ? (
                                <Image
                                    src={siddhar.image_path}
                                    alt={siddhar.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground bg-neutral-800">No Img</div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-medium truncate">{siddhar.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{siddhar.title || "No title"}</p>
                        </div>

                        <div className="text-sm text-muted-foreground px-4">
                            Order: {siddhar.sort_order}
                        </div>

                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/admin/siddhars/${siddhar.id}`}
                                className="p-2 hover:bg-background hover:text-primary rounded-md border border-transparent hover:border-border transition-all"
                            >
                                <Edit className="w-4 h-4" />
                            </Link>
                            <form action={deleteSiddhar.bind(null, siddhar.id)}>
                                <button
                                    type="submit"
                                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-md border border-transparent hover:border-red-500/20 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {(!siddhars || siddhars.length === 0) && (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg">
                        <p className="text-muted-foreground">No Siddhars found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
