import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { contact, site } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Terms & Conditions",
    description:
        "The terms that govern your use of the SAFIZ MARKETING website and the property information published on it.",
    path: "/terms",
});

/**
 * Terms & Conditions.
 *
 * Every clause describes something true of the site as built: no prices are
 * published, no availability is guaranteed, the calculator is an estimate, and
 * placeholder imagery is not the actual property. No legal entity name,
 * registration number or jurisdiction claim has been invented.
 */

const sections = [
    {
        id: "website-information",
        heading: "Information on this website",
        body: [
            "Project information, imagery, floor plans and price schedules on this platform are based on material supplied by the respective developer or property owner. Published schedule rows do not establish current availability. Information and prices may change; contact SAFIZ MARKETING for current details.",
            "Where a figure or detail has not been confirmed we publish a placeholder — “Price on Request”, “Exact Location on Request”, “On request” — rather than an estimate. A placeholder is not an offer, and it is not a representation that a value exists.",
            "Nothing on this website constitutes an offer capable of acceptance, a reservation, or a guarantee that any property remains available.",
        ],
    },
    {
        id: "representative-imagery",
        heading: "Photography and imagery",
        body: [
            "Project imagery and floor plans are taken from the respective developer brochures and may be conceptual or illustrative. Individual unit photography has not been supplied. Editorial landscape imagery provides context and does not depict a listed unit.",
            "Confirm current project specifications, dimensions and the plan applicable to a specific unit before relying on the imagery.",
        ],
    },
    {
        id: "calculator",
        heading: "The payment calculator",
        body: [
            "The property payment calculator produces an indicative estimate only, using the standard amortising-payment formula applied to the inputs you provide.",
            "It does not check eligibility, does not apply the rate or terms of any bank or financial institution, and does not include processing fees, taxes, insurance, valuation costs or transfer costs.",
            "Actual financing terms, eligibility, rates and payments depend entirely on the relevant financial institution. We do not provide financial advice, and nothing produced by the calculator should be relied on as a quotation.",
        ],
    },
    {
        id: "enquiries",
        heading: "Enquiries",
        body: [
            "The enquiry and listing forms prepare a WhatsApp message in your browser. Send that message in WhatsApp to complete your enquiry. The website does not save form details to a database, reserve a unit, approve a listing or automatically publish a property.",
            "When you contact us, the way your information is handled is described in our Privacy Policy.",
        ],
    },
    {
        id: "no-professional-advice",
        heading: "No professional advice",
        body: [
            "Content on this website is general property information. It is not legal, tax, financial or investment advice, and it should not be treated as a substitute for advice from a qualified professional acting on your circumstances.",
            "We do not make or imply any guarantee about the future value of any property, its rental performance, or returns of any kind.",
        ],
    },
    {
        id: "third-party",
        heading: "Third-party services and links",
        body: [
            "Links to WhatsApp and to your telephone dialler hand you over to services we do not operate and do not control. Your use of those services is governed by their own terms.",
            "Any external website linked from this site is provided for convenience only, and we are not responsible for its content.",
        ],
    },
    {
        id: "intellectual-property",
        heading: "Brand and content",
        body: [
            "The SAFIZ MARKETING name, logo and the design of this website belong to their respective owners. You may not copy or reuse them without permission.",
        ],
    },
    {
        id: "contact",
        heading: "Questions about these terms",
        body: [
            "If anything here is unclear, contact us before relying on it. We would rather answer the question than have you work from an assumption.",
        ],
    },
] as const;

export default function TermsPage() {
    return (
        <>
            <PageHeader
                eyebrow="Legal"
                title="Terms & Conditions"
                lead="The basis on which this website and the property information on it are provided."
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Terms & Conditions" },
                ]}
            />

            <section className="bg-ivory py-16 lg:py-20">
                <Container size="narrow">
                    <div className="rounded-[3px] border-l-2 border-gold-400 bg-white px-5 py-4 text-[0.875rem] leading-relaxed text-charcoal">
                        <strong className="font-semibold">Please note:</strong>{" "}
                        these terms are a good-faith draft describing how this
                        website actually behaves. They are not legal advice and
                        should be reviewed by the client — and, where
                        appropriate, by a qualified adviser — before the site is
                        used commercially.
                    </div>

                    <div className="mt-12 flex flex-col gap-11">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-28"
                            >
                                <h2 className="font-display text-[1.5rem] leading-snug text-navy-950">
                                    {section.heading}
                                </h2>
                                <div className="mt-4 flex flex-col gap-4 text-[1rem] leading-relaxed text-muted">
                                    {section.body.map((paragraph) => (
                                        <p key={paragraph.slice(0, 32)}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <p className="border-t border-navy-900/10 pt-8 text-[0.9375rem] leading-relaxed text-muted">
                            {site.name} — {site.division}, {site.location}.
                            Telephone or WhatsApp:{" "}
                            <a
                                href={contact.phoneHref}
                                className="font-medium text-navy-950 underline decoration-gold-400 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-gold-600"
                            >
                                {contact.phoneDisplay}
                            </a>
                            .
                        </p>
                    </div>
                </Container>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLdScript(
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Terms & Conditions", path: "/terms" },
                    ]),
                )}
            />
        </>
    );
}
