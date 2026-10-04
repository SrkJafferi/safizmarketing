import type { InventorySource, ListingPurpose, PropertyUnit } from "@/types/marketplace";
import { getSaleListings, getRentalListings } from "@/lib/listings";
import { rahatUnitImages } from "./rahat-heights-unit-media";

/** Latest 4 October client workbook, reconciled with explicit current sale/media instructions.
 * Historical rent is retained only in raw rows and never makes an occupied unit available for rent.
 */
export type RahatInventoryRow = {
    unitNumber?: string; floor: string; sizeSqFt: number;
    inventorySource?: InventorySource; category?: string; bedrooms?: number;
    occupancyStatus?: "vacant" | "rented-out"; sourcePurpose?: string;
    askingPrice?: number; rentAmount?: number; sourceFurnished?: string;
    notes?: string; purposes: ListingPurpose[]; needsConfirmation?: boolean;
};
export const rahatInventorySource = "/documents/rahat-heights-current-inventory.png";
export const rahatHeightsLocation = "Faisal Margalla City (FMC)";
export const rahatHeightsInventory: RahatInventoryRow[] = [
    {
        "floor": "Lower Ground",
        "sizeSqFt": 3900,
        "rentAmount": 600000,
        "askingPrice": 120000000,
        "purposes": [],
        "needsConfirmation": true
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "1",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "rented-out",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": []
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "2",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "rented-out",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": []
    },
    {
        "floor": "Ground",
        "sizeSqFt": 158,
        "unitNumber": "3",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "rented-out",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": []
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "4",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "rented-out",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": []
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "5",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "6",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "7",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "8",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "9",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Ground",
        "sizeSqFt": 220,
        "unitNumber": "10",
        "inventorySource": "resale",
        "category": "Shop",
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 30000,
        "askingPrice": 9000000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "First",
        "sizeSqFt": 863,
        "unitNumber": "101",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": []
    },
    {
        "floor": "First",
        "sizeSqFt": 1063,
        "unitNumber": "102",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "First",
        "sizeSqFt": 1063,
        "unitNumber": "103",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "First",
        "sizeSqFt": 863,
        "unitNumber": "104",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": []
    },
    {
        "floor": "Second",
        "sizeSqFt": 863,
        "unitNumber": "201",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 75000,
        "askingPrice": 10000000,
        "sourceFurnished": "Furnished",
        "purposes": [
            "sale"
        ]
    },
    {
        "floor": "Second",
        "sizeSqFt": 1063,
        "unitNumber": "202",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "sourcePurpose": "Sale",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": [
            "sale"
        ]
    },
    {
        "floor": "Second",
        "sizeSqFt": 1063,
        "unitNumber": "203",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 85000,
        "askingPrice": 11500000,
        "purposes": [
            "sale"
        ]
    },
    {
        "floor": "Second",
        "sizeSqFt": 863,
        "unitNumber": "204",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": []
    },
    {
        "floor": "Third",
        "sizeSqFt": 863,
        "unitNumber": "301",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": [
            "sale"
        ],
        "notes": "Current sale listing explicitly confirmed by the client-supplied Unit 301 sale video."
    },
    {
        "floor": "Third",
        "sizeSqFt": 1063,
        "unitNumber": "302",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "Third",
        "sizeSqFt": 1063,
        "unitNumber": "303",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "Third",
        "sizeSqFt": 863,
        "unitNumber": "304",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 75000,
        "askingPrice": 10000000,
        "sourceFurnished": "Furnished",
        "notes": "Air BNB",
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Fourth",
        "sizeSqFt": 863,
        "unitNumber": "401",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "vacant",
        "sourcePurpose": "Rent / Sale",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": [
            "sale",
            "rent"
        ]
    },
    {
        "floor": "Fourth",
        "sizeSqFt": 1063,
        "unitNumber": "402",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "Fourth",
        "sizeSqFt": 1063,
        "unitNumber": "403",
        "inventorySource": "resale",
        "category": "3 BHK",
        "bedrooms": 3,
        "occupancyStatus": "rented-out",
        "rentAmount": 50000,
        "askingPrice": 11500000,
        "purposes": []
    },
    {
        "floor": "Fourth",
        "sizeSqFt": 863,
        "unitNumber": "404",
        "inventorySource": "resale",
        "category": "2 BHK",
        "bedrooms": 2,
        "occupancyStatus": "rented-out",
        "rentAmount": 35000,
        "askingPrice": 9500000,
        "purposes": []
    },
    {
        "floor": "Penthouse",
        "sizeSqFt": 1900,
        "unitNumber": "501",
        "inventorySource": "resale",
        "category": "3BHK",
        "bedrooms": 3,
        "occupancyStatus": "vacant",
        "sourcePurpose": "Sale",
        "askingPrice": 22500000,
        "purposes": [
            "sale"
        ]
    },
    {
        "floor": "Penthouse",
        "sizeSqFt": 1900,
        "unitNumber": "502",
        "inventorySource": "resale",
        "category": "3BHK",
        "bedrooms": 3,
        "occupancyStatus": "vacant",
        "sourcePurpose": "Sale",
        "askingPrice": 22500000,
        "purposes": [
            "sale"
        ]
    }
];

export const currentRahatHeightsListings: PropertyUnit[] = rahatHeightsInventory.flatMap(row => {
    if (!row.unitNumber || !row.purposes.length || row.needsConfirmation) return [];
    const slug = `rahat-heights-${row.floor.toLowerCase()}-${row.unitNumber}`;
    const video = ["301", "401"].includes(row.unitNumber) ? `/videos/properties/rahat-heights/${row.unitNumber}/property-tour.mp4` : undefined;
    const videoPoster = video ? `/images/properties/rahat-heights/${row.unitNumber}/video-poster.jpg` : undefined;
    const images = rahatUnitImages[row.unitNumber] ?? [videoPoster
        ? { src: videoPoster, alt: `Rahat Heights Unit ${row.unitNumber} — frame from the supplied property tour`, width: 476, height: 848 }
        : { src: "/projects/rahat-heights-cover.jpg", alt: "Rahat Heights project concept render; not an exact unit photograph", width: 1400, height: 1000 }];
    return [{
        id: slug, slug, projectId: "rahat-heights", unitNumber: row.unitNumber,
        floor: row.floor, category: row.floor === "Penthouse" ? "Penthouse" : row.category!,
        type: row.category === "Shop" ? "shop" : "apartment", bedrooms: row.bedrooms,
        sizeSqFt: row.sizeSqFt, purposes: row.purposes, occupancyStatus: row.occupancyStatus,
        inventorySource: row.inventorySource, askingPrice: row.askingPrice, price: row.askingPrice!,
        // Historical rent stays exclusively in the raw source, never in an occupied public unit.
        rentAmount: row.purposes.includes("rent") ? row.rentAmount : undefined,
        furnished: ["203", "304"].includes(row.unitNumber),
        images, video, videoPoster, actualUnitMedia: !!rahatUnitImages[row.unitNumber] || !!video,
        notes: row.notes, availability: "listed", source: rahatInventorySource, sourcePage: 1,
        featured: false, priceLabel: "Asking Price",
    }];
});
export const getActiveRahatHeightsListings = () => currentRahatHeightsListings;
export const getRahatHeightsSaleListings = () => getSaleListings(currentRahatHeightsListings);
export const getRahatHeightsRentListings = () => getRentalListings(currentRahatHeightsListings);
