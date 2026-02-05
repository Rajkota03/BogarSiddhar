"use client";

import { createPlace, updatePlace } from "@/lib/actions/places";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";

interface PlaceFormProps {
    place?: any;
}

export function PlaceForm({ place }: PlaceFormProps) {
    const [image, setImage] = useState(place?.image_path || "");
    const isEdit = !!place;

    return (
        <form action={isEdit ? updatePlace.bind(null, place.id) : createPlace} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <label className="text-sm font-medium">Name of Place</label>
                <input
                    name="name"
                    defaultValue={place?.name}
                    required
                    className="w-full bg-background border border-border p-2 rounded-md"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    defaultValue={place?.description}
                    className="w-full bg-background border border-border p-2 rounded-md min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <ImageUpload value={image} onChange={setImage} />
                <input type="hidden" name="image_path" value={image} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Latitude</label>
                    <input
                        name="latitude"
                        type="number"
                        step="any"
                        defaultValue={place?.latitude || ""}
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Longitude</label>
                    <input
                        name="longitude"
                        type="number"
                        step="any"
                        defaultValue={place?.longitude || ""}
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                    {isEdit ? "Save Place" : "Add Place"}
                </button>
            </div>
        </form>
    );
}
