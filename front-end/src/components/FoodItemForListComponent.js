import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const FoodItemForListComponent = ({ foodItemId, name, description, size, image }) => {
    const cursorP = { cursor: "pointer" }
    return (
                <Card className="bg-danger text-white p-1 m-1 bg-opacity-50 border-start" style={{ backgroundColor: " rgb(255, 30, 22)", color: "white",maxHeight:"400px" }}>
                    <LinkContainer style={cursorP} to={`/foodItem-detail/${foodItemId}`}>
                    <Row>
                        <Col lg={5}>
                            <Card.Img style={{maxHeight:"200px", padding:"4px"}}
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
                                <Card.Text className="h4">Rs.{size[0].price}/-{"  "}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    </LinkContainer>
                </Card>
    )
};
export default FoodItemForListComponent;