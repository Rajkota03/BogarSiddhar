import { createClient } from "@/lib/supabase/client";
// Using client library for public-facing read for simplicity (anon key is fine), 
// but usually server client is better for Metadata.
import { createClient as createServerClient } from "@/lib/supabase/server";
import { BlockRenderer } from "@/components/content/BlockRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Force dynamic rendering since data comes from DB
export const dynamic = 'force-dynamic';

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const supabase = await createServerClient();
    const { data: page } = await supabase
        .from("pages")
        .select("seo_title, seo_description, title")
        .eq("slug", params.slug)
        .eq("status", "published")
        .single();

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: page.seo_title || page.title,
        description: page.seo_description,
    };
}

export default async function DynamicPage({ params }: PageProps) {
    const supabase = await createServerClient();
    const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", params.slug)
        .eq("status", "published")
        .single();

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background font-sans text-foreground">
            {/* If page has no blocks or specifically doesn't start with hero, maybe add a default header? 
          For now, we assume the user adds a Hero block if they want one. 
          Or we render a simple title if no hero exists. */}

            {!page.content_blocks?.find((b: any) => b.type === 'hero') && (
                <div className="pt-24 pb-12 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">{page.title}</h1>
                </div>
            )}

            <BlockRenderer blocks={page.content_blocks} />
        </main>
    );
}
