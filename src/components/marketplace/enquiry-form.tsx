"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
export function EnquiryForm({
    onboarding = false,
    defaultProperty = "",
}: {
    onboarding?: boolean;
    defaultProperty?: string;
}) {
    const [messageLink, setMessageLink] = useState<string | null>(null);
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const value = (key: string) => String(values.get(key) ?? "").trim();
        const message = [
            onboarding
                ? "Hello SAFIZ MARKETING, I would like to list my property/project on SAFIZ MARKETING."
                : "Hello SAFIZ MARKETING, I would like help with a property enquiry.",
            `Name: ${value("name")}`,
            `Phone: ${value("phone")}`,
            onboarding ? `I am a: ${value("role")}` : null,
            `Property / project: ${value("property")}`,
            `Location: ${value("location")}`,
            value("message"),
        ]
            .filter(Boolean)
            .join("\n");
        const href = whatsappLink(message);
        setMessageLink(href);
        window.open(href, "_blank", "noopener,noreferrer");
    }
    return (
        <form className="enquiry-form" onSubmit={submit}>
            <h2>
                {onboarding
                    ? "Start a listing enquiry."
                    : "Tell us what you have in mind."}
            </h2>
            <div className="enquiry-fields">
                <label>
                    Your name *
                    <input
                        required
                        name="name"
                        autoComplete="name"
                        maxLength={100}
                    />
                </label>
                <label>
                    Phone number *
                    <input
                        required
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={40}
                    />
                </label>
                {onboarding && (
                    <label className="full-field">
                        You are a *
                        <select name="role" required defaultValue="">
                            <option disabled value="">
                                Choose your role
                            </option>
                            <option>Property owner</option>
                            <option>Developer</option>
                            <option>Authorised representative</option>
                        </select>
                    </label>
                )}
                <label>
                    Property / project{onboarding ? " *" : ""}
                    <input
                        required={onboarding}
                        name="property"
                        defaultValue={defaultProperty}
                        maxLength={150}
                        placeholder={
                            onboarding
                                ? "Property or development name"
                                : "Unit, project or property type"
                        }
                    />
                </label>
                <label>
                    Location{onboarding ? " *" : ""}
                    <input
                        required={onboarding}
                        name="location"
                        placeholder="City / area"
                        maxLength={150}
                    />
                </label>
                <label className="full-field">
                    A few details *
                    <textarea
                        required
                        name="message"
                        maxLength={2000}
                        placeholder={
                            onboarding
                                ? "Property type, sizes and the material you can share…"
                                : "Your budget, questions or preferred property…"
                        }
                    />
                </label>
            </div>
            <button type="submit" className="market-button">
                <MessageCircle size={17} /> Continue on WhatsApp ↗
            </button>
            <p>
                Your details open as a message to SAFIZ MARKETING. Send it in
                WhatsApp to complete your enquiry.
                {onboarding
                    ? " Listings are reviewed before publication; this enquiry does not approve or publish a listing."
                    : ""}
            </p>
            {messageLink && (
                <p className="form-status" role="status">
                    Your WhatsApp message is ready.{" "}
                    <a
                        href={messageLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Open WhatsApp
                    </a>{" "}
                    and send it to complete your enquiry.
                </p>
            )}
        </form>
    );
}
