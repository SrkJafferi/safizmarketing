import type { MetadataRoute } from "next";
import { developers, projects, propertyUnits } from "@/data/marketplace";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/properties",
        "/projects",
        "/developers",
        "/calculator",
        "/list-your-property",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
        ...projects.map((p) => `/projects/${p.slug}`),
        ...developers.map((d) => `/developers/${d.slug}`),
        ...propertyUnits.map((u) => `/properties/${u.slug}`),
    ];
    // This metadata route is prerendered: its timestamp records this published build.
    const lastModified = new Date();
    return routes.map((path) => ({
        url: new URL(path || "/", site.url).href,
        lastModified,
        changeFrequency: ["/privacy", "/terms"].includes(path) ? "yearly" : "weekly",
        priority: path === "" ? 1 : ["/privacy", "/terms"].includes(path) ? 0.3 : 0.7,
    }));
}
