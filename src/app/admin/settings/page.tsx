import { getSiteSettings } from "@/lib/actions/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold">Global Site Configuration</h1>
            <p className="text-muted-foreground text-sm">Control the visual language and core behavior of the digital shrine.</p>
            <SettingsForm settings={settings || {}} />
        </div>
    );
}
