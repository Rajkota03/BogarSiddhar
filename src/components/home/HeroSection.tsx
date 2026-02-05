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
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105" // Slight scale for parallax feel
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#2C241B]" />
                )}

                {/* Cosmic Dark Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 mix-blend-multiply"
                    style={{ opacity: 0.9 }}
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Subtle Grain Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-10">
                        {/* Title Group */}
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white tracking-tight drop-shadow-lg leading-tight">
                                {title}
                            </h1>
                            <p className="text-2xl md:text-3xl text-cyan-200 font-serif italic tracking-wide drop-shadow-[0_0_15px_rgba(165,243,252,0.3)]">
                                {subtitle}
                            </p>
                        </div>

                        {/* Decorative Line - Cosmic Style */}
                        <div className="flex items-center justify-center gap-4 opacity-60">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <div className="w-2 h-2 rotate-45 border border-cyan-400/50" />
                            <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                        </div>

                        {/* Identity Statement */}
                        <div className="max-w-2xl mx-auto">
                            <p className="text-lg md:text-xl text-zinc-200 font-sans font-light leading-relaxed drop-shadow-md">
                                {identity}
                            </p>
                        </div>

                        {/* CTA Button */}
                        {showCta && (
                            <div className="pt-8 animate-fade-in-up">
                                <Link
                                    href={ctaLink}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                                >
                                    <span className="uppercase tracking-[0.2em] text-sm group-hover:text-amber-300 transition-colors">
                                        {ctaText}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
            </div>
        </section>
    );
}
