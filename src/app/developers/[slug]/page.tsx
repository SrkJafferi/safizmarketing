import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, ChevronRight, FileText, Mail, MapPin, MessageCircle, PanelsTopLeft, Phone } from "lucide-react";
import { developers, getDeveloper, projects, propertyUnits } from "@/data/marketplace";
import { DeveloperProfileNav } from "@/components/marketplace/developer-profile-nav";
import { contact } from "@/lib/site";
import { developerWhatsappLink } from "@/lib/whatsapp";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import styles from "@/components/marketplace/developer-profile.module.css";

export function generateStaticParams() { return developers.map((developer) => ({ slug: developer.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const developer = getDeveloper((await params).slug);
    if (!developer) return {};
    const collection = projects.filter((project) => project.developerId === developer.id);
    const cities = [...new Set(collection.map((project) => project.city))];
    return pageMetadata({ title: developer.name, description: `Explore ${developer.name} projects listed on SAFIZMARKETING${cities.length ? `, including developments in ${cities.join(" and ")}` : ""}. View the project portfolio and developer-supplied information.`, path: `/developers/${developer.slug}` });
}
const officeAddress = "Office 6, 2nd Floor United Plaza Fazal Haq Road Blue Area, Back Side of NADRA Office, Islamabad";
const mapLink = "https://maps.app.goo.gl/iRWr2Fzf3sxQGrVcA";
export default async function DeveloperPage({ params }: { params: Promise<{ slug: string }> }) {
    const developer = getDeveloper((await params).slug);
    if (!developer) notFound();
    const collection = projects.filter((project) => project.developerId === developer.id);
    const units = propertyUnits.filter((unit) => collection.some((project) => project.id === unit.projectId));
    const cities = Array.from(new Set(collection.map((project) => project.city)));
    const whatsapp = developerWhatsappLink(developer);
    const stats = [
        { icon: PanelsTopLeft, value: collection.length, label: "Projects Listed" },
        { icon: Building2, value: units.length, label: "Published Property Options" },
        { icon: MapPin, value: cities.length, label: "Cities Represented" },
    ];
    return <div className={styles.page}>
        <section className={styles.banner} aria-label={`${developer.name} profile banner`}><Image src="/banners/developers-hero.avif" alt="Twilight villas with a city skyline; illustrative banner" fill sizes="100vw" preload /></section>
        <div className="rh-container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={12} /><Link href="/developers">Developers</Link><ChevronRight size={12} /><span aria-current="page">{developer.name}</span></nav>
            <section className={styles.profile} id="overview">
                {developer.logo && <div className={styles.logo}><Image src={developer.logo.src} alt={developer.logo.alt} fill sizes="220px" /></div>}
                <div className={styles.summary}><p className={styles.eyebrow}>Developer</p><h1>{developer.name}</h1><p className={styles.locationLabel}><MapPin size={14} />{developer.location}</p><p className={styles.copy}>{developer.description[0]}</p></div>
                <dl className={styles.stats}>{stats.map((stat) => <div key={stat.label}><span><stat.icon size={21} /></span><div><dd>{stat.value}</dd><dt>{stat.label}</dt></div></div>)}</dl>
            </section>
            <DeveloperProfileNav />
            <section className={styles.projects} id="developer-projects"><div className={styles.sectionHead}><div><h2>Featured Projects</h2><p>Explore the projects by {developer.name}, listed on SAFIZ MARKETING.</p></div><Link className={styles.outlineButton} href={`/projects?developer=${developer.id}`}>View All Projects<ArrowRight size={15} /></Link></div>
                <div className={styles.projectGrid}>{collection.map((project) => <article key={project.id}><Link className={styles.projectImage} href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}`}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1000px) 30vw, 90vw" /></Link><div className={styles.projectBody}><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><p><MapPin size={12} />{project.address}</p><div className={styles.tags}><span>Residential</span><span>Commercial</span>{project.projectType.toLowerCase() === "mixed-use" && <span>Mixed-Use</span>}</div><Link className={styles.projectLink} href={`/projects/${project.slug}`}>View Project<ArrowRight size={13} /></Link></div></article>)}</div>
            </section>
            <section className={styles.about}><div><p className={styles.eyebrow}>About the Developer</p><h2>A Portfolio for Living.<br />Spaces for Business.</h2>{developer.description.map((paragraph) => <p className={styles.copy} key={paragraph}>{paragraph}</p>)}<div className={styles.highlights}><div><MapPin /><h3>Project Locations</h3><p>{cities.join(" & ")}.</p></div><div><Building2 /><h3>Mixed-Use Spaces</h3><p>Shops, offices and residential apartments.</p></div><div><FileText /><h3>Published Material</h3><p>Explore developer-supplied brochures and plans.</p></div></div></div><div className={styles.aboutImage}>{collection[1] && <Image src={collection[1].cover.src} alt={collection[1].cover.alt} fill sizes="(min-width: 1000px) 40vw, 90vw" />}<span>Developer concept render</span></div></section>
            <section className={styles.office} id="developer-location"><div><h2>Visit Our Office</h2><p>Speak to SAFIZ MARKETING about the developer’s projects, property details and your next steps.</p><address><MapPin size={17} />{officeAddress}</address><a className={styles.goldButton} href={mapLink} target="_blank" rel="noopener noreferrer">Get Directions<ArrowRight size={15} /></a></div><iframe title="SAFIZ MARKETING office location" src="https://www.google.com/maps?q=33.672041,73.019958&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></section>
            <section className={styles.brochures} id="developer-brochures"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Project Documents</p><h2>Explore the Brochures.</h2><p>Project layouts and information supplied by {developer.name}.</p></div></div><div className={styles.documentGrid}>{collection.map((project) => <a key={project.id} href={project.brochure} target="_blank" rel="noopener noreferrer"><span><FileText size={25} /></span><div><h3>{project.name}</h3><p>View original project brochure · PDF</p></div><ArrowUpRight size={18} /></a>)}</div></section>
            <section className={styles.contactSection}><h2>Get in Touch About {developer.name}</h2><p>For project details and published unit information, connect with the SAFIZ MARKETING team.</p><div className={styles.contactGrid}><a href={contact.phoneHref}><Phone size={21} /><span>Call Our Team</span><strong>{contact.phoneDisplay}</strong></a><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={21} /><span>WhatsApp</span><strong>{contact.phoneDisplay}</strong></a><a href="mailto:info@safizmarketing.com"><Mail size={21} /><span>Email</span><strong>info@safizmarketing.com</strong></a><a href={mapLink} target="_blank" rel="noopener noreferrer"><MapPin size={21} /><strong>SAFIZ MARKETING Office</strong><address>{officeAddress}</address></a></div></section>
        </div>
        <section className={styles.cta}><div className="rh-container"><div><p className={styles.eyebrow}>Explore the Developer’s Projects</p><h2>Interested in a Project<br />by {developer.name}?</h2></div><div><p>Our team can help you explore published plans and unit information, and confirm current availability.</p><div className={styles.ctaActions}><a className={styles.goldButton} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />Chat on WhatsApp</a><Link className={styles.outlineButton} href="/contact">Contact Our Team</Link></div></div></div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Developers", path: "/developers" }, { name: developer.name, path: `/developers/${developer.slug}` }]))} />
    </div>;
}
