import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, ChartNoAxesColumnIncreasing, Diamond, FileText, Handshake, Headset, MapPin, MessageCircle, PanelsTopLeft, Users } from "lucide-react";
import { developers, projects } from "@/data/marketplace";
import { genericWhatsappLink, ownerWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import directory from "@/components/marketplace/properties-directory.module.css";
import styles from "@/components/marketplace/developers-directory.module.css";

export const metadata = pageMetadata({ title: "Property Developers", description: "Discover developers and property owners whose projects are listed and marketed through SAFIZMARKETING.", path: "/developers" });
const advantages = [
    { icon: Diamond, title: "Curated Presentation", copy: "Showcase your projects with clear listings and developer-supplied visuals." },
    { icon: Users, title: "Buyer Enquiries", copy: "Connect with buyers exploring their next home or investment opportunity." },
    { icon: MapPin, title: "Location-Based Discovery", copy: "Make your projects easier to discover across Islamabad and selected locations." },
    { icon: Headset, title: "Dedicated Support", copy: "Our team helps with project information, listing enquiries and next steps." },
];
const locations = [
    { label: "Faisal Margalla City (FMC)", href: "/projects/rahat-heights" },
    { label: "Bahria Enclave", href: "/projects/smart-one-heights-2" },
    { label: "Kharian", href: "/projects/rahat-heights-ii" },
];

export default function DevelopersPage() {
    return <div className={`${directory.page} ${styles.page}`}>
        <section className={`${directory.hero} ${styles.hero}`}>
            <Image src="/banners/developers-hero.avif" alt="Twilight villas with a city skyline" fill sizes="100vw" preload className={directory.heroImage} />
            <div className={directory.heroOverlay} />
            <div className="rh-container"><div className={styles.heroContent}>

                <p className={directory.eyebrow}>The People Behind the Places</p>
                <h1>Meet the <em>Developers.</em></h1>
                <p>Explore the developers whose projects are listed on SAFIZ MARKETING.<br />Discover their projects, published information and opportunities—all in one place.</p>
            </div><div className={styles.heroAccent} aria-hidden="true"><span>Partners.</span><p>Listed<br />Developers<br /><em>Meaningful</em><br />Connections</p></div></div>
        </section>

        <section className={styles.featured} aria-label="Featured developers"><div className="rh-container">
            {developers.map((developer) => {
                const developerProjects = projects.filter((project) => project.developerId === developer.id);
                const cities = Array.from(new Set(developerProjects.map((project) => project.city))).join(" & ");
                return <article className={styles.featuredCard} key={developer.id}>
                    <div className={styles.developerInfo}><p className={styles.eyebrow}>Featured Developer</p><div className={styles.identity}>
                        {developer.logo && <div className={styles.logo}><Image src={developer.logo.src} alt={developer.logo.alt} fill sizes="145px" /></div>}
                        <div><h2>{developer.name}</h2><p>{developer.description[0]}</p><div className={styles.tags}><span>Residential</span><span>Commercial</span><span>Mixed-Use</span></div></div>
                    </div><div className={styles.facts}><div><PanelsTopLeft /><p><strong>{developerProjects.length}</strong><span>Listed Projects</span></p></div><div><MapPin /><p><strong>{cities}</strong><span>Key Locations</span></p></div><div><FileText /><p><strong>Project Material</strong><span>Price lists & brochures</span></p></div></div><Link className={styles.goldButton} href={`/developers/${developer.slug}`}>View Developer Profile<ArrowUpRight size={15} /></Link></div>
                    <div className={styles.featuredProjects}><div className={styles.projectsHead}><p className={styles.eyebrow}>Featured Projects</p><Link href={`/projects?developer=${developer.id}`}>View all {developerProjects.length} projects<ArrowRight size={14} /></Link></div><div className={styles.projectLinks}>{developerProjects.map((project) => <Link key={project.id} href={`/projects/${project.slug}`}><div className={styles.projectThumb}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="84px" /></div><div><strong>{project.name}</strong><span>{project.address}</span></div><span className={styles.smallArrow}><ArrowRight size={15} /></span></Link>)}</div></div>
                </article>;
            })}
        </div></section>

        <section className={styles.coverage} aria-label="Developer locations"><div className="rh-container"><div className={styles.coveragePanel}>
            <div className={styles.coverageCopy}><p className={styles.eyebrow}>Our Developer Coverage</p><h2>Where Our<br />Developers Build.</h2><p>Our listed projects span Islamabad and Kharian, bringing together residential and commercial spaces across three locations.</p><dl className={styles.coverageStats}><div><dd>{new Set(projects.map((project) => project.area)).size}</dd><dt>Key Locations</dt></div><div><dd>{projects.length}</dd><dt>Listed Projects</dt></div><div><dd>{developers.length}</dd><dt>Listed Developer</dt></div></dl></div>
            <div className={styles.coverageMap}><iframe title="Regional map of Islamabad and surrounding developer locations" src="https://www.google.com/maps?q=Islamabad,Pakistan&z=8&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className={styles.mapBadge}><ChartNoAxesColumnIncreasing size={22} /><span>Projects across<br />Islamabad & Kharian</span></div><nav className={styles.locationLinks} aria-label="Projects by location">{locations.map((location) => <Link key={location.label} href={location.href}><MapPin size={15} />{location.label}<ArrowUpRight size={12} /></Link>)}</nav></div>
        </div></div></section>

        <section className={styles.partners}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Listed Developers</p><h2>Our Developer Partners.</h2></div><Link href="/list-your-property">Join our developer network<ArrowRight size={15} /></Link></div><div className={styles.partnerGrid}>
            {developers.map((developer) => {
                const developerProjects = projects.filter((project) => project.developerId === developer.id);
                return <Link key={developer.id} href={`/developers/${developer.slug}`} className={`${styles.partnerCard} ${styles.listedCard}`}>
                    {developerProjects[0] && <Image src={developerProjects[0].cover.src} alt={developerProjects[0].cover.alt} fill sizes="(min-width: 1000px) 30vw, 90vw" className={styles.partnerImage} />}
                    <div className={styles.partnerContent}>{developer.logo && <Image src={developer.logo.src} alt={developer.logo.alt} width={75} height={74} className={styles.partnerLogo} />}<h3>{developer.name}</h3><p>{developerProjects.length} Projects <span> | </span> Islamabad & Kharian</p><div className={styles.tags}><span>Residential</span><span>Commercial</span><span>Mixed-Use</span></div></div><span className={styles.cardArrow}><ArrowRight size={20} /></span>
                </Link>;
            })}
            <article className={styles.partnerCard}><Image src="/banners/developers-hero.avif" alt="Twilight residential architecture" fill sizes="(min-width: 1000px) 30vw, 90vw" className={styles.partnerImage} /><div className={styles.partnerContent}><Building2 size={42} /><h3>More Developers.<br />More Possibilities.</h3><p>Our platform welcomes developers who want to present their projects and connect with buyers.</p></div></article>
            <Link href="/list-your-property" className={styles.partnerCard}><Image src="/images/cta-skyline.jpg" alt="City skyline; editorial photography" fill sizes="(min-width: 1000px) 30vw, 90vw" className={styles.partnerImage} /><div className={styles.partnerContent}><Handshake size={43} /><h3>Partner With<br />SAFIZ MARKETING.</h3><p>Are you a developer? Start a listing enquiry and showcase your projects on our platform.</p></div><span className={styles.cardArrow}><ArrowRight size={20} /></span></Link>
        </div></div></section>

        <section className={styles.advantages}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Why Developers List With Us</p><h2>Built for Greater Reach.</h2></div><p>Present your projects on one focused property platform, share your published information and connect with interested buyers.</p></div><div className={styles.advantageGrid}>{advantages.map((item) => <div key={item.title}><item.icon size={38} strokeWidth={1.3} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.copy}</p></div></div>)}</div></div></section>

        <section className={styles.partnerCta}><Image src="/banners/golden-hour-penthouse.avif" alt="Penthouse terrace overlooking the city at sunset" fill sizes="100vw" className={styles.ctaImage} /><div className="rh-container"><div><p className={styles.eyebrow}>Partner With SAFIZ MARKETING</p><h2>Showcase Your Projects<br />to Serious Buyers.</h2><p>Join our platform and connect your development with people exploring their next property opportunity.</p></div><div className={styles.ctaActions}><Link className={styles.goldButton} href="/list-your-property">Partner with SAFIZ MARKETING<ArrowUpRight size={15} /></Link><a className={styles.outlineButton} href={ownerWhatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />Chat on WhatsApp</a></div></div></section>
        <section className={styles.nextStep}><div className="rh-container"><div><p className={styles.eyebrow}>Your Next Step</p><h2>Let’s build better property connections.</h2><p>Whether you’re a developer or property owner, we’re here to help you take the next step.</p></div><a className={styles.whiteButton} href={genericWhatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />Let’s talk on WhatsApp<ArrowUpRight size={15} /></a></div></section>
    </div>;
}
