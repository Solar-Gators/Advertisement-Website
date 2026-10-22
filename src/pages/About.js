import React, { useEffect, useRef, useState } from 'react';
import CarsSection from "../components/CarsSection/CarsSection";
import './About.css';

import img1 from '../content/assets/images/car_pics/Flare/SG25_Top_Open.JPG';
import img2 from '../content/assets/images/car_pics/Flare/SG25_Installing_Top_Body.JPG';
import img3 from '../content/assets/images/people/team25/SG25_Pit_Lineup.JPG';

// ---------- text ----------
const P1 = "Solar Gators is a fully student-run engineering design team at " +
    "the University of Florida. We are passionate about driving innovative and sustainable " +
    "technology in the automotive industry. We design, build, and race solar-powered cars to showcase " +
    "the potential of solar energy and inspire the next generation of engineers and innovators. " +
    "Each year we proudly represent the Sunshine State in the Formula Sun Grand Prix (FSGP).";

const P2A = "With a decade of innovation behind us and a first place finish at the Formula Sun Grand Prix under our belt, " +
    "we've solidified our place in the solar car world. Our journey proves that a team run on " +
    "commitment, creativity, and innovation can overcome any obstacle.";

const P2B = "As a team of motivated engineers, we work tirelessly to achieve our goals. " +
    "From the initial design phase to the final race day, we're committed to excellence " +
    "in everything we do. Even when facing the toughest challenges, our team stays motivated " +
    "and dedicated to keeping things on track.";

const P3 = "Inclusivity is one of our founding principles. We believe that everyone deserves " +
    "a chance to learn and grow, regardless of their background or experience. That's " +
    "why we welcome new members with open arms, and provide them with the tools and " +
    "resources they need to become better engineers and better people. Join us as we " +
    "push the limits of what's possible in solar racing and beyond.";

const MISSION = [
    { verb: 'Accelerate', rest: "the world's transition to sustainable energy" },
    { verb: 'Develop', rest: 'gator engineers through hands-on design and manufacturing experience' },
    { verb: 'Inspire', rest: 'students to explore their interests within STEM and become the next generation of innovators shaping the future' },
    { verb: 'Build', rest: 'awareness within our community about the transformative potential of solar energy' },
];

// Track record, oldest first so the timeline reads top to bottom
const RECORD = [
    {
        year: '2016',
        text: 'Began competing in the Formula Sun Grand Prix. We have raced there seven times since.',
    },
    {
        year: '2023',
        text: 'Won 1st place at the Formula Sun Grand Prix after completing 707.5 miles on track.',
    },
    {
        year: '2024',
        text: 'Qualified for our first American Solar Challenge, and won the Altair Challenge and its $10,000 grand prize.',
    },
    {
        year: '2025',
        text: 'Set the fastest lap at the Formula Sun Grand Prix, and won 1st place in the Mathworks presentation competition.',
    },
    {
        year: '2026',
        text: 'Flare set out from Minneapolis, Minnesota and crossed the finish line in Amarillo, Texas as one of only 11 cars to complete the American Solar Challenge.',
    },
];

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// a photo in a frame with corner brackets and a light sweep on hover
function Photo({ src, alt }) {
    return (
        <div className="about-photo about-reveal">
            <img src={src} alt={alt} loading="lazy" />
        </div>
    );
}

export default function About() {
    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;

    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const tlRef = useRef(null);
    const [ready, setReady] = useState(false);

    // sections fade in as they scroll into view
    useEffect(() => {
        const page = pageRef.current;
        if (!page) return undefined;

        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (reduce || !('IntersectionObserver' in window)) return undefined;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        page.querySelectorAll('.about-reveal').forEach((node) => {
            io.observe(node);
        });
        setReady(true);

        return () => io.disconnect();
    }, []);

    // scroll effects: hero parallax, the timeline that fills as you
    // scroll, and the top menu hiding while scrolling down
    useEffect(() => {
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        let frame = null;
        let lastY = window.scrollY;

        const update = () => {
            frame = null;
            const vh = window.innerHeight;

            const hero = heroRef.current;
            if (hero && !reduce) {
                const y = Math.min(window.scrollY, vh * 1.2);
                hero.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
            }

            const tl = tlRef.current;
            if (tl) {
                const rect = tl.getBoundingClientRect();
                const line = vh * 0.62;
                const fill = reduce
                    ? rect.height
                    : clamp(line - rect.top, 0, rect.height);
                tl.style.setProperty('--fill', fill.toFixed(0) + 'px');
                tl.querySelectorAll('.about-tl__row').forEach((row) => {
                    const r = row.getBoundingClientRect();
                    row.classList.toggle(
                        'is-active',
                        reduce || r.top + 14 < line
                    );
                });
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
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
            document.body.classList.remove('nav-hidden');
        };
    }, []);

    // a soft light follows the mouse over each mission card
    const spotlight = (e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', (e.clientX - box.left) + 'px');
        e.currentTarget.style.setProperty('--my', (e.clientY - box.top) + 'px');
    };

    return (
        <div ref={pageRef} className={'about-page' + (ready ? ' js-reveal' : '')}>

            {/* ---------- Hero ---------- */}
            <header className="about-hero" ref={heroRef}>
                <div
                    className="about-hero__bg"
                    style={{ backgroundImage: 'url(' + img1 + ')' }}
                />
                <div className="about-hero__inner">
                    <p className="about-hero__eyebrow">University of Florida</p>
                    <h1 className="about-hero__title">About Us</h1>
                    <p className="about-hero__sub">
                        A fully student-run engineering design team
                    </p>
                </div>
                <div className="about-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- Who we are ---------- */}
            <section className="about-sec">
                <div className="about-split">
                    <div className="about-split__text about-reveal">
                        <h2 className="about-h2">Who We Are</h2>
                        <p className="about-lead">{P1}</p>
                    </div>
                    <Photo src={img2} alt="Solar Gators members installing the top body of the car" />
                </div>
            </section>

            {/* ---------- Mission ---------- */}
            <section className="about-sec about-sec--alt">
                <div className="about-wrap">
                    <h2 className="about-h2 about-reveal">Our Mission</h2>
                    <div className="about-mission">
                        {MISSION.map((m, i) => (
                            <div
                                className="about-mission__card about-reveal"
                                key={m.verb}
                                style={{ '--d': (i * 90) + 'ms' }}
                                onMouseMove={spotlight}
                            >
                                <span className="about-mission__num">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="about-mission__verb">{m.verb}</span>
                                <span className="about-mission__rest">{m.rest}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Journey and track record ---------- */}
            <section className="about-sec">
                <div className="about-wrap">
                    <h2 className="about-h2 about-reveal">Our Journey</h2>
                    <div className="about-journey about-reveal">
                        <p>{P2A}</p>
                        <p>{P2B}</p>
                    </div>

                    <h3 className="about-h3 about-reveal">Our Track Record</h3>
                    <ol className="about-tl" ref={tlRef}>
                        <li className="about-tl__fill" aria-hidden="true" />
                        {RECORD.map((r) => (
                            <li className="about-tl__row" key={r.year}>
                                <span className="about-tl__node" aria-hidden="true" />
                                <span className="about-tl__year">{r.year}</span>
                                <span className="about-tl__text">{r.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ---------- Inclusivity ---------- */}
            <section className="about-sec about-sec--alt">
                <div className="about-split about-split--flip">
                    <div className="about-split__text about-reveal">
                        <h2 className="about-h2">Our Values</h2>
                        <p className="about-lead">{P3}</p>
                    </div>
                    <Photo src={img3} alt="The Solar Gators team lined up in the pit" />
                </div>
            </section>

            {/* ---------- Cars ---------- */}
            <div className="about-cars">
                <CarsSection mobileView={mobileView}/>
            </div>
        </div>
    )
}