import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { SiteSmoothScroll } from "@/components/layout/site-smooth-scroll";
import { organisationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import { isPreviewDeployment, seoSite, site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-manrope",
});

const bodoniModa = Bodoni_Moda({
    subsets: ["latin"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-bodoni-moda",
});

export const metadata: Metadata = {
    ...pageMetadata({ title: seoSite.title, description: seoSite.description, path: "/", absoluteTitle: true }),
    metadataBase: new URL(site.url),
    title: {
        default: seoSite.title,
        template: `%s | ${seoSite.name}`,
    },
    applicationName: seoSite.name,
    keywords: [
        "Islamabad real estate",
        "property in Islamabad",
        "residential plots Islamabad",
        "Rahat Associates projects",
        "Apartments and offices Pakistan",
        "Grand City Kharian",
        "SAFIZ MARKETING",
    ],
    robots: {
        index: !isPreviewDeployment,
        follow: !isPreviewDeployment,
        googleBot: { index: !isPreviewDeployment, follow: !isPreviewDeployment, "max-image-preview": "large" },
    },
    formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
    themeColor: "#061827",
    colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en-PK"
            data-scroll-behavior="smooth"
            className={`${manrope.variable} ${bodoniModa.variable} scroll-smooth`}
        >
            <body className="flex min-h-dvh flex-col">
                <a
                    href="#main"
                    className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-[3px] focus-visible:bg-gold-400 focus-visible:px-5 focus-visible:py-3 focus-visible:text-[0.8rem] focus-visible:font-semibold focus-visible:uppercase focus-visible:tracking-[0.08em] focus-visible:text-navy-950"
                >
                    Skip to content
                </a>

                <SiteSmoothScroll>
                    <SiteHeader />
                    <main id="main" className="flex-1">
                        {children}
                    </main>
                    <SiteFooter />
                    <WhatsappFloat />
                </SiteSmoothScroll>

                <script
                    type="application/ld+json"
                    // Static, build-time JSON built from `src/lib/seo.ts` — no user input.
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            organisationJsonLd(),
                            websiteJsonLd(),
                        ]),
                    }}
                />
            </body>
        </html>
    );
}
