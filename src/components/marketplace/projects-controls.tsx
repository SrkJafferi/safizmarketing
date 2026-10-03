"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Clock3, Grid2X2, House, MapPin, Users, ArrowRight } from "lucide-react";
import { HomeSearchField } from "./home-search-field";
import styles from "./projects-directory.module.css";
import type { ReactNode } from "react";

export type ProjectFilters = { city: string; type: string; developer: string; sort: string };
export function projectDirectoryHref(filters: ProjectFilters) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value !== "all" && value !== "featured") query.set(key, value); });
    return `/projects${query.size ? `?${query}` : ""}#project-listings`;
}
const categories = [
    { value: "all", label: "All Projects", icon: Building2 },
    { value: "residential", label: "Residential", icon: House },
    { value: "commercial", label: "Commercial", icon: Building2 },
    { value: "mixed-use", label: "Mixed-Use", icon: Grid2X2 },
    { value: "upcoming", label: "Upcoming", icon: Clock3 },
];
export function ProjectsControls({ filters, cities, developers, total, children }: {
    filters: ProjectFilters;
    cities: { value: string; label: string }[];
    developers: { value: string; label: string }[];
    total: number;
    children: ReactNode;
}) {
    const router = useRouter();
    return <>
        <form action="/projects" method="get" className={styles.search}>
            <div className={styles.searchField}><MapPin aria-hidden="true" /><HomeSearchField label="Location" name="city" className={styles.selectField} options={[{ value: "all", label: "All locations" }, ...cities]} key={`city-${filters.city}`} initialValue={filters.city} /></div>
            <div className={styles.searchField}><Building2 aria-hidden="true" /><HomeSearchField label="Project Type" name="type" className={styles.selectField} options={categories.map((item) => ({ value: item.value, label: item.value === "all" ? "All types" : item.label }))} key={`type-${filters.type}`} initialValue={filters.type} /></div>
            <div className={styles.searchField}><Users aria-hidden="true" /><HomeSearchField label="Developer" name="developer" className={styles.selectField} options={[{ value: "all", label: "All developers" }, ...developers]} key={`developer-${filters.developer}`} initialValue={filters.developer} /></div>
            <input type="hidden" name="sort" value={filters.sort} />
            <button type="submit" className={styles.find}>Find Projects<ArrowRight size={17} /></button>
        </form>
        <div className={styles.toolbar} id="project-listings">
            <nav className={styles.tabs} aria-label="Project categories">{categories.map((item) => <Link key={item.value} href={projectDirectoryHref({ ...filters, type: item.value })} aria-current={filters.type === item.value ? "page" : undefined}><item.icon size={17} aria-hidden="true" />{item.label}</Link>)}</nav>
            <h2 aria-live="polite">{total} Projects Found</h2>
            <div className={styles.sort}><span>Sort by</span><HomeSearchField label="Sort by" name="project-sort" hideLabel className={styles.sortField} value={filters.sort} options={[{ value: "featured", label: "Featured First" }, { value: "name-asc", label: "Name: A to Z" }, { value: "name-desc", label: "Name: Z to A" }]} onValueChange={(sort) => router.push(projectDirectoryHref({ ...filters, sort }))} /></div>
        </div>
        {children}
    </>;
}
