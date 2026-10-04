import {
    getDeveloper,
    getProject,
    developers,
    projects,
    propertyUnits,
    unitTypeLabel,
} from "@/data/marketplace";
import type { PropertyUnit } from "@/types/marketplace";
import { listingAmount, supportsPurpose } from "@/lib/listings";
export type SearchFilters = {
    purpose: string;
    q: string;
    city: string;
    type: string;
    project: string;
    developer: string;
    price: string;
    floor: string;
    bedrooms: string;
    sort: string;
    area: string;
    minPrice: string;
    maxPrice: string;
    minSize: string;
    maxSize: string;
};
export const searchDefaults: SearchFilters = {
    purpose: "sale",
    q: "",
    city: "all",
    type: "all",
    project: "all",
    developer: "all",
    price: "any",
    floor: "all",
    bedrooms: "all",
    sort: "featured",
    area: "all",
    minPrice: "",
    maxPrice: "",
    minSize: "",
    maxSize: "",
};
export function parseSearch(
    params: Record<string, string | string[] | undefined>,
): SearchFilters {
    const result = { ...searchDefaults };
    const choices: Partial<Record<keyof SearchFilters, string[]>> = {
        purpose: ["sale", "rent"],
        city: ["all", ...projects.map((p) => p.city)],
        type: ["all", "commercial", ...propertyUnits.map((u) => u.type)],
        project: ["all", ...projects.map((p) => p.id)],
        developer: ["all", ...developers.map((d) => d.id)],
        area: ["all", ...projects.map((p) => p.area)],
        price: [
            "any",
            "under-10m",
            "10m-20m",
            "20m-40m",
            "over-40m",
            "on-request",
        ],
        floor: ["all", ...propertyUnits.map((u) => u.floor)],
        bedrooms: [
            "all",
            ...propertyUnits
                .filter((u) => u.bedrooms)
                .map((u) => String(u.bedrooms)),
        ],
        sort: [
            "featured",
            "price-asc",
            "price-desc",
            "size-asc",
            "size-desc",
            "title-asc",
        ],
    };
    for (const key of Object.keys(result) as (keyof SearchFilters)[]) {
        const v = params[key];
        if (["minPrice", "maxPrice", "minSize", "maxSize"].includes(key)) {
            if (typeof v === "string" && /^\d+(\.\d{1,2})?$/.test(v) && Number.isFinite(Number(v)))
                result[key] = v.slice(0, 20);
        } else if (["city", "type", "project", "developer", "area"].includes(key)) {
            const values = (Array.isArray(v) ? v : typeof v === "string" ? v.split("|") : [])
                .filter((value) => value !== "all" && choices[key]?.includes(value));
            if (values.length) result[key] = Array.from(new Set(values)).join("|");
        } else if (typeof v === "string" && (key === "q" || choices[key]?.includes(v))) {
            result[key] = v.slice(0, 100);
        }
    }
    return result;
}
export function searchUnits(
    filters: SearchFilters,
    source = propertyUnits,
): PropertyUnit[] {
    const q = filters.q.trim().toLowerCase();
    const result = source.filter((u) => {
        if (!supportsPurpose(u, filters.purpose)) return false;
        const amount = listingAmount(u, filters.purpose === "rent" ? "rent" : "sale");
        const p = getProject(u.projectId)!;
        const d = getDeveloper(p.developerId)!;
        const matches = (selected: string, value: string) => selected === "all" || selected.split("|").includes(value);
        if (!matches(filters.city, p.city)) return false;
        if (!matches(filters.area, p.area)) return false;
        if (filters.type !== "all" && !filters.type.split("|").some((type) => type === u.type || (type === "commercial" && u.type !== "apartment"))) return false;
        if (!matches(filters.project, p.id)) return false;
        if (!matches(filters.developer, d.id)) return false;
        if (filters.minPrice && amount < Number(filters.minPrice)) return false;
        if (filters.maxPrice && amount > Number(filters.maxPrice)) return false;
        if (filters.minSize && (u.sizeSqFt === null || u.sizeSqFt < Number(filters.minSize))) return false;
        if (filters.maxSize && (u.sizeSqFt === null || u.sizeSqFt > Number(filters.maxSize))) return false;
        if (filters.floor !== "all" && u.floor !== filters.floor) return false;
        if (
            filters.bedrooms !== "all" &&
            String(u.bedrooms) !== filters.bedrooms
        )
            return false;
        if (filters.price === "under-10m" && amount >= 10000000) return false;
        if (
            filters.price === "10m-20m" &&
            (amount < 10000000 || amount >= 20000000)
        )
            return false;
        if (
            filters.price === "20m-40m" &&
            (amount < 20000000 || amount >= 40000000)
        )
            return false;
        if (filters.price === "over-40m" && amount < 40000000) return false;
        if (filters.price === "on-request") return false;
        return (
            !q ||
            [
                u.unitNumber,
                u.floor,
                unitTypeLabel(u),
                p.name,
                p.city,
                p.area,
                d.name,
            ]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    });
    return result.sort((a, b) =>
        filters.sort === "price-asc"
            ? listingAmount(a, filters.purpose === "rent" ? "rent" : "sale") - listingAmount(b, filters.purpose === "rent" ? "rent" : "sale")
            : filters.sort === "price-desc"
              ? listingAmount(b, filters.purpose === "rent" ? "rent" : "sale") - listingAmount(a, filters.purpose === "rent" ? "rent" : "sale")
              : filters.sort === "size-asc"
                ? (a.sizeSqFt ?? Infinity) - (b.sizeSqFt ?? Infinity)
                : filters.sort === "size-desc"
                  ? (b.sizeSqFt ?? -Infinity) - (a.sizeSqFt ?? -Infinity)
                  : filters.sort === "title-asc"
                    ? a.unitNumber.localeCompare(b.unitNumber)
                    : Number(b.featured) - Number(a.featured),
    );
}
