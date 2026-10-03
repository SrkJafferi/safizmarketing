/**
 * Number and currency formatting for a Pakistani audience.
 *
 * `en-PK` groups in the Western 3-digit style (25,000,000) which is what the
 * brief asks for, while `formatCrore` adds the local crore/lakh reading that
 * Pakistani buyers actually use when talking about property.
 */

const pkr = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
});

const plain = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** `25000000` → `"PKR 25,000,000"` */
export function formatPkr(value: number): string {
    if (!Number.isFinite(value)) return "—";
    // Intl renders "PKR 25,000,000" but with a narrow no-break space; normalise it.
    return pkr.format(Math.round(value)).replace(/ /g, " ");
}

/** Preserve any fractional amount printed in a developer's payment plan. */
export function formatExactPkr(value: number): string {
    return `PKR ${new Intl.NumberFormat("en-PK", { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value)}`;
}

/** `25000000` → `"25,000,000"` */
export function formatNumber(value: number): string {
    if (!Number.isFinite(value)) return "—";
    return plain.format(Math.round(value));
}

/**
 * `25000000` → `"2.5 Crore"`, `850000` → `"8.5 Lakh"`.
 * Used as a secondary, smaller reading beneath the full figure.
 */
export function formatCrore(value: number): string {
    if (!Number.isFinite(value) || value <= 0) return "—";
    if (value >= 10_000_000) {
        const crore = value / 10_000_000;
        return `${trimZeros(crore)} Crore`;
    }
    if (value >= 100_000) {
        const lakh = value / 100_000;
        return `${trimZeros(lakh)} Lakh`;
    }
    return formatNumber(value);
}

function trimZeros(n: number): string {
    return n.toFixed(2).replace(/\.?0+$/, "");
}

export function formatPercent(value: number, fractionDigits = 2): string {
    if (!Number.isFinite(value)) return "—";
    return `${trimZeros(Number(value.toFixed(fractionDigits)))}%`;
}

/** Parses a user-typed figure, tolerating commas, spaces and "PKR". */
export function parseNumericInput(raw: string): number | null {
    const cleaned = raw.replace(/[^\d.]/g, "");
    if (cleaned === "" || cleaned === ".") return null;
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : null;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
