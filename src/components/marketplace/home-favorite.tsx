"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
export function HomeFavorite({ unitLabel }: { unitLabel: string }) {
    const [saved, setSaved] = useState(false);
    return (
        <button
            className="rh-favorite"
            type="button"
            aria-pressed={saved}
            aria-label={`${saved ? "Unsave" : "Save"} ${unitLabel}`}
            onClick={() => setSaved(!saved)}
        >
            <Heart fill={saved ? "currentColor" : "none"} />
        </button>
    );
}
