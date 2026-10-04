import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, ChevronLeft, ChevronRight, Diamond, Handshake, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { developers, projects } from "@/data/marketplace";
import { HomeFavorite } from "@/components/marketplace/home-favorite";
import { ProjectsControls, type ProjectFilters } from "@/components/marketplace/projects-controls";
import { genericWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import directory from "@/components/marketplace/properties-directory.module.css";
import styles from "@/components/marketplace/projects-directory.module.css";

export const metadata = pageMetadata({ title: "Real Estate Projects in Islamabad", description: "Explore real estate projects from developers listed on SAFIZMARKETING, including residential, commercial and mixed-use opportunities.", path: "/projects" });
const benefits = [
    { icon: Diamond, title: "Prime Locations", copy: "Islamabad & Beyond" },
    { icon: Building2, title: "Featured Developers", copy: "Meet the People Behind the Projects" },
    { icon: Handshake, title: "Diverse Opportunities", copy: "Residential, Commercial & Mixed-Use" },
    { icon: ShieldCheck, title: "Project Information", copy: "Projects, Units & Published Plans" },
];
export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const params = await searchParams;
    const valid = (key: string, values: string[], fallback = "all") => typeof params[key] === "string" && values.includes(params[key]) ? params[key] : fallback;
    const cities = Array.from(new Set(projects.map((project) => project.city)));
    const filters: ProjectFilters = {
        city: valid("city", cities), developer: valid("developer", developers.map((developer) => developer.id)),
        type: valid("type", ["residential", "commercial", "mixed-use", "upcoming"]),
        sort: valid("sort", ["featured", "name-asc", "name-desc"], "featured"),
    };
    const results = projects.filter((project) => {
        if (filters.city !== "all" && project.city !== filters.city) return false;
        if (filters.developer !== "all" && project.developerId !== filters.developer) return false;
        if (filters.type === "upcoming") return false;
        if (filters.type === "mixed-use") return project.projectType.toLowerCase() === "mixed-use";
        if (filters.type === "residential") return project.categories.some((category) => /apartment|penthouse|residential/i.test(category));
        if (filters.type === "commercial") return project.categories.some((category) => /shop|office|commercial/i.test(category));
        return true;
    }).sort((a, b) => filters.sort === "name-asc" ? a.name.localeCompare(b.name) : filters.sort === "name-desc" ? b.name.localeCompare(a.name) : Number(b.featured) - Number(a.featured));
    return <div className={`${directory.page} ${styles.page}`}>
        <section className={`${directory.hero} ${styles.hero}`}>
            <Image src="/banners/golden-hour-penthouse.avif" alt="Golden-hour penthouse overlooking the city" fill sizes="100vw" preload className={directory.heroImage} />
            <div className={directory.heroOverlay} />
            <div className="rh-container">
                <div className={directory.heroCopy}>

                    <p className={directory.eyebrow}>Featured Projects</p>
                    <h1>Explore <em>Projects.</em></h1>
                    <p className={directory.heroDescription}>Discover the place, the developer and the possibilities.<br />Explore residential, commercial and investment projects across Islamabad and beyond.</p>
                </div>
                <div className={directory.benefits}>{benefits.map((benefit) => <div key={benefit.title}><benefit.icon aria-hidden="true" /><div><strong>{benefit.title}</strong><span>{benefit.copy}</span></div></div>)}</div>
            </div>
        </section>
        <section className={styles.inventory} aria-label="Project collection"><div className="rh-container">
            <ProjectsControls key={JSON.stringify(filters)} filters={filters} cities={cities.map((city) => ({ value: city, label: city }))} developers={developers.map((developer) => ({ value: developer.id, label: developer.name }))} total={results.length}>
                {results.length ? <>
                    <div className={styles.grid}>{results.map((project) => {
                        const developer = developers.find((item) => item.id === project.developerId)!;
                        return <article className={styles.card} key={project.id}>
                            <div className={styles.photo}>
                                <Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}`}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1000px) 29vw, 90vw" className="object-cover" /></Link>
                                <span className={styles.badge}>{project.featured ? "Featured" : project.projectType}</span>
                                <HomeFavorite unitLabel={project.name} />
                                <span className={styles.imageNote}>Developer concept render</span>
                            </div>
                            <div className={styles.cardBody}>
                                <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
                                <p className={styles.address}><MapPin size={14} />{project.address}</p>
                                <p className={styles.categories}><Building2 size={13} />{project.categories.join(" · ")}</p>
                                <div className={styles.cardFoot}><Link href={`/developers/${developer.slug}`}><Building2 size={17} />By {developer.name}</Link><Link href={`/projects/${project.slug}`}>View Project<ArrowUpRight size={14} /></Link></div>
                            </div>
                        </article>;
                    })}</div>
                    <nav className={styles.pagination} aria-label="Project pages"><span aria-disabled="true"><ChevronLeft size={16} /></span><span aria-current="page" aria-label="Page 1">1</span><span aria-disabled="true"><ChevronRight size={16} /></span></nav>
                </> : <div className={styles.empty}><h3>{filters.type === "upcoming" ? "No upcoming projects listed yet." : "No projects match these filters."}</h3><p>Explore our current collection or contact our team for more information.</p><Link href="/projects#project-listings">View All Projects</Link></div>}
            </ProjectsControls>
            <p className={styles.note}>Project imagery and information are developer-supplied. Contact SAFIZ MARKETING to confirm current details and availability.</p>
        </div></section>
        <section className={styles.help}><div className="rh-container">
            <div><p>Your Next Opportunity</p><h2>Let’s Find the Right Project<br /><em>for You.</em></h2></div>
            <p className={styles.helpCopy}>Our team is here to guide you with the best project options across Islamabad and beyond. Get expert advice, latest updates and direct developer information.</p>
            <div className={styles.helpActions}><a href={genericWhatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />Chat on WhatsApp</a><Link href="/contact">Contact Our Team</Link></div>
        </div></section>
    </div>;
}
