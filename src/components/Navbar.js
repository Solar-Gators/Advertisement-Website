import React, {useState} from 'react'
import logoImage from '../content/assets/images/logo2.png'
import { Link } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import '../content/styles/Button.scss'


export default function WebsiteNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    function MenuItems ({on_mobile}) {
        let CTAbtn = () => {
            return (
                <button className="sponsor-us-btn" id="nav-btn" onClick={() => { window.location.href = "/donate" }}>
                    Sponsor Us
                </button>
            )
        }

        let PageLink = ({path, tag}) => {
            return (
                <Nav.Link as={Link} to={path} className={"nav-link"}>{tag}</Nav.Link>
            )
        }

        let PageTabs = () => {
            return (
                <>
                    <PageLink path="/about" tag="About"/>
                    <PageLink path="/cars" tag="Cars"/>
                    <PageLink path="/team" tag="Team"/>
                    <PageLink path="/sponsors" tag="Sponsors"/>
                    <PageLink path="/contact" tag="Contact"/>
                </>
            )
        }

        if (on_mobile) {
            return (
                <Nav style={{textAlign: "center", alignItems: "center"}}>
                    <PageTabs/>
                    <div style={{alignContent: "center"}}>
                        <CTAbtn/>
                    </div>
                </Nav>
            )
        }
        else {
            return (
                <>
                    <Nav className="mr-auto" navbar style={{textAlign: "center"}}>
                        <PageTabs/>
                    </Nav>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <CTAbtn/>
                    </div>
                </>
            )
        }
    }

    /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
    const mql = window.matchMedia('(max-width: 425px)');
    let mobileView = mql.matches;

    if (mobileView) {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand as={Link} to="/" id={"nav-logo"}>
                    <img src={logoImage} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggle} aria-controls="responsive-navbar-nav">
                    <i className="navbar-toggler-icon" style={{border: "none"}}/>
                </Navbar.Toggle>
                <Navbar.Collapse navbar id="responsive-navbar-nav">
                    <MenuItems on_mobile={mobileView}/>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    else {
        return (
            <Navbar class="navbar navbar-expand-lg top navbar-scroll" color="light">
                <Navbar.Brand as={Link} to="/" id={"nav-logo"}>
                    <img src={logoImage} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse isOpen={isOpen} navbar>
                    <MenuItems on_mobile={mobileView}/>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
