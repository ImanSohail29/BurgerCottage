import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const FoodItemForListComponent = ({ foodItemId, name, description, size, image, discount }) => {
    const cursorP = { cursor: "pointer" }
    return (
        <div style={{background:(`${image.path}`)}}>
        <Card className="bg-danger text-white p-1 bg-opacity-50 border-start" style={{ color: "black",margin:"1px", maxHeight: "400px" }}>
            <LinkContainer style={cursorP} to={`/foodItem-detail/${foodItemId}`}>
                <Row>
                        <Card.Img style={{ height: "200px",width:"500px" }}
                            crossOrigin='anonymous'
                            variant="top"
                            src={image ? image.path : ''} />
                    <Card.ImgOverlay>
                            <Card.Title className="text-dark fw-bold bg-opacity-50 bg-white">{name}</Card.Title>
                            <Card.Text className="text-dark fw-bold bg-opacity-50 bg-white">
                                {description}
                            </Card.Text>
                            {discount.figure > 0 ? (
                                <>
                                      <Card.Text className="h5 text-dark fw-bold bg-opacity-50 bg-white"><s>Rs.{size[0].price}/-</s>{"  "}</Card.Text>
                                      <Card.Text className="h3 text-dark fw-bold bg-opacity-50 bg-white">Rs.{Math.ceil((size[0].price)-(((discount.figure)*(size[0].price))/100))}/-{"  "}</Card.Text>
                                </>
                            ) : (
                                <Card.Text className="h4 text-dark fw-bold bg-opacity-50 bg-white">Rs.{size[0].price}/-{"  "}</Card.Text>
                            )}
                        </Card.ImgOverlay>
                </Row>
            </LinkContainer>
        </Card>
        </div>
    )
};
export default FoodItemForListComponent;