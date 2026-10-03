"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { contact, primaryNav } from "@/lib/site";
import { genericWhatsappLink } from "@/lib/whatsapp";
export function SiteHeader() {
    const pathname = usePathname();
    const useHomeHeader = pathname === "/" || pathname.startsWith("/properties") || pathname.startsWith("/projects") || pathname === "/about" || pathname === "/contact" || pathname.startsWith("/developers") || pathname === "/calculator" || pathname === "/list-your-property";
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        fn();
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    useEffect(() => {
        const previous = document.body.style.overflow;
        if (open) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);
    function close() {
        dialog.current?.close();
        setOpen(false);
        trigger.current?.focus();
    }
    function show() {
        dialog.current?.showModal();
        setOpen(true);
    }
    return (
        <header
            className={`market-header ${useHomeHeader ? "reference-home-header" : ""} ${scrolled ? "header-scrolled" : ""}`}
        >
            <div className="market-header-inner">
                <BrandLogoLink variant={useHomeHeader ? "reverse" : "default"} />
                <nav aria-label="Primary navigation">
                    <ul>
                        {primaryNav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    aria-current={
                                        (
                                            item.href === "/"
                                                ? pathname === "/"
                                                : pathname.startsWith(item.href)
                                        )
                                            ? "page"
                                            : undefined
                                    }
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="header-actions">
                    {useHomeHeader && (
                        <a
                            className="rh-header-contact"
                            href={genericWhatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle size={18} />
                            {contact.phoneDisplay}
                        </a>
                    )}
                    <Link href="/list-your-property" className="header-list">
                        List your property <span>↗</span>
                    </Link>
                    <a
                        className="header-chat"
                        href={genericWhatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contact SAFIZ MARKETING on WhatsApp"
                    >
                        <MessageCircle size={19} />
                    </a>
                    <button
                        ref={trigger}
                        className="menu-trigger"
                        onClick={show}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>
            <dialog
                id="mobile-menu"
                aria-label="Site menu"
                ref={dialog}
                className="mobile-menu"
                onCancel={(e) => {
                    e.preventDefault();
                    close();
                }}
                onClose={() => {
                    setOpen(false);
                    trigger.current?.focus();
                }}
            >
                <div className="mobile-menu-top">
                    <BrandLogoLink />
                    <button autoFocus onClick={close} aria-label="Close menu">
                        <X />
                    </button>
                </div>
                <nav aria-label="Mobile navigation">
                    {primaryNav.map((item, i) => (
                        <Link key={item.href} onClick={close} href={item.href}>
                            <span>0{i + 1}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Link
                    className="market-button"
                    onClick={close}
                    href="/list-your-property"
                >
                    List your property ↗
                </Link>
                <a
                    href={genericWhatsappLink}
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MessageCircle size={18} /> Chat with SAFIZ MARKETING
                </a>
            </dialog>
        </header>
    );
}
