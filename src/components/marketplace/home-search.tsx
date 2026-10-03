"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {projects} from "@/data/marketplace";
import {HomeSearchField} from "./home-search-field";
export function HomeSearch() {
    const [purpose, setPurpose] = useState("sale");
    return (
        <div className="rh-search-module">
            <nav className="rh-search-tabs" aria-label="Buy, rent or list a property">
                <button type="button" aria-pressed={purpose === "sale"} onClick={() => setPurpose("sale")}>Buy</button>
                <button type="button" aria-pressed={purpose === "rent"} onClick={() => setPurpose("rent")}>Rent</button>
                <Link href="/list-your-property">Sell / List</Link>
            </nav>
            <form className="rh-search" action="/properties" method="get">
                <input type="hidden" name="purpose" value={purpose} />
                <HomeSearchField
                    label="Location"
                    name="city"
                    options={[
                        { value: "all", label: "Any Location" },
                        ...Array.from(new Set(projects.map((p) => p.city))).map(
                            (city) => ({ value: city, label: city }),
                        ),
                    ]}
                />
                <HomeSearchField
                    label="Property Type"
                    name="type"
                    options={[
                        { value: "all", label: "Any Type" },
                        { value: "apartment", label: "Apartments" },
                        { value: "shop", label: "Shops" },
                        { value: "office", label: "Offices" },
                        { value: "shop-office", label: "Shops / Offices" },
                    ]}
                />
                <HomeSearchField
                    label="Project / Developer"
                    name="project"
                    options={[
                        { value: "all", label: "Any Project" },
                        ...projects.map((p) => ({
                            value: p.id,
                            label: p.name,
                        })),
                    ]}
                />
                <HomeSearchField
                    label="Price Range"
                    name="price"
                    key={purpose}
                    options={purpose === "rent" ? [{value: "any", label: "Any Rent"}] : [
                        { value: "any", label: "Any Price" },
                        { value: "under-10m", label: "Under PKR 10 million" },
                        { value: "10m-20m", label: "PKR 10–20 million" },
                        { value: "20m-40m", label: "PKR 20–40 million" },
                        { value: "over-40m", label: "PKR 40 million +" },
                    ]}
                />
                <button className="rh-search-submit" type="submit">
                    Search Properties <ArrowRight size={17} />
                </button>
            </form>
        </div>
    );
}
