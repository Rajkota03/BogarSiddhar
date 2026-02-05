"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchivalImage } from "@/components/ui/ArchivalImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GallerySection } from "@/components/home/GallerySection";

// Create mapped components for blocks

// 1. Text Block
function BlockText({ content }: { content: any }) {
    return (
        <SectionContainer>
            {(content.heading || content.summary) && (
                <SectionHeader
                    title={content.heading}
                    summary={content.summary}
                    label={content.label} // Support generic label if added
                />
            )}
            {content.body && (
                <ScrollReveal>
                    <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.body }} />
                </ScrollReveal>
            )}
        </SectionContainer>
    )
}

// 2. Image Block
function BlockImage({ content }: { content: any }) {
    const isFull = content.layout === 'full';
    return (
        <SectionContainer fullWidth={isFull}>
            <ScrollReveal className={isFull ? "" : "container mx-auto max-w-5xl"}>
                <ArchivalImage
                    src={content.url}
                    alt={content.caption || "Page Image"}
                    caption={content.caption}
                    source={content.source}
                    aspectRatio="aspect-video" // Default video for single blocks usually
                />
            </ScrollReveal>
        </SectionContainer>
    )
}

// 2b. Image + Text Block
function BlockImageText({ content }: { content: any }) {
    const isRight = content.layout === 'right';
    return (
        <SectionContainer>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
                {/* Image Column */}
                <ScrollReveal className={`order-first ${isRight ? 'md:order-last' : ''}`}>
                    <ArchivalImage
                        src={content.image}
                        alt={content.heading || "Section Image"}
                        aspectRatio="aspect-square"
                        caption={""} // Empty string since this block layout doesn't emphasize caption
                    />
                </ScrollReveal>

                {/* Text Column */}
                <ScrollReveal variant="slideUp" delay={0.2} className="space-y-6">
                    {content.heading && <h2 className="text-3xl md:text-4xl font-serif text-foreground">{content.heading}</h2>}
                    {content.body && <div className="prose prose-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: content.body }} />}
                    {content.cta_text && (
                        <div className="pt-4">
                            <a href={content.cta_link} className="inline-flex items-center gap-2 border-b border-primary pb-0.5 text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-xs font-bold">
                                {content.cta_text}
                            </a>
                        </div>
                    )}
                </ScrollReveal>
            </div>
        </SectionContainer>
    )
}

// 3. Quote Block
function BlockQuote({ content }: { content: any }) {
    return (
        <SectionContainer>
            <ScrollReveal className="max-w-4xl mx-auto text-center px-6">
                <blockquote className="space-y-6">
                    <p className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground">
                        "{content.text}"
                    </p>
                    <footer className="flex flex-col items-center gap-1">
                        <cite className="not-italic text-sm font-medium uppercase tracking-widest text-primary">
                            {content.source}
                        </cite>
                        {content.category && (
                            <span className="text-xs text-muted-foreground opacity-60">
                                {content.category}
                            </span>
                        )}
                    </footer>
                </blockquote>
            </ScrollReveal>
        </SectionContainer>
    )
}

// 4. Divider Block
function BlockDivider({ content }: { content: any }) {
    const spacing = content.spacing === 'large' ? 'py-24' : content.spacing === 'small' ? 'py-8' : 'py-16';

    return (
        <div className={spacing}>
            <div className="flex items-center justify-center opacity-30">
                {content.style === 'symbol' ? (
                    <span className="text-2xl text-primary font-serif">✦</span>
                ) : content.style === 'line' ? (
                    <div className="w-24 h-[1px] bg-border" />
                ) : null}
            </div>
        </div>
    )
}

// 5. Gallery Block (Client fetches items by category, or uses passed items if manual)
// For manual items we'd need to fetch them. Here we assume generic category feed for now.
// We can reuse the GallerySection component but need to adapt it.

// 6. Card Grid Block
function BlockCardGrid({ content }: { content: any }) {
    const cards = content.cards || [];
    const cols = content.columns === '2' ? 'md:grid-cols-2' : content.columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3';

    return (
        <SectionContainer>
            <div className={`grid grid-cols-1 ${cols} gap-8`}>
                {cards.map((card: any, idx: number) => (
                    <ScrollReveal key={idx} delay={idx * 0.1} variant="slideUp">
                        <div className="bg-background border border-border p-8 text-center hover:border-primary/50 transition-colors duration-500 h-full rounded-sm group">
                            {/* Optional Icon if added later */}
                            <div className="w-12 h-12 bg-muted/50 rounded-full mx-auto mb-6 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="font-serif text-2xl">✦</span>
                            </div>
                            <h3 className="text-xl font-serif mb-3 text-foreground">{card.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {card.description}
                            </p>
                            {card.link && (
                                <a href={card.link} className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                                    Learn More
                                </a>
                            )}
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </SectionContainer>
    )
}

interface PageRendererProps {
    blocks: any[];
    settings?: any;
    galleryItems?: any[]; // Pass all gallery items to filter client-side for now
}

export function PageRenderer({ blocks, settings, galleryItems }: PageRendererProps) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="flex flex-col">
            {blocks.map((block: any) => {
                if (block.visible === false || block.content._hidden) return null; // Respect hidden flag


                const style = {
                    backgroundColor: block.styles?.backgroundColor,
                    color: block.styles?.textColor,
                };

                const paddingClass = block.styles?.padding === 'none' ? '' : block.styles?.padding === 'medium' ? 'py-12' : 'py-24';
                const widthClass = block.styles?.fullWidth ? '' : '';

                // HEURISTIC: Try to find an ID for navigation
                // 1. Explicit anchor in block settings
                // 2. Infer from label, heading, or title
                let sectionId = block.anchor || block.content?.anchor;

                if (!sectionId) {
                    // Combine potential sources
                    const text = [
                        block.content?.label,
                        block.content?.heading,
                        block.content?.title
                    ].filter(Boolean).join(' ').toLowerCase();

                    if (text) {
                        if (text.includes('about') || text.includes('biography') || text.includes('story')) sectionId = 'about';
                        else if (text.includes('teaching') || text.includes('philosophy') || text.includes('alchemy')) sectionId = 'teachings';
                        else if (text.includes('text') || text.includes('7000') || text.includes('book')) sectionId = 'texts';
                    }
                }

                return (
                    <div
                        key={block.id}
                        id={sectionId}
                        style={style}
                        className={`${paddingClass} transition-colors duration-500 scroll-mt-24`}
                    >
                        {(() => {
                            switch (block.type) {
                                case 'hero':
                                    // Hero usually ignores generic padding/bg because it has its own, but we can allow overrides or just wrap it. 
                                    // For now, let generic styles apply, but Hero often needs full width.
                                    return (
                                        <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                                            {block.content.image && (
                                                <>
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center z-0"
                                                        style={{ backgroundImage: `url(${block.content.image})` }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 z-10" />
                                                </>
                                            )}
                                            <div className="relative z-20 text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                                {block.content.identity && (
                                                    <p className="text-xs md:text-sm text-primary uppercase tracking-[0.25em] mb-6 font-medium">
                                                        {block.content.identity}
                                                    </p>
                                                )}
                                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
                                                    {block.content.title}
                                                </h1>
                                                <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
                                                    {block.content.subtitle}
                                                </p>
                                                {block.content.cta_text && (
                                                    <a href={block.content.cta_link} className="inline-block border border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 rounded-sm uppercase tracking-widest text-xs transition-all duration-300">
                                                        {block.content.cta_text}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );

                                case 'text':
                                    return <BlockText content={block.content} />;

                                case 'image':
                                    return <BlockImage content={block.content} />;

                                case 'image_text':
                                    return <BlockImageText content={block.content} />;

                                case 'quote':
                                    return <BlockQuote content={block.content} />;

                                case 'divider':
                                    return <BlockDivider content={block.content} />;

                                case 'card_grid':
                                    return <BlockCardGrid content={block.content} />;

                                case 'gallery':
                                    const cat = block.content.category;
                                    const items = cat ? galleryItems?.filter(i => i.category === cat) : [];
                                    return <GallerySection items={items || []} />;

                                default:
                                    return null;
                            }
                        })()}
                    </div>
                );
            })}
        </div>
    );
}
