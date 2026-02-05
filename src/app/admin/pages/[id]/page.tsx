import { PageForm } from "@/components/admin/PageForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditPagePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = await params;
    const { blockId } = await searchParams;
    const supabase = await createClient();
    const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();

    if (!page) {
        notFound();
    }

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col">
            <PageForm page={page} initialBlockId={blockId as string} />
        </div>
    );
}
