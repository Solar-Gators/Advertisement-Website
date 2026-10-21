import React, { useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {AwardList} from '../content/assets/images/awards/AwardList';


import CarsSection from "../components/CarsSection/CarsSection";
import ScrollHero from "../components/ScrollHero/ScrollHero";
import { get_eboard, get_elec, get_mech, get_pms, get_ces } from "../content/assets/images/officers";
import "./Home.css";

import MAE from "../content/assets/images/sponsor_logos/MAE.png";
import scubasteve from "../content/assets/images/sponsor_logos/Scuba Steve Logo.png"
import Batemo from "../content/assets/images/sponsor_logos/Batemo Logo.png"

// Photos for the scroll hero, picked up automatically from
//   src/content/assets/images/hero-cars/   (or straight from images/)
// Name them car1, car2, car3, car4 (completed cars, in order) and
// car5 or just car (the car we are building now). Any of png, jpg,
// jpeg or webp works, and car-1, car_1 or Car 1 are fine too.
// A car without a photo simply shows nothing, but the counters
// still count.
const CAR_FILE = /^\.\/(?:hero-cars\/)?car[ _-]?([1-5])?\.(?:png|jpe?g|webp)$/i;

const carFiles = require.context(
    "../content/assets/images",
    true,
    /^\.\/(?:hero-cars\/)?car[ _-]?([1-5])?\.(?:png|jpe?g|webp)$/i
);

const heroCars = [1, 2, 3, 4, 5].map((number) => {
    const key = carFiles.keys().find((k) => {
        const m = k.match(CAR_FILE);
        if (!m) return false;
        const n = m[1] ? parseInt(m[1], 10) : 5; // plain "car" = newest
        return n === number;
    });
    if (!key) return { src: null, number: number };
    const mod = carFiles(key);
    return { src: mod.default || mod, number: number };
});

// "Solar Gators Victory!" starts with the newest award.
// The newest is found from the years written in each award's text
// (for example "2024"). If the awards have no years in them, the
// list keeps its own order; set REVERSE_AWARDS to true to flip it.
const REVERSE_AWARDS = false;

const awardYear = (award) => {
    const text = [award.description, award.alt, award.title, award.year, award.date]
        .filter(Boolean)
        .join(" ");
    const years = text.match(/20\d\d/g);
    return years ? Math.max(...years.map(Number)) : null;
};

const awardsHaveYears =
    AwardList.filter((a) => awardYear(a) !== null).length >= AwardList.length / 2;

let awards = awardsHaveYears
    ? [...AwardList].sort((a, b) => (awardYear(b) || 0) - (awardYear(a) || 0))
    : [...AwardList];
if (REVERSE_AWARDS) awards = awards.reverse();

// Officers shown in "Meet The Team": (Names, Positions, Headshot)
// OFFICER_YEAR must match the year used in the officers folder.
// If that year has no data yet, the site falls back to 2025
// so the page never breaks.
const OFFICER_YEAR = "2026";

function loadOfficers(getter) {
    try {
        const list = getter(OFFICER_YEAR);
        if (list && list.length) return list;
    } catch (e) {
        // no data for this year yet
    }
    return getter("2025");
}

let executive_board = loadOfficers(get_eboard);
let pms = loadOfficers(get_pms);
let mech_aero = loadOfficers(get_mech);
let electrical = loadOfficers(get_elec);
let chief_engineers = loadOfficers(get_ces);

// Everyone shown in the sliding row. The president goes first, so the
// slider always starts with them (found by the title "President",
// not "Vice President"). Then the rest of the executive board, then
// the other teams.
const isPresident = (officer) => {
    const title = String((officer && officer[1]) || "");
    return /president/i.test(title) && !/vice/i.test(title);
};
const presidentIdx = executive_board.findIndex(isPresident);
const boardOrdered =
    presidentIdx > 0
        ? [
              executive_board[presidentIdx],
              ...executive_board.filter((_, i) => i !== presidentIdx),
          ]
        : [...executive_board];

const teamPhotos = [
    ...boardOrdered,
    ...pms,
    ...mech_aero,
    ...electrical,
    ...chief_engineers,
];

//Car 3 Platinum Sponsors
let platinum4 = [[MAE, "https://mae.ufl.edu/"], [scubasteve], [Batemo, "https://www.batemo.com/"]];

function SponsorSection ({on_mobile}) {
    let SponsorBlurb = () => {
        return (
            <>
                <p>Solar Gators relies on the support of sponsors to further our mission of showing the potential of
                    solar energy.
                    Sponsoring us means becoming an integral part of our team, and helping to inspire the next
                    generation of engineers and innovators.
                    Join us on our mission towards a brighter, more sustainable future.
                </p>
                {/*<p>*/}
                {/*    During the Fall 2023 semester, UF Department of Mechanical and Aerospace Engineering (MAE)*/}
                {/*    <span className={"accent_word"} id={"orange_accent"}> one-to-one matched all donations </span>*/}
                {/*    made to our UF Foundation account.*/}
                {/*</p>*/}
            </>
        )
    }

    let LogoImage = ({ src, link }) => {
            return (
                <Col className="logo-col" id={"home-sponsors-logo-col"}>
                    <a href={link}>
                        <span className="align-center">
                            <img src={src} className="sponsor-logo" alt={"logo"}/>
                        </span>
                    </a>
                </Col>
            )
    }

    let SponsorRow = ({link1, img1, link2, img2, link3, img3}) => {
        //creates Row with one (two or three) sponsor logos
        return (
            <Row style={{justifyContent:"center"}}>
                { img1 ? <LogoImage src={img1} link={link1} /> : ""}
                { img2 ? <LogoImage src={img2} link={link2} /> : ""}
                { img3 ? <LogoImage src={img3} link={link3} /> : ""}
            </Row>
        )
    }

    let CTAbtn = () => {
        return (
            <Button className="btn-primary" style={{left: "0", marginTop: "5vw"}}
                    as={Link} to={"/donate"}
                    onClick={() => {window.scroll(0,0);}}>
                Learn More
            </Button>
        )
    }

    if (on_mobile) {
        return (
            <Col>
                <Row>
                    <SponsorRow img1={platinum4[0][0]} link1={platinum4[0][1]}/>
                </Row>
                    <SponsorBlurb/>
                <Row>
                    <CTAbtn/>
                </Row>
            </Col>
        )
    }
    else {
        return (
            <Row>
                <Col className={"no-margin-padding"} id="sponsor_logos_half">
                    <SponsorRow img1={platinum4[0][0]} link1={platinum4[0][1]} img2={platinum4[2][0]} link2={platinum4[2][1]}/>
                    <SponsorRow img1={platinum4[1][0]} link1={platinum4[1][1]}/>
                </Col>
                <Col className={"no-margin-padding"} id="sponsor_blurb_half">
                    <Container >
                        <Row>
                            <SponsorBlurb/>
                        </Row>
                        <Row style={{justifyContent: "center", alignContent: "center"}}>
                            <Button className="btn-tertiary" style={{left: "0", marginRight: "3vw", marginTop: "5vw"}}
                                    as={Link} to={"/sponsors"}
                                    onClick={() => {window.scroll(0,0);}}>
                                Our Sponsors
                            </Button>
                            <CTAbtn/>
                        </Row>
                    </Container>
                </Col>
            </Row>
        )
    }
}

export default function Home() {
    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;
    const responsive = {
        desktop_mobile:{
            breakpoint: {max: 4000, min:0},
            items:1,
        },
    };

    // Sections below the hero fade in as they scroll into view.
    const pageRef = useRef(null);

    useEffect(() => {
        const root = pageRef.current;
        if (!root) return;

        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (reduce || !('IntersectionObserver' in window)) return;

        const items = root.querySelectorAll('.section, .stats-strip');
        root.classList.add('js-reveal');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        items.forEach((item) => observer.observe(item));

        return () => {
            observer.disconnect();
            root.classList.remove('js-reveal');
        };
    }, []);

    return (
      <div className="home-page" ref={pageRef}>
          {/*  Scroll-driven hero with the car */}
          <ScrollHero cars={heroCars} />

          {/* Awards */}
          <Container fluid="true" className="section awards-section" style={{background: "var(--home-dark, #283f8c)"}}>
              <Row className={"fsgp-row"}>
                  <h2>
                      Solar Gators Victory!
                  </h2>
              </Row>
              <Carousel showDots={true} responsive={responsive} autoPlay={true}  autoPlaySpeed={8000}  infinite={true}  >
                {awards.map((award) => (
                    <div className='award-card' key={award.id}>
                        <img className="award-card-image" src={award.award_image} alt={award.alt}/>
                        <div className='award-card-content'>
                        <p className={"body-text-white"} style={{textAlign: "center"}} dangerouslySetInnerHTML={{ __html: award.description }} />
                        <a href={award.photo_credits_link} target='_blank' rel="noopener noreferrer"><h6>{award.photo_credits}</h6></a>
                        </div>

                    </div>

                ))}
              </Carousel>
          </Container>


          {/* Car Section */}
          <div className="cars-section-wrap">
              <CarsSection mobileView={mobileView}/>
          </div>

          {/*  Team Section */}
          <Container fluid="true" className="section" style={{backgroundColor: "var(--home-dark, #283f8c)"}}>
              <Link id={"link"} to={"/team"} onClick={() => {window.scroll(0,0);}} >
                  <h2 style={{textAlign: 'center', width: '100%'}}>Meet The Team</h2>
                  {/* Sliding row of headshots: every picture is the same size */}
                  <div className="team-marquee">
                      <div className="team-marquee__track" style={{ "--n": teamPhotos.length }}>
                          {[...teamPhotos, ...teamPhotos].map((officer, i) => (
                              <div className="team-marquee__item" key={i}>
                                  <img src={officer[2]} alt={officer[0] || "Team member"} />
                              </div>
                          ))}
                      </div>
                  </div>
              </Link>
          </Container>

          {/*  Join Team  */}
          <Container fluid="true" className={"section"} id="join">
              <h2 style={{textAlign: 'center', width: '100%'}}>Join Our Team</h2>
              <div className={"join-team"}>
                  <div className={"join-text-half"}>
                      <p>We welcome gators of all majors, backgrounds, and experience levels. Interested in joining us on the road to solar success?  Fill out the new member interest form. </p>

                      <Button style={{marginTop:"0px",marginBottom:"16px"}} className="btn-primary" id="large-btn" href={"https://docs.google.com/forms/d/e/1FAIpQLSf3WscS_juY1W2_Rv7wr4uuE8tVoF96CCCBhKN9n3GpgjNYzg/viewform?usp=publish-editor"} target="_blank" rel="noopener noreferrer">
                          Interest Form
                      </Button>
                  </div>

                  <div id={"schedule"}>
                      <h4>Weekly Meeting Schedule</h4>
                      <div id={"schedule-dates"}>
                          <div className={"flex-rows-center"}>
                              <div className={"flex-cols-center"}>
                                  <p className={"accent_word"}>MONDAY</p>
                                  <p className={"accent_word"}>THURSDAY</p>
                              </div>
                              <div className={"flex-cols-center"}>
                                  <p>6:00-8:00 PM</p>
                                  <p>6:00-8:00 PM</p>
                              </div>
                              <div className={"flex-cols-center"}>
                                  <p></p>
                                  <p></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </Container>

          <div className={"horizontal-line"}/>

          {/*  Sponsors Section */}
          <Container fluid="true" className="section sponsor-section">
              <h2 style={{textAlign: 'center', width: '100%'}}>Become A Sponsor</h2>
              {/*<h2>MAE Donation Matching</h2>*/}
              <SponsorSection on_mobile={mobileView}/>
          </Container>

      </div>
    )
}