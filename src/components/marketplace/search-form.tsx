import { Search, ChevronDown } from "lucide-react";
import { developers, projects } from "@/data/marketplace";
import { searchDefaults, type SearchFilters } from "@/lib/marketplace-search";
export const typeOptions = [
    { value: "all", label: "All property types" },
    { value: "apartment", label: "Apartments" },
    { value: "shop", label: "Shops" },
    { value: "office", label: "Offices" },
    { value: "shop-office", label: "Shops / Offices" },
    { value: "commercial", label: "All commercial" },
];
const priceOptions = [
    { value: "any", label: "Any budget" },
    { value: "under-10m", label: "Under PKR 1 Crore" },
    { value: "10m-20m", label: "PKR 1–2 Crore" },
    { value: "20m-40m", label: "PKR 2–4 Crore" },
    { value: "over-40m", label: "PKR 4 Crore +" },
];
export function SelectField({
    label,
    name,
    options,
    value,
}: {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    value: string;
}) {
    return (
        <label className="search-field">
            <span>{label}</span>
            <div>
                <select name={name} defaultValue={value}>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={14} aria-hidden="true" />
            </div>
        </label>
    );
}
export function SearchForm({
    filters = searchDefaults,
    expanded = false,
}: {
    filters?: SearchFilters;
    expanded?: boolean;
}) {
    return (
        <form
            action="/properties"
            method="get"
            className={`market-search ${expanded ? "search-expanded" : ""}`}
        >
            {expanded && (
                <label className="search-field keyword-field">
                    <span>Keyword / unit</span>
                    <input
                        name="q"
                        defaultValue={filters.q}
                        placeholder="Project, unit or neighbourhood"
                        maxLength={100}
                    />
                </label>
            )}
            <SelectField
                label="Location"
                name="city"
                value={filters.city}
                options={[
                    { value: "all", label: "All locations" },
                    ...Array.from(new Set(projects.map((p) => p.city))).map(
                        (c) => ({ value: c, label: c }),
                    ),
                ]}
            />
            <SelectField
                label="Property type"
                name="type"
                value={filters.type}
                options={typeOptions}
            />
            <SelectField
                label="Project"
                name="project"
                value={filters.project}
                options={[
                    { value: "all", label: "All projects" },
                    ...projects.map((p) => ({ value: p.id, label: p.name })),
                ]}
            />
            <SelectField
                label="Price range"
                name="price"
                value={filters.price}
                options={priceOptions}
            />
            {expanded && (
                <>
                    <SelectField
                        label="Developer"
                        name="developer"
                        value={filters.developer}
                        options={[
                            { value: "all", label: "All developers" },
                            ...developers.map((d) => ({
                                value: d.id,
                                label: d.name,
                            })),
                        ]}
                    />
                    <SelectField
                        label="Bedrooms"
                        name="bedrooms"
                        value={filters.bedrooms}
                        options={[
                            { value: "all", label: "Any" },
                            { value: "1", label: "1 bedroom" },
                            { value: "2", label: "2 bedrooms" },
                        ]}
                    />
                    <SelectField
                        label="Sort by"
                        name="sort"
                        value={filters.sort}
                        options={[
                            { value: "featured", label: "Selected first" },
                            { value: "price-asc", label: "Price: low to high" },
                            {
                                value: "price-desc",
                                label: "Price: high to low",
                            },
                            {
                                value: "size-asc",
                                label: "Size: small to large",
                            },
                            {
                                value: "size-desc",
                                label: "Size: large to small",
                            },
                            { value: "title-asc", label: "Unit: A to Z" },
                        ]}
                    />
                </>
            )}
            <button type="submit" className="search-submit">
                <Search size={18} />
                <span>Search properties</span>
            </button>
        </form>
    );
}
