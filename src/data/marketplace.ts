import type {
    Developer,
    Media,
    Project,
    PropertyUnit,
} from "@/types/marketplace";
import mediaDimensions from "./media-dimensions.json";
import { currentRahatHeightsListings } from "./rahat-heights-inventory";

const media = (
    src: string,
    alt: string,
    width = 1400,
    height = 1000,
): Media => ({
    src,
    alt,
    ...((mediaDimensions as Record<string, { width: number; height: number }>)[
        src
    ] ?? { width, height }),
});
const page = (slug: string, n: number, alt: string) =>
    media(`/projects/${slug}-page-${n}.jpg`, alt);
export const developerDisclaimer =
    "Project information, imagery, floor plans, prices and availability are based on material supplied by the respective developer/property owner and may change. Contact SAFIZ MARKETING for the latest availability and details.";
export const developers: Developer[] = [
    {
        id: "rahat-associates",
        slug: "rahat-associates",
        name: "Rahat Associates",
        location: "Islamabad, Pakistan",
        logo: media(
            "/projects/rahat-associates-logo.jpg",
            "Rahat Associates — Estate & Builders",
            340,
            300,
        ),
        overview:
            "Residential and commercial projects, connected through one platform.",
        description: [
            "Rahat Associates is an estate and building company whose supplied portfolio includes mixed-use projects in Bahria Enclave, Faisal Margalla City and Grand City, Kharian.",
            "As the first developer onboarded to SAFIZ MARKETING, Rahat Associates brings shops, offices and apartments to the platform. Browse each project and its developer-supplied material, then speak to SAFIZ MARKETING for current details.",
        ],
    },
];
export const projects: Project[] = [
    {
        id: "smart-one-heights-2",
        slug: "smart-one-heights-2",
        developerId: "rahat-associates",
        name: "Smart One Heights 2",
        city: "Islamabad",
        area: "Bahria Enclave",
        address: "Bahria Enclave, Islamabad",
        projectType: "Mixed-use",
        categories: ["Shops", "Offices", "2 bed apartments", "Penthouse"],
        overview: "A place for business. A place to come home.",
        description: [
            "Smart One Heights 2 is a Rahat Associates mixed-use project in Bahria Enclave, Islamabad. Its supplied material brings together commercial shops, offices and residential apartments within one building.",
            "The price list covers lower ground and ground floor shops, first floor offices, apartments on the second, third and fourth floors, and a penthouse. Repeated apartment references are distinguished by floor.",
        ],
        cover: media(
            "/projects/smart-one-heights-2-cover.jpg",
            "Smart One Heights 2 — developer-supplied exterior concept render",
        ),
        gallery: [
            page(
                "smart-one-heights-2",
                2,
                "Smart One Heights 2 exterior concept render",
            ),
            page(
                "smart-one-heights-2",
                7,
                "Penthouse plan and illustrative interiors from the brochure",
            ),
        ],
        floorPlans: [
            page(
                "smart-one-heights-2",
                5,
                "Lower ground and ground floor plans",
            ),
            page("smart-one-heights-2", 6, "Office and apartment floor plans"),
            page("smart-one-heights-2", 7, "Penthouse floor plan"),
        ],
        locationMap: page(
            "smart-one-heights-2",
            4,
            "Bahria Enclave location map supplied in the brochure",
        ),
        amenities: [
            "Elevator facility",
            "Commercial shops",
            "Office floor",
            "Residential apartments",
        ],
        paymentPlan: {
            downPercent: 30,
            count: 8,
            frequency: "quarterly",
            source: "/documents/smart-one-heights-2-price-list.pdf",
            sourceLabel: "Developer price list · date not stated",
            note: "Penthouse size is not stated in the supplied price list. The G-01 installment is published as PKR 1,068,812.50 and is retained exactly.",
        },
        brochure: "/documents/smart-one-heights-2-brochure.pdf",
        featured: true,
    },
    {
        id: "rahat-heights",
        slug: "rahat-heights",
        developerId: "rahat-associates",
        name: "Rahat Heights",
        city: "Islamabad",
        area: "Faisal Margalla City / adjacent B-17",
        address: "Faisal Margalla City / adjacent B-17, Islamabad",
        projectType: "Mixed-use",
        categories: ["Shops", "1, 2 & 3 bed apartments"],
        overview: "City connections. A Margalla setting.",
        description: [
            "Rahat Heights is a Rahat Associates project in Faisal Margalla City, adjacent to B-17. The brochure presents lower ground and ground floor shops alongside one, two and three bedroom apartments.",
            "Explore the architectural concepts, floor layouts and location material supplied by the developer. Browse current sale and rental listings supplied by the client, then contact SAFIZ MARKETING to confirm current details and availability.",
        ],
        cover: media(
            "/projects/rahat-heights-cover.jpg",
            "Rahat Heights — developer-supplied exterior concept render",
        ),
        gallery: [
            page(
                "rahat-heights",
                3,
                "Rahat Heights exterior architectural concepts",
            ),
            page(
                "rahat-heights",
                14,
                "Illustrative apartment layouts from the developer brochure",
            ),
            page(
                "rahat-heights",
                15,
                "Apartment concept layout and specifications",
            ),
        ],
        floorPlans: [
            page("rahat-heights", 7, "Lower ground floor plan"),
            page("rahat-heights", 8, "Ground floor plan"),
            page("rahat-heights", 9, "First to fifth floor plans"),
        ],
        locationMap: page(
            "rahat-heights",
            5,
            "Faisal Margalla City location map from the developer brochure",
        ),
        amenities: [
            "Elevator with smart card access",
            "Gymnasium",
            "CCTV surveillance",
            "Emergency stairs",
            "Commercial washrooms",
            "Front and back parking",
        ],
        brochure: "/documents/rahat-heights-brochure.pdf",
        featured: true,
    },
    {
        id: "rahat-heights-ii",
        slug: "rahat-heights-ii",
        developerId: "rahat-associates",
        name: "Rahat Heights II",
        city: "Kharian",
        area: "Grand City",
        address: "Grand City, Kharian",
        projectType: "Mixed-use",
        categories: ["Shops", "Offices", "1 & 2 bed apartments"],
        overview: "A new perspective on Grand City.",
        description: [
            "Rahat Heights II is a Rahat Associates mixed-use project in Grand City, Kharian. The supplied brochure presents a combination of commercial space and residential apartments.",
            "The 2025 financial plan includes basement and lower ground shops, ground floor shops/offices, mezzanine and first floor offices, one bedroom apartments on the second floor, and a two bedroom apartment schedule labelled third to sixth floor.",
        ],
        cover: media(
            "/projects/rahat-heights-ii-cover.jpg",
            "Rahat Heights II in Kharian — developer-supplied exterior concept render",
        ),
        gallery: [
            page("rahat-heights-ii", 3, "Rahat Heights II exterior concepts"),
            page(
                "rahat-heights-ii",
                4,
                "Rahat Heights II exterior and Grand City map",
            ),
        ],
        floorPlans: [
            page(
                "rahat-heights-ii",
                7,
                "Basement and lower ground floor plans",
            ),
            page("rahat-heights-ii", 8, "Ground floor plan"),
            page("rahat-heights-ii", 9, "Mezzanine and first floor plans"),
            page(
                "rahat-heights-ii",
                10,
                "Second and third to sixth floor plans",
            ),
        ],
        locationMap: page(
            "rahat-heights-ii",
            5,
            "Grand City location material from the developer brochure",
        ),
        amenities: [
            "Commercial floors",
            "Office spaces",
            "Residential floor layouts",
        ],
        paymentPlan: {
            downPercent: 25,
            count: 10,
            frequency: "quarterly",
            source: "/documents/rahat-heights-ii-price-list-2025.pdf",
            sourceLabel: "Developer financial plan · 2025",
            note: "Paired and grouped unit references are retained as printed. Figures apply to the published row; they are not summed across the group. The third to sixth floor schedule retains references 301–306 without inventing references for other floors.",
        },
        brochure: "/documents/rahat-heights-ii-brochure.pdf",
        featured: true,
    },
];

type Row = [
    unit: string,
    size: number | null,
    price: number,
    down: number,
    installment: number,
];
const units: PropertyUnit[] = [];
function importRows(
    projectId: string,
    floor: string,
    type: PropertyUnit["type"],
    category: string,
    rows: Row[],
    sourcePage: number,
    bedrooms?: number,
) {
    const project = projects.find((p) => p.id === projectId)!;
    rows.forEach(
        ([unitNumber, sizeSqFt, price, downPayment, installmentAmount]) => {
            const slug = `${projectId}-${floor}-${unitNumber}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/-$/, "");
            units.push({
                id: slug,
                slug,
                projectId,
                unitNumber,
                sizeSqFt,
                price,
                downPayment,
                installmentAmount,
                floor,
                type,
                category,
                bedrooms,
                installmentCount: project.paymentPlan!.count,
                paymentFrequency: "quarterly",
                availability: "unconfirmed",
                source: project.paymentPlan!.source,
                sourcePage,
                featured: false,
            });
        },
    );
}
const smart = "smart-one-heights-2";
importRows(
    smart,
    "Lower ground",
    "shop",
    "Shops",
    [
        ["LG-01", 630, 15120000, 4536000, 1323000],
        ["LG-02", 585, 14040000, 4212000, 1228500],
        ["LG-03", 585, 14040000, 4212000, 1228500],
    ],
    1,
);
importRows(
    smart,
    "Ground",
    "shop",
    "Shops",
    [
        ["G-01", 349, 12215000, 3664500, 1068812.5],
        ["G-02", 740, 25900000, 7770000, 2266250],
        ["G-03", 710, 24850000, 7455000, 2174375],
    ],
    1,
);
importRows(
    smart,
    "First",
    "office",
    "Offices",
    [
        ["M-01", 490, 11760000, 3528000, 1029000],
        ["M-02", 467, 11208000, 3362400, 980700],
        ["M-03", 570, 13680000, 4104000, 1197000],
        ["M-04", 452, 10848000, 3254400, 949200],
    ],
    1,
);
for (const floor of ["Second", "Third", "Fourth"])
    importRows(
        smart,
        floor,
        "apartment",
        "2 bed apartments",
        [
            ["F-01", 880, 13200000, 3960000, 1155000],
            ["F-02", 1060, 15900000, 4770000, 1391250],
        ],
        1,
        2,
    );
importRows(
    smart,
    "Penthouse",
    "apartment",
    "Penthouse",
    [["P-01", null, 17500000, 5250000, 1531250]],
    1,
);
const rh2 = "rahat-heights-ii";
importRows(
    rh2,
    "Basement",
    "shop",
    "Shops",
    [["B-01 to B-06", 421, 9262000, 2315500, 694650]],
    1,
);
importRows(
    rh2,
    "Lower ground",
    "shop",
    "Shops",
    [
        ["LG-01", 338, 7436000, 1859000, 557700],
        ["LG-02", 382, 8404000, 2101000, 630300],
        ["LG-03 to LG-04", 424, 9328000, 2332000, 699600],
        ["LG-05", 412, 9064000, 2266000, 679800],
        ["LG-06", 296, 6512000, 1628000, 488400],
        ["LG-07", 404, 12928000, 3232000, 969600],
        ["LG-08, 09, 10, 11", 418, 13376000, 3344000, 1003200],
    ],
    1,
);
importRows(
    rh2,
    "Ground",
    "shop-office",
    "Shops / offices",
    [
        ["G-01 / G-02", 304, 9728000, 2432000, 729600],
        ["G-03", 383, 12256000, 3064000, 919200],
        ["G-04", 382, 12224000, 3056000, 916800],
        ["G-05", 338, 10816000, 2704000, 811200],
        ["G-06", 297, 9504000, 2376000, 712800],
        ["G-07", 500, 11000000, 2750000, 825000],
        ["G-08", 530, 11660000, 2915000, 874500],
        ["G-09 / G-10", 550, 12100000, 3025000, 907500],
        ["G-11 / G-12", 460, 10120000, 2530000, 759000],
    ],
    1,
);
importRows(
    rh2,
    "Mezzanine",
    "office",
    "Offices",
    [
        ["M-01 / M-12", 411, 9042000, 2260500, 678150],
        ["M-02 / M-11", 419, 9218000, 2304500, 691350],
        ["M-03 / M-10", 523, 11506000, 2876500, 862950],
        ["M-04 / M-09", 512, 11264000, 2816000, 844800],
        ["M-05", 429, 9438000, 2359500, 707850],
        ["M-06", 315, 6930000, 1732500, 519750],
        ["M-07", 465, 10230000, 2557500, 767250],
        ["M-08", 489, 10758000, 2689500, 806850],
    ],
    1,
);
importRows(
    rh2,
    "First",
    "office",
    "Offices",
    [
        ["101 / 112", 411, 6987000, 1746750, 524025],
        ["102 / 111", 419, 7123000, 1780750, 534225],
        ["103 / 110", 523, 8891000, 2222750, 666825],
        ["104 / 109", 512, 8704000, 2176000, 652800],
        ["105", 429, 7293000, 1823250, 546975],
        ["106", 315, 5355000, 1338750, 401625],
        ["107", 465, 7905000, 1976250, 592875],
        ["108", 489, 8313000, 2078250, 623475],
    ],
    2,
);
importRows(
    rh2,
    "Second",
    "apartment",
    "1 bed apartments",
    [
        ["201 / 202", 422, 6330000, 1582500, 474750],
        ["203 / 210", 526, 7890000, 1972500, 591750],
        ["204", 525, 7875000, 1968750, 590625],
        ["205", 440, 6600000, 1650000, 495000],
        ["206", 323, 4845000, 1211250, 363375],
        ["207", 477, 7155000, 1788750, 536625],
        ["208", 502, 7530000, 1882500, 564750],
        ["209", 525, 7875000, 1968750, 590625],
        ["211 / 212", 422, 6330000, 1582500, 474750],
    ],
    2,
    1,
);
importRows(
    rh2,
    "Third to sixth",
    "apartment",
    "2 bed apartments",
    [
        ["301", 846, 12690000, 3172500, 951750],
        ["302", 1044, 15660000, 3915000, 1174500],
        ["303", 776, 11640000, 2910000, 873000],
        ["304", 976, 14640000, 3660000, 1098000],
        ["305", 1044, 15660000, 3915000, 1174500],
        ["306", 846, 12690000, 3172500, 951750],
    ],
    2,
    2,
);
for (const id of [
    `${smart}-second-f-01`,
    `${rh2}-second-206`,
    `${rh2}-first-106`,
]) {
    const unit = units.find((u) => u.id === id);
    if (unit) unit.featured = true;
}
export const propertyUnits = [...units, ...currentRahatHeightsListings];
export const getProject = (id: string) =>
    projects.find((p) => p.id === id || p.slug === id);
export const getDeveloper = (id: string) =>
    developers.find((d) => d.id === id || d.slug === id);
export const getProjectUnits = (id: string) =>
    propertyUnits.filter((u) => u.projectId === id);
export const startingPrice = (id: string) => {
    const prices = getProjectUnits(id).filter((u) => u.purpose !== "rent").map((u) => u.price);
    return prices.length ? Math.min(...prices) : null;
};
export const unitTypeLabel = (u: PropertyUnit) =>
    u.bedrooms
        ? `${u.bedrooms} Bed Apartment`
        : u.category === "Penthouse"
          ? "Penthouse Apartment"
          : {
                shop: "Shop",
                office: "Office",
                "shop-office": "Shop / Office",
                apartment: "Apartment",
            }[u.type];
export const unitSizeLabel = (u: PropertyUnit) =>
    u.sizeSqFt === null
        ? "Size on request"
        : `${u.sizeSqFt.toLocaleString("en-PK")} Sq.Ft`;
