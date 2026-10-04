import type { InventorySource, ListingPurpose, PropertyUnit } from "@/types/marketplace";
// Legacy records remain sale-only; current units can support both purposes.
export const listingPurposes = (unit: PropertyUnit): ListingPurpose[] => unit.purposes ?? [unit.purpose ?? "sale"];
export const listingPurpose = (unit: PropertyUnit): ListingPurpose => listingPurposes(unit)[0];
export const supportsPurpose = (unit: PropertyUnit, purpose: string) => listingPurposes(unit).some(p => p === purpose) && !(purpose === "rent" && unit.occupancyStatus === "rented-out");
export const listingPriceLabel = (unit: PropertyUnit, purpose = listingPurpose(unit)) => purpose === "rent" ? "Rent" : unit.priceLabel ?? "Total Price (Developer Price)";
export const listingAmount = (unit: PropertyUnit, purpose = listingPurpose(unit)) => purpose === "rent" ? unit.rentAmount ?? unit.price : unit.askingPrice ?? unit.price;
export const isCurrentListing = (unit: PropertyUnit) => listingPurposes(unit).some(p => supportsPurpose(unit, p) && Number.isFinite(listingAmount(unit, p)) && listingAmount(unit, p) > 0);
export const getSaleListings = (units: PropertyUnit[]) => units.filter(u => isCurrentListing(u) && supportsPurpose(u, "sale"));
export const getRentalListings = (units: PropertyUnit[]) => units.filter(u => isCurrentListing(u) && supportsPurpose(u, "rent"));
export const getSourceListings = (units: PropertyUnit[], source: InventorySource) => getSaleListings(units).filter(u => u.inventorySource === source);
export const inventoryCounts = (units: PropertyUnit[]) => ({ all: units.filter(isCurrentListing).length, sale: getSaleListings(units).length, rent: getRentalListings(units).length, developer: getSourceListings(units, "developer").length, resale: getSourceListings(units, "resale").length });
export const occupancyLabel = (unit: PropertyUnit) => unit.occupancyStatus === "rented-out" ? "Currently Rented" : unit.occupancyStatus === "vacant" ? "Vacant" : undefined;
export type InventoryFilters = { purpose: "all" | ListingPurpose; inventorySource: "all" | InventorySource; type: string; floor: string; bedrooms: string; sort: string };
export function filterCurrentInventory(units: PropertyUnit[], filters: InventoryFilters) {
    const purpose = filters.purpose === "all" ? "sale" : filters.purpose;
    const rows = units.filter(u => isCurrentListing(u)
        && (filters.purpose === "all" || supportsPurpose(u, filters.purpose))
        && (filters.purpose !== "sale" || filters.inventorySource === "all" || u.inventorySource === filters.inventorySource)
        && (filters.type === "all" || u.type === filters.type)
        && (filters.floor === "all" || u.floor === filters.floor)
        && (filters.bedrooms === "all" || String(u.bedrooms) === filters.bedrooms));
    return rows.sort((a,b) => filters.sort === "size-asc" ? (a.sizeSqFt ?? Infinity)-(b.sizeSqFt ?? Infinity)
        : filters.sort === "size-desc" ? (b.sizeSqFt ?? -Infinity)-(a.sizeSqFt ?? -Infinity)
        : filters.purpose !== "all" && filters.sort === "price-asc" ? listingAmount(a,purpose)-listingAmount(b,purpose)
        : filters.purpose !== "all" && filters.sort === "price-desc" ? listingAmount(b,purpose)-listingAmount(a,purpose) : 0);
}
