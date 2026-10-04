import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Coins, FileText, Headset, MapPin, MessageCircle, Phone, Ruler, Star, Store } from "lucide-react";
import { getDeveloper, getProject, getUnitBySlug, propertyUnits, unitSizeLabel, unitTypeLabel } from "@/data/marketplace";
import { Breadcrumbs } from "@/components/marketplace/common";
import { MediaGallery } from "@/components/marketplace/gallery";
import { UnitGallery } from "@/components/marketplace/unit-gallery";
import { formatExactPkr, formatPkr } from "@/lib/format";
import { listingAmount, listingPurpose, listingPurposes, listingPriceLabel, occupancyLabel } from "@/lib/listings";
import { ListingBadges } from "@/components/marketplace/listing-badges";
import { unitWhatsappLink } from "@/lib/whatsapp";
import { contact } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import styles from "@/components/marketplace/property-detail.module.css";
export function generateStaticParams() { return propertyUnits.map((unit) => ({ slug: unit.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const unit = getUnitBySlug(slug);
    if (!unit) return {};
    const project = getProject(unit.projectId)!;
    if (unit.projectId === "rahat-heights") return pageMetadata({ title: `Unit ${unit.unitNumber} for ${listingPurposes(unit).length > 1 ? "Sale & Rent" : "Sale"} at Rahat Heights`, description: `${unitTypeLabel(unit)}, ${unit.floor} Floor, ${unitSizeLabel(unit)} at Rahat Heights, ${project.address}. ${listingPurposes(unit).map(p => `${listingPriceLabel(unit,p)}: ${formatPkr(listingAmount(unit,p))}`).join(". ")}.${unit.furnished ? " Furnished." : ""} Enquire through SAFIZMARKETING.`, path: `/properties/${unit.slug}` });
    return pageMetadata({ title: `${unit.unitNumber} – ${unit.floor} – ${project.name}`, description: `Explore ${unit.unitNumber}, a ${unitTypeLabel(unit)} in ${project.name}, ${project.address}.${unit.sizeSqFt != null ? ` Size: ${unitSizeLabel(unit)}.` : ""}${Number.isFinite(unit.price) && unit.price > 0 ? ` Published price: ${formatPkr(unit.price)}.` : ""} View project details and enquire through SAFIZMARKETING.`, path: `/properties/${unit.slug}` });
}
export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const unit = getUnitBySlug(slug);
    if (!unit) notFound();
    if (slug !== unit.slug) permanentRedirect(`/properties/${unit.slug}`);
    const project = getProject(unit.projectId)!;
    const developer = getDeveloper(project.developerId)!;
    const plan = listingPurpose(unit) === "sale" && unit.downPayment != null && unit.installmentAmount != null ? project.paymentPlan : undefined;
    const latestInventory = unit.projectId === "rahat-heights";
    const related = propertyUnits.filter((item) => item.id !== unit.id && item.projectId === project.id && item.type === unit.type && listingPurpose(item) === listingPurpose(unit)).slice(0, 3);
    const images = (unit.images?.length ? unit.images : [project.cover, ...project.gallery]).filter((item, index, all) => all.findIndex((other) => other.src === item.src) === index);
    const highlights = [
        { icon: MapPin, title: "Prime Location", copy: `Located in ${project.area}, ${project.city}. Explore the project's location and connections.` },
        latestInventory ? { icon: CalendarDays, title: listingPurpose(unit) === "rent" ? "Arrange a Viewing" : "Current Listing", copy: "Contact our team to confirm the latest details and arrange a property viewing." } : { icon: CalendarDays, title: "Published Payment Plan", copy: `${unit.installmentCount} ${unit.paymentFrequency} installments, as provided in the developer price list.` },
        latestInventory ? { icon: FileText, title: "Latest Inventory Sheet", copy: "Price and unit information are supplied in the client’s current inventory sheet." } : { icon: FileText, title: "Developer Price List", copy: "Review the published price and original project documentation." },
        { icon: Headset, title: "SAFIZ MARKETING Support", copy: "Get guidance on unit details, availability and the next steps." },
    ];
    return <div className={styles.page}>
        <div className={styles.headerBackdrop} />
        <div className={styles.breadcrumb}><div className="rh-container"><Breadcrumbs items={[{ label: "Properties", href: "/properties" }, { label: project.name, href: `/projects/${project.slug}` }, { label: `${unit.unitNumber} · ${unit.floor}` }]} /></div></div>
        <section className={styles.overview}><div className={`rh-container ${styles.overviewGrid}`}>
            <UnitGallery items={images} label={unitTypeLabel(unit)} actualUnitMedia={unit.actualUnitMedia} />
            <div className={styles.summary}>
                <div className={styles.summaryTop}><p className={styles.eyebrow}>{unit.floor} floor · {unit.category}</p>{unit.featured && <span><Star size={12} fill="currentColor" />Featured Unit</span>}</div>
                <ListingBadges unit={unit}/><h1>{unit.unitNumber}</h1><p className={styles.type}>{unitTypeLabel(unit)}</p>
                <Link className={styles.projectLink} href={`/projects/${project.slug}`}><Building2 size={16} />{project.name}<ArrowRight size={14} /></Link>
                <p className={styles.meta}><MapPin size={15} />{project.address}</p>
                <Link className={styles.meta} href={`/developers/${developer.slug}`}><Building2 size={15} />By {developer.name}</Link>
                <div className={listingPurposes(unit).length > 1 ? styles.dualPrice : undefined}>{listingPurposes(unit).map(purpose => <div key={purpose} className={styles.price}><p className={styles.eyebrow}>{latestInventory ? `${purpose === "rent" ? "For Rent" : "For Sale"} · ` : ""}{listingPriceLabel(unit,purpose)}</p><strong>{formatPkr(listingAmount(unit,purpose))}</strong></div>)}</div>
                <dl className={styles.facts}>{[{ icon: Ruler, title: "Size", value: unitSizeLabel(unit) }, { icon: Store, title: "Floor", value: unit.floor }, { icon: Building2, title: "Property Type", value: unitTypeLabel(unit) }].map((fact) => <div key={fact.title}><fact.icon aria-hidden="true" /><div><dt>{fact.title}</dt><dd>{fact.value}</dd></div></div>)}</dl>
                {unit.notes === "Air BNB" && <p className={styles.inventoryNote}>Client sheet note: Air BNB</p>}
                <p className={styles.availability}>{occupancyLabel(unit) ? `${occupancyLabel(unit)} · ` : ""}Contact for current availability</p>
                {latestInventory ? listingPurposes(unit).map(purpose => <a key={purpose} className={purpose === "rent" ? styles.outlineButton : styles.primaryButton} href={unitWhatsappLink(unit,purpose)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{purpose === "rent" ? "Enquire to Rent" : "Enquire to Buy"}<ArrowRight size={15}/></a>) : <><a className={styles.primaryButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Ask about this unit<ArrowRight size={15}/></a><a className={styles.outlineButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Chat on WhatsApp</a></>}
                {unit.video && <a className={styles.tourLink} href="#property-tour">Watch Property Tour<ArrowRight size={15}/></a>}
            </div>
        </div></section>
        <div className="rh-container">
            {plan && <section className={styles.payment}>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{plan.sourceLabel} · Page {unit.sourcePage}</p><h2>Your published payment plan.</h2></div><p>These are the amounts provided in the published developer plan. Generic financing estimates are available separately in the mortgage calculator.</p></div>
                <div className={styles.paymentGrid}>{[
                    { icon: Coins, title: "Down Payment", copy: `${plan.downPercent}% down payment`, amount: unit.downPayment },
                    { icon: CalendarDays, title: "Quarterly Installments", copy: `Each of ${unit.installmentCount} quarterly installments`, amount: unit.installmentAmount },
                    { icon: FileText, title: "Total Developer Price", copy: "As per published price list", amount: unit.price },
                ].map((item) => <div key={item.title}><span className={styles.iconCircle}><item.icon /></span><div><h3>{item.title}</h3><p>{item.copy}</p><strong>{formatExactPkr(item.amount!)}</strong></div></div>)}</div>
                <div className={styles.paymentFoot}><nav aria-label="Payment plan resources"><a href={unit.source} target="_blank" rel="noopener noreferrer">View original price list<ArrowUpRight size={14} /></a><Link href={`/projects/${project.slug}#inventory`}>Compare project inventory<ArrowRight size={14} /></Link><Link href="/calculator">Mortgage estimate<ArrowRight size={14} /></Link></nav>{plan.note && <p>{plan.note}</p>}</div>
            </section>}
            {unit.video && <section id="property-tour" className={styles.plans} aria-labelledby="property-tour-heading"><p className={styles.eyebrow}>Unit {unit.unitNumber} · Client-supplied video</p><h2 id="property-tour-heading">Watch Property Tour</h2><video className={styles.tourVideo} aria-label={`Unit ${unit.unitNumber} property tour`} controls playsInline preload="metadata" poster={unit.videoPoster} src={unit.video} /></section>}
            <section className={styles.plans}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Understand the Layout</p><h2>Project floor plans.</h2></div><p>Plans are from the developer brochure. Confirm the layout applicable to this unit with SAFIZ MARKETING.</p></div><MediaGallery items={project.floorPlans} label={`${project.name} floor plans`} plans /></section>
            <section className={styles.highlights}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Why This Unit Stands Out</p><h2>{unit.type === "apartment" ? "A smart choice for modern living." : "A smart space for your next move."}</h2></div><p>Explore this {unitTypeLabel(unit).toLowerCase()} at {project.name}, with current listing and project information.</p></div>{latestInventory && <p className={styles.inventoryNote}>Prices and availability are based on the latest information supplied by the property owner/developer and may change. Contact SAFIZMARKETING for current details. <a href={unit.source} target="_blank" rel="noopener noreferrer">View latest inventory sheet</a></p>}<div className={styles.highlightGrid}>{highlights.map((item) => <div key={item.title}><span className={styles.iconCircle}><item.icon /></span><div><h3>{item.title}</h3><p>{item.copy}</p></div></div>)}</div></section>
        </div>
        {related.length > 0 && <section className={styles.related}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>In the Same Project</p><h2>Other spaces to consider.</h2></div><Link href={`/properties?project=${project.id}`}>View all units in {project.name}<ArrowRight size={15} /></Link></div><div className={styles.relatedGrid}>{related.map((item) => <article key={item.id}><Link className={styles.relatedPhoto} href={`/properties/${item.slug}`}><Image src={item.images?.[0]?.src ?? project.cover.src} alt={item.images?.[0]?.alt ?? project.cover.alt} fill sizes="(min-width: 1000px) 29vw, 90vw" className="object-cover" /><span>{unitTypeLabel(item)}</span></Link><div className={styles.relatedBody}>{latestInventory && <ListingBadges unit={item}/>}<h3><Link href={`/properties/${item.slug}`}>{item.unitNumber}</Link></h3><p>{project.name} · {item.floor} floor</p><p className={styles.meta}><MapPin size={12} />{project.address}</p><div className={styles.relatedPrice}><span><Ruler size={13} />{unitSizeLabel(item)}</span><strong>{formatPkr(item.price)}</strong></div><div className={styles.relatedActions}><Link href={`/properties/${item.slug}`}>View details<ArrowUpRight size={13} /></Link><a href={unitWhatsappLink(item)} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />WhatsApp</a></div></div></article>)}</div></div></section>}
        <section className={styles.help}><div className="rh-container"><div><p className={styles.eyebrow}>Have Questions?</p><h2>Need help deciding?</h2><p>Our team is here to help you with unit details, availability and payment plan information.</p></div><div className={styles.helpActions}>{latestInventory ? listingPurposes(unit).map(purpose => <a key={purpose} className={purpose === "rent" ? styles.outlineButton : styles.primaryButton} href={unitWhatsappLink(unit,purpose)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{purpose === "rent" ? "Enquire to Rent" : "Enquire to Buy"}</a>) : <a className={styles.primaryButton} href={unitWhatsappLink(unit)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Chat on WhatsApp</a>}<a className={styles.outlineButton} href={contact.phoneHref}><Phone size={17} />Contact us</a></div></div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Properties", path: "/properties" }, { name: `${unit.unitNumber} · ${project.name}`, path: `/properties/${unit.slug}` }]))} />
    </div>;
}
