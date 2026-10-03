import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import {
    getDeveloper,
    getProject,
    startingPrice,
    unitSizeLabel,
    unitTypeLabel,
} from "@/data/marketplace";
import { formatPkr } from "@/lib/format";
import { projectWhatsappLink, unitWhatsappLink } from "@/lib/whatsapp";
import type { Project, PropertyUnit } from "@/types/marketplace";

export function ProjectCard({
    project,
    prominent = false,
}: {
    project: Project;
    prominent?: boolean;
}) {
    const price = startingPrice(project.id);
    const developer = getDeveloper(project.developerId)!;
    return (
        <article
            className={`project-card ${prominent ? "project-card-feature" : ""}`}
        >
            <Link href={`/projects/${project.slug}`} className="project-image">
                <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes={
                        prominent
                            ? "(min-width: 900px) 60vw, 100vw"
                            : "(min-width: 900px) 40vw, 100vw"
                    }
                    className="object-cover"
                />
                <span className="image-note">Developer concept render</span>
                <span className="project-index">{project.projectType}</span>
            </Link>
            <div className="project-card-body">
                <p className="eyebrow">By {developer.name}</p>
                <h3>
                    <Link href={`/projects/${project.slug}`}>
                        {project.name}
                    </Link>
                </h3>
                <p className="location-line">
                    <MapPin size={14} />
                    {project.address}
                </p>
                <p className="project-categories">
                    {project.categories.join(" · ")}
                </p>
                <div className="project-card-foot">
                    <span>
                        {price === null ? (
                            "Pricing on enquiry"
                        ) : (
                            <>
                                Published from{" "}
                                <strong>{formatPkr(price)}</strong>
                            </>
                        )}
                    </span>
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-link"
                        aria-label={`View ${project.name}`}
                    >
                        View project <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
export function UnitCard({ unit }: { unit: PropertyUnit }) {
    const project = getProject(unit.projectId)!;
    const developer = getDeveloper(project.developerId)!;
    return (
        <article className="unit-card">
            <Link href={`/properties/${unit.slug}`} className="unit-image">
                <Image
                    src={project.cover.src}
                    alt={`${project.name} exterior concept; individual unit photography not supplied`}
                    fill
                    sizes="(min-width: 1100px) 30vw, (min-width: 650px) 48vw, 100vw"
                    className="object-cover"
                />
                <span className="unit-image-type">{unitTypeLabel(unit)}</span>
                <span className="image-note">
                    Project concept · unit image not supplied
                </span>
            </Link>
            <div className="unit-card-body">
                <div className="unit-title">
                    <h3>
                        <Link href={`/properties/${unit.slug}`}>
                            {unit.unitNumber}
                        </Link>
                    </h3>
                    <span>{unit.floor} floor</span>
                </div>
                <Link
                    className="unit-project"
                    href={`/projects/${project.slug}`}
                >
                    {project.name}
                </Link>
                <p className="unit-developer">By {developer.name}</p>
                <p className="location-line">
                    <MapPin size={14} />
                    {project.address}
                </p>
                <div className="unit-price">
                    <span>{unitSizeLabel(unit)}</span>
                    <strong>{formatPkr(unit.price)}</strong>
                </div>
                <p className="availability">Contact for current availability</p>
                <div className="unit-actions">
                    <Link href={`/properties/${unit.slug}`}>
                        View details <ArrowUpRight size={16} />
                    </Link>
                    <a
                        href={unitWhatsappLink(unit)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${unit.unitNumber}, ${unit.floor} floor at ${project.name} on WhatsApp`}
                    >
                        <MessageCircle size={16} /> WhatsApp
                    </a>
                </div>
            </div>
        </article>
    );
}
export function ProjectEnquiry({ project }: { project: Project }) {
    return (
        <a
            className="market-button"
            href={projectWhatsappLink(project)}
            target="_blank"
            rel="noopener noreferrer"
        >
            <MessageCircle size={17} /> Enquire about this project
        </a>
    );
}
