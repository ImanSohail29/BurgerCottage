import { Col, Container, Row } from "react-bootstrap";

const Footer=()=>{
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col className="bg-dark text-white text-center py-5  bg-opacity-50">
                        Copyright &copy; Shop Best Burgers Online
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;