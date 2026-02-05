"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function NavapashanamSection({ data }: { data: any }) {
    if (!data) return null;

    return (
        <SectionContainer id="navapashanam" className="bg-[#1a1410] text-center">
            <ScrollReveal className="mb-12 text-center max-w-3xl mx-auto">
                {data.context_label && (
                    <span className="block mb-3 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-primary/80">
                        {data.context_label}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-serif text-accent mb-3">{data.title}</h2>
                <p className="text-base md:text-lg text-primary font-light tracking-wide uppercase">{data.summary}</p>
                <div className="w-16 h-[1px] bg-white/10 mx-auto mt-6" />
            </ScrollReveal>

            <ScrollReveal className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    {data.content?.body}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 hover:border-accent/30 transition-colors">
                        <h3 className="text-lg font-serif text-white mb-2">The Composition</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Combined in specific proportions, the nine poisons neutralize into a healing substance that has withstood centuries of worship.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 hover:border-accent/30 transition-colors">
                        <h3 className="text-lg font-serif text-white mb-2">The Purpose</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Created to last for thousands of years, the idol serves as a perennial source of medicine for humanity.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </SectionContainer>
    );
}
