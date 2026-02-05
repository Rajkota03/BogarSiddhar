"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchivalImage } from "@/components/ui/ArchivalImage";

export function SacredPlacesSection({ data }: { data: any }) {
    if (!data) return null;
    // Support 'places' array from new seed
    const places = data.content?.places || [];

    return (
        <SectionContainer id="places">
            <SectionHeader
                title={data.title}
                summary={data.summary}
                label={data.context_label}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {places.map((place: any, idx: number) => (
                    <ScrollReveal key={idx} delay={idx * 0.1} variant="slideUp">
                        <div className="space-y-4 group">
                            <div className="aspect-[4/3] relative overflow-hidden rounded-sm bg-muted">
                                {place.image ? (
                                    <ArchivalImage
                                        alt={place.name}
                                        caption=""
                                        source=""
                                        // We can pass the src directly via a wrapper or assume ArchivalImage handles it.
                                        // Since ArchivalImage might expect a specific specific props for Supabase storage or external,
                                        // and our seed has '/images/...', we might need to handle that.
                                        // For now, let's assume ArchivalImage handles src if we pass it, or we use a standard img if it's a local path.
                                        // Actually ArchivalImage likely takes `src` prop (checking previous files).
                                        // Yes, in PageRenderer block it used `src={content.url}`.
                                        src={place.image}
                                        aspectRatio="aspect-[4/3]"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">No Image</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">{place.name}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {place.description}
                                </p>
                                {place.coordinates && (
                                    <p className="text-xs text-primary font-mono opacity-60 uppercase tracking-wider">
                                        {place.coordinates}
                                    </p>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </SectionContainer>
    );
}
