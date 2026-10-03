import type { Metadata } from "next";
import { contact, seoSite, site } from "@/lib/site";

/**
 * SEO helpers.
 *
 * Structured data is restricted to facts the client actually supplied: name,
 * description, supplied contact information and the site's own URL structure.
 * No invented ratings, reviews, opening hours or coordinates.
 */

export function pageMetadata({
    title,
    description,
    path,
    absoluteTitle = false,
}: {
    title: string;
    description: string;
    path: string;
    absoluteTitle?: boolean;
}): Metadata {
    const url = new URL(path, site.url).href;
    const fullTitle = absoluteTitle ? title : `${title} | ${seoSite.name}`;
    const image = new URL(seoSite.ogImage, site.url).href;
    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            siteName: seoSite.name,
            locale: site.locale,
            url,
            title: fullTitle,
            description,
            images: [{ url: image, width: seoSite.ogWidth, height: seoSite.ogHeight, alt: seoSite.ogAlt, type: "image/jpeg" }],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [{ url: image, alt: seoSite.ogAlt }],
        },
    };
}

export function organisationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#organisation`,
        name: seoSite.name,
        alternateName: `${site.name} ${site.division}`,
        url: site.url,
        description: seoSite.description,
        logo: `${site.url}/brand/safiz-logo.webp`,
        image: `${site.url}${seoSite.ogImage}`,
        email: "info@safizmarketing.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Office 6, 2nd Floor United Plaza, Fazal Haq Road, Blue Area, Back Side of NADRA Office",
            addressLocality: "Islamabad",
            addressCountry: "PK",
        },
        telephone: contact.phoneDisplay,
        areaServed: { "@type": "Country", name: site.country },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: `+${contact.whatsappNumber}`,
            contactType: "sales",
            areaServed: "PK",
            availableLanguage: ["en", "ur"],
        },
        knowsAbout: [
            "Property discovery in Pakistan",
            "Developer projects in Islamabad and Kharian",
            "Apartments, shops and offices",
        ],
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: seoSite.name,
        description: seoSite.description,
        inLanguage: "en-PK",
        publisher: { "@id": `${site.url}/#organisation` },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${site.url}/properties?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

export function breadcrumbJsonLd(
    trail: readonly { name: string; path: string }[],
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${site.url}${item.path === "/" ? "" : item.path}`,
        })),
    };
}

/** Serialises one or more JSON-LD blocks for a <script> tag. */
export function jsonLdScript(...blocks: unknown[]) {
    return {
        __html: JSON.stringify(
            blocks.length === 1 ? blocks[0] : blocks,
        ).replace(/</g, "\\u003c"),
    };
}
