"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SeekersSection({ data }: { data: any }) {
    if (!data) return null;

    return (
        <SectionContainer id="seekers">
            <div className="bg-muted/10 border border-muted p-8 md:p-12 text-center max-w-4xl mx-auto rounded-sm">
                <SectionHeader title={data.title} summary="" className="mb-6" />

                <ScrollReveal variant="slideUp">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                        {data.content?.body}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-foreground/60 uppercase tracking-widest">
                        <span>Discipline</span>
                        <span>Humility</span>
                        <span>Service</span>
                    </div>
                </ScrollReveal>
            </div>
        </SectionContainer>
    );
}
