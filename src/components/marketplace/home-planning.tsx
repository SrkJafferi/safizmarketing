import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, ChartNoAxesCombined, Diamond, FileText, House, Users } from "lucide-react";
import { calculatePayment, CALCULATOR_DISCLAIMER } from "@/lib/payment";
import { formatNumber, formatPkr } from "@/lib/format";
import styles from "./home-planning.module.css";

export function HomePlanning() {
    const estimate = calculatePayment({ price: 13200000, downPercent: 30, annualRate: 0, years: 10 });
    return (
        <section className={styles.section} aria-labelledby="home-planning-title">
            <Image className={styles.background} src="/banners/home-calculator.avif" alt="Contemporary residential complex illuminated at twilight" fill sizes="100vw" />
            <div className={styles.shade} aria-hidden="true" />
            <div className={styles.arc} aria-hidden="true" />
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>Property Calculator<span /></p>
                    <h2 id="home-planning-title" className={styles.title}>Plan Your Investment<br /><em>With Confidence.</em></h2>
                    <p className={styles.intro}>Use our calculator to estimate your investment, monthly payments and financing options with greater financial clarity.</p>
                    <div className={styles.features}>
                        {[{ icon: Calculator, first: "Calculate", second: "Monthly Payments" }, { icon: ChartNoAxesCombined, first: "Compare", second: "Financing Options" }, { icon: FileText, first: "Plan Your", second: "Investment Journey" }].map(({ icon: Icon, first, second }) => (
                            <div className={styles.feature} key={first}><span className={styles.glassIcon}><Icon aria-hidden="true" /></span><span>{first}<br />{second}</span></div>
                        ))}
                    </div>
                    <div className={styles.actions}>
                        <Link href="/calculator" className={styles.primary}>Try Calculator<ArrowRight size={20} /></Link>
                        <Link href="/calculator" className={styles.how}>How it works?<ArrowRight size={20} /></Link>
                    </div>
                </div>
                <Link href="/calculator" className={styles.payment} aria-label="Explore the indicative property payment calculator">
                    <div className={styles.paymentHeading}><span className={styles.glassIcon}><Calculator aria-hidden="true" /></span><div><span>Estimated Monthly Payment</span><strong>{formatPkr(estimate.monthlyPayment!)}</strong></div></div>
                    <div className={styles.progress} aria-hidden="true"><span /></div>
                    <dl>
                        <div><dt>Property Price</dt><dd>{formatNumber(estimate.price)}</dd></div>
                        <div><dt>Down Payment (30%)</dt><dd>{formatNumber(estimate.downPayment)}</dd></div>
                        <div><dt>Loan Amount</dt><dd>{formatNumber(estimate.financed)}</dd></div>
                        <div><dt>Interest Rate</dt><dd>0%</dd></div>
                        <div><dt>Tenure</dt><dd>10 Years</dd></div>
                    </dl>
                </Link>
                <div className={styles.owner}>
                    <span className={styles.ownerIcon}><House aria-hidden="true" /></span>
                    <h2 className={styles.ownerTitle}>List Your Property<span>With <em>SAFIZ MARKETING</em></span></h2>
                    <p>Are you a property owner or developer? Showcase your project to serious buyers through our professional platform.</p>
                    <ul>
                        {[{ icon: Diamond, text: "Reach genuine buyers" }, { icon: ChartNoAxesCombined, text: "Professional listing support" }, { icon: Users, text: "Direct enquiries from investors" }].map(({ icon: Icon, text }) => (
                            <li key={text}><span><Icon aria-hidden="true" /></span>{text}</li>
                        ))}
                    </ul>
                    <Link href="/list-your-property" className={styles.ownerButton}>List Your Property<ArrowRight size={20} /></Link>
                </div>
            </div>
            <p className={styles.disclaimer}>{CALCULATOR_DISCLAIMER}</p>
        </section>
    );
}
