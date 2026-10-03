"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LockKeyhole, MessageCircle } from "lucide-react";
import { HomeSearchField } from "./home-search-field";
import { whatsappLink } from "@/lib/whatsapp";
import styles from "@/app/list-your-property/listing.module.css";

const propertyTypes = [
    { value: "", label: "Select property type" },
    ...["Residential", "Commercial", "Plots & Land", "Projects", "Other"].map(value => ({ value, label: value })),
];

export function ListingEnquiryForm() {
    const [propertyType, setPropertyType] = useState("");
    const [error, setError] = useState("");
    const [messageLink, setMessageLink] = useState("");

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!propertyType) {
            setError("Please select a property type.");
            event.currentTarget.querySelector<HTMLButtonElement>('[role="combobox"]')?.focus();
            return;
        }
        const fields = new FormData(event.currentTarget);
        const read = (name: string) => String(fields.get(name) ?? "").trim();
        const href = whatsappLink([
            "Hello SAFIZ MARKETING, I would like to start a property listing enquiry.",
            `Name: ${read("name")}`, `Email: ${read("email")}`, `Phone: ${read("phone")}`,
            `Property type: ${propertyType}`, `Location: ${read("location")}`,
            `Property title: ${read("property")}`, `Additional details: ${read("message") || "Not provided"}`,
        ].join("\n"));
        setError("");
        setMessageLink(href);
        window.open(href, "_blank", "noopener,noreferrer");
    }

    return <form id="listing-enquiry" className={styles.form} onSubmit={submit} aria-labelledby="listing-form-heading">
        <p className={styles.eyebrow}>List your property</p>
        <h2 id="listing-form-heading">Start a listing enquiry.</h2>
        <p className={styles.formIntro}>Fill in the details below and start a conversation with our team.</p>
        <div className={styles.fields}>
            <label>Your name *<input name="name" autoComplete="name" placeholder="Enter your name" required maxLength={100} /></label>
            <label>Your email address *<input name="email" type="email" autoComplete="email" placeholder="Enter your email" required maxLength={160} /></label>
            <label className={styles.fullField}>Your phone number *<input name="phone" type="tel" autoComplete="tel" placeholder="e.g. +92 315 1282583" required maxLength={30} /></label>
            <HomeSearchField name="type" label="Property type *" className={styles.selectField} options={propertyTypes} value={propertyType} onValueChange={value => { setPropertyType(value); setError(""); }} />
            <label>Location *<input name="location" autoComplete="address-level2" placeholder="Enter location" required maxLength={160} /></label>
            <label className={styles.fullField}>Property title *<input name="property" placeholder="e.g. 2 Bed Apartment in Bahria Enclave" required maxLength={200} /></label>
            <label className={styles.fullField}>Additional details<textarea name="message" placeholder="Share key details about your property (size, price, features, etc.)." rows={3} maxLength={2000} /></label>
        </div>
        {error && <p className={styles.formError} role="alert">{error}</p>}
        <button className={styles.sendButton} type="submit"><MessageCircle size={17} aria-hidden="true" />Send Listing Enquiry<ArrowRight size={17} aria-hidden="true" /></button>
        <p className={styles.formNote}><LockKeyhole size={13} aria-hidden="true" />Your details open in WhatsApp. Send the message to complete your enquiry. Listings are reviewed before publication.</p>
        {messageLink && <p className={styles.formStatus} role="status">Your enquiry is ready. <a href={messageLink} target="_blank" rel="noopener noreferrer">Open WhatsApp to send it <ArrowRight size={13} aria-hidden="true" /></a></p>}
    </form>;
}
