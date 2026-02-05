import { getSiteSettings } from "@/lib/actions/settings";
import { ThemeForm } from "@/components/admin/ThemeForm";

export default async function ThemePage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Theme & Styles</h1>
            <p className="text-muted-foreground text-sm">Control the visual language (typography, colors, spacing) of the entire website.</p>
            <ThemeForm settings={settings || {}} />
        </div>
    );
}
