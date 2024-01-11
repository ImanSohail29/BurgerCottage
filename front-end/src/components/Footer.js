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
                        <a href="https://www.facebook.com/Burgercottagedha/" className="fa fa-facebook text-primary fs-3">
                            <FontAwesomeIcon icon={faFacebook} ></FontAwesomeIcon>
                        </a>{" "}
                        <a href="https://www.instagram.com/burgercottage97?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="fa fa-instagram text-danger  fs-3">
                            <FontAwesomeIcon icon={faInstagram} ></FontAwesomeIcon>
                        </a>{" "}
                        <a href="https://www.instagram.com/burgercottage97?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="fa fa-location text-success  fs-3">
                            <FontAwesomeIcon icon={faMapLocationDot} ></FontAwesomeIcon>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;