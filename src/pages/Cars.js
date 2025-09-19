import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import torch from "../content/assets/images/car_pics/Torch/torch_ontrack_clean.jpg";
import sunrider from "../content/assets/images/car_pics/sunrider/2021/car3.jpg";
import cielo from "../content/assets/images/car_pics/Cielo/IMG_9011_crop.JPG";
import flare from "../content/assets/images/car_pics/Flare/SG25_Pit_Exit.jpg";


function SplitSection ({name, year1, year2, blurb, img, pic_side, on_mobile}) {
    let ImageContent = () => {
        return (
            <Col className="no-margin-padding">
                <div className="image-half-container" style={{backgroundImage: "url(" + img + ")"}}/>
            </Col>
        )
    }
    let TextContent = ({textColor}) => {
        if (on_mobile) {
            return (
                <Col className={"no-margin-padding"}>
                    <div className="text-half-container">
                        <h2 style={{paddingBottom: "0px"}}>{name}</h2>
                        <h6 style={{paddingBottom: "15px"}}>{year1} - {year2}</h6>
                        <ImageContent/>
                        <p style={{color: textColor, paddingTop: "20px"}}>{blurb}</p>
                    </div>
                </Col>
            )
        }
        else {
            return (
                <Col className={"no-margin-padding"}>
                    <div className="text-half-container">
                        <h2 style={{paddingBottom: "0px"}}>{name}</h2>
                        <h6 style={{paddingBottom: "20px"}}>{year1} - {year2}</h6>
                        <p style={{color: textColor}}>{blurb}</p>
                    </div>
                </Col>
            )
        }
    }

    if (on_mobile) {
        if (name === "Cielo") {
            return (
                <Col className="no-margin-padding" id={name}>
                    <TextContent/>
                </Col>
            )
        }
        else {
            return (
                <Col className="no-margin-padding" id={name} style={{background: "#283f8c"}}>
                    <TextContent textColor={"#cdcdcd"}/>
                </Col>
            )
        }

    }
    else {
        if (pic_side === "right") {
            return (
                <Row className="no-margin-padding" id={name} style={{background: "#283f8c"}}>
                    <TextContent textColor={"#cdcdcd"}/>
                    <ImageContent/>
                </Row>
            )
        }
        else {
            return (
                <Row className="no-margin-padding" id={name}>
                    <ImageContent/>
                    <TextContent/>
                </Row>
            )
        }
    }
}

export default function Cars() {
    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;

    return (
        <React.Fragment>
            {/*  Page Header */}
            <Header title={"Our Cars"} imgcss={"cars-header-img"}/>

            {/* Flare */}
            <SplitSection name={"Flare"} year1={"2025"} year2={"Present"} img={flare} pic_side={"left"}
                          blurb={"Our fourth generation solar car began development in the Spring of 2023. Throughout the design process, our experience at the 2024 American Solar Challenge greatly drove our desire for making a car that could compete with the very best solar car teams. Flare was manufactured throughout the 2024-2025 school year almost entirely by students at the University of Florida. Boasting a brand new aerobody, monocoque chassis, double wishbone front suspension and a custom battery management system, Flare entered the solar racing scene at the 2025 Formula Sun Grand Prix. Flare had the best debut of any Solar Gators car, covering ~470 miles its first ever race. Flare set the fastest lap at the track in 2025, averaging 43.77 miles per hours around the 3.15 mile track at the National Corvette Museum track in Bowling Green, Kentucky. Flare will attend the 2026 Formula Sun Grand Prix and American Solar Challenge with some brand new upgrades!"}
                          on_mobile={mobileView}/>

            {/* Sunrider */}
            <SplitSection name={"Sunrider"} year1={"2020"} year2={"2024"} img={sunrider} pic_side={"right"}
                          blurb={"Design for our third car, Sunrider, commenced in 2019. However, pandemic restrictions brought progress to a halt with limited in-person meetings and significant supply chain delays. Through this difficult time, the team banded together and worked relentlessly to complete Sunrider. Making its debut in the 2022 Formula Sun Grand Prix (FSGP), Sunrider set new team records; accumulating a total distance of over 700 miles and winning the 2023 FSGP in its second competition. In 2024, Sunrider embarked on its third and final race, competing in the Electrek Formula Sun Grand Prix. It covered ~470 miles and successfully qualified for the American Solar Challenge. Sunrider completed nearly 1500 miles of the 1562.2-mile base route, becoming the first car in its class to reach the finish line, covering 198.3 miles in under 5.5 hours—10 minutes faster than the overall first-place team. Sunrider’s final race also led us to victory in the Altair Challenge, where we achieved an 81% weight reduction and won the $10,000 grand prize. "}
                          on_mobile={mobileView}/>

            {/* Cielo */}
            <SplitSection name={"Cielo"} year1={"2018"} year2={"2020"} img={cielo} pic_side={"left"}
                          blurb={"We competed with our second car Cielo in the 2018 and 2019 Formula Sun Grand Prix (FSGP). Cielo required an overhaul of almost all the existing car’s electrical and mechanical systems, and the changes paid off. During the year, we designed and manufactured a brand-new carbon fiber aero-body, making the car much lighter and quicker. In addition, new mechanical, electrical, and solar systems were designed and integrated, resulting in a more reliable and competitive car. Cielo drove 23 miles on the final race day in 2018, a significant improvement from the previous year, and almost 200 miles over the course of the final two race days in 2019."}
                          on_mobile={mobileView}/>

            {/* Torch */}
            <SplitSection name={"Torch"} year1={"2016"} year2={"2018"} img={torch} pic_side={"right"}
                          blurb={"In 2012, UF Solar Gators was founded. The 2012-2014 team disbanded before they completed their car, but left their chassis behind. In 2016, the team was reestablished and we built our first car Torch from the existing chassis. Torch was built over the course of the summer in 2017 and became Solar Gators’ first entry into the Formula Sun Grand Prix. Torch passed scrutineering and went on to complete the team’s first lap; making Solar Gators the first Florida team to race since 1989!"}
                          on_mobile={mobileView}/>

            {/* Sponsorship */}
            <Container fluid="true" className="section">
                <p style={{textAlign: "center"}}>
                    Throughout our history, our sponsors have been at the center of everything we accomplish. As we continue to grow, we hope that you will join us in our mission to develop state of the art technologies and compete for championships.
                </p>
                <Button className="btn-primary" as={Link} to={"/donate"}
                        onClick={() => {window.scroll(0,0);}}>
                    Learn More
                </Button>
            </Container>

        </React.Fragment>
    )
}
