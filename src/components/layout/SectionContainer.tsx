import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export function SectionContainer({
    children,
    className,
    fullWidth = false,
    ...props
}: SectionContainerProps) {
    return (
        <section
            className={cn(
                "py-24 md:py-32 relative overflow-hidden", /* Increased padding for breathability */
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "mx-auto px-4 md:px-8",
                    fullWidth ? "max-w-full p-0" : "max-w-7xl"
                )}
            >
                {children}
            </div>
        </section>
    );
}
