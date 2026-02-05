"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlace(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image_path = formData.get("image_path") as string;
    const latitude = parseFloat(formData.get("latitude") as string) || null;
    const longitude = parseFloat(formData.get("longitude") as string) || null;

    const { error } = await supabase.from("sacred_places").insert({
        name,
        description,
        image_path,
        latitude,
        longitude
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/places");
    redirect("/admin/places");
}

export async function updatePlace(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image_path = formData.get("image_path") as string;
    const latitude = parseFloat(formData.get("latitude") as string) || null;
    const longitude = parseFloat(formData.get("longitude") as string) || null;

    const { error } = await supabase.from("sacred_places").update({
        name,
        description,
        image_path,
        latitude,
        longitude
    }).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/places");
    revalidatePath(`/admin/places/${id}`);
    redirect("/admin/places");
}

export async function deletePlace(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("sacred_places").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/places");
}
