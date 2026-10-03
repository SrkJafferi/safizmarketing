"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check, CircleCheck, Mail } from "lucide-react";
import styles from "./newsletter-card.module.css";

export function NewsletterCard() {
    const emailId = useId();
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = emailRef.current?.value.trim() || "";
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            emailRef.current?.focus();
            return;
        }
        setError("");
        // Demo only: no external request, persistence or claim of a live subscription.
        setSubmitted(true);
    }

    return (
        <aside className={styles.card} aria-labelledby={`${emailId}-heading`}>
            <div className={styles.top}><span className={styles.mailIcon}><Mail aria-hidden="true" /></span><p>Newsletter</p><span className={styles.preview}>Preview</span></div>
            <h2 id={`${emailId}-heading`} className={styles.heading}>Stay Updated With<br /><em>New Listings</em></h2>
            <p className={styles.description}>Get notified about newly listed properties, selected projects and market updates from SAFIZ MARKETING.</p>
            <ul className={styles.benefits}>{["New property listings", "Project updates", "Market insights"].map(text => <li key={text}><Check aria-hidden="true" size={14} />{text}</li>)}</ul>
            {submitted ? (
                <div className={styles.success} role="status">
                    <CircleCheck aria-hidden="true" size={26} />
                    <div><strong>Thank you. Your demo signup is complete.</strong><p>No subscription has been saved and no emails will be sent yet.</p><button type="button" onClick={() => setSubmitted(false)}>Try another email<ArrowRight size={14} /></button></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate className={styles.form}>
                    <label htmlFor={emailId}>Email address</label>
                    <div className={styles.inputRow}><Mail aria-hidden="true" size={18} /><input ref={emailRef} id={emailId} type="email" name="email" autoComplete="email" required maxLength={254} placeholder="Enter your email address" aria-invalid={!!error} aria-describedby={`${emailId}-note${error ? ` ${emailId}-error` : ""}`} onChange={() => { if (error) setError(""); }} /></div>
                    {error && <p id={`${emailId}-error`} className={styles.error} role="alert">{error}</p>}
                    <button type="submit" className={styles.subscribe}>Subscribe Now<ArrowRight size={18} /></button>
                </form>
            )}
            <p id={`${emailId}-note`} className={styles.note}>No spam. Only relevant property updates.<span>Demo signup only. Newsletter delivery is not active yet.</span></p>
        </aside>
    );
}
