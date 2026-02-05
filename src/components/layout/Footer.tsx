"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import Link from "next/link";

export function Footer({ settings }: { settings: any }) {
    if (!settings) return null;

    return (
        <footer className="bg-[#1a1410] text-muted-foreground pt-20 pb-12 border-t border-white/5 font-sans">
            <SectionContainer className="py-0 md:py-0 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* COL 1: ABOUT */}
                    <div className="space-y-6">
                        <h3 className="text-foreground font-serif text-lg tracking-wide">About the Archive</h3>
                        <p className="text-sm leading-relaxed opacity-80">
                            {settings.footer_text || "This website is a digital archive dedicated to preserving and sharing the life, teachings, and cultural legacy of Bhogar Siddhar within the Tamil Siddha tradition."}
                        </p>
                        <div className="pt-2">
                            <p className="text-xs uppercase tracking-widest opacity-50">Est. {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    {/* COL 2: EXPLORE */}
                    <div className="space-y-6">
                        <h3 className="text-foreground font-serif text-lg tracking-wide">Explore</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home Introduction</Link></li>
                            <li><Link href="/#about" className="hover:text-primary transition-colors">Review Biography</Link></li>
                            <li><Link href="/#teachings" className="hover:text-primary transition-colors">Core Philosophy</Link></li>
                            <li><Link href="/#texts" className="hover:text-primary transition-colors">Bhogar 7000</Link></li>
                            <li><Link href="/#gallery" className="hover:text-primary transition-colors">Visual Archive</Link></li>
                        </ul>
                    </div>

                    {/* COL 3: TRUST & REFERENCE */}
                    <div className="space-y-6">
                        <h3 className="text-foreground font-serif text-lg tracking-wide">Trust & Sources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/references" className="hover:text-primary transition-colors">Bibliography & Sources</Link></li>
                            <li><span className="opacity-50 cursor-not-allowed">Editorial Policy</span></li>
                            <li><span className="opacity-50 cursor-not-allowed">Academic Reviews</span></li>
                        </ul>
                        <p className="text-xs leading-relaxed opacity-60 border-l px-3 border-white/10">
                            We aim to distinguish between traditional beliefs, historical records, and oral lineages.
                        </p>
                    </div>

                    {/* COL 4: CONTACT & META */}
                    <div className="space-y-6">
                        <h3 className="text-foreground font-serif text-lg tracking-wide">Maintenance</h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="block text-xs uppercase tracking-widest opacity-50 mb-1">Contact</span>
                                {settings.contact_email || "contact@bhogar-archive.org"}
                            </p>
                            <p>
                                <span className="block text-xs uppercase tracking-widest opacity-50 mb-1 mt-4">Last Updated</span>
                                {settings.last_updated_text || "Current Month"}
                            </p>
                            <p className="text-xs opacity-50 pt-2 italic">
                                Corrections and contributions are welcome.
                            </p>
                        </div>
                    </div>

                </div>
            </SectionContainer>

            {/* BOTTOM BAR: LEGAL */}
            <div className="border-t border-white/5 pt-8">
                <SectionContainer className="py-0 md:py-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="text-xs opacity-50 space-y-2">
                            <p>© {settings.credits || "Bhogar Siddhar Archive"}. All rights reserved.</p>
                            <p>Content is licensed for educational use only.</p>
                        </div>

                        {settings.legal_disclaimer && (
                            <div className="md:text-right">
                                <p className="text-[10px] uppercase tracking-widest opacity-30 mb-2">Legal Disclaimer</p>
                                <p className="text-xs opacity-60 leading-relaxed max-w-md ml-auto">
                                    {settings.legal_disclaimer}
                                </p>
                            </div>
                        )}
                    </div>
                </SectionContainer>
            </div>
        </footer>
    );
}
