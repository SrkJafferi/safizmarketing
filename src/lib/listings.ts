import type { InventorySource, ListingPurpose, PropertyUnit } from "@/types/marketplace";
export const listingPurpose = (unit: PropertyUnit): ListingPurpose => unit.purpose ?? "sale";
export const listingPriceLabel = (unit: PropertyUnit) => unit.priceLabel ?? (listingPurpose(unit) === "rent" ? "Rent" : "Total Price (Developer Price)");
export const listingAmount = (unit: PropertyUnit) => listingPurpose(unit) === "rent" ? unit.rentAmount ?? unit.price : unit.askingPrice ?? unit.price;
export const isCurrentListing = (unit: PropertyUnit) => Number.isFinite(listingAmount(unit)) && listingAmount(unit) > 0;
export const getSaleListings = (units: PropertyUnit[]) => units.filter(u => isCurrentListing(u) && listingPurpose(u) === "sale");
export const getRentalListings = (units: PropertyUnit[]) => units.filter(u => isCurrentListing(u) && listingPurpose(u) === "rent");
export const getSourceListings = (units: PropertyUnit[], source: InventorySource) => getSaleListings(units).filter(u => u.inventorySource === source);
export const inventoryCounts = (units: PropertyUnit[]) => ({ all: units.filter(isCurrentListing).length, sale: getSaleListings(units).length, rent: getRentalListings(units).length, developer: getSourceListings(units, "developer").length, resale: getSourceListings(units, "resale").length });
export type InventoryFilters = { purpose: "all" | ListingPurpose; inventorySource: "all" | InventorySource; type: string; floor: string; bedrooms: string; sort: string };
export function filterCurrentInventory(units: PropertyUnit[], filters: InventoryFilters) {
    const rows = units.filter(u => isCurrentListing(u)
        && (filters.purpose === "all" || listingPurpose(u) === filters.purpose)
        && (filters.purpose !== "sale" || filters.inventorySource === "all" || u.inventorySource === filters.inventorySource)
        && (filters.type === "all" || u.type === filters.type)
        && (filters.floor === "all" || u.floor === filters.floor)
        && (filters.bedrooms === "all" || String(u.bedrooms) === filters.bedrooms));
    return rows.sort((a,b) => filters.sort === "size-asc" ? (a.sizeSqFt ?? Infinity)-(b.sizeSqFt ?? Infinity)
        : filters.sort === "size-desc" ? (b.sizeSqFt ?? -Infinity)-(a.sizeSqFt ?? -Infinity)
        : filters.purpose !== "all" && filters.sort === "price-asc" ? listingAmount(a)-listingAmount(b)
        : filters.purpose !== "all" && filters.sort === "price-desc" ? listingAmount(b)-listingAmount(a) : 0);
}
