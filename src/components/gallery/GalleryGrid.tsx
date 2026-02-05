"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface GalleryItem {
    id: string;
    image_path: string;
    caption?: string;
    location?: string;
    category?: string;
    tags?: string[];
}

interface GalleryGridProps {
    items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(items.map(item => item.category || "Uncategorized")))];

    const filteredItems = selectedCategory === "All"
        ? items
        : items.filter(item => (item.category || "Uncategorized") === selectedCategory);

    return (
        <div className="space-y-12">
            {/* Filter */}
            <div className="flex justify-center flex-wrap gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-500 font-medium ${selectedCategory === cat
                            ? "bg-primary text-background shadow-lg scale-105"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            key={item.id}
                            className="group relative cursor-zoom-in"
                            onClick={() => setSelectedImage(item)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
                                {item.image_path.startsWith('/') ? (
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                                        <span className="text-xs uppercase tracking-widest">[Placeholder]</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={item.image_path}
                                        alt={item.caption || "Gallery Image"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Overlay Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <p className="text-white text-lg font-serif italic mb-1 text-shadow">{item.caption}</p>
                                    {item.location && <p className="text-white/70 text-xs uppercase tracking-wider">{item.location}</p>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No images found in this category.</p>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <X size={32} />
                        </button>

                        <div
                            className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[80vh] mb-6">
                                {selectedImage.image_path.startsWith('/') ? (
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-500">
                                        [Placeholder]
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
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-serif text-white/90">{selectedImage.caption}</h3>
                                {selectedImage.location && (
                                    <p className="text-primary/80 uppercase tracking-widest text-xs">{selectedImage.location}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
