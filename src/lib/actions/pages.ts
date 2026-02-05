"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPage(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const seo_title = formData.get("seo_title") as string;
    const seo_description = formData.get("seo_description") as string;
    const content_blocks = formData.get("content_blocks") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("pages").insert({
        title,
        slug,
        seo_title,
        seo_description,
        content_blocks: JSON.parse(content_blocks),
        status,
        updated_at: new Date().toISOString()
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/pages");
    redirect("/admin/pages");
}

export async function updatePage(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const seo_title = formData.get("seo_title") as string;
    const seo_description = formData.get("seo_description") as string;
    const content_blocks = formData.get("content_blocks") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("pages").update({
        title,
        slug,
        seo_title,
        seo_description,
        content_blocks: JSON.parse(content_blocks),
        status,
        updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/pages");
    revalidatePath(`/admin/pages/${id}`);
    redirect("/admin/pages");
}

export async function deletePage(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("pages").delete().eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/admin/pages");
}

export async function duplicatePage(id: string) {
    const supabase = await createClient();

    // 1. Fetch original
    const { data: original } = await supabase.from("pages").select("*").eq("id", id).single();
    if (!original) throw new Error("Page not found");

    // 2. Insert copy
    const { error } = await supabase.from("pages").insert({
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
        status: 'draft',
        content_blocks: original.content_blocks,
        seo_title: original.seo_title,
        seo_description: original.seo_description
    });

    if (error) throw new Error(error.message);

    revalidatePath("/admin/pages");
}
