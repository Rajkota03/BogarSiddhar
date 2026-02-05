import { createClient } from "@/lib/supabase/server";
import { Copy, Trash2 } from "lucide-react";

export default async function MediaLibraryPage() {
    const supabase = await createClient();

    // List files from 'media' bucket
    const { data: files, error } = await supabase
        .storage
        .from('media')
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        return <div className="p-8 text-red-500">Error loading media: {error.message}</div>;
    }

    const { data: { publicUrl: baseUrl } } = supabase.storage.from('media').getPublicUrl('');
    // publicUrl returns base like .../public/media. WE need to append filenames.

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Media Library</h1>
            <p className="text-muted-foreground text-sm">Central repository for all uploaded archival assets.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files?.map((file) => {
                    if (file.name === '.emptyFolderPlaceholder') return null;
                    const url = `${baseUrl}/${file.name}`;
                    return (
                        <div key={file.id} className="group relative aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                            {/* Simple image preview */}
                            <img src={url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                <p className="text-xs text-white truncate w-full text-center px-2">{file.name}</p>
                                <button className="text-xs bg-white text-black px-2 py-1 rounded flex items-center gap-1 hover:bg-white/90">
                                    <Copy size={12} /> Copy URL
                                </button>
                                {/* Delete would require a server action */}
                            </div>
                        </div>
                    );
                })}
                {files?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
                        No media files found. Upload images in Page Editor to see them here.
                    </div>
                )}
            </div>

            <div className="p-4 bg-yellow-500/10 text-yellow-500 text-xs rounded border border-yellow-500/20">
                Note: Currently the Media Library is Read-Only. Direct uploads happen inside the Page Editor. Full management coming soon.
            </div>
        </div>
    );
}
