import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
  InputGroup,
} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/userSlice";
import CartItemComponent from "../../../../components/CartItemComponent";

const AdminOrderDetailsPageComponent = ({ getOrder, markAsDelivered }) => {
  const ref = useRef();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Mark as delivered");
  const [cartItems, setCartItems] = useState([]);
  const [orderPlacedAt,setOrderPlacedAt]=useState("");
  const [print,setPrint]=useState(true)

  useEffect(() => {
    getOrder(orderId)
      .then((order) => {
        setUserInfo(order.customerInfo);
        setPaymentMethod(order.paymentMethod);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setOrderButtonMessage("Order is finished");
          setButtonDisabled(true);
        }
        setCartItems(order.cart.cartItems);
        setOrderPlacedAt(order.orderPlacedAt);
      })
      .catch((er) =>
        dispatch(logout)
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, [isDelivered, orderId]);
 
  return (
    <>
      <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            {userInfo ? (<Col md={6}>
              <h2>Shipping</h2>
              <div><b>Name</b>: {userInfo.name} {userInfo.lastName} <br /></div>
              <div><b>Address</b>: {userInfo.address}{" "}</div>
              <div><b>Phone</b>: {userInfo.phoneNumber}</div>
            </Col>) : (
              ""
            )}

            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="cash">Cash</option>
                <option value="online">
                  Online Payment
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Delivered at {isDelivered}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">Rs {cartSubtotal}/-</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">Rs {cartSubtotal}/-</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={() =>
                    markAsDelivered(orderId)
                      .then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                      .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                  }
                  disabled={buttonDisabled}
                  variant="danger"
                  type="button"
                >
                  {orderButtonMessage}
                </Button>
                <ReactToPrint
                  bodyClass="print-agreement"
                  content={() => ref.current}
                  trigger={() => {
                    return(
                    <Button
                      size="lg"
                      className="w-100 m-1"
                      onClick={setPrint(true)}
                      variant="primary"
                      type="button"
                    >
                      Print Receipt
                    </Button>)}
                  }
                />
              </div>
            </ListGroup.Item>
          </ListGroup>

        </Col>
      </Row>
     

    </Container>
    {print?(<Container ref={ref} fluid>
      <h1>Receipt</h1>
     
      <Row className="mt-4">
        <h1>Burger Cottage</h1>
        <Col md={8}>
          <br />
          <Row>
            {userInfo ? (<Col md={6}>
              <div><b>Name</b>: {userInfo.name} {userInfo.lastName} <br /></div>
              <div><b>Address</b>: {userInfo.address}{" "}</div>
              <div><b>Phone</b>: {userInfo.phoneNumber}</div>
            </Col>) : (
              ""
            )}

            <Col md={6}>
              <h2>Payment method:</h2><p>{paymentMethod}</p>
              
            </Col>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
               <ListGroup.Item key={idx} className="bg-light text-center bg-opacity-50" style={{minWidth:"600px"}}>
               <Row>
                   <Col xs={3} ><br/>{item.name}</Col>
                   <Col xs={3} ><br/><b> {item.size.value}</b></Col>
                   <Col xs={3} ><br/><b>Rs {item.size.price*item.quantity} /-</b></Col>
                   <Col xs={3} ><br/>
                       <InputGroup>
                       <input type="number" min={1} style={{textAlign:"center"}} className="w-25 bg-light text-dark border border-primary" value={item.quantity} ></input>
                       </InputGroup>
                      </Col>
                  
               </Row>
           </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Total</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">Rs {cartSubtotal}/-</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Discount: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">Rs {cartSubtotal}/-</span>
            </ListGroup.Item>
            <ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>

        </Col>
      </Row>
     

    </Container>):("")}
    

    </>
  
  );
};

export default AdminOrderDetailsPageComponent;
