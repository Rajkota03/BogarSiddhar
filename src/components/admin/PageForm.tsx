"use client";

import { useState, useEffect } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { createPage, updatePage } from "@/lib/actions/pages";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { PageRenderer } from "@/components/blocks/PageRenderer";
import {
    Plus, Trash2, GripVertical, ChevronLeft, Image as ImageIcon,
    Type, Quote, LayoutTemplate, Minus, Grid, Settings,
    Monitor, Save, Eye
} from "lucide-react";

interface PageFormProps {
    page?: any;
    initialBlockId?: string | null;
}

type BlockType = "hero" | "text" | "image" | "image_text" | "quote" | "gallery" | "divider" | "card_grid";
type ViewMode = "list" | "edit_block" | "settings";

interface Block {
    id: string;
    type: BlockType;
    content: any;
    styles?: any;
    visible?: boolean;
}

export function PageForm({ page, initialBlockId }: PageFormProps) {
    const [blocks, setBlocks] = useState<Block[]>(page?.content_blocks || []);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("list"); // list, edit_block, settings
    const [isSaving, setIsSaving] = useState(false);

    // Deep Link Effect
    useEffect(() => {
        if (initialBlockId) {
            const exists = blocks.find(b => b.id === initialBlockId);
            if (exists) {
                setSelectedBlockId(initialBlockId);
                setViewMode("edit_block");
            }
        }
    }, [initialBlockId]); // Run once on mount (or if prop changes)

    // Page Meta State
    const [pageMeta, setPageMeta] = useState({
        title: page?.title || "",
        slug: page?.slug || "",
        seo_title: page?.seo_title || "",
        seo_description: page?.seo_description || "",
        status: page?.status || "draft"
    });

    const isEdit = !!page;

    const addBlock = (type: BlockType) => {
        const newId = Math.random().toString(36).substring(7);
        const newBlock = {
            id: newId,
            type,
            content: getDefaultContent(type),
            styles: { padding: 'medium', fullWidth: false },
            visible: true
        };
        setBlocks([...blocks, newBlock]);
        setSelectedBlockId(newId);
        setViewMode("edit_block");
    };

    const getDefaultContent = (type: BlockType) => {
        switch (type) {
            case "hero": return { title: "New Hero", subtitle: "Subtitle here", identity: "", image: "", cta_text: "", cta_link: "" };
            case "text": return { heading: "Section Heading", summary: "", body: "<p>Start writing...</p>" };
            case "image": return { url: "", caption: "", source: "", layout: "full" };
            case "image_text": return { heading: "Feature Project", body: "<p>Describe this feature...</p>", image: "", layout: "right", cta_text: "", cta_link: "" };
            case "quote": return { text: "Quote text...", source: "", category: "" };
            case "gallery": return { images: [], category: "" };
            case "divider": return { style: "line", spacing: "medium" };
            case "card_grid": return { columns: "3", cards: [{ title: "Feature", description: "Description", link: "" }] };
            default: return {};
        }
    }

    const removeBlock = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (confirm("Delete this section?")) {
            setBlocks(blocks.filter((b) => b.id !== id));
            if (selectedBlockId === id) {
                setSelectedBlockId(null);
                setViewMode("list");
            }
        }
    };

    const updateBlockContent = (id: string, content: any) => {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
    };

    const updateBlockStyles = (id: string, styles: any) => {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, styles: { ...b.styles, ...styles } } : b)));
    };

    const moveBlock = (index: number, direction: "up" | "down", e: React.MouseEvent) => {
        e.stopPropagation();
        const newBlocks = [...blocks];
        if (direction === "up" && index > 0) {
            [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        } else if (direction === "down" && index < newBlocks.length - 1) {
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        }
        setBlocks(newBlocks);
    };

    // Card Helper
    const updateCard = (blockId: string, idx: number, field: string, value: string) => {
        const block = blocks.find(b => b.id === blockId);
        if (!block) return;
        const newCards = [...block.content.cards];
        newCards[idx] = { ...newCards[idx], [field]: value };
        updateBlockContent(blockId, { ...block.content, cards: newCards });
    }

    return (
        <form action={isEdit ? updatePage.bind(null, page.id) : createPage} className="h-[calc(100vh-4rem)] flex flex-col">

            {/* Top Bar */}
            <div className="h-16 border-b border-border bg-background px-4 flex items-center justify-between shrink-0 z-50">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setViewMode("list")} className="font-serif font-bold text-lg hover:text-primary transition-colors">
                        {pageMeta.title || "Untitled Page"}
                    </button>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">{pageMeta.status}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setViewMode("settings")} className={`p-2 rounded hover:bg-muted ${viewMode === 'settings' ? 'bg-muted' : ''}`} title="Page Settings">
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-border mx-2" />
                    <button type="submit" className="bg-primary text-background px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center gap-2 shadow-sm" disabled={isSaving}>
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {/* Hidden Inputs for Form Submission */}
            <input type="hidden" name="title" value={pageMeta.title} />
            <input type="hidden" name="slug" value={pageMeta.slug} />
            <input type="hidden" name="seo_title" value={pageMeta.seo_title} />
            <input type="hidden" name="seo_description" value={pageMeta.seo_description} />
            <input type="hidden" name="status" value={pageMeta.status} />
            <input type="hidden" name="content_blocks" value={JSON.stringify(blocks)} />

            {/* Split Layout */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT SIDEBAR: EDITOR PANEL - THEME: ANCIENT PAPER */}
                <div className="w-80 border-r border-stone-200 bg-[#Fdfbf7] flex flex-col overflow-hidden shrink-0 text-sm select-none transition-colors duration-300 shadow-xl z-20 min-h-0">

                    {/* -- MODE: SETTINGS -- */}
                    {viewMode === "settings" && (
                        <div className="flex-1 flex flex-col min-h-0 animate-in slide-in-from-left-4 duration-200">
                            <div className="h-14 border-b border-stone-200 flex items-center px-5 gap-3 bg-[#F4F1EA] shrink-0">
                                <button type="button" onClick={() => setViewMode("list")}><ChevronLeft className="w-4 h-4 text-stone-500 hover:text-stone-800" /></button>
                                <span className="font-serif font-bold text-stone-800 text-lg tracking-wide">Page Settings</span>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">Page Title</label>
                                        <input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/50 text-stone-800 font-serif" value={pageMeta.title} onChange={(e) => setPageMeta({ ...pageMeta, title: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">Slug (URL)</label>
                                        <input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-xs bg-white/50 text-stone-600" value={pageMeta.slug} onChange={(e) => setPageMeta({ ...pageMeta, slug: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">Status</label>
                                        <select className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/50 text-stone-800" value={pageMeta.status} onChange={(e) => setPageMeta({ ...pageMeta, status: e.target.value })}>
                                            <option value="draft">Draft (Hidden)</option>
                                            <option value="published">Published (Live)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-stone-200/60 pb-10">
                                    <h4 className="text-[10px] font-bold uppercase mb-4 text-stone-500 tracking-widest">SEO Metadata</h4>
                                    <div className="space-y-4">
                                        <input placeholder="SEO Title" className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm transition-colors bg-white/50 focus:border-[#D4AF37] text-stone-800" value={pageMeta.seo_title} onChange={(e) => setPageMeta({ ...pageMeta, seo_title: e.target.value })} />
                                        <textarea placeholder="Meta Description" rows={4} className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm transition-colors resize-none bg-white/50 focus:border-[#D4AF37] text-stone-800" value={pageMeta.seo_description} onChange={(e) => setPageMeta({ ...pageMeta, seo_description: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* -- MODE: LIST (TREE VIEW) -- */}
                    {viewMode === "list" && (
                        <div className="flex-1 flex flex-col min-h-0 bg-[#Fdfbf7]">
                            <div className="flex-1 overflow-y-auto custom-scrollbar">

                                {/* 1. HEADER GROUP */}
                                <div className="border-b border-stone-200">
                                    <div className="px-5 py-3.5 bg-[#F4F1EA] flex items-center justify-between group cursor-pointer">
                                        <span className="font-bold text-xs uppercase tracking-widest text-stone-500">Header</span>
                                    </div>
                                    <div className="pl-4">
                                        <a href="/admin/settings" target="_blank" className="flex items-center gap-3 px-4 py-2.5 hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors border-l border-stone-200">
                                            <Minus className="w-3 h-3 opacity-30" />
                                            <span className="text-sm font-medium">Announcement Bar</span>
                                        </a>
                                        <a href="/admin/navigation" target="_blank" className="flex items-center gap-3 px-4 py-2.5 hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors border-l border-stone-200">
                                            <Minus className="w-3 h-3 opacity-30" />
                                            <span className="text-sm font-medium">Main Menu</span>
                                        </a>
                                    </div>
                                </div>

                                {/* 2. TEMPLATE GROUP (Main Content) */}
                                <div className="">
                                    <div className="px-5 py-3.5 bg-[#F4F1EA] flex items-center justify-between sticky top-0 z-10 border-b border-stone-200 shadow-sm">
                                        <span className="font-bold text-xs uppercase tracking-widest text-[#D4AF37]">Template</span>
                                    </div>

                                    <div className="py-2 space-y-1">
                                        {blocks.map((block, index) => (
                                            <div
                                                key={block.id}
                                                className={`group flex items-center gap-3 px-4 py-3 cursor-pointer border-l-[3px] transition-all duration-200
                                                    ${selectedBlockId === block.id ? 'bg-[#F4F1EA] border-[#D4AF37] text-stone-900 shadow-inner' : 'border-transparent hover:bg-stone-50 hover:border-stone-300 text-stone-600'}
                                                `}
                                                onClick={() => { setSelectedBlockId(block.id); setViewMode("edit_block"); }}
                                            >
                                                {/* Drag Handle (Visual) */}
                                                <div className="text-stone-300 group-hover:text-stone-500 cursor-grab active:cursor-grabbing">
                                                    <GripVertical className="w-3.5 h-3.5" />
                                                </div>

                                                {/* Icon */}
                                                <div className="text-stone-400 group-hover:text-[#D4AF37] transition-colors">
                                                    {block.type === 'hero' && <LayoutTemplate size={15} />}
                                                    {block.type === 'text' && <Type size={15} />}
                                                    {block.type === 'image_text' && <LayoutTemplate size={15} className="rotate-90" />}
                                                    {block.type === 'image' && <ImageIcon size={15} />}
                                                    {block.type === 'quote' && <Quote size={15} />}
                                                    {block.type === 'gallery' && <Grid size={15} />}
                                                    {block.type === 'card_grid' && <Grid size={15} />}
                                                </div>

                                                {/* Label */}
                                                <div className="flex-1 truncate text-sm font-medium">
                                                    {block.content.title || block.content.heading || (
                                                        <span className="capitalize italic text-stone-400">{block.type.replace('_', ' ')}</span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); updateBlockContent(block.id, { ...block.content, _hidden: !block.content._hidden }); }}
                                                        className="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-stone-800"
                                                    >
                                                        <Eye size={13} className={block.content._hidden ? "opacity-30" : ""} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => removeBlock(block.id, e)}
                                                        className="p-1.5 hover:bg-red-50 rounded text-stone-400 hover:text-red-600"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add Section Button */}
                                    <div className="px-5 py-4">
                                        <button
                                            type="button"
                                            className="w-full flex items-center justify-center gap-2 text-[#8B5E3C] border border-[#8B5E3C]/30 hover:bg-[#8B5E3C]/5 hover:border-[#8B5E3C] transition-all rounded-sm py-2.5 text-xs font-bold uppercase tracking-widest"
                                            onClick={() => document.getElementById('add-block-menu')?.classList.toggle('hidden')}
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add Section
                                        </button>

                                        {/* Dropdown */}
                                        <div id="add-block-menu" className="hidden mt-2 grid grid-cols-1 gap-1 p-2 bg-white border border-stone-200 shadow-lg rounded-sm animate-in slide-in-from-top-2 duration-200">
                                            {['hero', 'image_text', 'text', 'image', 'card_grid', 'gallery', 'quote', 'divider'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => { addBlock(type as BlockType); document.getElementById('add-block-menu')?.classList.add('hidden'); }}
                                                    className="text-left px-3 py-2 text-sm text-stone-600 hover:text-[#8B5E3C] hover:bg-[#F4F1EA] rounded-sm capitalize flex items-center gap-3 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                                                    {type.replace('_', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. FOOTER GROUP */}
                                <div className="border-t border-stone-200 mt-4">
                                    <div className="px-5 py-3.5 bg-[#F4F1EA] flex items-center justify-between group cursor-pointer text-stone-400 hover:text-stone-600">
                                        <span className="font-bold text-xs uppercase tracking-widest">Footer</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}


                    {/* -- MODE: EDIT BLOCK -- */}
                    {viewMode === "edit_block" && selectedBlockId && (() => {
                        const block = blocks.find(b => b.id === selectedBlockId);
                        if (!block) return null;

                        return (
                            <div className="flex-1 flex flex-col min-h-0 animate-in slide-in-from-left-4 duration-200 bg-[#Fdfbf7]">
                                <div className="h-14 border-b border-stone-200 flex items-center px-4 gap-2 bg-[#F4F1EA] shrink-0">
                                    <button type="button" onClick={() => setViewMode("list")} className="p-1.5 hover:bg-white rounded-md text-stone-500 hover:text-stone-800 transition-colors mr-1 shadow-sm border border-transparent hover:border-stone-200">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="font-serif font-bold text-lg text-stone-900 capitalize tracking-wide">{block.type.replace('_', ' ')}</span>
                                    <div className="ml-auto flex items-center gap-1">
                                        <button type="button" onClick={() => removeBlock(block.id)} className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-md transition-colors" title="Remove Section">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 pb-32">

                                    {/* Type Specific Fields */}
                                    {block.type === 'hero' && (
                                        <div className="space-y-5">
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Heading</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800 font-serif text-lg" value={block.content.title} onChange={(e) => updateBlockContent(block.id, { ...block.content, title: e.target.value })} /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Subheading</label><textarea className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm resize-none bg-white/50 focus:border-[#D4AF37] text-stone-700" rows={3} value={block.content.subtitle} onChange={(e) => updateBlockContent(block.id, { ...block.content, subtitle: e.target.value })} /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Background</label><ImageUpload value={block.content.image} onChange={(url) => updateBlockContent(block.id, { ...block.content, image: url })} bucket="media" /></div>

                                            <div className="pt-4 border-t border-dashed border-stone-200" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">CTA Text</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.cta_text} onChange={(e) => updateBlockContent(block.id, { ...block.content, cta_text: e.target.value })} /></div>
                                                <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">CTA Link</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.cta_link} onChange={(e) => updateBlockContent(block.id, { ...block.content, cta_link: e.target.value })} /></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* New Block: Image + Text */}
                                    {block.type === 'image_text' && (
                                        <div className="space-y-5">
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Heading</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800 font-serif text-lg" value={block.content.heading} onChange={(e) => updateBlockContent(block.id, { ...block.content, heading: e.target.value })} /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Content</label><RichTextEditor content={block.content.body} onChange={(body) => updateBlockContent(block.id, { ...block.content, body })} /></div>

                                            <div className="pt-4 border-t border-dashed border-stone-200" />
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Image</label><ImageUpload value={block.content.image} onChange={(url) => updateBlockContent(block.id, { ...block.content, image: url })} bucket="media" /></div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Layout</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button type="button" onClick={() => updateBlockContent(block.id, { ...block.content, layout: 'left' })} className={`px-3 py-2.5 text-xs border rounded-sm flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-colors ${block.content.layout === 'left' ? 'border-[#8B5E3C] bg-[#8B5E3C]/10 text-[#8B5E3C]' : 'border-stone-200 bg-white/50 text-stone-500'}`}>
                                                        <span className={`w-3 h-3 rounded-full ${block.content.layout === 'left' ? 'bg-[#8B5E3C]' : 'bg-stone-300'}`}></span> Image Left
                                                    </button>
                                                    <button type="button" onClick={() => updateBlockContent(block.id, { ...block.content, layout: 'right' })} className={`px-3 py-2.5 text-xs border rounded-sm flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-colors ${block.content.layout === 'right' ? 'border-[#8B5E3C] bg-[#8B5E3C]/10 text-[#8B5E3C]' : 'border-stone-200 bg-white/50 text-stone-500'}`}>
                                                        Image Right <span className={`w-3 h-3 rounded-full ${block.content.layout === 'right' ? 'bg-[#8B5E3C]' : 'bg-stone-300'}`}></span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Button Text</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.cta_text} onChange={(e) => updateBlockContent(block.id, { ...block.content, cta_text: e.target.value })} /></div>
                                                <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Link</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.cta_link} onChange={(e) => updateBlockContent(block.id, { ...block.content, cta_link: e.target.value })} /></div>
                                            </div>
                                        </div>
                                    )}


                                    {block.type === 'text' && (
                                        <div className="space-y-5">
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Heading</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800 font-serif text-lg" value={block.content.heading} onChange={(e) => updateBlockContent(block.id, { ...block.content, heading: e.target.value })} /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Content</label><RichTextEditor content={block.content.body} onChange={(body) => updateBlockContent(block.id, { ...block.content, body })} /></div>
                                        </div>
                                    )}

                                    {block.type === 'card_grid' && (
                                        <div className="space-y-5">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Grid Cards</label>
                                                <button type="button" onClick={() => updateBlockContent(block.id, { ...block.content, cards: [...block.content.cards, { title: "New Item", description: "" }] })} className="text-[10px] bg-[#8B5E3C]/10 text-[#8B5E3C] px-3 py-1.5 rounded uppercase font-bold hover:bg-[#8B5E3C]/20 transition-colors">+ Add Card</button>
                                            </div>
                                            <div className="space-y-3">
                                                {block.content.cards?.map((card: any, idx: number) => (
                                                    <div key={idx} className="p-4 bg-white border border-stone-200 rounded-sm space-y-3 group hover:border-[#D4AF37] transition-colors relative">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Card {idx + 1}</div>
                                                            <button type="button" onClick={() => { const newCards = [...block.content.cards]; newCards.splice(idx, 1); updateBlockContent(block.id, { ...block.content, cards: newCards }); }} className="text-stone-300 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                                                        </div>
                                                        <input className="w-full px-3 py-2 border border-stone-100 rounded-sm text-sm font-serif text-stone-800 focus:border-[#D4AF37] focus:outline-none" value={card.title} onChange={(e) => updateCard(block.id, idx, 'title', e.target.value)} placeholder="Card Title" />
                                                        <textarea className="w-full px-3 py-2 border border-stone-100 rounded-sm text-sm text-stone-600 resize-none focus:border-[#D4AF37] focus:outline-none" rows={2} value={card.description} onChange={(e) => updateCard(block.id, idx, 'description', e.target.value)} placeholder="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Other types omitted for brevity but follow same pattern */}
                                    {block.type === 'image' && (
                                        <div className="space-y-5">
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Image File</label><ImageUpload value={block.content.url} onChange={(url) => updateBlockContent(block.id, { ...block.content, url })} bucket="media" /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Caption</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.caption} onChange={(e) => updateBlockContent(block.id, { ...block.content, caption: e.target.value })} /></div>
                                        </div>
                                    )}

                                    {block.type === 'quote' && (
                                        <div className="space-y-5">
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Quote</label><textarea className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm font-serif bg-white/50 focus:border-[#D4AF37] text-stone-800 text-lg leading-relaxed" rows={4} value={block.content.text} onChange={(e) => updateBlockContent(block.id, { ...block.content, text: e.target.value })} /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Source</label><input className="w-full px-3 py-2.5 border border-stone-200 rounded-sm text-sm bg-white/50 focus:border-[#D4AF37] text-stone-800" value={block.content.source} onChange={(e) => updateBlockContent(block.id, { ...block.content, source: e.target.value })} /></div>
                                        </div>
                                    )}

                                    {/* Generic Style Controls for ALL Blocks */}
                                    <div className="pt-8 mt-8 border-t border-stone-200">
                                        <div className="mb-5 flex items-center gap-2">
                                            <Settings className="w-3.5 h-3.5 text-stone-400" />
                                            <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Block Appearance</span>
                                        </div>

                                        <div className="bg-white border border-stone-200 p-5 rounded-sm shadow-sm space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-stone-500 block mb-2">Background</label>
                                                    <div className="flex gap-2 items-center">
                                                        <input type="color" className="w-8 h-8 p-0.5 rounded-sm cursor-pointer border border-stone-200" value={block.styles?.backgroundColor || "#ffffff"} onChange={(e) => updateBlockStyles(block.id, { backgroundColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-stone-500 uppercase">{block.styles?.backgroundColor}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-stone-500 block mb-2">Text Ink</label>
                                                    <div className="flex gap-2 items-center">
                                                        <input type="color" className="w-8 h-8 p-0.5 rounded-sm cursor-pointer border border-stone-200" value={block.styles?.textColor || "#000000"} onChange={(e) => updateBlockStyles(block.id, { textColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-stone-500 uppercase">{block.styles?.textColor}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-bold text-stone-500 block">Vertical Padding</label>
                                                <select className="w-full text-xs p-2.5 border border-stone-200 rounded-sm bg-white focus:outline-none focus:border-[#D4AF37] text-stone-700" value={block.styles?.padding} onChange={(e) => updateBlockStyles(block.id, { padding: e.target.value })}>
                                                    <option value="large">Large (Standard)</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="none">None (Flush)</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center gap-2 pt-2">
                                                <input type="checkbox" id="fw" className="rounded-sm border-stone-300 text-[#8B5E3C] focus:ring-[#8B5E3C]" checked={block.styles?.fullWidth} onChange={(e) => updateBlockStyles(block.id, { fullWidth: e.target.checked })} />
                                                <label htmlFor="fw" className="text-xs font-bold text-stone-600 cursor-pointer select-none">Force Full Width</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })()}

                </div>

                {/* RIGHT SIDE: PREVIEW CANVAS */}
                <div className="flex-1 bg-gray-50 flex flex-col relative overflow-hidden">
                    <div className="h-8 bg-gray-100 border-b border-border flex items-center justify-center text-xs text-muted-foreground gap-2">
                        <Monitor size={12} /> Live Preview
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 shadow-inner">
                        <div className="max-w-[1400px] mx-auto bg-background min-h-screen shadow-2xl border border-border rounded-sm origin-top">
                            {/* WE PASS BLOCKS TO RENDERER FOR LIVE PREVIEW */}
                            <PageRenderer blocks={blocks} />
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
}
