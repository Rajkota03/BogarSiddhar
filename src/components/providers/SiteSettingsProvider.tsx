"use client";

import { useServerInsertedHTML } from "next/navigation";

export function SiteSettingsProvider({ settings, children }: { settings: any, children: React.ReactNode }) {

    useServerInsertedHTML(() => {
        if (!settings) return null;
        return (
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
          --font-base-size: ${settings.base_size || 16}px;
          --font-line-height: ${settings.line_height || 1.6};
          /* We can map font names to CSS vars if we load them, 
             for now we assume they map to the loaded Google Fonts or system fonts */
        }
        body {
            font-size: var(--font-base-size);
            line-height: var(--font-line-height);
        }
      `}} />
        );
    });

    return <>{children}</>;
}
