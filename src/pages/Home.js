import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {AwardList} from '../content/assets/images/awards/AwardList';


import Header from "../components/Header";
import CarsSection from "../components/CarsSection/CarsSection";
import { get_eboard, get_elec, get_mech, get_pms, get_ces } from "../content/assets/images/officers";

import fsgp23 from "../content/assets/images/people/team22/victory0_crop_edit.jpg";
import MAE from "../content/assets/images/sponsor_logos/MAE.png";
import ZenithTecnica from "../content/assets/images/sponsor_logos/ZenithTecnica.png";
import ECE from "../content/assets/images/sponsor_logos/ECE.png";

//2024-25 Officers: (Names, Positions, Headshot)
let executive_board = get_eboard("2024");
let pms = get_pms("2024");
let mech_aero = get_mech("2024");
let electrical =  get_elec("2024");
let chief_engineers = get_ces("2024");

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

    return (
      <React.Fragment>
          {/*  Page Header */}
          <Header title={"Powered By Florida sunshine"}
                  imgcss={"home-header-img"}/>

          {/* Awards */}
          <Container fluid="true" className="section" style={{background: "#00203E"}}>
              <Row className={"fsgp-row"}>
                  <h2>
                      Solar Gators Victory!
                  </h2>
              </Row>
              <Carousel showDots={true} responsive={responsive} autoPlay={true}  autoPlaySpeed={3000}  infinite={true}  >
                {AwardList.map((award) => (
                    <div className='award-card' key={award.id}>
                        <img className="award-card-image" src={award.award_image} alt={award.alt}/>
                        <div className='award-card-content'>
                        <p className={"body-text-white"} style={{textAlign: "center"}} dangerouslySetInnerHTML={{ __html: award.description }} />
                        <a href={award.photo_credits_link} target='_blank'><h6>{award.photo_credits}</h6></a>
                        </div>

                    </div>

                ))}
              </Carousel>
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
                          <Officer pic={pms[1][2]}/>
                          <Officer pic={pms[2][2]}/>
                          <Officer pic={pms[3][2]}/>
                          <Officer pic={mech_aero[0][2]}/>
                          <Officer pic={mech_aero[1][2]}/>
                          <Officer pic={mech_aero[2][2]}/>
                          <Officer pic={mech_aero[3][2]}/>
                          <Officer pic={mech_aero[4][2]}/>
                          <Officer pic={mech_aero[5][2]}/>
                          <Officer pic={electrical[0][2]}/>
                          <Officer pic={electrical[1][2]}/>
                          <Officer pic={electrical[2][2]}/>
                          <Officer pic={electrical[3][2]}/>
                          <Officer pic={electrical[4][2]}/>
                          <Officer pic={electrical[5][2]}/>
                          <Officer pic={chief_engineers[0][2]}/>
                          <Officer pic={chief_engineers[1][2]}/>
                          <Officer pic={chief_engineers[2][2]}/>
                      </div>
                  </div>
              </Link>
          </Container>

          {/*  Join Team  */}
          <Container fluid="true" className={"section"} >
              <h2>Join Our Team</h2>
              <div className={"join-team"}>
                  <div className={"join-text-half"}>
                      <p>We welcome gators of all majors, backgrounds, and experience levels. Interested in joining us on the road to solar success?  Fill out the new member interest form. </p>
                     
                      <Button style={{marginTop:"0px",marginBottom:"16px"}} className="btn-primary" id="large-btn" href={"https://docs.google.com/forms/d/e/1FAIpQLScIrnd9WXZzx5f7obqTeMtIWuLGnaquYadNviaSW46ysM3JPg/viewform?usp=header "} target="_blank">
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
                                  <p>6:00 PM</p>
                                  <p>6:00 PM</p>
                              </div>
                              <div className={"flex-cols-center"}>
                                  <p>Matherly Hall</p>
                                  <p>Matherly Hall</p>
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
