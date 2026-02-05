"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { createArticle, updateArticle } from "@/lib/actions/articles";

interface ArticleFormProps {
    article?: any; // Type strictly in real app
}

export function ArticleForm({ article }: ArticleFormProps) {
    const [content, setContent] = useState(article?.content || {});
    const isEdit = !!article;

    return (
        <form action={isEdit ? updateArticle.bind(null, article.id) : createArticle} className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        defaultValue={article?.title}
                        required
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <input
                        name="slug"
                        defaultValue={article?.slug}
                        required
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Summary</label>
                <textarea
                    name="summary"
                    defaultValue={article?.summary}
                    className="w-full bg-background border border-border p-2 rounded-md h-24"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                {/* Hidden input to submit content JSON */}
                <input type="hidden" name="content" value={JSON.stringify(content)} />
                <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                    name="status"
                    defaultValue={article?.status || "draft"}
                    className="w-full bg-background border border-border p-2 rounded-md"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="submit"
                    className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                    {isEdit ? "Update Article" : "Create Article"}
                </button>
            </div>
        </form>
    );
}
