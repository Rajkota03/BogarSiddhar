"use client";

import { createQuote, updateQuote } from "@/lib/actions/quotes";

interface QuoteFormProps {
    quote?: any;
}

export function QuoteForm({ quote }: QuoteFormProps) {
    const isEdit = !!quote;

    return (
        <form action={isEdit ? updateQuote.bind(null, quote.id) : createQuote} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <textarea
                    name="content"
                    defaultValue={quote?.content}
                    required
                    className="w-full bg-background border border-border p-3 rounded-md min-h-[100px] font-serif italic text-lg"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Source / Reference</label>
                <input
                    name="source"
                    defaultValue={quote?.source}
                    placeholder="e.g. Bhogar 7000"
                    className="w-full bg-background border border-border p-2 rounded-md"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <input
                    name="tags"
                    defaultValue={quote?.tags?.join(", ")}
                    placeholder="wisdom, alchemy, yoga"
                    className="w-full bg-background border border-border p-2 rounded-md"
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                    {isEdit ? "Save Quote" : "Create Quote"}
                </button>
            </div>
        </form>
    );
}
