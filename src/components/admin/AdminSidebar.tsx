"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Layers, Image, Palette, Settings, LogOut } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();

    // STRICTLY streamlining to the 5 requested core modules
    const navItems = [
        { name: "Control Room", href: "/admin", icon: LayoutDashboard },
        { name: "Siddhars", href: "/admin/siddhars", icon: Layers },
        { name: "Sections (Pages)", href: "/admin/pages", icon: Layers },
        { name: "Media Library", href: "/admin/media", icon: Image },
        { name: "Theme / Styles", href: "/admin/theme", icon: Palette },
        { name: "Global Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 border-r border-border bg-muted/10 h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-border">
                <h1 className="font-serif text-xl text-primary font-bold">Bhogar CMS</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    // Highlight active if pathname starts with href (except root admin)
                    const isActive = item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
