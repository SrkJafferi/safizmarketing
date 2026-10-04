import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Ruler } from "lucide-react";
import { getDeveloper, getProject, unitSizeLabel, unitTypeLabel } from "@/data/marketplace";
import { formatNumber } from "@/lib/format";
import { listingAmount, listingPriceLabel } from "@/lib/listings";
import { ListingBadges } from "./listing-badges";
import { unitWhatsappLink } from "@/lib/whatsapp";
import type { PropertyUnit } from "@/types/marketplace";
import { HomeFavorite } from "./home-favorite";
import styles from "./properties-directory.module.css";

export function DirectoryPropertyCard({ unit, purpose = "sale" }: { unit: PropertyUnit; purpose?: "sale" | "rent" }) {
    const project = getProject(unit.projectId)!;
    const developer = getDeveloper(project.developerId)!;
    const detailHref = `/properties/${unit.slug}`;
    return (
        <article className={styles.card}>
            <div className={styles.cardPhoto}>
                <Link href={detailHref} aria-label={`View ${unit.unitNumber} at ${project.name}`}>
                    <Image src={unit.images?.[0]?.src ?? project.cover.src} alt={unit.images?.[0]?.alt ?? project.cover.alt} fill sizes="(min-width: 1440px) 315px, 25vw" style={{ objectFit: "cover", objectPosition: "center" }} />
                </Link>
                <span className={styles.badge}>{unit.type === "shop-office" ? "SHOP / OFFICE" : unit.type.toUpperCase()}</span>
                <HomeFavorite unitLabel={`${unit.unitNumber}, ${unit.floor} at ${project.name}`} />
            </div>
            <div className={styles.cardBody}>
                <ListingBadges unit={unit}/>
                <h3><Link href={detailHref}>{unit.unitNumber}</Link></h3>
                <p className={styles.unitType}>{unitTypeLabel(unit)}<span> · {unit.floor} floor</span></p>
                <p className={styles.cardMeta}><Building2 /><Link href={`/projects/${project.slug}`}>{project.name}</Link></p>
                <p className={styles.developer}>By {developer.name}</p>
                <p className={`${styles.cardMeta} ${styles.address}`}><MapPin />{project.address}</p>
                <p className={styles.cardMeta}><Ruler />{unitSizeLabel(unit)}</p>
                <p className={styles.price}><span>{unit.projectId === "rahat-heights" ? `${listingPriceLabel(unit,purpose)} · PKR` : "PKR"}</span> <strong>{formatNumber(listingAmount(unit,purpose))}</strong></p>
                <p className={styles.availability}>Contact for current availability</p>
                <div className={styles.cardActions}>
                    <Link href={detailHref}>View Details</Link>
                    <a href={unitWhatsappLink(unit,purpose)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire to ${purpose === "rent" ? "Rent" : "Buy"} Unit ${unit.unitNumber} at ${project.name} on WhatsApp`}>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.4l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" stroke="currentColor" strokeWidth="1.65" /><path d="m8.5 7.5 1.1 2.3-.9 1a7 7 0 0 0 3.6 3.2l1-1 2.3 1c-.2 1.4-1.3 2-2.4 1.7-3.5-.9-6-3.4-6.5-6-.2-.9.5-2 1.8-2.2Z" fill="currentColor" /></svg>
                    </a>
                </div>
            </div>
        </article>
    );
}
