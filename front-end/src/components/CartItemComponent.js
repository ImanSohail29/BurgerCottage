import { Col, ListGroup, Row, Image, Form, Button, InputGroup } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, orderCreated = false,changeCount=false,removeFromCartHandler=false }) => {
    return (
        <>
            <ListGroup.Item className="bg-dark text-white text-center  bg-opacity-50">
                <Row>
                    <Col xs={2} >
                        <Image crossOrigin="anonymous" src={item.image ? (item.image.path ?? null) : null} fluid></Image>
                    </Col>
                    <Col xs={2} ><br/>{item.name}</Col>
                    <Col xs={2} ><br/><b>Rs {item.size.price*item.quantity} /-</b></Col>
                    <Col xs={3} ><br/>
                        <InputGroup>
                        <Button className="text-light"  disabled={item.quantity===0}  onClick={() => changeCount(item.productId,item.quantity-1,item.size,item.instructions)}>-</Button>
                        <input type="number" min={0} style={{textAlign:"center"}} className="w-25 bg-light text-dark border border-primary" value={item.quantity} onChange={(event)=>{
                          changeCount(item.productId,event.target.value)
                          return (event.target.value)}}></input>
                        <Button className="text-light"onClick={() => changeCount(item.productId,item.quantity+1,item.size,item.instructions)}>+</Button>
                        </InputGroup>
                       </Col>
                    <Col xs={3} ><br/>
                        <RemoveFromCartComponent productId={item.productId} orderCreated={orderCreated} quantity={item.quantity} size={item.size} instructions={item.instructions} removeFromCartHandler={removeFromCartHandler}></RemoveFromCartComponent>
                    </Col>
                </Row>
            </ListGroup.Item><br></br></>
    )
}
export default CartItemComponent;