import { cn } from "@/lib/utils";

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    /** `wide` is used by full-bleed editorial sections. */
    size?: "default" | "wide" | "narrow";
    as?: "div" | "section" | "header" | "footer" | "nav" | "article";
};

export function Container({
    children,
    className,
    size = "default",
    as: Tag = "div",
}: ContainerProps) {
    return (
        <Tag
            className={cn(
                "mx-auto w-full px-5 sm:px-8",
                size === "default" && "max-w-[82rem] lg:px-12",
                size === "wide" && "max-w-[96rem] lg:px-12",
                size === "narrow" && "max-w-3xl lg:px-8",
                className,
            )}
        >
            {children}
        </Tag>
    );
}
