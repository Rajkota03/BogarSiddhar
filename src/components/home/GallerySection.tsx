"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryItem {
    id: string;
    image_path: string;
    caption?: string;
    source?: string;
    category?: string;
}

export function GallerySection({ items }: { items: GalleryItem[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    // Group by category (Order: Temples, Manuscripts, Symbols, Art)
    const categoryOrder = ["Temples", "Manuscripts", "Symbols", "Art"];
    const grouped = items.reduce((acc: any, item) => {
        const cat = item.category || "Art";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    return (
        <SectionContainer id="gallery" fullWidth className="bg-muted/5 py-24 md:py-32">
            <ScrollReveal className="text-center mb-20 max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4 tracking-tight">Sacred Visual Archive</h2>
                <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide leading-relaxed">
                    A curated collection of visual material connected to the life, legacy, and tradition of Bhogar Siddhar.
                </p>
                <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-8" />
            </ScrollReveal>

            <div className="space-y-24 container mx-auto px-4 md:px-8 max-w-7xl">
                {categoryOrder.map(category => {
                    const categoryItems = grouped[category];
                    if (!categoryItems || categoryItems.length === 0) return null;

                    return (
                        <div key={category}>
                            <h3 className="text-xl font-serif text-primary border-b border-border/40 pb-4 mb-8">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categoryItems.map((item: GalleryItem) => (
                                    <div
                                        key={item.id}
                                        className="group cursor-pointer space-y-3"
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-sm">
                                            {item.image_path.startsWith('/') ? (
                                                // If it's a relative path (placeholder), we might not have the file actually, 
                                                // but for this demo we assume it works or shows placeholder
                                                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 font-serif">
                                                    [Image: {item.caption?.substring(0, 15)}...]
                                                </div>
                                            ) : (
                                                <Image
                                                    src={item.image_path}
                                                    alt={item.caption || ""}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}

                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                                        </div>

                                        <div className="pr-4">
                                            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2 group-hover:text-primary transition-colors">
                                                {item.caption}
                                            </p>
                                            {item.source && (
                                                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-1">
                                                    {item.source}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
                        <div className="relative w-full h-[70vh] mb-8">
                            {selectedImage.image_path.startsWith('/') ? (
                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-500">
                                    [Image Placeholder]
                                </div>
                            ) : (
                                <Image
                                    src={selectedImage.image_path}
                                    alt={selectedImage.caption || ""}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>
                        <div className="text-center max-w-2xl px-4 space-y-3">
                            <p className="text-white/90 text-lg font-serif leading-relaxed">{selectedImage.caption}</p>
                            {selectedImage.source && (
                                <p className="text-primary/80 text-xs uppercase tracking-[0.2em]">{selectedImage.source}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </SectionContainer>
    );
}
