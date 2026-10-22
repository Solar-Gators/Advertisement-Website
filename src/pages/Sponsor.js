import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import {get_platinum_sponsors, get_gold_sponsors, get_silver_sponsors, get_bronze_sponsors, get_valued_sponsors, get_patrons, get_solarpatrons} from "../content/assets/images/sponsor_logos/index";
import '../content/styles/Sponsors.scss'
import './Sponsors.css'

//Car 3 Sponsors - 2D Array [[logo, website link],...]
let platinum3 = get_platinum_sponsors("3");
let gold3 = get_gold_sponsors("3");
let silver3 = get_silver_sponsors("3");
let bronze3 = get_bronze_sponsors("3");
let valued3 = get_valued_sponsors("3");

//Car 4 Sponsors - 2D Array [[logo, website link],...]
let platinum4 = get_platinum_sponsors("4");
let gold4 = get_gold_sponsors("4");
let silver4 = get_silver_sponsors("4");
let bronze4 = get_bronze_sponsors("4");
let valued4 = get_valued_sponsors("4");
let patron4 = get_patrons("4");
let solarpatron4 = get_solarpatrons("4");

// The two cars. "tiers" are logo rows, "patrons" are lists of names.
const CARS = [
    {
        num: "4",
        name: "Flare",
        years: "2024 – present",
        tiers: [
            ["platinum", "Platinum Sponsors", platinum4],
            ["gold", "Gold Sponsors", gold4],
            ["silver", "Silver Sponsors", silver4],
            ["bronze", "Bronze Sponsors", bronze4],
            ["valued", "Valued Sponsors", valued4],
        ],
        patrons: [
            ["Thank you to our 2024-2025 Patrons", patron4],
            ["Name a Solar Cell Fall 2025 Fundraiser Patrons", solarpatron4],
        ],
    },
    {
        num: "3",
        name: "Sunrider",
        years: "2020 – 2024",
        tiers: [
            ["platinum", "Platinum Sponsors", platinum3],
            ["gold", "Gold Sponsors", gold3],
            ["silver", "Silver Sponsors", silver3],
            ["bronze", "Bronze Sponsors", bronze3],
            ["valued", "Valued Sponsors", valued3],
        ],
        patrons: [],
    },
];

// a readable name for a logo, taken from its website address
function siteName(link) {
    try {
        return new URL(link).hostname.replace(/^www\./, '');
    } catch (e) {
        return 'Sponsor';
    }
}

export default function Sponsor() {
    const [carNum, setCarNum] = useState("4");
    const car = CARS.find((c) => c.num === carNum) || CARS[0];

    const heroRef = useRef(null);

    // hero parallax and the top menu hiding while scrolling down
    useEffect(() => {
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        let frame = null;
        let lastY = window.scrollY;

        const update = () => {
            frame = null;
            const hero = heroRef.current;
            if (hero && !reduce) {
                const y = Math.min(window.scrollY, window.innerHeight * 1.2);
                hero.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
            }
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (y <= 10) {
                document.body.classList.remove('nav-hidden');
            } else if (Math.abs(y - lastY) > 2) {
                document.body.classList.toggle('nav-hidden', y > lastY);
            }
            lastY = y;
            if (frame === null) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
            document.body.classList.remove('nav-hidden');
        };
    }, []);

    return (
        <div className="sp-page">

            {/* ---------- Hero ---------- */}
            <header className="sp-hero" ref={heroRef}>
                {/* the same photo the Sponsors page header used before */}
                <div className="sp-hero__bg sponsor-header-img" />
                <div className="sp-hero__inner">
                    <p className="sp-hero__eyebrow">University of Florida</p>
                    <h1 className="sp-hero__title">Our Sponsors</h1>
                </div>
                <div className="sp-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- Thank you ---------- */}
            <section className="sp-intro">
                <p>
                    Our mission to show the potential of solar energy is made possible by our wonderful sponsors.
                    Their generosity and commitment to sustainability are instrumental in helping us
                    design, build and test our solar cars. Thank you.
                </p>
            </section>

            {/* ---------- Sponsors by car ---------- */}
            <section className="sp-sec">
                <div className="sp-wrap">

                    <div className="sp-cars" role="tablist" aria-label="Choose a car">
                        {CARS.map((c) => (
                            <button
                                key={c.num}
                                type="button"
                                role="tab"
                                aria-selected={c.num === carNum}
                                className={'sp-cars__btn' + (c.num === carNum ? ' is-on' : '')}
                                onClick={() => setCarNum(c.num)}
                            >
                                <span>Car {c.num}</span>
                                {c.name}
                            </button>
                        ))}
                    </div>

                    {/* re-created when the car changes, so it animates in */}
                    <div className="sp-car" key={car.num}>
                        <div className="sp-car__head">
                            <h2 className="sp-car__title">{car.name} Sponsors</h2>
                            <p className="sp-car__years">{car.years}</p>
                        </div>

                        {car.tiers.map(([tier, title, list]) => {
                            const logos = list || [];
                            if (!logos.length) return null;
                            return (
                                <div className="sp-tier" key={tier}>
                                    <h3 className={'sp-tier__title sp-tier__title--' + tier}>
                                        <span>{title}</span>
                                    </h3>
                                    <div className={'sp-logos sp-logos--' + tier}>
                                        {logos.map((s, i) => (
                                            <a
                                                key={tier + i}
                                                href={s[1]}
                                                className="sp-logo"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ '--i': i }}
                                            >
                                                <img
                                                    src={s[0]}
                                                    alt={siteName(s[1])}
                                                    loading="lazy"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {car.patrons.map(([title, names]) => {
                            const list = names || [];
                            if (!list.length) return null;
                            return (
                                <div className="sp-tier" key={title}>
                                    <h3 className="sp-tier__title sp-tier__title--patron">
                                        <span>{title}</span>
                                    </h3>
                                    <ul className="sp-patrons">
                                        {list.map((n, i) => (
                                            <li key={n + i}>{n}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------- Become a sponsor ---------- */}
            <section className="sp-cta">
                <h2 className="sp-cta__title">Interested in becoming a sponsor?</h2>
                <Link
                    className="sp-btn"
                    to="/donate"
                    onClick={() => { window.scroll(0, 0); }}
                >
                    Learn More
                </Link>
            </section>
        </div>
    )
}