"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

export function PropertyResults({
    cards,
    view,
}: {
    cards: ReactNode[];
    view: "grid" | "list";
}) {
    const [limit, setLimit] = useState(PAGE_SIZE);
    const shown = Math.min(limit, cards.length);

    return (
        <>
            <div
                id="property-results"
                className={`unit-grid ${view === "list" ? "view-list" : ""}`}
            >
                {cards.slice(0, shown)}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4">
                <p className="text-xs text-navy-900/65" role="status">
                    Showing {shown} of {cards.length} properties
                </p>
                {shown < cards.length && (
                    <Button
                        type="button"
                        aria-controls="property-results"
                        onClick={() =>
                            setLimit((previous) =>
                                Math.min(previous + PAGE_SIZE, cards.length),
                            )
                        }
                    >
                        Show More
                    </Button>
                )}
            </div>
        </>
    );
}
