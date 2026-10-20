import React from 'react'
import Container from 'react-bootstrap/Container'
import Header from "../components/Header";
import {TeamAppsList} from "../content/TeamAppsList";
import '../content/styles/TeamApps.scss'

function AppCard({name, description, link}) {
    //creates one clickable card that opens the app in a new tab
    return (
        <a className="team-app-card" href={link} target="_blank" rel="noopener noreferrer">
            <h4 className="team-app-name">{name}</h4>
            <p className="team-app-description">{description}</p>
            <span className="team-app-open">Open ↗</span>
        </a>
    )
}

export default function TeamApps() {
    return (
        <React.Fragment>
            {/*  Page Header */}
            <Header title={"Team Apps"} imgcss={"team-apps-header-img"}/>

            {/*  Blurb */}
            <Container fluid="true" className="section" style={{background: "#283f8c"}}>
                <p className={"body-text-white"} style={{textAlign: "center"}}>
                    Tools built by Solar Gators members to design, build, and race our cars.
                </p>
            </Container>

            {/*  App Cards - to add an app, edit src/content/TeamAppsList.js */}
            <Container fluid="true" className="section">
                <div className="team-app-grid">
                    {TeamAppsList.map((app) => (
                        <AppCard key={app.name} name={app.name} description={app.description} link={app.link}/>
                    ))}
                </div>
            </Container>
        </React.Fragment>
    )
}
