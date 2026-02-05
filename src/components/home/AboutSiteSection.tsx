"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import Link from "next/link";

export function AboutSiteSection() {
    return null;
}

export function Footer({ settings }: { settings: any }) {
    if (!settings) return null;

    return (
        <footer className="bg-[#1a1410] text-muted-foreground py-20 border-t border-white/5">
            <SectionContainer className="py-0 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-foreground font-serif text-xl mb-4">About This Archive</h3>
                        <p className="text-sm leading-relaxed max-w-md mb-6">
                            {settings.footer_text || "Dedicated to preserving the legacy of Bhogar Siddhar."}
                        </p>

                        {/* DISCLAIMER */}
                        {settings.legal_disclaimer && (
                            <div className="mb-6 p-4 bg-white/5 border border-white/5 rounded-sm">
                                <p className="text-xs opacity-70 leading-relaxed text-justify">
                                    {settings.legal_disclaimer}
                                </p>
                            </div>
                        )}

                        <p className="text-xs opacity-50">
                            © {new Date().getFullYear()} {settings.credits || "Bhogar Siddhar Archive"}. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col justify-end md:items-end">
                        <nav className="flex flex-wrap gap-6 text-sm mb-4 justify-end">
                            <Link href="/#about" className="hover:text-primary transition-colors">History</Link>
                            <Link href="/#teachings" className="hover:text-primary transition-colors">Philosophy</Link>
                            <Link href="/references" className="hover:text-primary transition-colors">Sources & References</Link>
                        </nav>
                        <p className="text-xs opacity-50 text-right max-w-xs">
                            {settings.contact_email && `Contact: ${settings.contact_email}`}
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </footer>
    );
}
