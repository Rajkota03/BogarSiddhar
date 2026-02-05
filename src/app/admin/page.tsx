import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Layers, Image, Palette, Settings, Clock, ArrowRight, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Fetch Recents
    const { data: recentPages } = await supabase
        .from("pages")
        .select("id, title, updated_at, status")
        .order("updated_at", { ascending: false })
        .limit(5);

    const cards = [
        {
            title: "Pages / Sections",
            desc: "Manage all content and layouts.",
            href: "/admin/pages",
            icon: Layers,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Media Library",
            desc: "Upload and manage images.",
            href: "/admin/media",
            icon: Image,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Theme & Styles",
            desc: "Fonts, colors, and global look.",
            href: "/admin/theme",
            icon: Palette,
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        },
        {
            title: "Global Settings",
            desc: "Site identity, footer, and navigation.",
            href: "/admin/settings",
            icon: Settings,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
    ];

    return (
        <div className="space-y-12 max-w-6xl mx-auto pt-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Control Room</h1>
                <p className="text-muted-foreground mt-2">Welcome to the Bhogar Siddhar Archive admin.</p>
            </div>

            {/* Main Control Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group bg-background border border-border p-6 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1 block"
                    >
                        <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-muted/10 border border-border rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        Recently Edited
                    </h2>
                    <Link href="/admin/pages" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-1">
                    {recentPages?.map((page) => (
                        <Link
                            key={page.id}
                            href={`/admin/pages/${page.id}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-background hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-background border border-border rounded text-muted-foreground group-hover:text-primary transition-colors">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="font-medium">{page.title}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span>Edited {formatDistanceToNow(new Date(page.updated_at))} ago</span>
                                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                        <span className={page.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                                            {page.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-muted-foreground group-hover:text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Edit <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                    {recentPages?.length === 0 && (
                        <div className="text-muted-foreground text-sm italic py-4">
                            No recent activity.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
