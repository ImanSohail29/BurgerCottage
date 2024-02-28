import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FoodItemForListComponent = ({ foodItemId, name, description, size, image, discount, dispatch, addToCartReduxAction }) => {
    const cursorP = { cursor: "pointer" }
    const [quantity, setQuantity] = useState(1)
    const [defaultSize, setDefaultSize] = useState()
    const [instructions, setInstructions] = useState("")
    const [defaultSelectedAddOns, setDefaultSelectedAddOns] = useState([])
    const [defaultSameProduct, setDefaultSameProduct] = useState(false)
    useEffect(() => {
        setDefaultSize(size[0])
    }, [foodItemId])

    return (
        <Card className="bg-danger text-white p-2 bg-opacity-50 border-start" style={{ color: "black", maxHeight: "400px" }}>
            <LinkContainer style={cursorP} to={`/foodItem-detail/${foodItemId}`}>
                <Row>
                    <Card.Img style={{ height: "200px", width: "500px" }}
                        crossOrigin='anonymous'
                        variant="top"
                        src={image ? image.path : ''} />

                    <Card.ImgOverlay>
                        <Card.Title className="text-dark fw-bold bg-opacity-50 bg-white">{name}
                        </Card.Title>
                        <Card.Text className="text-dark bg-opacity-50 bg-white">
                            {description}
                        </Card.Text>
                        {discount.figure > 0 ? (
                            <>
                                <Card.Text className="h5 text-dark fw-bold bg-opacity-50 bg-white"><s>Rs.{size[0].price}/-</s>{"  "}</Card.Text>
                                <Card.Text className="h3 text-dark fw-bold bg-opacity-50 bg-white">Rs.{Math.ceil((size[0].price) - (((discount.figure) * (size[0].price)) / 100))}/-{"  "}</Card.Text>
                            </>
                        ) : (
                            <>
                                <Card.Text className="h4 text-dark fw-bold bg-opacity-50 bg-white">Rs.{size[0].price}/-{"  "}</Card.Text>
                            </>

                        )}

                    </Card.ImgOverlay>
                </Row>
            </LinkContainer>
            <Button className="bg-success" onClick={() => dispatch(
                addToCartReduxAction({ id: foodItemId, quantity, size: defaultSize, instructions, sameProduct: defaultSameProduct, selectedAddOns: defaultSelectedAddOns })
            )
            }><FontAwesomeIcon icon={faCartArrowDown} ></FontAwesomeIcon></Button>
        </Card>
    )
};
export default FoodItemForListComponent;