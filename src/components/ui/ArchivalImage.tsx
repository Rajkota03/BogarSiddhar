"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArchivalImageProps {
    src?: string;
    alt: string;
    caption: string;
    source?: string; // e.g. "Siddha Tradition"
    aspectRatio?: "aspect-video" | "aspect-square" | "aspect-[3/4]" | "aspect-[4/3]";
    className?: string;
    priority?: boolean;
}

export function ArchivalImage({
    src,
    alt,
    caption,
    source,
    aspectRatio = "aspect-[3/4]",
    className,
    priority = false
}: ArchivalImageProps) {
    return (
        <figure className={cn("group my-12", className)}>
            <div className={cn("relative w-full bg-muted overflow-hidden rounded-sm", aspectRatio)}>
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={priority}
                    />
                ) : (
                    // Placeholder state if no image uploaded yet
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground/50 font-serif">
                        <span className="text-sm uppercase tracking-widest">[Image: {alt}]</span>
                    </div>
                )}
            </div>

            {/* Mandatory Caption Area */}
            <figcaption className="mt-4 text-left border-l-2 border-primary/20 pl-4 py-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {caption}
                </p>
                {source && (
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-1">
                        Source: {source}
                    </p>
                )}
            </figcaption>
        </figure>
    );
}
