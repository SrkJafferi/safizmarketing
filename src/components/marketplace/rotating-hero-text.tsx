"use client";

import { useEffect, useState } from "react";

const phrases = [
    "Trusted Connections.",
    "Curated Listings.",
    "Developer Access.",
    "Direct Enquiries.",
    "Property Opportunities.",
];
const VISIBLE_MS = 3200;
const HALF_TRANSITION_MS = 325;
type Phase = "visible" | "leaving" | "entering";

export function RotatingHeroText() {
    const [line, setLine] = useState<{ index: number; phase: Phase }>({
        index: 0,
        phase: "visible",
    });

    useEffect(() => {
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let timer: ReturnType<typeof setTimeout>;
        let index = 0;

        const schedule = () => {
            timer = setTimeout(() => {
                setLine({ index, phase: "leaving" });
                timer = setTimeout(() => {
                    index = (index + 1) % phrases.length;
                    setLine({ index, phase: "entering" });
                    timer = setTimeout(() => {
                        setLine({ index, phase: "visible" });
                        schedule();
                    }, HALF_TRANSITION_MS);
                }, HALF_TRANSITION_MS);
            }, VISIBLE_MS);
        };
        const syncMotion = () => {
            clearTimeout(timer);
            index = 0;
            setLine({ index: 0, phase: "visible" });
            if (!motion.matches) schedule();
        };

        if (!motion.matches) schedule();
        motion.addEventListener("change", syncMotion);
        return () => {
            clearTimeout(timer);
            motion.removeEventListener("change", syncMotion);
        };
    }, []);

    return (
        <em className="rh-rotating-hero">
            <span className="rh-rotating-hero-reserve" aria-hidden="true">
                Property Opportunities.
            </span>
            <span
                className={`rh-rotating-hero-phrase is-${line.phase}`}
                aria-hidden="true"
            >
                {phrases[line.index]}
            </span>
            <span className="rh-rotating-hero-static" aria-hidden="true">
                Trusted Connections.
            </span>
            <span className="sr-only">Trusted Connections.</span>
        </em>
    );
}
