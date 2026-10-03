import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, ChevronRight, FileText, Handshake, Headset, MapPin, ShieldCheck, Users } from "lucide-react";
import { developers, projects, propertyUnits } from "@/data/marketplace";
import { genericWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import directory from "@/components/marketplace/properties-directory.module.css";
import styles from "@/components/marketplace/about.module.css";
export const metadata = pageMetadata({ title: "About SAFIZMARKETING | Property Discovery Platform", description: "Learn how SAFIZMARKETING connects property buyers with developers and owners through curated property discovery and direct enquiries.", path: "/about", absoluteTitle: true });
const benefits = [
    { icon: ShieldCheck, title: "Developer Information", copy: "From Supplied Project Material" },
    { icon: Building2, title: "Curated Projects", copy: "Across Prime Locations" },
    { icon: Users, title: "Direct Enquiries", copy: "A Simpler Way to Connect" },
    { icon: Headset, title: "Dedicated Guidance", copy: "Throughout Your Search" },
];
const reasons = [
    { icon: Handshake, title: "Curated Projects", copy: "Explore developer-supplied brochures and project information." },
    { icon: MapPin, title: "Prime Locations", copy: "Islamabad and selected developments in Kharian." },
    { icon: FileText, title: "Clear Information", copy: "Published price lists, floor plans and project details." },
    { icon: Headset, title: "Dedicated Support", copy: "Guidance on your enquiry, unit details and next steps." },
];
const steps = [
    { title: "Explore Projects", copy: "Browse projects and published property schedules.", href: "/projects" },
    { title: "Get Information", copy: "Review price lists, floor plans and project details.", href: "/properties" },
    { title: "Connect Directly", copy: "Discuss your enquiry with the SAFIZ MARKETING team.", href: "/contact" },
    { title: "Make an Informed Decision", copy: "Confirm current details with the relevant owner or developer.", href: "/contact" },
];
export default function AboutPage() {
    const stats = [
        { value: developers.length, label: "Featured Developer" },
        { value: projects.length, label: "Projects Showcased" },
        { value: propertyUnits.length, label: "Published Property Options" },
        { value: new Set(projects.map((project) => project.city)).size, label: "Cities Represented" },
    ];
    return <div className={`${directory.page} ${styles.page}`}>
        <section className={`${directory.hero} ${styles.hero}`}>
            <Image src="/banners/golden-hour-penthouse.avif" alt="Golden-hour penthouse overlooking the city" fill sizes="100vw" preload className={directory.heroImage} />
            <div className={directory.heroOverlay} />
            <div className="rh-container"><div className={`${directory.heroCopy} ${styles.heroCopy}`}>
                <nav className={directory.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span aria-current="page">About</span></nav>
                <p className={directory.eyebrow}>About SAFIZ MARKETING</p>
                <h1><span>Connecting People to</span><br /><em>Better Possibilities.</em></h1>
                <p className={directory.heroDescription}>A property platform built around clear information, thoughtful guidance and meaningful connections across Islamabad and beyond.</p>
            </div><div className={directory.benefits}>{benefits.map((item) => <div key={item.title}><item.icon aria-hidden="true" /><div><strong>{item.title}</strong><span>{item.copy}</span></div></div>)}</div></div>
        </section>
        <section className={styles.story}><div className="rh-container">
            <div className={styles.storyGrid}><div><p className={styles.eyebrow}>Our Story</p><h2>Built on Trust.<br />Driven by People.</h2><p className={styles.copy}>SAFIZ MARKETING brings buyers, developers and property owners together through one focused property discovery platform. We make it easier to explore projects, understand published information and connect with the people behind each opportunity.</p><p className={styles.copy}>Rahat Associates is our first onboarded developer, with three listed projects across Islamabad and Kharian. Their supplied brochures and price lists form the basis of the project and unit information.</p><Link className={styles.goldButton} href="#how-it-works">Our Journey<ArrowUpRight size={15} /></Link></div>
            <div className={styles.storyImage}><Image src="/images/about-approach.jpg" alt="Modern residential architecture; editorial photography" fill sizes="(min-width: 1000px) 48vw, 90vw" className="object-cover" /><div className={styles.storyOverlay}><Users size={40} /><h3>More Than<br />Properties.</h3><p>We build connections through clear information, thoughtful guidance and personal service.</p></div></div></div>
            <dl className={styles.stats}>{stats.map((item) => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}</dt></div>)}</dl>
            <div className={styles.why}><p className={styles.eyebrow}>Why SAFIZ MARKETING</p><h2>A Smarter Way to Explore Real Estate.</h2><p className={styles.copy}>We bring project information, published developer material and direct enquiries together to help you explore your options with clarity.</p><div className={styles.reasonGrid}>{reasons.map((item) => <div key={item.title}><item.icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div></div>
        </div></section>
        <section className={styles.developers}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Our Developers</p><h2>Meet the Developers.<br />Explore Their Projects.</h2></div><div><p>Discover the developers behind our listed projects, explore their supplied material and connect with our team for current details.</p><Link className={styles.goldButton} href="/developers">View All Developers<ArrowUpRight size={15} /></Link></div></div>
            <div className={styles.developerGrid}>{developers.map((developer) => <Link key={developer.id} href={`/developers/${developer.slug}`} className={styles.developerCard}>{developer.logo && <Image src={developer.logo.src} alt={developer.logo.alt} width={58} height={54} className="object-contain" />}<div><h3>{developer.name}</h3><p>Residential & commercial projects.</p></div><ArrowUpRight size={17} /></Link>)}<Link className={styles.developerCard} href="/list-your-property"><Building2 size={42} /><div><h3>For Developers</h3><p>Present your projects on our platform.</p></div><ArrowUpRight size={17} /></Link><Link className={styles.developerCard} href="/list-your-property"><Handshake size={42} /><div><h3>For Property Owners</h3><p>Connect your property with buyers.</p></div><ArrowUpRight size={17} /></Link></div>
        </div></section>
        <section className={styles.featured}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Featured Projects</p><h2>Signature Developments.</h2></div><Link className={styles.textLink} href="/projects">View all projects<ArrowUpRight size={15} /></Link></div><div className={styles.projectGrid}>{projects.map((project) => <article key={project.id}><Link className={styles.projectImage} href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}`}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1000px) 29vw, 90vw" className="object-cover" /><span>{project.categories.join(" · ")}</span></Link><div className={styles.projectBody}><div><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><p><MapPin size={12} />{project.address}</p></div><Link className={styles.projectArrow} href={`/projects/${project.slug}`} aria-label={`View ${project.name}`}><ArrowRight size={18} /></Link></div></article>)}</div></div></section>
        <section className={styles.process} id="how-it-works"><div className="rh-container"><p className={styles.eyebrow}>How It Works</p><h2>From Enquiry to Your Next Move.</h2><ol className={styles.steps}>{steps.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3><Link href={item.href}>{item.title}</Link></h3><p>{item.copy}</p>{index < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" />}</li>)}</ol></div></section>
        <section className={styles.cta}><div className={styles.ctaImage}><Image src="/images/gallery-lounge.jpg" alt="Bright living room; editorial interior photography" fill sizes="50vw" className="object-cover" /></div><div className={styles.ctaCopy}><p className={styles.eyebrow}>Your Next Opportunity</p><h2>Let’s Build Your<br />Next Move Together.</h2><p>Whether you’re looking for a home, a business space or a long-term investment, our team is here to guide you through your options.</p><div className={styles.ctaActions}><a className={styles.goldButton} href={genericWhatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp<ArrowUpRight size={15} /></a><Link className={styles.outlineButton} href="/contact">Contact Our Team</Link></div></div></section>
    </div>;
}
