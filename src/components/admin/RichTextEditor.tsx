"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
    content: string | object | any;
    onChange: (content: any) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
            },
        },
    });

    if (!editor) return null;

    return (
        <div className="border border-border rounded-md overflow-hidden bg-background">
            <div className="bg-muted px-2 py-2 border-b border-border flex gap-1 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("bold") && "text-primary bg-background")}
                    type="button"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("italic") && "text-primary bg-background")}
                    type="button"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("heading", { level: 2 }) && "text-primary bg-background")}
                    type="button"
                >
                    <Heading1 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("heading", { level: 3 }) && "text-primary bg-background")}
                    type="button"
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <div className="w-px bg-border mx-1" />
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("bulletList") && "text-primary bg-background")}
                    type="button"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("orderedList") && "text-primary bg-background")}
                    type="button"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn("p-2 rounded hover:bg-background", editor.isActive("blockquote") && "text-primary bg-background")}
                    type="button"
                >
                    <Quote className="w-4 h-4" />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
