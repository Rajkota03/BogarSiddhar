"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSiddhar(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const image_path = formData.get("image_path") as string;
    const expertise = (formData.get("expertise") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [];
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;

    const { error } = await supabase.from("siddhars").insert({
        name,
        title,
        bio,
        image_path,
        expertise,
        sort_order
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/siddhars");
    revalidatePath("/siddhars");
    redirect("/admin/siddhars");
}

export async function updateSiddhar(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const image_path = formData.get("image_path") as string;
    const expertise = (formData.get("expertise") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [];
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;

    const { error } = await supabase.from("siddhars").update({
        name,
        title,
        bio,
        image_path,
        expertise,
        sort_order,
        updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/siddhars");
    revalidatePath("/siddhars");
    redirect("/admin/siddhars");
}

export async function deleteSiddhar(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("siddhars").delete().eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/admin/siddhars");
    revalidatePath("/siddhars");
}
