"use client";

import { createGalleryItem, updateGalleryItem } from "@/lib/actions/gallery";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";

interface GalleryFormProps {
    item?: any;
}

export function GalleryForm({ item }: GalleryFormProps) {
    const [image, setImage] = useState(item?.image_path || "");
    const isEdit = !!item;

    return (
        <form action={isEdit ? updateGalleryItem.bind(null, item.id) : createGalleryItem} className="space-y-6 max-w-2xl">
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

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                    {isEdit ? "Save Item" : "Add to Gallery"}
                </button>
            </div>
        </form>
    );
}
