"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchivalImage } from "@/components/ui/ArchivalImage";

export function AboutSection({ data }: { data: any }) {
    if (!data) return null;
    const image = data.content?.images?.[0];

    return (
        <SectionContainer id="about">
            <SectionHeader
                title={data.title}
                summary={data.summary}
                label={data.context_label}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <ScrollReveal variant="slideRight">
                    {image && (
                        <ArchivalImage
                            alt={image.alt}
                            caption={image.caption}
                            source={image.source}
                        />
                    )}
                </ScrollReveal>

                <ScrollReveal variant="slideLeft" className="space-y-8 pt-4">
                    <div className="prose prose-lg text-muted-foreground leading-relaxed">
                        {data.content?.body?.split('\n\n').map((p: string, i: number) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <ul className="space-y-4 pt-4 border-t border-border/50">
                        <li className="flex items-center gap-4 text-foreground/80">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-lg">One of the 18 Siddhars</span>
                        </li>
                        <li className="flex items-center gap-4 text-foreground/80">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-lg">Master Alchemist (Rasa Shastra)</span>
                        </li>
                        <li className="flex items-center gap-4 text-foreground/80">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-lg">Architect of the Navapashanam</span>
                        </li>
                    </ul>
                </ScrollReveal>
            </div>
        </SectionContainer>
    );
}
