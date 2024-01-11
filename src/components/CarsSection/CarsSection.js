import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {Link} from "react-router-dom";
import car1 from "../../content/assets/images/car_pics/Torch/torch_ontrack_clean.jpg";
import car2 from "../../content/assets/images/car_pics/Cielo/IMG_9219.JPG";
import car3 from "../../content/assets/images/car_pics/sunrider/2022/AND02053.JPG";
import './CarsSection.scss'

function Car({car_img, car_name, car_year1, car_year2}) {
    //creates each car's container for image & hover description
    let scroll_pos = "/cars#" + car_name;
    console.log("scroll pos " + scroll_pos);
    return (
        // <Link className="car-card" to={"/cars"} onClick={() => {window.scroll(0,0);}} >
        <a className="car-card" href={scroll_pos}>
            <img className="car-card-img" src={car_img} alt={"car_img"}/>
            <div className="overlay">
                <div className="overlay-text-header">{car_name}</div>
                <div className="overlay-text-body">{car_year1} - {car_year2}</div>
            </div>
        </a>
         // {/*</Link>*/}
    )
}

export default function CarsSection({mobileView}) {
    return (
        <Container fluid="true" className="section">
            <Row>
                <h2>Our Cars</h2>
            </Row>
            <Row className={"car-cards"}>
                <Car car_img={car1} car_name={"Torch"} car_year1={"2017"} car_year2={"2018"}/>
                <Car car_img={car2} car_name={"Cielo"} car_year1={"2018"} car_year2={"2019"}/>
                <Car car_img={car3} car_name={"Sunrider"} car_year1={"2020"} car_year2={"2023"}/>
            </Row>
        </Container>
    )
}
