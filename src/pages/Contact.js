import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'
import ReactGA from 'react-ga'
import "../content/styles/Contact.scss";
import "./Contact.css";


export default function Contact() {

    let   [ captcha, setCaptcha ] = useState(null)
    const [ validated, setValidated ] = useState(false)
    const [ errorMsg, setErrorMsg ] = useState("")
    const [ successMsg, setSuccessMsg ] = useState("")
    const [ submitting, setSubmitting ] = useState(false)

    const heroRef = useRef(null)

    // hero parallax and the top menu hiding while scrolling down
    useEffect(() => {
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        let frame = null;
        let lastY = window.scrollY;

        const update = () => {
            frame = null;
            const hero = heroRef.current;
            if (hero && !reduce) {
                const y = Math.min(window.scrollY, window.innerHeight * 1.2);
                hero.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
            }
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (y <= 10) {
                document.body.classList.remove('nav-hidden');
            } else if (Math.abs(y - lastY) > 2) {
                document.body.classList.toggle('nav-hidden', y > lastY);
            }
            lastY = y;
            if (frame === null) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
            document.body.classList.remove('nav-hidden');
        };
    }, []);


    let onSubmit = (event) =>  {
        event.preventDefault()
        setErrorMsg("")
        setSuccessMsg("")
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return
        }

        let email = document.getElementById('contact-email')?.value
        let name = document.getElementById('contact-name')?.value
        let msg = document.getElementById('contact-msg')?.value

        if (!captcha) {
            return setErrorMsg("Please verify the reCaptcha.")
        }
        
        //set submitting true to disable form
        setSubmitting(true)

        axios.post('https://api.ufsolargators.org/api/contact', {
            email: email,
            name: name,
            msg: msg,
            token: captcha
        })
        .then(({ data: response }) => {
            /* success: boolean
                    msg: string
            */

            if (response.success) {
                ReactGA.event({
                    category: 'User',
                    action: 'Successfully submitted Contact Form'
                  })
                //good
                setSuccessMsg("Message sent!")
                document.getElementById('contact-email').value = ""
                document.getElementById('contact-name').value = ""
                document.getElementById('contact-msg').value = ""
            }
            else {
                setErrorMsg(response?.msg)
                ReactGA.event({
                    category: 'User',
                    action: 'User error submitting form'
                  })
            }

            //enable submitting
            setSubmitting(false)
        })
        .catch(({data: response}) => {
            setErrorMsg(response?.msg ?? "There has been an internal error.")
            //enable submitting
            setSubmitting(false)

            ReactGA.event({
                category: 'Error',
                action: 'Got an error while submitting form (PROGRAMMING ERROR)'
              })
        })
    }

    return (
        <div className="ct-page">

            {/* ---------- Hero ---------- */}
            <header className="ct-hero" ref={heroRef}>
                {/* the same photo the Contact page header used before */}
                <div className="ct-hero__bg contact-header-img" />
                <div className="ct-hero__inner">
                    <p className="ct-hero__eyebrow">University of Florida</p>
                    <h1 className="ct-hero__title">Contact Us</h1>
                </div>
                <div className="ct-hero__cue" aria-hidden="true">
                    <span>Scroll</span>
                    <i />
                </div>
            </header>

            {/* ---------- Form ---------- */}
            <section className="ct-sec">
                <div className="ct-card">
                    <h2 className="ct-card__title">Send Us a Message</h2>
                    <p className="ct-card__lead">
                        Questions, sponsorship ideas, or just want to say hi?
                        Fill out the form below.
                    </p>

                    { errorMsg ? <Alert variant="danger" >
                        {errorMsg}
                    </Alert> : "" }

                    { successMsg ? <Alert variant="success" >
                        {successMsg}
                    </Alert> : "" }

                    <Form onSubmit={onSubmit} validated={validated} noValidate>
                        <Form.Group controlId="formBasicEmail" className="ct-field">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" id="contact-name" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter your name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="ct-field">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="contact-email" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter your email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" className="ct-field">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="5" placeholder="Hey Solar Gators..." id="contact-msg" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter your message.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_ReCAPTCHA}
                            onChange={setCaptcha}
                            theme="dark"
                            className="ct-captcha"
                        />

                        <Button
                            variant="primary"
                            type="submit"
                            className="ct-submit"
                            disabled={submitting}>
                            {submitting ? "Sending..." : "Submit"}
                        </Button>
                    </Form>
                </div>
            </section>
        </div>
    )
}