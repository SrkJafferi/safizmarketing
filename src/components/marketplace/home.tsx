import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Building,
    Grid2X2,
    Handshake,
    MapPin,
    MessageCircle,
    PanelsTopLeft,
    Ruler,
    ShieldCheck,
    Store,
    Headset,
    Landmark,
    Users,
} from "lucide-react";
import {
    developers,
    projects,
    propertyUnits,
    getProject,
    unitTypeLabel,
    unitSizeLabel,
} from "@/data/marketplace";
import { genericWhatsappLink, unitWhatsappLink } from "@/lib/whatsapp";
import { contact, site } from "@/lib/site";
import { formatNumber } from "@/lib/format";
import { HomeFavorite } from "./home-favorite";
import { HomePlanning } from "./home-planning";
import { HomeStats } from "./home-stats";
import { NewsletterCard } from "./newsletter-card";
import newsletterStyles from "./newsletter-card.module.css";
import { HeroSlideshow } from "./hero-slideshow";
import { PropertyMarquee } from "./property-marquee";
import { RotatingHeroText } from "./rotating-hero-text";
import { FeaturedPropertyCarousel } from "./featured-property-carousel";
import { HomeSearch } from "./home-search";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Curated Listings",
        copy: "From Trusted Owners",
    },
    { icon: MapPin, title: "Multiple Locations", copy: "Islamabad & Beyond" },
    {
        icon: Handshake,
        title: "Direct Enquiries",
        copy: "Through SAFIZ MARKETING",
    },
    { icon: PanelsTopLeft, title: "Projects & Units", copy: "In One Place" },
];
const categories = [
    {
        icon: Building2,
        title: "Apartments",
        href: "/properties?type=apartment",
    },
    { icon: Store, title: "Shops", href: "/properties?type=shop" },
    { icon: Building, title: "Offices", href: "/properties?type=office" },
    { icon: Grid2X2, title: "Plots", href: "/properties?q=plot" },
    {
        icon: Landmark,
        title: "Commercial",
        href: "/properties?type=commercial",
    },
];
const locations = [
    {
        icon: Building,
        title: "Islamabad",
        copy: "Modern Living, Natural Beauty",
        href: "/properties?city=Islamabad",
    },
    {
        icon: Building2,
        title: "Bahria Enclave",
        copy: "Lifestyle & City Connections",
        href: "/properties?project=smart-one-heights-2",
    },
    {
        icon: Building2,
        title: "B-17 / FMC",
        copy: "Growth and Connectivity",
        href: "/projects/rahat-heights",
    },
    {
        icon: MapPin,
        title: "Kharian",
        copy: "Explore Grand City",
        href: "/properties?city=Kharian",
    },
];
export function MarketplaceHome() {
    const developer = developers[0];
    const selected = [
        propertyUnits.find(
            (u) =>
                u.projectId === "rahat-heights-ii" && u.unitNumber === "LG-01",
        )!,
        propertyUnits.find(
            (u) =>
                u.projectId === "rahat-heights-ii" &&
                u.unitNumber === "103 / 110",
        )!,
        propertyUnits.find(
            (u) =>
                u.projectId === "rahat-heights-ii" &&
                u.unitNumber === "201 / 202",
        )!,
        propertyUnits.find(
            (u) =>
                u.projectId === "smart-one-heights-2" &&
                u.unitNumber === "F-01" &&
                u.floor === "Second",
        )!,
    ];
    const carouselUnits = [
        ...selected,
        ...propertyUnits.filter((unit) => !selected.some((item) => item.id === unit.id)),
    ].slice(0, 10);
    return (
        <div className="reference-home">
            <section className="rh-hero">
                <HeroSlideshow />
                <div className="rh-hero-shade" />
                <div className="rh-container rh-hero-inner">
                    <div className="rh-hero-copy">
                        <p className="rh-eyebrow">
                            Property Marketplace · Pakistan
                        </p>
                        <h1>
                            <span>Exceptional Properties.</span>
                            <br />
                            <RotatingHeroText />
                        </h1>
                        <p className="rh-hero-description">
                            Discover property opportunities from developers
                            <br />
                            and owners across Islamabad and beyond.
                        </p>
                    </div>
                    <HomeSearch />
                    <div className="rh-hero-benefits">
                        {benefits.map((b) => (
                            <div key={b.title}>
                                <b.icon aria-hidden="true" />
                                <div>
                                    <strong>{b.title}</strong>
                                    <span>{b.copy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="rh-projects" aria-labelledby="home-projects">
                <div className="rh-container">
                    <div className="rh-section-head">
                        <div>
                            <p className="rh-eyebrow">Featured Projects</p>
                            <h2 id="home-projects">
                                Signature Developments
                                <br />
                                By <em>Rahat Associates.</em>
                            </h2>
                        </div>
                        <div className="rh-section-aside">
                            <p>
                                Explore residential, commercial and mixed-use
                                projects
                                <br />
                                by <strong>Rahat Associates</strong>, now listed
                                on SAFIZ MARKETING.
                            </p>
                            <Link
                                href="/projects"
                                className="rh-button rh-button-navy"
                            >
                                View All Projects <ArrowRight />
                            </Link>
                        </div>
                    </div>
                    <div className="rh-project-grid">
                        {projects.map((p, i) => (
                            <article className="rh-project-card" key={p.id}>
                                <Image
                                    src={p.cover.src}
                                    alt={p.cover.alt}
                                    fill
                                    sizes={i === 0 ? "42vw" : "28vw"}
                                    className="rh-project-image"
                                />
                                <span className="rh-badge">
                                    {i === 0
                                        ? "Mixed Use"
                                        : "Residential & Commercial"}
                                </span>
                                <div className="rh-project-card-content">
                                    <h3>
                                        <Link href={`/projects/${p.slug}`}>
                                            {p.name}
                                        </Link>
                                    </h3>
                                    <p className="rh-project-location">
                                        <MapPin />
                                        {i === 1
                                            ? "Faisal Margalla City (Adjacent to B-17)"
                                            : p.address}
                                    </p>
                                    <p className="rh-project-types">
                                        <Grid2X2 />
                                        {i === 0
                                            ? "Shops · Offices · Apartments"
                                            : i === 1
                                              ? "Shops · 1, 2 & 3 Bed Apartments"
                                              : "Shops · Offices · 1 & 2 Bed Apartments"}
                                    </p>
                                    <Link
                                        className="rh-button"
                                        href={`/projects/${p.slug}`}
                                    >
                                        Explore Project <ArrowRight />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section
                className="rh-properties"
                aria-labelledby="home-properties"
            >
                <div className="rh-container">
                    <div className="rh-section-head">
                        <div>
                            <p className="rh-eyebrow">Featured Properties</p>
                            <h2 id="home-properties">
                                Explore Available Properties
                            </h2>
                        </div>
                        <Link href="/properties" className="rh-text-link">
                            View All Properties <ArrowRight />
                        </Link>
                    </div>
                    <FeaturedPropertyCarousel>
                        {carouselUnits.map((unit, index) => {
                            const project = getProject(unit.projectId)!;
                            return (
                                <article
                                    className="rh-property-card"
                                    key={unit.id}
                                >
                                    <div
                                        className={`rh-property-photo rh-property-photo-${index}`}
                                    >
                                        <Link
                                            href={`/properties/${unit.slug}`}
                                            aria-label={`View ${unit.unitNumber} at ${project.name}`}
                                        >
                                            <Image
                                                src={
                                                    index === 1
                                                        ? project.gallery[0].src
                                                        : project.cover.src
                                                }
                                                alt={
                                                    index === 1
                                                        ? project.gallery[0].alt
                                                        : project.cover.alt
                                                }
                                                fill
                                                sizes={
                                                    index === 1
                                                        ? "48vw"
                                                        : "23vw"
                                                }
                                            />
                                        </Link>
                                        <span className="rh-badge">
                                            {unit.type}
                                        </span>
                                        <HomeFavorite
                                            unitLabel={`${unit.unitNumber} at ${project.name}`}
                                        />
                                        <span className="rh-photo-note">
                                            Project concept render
                                        </span>
                                    </div>
                                    <div className="rh-property-body">
                                        <h3>
                                            <Link
                                                href={`/properties/${unit.slug}`}
                                            >
                                                {unit.unitNumber}
                                            </Link>
                                        </h3>
                                        <strong className="rh-unit-type">
                                            {unitTypeLabel(unit)}
                                        </strong>
                                        <p>
                                            {project.name}
                                            <br />
                                            {project.address}
                                        </p>
                                        <div className="rh-unit-size">
                                            <Ruler />
                                            {unitSizeLabel(unit)}
                                        </div>
                                        <div className="rh-unit-price">
                                            <span>PKR</span>{" "}
                                            {formatNumber(unit.price)}
                                        </div>
                                        <div className="rh-property-actions">
                                            <Link
                                                href={`/properties/${unit.slug}`}
                                            >
                                                View Details
                                            </Link>
                                            <a
                                                href={unitWhatsappLink(unit)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Enquire on WhatsApp about ${unit.unitNumber} at ${project.name}`}
                                            >
                                                <MessageCircle />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </FeaturedPropertyCarousel>
                    <p className="rh-source-note">
                        Published developer prices. Current prices and
                        availability require confirmation.
                    </p>
                </div>
            </section>
            <PropertyMarquee />
            <section className="rh-types">
                <div className="rh-container rh-types-inner">
                    <div>
                        <p className="rh-eyebrow">Browse By Type</p>
                        <h2>
                            Find Properties
                            <br />
                            By <em>Your Need.</em>
                        </h2>
                    </div>
                    <div className="rh-type-grid">
                        {categories.map((c) => (
                            <Link href={c.href} key={c.title}>
                                <c.icon aria-hidden="true" />
                                <h3>{c.title}</h3>
                                <span>
                                    View Listings <ArrowRight />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="rh-developer" aria-labelledby="home-developer">
                <div className="rh-developer-image">
                    <Image
                        src={projects[2].cover.src}
                        alt={projects[2].cover.alt}
                        fill
                        sizes="34vw"
                    />
                    <div className="rh-developer-logo">
                        <Image
                            src={developer.logo!.src}
                            alt={developer.logo!.alt}
                            width={developer.logo!.width}
                            height={developer.logo!.height}
                        />
                    </div>
                </div>
                <div className="rh-container rh-developer-inner">
                    <div className="rh-developer-copy">
                        <p className="rh-eyebrow">Featured Developer</p>
                        <h2 id="home-developer">Rahat Associates</h2>
                        <p className="rh-developer-subheading">
                            Residential & Commercial Developments Across
                            Islamabad & Beyond.
                        </p>
                        <p>
                            Rahat Associates brings together residential and
                            commercial projects in Bahria Enclave Islamabad,
                            Faisal Margalla City and Grand City Kharian. Explore
                            developer-supplied project material and published
                            unit schedules, now listed on SAFIZ MARKETING.
                        </p>
                    </div>
                    <div className="rh-developer-facts">
                        <div>
                            <PanelsTopLeft />
                            <p>
                                <strong>
                                    {
                                        projects.filter(
                                            (p) =>
                                                p.developerId === developer.id,
                                        ).length
                                    }
                                </strong>
                                <span>Listed Projects</span>
                            </p>
                        </div>
                        <div>
                            <Building2 />
                            <p>
                                <strong>Residential</strong>
                                <span>& Commercial</span>
                            </p>
                        </div>
                        <div>
                            <MapPin />
                            <p>
                                <strong>Islamabad</strong>
                                <span>& Kharian</span>
                            </p>
                        </div>
                        <Link
                            href={`/developers/${developer.slug}`}
                            className="rh-button"
                        >
                            View Rahat Associates <ArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="rh-location">
                <div className="rh-container rh-location-inner">
                    <div className="rh-location-copy">
                        <p className="rh-eyebrow">Prime Location</p>
                        <h2>
                            Islamabad
                            <br />
                            <em>A City of Opportunity.</em>
                        </h2>
                        <p>
                            From the serene Margalla Hills to modern
                            infrastructure and growing developments, Islamabad
                            offers a unique blend of natural beauty and city
                            living.
                        </p>
                        <Link
                            href="/properties?city=Islamabad"
                            className="rh-button"
                        >
                            Explore Properties in Islamabad <ArrowRight />
                        </Link>
                    </div>
                    <div className="rh-location-visual">
                        <div className="rh-location-photo">
                            <Image
                                src="/images/homemidbanner.avif"
                                alt="Faisal Mosque and the Margalla Hills, Islamabad"
                                fill
                                sizes="36vw"
                            />
                        </div>
                        <div className="rh-location-panel">
                            {locations.map((l) => (
                                <Link href={l.href} key={l.title}>
                                    <l.icon />
                                    <div>
                                        <strong>{l.title}</strong>
                                        <span>{l.copy}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="rh-why">
                <div className="rh-container">
                    <div className="rh-section-head">
                        <div>
                            <p className="rh-eyebrow">Why SAFIZ MARKETING</p>
                            <h2>
                                More Than Listings.
                                <br />A Better Way to <em>Connect.</em>
                            </h2>
                        </div>
                        <p className="rh-why-description">
                            We bring property owners, developers and buyers onto
                            one focused platform, making it easier to discover
                            opportunities and connect with the right people.
                        </p>
                    </div>
                    <div className="rh-why-benefits">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Verified Properties",
                                copy: "Curated listings from trusted sources",
                            },
                            {
                                icon: Users,
                                title: "Direct Enquiries",
                                copy: "Connect directly with developers and owners",
                            },
                            {
                                icon: MapPin,
                                title: "Multiple Locations",
                                copy: "Explore opportunities across Islamabad and beyond",
                            },
                            {
                                icon: Headset,
                                title: "Dedicated Support",
                                copy: "Professional guidance at every step",
                            },
                        ].map((b) => (
                            <div key={b.title}>
                                <span className="rh-why-benefit-icon"><b.icon aria-hidden="true" /></span>
                                <div>
                                    <strong>{b.title}</strong>
                                    <span>{b.copy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <HomePlanning />
            <HomeStats totals={{ properties: 500, developers: 50, locations: 10, clients: 2000 }} />
            <section className="rh-contact">
                <Image
                    src="/images/hero-residence.jpg"
                    alt="Modern residence at dusk; editorial property photography"
                    fill
                    sizes="100vw"
                />
                <div className="rh-contact-shade" />
                <div className={`rh-container ${newsletterStyles.layout}`}>
                    <div className={newsletterStyles.left}>
                    <p className="rh-eyebrow">Need A Place?</p>
                    <h2>
                        Let’s Find the Right Property
                        <br />
                        <em>For You.</em>
                    </h2>
                    <p>
                        Have a question or looking for a specific property?
                        <br />
                        Chat with our team on WhatsApp.
                    </p>
                    <div className="rh-contact-links">
                        <a
                            className="rh-button"
                            href={genericWhatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle />
                            Chat on WhatsApp <ArrowRight />
                        </a>
                        <a href={contact.phoneHref}>
                            <MessageCircle />
                            {contact.phoneDisplay}
                        </a>
                        <span>
                            <MapPin />
                            {site.location}
                        </span>
                    </div>
                    </div>
                    <NewsletterCard />
                </div>
            </section>
        </div>
    );
}
