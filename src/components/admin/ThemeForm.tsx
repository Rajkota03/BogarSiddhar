"use client";

import { updateSiteSettings } from "@/lib/actions/settings";
import { useFormStatus } from "react-dom";
import { useState, useTransition } from "react";
import { toast } from "sonner"; // Assuming sonner or just native alert for now

function SubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <button type="submit" disabled={isPending} className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50">
            {isPending ? "Saving Theme..." : "Save Theme & Styles"}
        </button>
    );
}

export function ThemeForm({ settings }: { settings: any }) {
    const theme = settings.theme_config || {};
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            try {
                await updateSiteSettings(formData);
                // toast.success("Theme updated"); 
                alert("Theme updated successfully!");
            } catch (e) {
                console.error(e);
                alert("Failed to update theme");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-12">

            {/* 1. Typography */}
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">A.</span> Global Typography
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Heading Font Family</label>
                        <select name="heading_font" defaultValue={settings.heading_font || "serif"} className="w-full p-2 border border-border rounded">
                            <option value="serif">Serif (Cinzel / Meritweather)</option>
                            <option value="sans">Sans (Inter / Roboto)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Body Font Family</label>
                        <select name="body_font" defaultValue={settings.body_font || "sans"} className="w-full p-2 border border-border rounded">
                            <option value="sans">Sans (Inter / Roboto)</option>
                            <option value="serif">Serif (Lora / Libre)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Base Font Size (px)</label>
                        <input type="number" name="base_size" defaultValue={settings.base_size || 16} className="w-full p-2 border border-border rounded" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Line Height (ems)</label>
                        <input type="number" step="0.1" name="line_height" defaultValue={settings.line_height || 1.6} className="w-full p-2 border border-border rounded" />
                    </div>
                </div>
            </div>

            {/* 2. Colors */}
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">B.</span> Color Palette
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Primary / Accent Color</label>
                        <div className="flex gap-2">
                            <input type="color" name="theme_primary" defaultValue={theme.primary_color || "#d4a373"} className="h-10 w-10 p-0 border-0 rounded" />
                            <input type="text" name="theme_primary_text" defaultValue={theme.primary_color || "#d4a373"} className="flex-1 p-2 border border-border rounded font-mono text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Body Text Color</label>
                        <div className="flex gap-2">
                            <input type="color" name="theme_text" defaultValue={theme.text_color || "#1a1a1a"} className="h-10 w-10 p-0 border-0 rounded" />
                            <input type="text" name="theme_text_text" defaultValue={theme.text_color || "#1a1a1a"} className="flex-1 p-2 border border-border rounded font-mono text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Background Color</label>
                        <div className="flex gap-2">
                            <input type="color" name="theme_bg" defaultValue={theme.bg_color || "#ffffff"} className="h-10 w-10 p-0 border-0 rounded" />
                            <input type="text" name="theme_bg_text" defaultValue={theme.bg_color || "#ffffff"} className="flex-1 p-2 border border-border rounded font-mono text-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Spacing & Radius */}
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">C.</span> Layout & Shape
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Border Radius (px)</label>
                        <input type="text" name="theme_radius" defaultValue={theme.border_radius || "4px"} className="w-full p-2 border border-border rounded" placeholder="e.g. 4px, 8px, 0px" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Section Spacing (Vertical padding)</label>
                        <select className="w-full p-2 border border-border rounded" disabled>
                            <option>Comfortable (Default)</option>
                            <option>Compact</option>
                            <option>Spacious</option>
                        </select>
                        <p className="text-xs text-muted-foreground">Preset capability coming in Phase 2.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <SubmitButton isPending={isPending} />
            </div>
        </form>
    );
}
