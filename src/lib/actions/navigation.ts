"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNavItem(formData: FormData) {
    const supabase = await createClient();

    const label = formData.get("label") as string;
    const path = formData.get("path") as string;
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;
    const is_active = formData.get("is_active") === "on";

    const { error } = await supabase.from("navigation_items").insert({
        label,
        path,
        sort_order,
        is_active
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout"); // Update public site
    redirect("/admin/navigation");
}

export async function updateNavItem(id: string, formData: FormData) {
    const supabase = await createClient();

    const label = formData.get("label") as string;
    const path = formData.get("path") as string;
    const sort_order = parseInt(formData.get("sort_order") as string) || 0;
    const is_active = formData.get("is_active") === "on";

    const { error } = await supabase.from("navigation_items").update({
        label,
        path,
        sort_order,
        is_active
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout");
    redirect("/admin/navigation");
}

export async function deleteNavItem(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("navigation_items").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout");
}
