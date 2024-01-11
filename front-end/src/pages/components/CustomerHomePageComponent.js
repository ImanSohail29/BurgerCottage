import { Button, Container, Row,Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import MetaComponent from "../../components/MetaComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger,faPizzaSlice,faDrumstickBite,faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons'


const CustomerHomePageComponent = () => {
    return (
        <>            <MetaComponent></MetaComponent>
                <Container className="mt-5 justify-content-center">
                    <Row className="justify-content-center">
                        <Col md={6} xs={8} lg={4} sm={6} >
                            <LinkContainer className="btn btn-warning border border-start opacity-75 w-100" to="/fooditem-list" >
                                <Button className="p-4" variant="primary" size="lg"><h3>Place Your Order</h3>
                                
                                <FontAwesomeIcon icon={faBurger} />{" "}<FontAwesomeIcon icon={faPizzaSlice} />{" "}<FontAwesomeIcon icon={faDrumstickBite} />{" "}<FontAwesomeIcon icon={faMartiniGlassCitrus} />
                                </Button>
                            </LinkContainer>
                        </Col>

                    </Row>
                </Container>
        </>


    )
}
export default CustomerHomePageComponent;