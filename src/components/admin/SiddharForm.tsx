"use client";

import { createSiddhar, updateSiddhar } from "@/lib/actions/siddhars";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SiddharFormProps {
    siddhar?: any;
}

export function SiddharForm({ siddhar }: SiddharFormProps) {
    const [image, setImage] = useState(siddhar?.image_path || "");
    const [isPending, setIsPending] = useState(false);

    const isEdit = !!siddhar;

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        try {
            if (isEdit) {
                await updateSiddhar(siddhar.id, formData);
            } else {
                await createSiddhar(formData);
            }
        } catch (error) {
            console.error(error);
            setIsPending(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            required
                            defaultValue={siddhar?.name}
                            className="w-full bg-background border border-border p-2 rounded-md"
                            placeholder="e.g. Agastya"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title / Epithet</label>
                        <input
                            name="title"
                            defaultValue={siddhar?.title}
                            className="w-full bg-background border border-border p-2 rounded-md"
                            placeholder="The Father of Tamil Medicine"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Expertise (comma separated)</label>
                        <input
                            name="expertise"
                            defaultValue={siddhar?.expertise?.join(", ")}
                            className="w-full bg-background border border-border p-2 rounded-md"
                            placeholder="Medicine, Yoga, Astronomy"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sort Order</label>
                        <input
                            name="sort_order"
                            type="number"
                            defaultValue={siddhar?.sort_order || 0}
                            className="w-full bg-background border border-border p-2 rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Portrait Image</label>
                    <ImageUpload value={image} onChange={setImage} />
                    <input type="hidden" name="image_path" value={image} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Biography</label>
                <textarea
                    name="bio"
                    rows={10}
                    defaultValue={siddhar?.bio}
                    className="w-full bg-background border border-border p-3 rounded-md min-h-[200px]"
                    placeholder="Enter the biography details here..."
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary text-background px-8 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isEdit ? "Save Changes" : "Create Siddhar"}
                </button>
            </div>
        </form>
    );
}
