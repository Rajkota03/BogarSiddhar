"use client";

import { duplicatePage, deletePage } from "@/lib/actions/pages";
import { Copy, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner"; // Optional, but good practice

export function DuplicateButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDuplicate = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                await duplicatePage(id);
            } catch (err) {
                alert("Failed to duplicate");
            }
        });
    };

    return (
        <form onSubmit={handleDuplicate}>
            <button
                disabled={isPending}
                className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-blue-500 transition-colors disabled:opacity-50"
                title="Duplicate Page"
            >
                <Copy className="w-4 h-4" />
            </button>
        </form>
    );
}

export function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) return;

        startTransition(async () => {
            try {
                await deletePage(id);
            } catch (err) {
                alert("Failed to delete");
            }
        });
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                disabled={isPending}
                className="p-2 hover:bg-red-50 rounded-md text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                title="Delete Page"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </form>
    );
}
