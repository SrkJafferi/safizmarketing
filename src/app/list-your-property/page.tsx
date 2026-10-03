import Image from "next/image";
import { ArrowRight, BadgeCheck, ChartNoAxesCombined, ChevronDown, Eye, FileText, Headset, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { ListingEnquiryForm } from "@/components/marketplace/listing-enquiry-form";
import { ownerWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import styles from "./listing.module.css";

export const metadata = pageMetadata({
    title: "List Your Property",
    description: "Start a property owner or developer listing enquiry with SAFIZ MARKETING. A professional property discovery and enquiry channel.",
    path: "/list-your-property",
});

const benefits = [
    { icon: Eye, title: "Wide Exposure", copy: "Your property gets visibility across our platform." },
    { icon: Users, title: "Genuine Enquiries", copy: "Connect with buyers interested in your property." },
    { icon: FileText, title: "Professional Presentation", copy: "Showcase your property with clear details and quality images." },
    { icon: Headset, title: "Dedicated Support", copy: "Our team is available to help you through the process." },
];
const types = [
    { title: "Residential", copy: "Houses, apartments, plots & portions", image: "/images/hero-residence.jpg" },
    { title: "Commercial", copy: "Shops, offices & showrooms", image: "/images/type-commercial.jpg" },
    { title: "Plots & Land", copy: "Residential & commercial plots", image: "/images/gallery-land.jpg" },
    { title: "Projects", copy: "New launches & ongoing developments", image: "/projects/smart-one-heights-2-cover.jpg" },
    { title: "Other", copy: "Any other real estate opportunity", image: "/images/gallery-living.jpg" },
];
const questions = [
    { question: "Is there any listing fee?", answer: "Our team will discuss any applicable listing charges and requirements with you before publication. Start an enquiry to find out what applies to your property." },
    { question: "How long does it take to get enquiries?", answer: "Enquiries depend on your property, location, pricing and buyer interest. Our team can help you present accurate information; a specific response time or sale is not guaranteed." },
    { question: "What types of properties can I list?", answer: "You can enquire about houses, apartments, shops, offices, plots, land and development projects. Share your details and supporting material so our team can review the listing." },
    { question: "How will I be contacted?", answer: "The form prepares a WhatsApp message with your details. Send it to our team to start the conversation. We can then follow up using the contact information you provide." },
];

export default function ListYourPropertyPage() {
    return <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="listing-heading">
            <Image src="/banners/developers-hero.avif" alt="Modern residences illuminated at twilight" fill priority sizes="100vw" className={styles.heroImage} />
            <div className={`${styles.container} ${styles.heroInner}`}>
                <div className={styles.heroCopy}>
                    <p className={styles.eyebrow}>List your property</p>
                    <h1 id="listing-heading">Your Property.<br /><span>Our Platform.</span></h1>
                    <p className={styles.heroDescription}>Get genuine enquiries, increase visibility and connect with serious buyers through SAFIZ MARKETING.</p>
                    <div className={styles.heroBenefits}>
                        {[{ icon: Users, title: "Reach", copy: "Serious Buyers" }, { icon: ChartNoAxesCombined, title: "Professional", copy: "Listing Support" }, { icon: ShieldCheck, title: "Trusted", copy: "Real Estate Platform" }].map(({ icon: Icon, title, copy }) => <div key={title}><span><Icon aria-hidden="true" /></span><p>{title}<br />{copy}</p></div>)}
                    </div>
                </div>
                <div className={styles.confidence}><BadgeCheck aria-hidden="true" /><div><strong>List with Confidence</strong><p>Residential · Commercial · Plots<br />Apartments · Shops · Offices</p></div></div>
            </div>
        </section>

        <section className={styles.enquirySection} aria-labelledby="why-list-heading">
            <div className={`${styles.container} ${styles.enquiryGrid}`}>
                <div className={styles.whyCopy}>
                    <p className={styles.eyebrow}>Why list with us</p>
                    <h2 id="why-list-heading">Make the right<br />connection.</h2>
                    <p>SAFIZ MARKETING connects property owners, developers and real estate professionals with buyers through a clear and easy listing process.</p>
                    <div className={styles.benefits}>{benefits.map(({ icon: Icon, title, copy }) => <div key={title}><span className={styles.iconCircle}><Icon aria-hidden="true" /></span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
                </div>
                <ListingEnquiryForm />
            </div>
        </section>

        <section className={styles.typesSection} aria-labelledby="property-types-heading">
            <div className={`${styles.container} ${styles.typesGrid}`}>
                <div><p className={styles.eyebrow}>List any property type</p><h2 id="property-types-heading">All Property Types<br />Welcome.</h2></div>
                <div className={styles.typeCards}>{types.map(type => <a href="#listing-enquiry" className={styles.typeCard} key={type.title}><div className={styles.typePhoto}><Image src={type.image} alt={`${type.title} property illustration`} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 25vw, 12vw" /></div><h3>{type.title}</h3><p>{type.copy}</p></a>)}</div>
            </div>
        </section>

        <section className={styles.trustStrip} aria-label="Listing benefits"><div className={`${styles.container} ${styles.trustGrid}`}>
            {[{ icon: Users, text: "Genuine Buyers" }, { icon: ShieldCheck, text: "Trusted Platform" }, { icon: ChartNoAxesCombined, text: "Better Visibility" }, { icon: Headset, text: "Professional Support" }].map(({ icon: Icon, text }) => <div key={text}><span><Icon aria-hidden="true" /></span><p>{text}</p></div>)}
        </div></section>

        <section className={styles.faqSection} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}>
            <div><p className={styles.eyebrow}>Common questions</p><h2 id="faq-heading">Frequently Asked<br />Questions</h2></div>
            <div className={styles.questions}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </div></section>

        <section className={`${styles.container} ${styles.directSection}`} aria-labelledby="direct-heading">
            <div className={styles.directPhoto}><Image src="/images/hero-residence.jpg" alt="Contemporary residential property" fill loading="eager" sizes="(max-width: 700px) 100vw, 28vw" unoptimized /></div>
            <div className={styles.directCopy}><p className={styles.eyebrow}>Prefer to talk directly?</p><h2 id="direct-heading">Chat with us on WhatsApp.</h2><p>Share your property details and our team will guide you.</p></div>
            <a href={ownerWhatsappLink} target="_blank" rel="noopener noreferrer" className={styles.darkButton}><MessageCircle size={19} aria-hidden="true" />Chat on WhatsApp<ArrowRight size={17} aria-hidden="true" /></a>
        </section>
    </div>;
}
