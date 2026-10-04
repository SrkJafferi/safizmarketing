"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BedDouble, Building2, ChevronLeft, ChevronRight, Images, MapPin, Play, Ruler, Store } from "lucide-react";
import type { ListingPurpose, PropertyUnit } from "@/types/marketplace";
import { unitSizeLabel, unitTypeLabel } from "@/data/marketplace";
import { rahatHeightsLocation } from "@/data/rahat-heights-inventory";
import { listingAmount, listingPriceLabel, listingPurposes } from "@/lib/listings";
import { formatNumber } from "@/lib/format";
import { unitWhatsappLink } from "@/lib/whatsapp";
import { HomeFavorite } from "./home-favorite";
import { ListingBadges } from "./listing-badges";
import { WhatsappGlyph } from "@/components/layout/whatsapp-float";
import styles from "./current-inventory.module.css";

const floors: Record<string, string> = { Ground: "Ground Floor", First: "1st Floor", Second: "2nd Floor", Third: "3rd Floor", Fourth: "4th Floor", Penthouse: "Penthouse" };

export function CurrentInventoryCard({ unit, purpose }: { unit: PropertyUnit; purpose: "all" | ListingPurpose }) {
    const [index, setIndex] = useState(0);
    const photos = unit.images!;
    const image = photos[index];
    const purposes = purpose === "all" ? listingPurposes(unit) : [purpose];
    const detailHref = `/properties/${unit.slug}`;
    const move = (direction: number) => setIndex(previous => (previous + direction + photos.length) % photos.length);

    return <article className={styles.card} aria-labelledby={`inventory-unit-${unit.unitNumber}`}>
        <div className={styles.image}>
            <Link href={detailHref} aria-label={`View Unit ${unit.unitNumber}`}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1000px) 22vw, (min-width: 600px) 44vw, 90vw" className="object-cover" /></Link>
            <HomeFavorite unitLabel={`Unit ${unit.unitNumber} at Rahat Heights`} />
            <button type="button" className={`${styles.photoArrow} ${styles.previous}`} disabled={photos.length < 2} onClick={() => move(-1)} aria-label={`Previous photo of Unit ${unit.unitNumber}`}><ChevronLeft size={20}/></button>
            <button type="button" className={`${styles.photoArrow} ${styles.next}`} disabled={photos.length < 2} onClick={() => move(1)} aria-label={`Next photo of Unit ${unit.unitNumber}`}><ChevronRight size={20}/></button>
            <span className={styles.photoCount}><Images size={15}/>{unit.actualUnitMedia ? `${photos.length} ${photos.length === 1 ? "Photo" : "Photos"}` : "Project image"}</span>
            <span className="sr-only" aria-live="polite">Unit {unit.unitNumber}, image {index + 1} of {photos.length}</span>
        </div>
        <div className={styles.cardBody}>
            <div className={styles.unit}>
                <div className={styles.cardBadges}><ListingBadges unit={unit}/></div>
                <h3 id={`inventory-unit-${unit.unitNumber}`}><Link href={detailHref}>Unit {unit.unitNumber}</Link></h3>
                <p className={styles.type}>{unitTypeLabel(unit)}</p>
                <div className={styles.facts}>
                    <span>{unit.bedrooms ? <BedDouble/> : <Store/>}<span>{unit.bedrooms ? `${unit.bedrooms} Bed` : "Shop"}</span></span>
                    <span><Building2/><span>{floors[unit.floor] ?? `${unit.floor} Floor`}</span></span>
                    <span><Ruler/><span>{unitSizeLabel(unit)}</span></span>
                </div>
                <p className={styles.location}><MapPin size={17}/>{rahatHeightsLocation}</p>
            </div>
            <div className={styles.commercial}>
                <div className={`${styles.prices} ${purposes.length > 1 ? styles.dualPrices : ""}`}>{purposes.map(selected => <div className={styles.priceRow} key={selected}><p>{listingPriceLabel(unit,selected)}</p><strong>Rs. {formatNumber(listingAmount(unit,selected))}</strong></div>)}</div>
                <Link className={styles.detail} href={detailHref}>View Details<ArrowRight size={17}/></Link>
                <div className={`${styles.enquiries} ${purposes.length > 1 ? styles.dualEnquiries : ""}`}>{purposes.map(selected => <a key={selected} className={styles.whatsapp} href={unitWhatsappLink(unit,selected)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire to ${selected === "rent" ? "Rent" : "Buy"} Unit ${unit.unitNumber}`}><WhatsappGlyph/><span>{selected === "rent" ? "Enquire to Rent" : "Enquire to Buy"}</span></a>)}</div>
                {unit.video && <Link className={styles.tour} href={`${detailHref}#property-tour`}><span className={styles.playIcon}><Play size={10} fill="currentColor"/></span><span>Watch Property Tour</span></Link>}
            </div>
        </div>
    </article>;
}
