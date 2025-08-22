import React from 'react'
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'



import logo from '../content/assets/images/logo2.png'
import facebook from '../content/assets/images/app_icons/facebook_logo0.png'
import instagram from '../content/assets/images/app_icons/instagram_logo.png'
import linkedin from '../content/assets/images/app_icons/linkedin_logo copy.png'
import youtube from '../content/assets/images/app_icons/youtube_logo0.png'

function Social_App({logo_img, url_link}) {
    return (
        <Button className={"btn-social-media-icon"} onClick={() => { window.location.href = url_link }}>
            <img className={"app-icon"} src={logo_img} alt={"icon"}/>
        </Button>
    )
}

export default function Footer() {
    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;

    //Mobile
    if (mobileView) {
        return (
            <Container fluid="true" id="footer">
                <Col style={{padding: "0", margin: "0", alignContent: "center"}}>
                    {/* Social Media Links */}
                    <Row style={{padding: "0", margin: "0", justifyContent: "center"}}>
                        <Social_App logo_img={facebook}
                                    url_link={"https://www.facebook.com/UFSolarGators/"}/>
                        <Social_App logo_img={instagram}
                                    url_link={"https://www.instagram.com/ufsolargators/"}/>
                        <Social_App logo_img={linkedin}
                                    url_link={"https://www.linkedin.com/company/ufsolargators/"}/>
                        <Social_App logo_img={youtube}
                                    url_link={"https://www.youtube.com/@ufsolargators/featured"}/>
                    </Row>
                    {/* Email */}
                    <Row className="row-container" style={{justifyContent: "center"}}>
                        <Link style={{color: '#F37833', padding: "0", marginTop: "10px"}} to={"/contact"}>info@ufsolargators.org</Link>
                    </Row>
                </Col>
            </Container>
        );
    }
    //Desktop & Tablet
    else {
        return (
            <Container fluid="true" id="footer">
                <Row className="row-container" style={{justifyContent: "end"}}>
                    {/* Logo */}
                    <Col className={"column-container"}>
                        <img id="sg-logo" src={logo}/>
                    </Col>

                    {/* Social Media Links */}
                    <Col className={"column-container"} style={{justifyContent: "center"}}>
                        <Row className="row-container">
                            <Social_App logo_img={facebook}
                                        url_link={"https://www.facebook.com/UFSolarGators/"}></Social_App>
                            <Social_App logo_img={instagram}
                                        url_link={"https://www.instagram.com/ufsolargators/"}></Social_App>
                            <Social_App logo_img={linkedin}
                                        url_link={"https://www.linkedin.com/company/ufsolargators/"}></Social_App>
                            <Social_App logo_img={youtube}
                                        url_link={"https://www.youtube.com/@ufsolargators/featured"}></Social_App>
                        </Row>
                    </Col>

                    {/* Email & Mailing Addresses */}
                    <Col className={"column-container"} style={{justifyContent: "end"}}>
                        <Link style={{color: 'white', alignSelf: "flex-end"}} to={"/contact"}>info@ufsolargators.org</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}
