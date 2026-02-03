import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import {get_eboard, get_pms, get_mech, get_elec, get_comp_team, get_webdev, get_ces} from "../content/assets/images/officers/index";
import Header from "../components/Header";
import linkedinLogo from "../content/assets/images/app_icons/linkedin_logo.png";

//2025-26 Officers: (Names, Positions, Headshots)
let executive_board25= get_eboard("2025");
let pms25 = get_pms("2025");
let ces25 = get_ces("2025")
let mech_aero25 = get_mech("2025");
let electrical25 =  get_elec("2025");

//2024-25 Officers: (Names, Positions, Headshots)
let executive_board24= get_eboard("2024");
let pms24 = get_pms("2024");
let ces24 = get_ces("2024")
let mech_aero24 = get_mech("2024");
let electrical24 =  get_elec("2024");
//let webdev24 = get_webdev("2024");


//2023-24 Officers: (Names, Positions, Headshot)
let executive_board23 = get_eboard("2023");
let pms23 = get_pms("2023");
let mech_aero23 = get_mech("2023");
let electrical23 =  get_elec("2023");
let webdev23 = get_webdev("2023");


//2022-23 Officers: (Names, Positions, Headshot)
let executive_board22 = get_eboard("2022");
let pms22 = get_pms("2022");
let mech_aero22 = get_mech("2022");
let electrical22 =  get_elec("2022");
let competition_team22 = get_comp_team("2022");


//2021-22 Officers
let executive_board21 = get_eboard("2021");
//let pms21 = get_pms("2021"); //aerobody: Pierre Angibaud
let mech_aero21 = get_mech("2021");
let electrical21 = get_elec("2021");
let competition_team21 = get_comp_team("2021");


//2020-21 Officers
let executive_board20 = get_eboard("2020");
//let pms20 = get_pms("2020");


//2019-20 Officers
let executive_board19 = get_eboard("2019");
//let pms19 = get_pms("2019");


function AcademicYear({ eventkey }) {
    let year1;
    let year2;

    if (eventkey === "201920") {
        year1 = 2019;
        year2 = 2020;
    } else if (eventkey === "202021") {
        year1 = 2020;
        year2 = 2021;
    } else if (eventkey === "202122") {
        year1 = 2021;
        year2 = 2022;
    } else if (eventkey === "202223") {
        year1 = 2022;
        year2 = 2023;
    } else if (eventkey === "202324") {
        year1 = 2023;
        year2 = 2024;
    } 
    else if (eventkey === "202425"){
        year1 = 2024
        year2 = 2025
    }
    else if (eventkey === "202526"){
        year1 = 2025
        year2 = 2026
    }
    return (
        <h5>{year1} - {year2}</h5>
    );
}

function OfficerTeam({ eventkey, executive_board, on_mobile }) {

    //Individual Officer
    let Officer = ({ name, title, img, linkedin }) => {
        let padding = 13.5;
        if (on_mobile) {
            padding = 2;
        }
        //to align title properly for people with long name
        if (name.length > 19) {
            padding = 2;
        }
        return (
            <Col className="officer-col">
                <div className={"officer-container"}>
                    <div className={"headshot"}>
                        <img className={"headshot-img"} src={img} alt={"headshot"}/>
                    </div>
                {/*Added LinkedIn Profiles to All  2025-26 Members*/}    
                

                {/* Name + optional LinkedIn icon */}
                <h5 style={{ paddingBottom: padding, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", }}>
                    {name}
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "0.5rem" }}>
                            <img src={linkedinLogo} alt="LinkedIn" style={{ width: "20px", height: "20px" }} />
                        </a>
                    )}
                </h5>

                <h6 style={{ paddingTop: padding }}>{title}</h6>
            </div>
        </Col>
    )
}    


    //Row of officers in same category
    let OfficersRow = ({heading, officers}) => {
        return (
            <Row className="no-margin-padding" style={{justifyContent: "center"}}>
                <h2 id="officer-category-heading">{heading}</h2>
                {officers[0] ? <Officer name={officers[0][0]} title={officers[0][1]} img={officers[0][2]} linkedin={officers[0][3]}/> : ""}
                {officers[1] ? <Officer name={officers[1][0]} title={officers[1][1]} img={officers[1][2]} linkedin={officers[1][3]}/> : ""}
                {officers[2] ? <Officer name={officers[2][0]} title={officers[2][1]} img={officers[2][2]} linkedin={officers[2][3]}/> : ""}
                {officers[3] ? <Officer name={officers[3][0]} title={officers[3][1]} img={officers[3][2]} linkedin={officers[3][3]}/> : ""}
                {officers[4] ? <Officer name={officers[4][0]} title={officers[4][1]} img={officers[4][2]} linkedin={officers[4][3]}/> : ""}
                {officers[5] ? <Officer name={officers[5][0]} title={officers[5][1]} img={officers[5][2]} linkedin={officers[5][3]}/> : ""}
            </Row>
        )
    }

    //Competition Team
    let CompList = ({list}) => {
        let Loop = () => {
            const allNames = [];    //array of div rows
            let name_col0 = [];
            let name_col1 = [];

            let midpoint = Math.floor(list.length / 2);
            list.forEach(printName);

            function printName(value, index, array) {
                if (index < midpoint) {
                    name_col0.push(<p>{value}</p>);
                }
                else {
                    name_col1.push(<p>{value}</p>);
                }
            }

            allNames.push(<div className={"comp_name_col"}>{name_col0}</div>)
            allNames.push(<div className={"comp_name_col"}>{name_col1}</div>)
            return <div id={"comp_names"}>{allNames}</div>;
        }

        return (
            <>
                <h3>Competition Team</h3>
                <div className={"comp_team_container"}>
                    <Loop/>
                </div>
            </>
        )

    }

    //Switch Academic Year
    if (eventkey === "202526") {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board25}/>
                <OfficersRow heading="Chief Engineers" officers={ces25}/>
                <OfficersRow heading="Project Managers" officers={pms25}/>
                <OfficersRow heading="Mechanical and Aerobody" officers={mech_aero25}/>
                <OfficersRow heading="Electrical" officers={electrical25}/>
                {/*<OfficersRow heading="Web Development" officers={webdev24}/>*/}
                {/*<CompList list={competition_team23}/>*/}
            </Col>
        )
    }
    else if (eventkey === "202425") {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board24}/>
                <OfficersRow heading="Chief Engineers" officers={ces24}/>
                <OfficersRow heading="Project Managers" officers={pms24}/>
                <OfficersRow heading="Mechanical and Aerobody" officers={mech_aero24}/>
                <OfficersRow heading="Electrical" officers={electrical24}/>
                {/*<OfficersRow heading="Web Development" officers={webdev24}/>*/}
                {/*<CompList list={competition_team23}/>*/}
            </Col>
        )
    }
    else if (eventkey === "202324") {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board23}/>
                <OfficersRow heading="Project Managers" officers={pms23}/>
                <OfficersRow heading="Mechanical and Aerobody" officers={mech_aero23}/>
                <OfficersRow heading="Electrical" officers={electrical23}/>
                <OfficersRow heading="Web Development" officers={webdev23}/>
                {/*<CompList list={competition_team23}/>*/}
            </Col>
        )
    }
    else if (eventkey === "202223") {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board22}/>
                <OfficersRow heading="Project Managers" officers={pms22}/>
                <OfficersRow heading="Mechanical and Aerobody" officers={mech_aero22}/>
                <OfficersRow heading="Electrical" officers={electrical22}/>
                <CompList list={competition_team22}/>
            </Col>
        )
    }
    else if (eventkey === "202122") {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board21}/>
                {/*<OfficersRow heading="Project Managers" officers={pms21}/>*/}
                <OfficersRow heading="Mechanical and Aerobody" officers={mech_aero21}/>
                <OfficersRow heading="Electrical" officers={electrical21}/>
                <CompList list={competition_team21}/>
            </Col>
        )
    }
    else {
        return (
            <Col className="no-margin-padding" style={{justifyContent: "center"}}>
                <OfficersRow heading="Executive Board" officers={executive_board}/>
            </Col>
        )
    }
}

export default class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            executive_board: executive_board23,
            eventkey: "202526"
        }
    }

    render() {
        /* mql = media query list (https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35) */
        const mql = window.matchMedia('(max-width: 425px)');
        let mobileView = mql.matches;

        return (
            <React.Fragment>
            <Header title={"Our Team"} imgcss={"team-header-img"}/>

            {/*  Page Contents  */}
            <Container fluid="true" className="section" style={{background: "#283f8c"}}>
                {/*  Dropdown Menu  */}
                <Col style={{justifyContent: "center"}}>
                    <Dropdown onSelect={
                        (eventKey) => {
                            if (eventKey === "201920") {
                                this.setState((state) => {
                                    return { executive_board: executive_board19, eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202021") {
                                this.setState((state) => {
                                    return { executive_board: executive_board20,eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202122") {
                                this.setState((state) => {
                                    return { executive_board: executive_board21, eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202223") {
                                this.setState((state) => {
                                    return { executive_board: executive_board22, eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202324") {
                                this.setState((state) => {
                                    return { executive_board: executive_board23, eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202425") {
                                this.setState((state) => {
                                    return { executive_board: executive_board24, eventkey: eventKey }
                                });
                            }
                            if (eventKey === "202526") {
                                this.setState((state) => {
                                    return { executive_board: executive_board25, eventkey: eventKey }
                                });
                            }
                        }}
                    >
                        <Dropdown.Toggle className="btn-transparent" variant={"btn-transparent"} style={{justifyContent: "center", alignItems: "center"}}>
                            <AcademicYear eventkey={this.state.eventkey} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="201920">2019 - 2020</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202021">2020 - 2021</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202122">2021 - 2022</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202223">2022 - 2023</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202324">2023 - 2024</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202425">2024 - 2025</Dropdown.Item>
                            <Dropdown.Item className="dropdown-row" style={{color: "white"}} eventKey="202526">2025 - 2026</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
              </Col>

                <OfficerTeam eventkey={this.state.eventkey} executive_board={this.state.executive_board} on_mobile={mobileView}/>

            </Container>
            </React.Fragment>
        );
    }
}
