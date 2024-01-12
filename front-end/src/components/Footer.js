import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col className="bg-dark text-white text-center py-5  bg-opacity-50">
                        Copyright &copy; Shop Best Burgers Online{" "}
                        <a href="https://www.facebook.com/Burgercottagedha/" className="fa fa-facebook text-primary  link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-3" icon={faFacebook} ></FontAwesomeIcon>Burger Cottage
                        </a>{" "}
                        <a href="https://www.instagram.com/burgercottage97?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="fa fa-instagram text-danger link-underline link-underline-opacity-0">
                            <FontAwesomeIcon className="fs-3" icon={faInstagram} ></FontAwesomeIcon>burgercottage97
                        </a>{" "}
                        <a href="https://maps.app.goo.gl/GnKoHdgP7qgZXCJF9?g_st=ic" className="fa fa-location text-success">
                            <FontAwesomeIcon className="fs-3" icon={faMapLocationDot} ></FontAwesomeIcon>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;