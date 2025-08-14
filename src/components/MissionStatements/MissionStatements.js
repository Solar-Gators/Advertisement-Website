import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import './MissionStatements.scss'

let accent1="Accelerate"
let blurb1=" the world's transition to sustainable energy"
let accent2="Develop"
let blurb2=" gator engineers through hands-on design and manufacturing experience"
let accent3="Inspire"
let blurb3=" students to explore their interests within STEM and become the next generation of innovators shaping the future"
let accent4="Build"
let blurb4=" awareness within our community about the transformative potential of solar energy"


export default function MissionStatements({on_mobile, white_background, button}) {

    function MS() {
        let Text = ({accent, blurb}) => {
            if (white_background) {
                return (
                    <p style={{paddingBottom: "16px"}}>
                    <span className={"accent_word"}>{accent}</span>
                        {blurb}
                    </p>
                )
            }
            else {
                return (
                    <p className={"body-text-white"} style={{paddingBottom: "16px"}}>
                    <span className={"accent_word"} id={"orange_accent"}>{accent}</span>
                        {blurb}
                    </p>
                )
            }

        }

        if (on_mobile) {
            return (
                <Row className="no-margin-padding">
                    <Col >
                        <Text accent={accent1} blurb={blurb1}/>
                        <Text accent={accent2} blurb={blurb2}/>
                        <Text accent={accent3} blurb={blurb3}/>
                        <Text accent={accent4} blurb={blurb4}/>
                    </Col>
                </Row>
            )
        }
        else {
            return (
                <Row style={{justifyContent: "center"}}>
                    <Col className={"mission-statement"} style={{marginLeft: "0"}}>
                        <Text accent={accent1} blurb={blurb1}/>
                    </Col>
                    <Col className={"mission-statement"}>
                        <Text accent={accent2} blurb={blurb2}/>
                    </Col>
                    <Col className={"mission-statement"}>
                        <Text accent={accent3} blurb={blurb3}/>
                    </Col>
                    <Col className={"mission-statement"} style={{marginRight: "0"}}>
                        <Text accent={accent4} blurb={blurb4}/>
                    </Col>
                </Row>
            )
        }
    }

    function BTN() {
        if (button === true) {
            return (
                <Row>
                    <Button className="btn-primary" as={Link} to={"/about"}
                            onClick={() => {window.scroll(0,0);}}>
                        About Us
                    </Button>
                </Row>
            )
        }
        else {
            return (<></>)
        }
    }

   if (white_background) {
       return (
           <Container fluid="true" className="section">
               <Row>
                   <h2>
                       Our Mission
                   </h2>
               </Row>
               <MS/>
               <BTN/>
           </Container>
       )
   }
   else {
       return (
           <Container fluid="true" className="section" style={{background: "#283f8c"}}>
               <Row>
                   <h2>
                       Our Mission
                   </h2>
               </Row>
               <MS/>
               <BTN/>
           </Container>
       )
   }


}
