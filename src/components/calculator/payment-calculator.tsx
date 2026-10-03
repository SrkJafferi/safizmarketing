"use client";

import { useId, useMemo, useState } from "react";
import { Building2, ChartNoAxesColumnIncreasing, Coins, FileText, Info, Wallet } from "lucide-react";
import styles from "./payment-calculator.module.css";

import {
    clamp,
    formatCrore,
    formatNumber,
    formatPkr,
    parseNumericInput,
} from "@/lib/format";
import { CALCULATOR_DISCLAIMER, calculatePayment } from "@/lib/payment";
import { cn } from "@/lib/utils";

/**
 * Payment calculator.
 *
 * `price`, `downPercent`, `rate` and `years` are the only state. The down
 * payment amount and the financed amount are derived, but both are editable —
 * typing into either back-solves the percentage, so the three figures can never
 * drift out of agreement.
 */

const PRICE_MIN = 1_000_000;
const PRICE_MAX = 200_000_000;
const PRICE_STEP = 250_000;
const RATE_MAX = 40;
const YEARS_MAX = 30;
/** Manual entry ceiling — generous, but keeps the maths inside safe range. */
const PRICE_CEILING = 10_000_000_000;

export function PaymentCalculator({ compact = false }: { compact?: boolean }) {
    const [price, setPrice] = useState(25_000_000);
    const [downPercent, setDownPercent] = useState(20);
    const [rate, setRate] = useState(16);
    const [years, setYears] = useState(15);
    const [downMode, setDownMode] = useState<"percent" | "amount">("percent");

    const result = useMemo(
        () => calculatePayment({ price, downPercent, annualRate: rate, years }),
        [price, downPercent, rate, years],
    );

    /** Editing the down payment amount back-solves the percentage. */
    const setDownAmount = (amount: number) => {
        if (price <= 0) return setDownPercent(0);
        setDownPercent(clamp((amount / price) * 100, 0, 100));
    };

    /** Editing the financed amount does the same, from the other direction. */
    const setFinanced = (financed: number) => {
        if (price <= 0) return setDownPercent(0);
        setDownPercent(clamp(((price - financed) / price) * 100, 0, 100));
    };

    return (
        <div
            className={cn(
                "grid gap-px overflow-hidden rounded-[4px] border border-navy-900/10 bg-navy-900/10",
                compact ? "lg:grid-cols-2" : "lg:grid-cols-[1.15fr_1fr]",
                styles.calculator,
            )}
        >
            {/* Inputs --------------------------------------------------------- */}
            <div className={cn("bg-white p-6 sm:p-8 lg:p-10", styles.inputs)}>
                <div className={styles.inputHeading}><h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-600">
                    Your Numbers
                </h3><span>All figures in PKR</span></div>

                <div className={cn("mt-8 flex flex-col gap-8", styles.fields)}>
                    <MoneyField
                        label="Property Price"
                        value={price}
                        onChange={(next) =>
                            setPrice(clamp(next, 0, PRICE_CEILING))
                        }
                        min={PRICE_MIN}
                        max={PRICE_MAX}
                        step={PRICE_STEP}
                        sliderLabel="Property price"
                    />

                    <div className={styles.downField}><div className={styles.modeToggle} aria-label="Down payment entry mode"><button type="button" aria-label="Enter down payment as percentage" aria-pressed={downMode === "percent"} onClick={() => setDownMode("percent")}>%</button><button type="button" aria-label="Enter down payment in PKR" aria-pressed={downMode === "amount"} onClick={() => setDownMode("amount")}>PKR</button></div>{downMode === "percent" ? <PercentField
                        label="Down Payment"
                        value={downPercent}
                        onChange={(next) => setDownPercent(clamp(next, 0, 100))}
                        max={100}
                        step={1}
                        sliderLabel="Down payment percentage"
                    /> : <MoneyField label="Down Payment" value={result.downPayment} onChange={setDownAmount} min={0} max={Math.max(price, 1)} step={10000} sliderLabel="Down payment amount" />}</div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <MoneyEntry
                            label="Down Payment Amount"
                            value={result.downPayment}
                            onChange={setDownAmount}
                            disabled={price <= 0}
                        />
                        <MoneyEntry
                            label="Financing Amount"
                            value={result.financed}
                            onChange={setFinanced}
                            disabled={price <= 0}
                        />
                    </div>

                    <PercentField
                        label="Interest / Profit Rate"
                        value={rate}
                        onChange={(next) => setRate(clamp(next, 0, 100))}
                        max={RATE_MAX}
                        step={0.25}
                        decimals={2}
                        sliderLabel="Annual interest or profit rate"
                    />

                    <YearsField
                        value={years}
                        onChange={(next) =>
                            setYears(clamp(Math.round(next), 0, 50))
                        }
                        max={YEARS_MAX}
                    />
                </div>
            </div>

            {/* Results -------------------------------------------------------- */}
            <div className={cn("relative overflow-hidden bg-navy-950 p-6 text-ivory sm:p-8 lg:p-10", styles.results)}>
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[radial-gradient(circle,rgba(213,163,58,0.14),transparent_65%)]"
                />
                <div className="relative">
                    <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
                        Estimated Monthly Payment
                    </h3>

                    <div aria-live="polite" className="mt-7">
                        <p className={styles.monthlyAmount}>
                            {result.monthlyPayment === null
                                ? "—"
                                : formatPkr(result.monthlyPayment)}
                        </p>
                        {result.monthlyPayment !== null &&
                        result.monthlyPayment > 0 ? (
                            <p className="mt-2.5 text-[0.8125rem] text-gold-200/70">
                                ≈ {formatCrore(result.monthlyPayment)} per month
                                over {formatNumber(result.months)} months
                            </p>
                        ) : null}
                        {result.note ? (
                            <p className="mt-3 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-gold-200/80">
                                <Info
                                    className="mt-0.5 size-3.5 flex-none"
                                    strokeWidth={1.8}
                                    aria-hidden
                                />
                                {result.note}
                            </p>
                        ) : null}
                    </div>

                    <dl className="mt-9 flex flex-col divide-y divide-ivory/[0.09] border-t border-ivory/[0.09]">
                        <ResultRow
                            term="Property Price"
                            value={formatPkr(result.price)}
                        />
                        <ResultRow
                            term={`Down Payment (${Number(downPercent.toFixed(2))}%)`}
                            value={formatPkr(result.downPayment)}
                        />
                        <ResultRow
                            term="Financing Amount"
                            value={formatPkr(result.financed)}
                        />
                        <ResultRow
                            term="Total Estimated Payment"
                            value={formatPkr(result.totalPayment)}
                        />
                        <ResultRow
                            term="Estimated Total Interest / Profit"
                            value={formatPkr(result.totalInterest)}
                            accent
                        />
                    </dl>

                    <p className={styles.disclaimer}><Info size={20} aria-hidden="true" />
                        {CALCULATOR_DISCLAIMER}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Fields                                                                      */
/* -------------------------------------------------------------------------- */

function MoneyField({
    label,
    value,
    onChange,
    min,
    max,
    step,
    sliderLabel,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    sliderLabel: string;
}) {
    const id = useId();
    return (
        <div>
            <div className="flex items-end justify-between gap-4">
                <label
                    htmlFor={id}
                    className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted"
                >
                    {label}
                </label>
                <p className="text-[0.75rem] text-gold-600">
                    {formatCrore(value)}
                </p>
            </div>
            <div className="mt-2.5 flex items-center gap-2 border-b border-navy-900/15 pb-2 transition-colors duration-300 focus-within:border-gold-400">
                <span className="text-[0.8125rem] font-semibold text-muted">
                    PKR
                </span>
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(value)}
                    onChange={(event) =>
                        onChange(parseNumericInput(event.target.value) ?? 0)
                    }
                    className="w-full min-w-0 bg-transparent font-sans text-[1.5rem] text-navy-950 tabular-nums focus:outline-none"
                />
            </div>
            <Slider
                label={sliderLabel}
                value={Math.min(Math.max(value, min), max)}
                min={min}
                max={max}
                step={step}
                valueText={formatPkr(value)}
                onChange={onChange}
            />
        </div>
    );
}

/**
 * A derived money figure that is also editable: on blur (or Enter) the typed
 * value is parsed and handed back, which back-solves the down-payment
 * percentage in the parent. No slider — this control exists so the three
 * figures stay in agreement, not to explore a range.
 */
function MoneyEntry({
    label,
    value,
    onChange,
    disabled,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}) {
    const id = useId();
    const [draft, setDraft] = useState<string | null>(null);
    const shown = draft ?? formatNumber(value);

    const commit = () => {
        if (draft === null) return;
        const parsed = parseNumericInput(draft);
        setDraft(null);
        if (parsed !== null) onChange(parsed);
    };

    return (
        <div>
            <label
                htmlFor={id}
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted"
            >
                {label}
            </label>
            <div
                className={cn(
                    "mt-2.5 flex items-center gap-2 border-b border-navy-900/15 pb-2 transition-colors duration-300",
                    disabled ? "opacity-50" : "focus-within:border-gold-400",
                )}
            >
                <span className="text-[0.8125rem] font-semibold text-muted">
                    PKR
                </span>
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    disabled={disabled}
                    value={shown}
                    onChange={(event) => setDraft(event.target.value)}
                    onBlur={commit}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            commit();
                        }
                        if (event.key === "Escape") setDraft(null);
                    }}
                    className="w-full min-w-0 bg-transparent font-sans text-[1.25rem] text-navy-950 tabular-nums focus:outline-none disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );
}

function PercentField({
    label,
    value,
    onChange,
    max,
    step,
    decimals = 0,
    sliderLabel,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max: number;
    step: number;
    decimals?: number;
    sliderLabel: string;
}) {
    const id = useId();
    const display = Number.isInteger(value)
        ? String(value)
        : value.toFixed(decimals || 2);
    return (
        <div>
            <div className="flex items-end justify-between gap-4">
                <label
                    htmlFor={id}
                    className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted"
                >
                    {label}
                </label>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 border-b border-navy-900/15 pb-2 transition-colors duration-300 focus-within:border-gold-400">
                <input
                    id={id}
                    type="text"
                    inputMode="decimal"
                    value={display}
                    onChange={(event) =>
                        onChange(parseNumericInput(event.target.value) ?? 0)
                    }
                    className="w-full min-w-0 bg-transparent font-sans text-[1.5rem] text-navy-950 tabular-nums focus:outline-none"
                />
                <span className="font-sans text-[1.25rem] text-gold-600">
                    %
                </span>
            </div>
            <Slider
                label={sliderLabel}
                value={Math.min(value, max)}
                min={0}
                max={max}
                step={step}
                valueText={`${display} percent`}
                onChange={onChange}
            />
        </div>
    );
}

function YearsField({
    value,
    onChange,
    max,
}: {
    value: number;
    onChange: (value: number) => void;
    max: number;
}) {
    const id = useId();
    return (
        <div>
            <div className="flex items-end justify-between gap-4">
                <label
                    htmlFor={id}
                    className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted"
                >
                    Tenure
                </label>
                <p className="text-[0.75rem] text-gold-600">
                    {value * 12} months
                </p>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2 border-b border-navy-900/15 pb-2 transition-colors duration-300 focus-within:border-gold-400">
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    value={String(value)}
                    onChange={(event) =>
                        onChange(parseNumericInput(event.target.value) ?? 0)
                    }
                    className="w-full min-w-0 bg-transparent font-sans text-[1.5rem] text-navy-950 tabular-nums focus:outline-none"
                />
                <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-gold-600">
                    {value === 1 ? "year" : "years"}
                </span>
            </div>
            <Slider
                label="Tenure in years"
                value={Math.min(value, max)}
                min={0}
                max={max}
                step={1}
                valueText={`${value} ${value === 1 ? "year" : "years"}`}
                onChange={onChange}
            />
        </div>
    );
}

function Slider({
    label,
    value,
    min,
    max,
    step,
    valueText,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    valueText: string;
    onChange: (value: number) => void;
}) {
    const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;
    return (
        <input
            type="range"
            aria-label={label}
            aria-valuetext={valueText}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onChange(Number(event.target.value))}
            className="calc-slider mt-4 w-full"
            style={{ ["--progress" as string]: `${progress}%` }}
        />
    );
}

function ResultRow({
    term,
    value,
    accent = false,
}: {
    term: string;
    value: string;
    accent?: boolean;
}) {
    const Icon = term === "Property Price" ? Building2 : term.startsWith("Down Payment") ? Wallet : term === "Financing Amount" ? FileText : accent ? ChartNoAxesColumnIncreasing : Coins;
    return (
        <div className={cn("flex items-baseline justify-between gap-4 py-3.5", styles.resultRow, accent && styles.accentRow)}>
            <dt className="text-[0.8125rem] text-ivory/55"><Icon size={19} aria-hidden="true" />{term}</dt>
            <dd
                className={cn(
                    "text-right text-[0.9375rem] tabular-nums",
                    accent ? "font-semibold text-gold-300" : "text-ivory/90",
                )}
            >
                {value}
            </dd>
        </div>
    );
}
