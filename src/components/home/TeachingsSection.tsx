"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TeachingsSection({ data }: { data: any }) {
    if (!data) return null;
    // Support both 'practices' (legacy) and 'cards' (new seed)
    const items = data.content?.cards || data.content?.practices || [];

    return (
        <SectionContainer id="teachings" className="bg-muted/5">
            <SectionHeader
                title={data.title}
                summary={data.summary}
                label={data.context_label}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item: any, idx: number) => (
                    <ScrollReveal key={idx} delay={idx * 0.1} variant="slideUp">
                        <div className="bg-background border border-border p-6 text-center hover:border-primary/50 transition-colors duration-500 h-full rounded-sm group flex flex-col items-center">
                            <div className="w-12 h-12 bg-muted/50 rounded-full mb-4 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="font-serif text-2xl">✦</span>
                            </div>
                            <h3 className="text-lg font-serif mb-2 text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description || item.desc}
                            </p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </SectionContainer>
    );
}
