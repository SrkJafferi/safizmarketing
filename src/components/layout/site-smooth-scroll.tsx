"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import styles from "./site-smooth-scroll.module.css";

const SiteScrollContext = createContext<(() => void) | null>(null);
const nativeScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "instant" });
const SCROLL_DURATION = 0.85;
const easing = (progress: number) => 1 - Math.pow(1 - progress, 3);

/** No extra DOM: page content remains server-rendered inside this boundary. */
export function SiteSmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenis = useRef<Lenis | null>(null);
    const scrollToTop = useCallback(() => {
        if (lenis.current) lenis.current.scrollTo(0);
        else nativeScrollToTop();
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let restoreFocus: (() => void) | undefined;

        // Let Lenis control scrolling without competing with native CSS smoothing.
        const scrollRootClass = styles.scrollRoot!;
        root.classList.add(scrollRootClass);
        const destroy = () => {
            lenis.current?.destroy(); // Also cancels Lenis's autoRaf and ResizeObserver.
            lenis.current = null;
        };
        const syncMotion = () => {
            destroy();
            if (!motion.matches) {
                lenis.current = new Lenis({
                    autoRaf: true,
                    smoothWheel: true,
                    syncTouch: false,
                    duration: SCROLL_DURATION,
                    easing,
                    anchors: false,
                    stopInertiaOnNavigate: true,
                });
            }
        };

        const focusTarget = (target: HTMLElement) => {
            restoreFocus?.();
            if (target.tabIndex < 0 && !target.hasAttribute("tabindex")) {
                target.setAttribute("tabindex", "-1");
                const restore = () => {
                    target.removeEventListener("blur", restore);
                    target.removeAttribute("tabindex");
                    restoreFocus = undefined;
                };
                restoreFocus = restore;
                target.addEventListener("blur", restore, { once: true });
            }
            target.focus({ preventScroll: true });
        };
        const onAnchorClick = (event: MouseEvent) => {
            if (
                !lenis.current ||
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            )
                return;
            const link =
                event.target instanceof Element
                    ? event.target.closest("a[href]")
                    : null;
            if (
                !(link instanceof HTMLAnchorElement) ||
                link.hasAttribute("download") ||
                (link.target && link.target !== "_self")
            )
                return;
            const url = new URL(link.href);
            if (
                url.origin !== location.origin ||
                url.pathname !== location.pathname ||
                url.search !== location.search ||
                !url.hash
            )
                return;
            let id: string;
            try {
                id = decodeURIComponent(url.hash.slice(1));
            } catch {
                return;
            }
            const target = document.getElementById(id);
            if (!target) return;
            event.preventDefault();
            // Native history entries, with Next's history state retained for back/forward.
            if (url.hash !== location.hash)
                window.history.pushState(window.history.state, "", url);
            lenis.current.scrollTo(target, {
                onComplete: () => focusTarget(target),
            });
        };
        const stopForHistory = () => {
            lenis.current?.scrollTo(window.scrollY, { immediate: true });
        };

        syncMotion();
        motion.addEventListener("change", syncMotion);
        document.addEventListener("click", onAnchorClick);
        window.addEventListener("popstate", stopForHistory);
        return () => {
            motion.removeEventListener("change", syncMotion);
            document.removeEventListener("click", onAnchorClick);
            window.removeEventListener("popstate", stopForHistory);
            restoreFocus?.();
            destroy();
            root.classList.remove(scrollRootClass);
        };
    }, [pathname]);

    return (
        <SiteScrollContext.Provider value={scrollToTop}>
            {children}
        </SiteScrollContext.Provider>
    );
}

export function useSiteScrollToTop() {
    return useContext(SiteScrollContext) ?? nativeScrollToTop;
}
