const phrases = [
    { text: "Exceptional Properties.", emphasis: false },
    { text: "Trusted Connections.", emphasis: true },
    { text: "Curated Opportunities.", emphasis: false },
    { text: "Islamabad & Beyond.", emphasis: true },
    { text: "Property, Made Personal.", emphasis: false },
];

export function PropertyMarquee() {
    return (
        <section
            className="rh-property-marquee"
            aria-label="Property marketplace highlights"
        >
            <div className="rh-marquee-track">
                {[false, true].map((cloned) => (
                    <ul
                        className="rh-marquee-group"
                        key={String(cloned)}
                        aria-hidden={cloned ? true : undefined}
                    >
                        {phrases.map(({ text, emphasis }) => (
                            <li className="rh-marquee-item" key={text}>
                                {emphasis ? (
                                    <em>{text}</em>
                                ) : (
                                    <span>{text}</span>
                                )}
                                <span
                                    className="rh-marquee-separator"
                                    aria-hidden="true"
                                >
                                    ✦
                                </span>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </section>
    );
}
