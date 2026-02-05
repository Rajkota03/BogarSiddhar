"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchivalImage } from "@/components/ui/ArchivalImage";

export function TextsSection({ data }: { data: any }) {
    if (!data) return null;
    const image = data.content?.images?.[0];

    return (
        <SectionContainer id="texts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                    <SectionHeader
                        title={data.title}
                        summary={data.summary}
                        label={data.context_label}
                        className="md:text-left md:mx-0"
                    />

                    <ScrollReveal>
                        <div className="prose prose-lg text-muted-foreground mb-10 leading-relaxed">
                            {data.content?.body}
                        </div>

                        <ul className="space-y-6 text-muted-foreground">
                            <li className="flex items-start">
                                <span className="text-primary mr-4 mt-1.5 text-xl">✦</span>
                                <div>
                                    <strong className="block text-foreground mb-1">Medical Formulations</strong>
                                    <span className="text-sm">Detailed preparations using herbs and minerals.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-4 mt-1.5 text-xl">✦</span>
                                <div>
                                    <strong className="block text-foreground mb-1">Kundalini Yoga</strong>
                                    <span className="text-sm">Techniques to awaken dormant energy.</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-12 p-6 bg-muted/20 border-l-2 border-primary italic text-sm text-foreground/80 leading-relaxed">
                            Note: These texts are ancient verses encoded with symbolism, intended for preservation and study.
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal variant="slideLeft" className="order-1 md:order-2">
                    {image && (
                        <ArchivalImage
                            alt={image.alt}
                            caption={image.caption}
                            source={image.source}
                            aspectRatio="aspect-square"
                        />
                    )}
                </ScrollReveal>
            </div>
        </SectionContainer>
    );
}
