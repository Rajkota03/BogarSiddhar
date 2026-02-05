"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TeachingsSection({ data }: { data: any }) {
    if (!data) return null;
    const practices = data.content?.practices || [];

    return (
        <SectionContainer id="teachings" className="bg-muted/5">
            <SectionHeader
                title={data.title}
                summary={data.summary}
                label={data.context_label}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {practices.map((practice: any, idx: number) => (
                    <ScrollReveal key={idx} delay={idx * 0.1} variant="slideUp">
                        <div className="bg-background border border-border p-8 text-center hover:border-primary/50 transition-colors duration-500 h-full rounded-sm group">
                            <div className="w-12 h-12 bg-muted/50 rounded-full mx-auto mb-6 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="font-serif text-2xl">✦</span>
                            </div>
                            <h3 className="text-xl font-serif mb-3 text-foreground">{practice.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {practice.desc}
                            </p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </SectionContainer>
    );
}
