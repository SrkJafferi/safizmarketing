import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
type LogoProps = {
    variant?: "default" | "reverse";
    className?: string;
    size?: "sm" | "md" | "lg";
    showDivision?: boolean;
};
export function BrandLogo({
    className,
    size = "md",
    variant = "default",
}: LogoProps) {
    return (
        <Image
            src={
                variant === "reverse"
                    ? "/brand/safiz-logo.webp"
                    : "/brand/sadiz-logo.avif"
            }
            alt="SAFIZ MARKETING — Real Estate Division"
            width={800}
            height={250}
            unoptimized
            className={cn("official-logo", className)}
            style={{
                width: size === "lg" ? 240 : size === "sm" ? 150 : 220,
                height: "auto",
                objectFit: "contain",
            }}
        />
    );
}
export function BrandLogoLink(props: LogoProps) {
    return (
        <Link
            href="/"
            className="shrink-0"
            aria-label="SAFIZ MARKETING homepage"
        >
            <BrandLogo {...props} />
        </Link>
    );
}
