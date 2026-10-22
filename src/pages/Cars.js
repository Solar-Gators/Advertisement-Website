import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cars.css';

import torch from "../content/assets/images/car_pics/Torch/torch_ontrack_clean.jpg";
import sunrider from "../content/assets/images/car_pics/sunrider/2021/car3.jpg";
import cielo from "../content/assets/images/car_pics/Cielo/IMG_9011_crop.JPG";
import flare from "../content/assets/images/car_pics/Flare/SG25_Pit_Exit.jpg";

// Newest car first. "n" is the car number (Torch was our first).
const CARS = [
    {
        name: "Flare",
        n: 4,
        year1: "2025",
        year2: "2026",
        img: flare,
        blurb: "Our fourth generation solar car began development in the Spring of 2023. Throughout the design process, our experience at the 2024 American Solar Challenge greatly drove our desire for making a car that could compete with the very best solar car teams. Flare was manufactured throughout the 2024-2025 school year almost entirely by students at the University of Florida. Boasting a brand new aerobody, monocoque chassis, double wishbone front suspension and a custom battery management system, Flare entered the solar racing scene at the 2025 Formula Sun Grand Prix. Flare had the best debut of any Solar Gators car, covering ~470 miles its first ever race. Flare set the fastest lap at the track in 2025, averaging 43.77 miles per hours around the 3.15 mile track at the National Corvette Museum track in Bowling Green, Kentucky. In 2026, Flare completed the full route from Minneapolis, Minnesota to Amarillo, Texas, finishing the American Solar Challenge as one of only 11 cars to do so.",
        facts: [
            { value: "~470 mi", label: "First race, 2025 Formula Sun Grand Prix" },
            { value: "43.77 mph", label: "Fastest lap of 2025" },
            { value: "1 of 11", label: "Cars to finish the 2026 American Solar Challenge" },
        ],
    },
    {
        name: "Sunrider",
        n: 3,
        year1: "2020",
        year2: "2024",
        img: sunrider,
        blurb: "Design for our third car, Sunrider, commenced in 2019. However, pandemic restrictions brought progress to a halt with limited in-person meetings and significant supply chain delays. Through this difficult time, the team banded together and worked relentlessly to complete Sunrider. Making its debut in the 2022 Formula Sun Grand Prix (FSGP), Sunrider set new team records; accumulating a total distance of over 700 miles and winning the 2023 FSGP in its second competition. In 2024, Sunrider embarked on its third and final race, competing in the Electrek Formula Sun Grand Prix. It covered ~470 miles and successfully qualified for the American Solar Challenge. Sunrider completed nearly 1500 miles of the 1562.2-mile base route, becoming the first car in its class to reach the finish line, covering 198.3 miles in under 5.5 hours—10 minutes faster than the overall first-place team. Sunrider’s final race also led us to victory in the Altair Challenge, where we achieved an 81% weight reduction and won the $10,000 grand prize.",
        facts: [
            { value: "1st", label: "2023 Formula Sun Grand Prix" },
            { value: "~1,500 mi", label: "Of the 1,562.2-mile American Solar Challenge route" },
            { value: "81%", label: "Weight reduction in the Altair Challenge, a $10,000 prize" },
        ],
    },
    {
        name: "Cielo",
        n: 2,
        year1: "2018",
        year2: "2020",
        img: cielo,
        blurb: "We competed with our second car Cielo in the 2018 and 2019 Formula Sun Grand Prix (FSGP). Cielo required an overhaul of almost all the existing car’s electrical and mechanical systems, and the changes paid off. During the year, we designed and manufactured a brand-new carbon fiber aero-body, making the car much lighter and quicker. In addition, new mechanical, electrical, and solar systems were designed and integrated, resulting in a more reliable and competitive car. Cielo drove 23 miles on the final race day in 2018, a significant improvement from the previous year, and almost 200 miles over the course of the final two race days in 2019.",
        facts: [
            { value: "23 mi", label: "Driven on the final race day of 2018" },
            { value: "~200 mi", label: "Over the final two race days of 2019" },
        ],
    },
    {
        name: "Torch",
        n: 1,
        year1: "2016",
        year2: "2018",
        img: torch,
        blurb: "In 2016, UF Solar Gators was founded. An earlier team had disbanded before completing their car, but left their chassis behind, and we built our first car Torch from the existing chassis. Torch was built over the course of the summer in 2016 and became Solar Gators’ first entry into the Formula Sun Grand Prix. Torch passed scrutineering and went on to complete the team’s first lap; making Solar Gators the first Florida team to race since 1989!",
        facts: [
            { value: "1st", label: "Florida team to race since 1989" },
            { value: "1st lap", label: "Completed by Solar Gators after passing scrutineering" },
        ],
    },
];

// splits a long description into two paragraphs (by sentences)
function paragraphs(text) {
    const s = text.match(/.+?(?:[.!?](?=\s+[A-Z"\u201C]|$))/gs);
    if (!s || s.length < 4) return [text];
    const cut = Math.ceil(s.length / 2);
    return [s.slice(0, cut).join('').trim(), s.slice(cut).join('').trim()];
}

export default function Cars() {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
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
        page.querySelectorAll('.cars-reveal').forEach((node) => {
            io.observe(node);
        });
        setReady(true);

        return () => io.disconnect();
    }, []);

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

    const jump = (name) => (e) => {
        e.preventDefault();
        const el = document.getElementById(name);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={pageRef} className={'cars-page' + (ready ? ' js-reveal' : '')}>

            {/* ---------- Hero ---------- */}
            <header className="cars-hero" ref={heroRef}>
                <div
                    className="cars-hero__bg"
                    style={{ backgroundImage: 'url(' + flare + ')' }}
                />
                <div className="cars-hero__inner">
                    <p className="cars-hero__eyebrow">University of Florida</p>
                    <h1 className="cars-hero__title">Our Cars</h1>
                    <p className="cars-hero__sub">
                        Designed and built by students
                    </p>
                    <div className="cars-hero__jump" role="navigation" aria-label="Jump to a car">
                        {CARS.map((c) => (
                            <a
                                key={c.name}
                                href={'#' + c.name}
                                onClick={jump(c.name)}
                            >
                                <span>{String(c.n).padStart(2, '0')}</span>
                                {c.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="cars-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- One section per car ---------- */}
            {CARS.map((c, i) => (
                <section
                    className={'cars-sec' + (i % 2 === 1 ? ' cars-sec--alt' : '')}
                    id={c.name}
                    key={c.name}
                >
                    <div className={'cars-split' + (i % 2 === 1 ? ' cars-split--flip' : '')}>
                        <div className="cars-photo cars-reveal">
                            <img
                                src={c.img}
                                alt={c.name + ', Solar Gators car ' + c.n}
                                loading="lazy"
                            />
                            <span className="cars-photo__tag">
                                Car {String(c.n).padStart(2, '0')}
                            </span>
                        </div>

                        <div className="cars-split__text cars-reveal">
                            <p className="cars-years">{c.year1} &ndash; {c.year2}</p>
                            <h2 className="cars-h2">{c.name}</h2>
                            {paragraphs(c.blurb).map((t, k) => (
                                <p className="cars-blurb" key={k}>{t}</p>
                            ))}
                            <div className="cars-facts" style={{ '--n': c.facts.length }}>
                                {c.facts.map((f) => (
                                    <div className="cars-facts__item" key={f.value + f.label}>
                                        <span className="cars-facts__value">{f.value}</span>
                                        <span className="cars-facts__label">{f.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* ---------- Sponsors ---------- */}
            <section className="cars-sponsor cars-reveal">
                <h2 className="cars-h2 cars-h2--center">Our Sponsors</h2>
                <p>
                    Throughout our history, our sponsors have been at the center of everything we accomplish. As we continue to grow, we hope that you will join us in our mission to develop state of the art technologies and compete for championships.
                </p>
                <Link
                    className="cars-btn"
                    to="/donate"
                    onClick={() => { window.scroll(0, 0); }}
                >
                    Learn More
                </Link>
            </section>
        </div>
    )
}