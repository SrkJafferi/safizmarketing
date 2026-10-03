import type { InventorySource, Media, PropertyUnit } from "@/types/marketplace";

/** Exact transcription of the client sheet supplied on 3 October 2026.
 * Numeric rent cells also become rental listings, as explicitly confirmed by the client.
 * "Air BNB" is retained as a note, never converted to a rental amount.
 */
export type RahatInventoryRow = {
    unitNumber?: string;
    floor: string;
    sizeSqFt: number;
    inventorySource: InventorySource;
    category?: string;
    bedrooms?: number;
    status?: string;
    askingPrice?: number;
    rentAmount?: number;
    notes?: string;
};
export const rahatInventorySource = "/documents/rahat-heights-current-inventory.jpeg";
export const rahatHeightsInventory: RahatInventoryRow[] = [
    { floor: "Lower Ground", sizeSqFt: 3900, inventorySource: "developer", category: "Full Hall" },
    { unitNumber: "1", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Rented", rentAmount: 30000, askingPrice: 9000000 },
    { unitNumber: "2", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Rented", rentAmount: 30000, askingPrice: 9000000 },
    { unitNumber: "3", floor: "Ground", sizeSqFt: 158, inventorySource: "resale", category: "Shop", status: "Rented", rentAmount: 30000, askingPrice: 9000000 },
    { unitNumber: "4", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Rented", rentAmount: 30000, askingPrice: 9000000 },
    { unitNumber: "5", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "6", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "7", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "8", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "9", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "10", floor: "Ground", sizeSqFt: 220, inventorySource: "resale", category: "Shop", status: "Vacant", askingPrice: 9000000 },
    { unitNumber: "101", floor: "First", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000 },
    { unitNumber: "102", floor: "First", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000 },
    { unitNumber: "103", floor: "First", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000 },
    { unitNumber: "104", floor: "First", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000 },
    { unitNumber: "201", floor: "Second", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000 },
    { unitNumber: "202", floor: "Second", sizeSqFt: 1063, inventorySource: "developer", category: "3 BHK", bedrooms: 3, status: "Vacant", askingPrice: 11500000 },
    { unitNumber: "203", floor: "Second", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000 },
    { unitNumber: "204", floor: "Second", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000 },
    { unitNumber: "301", floor: "Third", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000 },
    { unitNumber: "302", floor: "Third", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000 },
    { unitNumber: "303", floor: "Third", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000 },
    { unitNumber: "304", floor: "Third", sizeSqFt: 863, inventorySource: "developer", category: "2 BHK", bedrooms: 2, status: "Furnish", askingPrice: 9500000, notes: "Rent cell states Air BNB; no numeric rent supplied." },
    { unitNumber: "401", floor: "Fourth", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Vacant", askingPrice: 9500000, notes: "Floor written as Forth Floor in the source sheet." },
    { unitNumber: "402", floor: "Fourth", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000, notes: "Floor written as Forth Floor in the source sheet." },
    { unitNumber: "403", floor: "Fourth", sizeSqFt: 1063, inventorySource: "resale", category: "3 BHK", bedrooms: 3, status: "Rented", rentAmount: 50000, askingPrice: 11500000, notes: "Floor written as Forth Floor in the source sheet." },
    { unitNumber: "404", floor: "Fourth", sizeSqFt: 863, inventorySource: "resale", category: "2 BHK", bedrooms: 2, status: "Rented", rentAmount: 35000, askingPrice: 9500000, notes: "Floor written as Forth Floor in the source sheet." },
    { unitNumber: "501", floor: "Pant House", sizeSqFt: 1900, inventorySource: "developer", status: "Vacant" },
    { unitNumber: "502", floor: "Pant House", sizeSqFt: 1900, inventorySource: "developer", status: "Vacant" },
];
const projectImage: Media = { src: "/projects/rahat-heights-cover.jpg", alt: "Rahat Heights project concept render; not an exact unit photograph", width: 1400, height: 1000 };
export const currentRahatHeightsListings: PropertyUnit[] = rahatHeightsInventory.flatMap(row => {
    if (!row.unitNumber) return [];
    const base = {
        projectId: "rahat-heights", unitNumber: row.unitNumber, floor: row.floor,
        category: row.category!, type: row.category === "Shop" ? "shop" as const : "apartment" as const,
        bedrooms: row.bedrooms, sizeSqFt: row.sizeSqFt, availability: "listed" as const,
        source: rahatInventorySource, sourcePage: 1, featured: false, images: [projectImage],
        sourceStatus: row.status, notes: row.notes,
    };
    const sale: PropertyUnit[] = row.askingPrice != null ? [{ ...base,
        id: `rahat-heights-${row.floor.toLowerCase()}-${row.unitNumber}`,
        slug: `rahat-heights-${row.floor.toLowerCase()}-${row.unitNumber}`,
        purpose: "sale", inventorySource: row.inventorySource, askingPrice: row.askingPrice,
        price: row.askingPrice, priceLabel: "Asking Price",
    }] : [];
    // Rental source is explicitly Resale in these source rows; this is independent of purpose.
    const rent: PropertyUnit[] = row.rentAmount != null ? [{ ...base,
        id: `rahat-heights-${row.floor.toLowerCase()}-${row.unitNumber}-rent`,
        slug: `rahat-heights-${row.floor.toLowerCase()}-${row.unitNumber}-rent`,
        purpose: "rent", inventorySource: row.inventorySource, rentAmount: row.rentAmount,
        price: row.rentAmount, priceLabel: "Rent",
    }] : [];
    return [...sale, ...rent];
});
