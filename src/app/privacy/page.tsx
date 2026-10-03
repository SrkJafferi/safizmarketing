import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { contact, site } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Privacy Policy",
    description:
        "How SAFIZ MARKETING enquiry forms prepare WhatsApp messages and handle information you choose to share.",
    path: "/privacy",
});

/**
 * Privacy Policy.
 *
 * Written to describe what the site actually does today: a demonstration-mode
 * form that does not persist anything, plus external WhatsApp and phone links.
 * It deliberately avoids legal-entity details, registration numbers or
 * addresses that the client has not supplied. This must be reviewed by the
 * client (and, ideally, a qualified adviser) before launch.
 */

const sections = [
    {
        id: "what-we-collect",
        heading: "What we collect",
        body: [
            "The enquiry and listing forms prepare a WhatsApp message in your browser using your name, phone number, property or project, location and message. Listing enquiries also include your role. The website does not save these form details to a server or database.",
            "If you contact us through WhatsApp or by phone instead, we receive whatever you choose to share in that conversation, along with the contact details associated with the number you use.",
            "This website does not currently set advertising cookies and does not run third-party analytics or tracking scripts.",
        ],
    },
    {
        id: "how-we-use-it",
        heading: "How we use it",
        body: [
            "We use your details for one purpose: to respond to your property enquiry and to continue that conversation with you — shortlisting properties, arranging visits and answering questions.",
            "We do not sell your information, and we do not share it with third parties for their own marketing.",
        ],
    },
    {
        id: "whatsapp",
        heading: "WhatsApp and telephone",
        body: [
            "Every WhatsApp link on this site opens the WhatsApp application or web client directly. Using it means your message and number are handled under WhatsApp's own terms and privacy policy, which we do not control and which we recommend you review separately.",
            "Calling the number published on this site connects you to our telephone line through your network provider.",
        ],
    },
    {
        id: "retention",
        heading: "How long we keep it",
        body: [
            "We keep enquiry details for as long as they are needed to deal with your enquiry and any resulting transaction, and afterwards only for as long as we need to meet our own record-keeping requirements.",
            "You can ask us to delete your enquiry details at any time by contacting us using the details below.",
        ],
    },
    {
        id: "your-choices",
        heading: "Your choices",
        body: [
            "You can ask what information we hold about you, ask us to correct it, or ask us to remove it. Contact us on the number below and we will deal with the request.",
            "If you would prefer we contact you by one channel only, tell us and we will note it on your enquiry.",
        ],
    },
    {
        id: "changes",
        heading: "Changes to this policy",
        body: [
            "If the way this website handles information changes — for example when a live enquiry-handling backend, email service or analytics provider is connected — this page will be updated first so that it continues to describe what actually happens.",
        ],
    },
] as const;

export default function PrivacyPage() {
    return (
        <>
            <PageHeader
                eyebrow="Legal"
                title="Privacy Policy"
                lead="A plain description of what this website does with the information you share — and what it does not do."
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" },
                ]}
            />

            <section className="bg-ivory py-16 lg:py-20">
                <Container size="narrow">
                    <div className="rounded-[3px] border-l-2 border-gold-400 bg-white px-5 py-4 text-[0.875rem] leading-relaxed text-charcoal">
                        <strong className="font-semibold">
                            Enquiry forms:
                        </strong>{" "}
                        your details are used in your browser to prepare a
                        WhatsApp message. We receive your enquiry when you send
                        that message in WhatsApp. The website has no form
                        database or automatic listing approval.
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

                        <div id="contact" className="scroll-mt-28">
                            <h2 className="font-display text-[1.5rem] leading-snug text-navy-950">
                                Contacting us about privacy
                            </h2>
                            <div className="mt-4 flex flex-col gap-4 text-[1rem] leading-relaxed text-muted">
                                <p>
                                    {site.name} — {site.division},{" "}
                                    {site.location}.
                                </p>
                                <p>
                                    Telephone or WhatsApp:{" "}
                                    <a
                                        href={contact.phoneHref}
                                        className="font-medium text-navy-950 underline decoration-gold-400 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-gold-600"
                                    >
                                        {contact.phoneDisplay}
                                    </a>
                                </p>
                                <p className="text-[0.875rem] text-muted/80">
                                    No postal address or email address is
                                    published here yet because none has been
                                    supplied. Those details will be added before
                                    launch.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLdScript(
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Privacy Policy", path: "/privacy" },
                    ]),
                )}
            />
        </>
    );
}
