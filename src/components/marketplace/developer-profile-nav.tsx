"use client";
import { useEffect, useState } from "react";
import { Building2, FileText, MapPin, PanelsTopLeft } from "lucide-react";
import styles from "./developer-profile.module.css";
const items = [
    { id: "overview", label: "Overview", icon: PanelsTopLeft },
    { id: "developer-projects", label: "Projects", icon: Building2 },
    { id: "developer-location", label: "Location", icon: MapPin },
    { id: "developer-brochures", label: "Brochures", icon: FileText },
];
export function DeveloperProfileNav() {
    const [active, setActive] = useState("overview");
    useEffect(() => {
        const update = () => setActive(items.find((item) => `#${item.id}` === window.location.hash)?.id ?? "overview");
        update();
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, []);
    return <nav className={styles.sectionNav} aria-label="Developer profile sections">{items.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}><item.icon size={17} aria-hidden="true" />{item.label}</a>)}</nav>;
}
