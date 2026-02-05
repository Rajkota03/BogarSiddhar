"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    summary: string;
    label?: string; // New Context Label
    className?: string;
}

export function SectionHeader({ title, summary, label, className = "" }: SectionHeaderProps) {
    return (
        <ScrollReveal className={cn("mb-16 md:mb-20 text-center max-w-2xl mx-auto", className)}>
            {label && (
                <span className="block mb-3 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-primary/80">
                    {label}
                </span>
            )}
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4 tracking-tight">{title}</h2>
            <p className="text-base md:text-lg text-muted-foreground font-sans font-light tracking-wide leading-relaxed">
                {summary}
            </p>
            <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-8" />
        </ScrollReveal>
    );
}
