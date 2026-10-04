import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
    "gold" | "navy" | "outline" | "outline-light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
    "group/btn relative inline-flex items-center justify-center gap-2.5 font-semibold " +
    "transition-[background-color,color,border-color,box-shadow,transform] duration-300 " +
    "ease-[var(--ease-brand)] select-none whitespace-nowrap " +
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
    gold:
        "bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-[0_1px_2px_rgba(8,32,56,0.08)] " +
        "hover:shadow-[0_8px_24px_-8px_rgba(181,124,30,0.55)]",
    navy: "bg-navy-900 text-ivory hover:bg-navy-800",
    outline:
        "border border-navy-900/20 text-navy-900 hover:border-navy-900/45 hover:bg-navy-900/[0.035]",
    "outline-light":
        "border border-ivory/30 text-ivory backdrop-blur-[2px] hover:border-gold-300/70 hover:bg-ivory/[0.07] hover:text-white",
    ghost: "text-navy-900 hover:bg-navy-900/[0.05]",
    whatsapp: "bg-[#1DA851] text-white hover:bg-[#199748]",
};

const sizes: Record<Size, string> = {
    sm: "h-10 px-4 text-[13px] tracking-[0.06em] uppercase rounded-xl",
    md: "h-12 px-6 text-[13px] tracking-[0.08em] uppercase rounded-xl",
    lg: "h-14 px-8 text-[13px] tracking-[0.09em] uppercase rounded-xl",
};

type CommonProps = {
    variant?: Variant;
    size?: Size;
    className?: string;
    children: React.ReactNode;
};

export function Button({
    variant = "gold",
    size = "md",
    className,
    children,
    ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(base, variants[variant], sizes[size], className)}
            {...rest}
        >
            {children}
        </button>
    );
}

export function ButtonLink({
    variant = "gold",
    size = "md",
    className,
    children,
    href,
    ...rest
}: CommonProps & React.ComponentProps<typeof Link>) {
    return (
        <Link
            href={href}
            className={cn(base, variants[variant], sizes[size], className)}
            {...rest}
        >
            {children}
        </Link>
    );
}

/** External links (WhatsApp, tel:) — always `rel="noreferrer"` when targeting a new tab. */
export function ButtonAnchor({
    variant = "gold",
    size = "md",
    className,
    children,
    target,
    ...rest
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            className={cn(base, variants[variant], sizes[size], className)}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            {...rest}
        >
            {children}
        </a>
    );
}
