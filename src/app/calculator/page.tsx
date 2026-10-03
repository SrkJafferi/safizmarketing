import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator, ChartNoAxesColumnIncreasing, ChevronRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { PaymentCalculator } from "@/components/calculator/payment-calculator";
import { projects, startingPrice } from "@/data/marketplace";
import { formatPkr } from "@/lib/format";
import { calculatorWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/calculator/calculator-page.module.css";
export const metadata = pageMetadata({ title: "Property Calculator", description: "Estimate property financing and monthly payments in PKR with the SAFIZMARKETING property calculator.", path: "/calculator" });
const benefits = [
    { icon: ShieldCheck, title: "Plan with confidence", copy: "Understand your estimated monthly payments before you decide." },
    { icon: Calculator, title: "Quick & flexible", copy: "Adjust the price, down payment, rate and tenure in seconds." },
    { icon: ChartNoAxesColumnIncreasing, title: "All in PKR", copy: "Figures are shown in Pakistani Rupees for easy comparison." },
];
export default function CalculatorPage() {
    return <div className={styles.page}>
        <section className={styles.hero}><Image src="/banners/golden-hour-penthouse.avif" alt="Penthouse terrace overlooking the city at sunset" fill sizes="100vw" preload /><div className={styles.heroShade} /><div className="rh-container"><div className={styles.heroCopy}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={12} /><span aria-current="page">Calculator</span></nav><p className={styles.eyebrow}>Plan Your Purchase</p><h1>Make room for<br />the numbers.</h1><p>Explore an indicative mortgage estimate. Set your price, down payment, rate and tenure; all figures are in Pakistani Rupees.</p></div><div className={styles.heroAccent} aria-hidden="true"><span>Calculate.</span><p>Better Numbers<br />Brighter Beginnings</p></div></div></section>
        <section className={styles.calculatorSection} aria-label="Property financing calculator"><div className="rh-container"><PaymentCalculator /><div className={styles.benefits}>{benefits.map((item) => <div key={item.title}><span><item.icon size={30} strokeWidth={1.5} aria-hidden="true" /></span><div><h2>{item.title}</h2><p>{item.copy}</p></div></div>)}</div></div></section>
        <section className={styles.plans}><div className="rh-container"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Developer Plans, Separately</p><h2>Looking for a project payment plan?</h2><p>Developer quarterly installments are published plans, distinct from the financing estimate above.</p></div><Link href="/projects">Explore Projects<ArrowRight size={17} /></Link></div><div className={styles.projectGrid}>{projects.map((project) => {
            const price = startingPrice(project.id);
            return <article key={project.id}><Link className={styles.projectImage} href={`/projects/${project.slug}#inventory`} aria-label={`Explore ${project.name} payment details`}><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1000px) 30vw, 90vw" /></Link><div className={styles.projectBody}><p className={styles.projectLocation}><MapPin size={12} />{project.address}</p><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><p>{project.paymentPlan ? `${project.paymentPlan.downPercent}% down payment · ${project.paymentPlan.count} quarterly installments` : "Contact our team for payment plan details."}<br />{price !== null ? `Published prices from ${formatPkr(price)}` : "Current unit price list available by enquiry."}</p><Link className={styles.planButton} href={`/projects/${project.slug}#inventory`}>{project.paymentPlan ? "Explore developer plan" : "Enquire about this project"}<ArrowRight size={15} /></Link></div></article>;
        })}</div></div></section>
        <section className={styles.cta}><Image src="/images/gallery-lounge.jpg" alt="Bright living room; editorial interior photography" fill sizes="100vw" /><div className="rh-container"><div><p className={styles.eyebrow}>Your Next Step</p><h2>A better property conversation.</h2><p>Tell us what you have in mind. We’ll help connect the details.</p></div><a href={calculatorWhatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} />Let’s talk on WhatsApp<ArrowUpRight size={17} /></a></div></section>
    </div>;
}
