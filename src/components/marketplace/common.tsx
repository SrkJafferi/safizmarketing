import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { genericWhatsappLink } from "@/lib/whatsapp";
import { developerDisclaimer } from "@/data/marketplace";
export function SectionIntro({
    eyebrow,
    title,
    copy,
    href,
    link,
}: {
    eyebrow: string;
    title: string;
    copy?: string;
    href?: string;
    link?: string;
}) {
    return (
        <div className="section-intro">
            <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="market-heading">{title}</h2>
                {copy && <p className="section-copy">{copy}</p>}
            </div>
            {href && (
                <Link className="text-link" href={href}>
                    {link ?? "Explore"}
                    <ArrowUpRight size={18} />
                </Link>
            )}
        </div>
    );
}
export function Breadcrumbs({
    items,
}: {
    items: { label: string; href?: string }[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="market-breadcrumb">
            <Link href="/">Home</Link>
            {items.map((item, i) => (
                <span key={i}>
                    <span aria-hidden="true">/</span>
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        <span aria-current="page">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
export function DirectoryHeader({
    eyebrow,
    title,
    copy,
}: {
    eyebrow: string;
    title: string;
    copy: string;
}) {
    return (
        <section className="directory-header">
            <div className="market-container">
                <p className="eyebrow">{eyebrow}</p>
                <h1 className="market-display">{title}</h1>
                <p>{copy}</p>
            </div>
            <span className="directory-watermark" aria-hidden="true">
                Discover.
            </span>
        </section>
    );
}
export function SourceDisclaimer() {
    return <p className="source-disclaimer">{developerDisclaimer}</p>;
}
export function MarketplaceCta() {
    return (
        <section className="market-cta">
            <div className="market-container">
                <div>
                    <p className="eyebrow">Your next step</p>
                    <h2 className="market-heading">
                        A better property conversation.
                    </h2>
                    <p>
                        Tell us what you have in mind. We’ll help connect the
                        details.
                    </p>
                </div>
                <a
                    className="market-button button-light"
                    href={genericWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MessageCircle size={18} /> Let’s talk on WhatsApp{" "}
                    <ArrowUpRight size={18} />
                </a>
            </div>
        </section>
    );
}
