import React, { useState } from 'react'
import {
  Link
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Header from '../components/Header'


import MailchimpSubscribe from "react-mailchimp-subscribe"

import aboutUs1 from '../content/assets/images/about_us_1.JPG'
import aboutUs2 from '../content/assets/images/about_us_2.jpg'

import event1 from '../content/assets/images/event_1.jpg'
import event2 from '../content/assets/images/event_2.jpg'

import team1 from '../content/assets/images/team_1.JPG'
import team2 from '../content/assets/images/team_2.jpg'

import contact1 from '../content/assets/images/contact_us_1.jpg'
import contact2 from '../content/assets/images/contact_us_2.jpg'

import sponsors1 from '../content/assets/images/sponsors_1.jpg'
import sponsors2 from '../content/assets/images/sponsors_2.jpg'



function HomeIcon({icon, children}) {
  return (
    <Col md={3}>
        <i class={`fas ${icon} home-icon`} />
        <br />
        <p className="mt-1 home-icon-text">{children}</p>
    </Col>
  )
}

function HomeCard({im1, im2, linkTitle, link, children, index}) {
  return (
    <Col 
    xl={{span: 2, offset: index == 0 ? 0 : 0}} 
    lg={{ span: 4, offset: index == 3 ? 2 : 0 }} md={6}
    className={`
    mt-xl-0 ${index == 3 || index == 4 ? "mt-lg-4" : "mt-lg-0"}
    ${index == 2 || index == 3 || index == 4 ? "mt-md-4" : "mt-md-0"}
    mt-sm-4
    ml-auto mr-auto`}>
      <Card className="home-card m-auto h-100">
        <div className="home-card-images">
          <Card.Img src={im1} />
          <Card.Img src={im2} className="home-card-hidden" />
        </div>
        <Card.Body className="home-card-body text-center d-table m-auto">
          <p className="m-auto">{children}</p>
        </Card.Body>
        <Button variant="home-card" className="w-100 btn-sm" as={Link} to={link}>{linkTitle}</Button>
      </Card>
    </Col>
  )
}

const SubscriptionForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
    });

  return (
    <Container>
      <Row noGutters={true}>
        <Col xs = {{offset: 2, span: 8}} md = {{span: 6, offset: 3}} lg = {{span:4, offset: 4}}>
        {status === "sending" && <div style={{ color: "blue", textAlign: "center" }}>Sending...</div>}
        {status === "error" && (
          <div
            style={{ color: "red", textAlign: "center"}}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "green", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        </Col>
      </Row>
          
      <Row noGutters={false}>
        <Col xs = {{offset: 2, span: 8}} md = {{span: 6, offset: 3}} lg = {{span:4, offset: 4}}>
          <Row noGutters={true}>
            <Col xs = {{span: 8}}>
              <input
                style={{ fontSize: "1.4em", marginTop: "1rem", width: "100%", height: "85%"}}
                ref={node => (email = node)}
                type="email"
                placeholder="Email Address"
              />
            </Col>
            <Col className = "ml-1" xs = {{span: 3}}> 
              <Button className="btn-subscription" onClick={submit}>
                Go!
              </Button>
            </Col>     
          </Row>
        </Col>  
        <Col xs = {{offset: 4, span:4}} md = {{offset: 5, span: 2}}> 

        </Col>
      </Row>
    </Container>
  );
};

export default function Home() {
    return (
      <React.Fragment>
        <Header className="home-section">
          <Container fluid={true}>
            <Row>
              <Col md={{ offset: 1 }}>
                <h1 id="home-header" className="ui left aligned header">Solar Gators</h1>
              </Col>
            </Row>
            <Row className="home-break-line">
              <Col md={{ span: 5, offset: 1 }}>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 11, offset: 1 }}>
                <Link className="btn btn-inverse" to="/about">about us</Link>
                <Link className="btn btn-inverse ml-1" to="/sponsors">sponsors</Link>
                <Link className="btn btn-inverse ml-1" to="/team">our team</Link>
                <Link className="btn btn-inverse ml-1" to="/contact">contact us</Link>
              </Col>
            </Row>
          </Container>
        </Header>
        <Container>
          <Row className="section">
            <Col md={{span: 8, offset: 2}}>
              <h2 className="ui dividing header" style={{opacity: '0.8'}}>
                  BRINGING STUDENTS TOGETHER
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={{span: 8, offset: 2}}>
              <hr />
              <p>Solar Gators is a University of Florida student organization driven by passionate engineers and designers determined to win the Formula Sun Grand Prix</p>
            </Col>
          </Row>

          <Card className="section">
            <Card.Body>
              <Row className="text-center home-icon">
                <HomeIcon icon="fa-wrench">2 cars built</HomeIcon>
                <HomeIcon icon="fa-trophy">Founded in 2012</HomeIcon>
                <HomeIcon icon="fa-users">17 sub-engineering teams</HomeIcon>
                <HomeIcon icon="fa-certificate ">25+ sponsors</HomeIcon>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <Container fluid={true} className="container-home-cards p-0">
          <Row className="section">
            <HomeCard index={0} im1={aboutUs1} im2={aboutUs2} linkTitle="About Us" link="/about">Our organization goes way back. Learn more about our history.</HomeCard>
            <HomeCard index={1} im1={team1} im2={team2} linkTitle="The Team" link="/team">Solar Gators is a University of Florida student organization driven by passionate engineers and designers determined to win the Formula Sun Grand Prix.</HomeCard>

            <HomeCard index={2} im1={event1} im2={event2} linkTitle="Events" link="/events">Solar Gators provides many opportunities and activities. Find out when and where.</HomeCard>
            <HomeCard index={3} im1={contact1} im2={contact2} linkTitle="Contact Us" link="/contact">Shoot as an email with any inquiry or question you have about us.</HomeCard>
            <HomeCard index={4} im1={sponsors1} im2={sponsors2} linkTitle="Sponsors" link="/sponsors">All of this is possible because of our sponsors. Check them out.</HomeCard>
          </Row>
        </Container>
        <Container>
          <Row className="section">
            <Col md={{span: 8, offset: 2}}>
              <h2 className="ui dividing header" class="text-center" style={{opacity: '0.8'}}>
                  Subscribe to our Monthly Newsletter!
              </h2>
            </Col>
          </Row>
        </Container>
        <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} 
                  render={({ subscribe, status, message }) => (
                    <SubscriptionForm
                      status={status}
                      message={message}
                      onValidated={formData => subscribe(formData)}
                    />
                  )}
        />
      </React.Fragment>
    )
}
