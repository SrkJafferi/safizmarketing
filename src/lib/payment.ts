/**
 * Payment maths for the calculator.
 *
 * Standard amortising-payment formula, with the degenerate cases handled
 * explicitly rather than allowed to produce NaN/Infinity:
 *   - 0% rate            → straight-line repayment
 *   - 0 months           → no schedule exists
 *   - 100% down payment  → nothing financed
 */

export type PaymentInput = {
    /** Total property price in PKR. */
    price: number;
    /** Down payment as a percentage of the price, 0–100. */
    downPercent: number;
    /** Annual interest / profit rate as a percentage. */
    annualRate: number;
    /** Tenure in years. */
    years: number;
};

export type PaymentResult = {
    price: number;
    downPayment: number;
    financed: number;
    months: number;
    /** `null` when no repayment schedule can exist (0 months, or nothing financed with 0 months). */
    monthlyPayment: number | null;
    totalPayment: number;
    totalInterest: number;
    /** Set when an edge case means the headline figure needs explaining. */
    note: string | null;
};

export function calculatePayment({
    price,
    downPercent,
    annualRate,
    years,
}: PaymentInput): PaymentResult {
    const safePrice = Math.max(0, finite(price));
    const safePercent = Math.min(100, Math.max(0, finite(downPercent)));
    const safeRate = Math.max(0, finite(annualRate));
    const safeYears = Math.max(0, finite(years));

    const downPayment = round(safePrice * (safePercent / 100));
    const financed = Math.max(0, round(safePrice - downPayment));
    const months = Math.round(safeYears * 12);

    if (financed === 0) {
        return {
            price: safePrice,
            downPayment,
            financed: 0,
            months,
            monthlyPayment: 0,
            totalPayment: safePrice,
            totalInterest: 0,
            note:
                safePrice > 0
                    ? "The full price is covered by the down payment, so there is nothing to finance."
                    : "Enter a property price to see an estimate.",
        };
    }

    if (months === 0) {
        return {
            price: safePrice,
            downPayment,
            financed,
            months: 0,
            monthlyPayment: null,
            totalPayment: safePrice,
            totalInterest: 0,
            note: "Set a tenure of at least one year to see a monthly figure.",
        };
    }

    const monthlyRate = safeRate / 100 / 12;

    // 0% rate: the balance is simply divided across the tenure.
    const monthlyPayment =
        monthlyRate === 0
            ? financed / months
            : (financed * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

    if (!Number.isFinite(monthlyPayment)) {
        return {
            price: safePrice,
            downPayment,
            financed,
            months,
            monthlyPayment: null,
            totalPayment: safePrice,
            totalInterest: 0,
            note: "These values are outside the range this calculator can estimate.",
        };
    }

    const totalFinancedPayment = monthlyPayment * months;

    return {
        price: safePrice,
        downPayment,
        financed,
        months,
        monthlyPayment: round(monthlyPayment),
        totalPayment: round(downPayment + totalFinancedPayment),
        totalInterest: round(totalFinancedPayment - financed),
        note:
            safeRate === 0
                ? "At 0% the financed amount is simply spread across the tenure."
                : null,
    };
}

function finite(value: number): number {
    return Number.isFinite(value) ? value : 0;
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}

/** Verbatim disclaimer required on every surface that shows an estimate. */
export const CALCULATOR_DISCLAIMER =
    "This calculator provides an indicative estimate only. Actual financing terms, eligibility, rates and payments depend on the relevant financial institution." as const;
