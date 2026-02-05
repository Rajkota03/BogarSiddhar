"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface Siddhar {
    id: string;
    name: string;
    title?: string;
    bio?: string;
    image_path?: string;
    expertise?: string[];
    sort_order: number;
}

// Hook to calculate scales and opacities based on scroll position relative to the window
function useCardTransform(progress: MotionValue<number>, index: number, total: number, rangeInv: number) {
    const targetScale = 1 - (total - index) * 0.05;

    // As the card moves up the stack, it scales down slightly to create depth
    return useTransform(progress,
        [index * rangeInv, 1],
        [1, targetScale]
    );
}

export function SuggestionCard({ siddhar, index, progress, range, targetScale }: { siddhar: Siddhar, index: number, progress: MotionValue<number>, range: number, targetScale: number }) {

    // We transform the card based on the global scroll progress of the container
    // range is 1 / total cards
    const start = index * range;
    const end = start + range;

    const scale = useTransform(progress,
        [start, end],
        [1, targetScale] // From full size to slightly smaller as it gets pushed up
    );

    // Optional: Fade out slightly as it goes up
    const opacity = useTransform(progress, [start, end * 2], [1, 0.6]);

    // Calculate a dynamic top offset to create the "stack" effect visually
    const topOffset = index * 40; // 40px visible top part of each underlying card

    return (
        <div
            className="h-screen flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    // No dynamic top offset based on index, just sticky centering
                    // We rely on the wrapper's sticky top-0 and flex-center to handle position
                }}
                className="relative w-full max-w-5xl h-[85vh] md:h-[70vh] bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row origin-top"
            >
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative h-2/5 md:h-full bg-muted/20 shrink-0">
                    {siddhar.image_path ? (
                        <Image
                            src={siddhar.image_path}
                            alt={siddhar.name}
                            fill
                            className="object-cover md:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-lg bg-neutral-900 border-r border-border/50">
                            [Portrait]
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-7/12 p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-6 bg-card overflow-y-auto">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-serif text-foreground mb-2"
                        >
                            {siddhar.name}
                        </motion.h2>
                        {siddhar.title && (
                            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium">{siddhar.title}</p>
                        )}
                    </div>

                    <div className="w-12 h-0.5 bg-border" />

                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        {siddhar.bio}
                    </p>

                    {siddhar.expertise && siddhar.expertise.length > 0 && (
                        <div className="pt-4 flex flex-wrap gap-2">
                            {siddhar.expertise.map(exp => (
                                <span key={exp} className="px-3 py-1 bg-primary/5 text-primary-foreground border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {exp}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}


export function StackingCards({ siddhars }: { siddhars: Siddhar[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full">
            {siddhars.map((siddhar, i) => {
                const targetScale = 1 - ((siddhars.length - i) * 0.05);
                const range = 1 / siddhars.length;

                return (
                    <SuggestionCard
                        key={siddhar.id}
                        siddhar={siddhar}
                        index={i}
                        progress={scrollYProgress}
                        range={range}
                        targetScale={targetScale}
                    />
                );
            })}
            <div className="h-[20vh]" /> {/* Spacer to allow scrolling past the last card */}
        </div>
    );
}
