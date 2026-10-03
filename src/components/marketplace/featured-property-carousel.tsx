"use client";

import { Children, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

const SLIDE_INTERVAL = 3500;

export function FeaturedPropertyCarousel({ children }: { children: ReactNode }) {
    const cards = useMemo(() => Children.toArray(children).slice(0, 10), [children]);
    const viewport = useRef<HTMLDivElement>(null);
    const started = useRef(false);
    const [offset, setOffset] = useState(0);
    const [moving, setMoving] = useState(false);
    const [visible, setVisible] = useState(4);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const count = cards.length;
    const stopped = hovered || focused || reducedMotion;

    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const update = () => setVisible(
            Number.parseInt(getComputedStyle(element).getPropertyValue("--rh-carousel-visible"), 10) || 4,
        );
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            setReducedMotion(media.matches);
            if (media.matches) setMoving(false);
        };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (stopped || count <= visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // Start the first slide as soon as the initial cards have painted.
        let frame = 0;
        if (!started.current) {
            frame = window.requestAnimationFrame(() => {
                frame = window.requestAnimationFrame(() => {
                    started.current = true;
                    setMoving(true);
                });
            });
        }
        const timer = window.setInterval(() => setMoving(true), SLIDE_INTERVAL);
        return () => {
            window.cancelAnimationFrame(frame);
            window.clearInterval(timer);
        };
    }, [stopped, count, visible]);

    function next() {
        if (reducedMotion) setOffset((current) => (current + 1) % count);
        else setMoving(true);
    }

    return (
        <div
            className="rh-property-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured properties"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => setFocused(!!viewport.current?.contains(event.target))}
            onBlurCapture={(event) => {
                setFocused(!!viewport.current?.contains(event.relatedTarget));
            }}
            data-first-property={offset + 1}
            data-property-count={count}
        >
            <div className="rh-carousel-viewport" ref={viewport}>
                <div
                    className={`rh-property-grid rh-carousel-track${moving ? " is-sliding" : ""}`}
                    onTransitionEnd={(event) => {
                        if (event.target !== event.currentTarget || event.propertyName !== "transform" || !moving) return;
                        // Rotate the same ten cards after each step; no duplicate listings or visible loop reset.
                        setOffset((current) => (current + 1) % count);
                        setMoving(false);
                    }}
                >
                    {cards.map((_, position) => {
                        const index = (offset + position) % count;
                        const hidden = position >= visible + (moving ? 1 : 0);
                        return (
                            <div
                                className="rh-carousel-item"
                                key={index}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Property ${index + 1} of ${count}`}
                                aria-hidden={hidden || undefined}
                                inert={hidden}
                            >
                                {cards[index]}
                            </div>
                        );
                    })}
                </div>
            </div>
            {count > visible && (
                <div className="rh-carousel-controls">
                    <button type="button" aria-label="Next featured property" onClick={next} disabled={moving}>
                        <ChevronRight aria-hidden="true" />
                    </button>
                </div>
            )}
        </div>
    );
}
