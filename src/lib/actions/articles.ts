"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string; // JSON string
    const status = formData.get("status") as string;

    const { error } = await supabase.from("articles").insert({
        title,
        slug,
        summary,
        content: JSON.parse(content),
        status,
        updated_at: new Date().toISOString()
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/articles");
    redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("articles").update({
        title,
        slug,
        summary,
        content: JSON.parse(content),
        status,
        updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/articles");
    revalidatePath("/admin/articles/[id]");
    redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/admin/articles");
}
