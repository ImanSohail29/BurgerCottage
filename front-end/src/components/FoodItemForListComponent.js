import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FoodItemForListComponent = ({ foodItemId, name, description, size, image, discount,category, dispatch, addToCartReduxAction }) => {
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
            <Row className="m-1">
            {size.map((sizeItem,idx)=>{
                return(
                    <Button className="bg-danger border border-dark border-1" style={{width:"fit-content",maxWidth:"80px",height:"fit-content",padding:"2px"}} onClick={() => {
                        if (discount.figure > 0 && category !== "Deals") {
                            defaultSize.price = Math.ceil((Number(defaultSize.price)) - (((Number(defaultSize.price)) * discount.figure) / 100))
                        }
                        dispatch(
                            addToCartReduxAction({ id: foodItemId, quantity, size: sizeItem, instructions, sameProduct: defaultSameProduct, selectedAddOns: defaultSelectedAddOns })
                        )
                    }
                    }><small style={{fontSize:"0.7rem",fontWeight:"700",lineHeight:"0.1rem"}}>{"Rs."+sizeItem.price+"/-"}</small><small style={{fontSize:"0.7rem",fontWeight:"100",color:"yellow",lineHeight:"0.1rem"}}><br/>{sizeItem.value}</small></Button>
                )
            })}
            </Row>
        </Card>
    )
};
export default FoodItemForListComponent;