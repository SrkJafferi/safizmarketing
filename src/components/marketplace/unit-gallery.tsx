"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Media } from "@/types/marketplace";
import styles from "./property-detail.module.css";

export function UnitGallery({ items, label }: { items: Media[]; label: string }) {
    const [index, setIndex] = useState(0);
    const dialog = useRef<HTMLDialogElement>(null);
    const imageButton = useRef<HTMLButtonElement>(null);
    const current = items[index];
    const move = (direction: number) => setIndex((previous) => (previous + direction + items.length) % items.length);
    return <div>
        <div className={styles.galleryHero}>
            <button type="button" className={styles.galleryImage} ref={imageButton} onClick={() => dialog.current?.showModal()} aria-label="Enlarge project image">
                <Image src={current.src} alt={current.alt} fill sizes="(min-width: 1000px) 52vw, 90vw" preload={index === 0} className={index === 0 ? "object-cover" : "object-contain"} />
            </button>
            <span className={styles.galleryBadge}>{label}</span>
            {items.length > 1 && <><button type="button" className={`${styles.galleryArrow} ${styles.previous}`} aria-label="Previous project image" onClick={() => move(-1)}><ChevronLeft size={20} /></button><button type="button" className={`${styles.galleryArrow} ${styles.next}`} aria-label="Next project image" onClick={() => move(1)}><ChevronRight size={20} /></button></>}
            <span className={styles.galleryCount}><Expand size={13} />{index + 1} / {items.length}</span>
            <span className={styles.galleryCredit}>Developer concept material · unit photography not supplied</span>
        </div>
        <div className={styles.thumbnails}>{items.map((item, position) => <button type="button" key={item.src} aria-label={`Show project image ${position + 1}`} aria-pressed={position === index} onClick={() => setIndex(position)}><Image src={item.src} alt={item.alt} fill sizes="120px" className="object-cover" /></button>)}</div>
        <dialog className={styles.imageDialog} ref={dialog} aria-label="Enlarged project image" onClose={() => imageButton.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
            <div className={styles.dialogTop}><span>{current.alt}</span><button type="button" autoFocus aria-label="Close project image" onClick={() => dialog.current?.close()}><X /></button></div>
            <div className={styles.dialogImage}><Image src={current.src} alt={current.alt} fill sizes="95vw" className="object-contain" /></div>
        </dialog>
    </div>;
}
