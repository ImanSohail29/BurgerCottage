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
import "./../../../../style/AdminOrderDetails.css"
import StiReport from "./StiReport";

const AdminOrderDetailsPageComponent = ({ getOrder, markAsDelivered, markAsDone, markAsPaid, markAsConfirmed, discount }) => {
  const ref = useRef();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderData, setorderData] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderReadyButtonDisabled, setOrderReadyButtonDisabled] = useState(false);
  const [orderPaidButtonDisabled, setOrderPaidButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Mark as delivered");
  const [orderDoneButtonMessage, setOrderDoneButtonMessage] =
    useState("Mark as done");
  const [orderPaidButtonMessage, setOrderPaidButtonMessage] =
    useState("Mark as Paid");
  const [cartItems, setCartItems] = useState([]);
  const [discounted, setDiscounted] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [orderPlacedAt, setOrderPlacedAt] = useState("");
  const [serviceMode, setServiceMode] = useState("");
  const [print, setPrint] = useState(false)
  const toTime = (timeString) => {
    const date = new Date(timeString)
    let n = date.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    return n
  }
  useEffect(() => {
    getOrder(orderId)
      .then((order) => {
        setorderData(order)
        setUserInfo(order.customerInfo);
        setPaymentMethod(order.paymentMethod);
        setServiceMode(order.serviceMode)
        setDiscounted(order.discount)
        setDiscountedAmount(order.discountAmount)
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        order.isDone
          ? setIsDone(order.isReadyAt)
          : setIsDone(false);
        order.isPaid
          ? setIsPaid(order.paidAt)
          : setIsPaid(false)
        setIsConfirmed(order.isConfirmed)
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setOrderButtonMessage("Order is delivered");
          setButtonDisabled(true);
        }
        if (order.isDone) {
          setOrderDoneButtonMessage("Order is Ready");
          setOrderReadyButtonDisabled(true);
        }
        if (order.isPaid) {
          setOrderPaidButtonMessage("Order is Paid");
          setOrderPaidButtonDisabled(true);
        }
        setCartItems(order.cart.cartItems);
        let dateObject = new Date(order.orderPlacedAt)
        setOrderPlacedAt(dateObject.toString().substring(0, 15) + ",  " + toTime(order.orderPlacedAt));
      })
      .catch((er) =>
        dispatch(logout)
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, [isDelivered, isDone, orderId, isPaid]);

  return (
    cartItems.length > 0 ? (
      <>
        <Container fluid>

          <Row className="mt-4">
            <h1 className="text-center">Order Details</h1>

            <Col lg={3}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>Order summary <b className="text-primary"> {orderId}</b></h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fst-italic"> {orderPlacedAt}/-</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {userInfo ? (
                    <>
                      {console.log(userInfo)}
                      <h5>Customer Information</h5>
                      {userInfo.name ? (<div><b>Name</b>: {userInfo.name} {userInfo.lastName} <br /></div>) : ("")}
                      {userInfo.address ? (<div><b>Address</b>: {userInfo.address}{" "}</div>) : ("")}
                      {userInfo.email ? (<div><b>Email</b>: {userInfo.email}{" "}</div>) : ("")}
                      {userInfo.phoneNumber ? (<div><b>Phone</b>: {userInfo.phoneNumber}</div>) : ("")}
                    </>) : (
                    ""
                  )}
                </ListGroup.Item>
                {discounted ? (
                  <ListGroup.Item>
                    Items price (after tax):{" "}
                    <span className="fw-bold">Rs {cartSubtotal}/-</span>
                  </ListGroup.Item>
                ) : ("")}
                <ListGroup.Item>
                  Discount %:<span className="fw-bold">{discounted.figure}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Discount in Rs.: <span className="fw-bold">{discountedAmount}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Shipping: <span className="fw-bold">included</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Tax: <span className="fw-bold">included</span>
                </ListGroup.Item>
                {discounted ? (
                  <ListGroup.Item className="text-danger">
                    Total price: <span className="fw-bold">Rs {cartSubtotal}/-</span>
                  </ListGroup.Item>
                ) : (<ListGroup.Item className="text-danger">
                  Total price: <span className="fw-bold">Rs {cartSubtotal}/-</span>
                </ListGroup.Item>)}
                <ListGroup.Item>
                <ListGroup.Item>
                      <p>Payment Method: <b>{paymentMethod}</b></p>

                      <Alert variant={isPaid ? "success" : "danger"}>
                        {isPaid ? <>Paid on {isPaid.toString().substring(0, 10) + ", Time: " + toTime(isPaid)}</> : <>Not paid yet</>}
                      </Alert>
                        <p>Service Mode: <b>{serviceMode}</b></p>
                        {serviceMode === "delivery" ? (
                          <Alert
                            
                            variant={isDelivered ? "success" : "danger"}
                          >
                            {isDelivered ? (
                              <>Delivered at {isDelivered.toString().substring(0, 10) + ", Time: " + toTime(isDelivered)}</>
                            ) : (
                              <>Not delivered</>
                            )}
                          </Alert>
                        ) : ("")}                 
                </ListGroup.Item>
                

                  {/* <div className="d-grid gap-2">
                <Button size="lg" className="danger" disabled={isConfirmed} onClick={() =>
                        markAsConfirmed(orderId)
                          .then((res) => {
                            if (res) {
                              setIsConfirmed(true);
                            }
                          })
                          .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                      }>Confirm Order</Button>
                  {serviceMode === "delivery" ? (
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
                  ) : ("")}
                  <Button
                    size="lg"
                    onClick={() =>
                      markAsDone(orderId)
                        .then((res) => {
                          if (res) {
                            setIsDone(true);
                          }
                        })
                        .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                    }
                    disabled={orderReadyButtonDisabled}
                    variant="danger"
                    type="button"
                  >
                    {orderDoneButtonMessage}
                  </Button>
                  <Button
                    size="lg"
                    onClick={() =>
                      markAsPaid(orderId)
                        .then((res) => {
                          if (res) {
                            setIsPaid(true);
                          }
                        })
                        .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                    }
                    disabled={orderPaidButtonDisabled}
                    variant="danger"
                    type="button"
                  >
                    {orderPaidButtonMessage}
                  </Button>
                  <ReactToPrint
                    content={() => ref.current}
                    trigger={() => {
                      return (
                        <Button
                          size="lg"
                          className="w-100 m-1"
                          onClick={() => setPrint(true)}
                          variant="primary"
                          type="button"
                        >
                          Print Receipt
                        </Button>)
                    }
                    }
                  />
                </div> */}
                </ListGroup.Item>
              </ListGroup>

            </Col>
            
            <Col lg={4}>
              {orderData ? (<StiReport orderData={orderData}></StiReport>) : ("")}
            </Col>
            <Col xl={5}>
              <ListGroup variant="flush">
                {discounted ? (cartItems.map((item, idx) => (
                  <CartItemComponent key={idx} item={item} orderCreated={true} index={idx} discount={discounted} />
                ))) : ("")}

              </ListGroup>
            </Col>
          </Row>


        </Container>

        {/* <div hidden={true}>
      <Container ref={ref}>
        <Row className="page">
          <Col className="sub-page">
            <h1>Burger Cottage</h1>
            <br />
            <p>{orderPlacedAt}</p>
            <Row>
              {userInfo ? (<Col md={6}>
                {userInfo.name?(<div><b>Name</b>: {userInfo.name} {userInfo.lastName} <br /></div>):("")}
                 {userInfo.address?(<div><b>Address</b>: {userInfo.address}{" "}</div>):("")}
                 {userInfo.email?(<div><b>Email</b>: {userInfo.email}{" "}</div>):("")}
                 {userInfo.phoneNumber?(<div><b>Phone</b>: {userInfo.phoneNumber}</div>):("")}
              </Col>) : (
                ""
              )}
            </Row>
            <br />
            <h2>Order items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <ListGroup.Item key={idx} className="text-center">
                  <Row>
                    <Col xs={1} ><br /><small>{idx + 1})</small></Col>
                    <Col xs={3} ><br />{item.name}</Col>
                    {discounted ? (
                      <>
                        <Col xs={2} ><br /><b> {item.size.value}</b></Col>
                        <Col xs={3} ><br /><b>Rs</b> {(item.size.price * item.quantity)} /-</Col>
                      </>
                    ) : ("")}
                    <Col xs={1} ><br /> {item.quantity}</Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ListGroup>
              <ListGroup.Item>
                Items price (after tax):{" "}
                <span className="fw-bold">Rs {cartSubtotal}/-</span>
              </ListGroup.Item>

              {discounted.figure > 0 ? (
                <>
                  <ListGroup.Item>
                    Discount: <span className="fw-bold">included</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Total Discount: <span className="fw-bold">{discounted.figure}%</span>
                  </ListGroup.Item>
                </>
              ) : (
                ""
              )}

              <ListGroup.Item>
                Tax: <span className="fw-bold">included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Total price: <span className="fw-bold">Rs {cartSubtotal}/-</span>
              </ListGroup.Item>
              <ListGroup.Item>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      </div> */}
      </>

    ) : (<Col style={{ textAlign: "center", justifyContent: "center" }}><h1 className="loader"></h1></Col>)

  );
};

export default AdminOrderDetailsPageComponent;
