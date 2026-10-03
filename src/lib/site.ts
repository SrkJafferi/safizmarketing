/**
 * Site-wide configuration.
 *
 * Everything the client may want changed later — phone number, nav, copy for
 * the footer blurb — lives here rather than being scattered through JSX.
 */

const fallbackSiteUrl = "https://marketing.safiz.pk";

function productionSiteUrl() {
    try {
        const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl);
        // Only an explicitly configured public HTTPS origin can become canonical.
        if (url.protocol !== "https:" || url.username || url.password ||
            url.hostname === "localhost" || url.hostname === "127.0.0.1" ||
            url.hostname === "[::1]" || url.hostname.endsWith(".vercel.app")) {
            return fallbackSiteUrl;
        }
        return url.origin;
    } catch {
        return fallbackSiteUrl;
    }
}

export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const seoSite = {
    name: "SAFIZMARKETING",
    title: "SAFIZMARKETING | Property Marketplace in Islamabad",
    description: "Discover residential, commercial and investment properties from trusted developers and property owners across Islamabad and beyond. Explore projects, compare options and connect with SAFIZMARKETING.",
    ogImage: "/images/og/safizmarketing-og.jpg",
    ogWidth: 1200,
    ogHeight: 630,
    ogAlt: "SAFIZMARKETING Real Estate Marketplace",
} as const;

export const site = {
    name: "SAFIZ MARKETING",
    division: "Real Estate Division",
    url: productionSiteUrl(),
    locale: "en_PK",
    description:
        "Discover projects, apartments, shops and offices from developers and property owners across Islamabad and beyond. Connect through SAFIZ MARKETING.",
    shortDescription:
        "A property discovery platform connecting buyers with developers and property owners across Islamabad and beyond.",
    city: "Islamabad",
    country: "Pakistan",
    location: "Islamabad, Pakistan",
} as const;

/** Display and dialable forms of the one contact number supplied by the client. */
export const contact = {
    phoneDisplay: "+92 315 1282583",
    phoneHref: "tel:+923151282583",
    /** International format, no "+" or spaces — required by wa.me. */
    whatsappNumber: "923151282583",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: readonly NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Projects", href: "/projects" },
    { label: "Developers", href: "/developers" },
    { label: "Calculator", href: "/calculator" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const footerNav = {
    navigate: [
        { label: "Properties", href: "/properties" },
        { label: "Projects", href: "/projects" },
        { label: "Developers", href: "/developers" },
        { label: "List Your Property", href: "/list-your-property" },
        { label: "Calculator", href: "/calculator" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    propertyTypes: [
        { label: "Apartments", href: "/properties?type=apartment" },
        { label: "Shops", href: "/properties?type=shop" },
        { label: "Offices", href: "/properties?type=office" },
        { label: "Shops / Offices", href: "/properties?type=shop-office" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
} as const;
