"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGalleryItem(formData: FormData) {
    const supabase = await createClient();

    const image_path = formData.get("image_path") as string;
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;

    const { error } = await supabase.from("gallery_items").insert({
        image_path,
        caption,
        category,
        location,
        tags,
        sort_order
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gallery");
    redirect("/admin/gallery");
}

export async function updateGalleryItem(id: string, formData: FormData) {
    const supabase = await createClient();

    const image_path = formData.get("image_path") as string;
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;

    const { error } = await supabase.from("gallery_items").update({
        image_path,
        caption,
        category,
        location,
        tags,
        sort_order
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gallery");
    revalidatePath(`/admin/gallery/${id}`);
    redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/admin/gallery");
}
