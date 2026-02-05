"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
    id: string;
    label: string;
    path: string;
}

export function Navbar() {
    const [items, setItems] = useState<NavItem[]>([]);
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    // Don't show public navbar in admin
    if (pathname?.startsWith("/admin")) return null;

    useEffect(() => {
        // Check scroll for styling
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Fetch nav items
        const fetchItems = async () => {
            // Fallback default items if DB is empty to avoid invisible menu
            const defaultItems = [
                { id: '1', label: "Home", path: "/" },
                { id: '2', label: "About", path: "/#about" },
                { id: '3', label: "Siddhars", path: "/siddhars" },
                { id: '4', label: "Texts", path: "/#texts" },
                { id: '5', label: "Gallery", path: "/gallery" }
            ];

            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from("navigation_items")
                    .select("*")
                    .eq("is_active", true)
                    .order("sort_order");

                if (data && data.length > 0) {
                    // Fix relative hash links to be absolute so they work from subpages
                    const fixedData = data.map((item: NavItem) => ({
                        ...item,
                        path: item.path.startsWith('#') ? `/${item.path}` : item.path
                    }));
                    setItems(fixedData);
                } else {
                    setItems(defaultItems);
                }
            } catch (e) {
                console.error("Nav fetch error", e);
                setItems(defaultItems);
            }
        };
        fetchItems();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper to check active state
    const isActiveLink = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-500 pointer-events-none`}
        >
            <div
                className={`
          flex items-center gap-1 p-2 rounded-full border transition-all duration-500 pointer-events-auto
          ${scrolled
                        ? "bg-background/80 backdrop-blur-md border-white/10 shadow-lg px-6 py-3"
                        : "bg-transparent border-transparent px-2 py-2"
                    }
        `}
            >
                {items.length > 0 && items.map((item) => {
                    const isActive = isActiveLink(item.path);

                    return (
                        <Link key={item.id} href={item.path} className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-primary/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </motion.header>
    );
}
