"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { genericWhatsappLink, whatsappAriaLabel } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useSiteScrollToTop } from "./site-smooth-scroll";

/**
 * Site-wide floating WhatsApp control.
 *
 * A compact green button with a label that expands on hover or keyboard focus.
 * The WhatsApp glyph is drawn inline so
 * there is no third-party script and nothing to load. It stays out of the way
 * until the user has scrolled past the hero, and lifts above the sticky mobile
 * enquiry bar on property pages via the `--fab-offset` custom property.
 */

export function WhatsappFloat() {
    const pathname = usePathname();
    const scrollToTop = useSiteScrollToTop();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 420);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    return (
        <div
            className={`whatsapp-floating pointer-events-none fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6 ${pathname.startsWith("/properties/") ? "unit-page-float" : ""}`}
            style={{ bottom: "calc(1rem + var(--fab-offset, 0px))" }}
        >
            {visible && (
                <button
                    type="button"
                    aria-label="Scroll to top"
                    className="pointer-events-auto grid size-11 place-items-center rounded-xl border-0 bg-gold-400 text-navy-950 shadow-lg transition-colors hover:bg-gold-300"
                    onClick={scrollToTop}
                >
                    <ArrowUp size={22} aria-hidden="true" />
                </button>
            )}
            <a
                href={genericWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={whatsappAriaLabel("property discovery")}
                tabIndex={visible ? 0 : -1}
                className={cn(
                    "group pointer-events-auto flex h-12 min-w-12 items-center justify-center rounded-full border-0 bg-[#1DA851] px-2.5 text-white shadow-[0_6px_18px_-6px_rgba(29,168,81,0.45)]",
                    "transition-[opacity,transform,background-color] duration-300 ease-[var(--ease-brand)]",
                    "hover:bg-[#199748]",
                    visible
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-4 opacity-0",
                )}
            >
                <WhatsappGlyph className="size-7 shrink-0" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold opacity-0 transition-[max-width,margin,opacity] duration-300 group-hover:ml-2.5 group-hover:mr-1.5 group-hover:max-w-32 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:mr-1.5 group-focus-visible:max-w-32 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    WhatsApp Us
                </span>
            </a>
        </div>
    );
}

/** Inline WhatsApp mark — avoids shipping an icon pack for one glyph. */
export function WhatsappGlyph({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className={className}
        >
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.86 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.78-1.31l-.34-.2-3.55.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.64 2.76a9.33 9.33 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4zM20.5 3.49A11.2 11.2 0 0 0 12.04 0C5.85 0 .81 5.03.81 11.22c0 1.98.52 3.91 1.5 5.62L.71 23.2l6.5-1.7a11.2 11.2 0 0 0 4.83 1.1h.01c6.18 0 11.22-5.03 11.22-11.22 0-3-1.17-5.82-3.29-7.9z" />
        </svg>
    );
}
