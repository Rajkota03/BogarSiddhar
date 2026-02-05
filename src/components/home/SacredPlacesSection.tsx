"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchivalImage } from "@/components/ui/ArchivalImage";

export function SacredPlacesSection({ data }: { data: any }) {
    if (!data) return null;
    const images = data.content?.images || [];

    return (
        <SectionContainer id="places">
            <SectionHeader
                title={data.title}
                summary={data.summary}
                label={data.context_label}
            />

            <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {images.map((img: any, idx: number) => (
                        <div key={idx}>
                            <ArchivalImage
                                alt={img.alt}
                                caption={img.caption}
                                source={img.source}
                                aspectRatio="aspect-[4/3]"
                            />
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </SectionContainer>
    );
}
