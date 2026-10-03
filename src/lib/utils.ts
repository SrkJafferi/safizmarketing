/** Minimal class-name joiner. Avoids pulling clsx/tailwind-merge in for this. */
export function cn(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(" ");
}
