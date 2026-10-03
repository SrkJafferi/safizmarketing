import type { MetadataRoute } from "next";

import { isPreviewDeployment, site } from "@/lib/site";

/**
 * Public production pages and social images remain crawlable.
 * Preview deployments are excluded without changing production canonicals.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                ...(isPreviewDeployment ? { disallow: "/" } : { allow: "/", disallow: ["/api/"] }),
            },
        ],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}
