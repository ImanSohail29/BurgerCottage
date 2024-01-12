import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot, faMapLocationDot,faPhone } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col className="bg-dark text-white text-center text-muted py-4  bg-opacity-50">
                        <small>
                        Copyright &copy; Shop Best Burgers Online{" "}
                        <div>
                        <a className="fa fa-location text-secondary link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-5" icon={faPhone} ></FontAwesomeIcon>{" "}03453007757
                        </a>
                        </div>
                        <div>
                        <a href="https://www.facebook.com/Burgercottagedha/" className="fa fa-facebook text-primary  link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-5" icon={faFacebook} ></FontAwesomeIcon>{" "}Burger Cottage
                        </a>
                        </div>
                        <div>
                        <a href="https://www.instagram.com/burgercottage97?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="fa fa-instagram text-danger link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-5" icon={faInstagram} ></FontAwesomeIcon>{" "}burgercottage97
                        </a>
                        </div>
                        <div>
                        <a href="https://maps.app.goo.gl/GnKoHdgP7qgZXCJF9?g_st=ic" className="fa fa-location text-success link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-5" icon={faMapLocationDot} ></FontAwesomeIcon>{" "}89, Block C2 Block C 2 Nespak Housing Scheme, Lahore, Punjab
                        </a>
                        </div>
                       
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;