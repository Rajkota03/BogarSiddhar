"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getHomeSections() {
    const supabase = await createClient();
    const { data } = await supabase.from("home_sections").select("*");
    // Transform array to object for easier key access
    const sections: Record<string, any> = {};
    data?.forEach(section => {
        sections[section.section_key] = section;
    });
    return sections;
}

export async function updateHomeSection(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;

    // We might want to handle content json updating here too, but for now just title/summary for the main list
    // Or simpler: specific update functions per section if structure varies too much.
    // For this generic 'Refine Hierarchy' task, let's assume we edit Title/Summary mainly.

    const { error } = await supabase.from("home_sections").update({
        title,
        summary
    }).eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/");
    revalidatePath("/admin/home-sections");
}
