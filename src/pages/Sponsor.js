import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react';
import {get_platinum_sponsors, get_gold_sponsors, get_silver_sponsors, get_bronze_sponsors, get_valued_sponsors, get_patrons} from "../content/assets/images/sponsor_logos/index";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import '../content/styles/Sponsors.scss'

//Car 3 Sponsors - 2D Array [[logo, website link],...]
let platinum3 = get_platinum_sponsors("3");
let gold3 = get_gold_sponsors("3");
let silver3 = get_silver_sponsors("3");
let bronze3 = get_bronze_sponsors("3");
let valued3 = get_valued_sponsors("3");

//Car 4 Sponsors - 2D Array [[logo, website link],...]
let platinum4 = get_platinum_sponsors("4");
let gold4 = get_gold_sponsors("4");
let silver4 = get_silver_sponsors("4");
let bronze4 = get_bronze_sponsors("4");
let valued4 = get_valued_sponsors("4");
let patron4 = get_patrons("4");


function SponsorRow({ list, tier }) {
    return (
        <div id="sponsor-row">
            {list.map((sponsor, index) => {
                if (tier === "patron") {
                    return (
                        <h6 key={index} className="sponsor-item" id={tier}>
                            {sponsor}
                        </h6>
                    );
                } else {
                    return (
                        <a key={index} href={sponsor[1]} className="sponsor-item">
                            <img src={sponsor[0]} className="sponsor-logo" id={tier} />
                        </a>
                    );
                }
            })}
        </div>
    );
}


function ShowSponsors({car_num}) {
    if (car_num === "3") {
        return (
            <div>
                <h2 style={{paddingBottom: "10px"}}>Sunrider Sponsors</h2>
                <h6>2020 - 2024</h6>

                {/* PLATINUM */}
                <h3 style={{paddingTop: "8vw"}}>Platinum Sponsors</h3>
                <SponsorRow list={platinum3} tier={"platinum"}/>

                {/*/!* GOLD *!/*/}
                <h3>Gold Sponsors</h3>
                <SponsorRow list={gold3} tier={"gold"}/>

                {/*/!* SILVER *!/*/}
                <h3>Silver Sponsors</h3>
                <SponsorRow list={silver3} tier={"silver"}/>

                {/*/!* BRONZE *!/*/}
                <h3>Bronze Sponsors</h3>
                <SponsorRow list={bronze3} tier={"bronze"}/>

                {/*/!* VALUED *!/*/}
                <h3>Valued Sponsors</h3>
                <SponsorRow list={valued3} tier={"valued"}/>
            </div>
        );
    }
    else {
        return (
            <div>
                <h2 style={{paddingBottom: "10px"}}>Flare Sponsors</h2>
                <h6>2024 - present</h6>

                {/* PLATINUM */}
                <h3 style={{paddingTop: "8vw"}}>Platinum Sponsors</h3>
                <SponsorRow list={platinum4} tier={"platinum"}/>

                {/* GOLD */}
                <h3>Gold Sponsors</h3>
                <SponsorRow list={gold4} tier={"gold"}/>

                {/* SILVER */}
                <h3>Silver Sponsors</h3>
                <SponsorRow list={silver4} tier={"silver"}/>

                {/* BRONZE */}
                <h3>Bronze Sponsors</h3>
                <SponsorRow list={bronze4} tier={"bronze"}/>

                {/* VALUED */}
                <h3>Valued Sponsors</h3>
                <SponsorRow list={valued4} tier={"valued"}/>

                {/* SOLAR CELL PATRONS */}
                <h3>Solar Cell Patrons</h3>
                <SponsorRow list={patron4} tier={"patron"}/>

            </div>
        );
    }
}

export default function Sponsor() {
    const [carNum, setCarNum] = useState("4");
    const [carName, setCarName] = useState("Flare");

    //react hook functions
    function SetCar() {
        if(carNum === "3") {
            setCarNum("4");
            setCarName("Flare");
        }
        else {
            setCarNum("3");
            setCarName("Sunrider");
        }
    }

    return (
        <React.Fragment>
            {/*  Page Header */}
            <Header title={"Our Sponsors"} imgcss={"sponsor-header-img"}/>

            {/*  Sponsorship Blurb */}
            <Container fluid="true" className="section" style={{background: "#283f8c"}}>
                <Row className="no-margin-padding" style={{justifyContent: "center"}}>
                    <p className={"body-text-white"} style={{textAlign: "center"}}>
                        Our mission to show the potential of solar energy is made possible by our wonderful sponsors.
                        Their generosity and commitment to sustainability are instrumental in helping us
                        design, build and test our solar cars. Thank you.
                    </p>
                </Row>
            </Container>

            {/*  Dropdown Menu  */}
            <Container fluid="true" className="section">

                {/* MARIA This is temporarily commented out.
                    Uncomment out once Car 4 sponsors are completed */}
                <Col style={{justifyContent: "center", marginBottom: "10vw"}}>
                    <Dropdown onSelect={(car) => SetCar()}>
                        <Dropdown.Toggle className="btn-transparent" variant={"btn-transparent"} style={{justifyContent: "center", alignItems: "center"}}>
                          <h5 id={"sponsor-dropdown-h5"}>Car {carNum} - {carName}</h5>
                            </Dropdown.Toggle>

                       <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} car="3">Car 3 - Sunrider</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} car="4">Car 4 - Flare</Dropdown.Item>
                        </Dropdown.Menu>
                   </Dropdown>
                </Col>

                {/*Display Sponsor Logos*/}
                <ShowSponsors car_num={carNum}/>

                <Row style={{justifyContent: "center", alignContent: "center", marginTop: "8vw"}}>
                    <h4 id={"sponsor-h4"}>Interested in becoming a sponsor?</h4>
                    <Button className="btn-primary" style={{left: "0", marginTop: "2vw"}}
                            as={Link} to={"/donate"}
                            onClick={() => {window.scroll(0,0);}}>
                        Learn More
                    </Button>
                </Row>
            </Container>


        </React.Fragment>
    )
}
