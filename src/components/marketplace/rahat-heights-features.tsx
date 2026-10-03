import { ArrowDownRight, Bath, BedDouble, BellRing, Building2, Cable, Cctv, Dumbbell, Eye, FerrisWheel, Footprints, GraduationCap, Grid2X2, House, Landmark, Layers, MapPin, MoveHorizontal, PaintRoller, ParkingSquare, PawPrint, Shield, ShieldCheck, Store, Toilet, Trash2, Trees, Trophy, Volleyball, Waves, Zap } from "lucide-react";
import Image from "next/image";
import { Info } from "lucide-react";
import styles from "./rahat-heights-features.module.css";

// Transcribed from the supplied Rahat Heights developer brochure.
const groups = [
    {
        title: "Residential & Commercial", icon: Building2,
        items: [
            { label: "1, 2 & 3 Bed Luxury Apartments", icon: BedDouble },
            { label: "Lower Ground & Ground Floor Shops", icon: Store },
            { label: "Spacious Passages", icon: MoveHorizontal },
            { label: "Stairs Lobby on Each Floor", icon: Layers },
            { label: "Wide Emergency Stairs", icon: Footprints },
            { label: "Separate Washrooms for Commercial Area", icon: Toilet },
        ],
    },
    {
        title: "Safety & Access", icon: Shield,
        items: [
            { label: "Elevator with Smart Card Security Facility", icon: ShieldCheck },
            { label: "Fire Alarm Facility", icon: BellRing },
            { label: "CCTV Surveillance", icon: Cctv },
            { label: "Gated Community / Security 24/7", icon: Shield },
            { label: "Refuse Chute Facility", icon: Trash2 },
        ],
    },
    {
        title: "Infrastructure & Finishes", icon: Layers,
        items: [
            { label: "Underground Sewerage", icon: Waves },
            { label: "Electricity & Water Supply", icon: Zap },
            { label: "Tiles & Marble Flooring", icon: Grid2X2 },
            { label: "Best Quality Wall Paint", icon: PaintRoller },
            { label: "Best Quality Sanitary Fitting", icon: Bath },
            { label: "Copper Wire Used in Electric Fittings", icon: Cable },
            { label: "Modern Exterior", icon: Building2 },
        ],
    },
    {
        title: "Views & Lifestyle", icon: Eye,
        items: [
            { label: "Gymnasium", icon: Dumbbell },
            { label: "Front-Back Open View", icon: Eye },
            { label: "Both Side Front / Back Parking", icon: ParkingSquare },
            { label: "Front Side Villas View", icon: House },
            { label: "Back Side Commercial Area", icon: Store },
        ],
    },
];
const facilities = [
    { name: "Sir Syed University", minutes: 2, icon: GraduationCap },
    { name: "Multi Club", minutes: 5, icon: Dumbbell },
    { name: "YoYo Theme Park", minutes: 10, icon: FerrisWheel },
    { name: "Banks", minutes: 20, icon: Landmark },
    { name: "Zoo", minutes: 15, icon: PawPrint },
    { name: "Cricket Ground", minutes: 10, icon: Trophy },
    { name: "Football Ground", minutes: 10, icon: Volleyball },
    { name: "Park", minutes: 2, icon: Trees },
    { name: "Lake", minutes: 15, icon: Waves },
    { name: "Mosque", minutes: 2, icon: MapPin },
];

export function RahatHeightsFeatures() {
    return <>
        <section className={styles.features} id="features" aria-labelledby="rahat-features-heading">
            <div className={`rh-container ${styles.editorial}`}>
                <div className={styles.intro}>
                    <p className={styles.eyebrow}>Project Features</p>
                    <h2 id="rahat-features-heading">Designed Around<br /><span>Everyday Life.</span></h2>
                    <p className={styles.copy}>Rahat Heights brings residential comfort, commercial convenience and essential building facilities together in one well-planned development.</p>
                    <div className={styles.photos}>
                        <figure className={styles.lifestyle}><Image src="/projects/rahat-heights-lifestyle.jpg" alt="Children enjoying outdoor leisure, from the developer brochure" fill sizes="(min-width: 1000px) 34vw, 90vw" /><figcaption>Project lifestyle from developer brochure</figcaption></figure>
                        <div className={styles.smallPhotos}>{[{src: "gym", label: "Gymnasium"}, {src: "commercial", label: "Commercial Area"}, {src: "cctv", label: "CCTV Surveillance"}].map(({src, label}) => <figure key={src}><Image src={`/projects/rahat-heights-${src}.jpg`} alt={`${label}, from the developer brochure`} fill sizes="(min-width: 1000px) 12vw, 30vw" /><figcaption>{label}</figcaption></figure>)}</div>
                    </div>
                </div>
                <div className={styles.groups}>{groups.map(({ title, icon: Icon, items }, index) => <article className={styles.group} key={title}>
                    <Image className={styles.groupVisual} src={`/projects/rahat-heights-${["exterior", "cctv", "interior", "surroundings"][index]}.jpg`} alt="" fill sizes="(min-width: 1000px) 28vw, 90vw" />
                    <div className={styles.groupHeading}><span className={styles.groupIcon}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /></span><h3>{title}</h3></div>
                    <ul>{items.map(({ label, icon: ItemIcon }) => <li key={label}><ItemIcon size={17} strokeWidth={1.4} aria-hidden="true" /><span>{label}</span></li>)}</ul>
                </article>)}</div>
            </div>
        </section>
        <section className={styles.nearby} id="rahat-nearby-facilities" aria-labelledby="rahat-nearby-heading">
            <div className={`rh-container ${styles.nearbyLayout}`}>
                <div className={styles.nearbyHead}>
                    <div><p className={styles.eyebrow}>Nearby Facilities</p><h2 id="rahat-nearby-heading">Everyday Essentials <span>Within Easy Reach.</span></h2></div>
                    <p className={styles.copy}>The developer brochure highlights a range of educational, recreational and community facilities within the surrounding area.</p>
                </div>
                <div className={styles.nearbyDetails}><ul className={styles.facilities}>{facilities.map(({ name, minutes, icon: Icon }) => <li key={name}>
                    <span className={styles.facilityIcon}><Icon size={27} strokeWidth={1.3} aria-hidden="true" /></span><div>
                    <p className={styles.time}><strong>{minutes}</strong><span>MIN</span></p>
                    <h3>{name}</h3></div>
                </li>)}</ul>
                <div className={styles.nearbyFoot}>
                    <p>Proximity times as stated in the developer brochure.</p>
                    <a href="#location">Explore the project location<ArrowDownRight size={16} aria-hidden="true" /></a>
                </div>
                <p className={styles.disclaimer}><Info size={18} aria-hidden="true" /><span>Features, facilities and proximity information are based on material supplied by the developer and may be subject to change. Contact SAFIZ MARKETING for current project details.</span></p></div>
            </div>
        </section>
    </>;
}

