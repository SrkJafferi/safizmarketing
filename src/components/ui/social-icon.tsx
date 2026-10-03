import type { SVGProps } from "react";
export type SocialName = "Instagram" | "Facebook" | "LinkedIn" | "YouTube";
export function SocialIcon({
    name,
    ...props
}: SVGProps<SVGSVGElement> & { name: SocialName }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {name === "Instagram" && (
                <>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                    />
                </>
            )}
            {name === "Facebook" && (
                <path
                    stroke="none"
                    fill="currentColor"
                    d="M14.2 22v-8.8h3l.5-3.4h-3.5V7.6c0-1 .3-1.7 1.7-1.7H18V2.8c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.1v2.1H7v3.4h3V22z"
                />
            )}
            {name === "LinkedIn" && (
                <>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7.5 10v7M11.5 17v-7M11.5 13a3 3 0 0 1 6 0v4" />
                    <circle
                        cx="7.5"
                        cy="7"
                        r="1"
                        stroke="none"
                        fill="currentColor"
                    />
                </>
            )}
            {name === "YouTube" && (
                <>
                    <rect x="2" y="5" width="20" height="14" rx="4" />
                    <path
                        stroke="none"
                        fill="currentColor"
                        d="m10 8 6 4-6 4z"
                    />
                </>
            )}
        </svg>
    );
}
