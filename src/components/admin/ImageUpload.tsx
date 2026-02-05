"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    bucket?: string;
}

export function ImageUpload({ value, onChange, bucket = "media" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setError(null);

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const supabase = createClient();

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            onChange(data.publicUrl);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className="space-y-4">
            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-border bg-muted">
                    <Image
                        src={value}
                        alt="Upload"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-sm">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                            ) : (
                                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            )}
                            <p className="text-sm text-muted-foreground">
                                {uploading ? "Uploading..." : "Click to upload image"}
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
