"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").single();
    return data;
}

export async function updateSiteSettings(formData: FormData) {
    const supabase = await createClient();

    // Existing settings
    const hero_height = formData.get("hero_height") as string;
    const hero_opacity = parseInt(formData.get("hero_opacity") as string);
    const hero_cta_enabled = formData.get("hero_cta_enabled") === "on";
    const hero_padding = formData.get("hero_padding") as string;

    const heading_font = formData.get("heading_font") as string;
    const body_font = formData.get("body_font") as string;
    const base_size = parseInt(formData.get("base_size") as string);
    const line_height = parseFloat(formData.get("line_height") as string);

    const footer_text = formData.get("footer_text") as string;
    const contact_email = formData.get("contact_email") as string;
    const credits = formData.get("credits") as string;
    const last_updated_text = formData.get("last_updated_text") as string;

    // Theme Config Construction
    const theme_config = {
        primary_color: formData.get("theme_primary_text") || formData.get("theme_primary"),
        text_color: formData.get("theme_text_text") || formData.get("theme_text"),
        bg_color: formData.get("theme_bg_text") || formData.get("theme_bg"),
        border_radius: formData.get("theme_radius")
    };

    const home_hero_title = formData.get("home_hero_title") as string;
    const home_hero_subtitle = formData.get("home_hero_subtitle") as string;
    const home_hero_identity_text = formData.get("home_hero_identity_text") as string;
    const home_hero_bg_image = formData.get("home_hero_bg_image") as string;
    const home_hero_cta_text = formData.get("home_hero_cta_text") as string;
    const home_hero_cta_link = formData.get("home_hero_cta_link") as string;

    const legal_disclaimer = formData.get("legal_disclaimer") as string;

    const { error } = await supabase.from("site_settings").upsert({
        id: 1,
        hero_height,
        hero_opacity,
        hero_cta_enabled,
        hero_padding,
        heading_font,
        body_font,
        base_size,
        line_height,
        footer_text,
        contact_email,
        credits,
        last_updated_text,
        home_hero_title,
        home_hero_subtitle,
        home_hero_identity_text,
        home_hero_bg_image,
        home_hero_cta_text,
        home_hero_cta_link,
        legal_disclaimer,
        theme_config
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
}
