import Link from "next/link";
import { DirectoryHeader } from "@/components/marketplace/common";
export default function NotFound() {
    return (
        <>
            <DirectoryHeader
                eyebrow="Page not found"
                title="A different direction."
                copy="This page or property is not listed here. Explore our current project collection or browse published units."
            />
            <div className="market-container market-section flex gap-5 flex-wrap">
                <Link href="/projects" className="market-button">
                    Explore projects ↗
                </Link>
                <Link href="/properties" className="text-link">
                    Browse properties ↗
                </Link>
            </div>
        </>
    );
}
