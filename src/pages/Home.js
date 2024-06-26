import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Header from "../components/Header";
import CarsSection from "../components/CarsSection/CarsSection";
import { get_eboard, get_elec, get_mech, get_pms } from "../content/assets/images/officers";

import fsgp23 from "../content/assets/images/people/team22/victory0_crop_edit.jpg";
import MAE from "../content/assets/images/sponsor_logos/MAE.png";
import ZenithTecnica from "../content/assets/images/sponsor_logos/ZenithTecnica.png";
import ECE from "../content/assets/images/sponsor_logos/ECE.png";

//2022-23 Officers: (Names, Positions, Headshot)
let executive_board = get_eboard("2023");
let pms = get_pms("2023");
let mech_aero = get_mech("2023");
let electrical =  get_elec("2023");

//Car 3 Platinum Sponsors
let platinum3 = [[MAE, "https://mae.ufl.edu/"], [ZenithTecnica, "https://www.zenithtecnica.com/"], [ECE, "https://www.ece.ufl.edu/"]];

function Officer({pic}) {
    //creates individual officer headshot container w image
    return (
        <div className={"headshot"} >
            <img className={"headshot-img"} src={pic} alt={"headshot"}/>
        </div>
    )
}

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
                    <SponsorRow img1={platinum3[0][0]} link1={platinum3[0][1]}/>
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
                    <SponsorRow img1={platinum3[0][0]} link1={platinum3[0][1]} img2={platinum3[2][0]} link2={platinum3[2][1]}/>
                    <SponsorRow img1={platinum3[1][0]} link1={platinum3[1][1]}/>
                </Col>
                <Col className={"no-margin-padding"} id="sponsor_blurb_half">
                    <Container >
                        <Row>
                            <SponsorBlurb/>
                        </Row>
                        <Row style={{justifyContent: "center", alignContent: "center"}}>
                            <Button className="btn-secondary" style={{left: "0", marginRight: "3vw", marginTop: "5vw"}}
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

    return (
      <React.Fragment>
          {/*  Page Header */}
          <Header title={"Powered By Florida sunshine"}
                  imgcss={"home-header-img"}/>

          {/* FSGP 23 Champions */}
          <Container fluid="true" className="section" style={{background: "#00203E"}}>
              <Row className={"fsgp-row"}>
                  <h2>
                      Solar Gators Victory!
                  </h2>
                  <p className={"body-text-white"} style={{textAlign: "center"}}>
                      Our team achieved an electrifying
                      <span className={"accent_word"} id={"orange_accent"}> victory at the 2023 Formula Sun Grand Prix (FSGP)</span>
                      , solidifying our position as pioneers in solar-powered endurance racing.
                      Battling against formidable competitors from around the country, our team demonstrated their exceptional engineering prowess and unyielding determination, ultimately crossing the finish line in an awe-inspiring
                      <span className={"accent_word"} id={"orange_accent"}> 1st place</span>
                      . Additionally, our team received awards for
                      <span className={"accent_word"} id={"orange_accent"}> Most Improved </span>
                      and
                      <span className={"accent_word"} id={"orange_accent"}> Aesthetics</span>
                      .
                  </p>
                  <img src={fsgp23} alt={""}/>
              </Row>
          </Container>

          {/* Car Section */}
          <CarsSection mobileView={mobileView}/>

          {/*  Team Section */}
          <Container fluid="true" className="section" style={{backgroundColor: '#00203E'}}>
              <Link id={"link"} to={"/team"} onClick={() => {window.scroll(0,0);}} >
                  <h2>Meet The Team</h2>
                  {/* Slide Animation */}
                  <div className={"slider"}>
                      <div className={"slide-track"}>
                          <Officer pic={executive_board[4][2]}/>
                          <Officer pic={executive_board[0][2]}/>
                          <Officer pic={executive_board[1][2]}/>
                          <Officer pic={executive_board[2][2]}/>
                          <Officer pic={executive_board[3][2]}/>
                          <Officer pic={pms[0][2]}/>
                          <Officer pic={pms[3][2]}/>
                          <Officer pic={pms[4][2]}/>
                          <Officer pic={pms[2][2]}/>
                          <Officer pic={mech_aero[0][2]}/>
                          <Officer pic={pms[1][2]}/>
                          <Officer pic={mech_aero[1][2]}/>
                          <Officer pic={mech_aero[2][2]}/>
                          <Officer pic={electrical[0][2]}/>
                          <Officer pic={electrical[1][2]}/>
                      </div>
                  </div>
              </Link>
          </Container>

          {/*  Join Team  */}
          <Container fluid="true" className={"section"} >
              <h2>Join Our Team</h2>
              <div className={"join-team"}>
                  <div className={"join-text-half"}>
                      <p>We welcome gators of all majors, backgrounds, and experience levels. Interested in joining us on the road to solar success? </p>
                      <p> 1. Fill out the new member interest form.</p> 
                      <Button style={{marginTop:"0px",marginBottom:"16px"}} className="btn-primary" id="large-btn" href={"https://forms.gle/Pab92hYcgVHA7pSd8"} target="_blank">
                          Interest Form
                      </Button>
                      <p> 2. Join the GroupMe for more information.</p>
                      <Button style={{marginTop:"0px"}}className="btn-primary" id="large-btn" href={"https://groupme.com/join_group/101189248/XPK5RayE"} target="_blank">
                          New Member GroupMe
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
                                  <p>6:00 PM</p>
                                  <p>7:00 PM</p>
                              </div>
                              <div className={"flex-cols-center"}>
                                  <p>Matherly Hall</p>
                                  <p>Weil Hall</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </Container>

          <div className={"horizontal-line"}/>

          {/*  Sponsors Section */}
          <Container fluid="true" className="section">
              <h2>Become A Sponsor</h2>
              {/*<h2>MAE Donation Matching</h2>*/}
              <SponsorSection on_mobile={mobileView}/>
          </Container>

      </React.Fragment>
    )
}
