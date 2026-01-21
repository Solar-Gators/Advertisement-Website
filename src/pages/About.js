import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CarsSection from "../components/CarsSection/CarsSection";
import MissionStatements from "../components/MissionStatements/MissionStatements";
import SplitSection from "../components/SplitSection/SplitSection";
import Header from "../components/Header";

import img1 from '../content/assets/images/car_pics/Flare/SG25_Top_Open.JPG';
import img2 from '../content/assets/images/car_pics/Flare/SG25_Installing_Top_Body.JPG';
import img3 from '../content/assets/images/people/team25/SG25_Pit_Lineup.JPG';

//Blurb Section 1
let p1 = "Solar Gators is a fully student-run engineering design team at " +
    "the University of Florida. We are passionate about driving innovative and sustainable " +
    "technology in the automotive industry. We design, build, and race solar-powered cars to showcase " +
    "the potential of solar energy and inspire the next generation of engineers and innovators. " +
    "Each year we proudly represent the Sunshine State in the Formula Sun Grand Prix (FSGP)."

//Blurb Section 2
let p2a = "With nearly a decade of innovation behind us and a first place finish at the Formula Sun Grand Prix under our belt, " +
    "we've solidified our place in the solar car world. Our journey proves that a team run on " +
    "commitment, creativity, and innovation can overcome any obstacle."

let p2b = "As a team of passionate engineers, we work tirelessly to achieve our goals. " +
    "From the initial design phase to the final race day, we're committed to excellence " +
    "in everything we do. Even when facing the toughest challenges, our team stays motivated " +
    "and dedicated to keeping things on track."

//Blurb Section 3
let p3 = "Inclusivity is one of our founding principles. We believe that everyone deserves " +
    "a chance to learn and grow, regardless of their background or experience. That's " +
    "why we welcome new members with open arms, and provide them with the tools and " +
    "resources they need to become better engineers and better people. Join us as we " +
    "push the limits of what's possible in solar racing and beyond."

function TrackRecord({on_mobile, blurb1, blurb2, blurb3, blurb4, blurb5, blurb6, blurb7, blurb8}) {
    let Text = ({blurb}) => {
        return (
            <ol className="no-margin-padding" style={{listStyleType: 'square', marginLeft: "5vw"}}>
                <li className={"body-text-white"} style={{paddingBottom: "16px"}}>{blurb}</li>
            </ol>
        )
    }

    if (on_mobile) {
        return (
            <Row className="no-margin-padding">
                <Col >
                    <Text blurb={blurb1}/>
                    <Text blurb={blurb2}/>
                    <Text blurb={blurb3}/>
                    <Text blurb={blurb4}/>
                    <Text blurb={blurb5}/>
                    <Text blurb={blurb6}/>
                    <Text blurb={blurb7}/>
                    <Text blurb={blurb8}/>
                </Col>
            </Row>
        )
    }
    else {
        return (
            <Row style={{justifyContent: "center"}}>
                <Col className={"mission-statement"} style={{marginLeft: "0"}}>
                    <Row>
                        <Text blurb={blurb1}/>
                        <Text blurb={blurb2}/>
                        <Text blurb={blurb5}/>
                        <Text blurb={blurb7}/>
                    </Row>
                </Col>
                <Col className={"mission-statement"}>
                    <Row>
                        <Text blurb={blurb3}/>
                        <Text blurb={blurb4}/>
                        <Text blurb={blurb6}/>
                        <Text blurb={blurb8}/>
                    </Row>
                </Col>
            </Row>
        )
    }
}


export default function About() {
    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;

    return (
        <React.Fragment>
            {/*  Page Header */}
            <Header title={"About Us"} imgcss={"about-header-img"}/>

            {/* Blurb & Picture */}
            <SplitSection img={img1} blurb={p1} img_left={false} on_mobile={mobileView} img_above={false}/>

            {/*  Mission Section */}
            <MissionStatements on_mobile={mobileView} white_background={false} button={false} />

            {/* Blurb 2 & Picture */}
            <SplitSection img={img2} blurb={p2a} blurb2={p2b} img_left={true} on_mobile={mobileView} img_above={true}/>

            {/* Blurb 3 & Picture */}
            <SplitSection img={img3} blurb={p3} img_left={false} on_mobile={mobileView} img_above={true}/>

            {/* Our Track Record */}
            <Container fluid="true" className="section" style={{background: "#283f8c"}}>
            <h2>
                Our Track Record
            </h2>
                <TrackRecord
                    on_mobile={mobileView}
                    blurb1="Won 1st place at the 2023 Formula Sun Grand Prix after completing 707.5 miles on track"
                    blurb2="Competed in the Formula Sun Grand Prix seven times since 2016"
                    blurb3="Set the fastest lap at the 2025 Formula Sun Grand Prix"
                    blurb4="Won 1st place in the Mathworks presentation competition at the 2025 Formula Sun Grand Prix"
                    blurb5="Qualified for our first American Solar Challenge in 2024"
                    blurb6="Won the 2024 Altair Challenge and a grand prize of $10,000"
                    blurb7="Designed and manufactured four solar cars in ten years from the ground up"
                    blurb8="100% student run"
                />
            </Container>

            {/* Car Section */}
            <CarsSection mobileView={mobileView}/>

        </React.Fragment>
    )
}
