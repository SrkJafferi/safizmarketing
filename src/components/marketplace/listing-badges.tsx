import type { PropertyUnit } from "@/types/marketplace";
import { listingPurposes, occupancyLabel } from "@/lib/listings";
import styles from "./listing-badges.module.css";

export function ListingBadges({ unit }: { unit: PropertyUnit }) {
    return <div className={styles.badges}>
        {listingPurposes(unit).map(purpose => <span key={purpose} className={purpose === "rent" ? styles.rent : styles.sale}>{purpose === "rent" ? "For Rent" : "For Sale"}</span>)}
        {unit.inventorySource && <span>{unit.inventorySource}</span>}
        {occupancyLabel(unit) && <span>{occupancyLabel(unit)}</span>}
        {unit.furnished && <span className={styles.furnished}>Furnished</span>}
    </div>;
}
