import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Coins, FileText, Headset, MapPin, MessageCircle, Phone, Ruler, Star, Store } from "lucide-react";
import { getDeveloper, getProject, propertyUnits, unitSizeLabel, unitTypeLabel } from "@/data/marketplace";
import { Breadcrumbs } from "@/components/marketplace/common";
import { MediaGallery } from "@/components/marketplace/gallery";
import { UnitGallery } from "@/components/marketplace/unit-gallery";
import { formatExactPkr, formatPkr } from "@/lib/format";
import { unitWhatsappLink } from "@/lib/whatsapp";
import { contact } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import styles from "@/components/marketplace/property-detail.module.css";
export function generateStaticParams() { return propertyUnits.map((unit) => ({ slug: unit.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const unit = propertyUnits.find((item) => item.slug === slug);
    if (!unit) return {};
    const project = getProject(unit.projectId)!;
    return pageMetadata({ title: `${unit.unitNumber} – ${unit.floor} – ${project.name}`, description: `Explore ${unit.unitNumber}, a ${unitTypeLabel(unit)} in ${project.name}, ${project.address}.${unit.sizeSqFt != null ? ` Size: ${unitSizeLabel(unit)}.` : ""}${Number.isFinite(unit.price) && unit.price > 0 ? ` Published price: ${formatPkr(unit.price)}.` : ""} View project details and enquire through SAFIZMARKETING.`, path: `/properties/${unit.slug}` });
}
export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const unit = propertyUnits.find((item) => item.slug === slug);
    if (!unit) notFound();
    const project = getProject(unit.projectId)!;
    const developer = getDeveloper(project.developerId)!;
    const plan = project.paymentPlan;
    const related = propertyUnits.filter((item) => item.id !== unit.id && item.projectId === project.id && item.type === unit.type).slice(0, 3);
    const images = [project.cover, ...project.gallery].filter((item, index, all) => all.findIndex((other) => other.src === item.src) === index);
    const highlights = [
        { icon: MapPin, title: "Prime Location", copy: `Located in ${project.area}, ${project.city}. Explore the project's location and connections.` },
        { icon: CalendarDays, title: "Published Payment Plan", copy: `${unit.installmentCount} ${unit.paymentFrequency} installments, as provided in the developer price list.` },
        { icon: FileText, title: "Developer Price List", copy: "Review the published price and original project documentation." },
        { icon: Headset, title: "SAFIZ MARKETING Support", copy: "Get guidance on unit details, availability and the next steps." },
    ];
    return <div className={styles.page}>
        <div className={styles.headerBackdrop} />
        <div className={styles.breadcrumb}><div className="rh-container"><Breadcrumbs items={[{ label: "Properties", href: "/properties" }, { label: project.name, href: `/projects/${project.slug}` }, { label: `${unit.unitNumber} · ${unit.floor}` }]} /></div></div>
        <section className={styles.overview}><div className={`rh-container ${styles.overviewGrid}`}>
            <UnitGallery items={images} label={unitTypeLabel(unit)} />
            <div className={styles.summary}>
                <div className={styles.summaryTop}><p className={styles.eyebrow}>{unit.floor} floor · {unit.category}</p>{unit.featured && <span><Star size={12} fill="currentColor" />Featured Unit</span>}</div>
                <h1>{unit.unitNumber}</h1><p className={styles.type}>{unitTypeLabel(unit)}</p>
                <Link className={styles.projectLink} href={`/projects/${project.slug}`}><Building2 size={16} />{project.name}<ArrowRight size={14} /></Link>
                <p className={styles.meta}><MapPin size={15} />{project.address}</p>
                <Link className={styles.meta} href={`/developers/${developer.slug}`}><Building2 size={15} />By {developer.name}</Link>
                <div className={styles.price}><p className={styles.eyebrow}>Total Price (Developer Price)</p><strong>{formatPkr(unit.price)}</strong></div>
                <dl className={styles.facts}>{[{ icon: Ruler, title: "Size", value: unitSizeLabel(unit) }, { icon: Store, title: "Floor", value: unit.floor }, { icon: Building2, title: "Property Type", value: unitTypeLabel(unit) }].map((fact) => <div key={fact.title}><fact.icon aria-hidden="true" /><div><dt>{fact.title}</dt><dd>{fact.value}</dd></div></div>)}</dl>
                <p className={styles.availability}>Contact for current availability</p>
                <a className={styles.primaryButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Ask about this unit<ArrowRight size={15} /></a>
                <a className={styles.outlineButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Chat on WhatsApp</a>
            </div>
        </div></section>
        <div className="rh-container">
            {plan && <section className={styles.payment}>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{plan.sourceLabel} · Page {unit.sourcePage}</p><h2>Your published payment plan.</h2></div><p>These are the amounts provided in the published developer plan. Generic financing estimates are available separately in the mortgage calculator.</p></div>
                <div className={styles.paymentGrid}>{[
                    { icon: Coins, title: "Down Payment", copy: `${plan.downPercent}% down payment`, amount: unit.downPayment },
                    { icon: CalendarDays, title: "Quarterly Installments", copy: `Each of ${unit.installmentCount} quarterly installments`, amount: unit.installmentAmount },
                    { icon: FileText, title: "Total Developer Price", copy: "As per published price list", amount: unit.price },
                ].map((item) => <div key={item.title}><span className={styles.iconCircle}><item.icon /></span><div><h3>{item.title}</h3><p>{item.copy}</p><strong>{formatExactPkr(item.amount)}</strong></div></div>)}</div>
                <div className={styles.paymentFoot}><nav aria-label="Payment plan resources"><a href={unit.source} target="_blank" rel="noopener noreferrer">View original price list<ArrowUpRight size={14} /></a><Link href={`/projects/${project.slug}#inventory`}>Compare project inventory<ArrowRight size={14} /></Link><Link href="/calculator">Mortgage estimate<ArrowRight size={14} /></Link></nav>{plan.note && <p>{plan.note}</p>}</div>
            </section>}
            <section className={styles.plans}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Understand the Layout</p><h2>Project floor plans.</h2></div><p>Plans are from the developer brochure. Confirm the layout applicable to this unit with SAFIZ MARKETING.</p></div><MediaGallery items={project.floorPlans} label={`${project.name} floor plans`} plans /></section>
            <section className={styles.highlights}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Why This Unit Stands Out</p><h2>{unit.type === "apartment" ? "A smart choice for modern living." : "A smart space for your next move."}</h2></div><p>Explore this {unitTypeLabel(unit).toLowerCase()} at {project.name}, with published developer pricing and project information.</p></div><div className={styles.highlightGrid}>{highlights.map((item) => <div key={item.title}><span className={styles.iconCircle}><item.icon /></span><div><h3>{item.title}</h3><p>{item.copy}</p></div></div>)}</div></section>
        </div>
        {related.length > 0 && <section className={styles.related}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>In the Same Project</p><h2>Other spaces to consider.</h2></div><Link href={`/properties?project=${project.id}`}>View all units in {project.name}<ArrowRight size={15} /></Link></div><div className={styles.relatedGrid}>{related.map((item) => <article key={item.id}><Link className={styles.relatedPhoto} href={`/properties/${item.slug}`}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1000px) 29vw, 90vw" className="object-cover" /><span>{unitTypeLabel(item)}</span></Link><div className={styles.relatedBody}><h3><Link href={`/properties/${item.slug}`}>{item.unitNumber}</Link></h3><p>{project.name} · {item.floor} floor</p><p className={styles.meta}><MapPin size={12} />{project.address}</p><div className={styles.relatedPrice}><span><Ruler size={13} />{unitSizeLabel(item)}</span><strong>{formatPkr(item.price)}</strong></div><div className={styles.relatedActions}><Link href={`/properties/${item.slug}`}>View details<ArrowUpRight size={13} /></Link><a href={unitWhatsappLink(item)} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />WhatsApp</a></div></div></article>)}</div></div></section>}
        <section className={styles.help}><div className="rh-container"><div><p className={styles.eyebrow}>Have Questions?</p><h2>Need help deciding?</h2><p>Our team is here to help you with unit details, availability and payment plan information.</p></div><div className={styles.helpActions}><a className={styles.primaryButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Chat on WhatsApp</a><a className={styles.outlineButton} href={contact.phoneHref}><Phone size={17} />Contact us</a></div></div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Properties", path: "/properties" }, { name: `${unit.unitNumber} · ${project.name}`, path: `/properties/${unit.slug}` }]))} />
    </div>;
}
