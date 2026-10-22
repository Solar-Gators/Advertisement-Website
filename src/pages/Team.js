import React, { useEffect, useRef, useState } from "react";
import {get_eboard, get_pms, get_mech, get_elec, get_comp_team, get_webdev, get_ces} from "../content/assets/images/officers/index";
import "./Team.css";

//2026-27 Officers: (Names, Positions, Headshots)
let executive_board26= get_eboard("2026");
let pms26 = get_pms("2026");
let ces26 = get_ces("2026")
let mech_aero26 = get_mech("2026");
let electrical26 =  get_elec("2026");

//2025-26 Officers: (Names, Positions, Headshots)
let executive_board25= get_eboard("2025");
let pms25 = get_pms("2025");
let ces25 = get_ces("2025")
let mech_aero25 = get_mech("2025");
let electrical25 =  get_elec("2025");

//2024-25 Officers: (Names, Positions, Headshots)
let executive_board24= get_eboard("2024");
let pms24 = get_pms("2024");
let ces24 = get_ces("2024")
let mech_aero24 = get_mech("2024");
let electrical24 =  get_elec("2024");

//2023-24 Officers: (Names, Positions, Headshot)
let executive_board23 = get_eboard("2023");
let pms23 = get_pms("2023");
let mech_aero23 = get_mech("2023");
let electrical23 =  get_elec("2023");
let webdev23 = get_webdev("2023");

//2022-23 Officers: (Names, Positions, Headshot)
let executive_board22 = get_eboard("2022");
let pms22 = get_pms("2022");
let mech_aero22 = get_mech("2022");
let electrical22 =  get_elec("2022");
let competition_team22 = get_comp_team("2022");

//2021-22 Officers
let executive_board21 = get_eboard("2021");
let mech_aero21 = get_mech("2021");
let electrical21 = get_elec("2021");
let competition_team21 = get_comp_team("2021");

//2020-21 Officers
let executive_board20 = get_eboard("2020");

//2019-20 Officers
let executive_board19 = get_eboard("2019");

// Every academic year: its label and what is shown for it.
// "groups" are rows of officers, "comp" is the competition team list.
const YEARS = [
    { key: "202627", label: "2026 – 2027", groups: [
        ["Executive Board", executive_board26],
        ["Chief Engineers", ces26],
        ["Project Managers", pms26],
        ["Mechanical and Aerobody", mech_aero26],
        ["Electrical", electrical26],
    ] },
    { key: "202526", label: "2025 – 2026", groups: [
        ["Executive Board", executive_board25],
        ["Chief Engineers", ces25],
        ["Project Managers", pms25],
        ["Mechanical and Aerobody", mech_aero25],
        ["Electrical", electrical25],
    ] },
    { key: "202425", label: "2024 – 2025", groups: [
        ["Executive Board", executive_board24],
        ["Chief Engineers", ces24],
        ["Project Managers", pms24],
        ["Mechanical and Aerobody", mech_aero24],
        ["Electrical", electrical24],
    ] },
    { key: "202324", label: "2023 – 2024", groups: [
        ["Executive Board", executive_board23],
        ["Project Managers", pms23],
        ["Mechanical and Aerobody", mech_aero23],
        ["Electrical", electrical23],
        ["Web Development", webdev23],
    ] },
    { key: "202223", label: "2022 – 2023", groups: [
        ["Executive Board", executive_board22],
        ["Project Managers", pms22],
        ["Mechanical and Aerobody", mech_aero22],
        ["Electrical", electrical22],
    ], comp: competition_team22 },
    { key: "202122", label: "2021 – 2022", groups: [
        ["Executive Board", executive_board21],
        ["Mechanical and Aerobody", mech_aero21],
        ["Electrical", electrical21],
    ], comp: competition_team21 },
    { key: "202021", label: "2020 – 2021", groups: [
        ["Executive Board", executive_board20],
    ] },
    { key: "201920", label: "2019 – 2020", groups: [
        ["Executive Board", executive_board19],
    ] },
];

// one officer: headshot, name (with LinkedIn if there is one), title
// Moves a headshot up or down (in % of its height) so everyone's eyes
// line up. Cameras and cropping differ a little from photo to photo.
// Positive moves the picture down, negative moves it up. Add a line
// for anyone whose eyes are still off.
const EYE_SHIFT = {
    "Isabella Lucarelli": 4.6,
    "Natalia Sampaio": -3.1,
    "Jason Flick": 0.6,
    "Natalie Romero": 0,
    "Brandon Greenburg": -2.5,
};

// one officer: headshot, LinkedIn logo (if there is a link), name, title
function Officer({ name, title, img, linkedin, index }) {
    return (
        <li className="team-card" style={{ '--i': index }}>
            <div
                className="team-card__photo"
                style={{ '--eye': (EYE_SHIFT[name] || 0) + '%' }}
            >
                <img src={img} alt={name} loading="lazy" />
                {linkedin && (
                    <a
                        className="team-card__in"
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name + " on LinkedIn"}
                    >
                        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                            <rect width="24" height="24" rx="4" fill="#0A66C2" />
                            <path
                                fill="#fff"
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
                            />
                        </svg>
                    </a>
                )}
            </div>
            <div className="team-card__info">
                <h3 className="team-card__name">
                    <span>{name}</span>
                </h3>
                <p className="team-card__title">{title}</p>
            </div>
        </li>
    );
}

export default function Team() {
    const [yearKey, setYearKey] = useState("202627");
    const year = YEARS.find((y) => y.key === yearKey) || YEARS[0];

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
        <div className="team-page">

            {/* ---------- Hero ---------- */}
            <header className="team-hero" ref={heroRef}>
                {/* the same photo the Team page header used before */}
                <div className="team-hero__bg team-header-img" />
                <div className="team-hero__inner">
                    <p className="team-hero__eyebrow">University of Florida</p>
                    <h1 className="team-hero__title">Our Team</h1>
                </div>
                <div className="team-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- Year picker and officers ---------- */}
            <section className="team-sec">
                <div className="team-wrap">

                    <div className="team-years" role="tablist" aria-label="Academic year">
                        {YEARS.map((y) => (
                            <button
                                key={y.key}
                                type="button"
                                role="tab"
                                aria-selected={y.key === yearKey}
                                className={'team-years__btn' + (y.key === yearKey ? ' is-on' : '')}
                                onClick={() => setYearKey(y.key)}
                            >
                                {y.label}
                            </button>
                        ))}
                    </div>

                    {/* re-created when the year changes, so the cards animate in */}
                    <div className="team-year" key={year.key}>
                        {year.groups.map(([heading, officers]) => {
                            const list = officers || [];
                            if (!list.length) return null;
                            return (
                                <div className="team-group" key={heading}>
                                    <h2 className="team-group__title">{heading}</h2>
                                    <ul className="team-grid">
                                        {list.map((o, i) => (
                                            <Officer
                                                key={o[0] + i}
                                                name={o[0]}
                                                title={o[1]}
                                                img={o[2]}
                                                linkedin={o[3]}
                                                index={i}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}

                        {year.comp && year.comp.length > 0 && (
                            <div className="team-group">
                                <h2 className="team-group__title">Competition Team</h2>
                                <ul className="team-comp">
                                    {year.comp.map((n, i) => (
                                        <li key={n + i}>{n}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}