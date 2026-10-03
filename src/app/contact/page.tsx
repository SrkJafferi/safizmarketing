import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/marketplace/enquiry-form";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/lib/site";
import directory from "@/components/marketplace/properties-directory.module.css";
import styles from "@/components/marketplace/contact.module.css";

export const metadata = pageMetadata({ title: "Contact SAFIZMARKETING | Islamabad Real Estate", description: "Contact SAFIZMARKETING for property enquiries, project information, developer listings and real estate opportunities in Islamabad and beyond.", path: "/contact", absoluteTitle: true });
const address = "Office 6, 2nd Floor United Plaza Fazal Haq Road Blue Area, Back Side of NADRA Office, Islamabad";
const mapLink = "https://maps.app.goo.gl/iRWr2Fzf3sxQGrVcA";
const whatsapp = `https://wa.me/${contact.whatsappNumber}`;
const contactOptions = [
    { icon: Mail, title: "Email Us", detail: "info@safizmarketing.com", href: "mailto:info@safizmarketing.com", action: "Send an email" },
    { icon: Phone, title: "Call Our Team", detail: contact.phoneDisplay, href: contact.phoneHref, action: "Give us a call" },
    { icon: MessageCircle, title: "Chat on WhatsApp", detail: contact.phoneDisplay, href: whatsapp, action: "Start a conversation", external: true },
    { icon: MapPin, title: "Visit Our Office", detail: address, href: mapLink, action: "Get directions", external: true },
];
export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const params = await searchParams;
    const property = typeof params.property === "string" ? params.property.slice(0, 150) : "";
    return <div className={`${directory.page} ${styles.page}`}>
        <section className={`${directory.hero} ${styles.hero}`}>
            <Image src="/banners/golden-hour-penthouse.avif" alt="Golden-hour penthouse overlooking the city" fill sizes="100vw" preload className={directory.heroImage} />
            <div className={directory.heroOverlay} />
            <div className="rh-container"><div className={directory.heroCopy}>
                <nav className={directory.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span aria-current="page">Contact</span></nav>
                <p className={directory.eyebrow}>Contact SAFIZ MARKETING</p>
                <h1>Let’s Talk About<br /><em>Your Next Move.</em></h1>
                <p className={directory.heroDescription}>A property question, a project enquiry or your next opportunity.<br />Connect with our team and explore the possibilities.</p>
            </div></div>
        </section>
        <section className={styles.contacts} aria-label="Ways to contact us"><div className="rh-container"><div className={styles.cardGrid}>
            {contactOptions.map((item) => <a className={styles.contactCard} key={item.title} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                <span className={styles.icon}><item.icon size={27} strokeWidth={1.5} aria-hidden="true" /></span><h2>{item.title}</h2><p>{item.detail}</p><span className={styles.cardAction}>{item.action}<ArrowUpRight size={15} /></span>
            </a>)}
        </div></div></section>
        <section className={styles.enquiry} id="enquiry"><div className="rh-container"><div className={styles.enquiryGrid}>
            <div className={styles.intro}><p className={styles.eyebrow}>We’re Here to Help</p><h2>A Conversation.<br /><em>A Better Connection.</em></h2><p>Tell us what you’re looking for. From available properties and project details to listing your own space, our team can help you take the next step.</p>
                <div className={styles.support}><MessageCircle size={28} aria-hidden="true" /><div><h3>Prefer a quick chat?</h3><p>Speak to our team directly on WhatsApp.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">{contact.phoneDisplay}<ArrowUpRight size={15} /></a></div></div>
                <div className={styles.visit}><MapPin size={27} aria-hidden="true" /><h3>Find Us in Blue Area.</h3><address>{address}</address><a className={styles.goldButton} href={mapLink} target="_blank" rel="noopener noreferrer">Get Directions<ArrowUpRight size={16} /></a></div>
            </div>
            <div className={styles.formPanel}><p className={styles.eyebrow}>Your Property Enquiry</p><EnquiryForm defaultProperty={property} /></div>
        </div></div></section>
        <section className={styles.location}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Our Location</p><h2>Let’s Meet in Islamabad.</h2></div><a className={styles.outlineButton} href={mapLink} target="_blank" rel="noopener noreferrer">Open in Google Maps<ArrowUpRight size={16} /></a></div>
            <div className={styles.map}><iframe title="SAFIZ MARKETING office location in Blue Area, Islamabad" src="https://www.google.com/maps?q=33.672041,73.019958&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className={styles.mapCaption}><MapPin size={21} /><div><strong>SAFIZ MARKETING</strong><address>{address}</address></div></div></div>
        </div></section>
        <section className={styles.cta}><div className="rh-container"><div><p className={styles.eyebrow}>Your Next Opportunity</p><h2>Let’s Find the Right Property <em>for You.</em></h2><p>Explore our listed properties and projects, or connect with our team for guidance.</p></div><Link className={styles.goldButton} href="/properties">Explore Properties<ArrowUpRight size={16} /></Link></div></section>
    </div>;
}
