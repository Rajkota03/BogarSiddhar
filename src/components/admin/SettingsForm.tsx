"use client";

import { updateSiteSettings } from "@/lib/actions/settings";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState, useTransition } from "react";
import Link from "next/link";
import { MoveVertical } from "lucide-react";

interface SettingsFormProps {
    settings: any;
}

function SubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50"
        >
            {isPending ? "Saving..." : "Save Configuration"}
        </button>
    );
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [heroImage, setHeroImage] = useState(settings?.home_hero_bg_image || "");
    const [isPending, startTransition] = useTransition();

    if (!settings) return <div>Loading...</div>;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            try {
                await updateSiteSettings(formData);
                alert("Settings saved successfully.");
            } catch (e) {
                console.error(e);
                alert("Failed to save settings.");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-12">

            {/* NAVIGATION SHORTCUT */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-primary">
                        <MoveVertical className="w-5 h-5" /> Site Navigation
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage the main menu links (Home, About, etc.)</p>
                </div>
                <Link href="/admin/navigation" className="bg-background border border-border px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                    Manage Menu &rarr;
                </Link>
            </div>

            {/* 1. HERO CONTENT */}
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">1.</span> Home Hero Content
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Main Title</label>
                        <input name="home_hero_title" defaultValue={settings.home_hero_title} className="w-full bg-background border border-border p-2 rounded" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <input name="home_hero_subtitle" defaultValue={settings.home_hero_subtitle} className="w-full bg-background border border-border p-2 rounded" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Identity/Intro Statement (Appears below title)</label>
                        <textarea name="home_hero_identity_text" defaultValue={settings.home_hero_identity_text} rows={2} className="w-full bg-background border border-border p-2 rounded" />
                    </div>
                    <div className="space-y-2 pt-4">
                        <label className="text-sm font-medium">Hero Background Image</label>
                        <ImageUpload value={heroImage} onChange={setHeroImage} bucket="media" />
                        <input type="hidden" name="home_hero_bg_image" value={heroImage} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CTA Button Text</label>
                            <input name="home_hero_cta_text" defaultValue={settings.home_hero_cta_text} className="w-full bg-background border border-border p-2 rounded" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CTA Link</label>
                            <input name="home_hero_cta_link" defaultValue={settings.home_hero_cta_link} className="w-full bg-background border border-border p-2 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. FOOTER & LEGAL */}
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                    <span className="text-primary">2.</span> Footer & Legal
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">About Text (Footer)</label>
                        <textarea name="footer_text" defaultValue={settings.footer_text} rows={3} className="w-full bg-background border border-border p-2 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contact Email</label>
                            <input name="contact_email" defaultValue={settings.contact_email} className="w-full bg-background border border-border p-2 rounded" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Credits / Copyright</label>
                            <input name="credits" defaultValue={settings.credits} className="w-full bg-background border border-border p-2 rounded" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Updated Text</label>
                            <input name="last_updated_text" defaultValue={settings.last_updated_text} className="w-full bg-background border border-border p-2 rounded" placeholder="e.g. October 2025" />
                        </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-border">
                        <label className="text-sm font-medium">Legal Disclaimer</label>
                        <textarea
                            name="legal_disclaimer"
                            defaultValue={settings.legal_disclaimer}
                            rows={4}
                            className="w-full bg-background border border-border p-2 rounded text-sm text-muted-foreground"
                        />
                        <p className="text-xs text-muted-foreground">This text will appear in the footer to ensure credibility and transparency.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <SubmitButton isPending={isPending} />
            </div>
        </form>
    );
}
