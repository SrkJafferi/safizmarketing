import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { developers, getProject, projects, propertyUnits } from "@/data/marketplace";
import { DirectoryPropertyCard } from "@/components/marketplace/directory-property-card";
import { PropertiesControls, type DirectoryOptions } from "@/components/marketplace/properties-controls";
import { parseSearch, searchUnits } from "@/lib/marketplace-search";
import { supportsPurpose } from "@/lib/listings";
import { genericWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/marketplace/properties-directory.module.css";

export const metadata = pageMetadata({ title: "Properties for Sale & Rent in Islamabad", description: "Explore residential and commercial properties, apartments, shops, offices and investment opportunities listed through SAFIZMARKETING.", path: "/properties" });
const PAGE_SIZE = 9;
const benefits = [
    { icon: ShieldCheck, title: "Verified Listings", copy: "From Trusted Sources" },
    { icon: MapPin, title: "Multiple Locations", copy: "Islamabad & Beyond" },
    { icon: MessageCircle, title: "Direct Enquiries", copy: "Through SAFIZ MARKETING" },
    { icon: Building2, title: "Residential & Commercial", copy: "Properties in One Place" },
];
export default async function PropertiesPage({ searchParams }: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    const filters = parseSearch(params);
    const results = searchUnits(filters);
    const view = params.view === "list" ? "list" : "grid";
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters))
        if (value && value !== "all" && value !== "any") query.set(key, value);
    if (view === "list") query.set("view", view);
    const pageCount = Math.ceil(results.length / PAGE_SIZE);
    const requested = typeof params.page === "string" && /^\d+$/.test(params.page) ? Number(params.page) : 1;
    const page = Math.max(1, Math.min(requested, pageCount || 1));
    const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const pageHref = (number: number) => {
        const next = new URLSearchParams(query);
        if (number > 1) next.set("page", String(number));
        return `/properties?${next.toString()}#property-listings`;
    };
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1).filter((number) => pageCount <= 7 || number === 1 || number === pageCount || Math.abs(number - page) <= 1 || (page <= 3 && number <= 5) || (page >= pageCount - 2 && number >= pageCount - 4));
    const purposeUnits = propertyUnits.filter(unit => supportsPurpose(unit, filters.purpose));
    const count = (test: (unit: (typeof propertyUnits)[number]) => boolean) => purposeUnits.filter(test).length;
    const typeLabels: Record<string, string> = { apartment: "Apartments", shop: "Shops", office: "Offices", "shop-office": "Shops / Offices" };
    const options: DirectoryOptions = {
        cities: Array.from(new Set(projects.map((p) => p.city))).map((city) => ({ value: city, label: city, count: count((u) => getProject(u.projectId)!.city === city) })),
        areas: Array.from(new Set(projects.map((p) => p.area))).map((area) => ({ value: area, label: area, count: count((u) => getProject(u.projectId)!.area === area) })),
        types: [...Array.from(new Set(purposeUnits.map((u) => u.type))).map((type) => ({ value: type, label: typeLabels[type], count: count((u) => u.type === type) })), { value: "commercial", label: "Commercial", count: count((u) => u.type !== "apartment") }],
        projects: projects.map((p) => ({ value: p.id, label: p.name, count: count((u) => u.projectId === p.id) })),
        developers: developers.map((d) => ({ value: d.id, label: d.name, count: count((u) => getProject(u.projectId)!.developerId === d.id) })),
        floors: Array.from(new Set(purposeUnits.map((u) => u.floor))),
        bedrooms: Array.from(new Set(purposeUnits.filter((u) => u.bedrooms).map((u) => String(u.bedrooms)))),
    };
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <Image src="/banners/properties-hero.avif" alt="Islamabad and the Margalla Hills" fill sizes="100vw" preload className={styles.heroImage} />
                <div className={styles.heroOverlay} />
                <div className="rh-container">
                    <div className={styles.heroCopy}>
                        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span aria-current="page">Properties</span></nav>
                        <p className={styles.eyebrow}>Property Marketplace</p>
                        <h1>Find Your Next<br /><em>Property.</em></h1>
                        <p className={styles.heroDescription}>Explore a wide range of residential, commercial and investment opportunities across Islamabad and beyond.</p>
                    </div>
                    <div className={styles.benefits}>{benefits.map((b) => <div key={b.title}><b.icon aria-hidden="true" /><div><strong>{b.title}</strong><span>{b.copy}</span></div></div>)}</div>
                </div>
            </section>
            <section className={styles.inventory} aria-label="Property marketplace">
                <div className="rh-container">
                    <PropertiesControls key={query.toString()} filters={filters} options={options} total={results.length} view={view}>
                        {results.length ? <>
                            <div className={`${styles.grid} ${view === "list" ? styles.listView : ""}`}>
                                {pageResults.map((unit) => <DirectoryPropertyCard key={unit.id} unit={unit} purpose={filters.purpose === "rent" ? "rent" : "sale"} />)}
                            </div>
                            <nav className={styles.pagination} aria-label="Property pages">
                                {page > 1 ? <Link aria-label="Previous page" href={pageHref(page - 1)}><ChevronLeft size={17} /></Link> : <span aria-disabled="true"><ChevronLeft size={17} /></span>}
                                {pageNumbers.map((number, index) => <span className={styles.pageItem} key={number}>
                                    {index > 0 && number - pageNumbers[index - 1] > 1 && <span className={styles.ellipsis}>…</span>}
                                    <Link href={pageHref(number)} aria-label={`Page ${number}`} aria-current={number === page ? "page" : undefined}>{number}</Link>
                                </span>)}
                                {page < pageCount ? <Link aria-label="Next page" href={pageHref(page + 1)}><ChevronRight size={17} /></Link> : <span aria-disabled="true"><ChevronRight size={17} /></span>}
                            </nav>
                            <p className={styles.showing}>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, results.length)} of {results.length} properties</p>
                        </> : <div className={styles.empty}><h3>No properties match these filters.</h3><p>Try another location, property type or price range.</p><Link href="/properties#property-listings">Clear filters<ArrowRight size={15} /></Link></div>}
                    </PropertiesControls>
                    <p className={styles.sourceNote}>Project imagery is developer-supplied concept material. Published prices may change; contact SAFIZ MARKETING to confirm current availability and details.</p>
                </div>
            </section>
            <section className={styles.help}>
                <div className="rh-container">
                    <div><h2>Need Help Finding<br />the Right Property?</h2><p>Our team is here to guide you with the best options<br />across Islamabad and beyond.</p></div>
                    <div className={styles.helpActions}><a href={genericWhatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Chat on WhatsApp</a><Link href="/contact">Contact Our Team</Link></div>
                </div>
            </section>
        </div>
    );
}
