import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const FoodItemForListComponent = ({ foodItemId, name, description, price, image }) => {
    const cursorP = { cursor: "pointer" }
    return (
        <Container>
            <Row xs={1} md={2}>
                <Card className="bg-danger text-white p-1 m-1 bg-opacity-50 border-start" style={{ maxWidth: "600px", backgroundColor: " rgb(255, 30, 22)", color: "white" }}>
                    <LinkContainer style={cursorP} to={`/foodItem-detail/${foodItemId}`}>
                    <Row>
                        <Col lg={5}>
                            <Card.Img
                                crossOrigin='anonymous'
                                variant="top"
                                src={image ? image.path : ''} />
                        </Col>
                        <Col lg={7}>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                <Card.Text className="h4">{price}/-{"  "}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    </LinkContainer>
                </Card>
            </Row>
        </Container>
    )
};
export default FoodItemForListComponent;