import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Shared interior page header.
 *
 * A navy band under the transparent header, with optional photography behind a
 * scrim. Used by every page except the home page, which has its own hero.
 */

export type Crumb = { label: string; href?: string };

export function PageHeader({
    eyebrow,
    title,
    lead,
    image,
    align = "left",
    children,
}: {
    eyebrow?: string;
    title: React.ReactNode;
    lead?: React.ReactNode;
    /** Optional background plate; a flat navy band is used when omitted. */
    image?: string;
    crumbs?: readonly Crumb[];
    align?: "left" | "center";
    children?: React.ReactNode;
}) {
    return (
        <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-ivory">
            {image ? (
                <>
                    <Image
                        src={image}
                        alt=""
                        aria-hidden
                        fill
                        preload
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                    <div aria-hidden className="scrim-band absolute inset-0" />
                </>
            ) : (
                <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(33,70,98,0.55),transparent_60%)]"
                />
            )}

            <Container
                size="wide"
                className={cn(
                    "relative pb-14 pt-[calc(var(--header-h)+2.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+4rem)]",
                    align === "center" && "text-center",
                )}
            >

                <div
                    className={cn("max-w-3xl", align === "center" && "mx-auto")}
                >
                    {eyebrow ? (
                        <p
                            className={cn(
                                "flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-300",
                                align === "center" && "justify-center",
                            )}
                        >
                            <span
                                aria-hidden
                                className="block h-px w-7 flex-none bg-gold-400"
                            />
                            {eyebrow}
                        </p>
                    ) : null}

                    <h1 className="mt-5 font-display text-display-lg text-ivory">
                        {title}
                    </h1>

                    {lead ? (
                        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ivory/65">
                            {lead}
                        </p>
                    ) : null}
                </div>

                {children}
            </Container>
        </section>
    );
}

export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-ivory/50">
                {crumbs.map((crumb, index) => {
                    const last = index === crumbs.length - 1;
                    return (
                        <li
                            key={`${crumb.label}-${index}`}
                            className="flex items-center gap-1.5"
                        >
                            {crumb.href && !last ? (
                                <Link
                                    href={crumb.href}
                                    className="transition-colors duration-200 hover:text-gold-200"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={last ? "page" : undefined}
                                    className="text-ivory/80"
                                >
                                    {crumb.label}
                                </span>
                            )}
                            {!last ? (
                                <ChevronRight
                                    className="size-3 text-ivory/30"
                                    strokeWidth={2}
                                    aria-hidden
                                />
                            ) : null}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
