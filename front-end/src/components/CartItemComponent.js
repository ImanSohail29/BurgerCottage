import { Col, ListGroup, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, orderCreated = false, changeCount = false, removeFromCartHandler = false, index, discount }) => {
    return (
        <>
            <ListGroup.Item className="bg-dark text-white text-center bg-opacity-50" style={{ minWidth: "600px" }}>
                <Row>
                    <Col xs={2} >
                        <Image crossOrigin="anonymous" src={item.image ? (item.image.path ?? null) : null} fluid></Image>
                    </Col>
                    <Col xs={1} ><br />{item.name}</Col>
                    <Col xs={1} ><br />{item.selectedAddOns.map((addon) => <p>{addon.name}</p>)}</Col>
                    {discount.figure > 0 ? (
                        <Col xs={2} ><br /><b>Rs {(item.size.price * item.quantity) - ((item.size.price * item.quantity * discount.figure) / 100)} /-</b></Col>

                    ) : (
                        <Col xs={2} ><br /><b>Rs {item.size.price * item.quantity} /-</b></Col>

                    )}
                    <Col xs={3} ><br />
                        <InputGroup>
                            <Button className="text-light" disabled={item.quantity === 1 || orderCreated} onClick={() => changeCount(item.productId, item.quantity - 1, item.size, item.instructions, item.selectedAddOns)}>-</Button>
                            <input disabled={orderCreated} type="number" min={1} style={{ textAlign: "center" }} className="w-25 bg-light text-dark border border-primary" value={item.quantity} onChange={(event) => {
                                changeCount(item.productId, event.target.value, item.size, item.instructions, item.selectedAddOns)
                                return (event.target.value)
                            }}></input>
                            <Button className="text-light" disabled={orderCreated} onClick={() => changeCount(item.productId, item.quantity + 1, item.size, item.instructions, item.selectedAddOns)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col xs={2} ><br /><b>{item.size.value}</b></Col>

                    <Col xs={1} ><br />
                        <RemoveFromCartComponent productId={item.productId} orderCreated={orderCreated} quantity={item.quantity} size={item.size} instructions={item.instructions} selectedAddOns={item.selectedAddOns} removeFromCartHandler={removeFromCartHandler} index={index}></RemoveFromCartComponent>
                    </Col>
                </Row>
            </ListGroup.Item><br></br></>
    )
}
export default CartItemComponent;