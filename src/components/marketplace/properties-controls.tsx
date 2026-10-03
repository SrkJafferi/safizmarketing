"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { ChevronDown, Grid2X2, List } from "lucide-react";
import type { SearchFilters } from "@/lib/marketplace-search";
import styles from "./properties-directory.module.css";
import { HomeSearchField } from "./home-search-field";

export type FilterOption = { value: string; label: string; count: number };
export type DirectoryOptions = {
    cities: FilterOption[];
    areas: FilterOption[];
    types: FilterOption[];
    projects: FilterOption[];
    developers: FilterOption[];
    floors: string[];
    bedrooms: string[];
};
const prices = [
    { value: "any", label: "Any Price" },
    { value: "under-10m", label: "Under PKR 10 million" },
    { value: "10m-20m", label: "PKR 10–20 million" },
    { value: "20m-40m", label: "PKR 20–40 million" },
    { value: "over-40m", label: "PKR 40 million +" },
];
const sorts = [
    { value: "featured", label: "Featured First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "size-asc", label: "Size: Small to Large" },
    { value: "size-desc", label: "Size: Large to Small" },
    { value: "title-asc", label: "Unit: A to Z" },
];
function directoryHref(filters: SearchFilters, view: string) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters))
        if (value && value !== "all" && value !== "any") query.set(key, value);
    if (view === "list") query.set("view", view);
    return `/properties?${query.toString()}#property-listings`;
}

export function PropertiesControls({ filters, options, total, view, children }: {
    filters: SearchFilters;
    options: DirectoryOptions;
    total: number;
    view: "grid" | "list";
    children: ReactNode;
}) {
    const router = useRouter();
    const [draft, setDraft] = useState(filters);
    const [locationQuery, setLocationQuery] = useState("");
    const [projectQuery, setProjectQuery] = useState("");
    const [pending, startTransition] = useTransition();
    const change = (key: keyof SearchFilters, value: string) =>
        setDraft((current) => ({ ...current, [key]: value }));
    const apply = (next = draft) => startTransition(() => router.push(directoryHref(next, view)));
    const toggle = (key: keyof SearchFilters, value: string) => {
        const selected = draft[key] === "all" ? [] : draft[key].split("|");
        const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
        change(key, next.length ? next.join("|") : "all");
    };
    const select = (label: string, key: keyof SearchFilters, values: { value: string; label: string }[]) => (
        <HomeSearchField label={label} name={key} className={styles.selectField}
            value={draft[key]} onValueChange={(value) => change(key, value)}
            options={draft[key].includes("|") ? [{ value: draft[key], label: "Multiple selected" }, ...values] : values} />
    );
    const checkbox = (key: keyof SearchFilters, option: FilterOption) => (
        <label className={styles.checkRow} key={`${key}:${option.value}`}>
            <input type="checkbox" checked={draft[key].split("|").includes(option.value)} onChange={() => toggle(key, option.value)} />
            <span>{option.label}</span><span className={styles.optionCount}>{option.count}</span>
        </label>
    );
    const range = (label: string, min: keyof SearchFilters, max: keyof SearchFilters) => (
        <details className={styles.filterGroup} open>
            <summary>{label}<ChevronDown size={13} /></summary>
            {min === "minPrice" && select("Price Band", "price", prices)}
            <div className={styles.range}>
                <input aria-label={`Minimum ${label}`} type="number" min="0" step="any" placeholder="Min" value={draft[min]} onChange={(e) => change(min, e.target.value)} />
                <span>–</span>
                <input aria-label={`Maximum ${label}`} type="number" min="0" step="any" placeholder="Max" value={draft[max]} onChange={(e) => change(max, e.target.value)} />
            </div>
        </details>
    );
    const matches = (option: FilterOption, query: string) => option.label.toLowerCase().includes(query.toLowerCase());
    return (
        <form className={styles.directoryForm} onSubmit={(event) => { event.preventDefault(); apply(); }} aria-busy={pending}>
            <div className={styles.listingLayout} id="property-listings">
                <aside className={styles.sidebar} aria-label="Property filters">
                    <div className={styles.sidebarHead}><h2>Filters</h2><Link href="/properties#property-listings">Clear All</Link></div>
                    <label className={styles.keyword}><span>Keyword / Unit</span><input className={styles.filterSearch} value={draft.q} maxLength={100} placeholder="Unit, project or neighbourhood" onChange={(e) => change("q", e.target.value)} /></label>
                    <details className={styles.filterGroup} open>
                        <summary>Location<ChevronDown size={13} /></summary>
                        <input className={styles.filterSearch} aria-label="Search location options" placeholder="Search location…" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
                        {options.cities.filter((o) => matches(o, locationQuery)).map((o) => checkbox("city", o))}
                        {options.areas.filter((o) => matches(o, locationQuery)).map((o) => checkbox("area", o))}
                    </details>
                    <details className={styles.filterGroup} open>
                        <summary>Property Type<ChevronDown size={13} /></summary>
                        <label className={styles.checkRow}><input type="checkbox" checked={draft.type === "all"} onChange={() => change("type", "all")} /><span>All Types</span><span className={styles.optionCount}>{options.cities.reduce((n, o) => n + o.count, 0)}</span></label>
                        {options.types.map((o) => checkbox("type", o))}
                    </details>
                    {range("Price Range (PKR)", "minPrice", "maxPrice")}
                    {range("Size (Sq.Ft)", "minSize", "maxSize")}
                    <details className={styles.filterGroup} open>
                        <summary>Project / Developer<ChevronDown size={13} /></summary>
                        <input className={styles.filterSearch} aria-label="Search project options" placeholder="Search project…" value={projectQuery} onChange={(e) => setProjectQuery(e.target.value)} />
                        {options.projects.filter((o) => matches(o, projectQuery)).map((o) => checkbox("project", o))}
                        {options.developers.filter((o) => matches(o, projectQuery)).map((o) => checkbox("developer", o))}
                    </details>
                    <details className={styles.filterGroup} open={filters.floor !== "all" || filters.bedrooms !== "all"}>
                        <summary>More Filters<ChevronDown size={13} /></summary>
                        {select("Floor", "floor", [{ value: "all", label: "Any Floor" }, ...options.floors.map((floor) => ({ value: floor, label: floor }))])}
                        {select("Bedrooms", "bedrooms", [{ value: "all", label: "Any Bedrooms" }, ...options.bedrooms.map((value) => ({ value, label: `${value} bedrooms` }))])}
                    </details>
                    <button className={styles.navyButton} type="submit" disabled={pending}>{pending ? "Applying…" : "Apply Filters"}</button>
                </aside>
                <div className={styles.listings}>
                    <div className={styles.toolbar}>
                        <h2 aria-live="polite">{total} Properties Found</h2>
                        <div className={styles.toolbarControls}>
                            <div className={styles.viewToggle}>
                                <Link href={directoryHref(filters, "grid")} aria-label="Grid view" aria-current={view === "grid" ? "page" : undefined}><Grid2X2 size={18} /></Link>
                                <Link href={directoryHref(filters, "list")} aria-label="List view" aria-current={view === "list" ? "page" : undefined}><List size={18} /></Link>
                            </div>
                            <div className={styles.sort}><span>Sort by</span>
                                <HomeSearchField label="Sort by" name="sort" hideLabel className={styles.sortField}
                                    value={filters.sort} options={sorts} onValueChange={(sort) => apply({ ...filters, sort })} />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </form>
    );
}
