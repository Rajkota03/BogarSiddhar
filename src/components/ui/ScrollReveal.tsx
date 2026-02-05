"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    variant?: "fade" | "slideUp" | "slideLeft" | "slideRight";
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    variant = "slideUp"
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants: Record<string, Variants> = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        slideUp: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        slideLeft: {
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 }
        },
        slideRight: {
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={variants[variant]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // Custom calm easing
                delay: delay
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
