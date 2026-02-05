"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import { useEffect } from "react";

// Read-only Tiptap Editor
function ReadOnlyContent({ content }: { content: any }) {
    const editor = useEditor({
        extensions: [StarterKit, TiptapImage],
        content: content,
        editable: false,
        editorProps: {
            attributes: {
                class: "prose prose-lg prose-invert max-w-none",
            },
        },
    });

    // Update content if it changes (though for read-only static pages it mostly won't)
    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;
    return <EditorContent editor={editor} />;
}

interface BlockRendererProps {
    blocks: any[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="flex flex-col">
            {blocks.map((block) => {
                switch (block.type) {
                    case "hero":
                        return (
                            <section key={block.id} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                                {block.content.image && (
                                    <Image
                                        src={block.content.image}
                                        alt={block.content.title || "Hero"}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                                    <ScrollReveal>
                                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                                            {block.content.title}
                                        </h1>
                                        {block.content.subtitle && (
                                            <p className="text-xl md:text-2xl text-white/90 font-light drop-shadow-md">
                                                {block.content.subtitle}
                                            </p>
                                        )}
                                    </ScrollReveal>
                                </div>
                            </section>
                        );

                    case "text":
                        return (
                            <SectionContainer key={block.id} className="py-12">
                                <ScrollReveal>
                                    <div className="max-w-3xl mx-auto">
                                        <ReadOnlyContent content={block.content} />
                                    </div>
                                </ScrollReveal>
                            </SectionContainer>
                        );

                    case "image":
                        return (
                            <SectionContainer key={block.id} className="py-12">
                                <ScrollReveal>
                                    <div className="max-w-5xl mx-auto">
                                        <div className="relative aspect-video rounded-sm overflow-hidden bg-muted">
                                            {block.content.url && (
                                                <Image
                                                    src={block.content.url}
                                                    alt={block.content.caption || "Image"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        {block.content.caption && (
                                            <p className="text-center text-sm text-muted-foreground mt-4 italic font-serif">
                                                {block.content.caption}
                                            </p>
                                        )}
                                    </div>
                                </ScrollReveal>
                            </SectionContainer>
                        );

                    case "quote":
                        return (
                            <SectionContainer key={block.id} className="py-16 bg-muted/10">
                                <ScrollReveal>
                                    <div className="max-w-4xl mx-auto text-center px-4">
                                        <blockquote className="text-2xl md:text-4xl font-serif italic text-primary leading-relaxed mb-6">
                                            "{block.content.text}"
                                        </blockquote>
                                        {block.content.source && (
                                            <cite className="text-sm md:text-base text-muted-foreground not-italic uppercase tracking-widest">
                                                — {block.content.source}
                                            </cite>
                                        )}
                                    </div>
                                </ScrollReveal>
                            </SectionContainer>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
