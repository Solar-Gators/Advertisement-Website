import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ScrollHero.css';

const clamp = (n, min = 0, max = 1) => {
    return Math.min(max, Math.max(min, n));
};

// progress of p between a and b
const seg = (p, a, b) => clamp((p - a) / (b - a));

// smooth start and end
const ease = (t) => t * t * (3 - 2 * t);

// Scroll timeline (0 to 1). Each completed car gets one "slot":
// slide up, light sweep, slide down. The last car (the one we are
// finishing now) stays a little longer, then the buttons appear.
const START = 0.08;  // first car starts to slide in
const SLOT = 0.16;   // scroll length given to each car
const TAIL = 0.21;   // length of the last car's own slot

const pad = (n) => String(n).padStart(2, '0');

export default function ScrollHero({
    eyebrow = 'University of Florida',
    title = 'Solar Gators',
    tagline = [
        'Designed and built by students.',
        'Powered by Florida sunshine.',
    ],
    cue = 'Scroll to race',
    anniversary = '10th Year Anniversary',
    // [{ src, number }] in the order they appear. The last one is
    // the car we are building now.
    cars = [],
    carImage = null,
    carAlt = 'The Solar Gators solar car',
    framed = false,
    carLabel = 'Car',
    currentCarLabel = 'Current car',
    yearsLabel = 'Years as a team',
    yearsStart = 1,
    yearsEnd = 10,
}) {
    const ref = useRef(null);
    const layerRefs = useRef([]);

    const layers = cars.length ? cars : [{ src: carImage, number: 5 }];
    const count = layers.length;
    const lastIdx = count - 1;

    // the two counters: which car, and which year
    const [carIdx, setCarIdx] = useState(0);
    const [years, setYears] = useState(yearsStart);

    const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const set = (name, value) => {
            el.style.setProperty(name, value.toFixed(3));
        };

        const setLayer = (i, inn, sweep, out, sun) => {
            const layer = layerRefs.current[i];
            if (!layer) return;
            layer.style.setProperty('--in', inn.toFixed(3));
            layer.style.setProperty('--sweep', sweep.toFixed(3));
            layer.style.setProperty('--out', out.toFixed(3));
            layer.style.setProperty('--sun', sun.toFixed(3));
        };

        // "Reduce motion": show the finished scene (the newest car).
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reduce) {
            for (let i = 0; i < count; i++) {
                const isLast = i === count - 1;
                setLayer(i, isLast ? 1 : 0, 0, isLast ? 0 : 1, isLast ? 1 : 0);
            }
            set('--sun', 1);
            set('--exit', 0);
            set('--cta', 0);
            set('--anniv', 1);
            set('--stats', 1);
            set('--cue', 0);
            setCarIdx(count - 1);
            setYears(yearsEnd);
            return;
        }

        let frame = null;
        let lastY = window.scrollY;
        let shownCar = 0;
        let shownYear = yearsStart;
        const lastEnd = START + (count - 1) * SLOT + TAIL;

        const update = () => {
            frame = null;
            const rect = el.getBoundingClientRect();

            // pin the stage while this section fills the screen
            let mode = 'before';
            if (rect.bottom < window.innerHeight) {
                mode = 'after';
            } else if (rect.top <= 0) {
                mode = 'pinned';
            }
            if (el.getAttribute('data-mode') !== mode) {
                el.setAttribute('data-mode', mode);
            }

            // how long the stage stays pinned
            const travel = rect.height - window.innerHeight;

            // 0 -> 1 across the whole sequence
            const p = clamp(-rect.top / travel);

            // the counters appear first; the anniversary line waits until
            // the last car (and its glow) arrives, just after car 4
            const lastStart = START + (count - 1) * SLOT;
            set('--anniv', ease(seg(p, lastStart - 0.02, lastStart + 0.05)));
            set('--stats', ease(seg(p, 0.05, 0.12)));

            // every car: slide up, light sweep, slide down
            let glow = 0;
            let exitLast = 0;
            for (let i = 0; i < count; i++) {
                const s = START + i * SLOT;
                const isLast = i === count - 1;
                const inn = ease(seg(p, s, s + 0.05));
                const sweepEnd = isLast ? s + 0.16 : s + 0.11;
                const sweep = seg(p, s + 0.04, sweepEnd);
                const outStart = sweepEnd;
                const out = ease(seg(p, outStart, outStart + 0.05));
                const presence = inn * (1 - out);
                // the yellow glow only appears for the last (current) car
                setLayer(i, inn, sweep, out, isLast ? presence : 0);
                if (isLast) glow = presence;
                if (isLast) exitLast = out;
            }
            set('--sun', glow);
            set('--exit', exitLast);

            // buttons appear where the last car was
            const cta = ease(seg(p, lastEnd - 0.03, lastEnd + 0.04));
            set('--cta', cta);
            const ctaState = cta > 0.5 ? 'on' : 'off';
            if (el.getAttribute('data-cta') !== ctaState) {
                el.setAttribute('data-cta', ctaState);
            }

            // car counter: changes when the next car starts to appear
            const carNow = Math.min(
                count - 1,
                Math.max(0, Math.floor((p - START) / SLOT))
            );
            if (carNow !== shownCar) {
                shownCar = carNow;
                setCarIdx(carNow);
            }

            // year counter: goes up one at a time, evenly, and reaches
            // its final number before the last car arrives
            let yearNow = yearsEnd;
            if (count > 1) {
                const steps = yearsEnd - yearsStart + 1;
                const done = seg(p, START, START + (count - 1) * SLOT);
                yearNow = Math.min(
                    yearsEnd,
                    yearsStart + Math.floor(done * steps)
                );
            }
            if (yearNow !== shownYear) {
                shownYear = yearNow;
                setYears(yearNow);
            }

            // scroll cue fades once scrolling starts
            set('--cue', 1 - seg(p, 0, 0.05));

            // wheels turn as you scroll
            set('--spin', p * 1800);
        };

        // Hide the top nav when scrolling down,
        // show it again when scrolling up.
        const updateNav = () => {
            const y = window.scrollY;
            if (y <= 10) {
                document.body.classList.remove('nav-hidden');
            } else if (Math.abs(y - lastY) > 2) {
                document.body.classList.toggle(
                    'nav-hidden',
                    y > lastY
                );
            }
            lastY = y;
        };

        const onScroll = () => {
            updateNav();
            if (frame === null) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, {
            passive: true,
        });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
            document.body.classList.remove('nav-hidden');
        };
    }, [count, yearsStart, yearsEnd]);

    return (
        <section
            className="scrollhero"
            ref={ref}
            style={{
                height: reduceMotion
                    ? undefined
                    : String(100 + 140 * count) + 'vh',
            }}
        >
            <div className="scrollhero__stage">
                <div className="scrollhero__sun" />

                {layers.map((c, i) => (
                    <div
                        className={
                            'scrollhero__car scrollhero__car--' + c.number
                        }
                        key={i}
                        ref={(node) => {
                            layerRefs.current[i] = node;
                        }}
                    >
                        {c.src ? (
                            <div
                                className={
                                    'scrollhero__photobox' +
                                    (framed ? ' is-framed' : '')
                                }
                            >
                                <img
                                    className="scrollhero__photo"
                                    src={c.src}
                                    alt={carAlt + ' ' + c.number}
                                />
                                <div
                                    className="scrollhero__photosheen"
                                    style={{
                                        '--car-mask': 'url(' + c.src + ')',
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                ))}

                <div className="scrollhero__heading">
                    <p className="scrollhero__eyebrow">{eyebrow}</p>
                    <h1 className="scrollhero__title">{title}</h1>
                    <p className="scrollhero__anniv">{anniversary}</p>
                </div>

                <div className="scrollhero__lower">
                    <p className="scrollhero__tagline">
                        <span className="scrollhero__tagline-in">
                            {tagline[0]}
                            <br />
                            {tagline[1]}
                        </span>
                    </p>

                    <div className="scrollhero__stats">
                        <div className="scrollhero__stat">
                            <span className="scrollhero__stat-value">
                                {pad(layers[carIdx].number)}
                            </span>
                            <span className="scrollhero__stat-label">
                                {carIdx === lastIdx
                                    ? currentCarLabel
                                    : carLabel}
                            </span>
                        </div>
                        <div className="scrollhero__stat">
                            <span className="scrollhero__stat-value">
                                {pad(years)}
                            </span>
                            <span className="scrollhero__stat-label">
                                {yearsLabel}
                            </span>
                        </div>
                    </div>

                    <div className="scrollhero__dots" aria-hidden="true">
                        {layers.map((c, i) => (
                            <span
                                key={i}
                                className={
                                    'scrollhero__dot' +
                                    (i <= carIdx ? ' is-on' : '') +
                                    (i === carIdx ? ' is-current' : '')
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="scrollhero__ctas">
                    <a
                        className="scrollhero__btn scrollhero__btn--ghost"
                        href="#join"
                        onClick={(e) => {
                            e.preventDefault();
                            const t = document.getElementById('join');
                            if (t) t.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Join the team
                    </a>
                    <Link
                        className="scrollhero__btn scrollhero__btn--solid"
                        to="/donate"
                        onClick={() => {
                            window.scroll(0, 0);
                        }}
                    >
                        Sponsor us
                    </Link>
                </div>

                <ol className="scrollhero__rail" aria-hidden="true">
                    {layers.map((c, i) => (
                        <li
                            key={i}
                            className={
                                'scrollhero__tick' +
                                (i === carIdx ? ' is-active' : '') +
                                (i < carIdx ? ' is-past' : '')
                            }
                        >
                            {pad(c.number)}
                        </li>
                    ))}
                </ol>

                <div className="scrollhero__cue">
                    <span>{cue}</span>
                    <svg
                        viewBox="0 0 24 12"
                        width="22"
                        height="11"
                        aria-hidden="true"
                    >
                        <path
                            d="M2 2 L12 10 L22 2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}