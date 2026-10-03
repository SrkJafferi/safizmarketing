import { DirectoryHeader } from "@/components/marketplace/common";
import { EnquiryForm } from "@/components/marketplace/enquiry-form";
import { ownerWhatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
    title: "List Your Property",
    description:
        "Start a property owner or developer listing enquiry with SAFIZ MARKETING. A professional property discovery and enquiry channel.",
    path: "/list-your-property",
});
export default function ListYourPropertyPage() {
    return (
        <>
            <DirectoryHeader
                eyebrow="For property owners & developers"
                title="Your property. Our platform."
                copy="A professional place for your property or project to be discovered. Start an enquiry and share the details with SAFIZ MARKETING."
            />
            <section className="market-section">
                <div className="market-container onboarding-grid">
                    <div className="onboarding-copy">
                        <h2 className="market-heading">
                            Make the right connection.
                        </h2>
                        <p>
                            SAFIZ MARKETING connects buyers with property owners
                            and developers through a clear listing and enquiry
                            experience.
                        </p>
                        <ol className="onboarding-steps">
                            <li>
                                <span>01</span>
                                <div>
                                    <strong>Introduce your property</strong>
                                    <p>
                                        Tell us the city, property type and your
                                        role.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <span>02</span>
                                <div>
                                    <strong>Share source material</strong>
                                    <p>
                                        Provide current details, pricing,
                                        images, plans and relevant documents.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <span>03</span>
                                <div>
                                    <strong>Review before publication</strong>
                                    <p>
                                        SAFIZ MARKETING reviews the enquiry and
                                        discusses the listing requirements with
                                        you.
                                    </p>
                                </div>
                            </li>
                        </ol>
                        <a
                            href={ownerWhatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link mt-8"
                        >
                            Start directly on WhatsApp ↗
                        </a>
                    </div>
                    <EnquiryForm onboarding />
                </div>
            </section>
        </>
    );
}
