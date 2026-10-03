"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * One-shot scroll reveal.
 *
 * A single module-level IntersectionObserver serves every <Reveal> on the page
 * — adding more of them costs one `observe()` call each, not another observer.
 * The animation itself lives in CSS and is disabled under
 * `prefers-reduced-motion`, so the only JS involved is flipping one attribute.
 */

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
    if (typeof IntersectionObserver === "undefined") return null;
    observer ??= new IntersectionObserver(
        (entries, obs) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.setAttribute("data-revealed", "true");
                obs.unobserve(entry.target);
            }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    return observer;
}

type RevealTag = "div" | "li" | "article" | "section" | "figure";

export function Reveal({
    children,
    className,
    delay = 0,
    as: Tag = "div",
}: {
    children: React.ReactNode;
    className?: string;
    /** Seconds of stagger, applied as an animation-delay. */
    delay?: number;
    as?: RevealTag;
}) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = getObserver();
        if (!io) {
            node.setAttribute("data-revealed", "true");
            return;
        }
        io.observe(node);
        return () => io.unobserve(node);
    }, []);

    return (
        <Tag
            ref={ref as never}
            data-reveal=""
            data-revealed="false"
            style={delay ? { animationDelay: `${delay}s` } : undefined}
            className={cn(className)}
        >
            {children}
        </Tag>
    );
}
