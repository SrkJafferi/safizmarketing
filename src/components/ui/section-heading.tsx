import { cn } from "@/lib/utils";

/** Thin gold rule + letterspaced label, echoing the logo's "REAL ESTATE DIVISION" lockup. */
export function RuleLabel({
    children,
    className,
    tone = "dark",
    as: Tag = "p",
}: {
    children: React.ReactNode;
    className?: string;
    tone?: "dark" | "light";
    as?: "p" | "span" | "h2";
}) {
    return (
        <Tag
            className={cn(
                "flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
                tone === "dark" ? "text-gold-600" : "text-gold-300",
                className,
            )}
        >
            <span
                aria-hidden
                className="block h-px w-7 flex-none bg-current opacity-70"
            />
            {children}
        </Tag>
    );
}

type SectionHeadingProps = {
    eyebrow?: string;
    title: React.ReactNode;
    lead?: React.ReactNode;
    tone?: "dark" | "light";
    align?: "left" | "center";
    /** Renders as h1 on pages where the section is the page title. */
    level?: 1 | 2;
    /** Set when a section uses `aria-labelledby` to point at this heading. */
    id?: string;
    className?: string;
    children?: React.ReactNode;
};

export function SectionHeading({
    eyebrow,
    title,
    lead,
    tone = "dark",
    align = "left",
    level = 2,
    id,
    className,
    children,
}: SectionHeadingProps) {
    const Heading = level === 1 ? "h1" : "h2";
    return (
        <div
            className={cn(
                "flex flex-col gap-5",
                align === "center" && "items-center text-center",
                className,
            )}
        >
            {eyebrow ? <RuleLabel tone={tone}>{eyebrow}</RuleLabel> : null}
            <Heading
                id={id}
                className={cn(
                    "font-display text-display-md",
                    tone === "dark" ? "text-navy-950" : "text-ivory",
                )}
            >
                {title}
            </Heading>
            {lead ? (
                <p
                    className={cn(
                        "max-w-2xl text-[1.0625rem] leading-relaxed",
                        tone === "dark" ? "text-muted" : "text-ivory/70",
                        align === "center" && "mx-auto",
                    )}
                >
                    {lead}
                </p>
            ) : null}
            {children}
        </div>
    );
}

/** Italic serif emphasis used inside display headings. */
export function Accent({ children }: { children: React.ReactNode }) {
    return <em className="font-display italic text-gold-500">{children}</em>;
}
