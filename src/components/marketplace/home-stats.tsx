"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Users, MapPin, Handshake } from "lucide-react";
import styles from "./home-stats.module.css";

type CounterValues = {
    properties: number;
    developers: number;
    locations: number;
    clients: number;
};

export function HomeStats({ totals }: { totals: CounterValues }) {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        let frame = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const start = performance.now();
            const animate = (now: number) => {
                const elapsed = reduceMotion ? 1 : Math.min((now - start) / 1800, 1);
                setProgress(1 - Math.pow(1 - elapsed, 3));
                if (elapsed < 1) frame = requestAnimationFrame(animate);
            };
            frame = requestAnimationFrame(animate);
        }, { threshold: 0.2 });
        observer.observe(section);
        return () => { observer.disconnect(); cancelAnimationFrame(frame); };
    }, []);

    const counters = [
        { icon: Building2, value: totals.properties, label: "Properties Listed" },
        { icon: Users, value: totals.developers, label: "Trusted Developers" },
        { icon: MapPin, value: totals.locations, label: "Prime Locations" },
        { icon: Handshake, value: totals.clients, label: "Happy Clients" },
    ];

    return (
        <section ref={sectionRef} className={styles.section} aria-label="SAFIZ MARKETING at a glance">
            <div className={styles.grid}>
                {counters.map(({ icon: Icon, value, label }) => (
                    <div className={styles.card} key={label}>
                        <span className={styles.icon}><Icon aria-hidden="true" /></span>
                        <strong className={styles.number} aria-hidden="true">{new Intl.NumberFormat("en-PK").format(Math.round(value * progress))}<span>+</span></strong>
                        <span className="sr-only">{value.toLocaleString("en-PK")} or more</span>
                        <p>{label}</p>
                        <span className={styles.line} aria-hidden="true" />
                    </div>
                ))}
            </div>
        </section>
    );
}
