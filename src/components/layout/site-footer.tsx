import Link from "next/link";
import Image from "next/image";
import {
    Building2,
    Calculator,
    FileText,
    House,
    HousePlus,
    Info,
    Layers,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Store,
    Users,
} from "lucide-react";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";
import { BrandLogo } from "@/components/layout/brand-logo";
import { contact, footerNav, site } from "@/lib/site";
export function SiteFooter() {
    const quickLinks = [
        { label: "Home", href: "/" },
        ...footerNav.navigate.filter((l) =>
            ["/properties", "/projects", "/developers", "/calculator"].includes(
                l.href,
            ),
        ),
    ];
    const companyLinks = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "List Your Property", href: "/list-your-property" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ];
    const locationLinks = [
        { label: "Islamabad", href: "/properties?city=Islamabad" },
        {
            label: "Bahria Enclave",
            href: "/properties?project=smart-one-heights-2",
        },
        { label: "Faisal Margalla City (FMC)", href: "/projects/rahat-heights" },
        { label: "Kharian", href: "/properties?city=Kharian" },
    ];
    return (
        <footer className="reference-home-footer">
            <div className="rh-container">
                <div className="rh-footer-grid">
                    <div className="rh-footer-brand">
                        <BrandLogo variant="reverse" />
                        <p>{site.shortDescription}</p>
                        <ul className="rh-footer-contact">
                            <li>
                                <a href="mailto:info@safizmarketing.com">
                                    <Mail aria-hidden="true" />
                                    <span>info@safizmarketing.com</span>
                                </a>
                            </li>
                            <li>
                                <a href={contact.phoneHref}>
                                    <Phone aria-hidden="true" />
                                    <span>{contact.phoneDisplay}</span>
                                </a>
                            </li>
                            <li>
                                <div>
                                    <MapPin aria-hidden="true" />
                                    <span>
                                        Office 6, 2nd Floor United Plaza Fazal
                                        Haq Road Blue Area, Back Side of NADRA
                                        Office, Islamabad
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {[
                        { title: "Quick Links", links: quickLinks },
                        { title: "Company", links: companyLinks },
                        { title: "Locations", links: locationLinks },
                    ].map((group) => (
                        <div key={group.title}>
                            <h2>{group.title}</h2>
                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <FooterMenuLink
                                            href={link.href}
                                            label={link.label}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="rh-footer-social">
                        <h2>Follow Us</h2>
                        <div className="rh-footer-social-icons">
                            {(
                                [
                                    "Instagram",
                                    "Facebook",
                                    "LinkedIn",
                                    "YouTube",
                                ] as SocialName[]
                            ).map((name) => (
                                <a href="#" key={name} aria-label={name}>
                                    <SocialIcon name={name} />
                                </a>
                            ))}
                        </div>
                        <Image
                            className="rh-footer-qr"
                            src="/brand/qr-code.avif"
                            alt="SAFIZ MARKETING QR code"
                            width={160}
                            height={160}
                            unoptimized
                        />
                    </div>
                </div>
                <div className="rh-footer-bottom">
                    <span>
                        © {new Date().getFullYear()} SAFIZ MARKETING. All rights
                        reserved.
                    </span>
                    <span>Connecting People. Building Opportunities.</span>
                </div>
            </div>
        </footer>
    );
}

function FooterMenuLink({ href, label }: { href: string; label: string }) {
    const Icon =
        href.includes("city=") ||
        href.includes("project=") ||
        href === "/projects/rahat-heights"
            ? MapPin
            : href === "/"
              ? House
              : href === "/calculator"
                ? Calculator
                : href === "/developers"
                  ? Users
                  : href === "/projects"
                    ? Layers
                    : href === "/about"
                      ? Info
                      : href === "/contact"
                        ? Phone
                        : href === "/list-your-property"
                          ? HousePlus
                          : href === "/privacy"
                            ? ShieldCheck
                            : href === "/terms"
                              ? FileText
                              : href.includes("type=shop")
                                ? Store
                                : Building2;
    return (
        <Link href={href} className="footer-menu-link">
            <Icon aria-hidden="true" />
            <span>{label}</span>
        </Link>
    );
}
