import React, { useEffect, useRef } from 'react'
import {TeamAppsList} from "../content/TeamAppsList";
import '../content/styles/TeamApps.scss'
import './TeamApps.css'

// one clickable card that opens the app in a new tab
function AppCard({name, description, link, index}) {
    // a soft light follows the mouse over the card
    const spotlight = (e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', (e.clientX - box.left) + 'px');
        e.currentTarget.style.setProperty('--my', (e.clientY - box.top) + 'px');
    };

    return (
        <a
            className="ta-card"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={spotlight}
            style={{ '--i': index }}
        >
            <span className="ta-card__num">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="ta-card__name">{name}</h3>
            <p className="ta-card__text">{description}</p>
            <span className="ta-card__open">Open <i aria-hidden="true">↗</i></span>
        </a>
    )
}

export default function TeamApps() {
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
        <div className="ta-page">

            {/* ---------- Hero ---------- */}
            <header className="ta-hero" ref={heroRef}>
                {/* the same photo the Team Apps page header used before */}
                <div className="ta-hero__bg team-apps-header-img" />
                <div className="ta-hero__inner">
                    <p className="ta-hero__eyebrow">University of Florida</p>
                    <h1 className="ta-hero__title">Team Apps</h1>
                </div>
                <div className="ta-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- Blurb ---------- */}
            <section className="ta-intro">
                <p>
                    Tools built by Solar Gators members to design, build, and race our cars.
                </p>
            </section>

            {/* ---------- App cards - to add an app, edit src/content/TeamAppsList.js ---------- */}
            <section className="ta-sec">
                <div className="ta-grid">
                    {TeamAppsList.map((app, i) => (
                        <AppCard
                            key={app.name}
                            name={app.name}
                            description={app.description}
                            link={app.link}
                            index={i}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}