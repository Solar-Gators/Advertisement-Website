import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import sponsorshipTiers from '../content/assets/images/uncategorized/SponsorshipTiers2425.png'
import sponsorshipPacket from '../content/assets/2025-2026 Solar Gators Sponsorship Packet Digital.pdf'
let donateLink = "https://www.uff.ufl.edu/giving-opportunities/027995-mae-solar-gators/"

export default function Donate() {
    return (
        <React.Fragment>
            {/*  Page Header  */}
            <Header title={"Sponsorship"} imgcss={"donate-header-img"}/>

            {/*  About Donations  */}
            <Container fluid="true" className="section">
                <Row className="no-margin-padding">

                    <h4>Why Your Support Matters</h4>
                    <p style={{paddingBottom: "25px"}}>
                        Your contributions are crucial to our mission of creating a brighter, more sustainable future 
                        through innovative solar car technology. By supporting us, you not only help us build
                        lighter, faster, and more efficient solar cars but also provide a platform for the
                        next generation of engineers to develop invaluable skills. Every donation, regardless of any 
                        size, significantly impacts our project and brings us closer to our goals. Your generosity 
                        fuels our progress and helps us push the boundaries of technology and sustainability, 
                        benefitting both communities and the environment.
                    </p>
                </Row>
                
            
                {/*  Embedded Youtube Video  */}
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <iframe width="560"  height="315" src="https://www.youtube.com/embed/Sz-C6v9zVRY?si=qyF64xAKWlNyvmQ_&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                

                <Row className="no-margin-padding">
                    <h4>How to Contribute</h4>

                    <p>We offer a variety of different sponsorship options and value all forms of support.
                        Whether you are an individual, business, or community group, your generosity helps us move
                        closer to our goals. Here's how you can make a difference:
                    </p>

                    <ul style={{paddingLeft: "2.5rem"}}>
                        <li>Online Donations: Contribute through the University of Florida MAE Solar Gators Foundation Account.
                            Please note that there is a 5% gift tax applied to all donations, as well as an additional 3% for donations made by credit.
                            We encourage sponsors to retain their receipts for tax deduction purposes.
                        </li>
                        <li>Other Ways to Give: If you would prefer to make a contribution by check or donate materials, please contact us 
                            at <a href='mailto:info@ufsolargators.org'><span style={{color: "#F37833", fontWeight: "500", display: "inline"}}>info@ufsolargators.org</span></a>. Every 
                            little bit helps, and in-kind donations are just as valuable to us as financial contributions.
                        </li> 
                    </ul>
                        
                </Row>

                <p style={{paddingTop: "25px"}}>
                A project of this scale would not be possible without the generosity and support of our sponsors.
                No matter the size of your donation, you play a crucial role in fostering innovation and sustainability.
                We are grateful for your consideration and look forward to partnering with you on this exciting journey.
                </p>

                {/* Donate Button */}
                <Row>
                    <Button className="btn-primary" id="large-btn" href={donateLink} target="_blank" >
                        Make Online Donation
                    </Button>
                </Row>
            </Container>

            <div className={"horizontal-line"}/>

            {/* Tiers */}
            <Container fluid="true" className="section">
                <h2>Sponsorship Tiers</h2>
                <Row>
                    <Col>
                        <img style={{width: '100%',paddingLeft: "6%", paddingRight: "6%", opacity: 1}} src={sponsorshipTiers} alt="photo" />
                    </Col>
                </Row>
                <Button className="btn-primary" style={{width: "300px", left: "calc(50% - 300px/2 + 2px)", marginTop: "3rem"}} href={sponsorshipPacket} target="_blank">
                    Full Sponsorship Packet
                </Button>
                <h6 style={{paddingTop: "70px", paddingBottom: "0"}}>
                    All donations are tax deductible. Solar Gators is a 501(c)(3) nonprofit organization. Tax forms available upon request.
                </h6>
            </Container>


        </React.Fragment>
    )
}