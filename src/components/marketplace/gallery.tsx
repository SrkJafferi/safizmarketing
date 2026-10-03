"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Expand,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import type { Media } from "@/types/marketplace";
export function MediaGallery({
    items,
    label = "Project gallery",
    plans = false,
}: {
    items: Media[];
    label?: string;
    plans?: boolean;
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement | null>(null);
    const [index, setIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    function open(i: number, button: HTMLButtonElement) {
        setIndex(i);
        setZoom(false);
        trigger.current = button;
        dialog.current?.showModal();
    }
    function close() {
        dialog.current?.close();
        trigger.current?.focus();
    }
    const current = items[index];
    return (
        <div className={`media-gallery ${plans ? "plan-gallery" : ""}`}>
            <div className="gallery-grid">
                {items.map((item, i) => (
                    <button
                        key={item.src}
                        onClick={(e) => open(i, e.currentTarget)}
                        className="gallery-thumb"
                        aria-label={`Open ${item.alt}`}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 900px) 35vw, 90vw"
                            className={
                                plans ? "object-contain" : "object-cover"
                            }
                        />
                        <span>
                            <Expand size={15} />
                            {plans ? item.alt : `View ${i + 1}`}
                        </span>
                    </button>
                ))}
            </div>
            <dialog
                ref={dialog}
                className="media-dialog"
                aria-label={label}
                onCancel={(e) => {
                    e.preventDefault();
                    close();
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) close();
                }}
                onClose={() => trigger.current?.focus()}
            >
                <div className="lightbox-toolbar">
                    <span>
                        {current.alt} · {index + 1}/{items.length}
                    </span>
                    <button
                        onClick={() => setZoom(!zoom)}
                        aria-label={zoom ? "Zoom out" : "Zoom in"}
                    >
                        {zoom ? <ZoomOut /> : <ZoomIn />}
                    </button>
                    <button autoFocus onClick={close} aria-label="Close image">
                        <X />
                    </button>
                </div>
                <div
                    className={`lightbox-viewport ${zoom ? "lightbox-zoomed" : ""}`}
                >
                    <div className="lightbox-image">
                        <Image
                            src={current.src}
                            alt={current.alt}
                            fill
                            sizes={zoom ? "190vw" : "95vw"}
                            className="object-contain"
                        />
                    </div>
                </div>
                {items.length > 1 && (
                    <div className="lightbox-controls">
                        <button
                            onClick={() => {
                                setIndex(
                                    (index + items.length - 1) % items.length,
                                );
                                setZoom(false);
                            }}
                            aria-label="Previous image"
                        >
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={() => {
                                setIndex((index + 1) % items.length);
                                setZoom(false);
                            }}
                            aria-label="Next image"
                        >
                            <ArrowRight />
                        </button>
                    </div>
                )}
            </dialog>
        </div>
    );
}
