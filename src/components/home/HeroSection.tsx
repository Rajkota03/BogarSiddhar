"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    settings?: any;
}

export function HeroSection({ settings }: HeroSectionProps) {
    // Defaults if no settings provided
    const title = settings?.home_hero_title || "Bhogar Siddhar";
    const subtitle = settings?.home_hero_subtitle || "The Alchemist Sage";
    const identity = settings?.home_hero_identity_text || "A digital archive dedicated to the life, teachings, and legacy of Bhogar Siddhar.";
    const bgImage = settings?.home_hero_bg_image;
    const ctaText = settings?.home_hero_cta_text || "Explore";
    const ctaLink = settings?.home_hero_cta_link || "/#about";
    const showCta = settings?.hero_cta_enabled !== false;

    // Style Config
    const heightClass = settings?.hero_height === 'auto' ? 'min-h-[60vh] py-32' :
        settings?.hero_height === '70vh' ? 'min-h-[70vh]' : 'min-h-screen';

    const opacity = settings?.hero_opacity ? settings.hero_opacity / 100 : 0.5;

    return (
        <section className={`relative flex items-center justify-center overflow-hidden ${heightClass}`}>
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {bgImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                ) : (
                    // Fallback noise texture
                    <div className="absolute inset-0 bg-[#2C241B] opacity-100" />
                )}
                <div
                    className="absolute inset-0 bg-black transition-opacity duration-700"
                    style={{ opacity: opacity }}
                />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Title Group */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight drop-shadow-2xl">
                                {title}
                            </h1>
                            <p className="text-xl md:text-2xl text-primary font-light tracking-wide font-serif italic">
                                {subtitle}
                            </p>
                        </div>

                        {/* Separator */}
                        <div className="w-24 h-[1px] bg-white/20 mx-auto" />

                        {/* Identity Statement (New) */}
                        <div className="max-w-2xl mx-auto">
                            <p className="text-base md:text-lg text-muted-foreground/90 font-sans font-light leading-relaxed">
                                {identity}
                            </p>
                        </div>

                        {/* CTA */}
                        {showCta && (
                            <div className="pt-8">
                                <Link
                                    href={ctaLink}
                                    className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                                >
                                    {ctaText}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
        </section>
    );
}
