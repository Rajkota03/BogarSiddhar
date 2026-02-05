"use client";

import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/actions/gallery";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";
import { Trash } from "lucide-react";

interface GalleryFormProps {
    item?: any;
}

export function GalleryForm({ item }: GalleryFormProps) {
    const [image, setImage] = useState(item?.image_path || "");
    const isEdit = !!item;

    return (
        <div className="max-w-2xl space-y-6">
            <form action={isEdit ? updateGalleryItem.bind(null, item.id) : createGalleryItem} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Image</label>
                    <ImageUpload value={image} onChange={setImage} />
                    <input type="hidden" name="image_path" value={image} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Category / Section</label>
                    <select
                        name="category"
                        defaultValue={item?.category || "gallery"}
                        className="w-full bg-background border border-border p-2 rounded-md"
                    >
                        <option value="gallery">Main Gallery</option>
                        <option value="hero">Hero Background (Not active yet)</option>
                        <option value="places">Sacred Places</option>
                        <option value="about">About Section</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Select where this image belongs.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Caption</label>
                    <input
                        name="caption"
                        defaultValue={item?.caption}
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            name="location"
                            defaultValue={item?.location}
                            className="w-full bg-background border border-border p-2 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sort Order</label>
                        <input
                            name="sort_order"
                            type="number"
                            defaultValue={item?.sort_order || 0}
                            className="w-full bg-background border border-border p-2 rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Tags (comma separated)</label>
                    <input
                        name="tags"
                        defaultValue={item?.tags?.join(", ")}
                        placeholder="temple, ancient, manuscript"
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <div>
                        {/* Placeholder for left side actions like cancel */}
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                    >
                        {isEdit ? "Save Item" : "Add to Gallery"}
                    </button>
                </div>
            </form>

            {isEdit && (
                <div className="pt-6 border-t border-border mt-6">
                    <h3 className="text-sm font-medium text-destructive mb-2">Danger Zone</h3>
                    <form action={deleteGalleryItem.bind(null, item.id)}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-md transition-colors text-sm"
                        >
                            <Trash className="w-4 h-4" />
                            Delete this item
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
