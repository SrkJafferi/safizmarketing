"use client";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const banners = [
    {
        src: "/banners/banner1.avif",
        alt: "Editorial Islamabad skyline and terrace at sunset",
    },
    { src: "/banners/banner2.avif", alt: "Faisal Mosque in the evening" },
    {
        src: "/banners/banner3.avif",
        alt: "Islamabad avenue with the Margalla Hills beyond",
    },
];
export function HeroSlideshow() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused) return;
        const timer = window.setInterval(
            () => setActive((current) => (current + 1) % banners.length),
            4000,
        );
        return () => window.clearInterval(timer);
    }, [paused]);
    return (
        <>
            <div
                className={`rh-hero-slides ${paused ? "rh-slideshow-paused" : ""}`}
                role="region"
                aria-roledescription="carousel"
                aria-label="Property highlights"
                data-active-slide={active + 1}
            >
                {banners.map((banner, index) => (
                    <div
                        key={banner.src}
                        className={`rh-hero-slide ${index === active ? "is-active" : ""}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${banners.length}`}
                        aria-hidden={index !== active}
                    >
                        <Image
                            src={banner.src}
                            alt={banner.alt}
                            fill
                            sizes="100vw"
                            unoptimized
                            loading="eager"
                            fetchPriority={index === 0 ? "high" : "auto"}
                        />
                    </div>
                ))}
            </div>
            <button
                className="rh-slideshow-toggle"
                type="button"
                aria-label={`${paused ? "Resume" : "Pause"} banner slideshow`}
                onClick={() => setPaused((current) => !current)}
            >
                {paused ? (
                    <Play aria-hidden="true" />
                ) : (
                    <Pause aria-hidden="true" />
                )}
            </button>
        </>
    );
}
