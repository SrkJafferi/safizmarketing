"use client";
import Link from "next/link";
import { useState } from "react";
import { unitSizeLabel, unitTypeLabel } from "@/data/marketplace";
import { formatExactPkr } from "@/lib/format";
import { unitWhatsappLink } from "@/lib/whatsapp";
import type { PropertyUnit } from "@/types/marketplace";
import { HomeSearchField } from "./home-search-field";
export function Inventory({ units }: { units: PropertyUnit[] }) {
    const [floor, setFloor] = useState("all");
    const [type, setType] = useState("all");
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(8);
    const shown = units.filter(
        (u) =>
            (floor === "all" || u.floor === floor) &&
            (type === "all" || u.type === type) &&
            u.unitNumber.toLowerCase().includes(query.trim().toLowerCase()),
    );
    return (
        <div className="inventory">
            <div className="inventory-types" aria-label="Inventory categories">
                {["all", ...Array.from(new Set(units.map((unit) => unit.type)))].map((category) => <button type="button" key={category} aria-pressed={type === category} onClick={() => { setType(category); setLimit(8); }}>{category === "all" ? "All Units" : category === "shop-office" ? "Shops / Offices" : category === "apartment" ? "Apartments" : category === "shop" ? "Shops" : "Offices"}</button>)}
            </div>
            <div className="inventory-controls">
                <HomeSearchField label="Floor" name="floor" className="inventory-floor" value={floor} onValueChange={(value) => { setFloor(value); setLimit(8); }} options={[{ value: "all", label: "All floors" }, ...Array.from(new Set(units.map((unit) => unit.floor))).map((value) => ({ value, label: value }))]} />
                <label>
                    Unit reference
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setLimit(8); }}
                        placeholder="e.g. F-01"
                    />
                </label>
                <span aria-live="polite">{shown.length} published rows</span>
            </div>
            <div className="inventory-table">
                <table>
                    <caption className="sr-only">
                        Developer supplied unit sizes, prices and quarterly
                        installment plans. Current availability is unconfirmed.
                    </caption>
                    <thead>
                        <tr>
                            {[
                                "Unit / floor",
                                "Type / size",
                                "Total price",
                                "Down payment",
                                "Each installment",
                                "Enquiry",
                            ].map((h) => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {shown.slice(0, limit).map((u) => (
                            <tr key={u.id}>
                                <td data-label="Unit / floor">
                                    <Link href={`/properties/${u.slug}`}>
                                        {u.unitNumber}
                                    </Link>
                                    <small>{u.floor}</small>
                                </td>
                                <td data-label="Type / size">
                                    {unitTypeLabel(u)}
                                    <small>{unitSizeLabel(u)}</small>
                                </td>
                                <td data-label="Total price">
                                    {formatExactPkr(u.price)}
                                </td>
                                <td data-label="Down payment">
                                    {formatExactPkr(u.downPayment)}
                                </td>
                                <td data-label="Each installment">
                                    {formatExactPkr(u.installmentAmount)}
                                    <small>
                                        {u.installmentCount} quarterly
                                        installments
                                    </small>
                                </td>
                                <td data-label="Enquiry">
                                    <a
                                        href={unitWhatsappLink(u)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ask about this unit ↗
                                    </a>
                                    <small>Confirm current availability</small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {shown.length > limit && <div className="inventory-more"><button type="button" onClick={() => setLimit((value) => value + 8)}>Show More Units</button><span>{Math.min(limit, shown.length)} of {shown.length} published rows</span></div>}
            {shown.length === 0 && (
                <p className="empty-results">
                    No matching rows. Try another floor, category or reference.
                </p>
            )}
        </div>
    );
}
