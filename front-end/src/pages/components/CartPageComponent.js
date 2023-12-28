import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CartPageComponent = ({
    addToCart,
    removeFromCart,
    cartItems,
    cartSubtotal,
    reduxDispatch
}) => {
  const changeCount = (id, quantity,size,instructions,selectedAddOns) => {
    const sameProduct=true
    reduxDispatch(addToCart({ id, quantity,size,instructions,sameProduct,selectedAddOns }))
}
const removeFromCartHandler=(productId,quantity,size,instructions,selectedAddOns,index)=>{
    if(window.confirm("Are you sure?")){
        reduxDispatch(removeFromCart({productId,quantity,size,instructions,selectedAddOns,index}))
    }
}

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup className="overflow-auto"  variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                  index={idx}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup >
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.length} {cartItems.length === 1 ? "Product" : "Products"})</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">Rs {cartSubtotal} /-</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button">Proceed To Checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
