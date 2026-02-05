"use client";

import { createNavItem, updateNavItem } from "@/lib/actions/navigation";

interface NavFormProps {
    item?: any;
}

export function NavForm({ item }: NavFormProps) {
    const isEdit = !!item;

    return (
        <form action={isEdit ? updateNavItem.bind(null, item.id) : createNavItem} className="space-y-6 max-w-xl">
            <div className="space-y-2">
                <label className="text-sm font-medium">Label</label>
                <input
                    name="label"
                    defaultValue={item?.label}
                    required
                    placeholder="e.g. Home"
                    className="w-full bg-background border border-border p-2 rounded-md"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Path / URL</label>
                <input
                    name="path"
                    defaultValue={item?.path}
                    required
                    placeholder="e.g. /about or /#section"
                    className="w-full bg-background border border-border p-2 rounded-md"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Sort Order</label>
                    <input
                        name="sort_order"
                        type="number"
                        defaultValue={item?.sort_order || 0}
                        className="w-full bg-background border border-border p-2 rounded-md"
                    />
                </div>
                <div className="space-y-2 flex items-center pt-8">
                    <input
                        type="checkbox"
                        name="is_active"
                        defaultChecked={item?.is_active ?? true}
                        className="w-4 h-4 mr-2"
                    />
                    <label className="text-sm font-medium">Active (Visible)</label>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-primary text-background px-6 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                    {isEdit ? "Save Item" : "Create Link"}
                </button>
            </div>
        </form>
    );
}
