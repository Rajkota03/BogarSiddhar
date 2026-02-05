"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createQuote(formData: FormData) {
    const supabase = await createClient();

    const content = formData.get("content") as string;
    const source = formData.get("source") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);

    const { error } = await supabase.from("quotes").insert({
        content,
        source,
        tags
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/quotes");
    redirect("/admin/quotes");
}

export async function updateQuote(id: string, formData: FormData) {
    const supabase = await createClient();

    const content = formData.get("content") as string;
    const source = formData.get("source") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);

    const { error } = await supabase.from("quotes").update({
        content,
        source,
        tags
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/quotes");
    revalidatePath(`/admin/quotes/${id}`);
    redirect("/admin/quotes");
}

export async function deleteQuote(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/quotes");
}
