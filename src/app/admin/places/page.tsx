import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, MapPin } from "lucide-react";
import Image from "next/image";

export default async function PlacesPage() {
    const supabase = await createClient();
    const { data: places } = await supabase.from("sacred_places").select("*").order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">Sacred Places</h1>
                <Link href="/admin/places/new" className="bg-primary text-background px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> New Place
                </Link>
            </div>
            <div className="space-y-4">
                {places?.map((place) => (
                    <div key={place.id} className="flex gap-4 p-4 bg-background border border-border rounded-lg items-center relative group">
                        <div className="w-16 h-16 bg-muted rounded overflow-hidden relative shrink-0">
                            {place.image_path ? (
                                <Image src={place.image_path} alt={place.name} fill className="object-cover" />
                            ) : (
                                <MapPin className="w-8 h-8 m-auto text-muted-foreground" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold">{place.name}</h3>
                            <p className="text-sm text-muted-foreground">{place.latitude}, {place.longitude}</p>
                        </div>
                        <Link href={`/admin/places/${place.id}`} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm bg-muted px-3 py-1 rounded hover:bg-muted/80">Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
