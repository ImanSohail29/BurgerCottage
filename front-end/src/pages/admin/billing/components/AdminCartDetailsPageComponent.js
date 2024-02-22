import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import CartItemComponent from "../../../../components/CartItemComponent";
import { checkPhoneNumber } from "../../utils";

const AdminCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal, userInfo, addToCart, removeFromCart, resetCart, reduxDispatch, createOrder, createOrderAdmin, createOrderCustomer, registerUserApiRequestFromAdmin, discount }) => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPhoneNumber, setUserPhoneNumber] = useState()
  const [userDeliveryAddress, setUserDeliveryAddress] = useState()
  const [enterUserResponseState, setEnterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [missingAddress, setMissingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [serviceMode, setServiceMode] = useState("dineIn");
  const [customerDiscount, setCustomerDiscount] = useState(0)
  const [finalCartSubtotal, setFinalCartSubtotal] = useState(cartSubtotal)
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo != undefined) {
      if (!userInfo.isAdmin) {
        setUserName(userInfo.name)
        setUserEmail(userInfo.email)
        setUserPhoneNumber(checkPhoneNumber(userInfo.phoneNumber))
        setUserDeliveryAddress(userInfo.address)
      }
    }
  }, [userInfo])
  useEffect(() => {
    setMissingAddress(false)
    setButtonDisabled(false)
    console.log("inside use effect before if")
    if (serviceMode === "delivery" && ((userDeliveryAddress === "" || userDeliveryAddress == undefined) || (userPhoneNumber === "" || userPhoneNumber === undefined))) {
      setMissingAddress("Customer Details are required")
      setButtonDisabled(true)
      console.log("inside use effect after if")

    }
    if (cartItems.length < 1) {
      setButtonDisabled(true)
    }
  }, [userDeliveryAddress, userPhoneNumber, userDeliveryAddress, serviceMode, cartItems])

  const handleDiscount = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const custDiscount = form.custDiscount.value;
    if (
      event.currentTarget.checkValidity() === true
    ) {
      setCustomerDiscount(custDiscount);
      setFinalCartSubtotal(Math.ceil(cartSubtotal - ((cartSubtotal * customerDiscount) / 100)))
    }
  }
  const changeCount = (id, quantity, size, instructions, selectedAddOns) => {
    const sameProduct = true
    reduxDispatch(addToCart({ id, quantity, size, instructions, sameProduct, selectedAddOns }))
  }
  const removeFromCartHandler = (productId, quantity, size, instructions, selectedAddOns, index) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart({ productId, quantity, size, instructions, selectedAddOns, index }))
    }
  }

  const orderHandler = () => {
    console.log("inside order handler")
    let user = { name: userName, phoneNumber: userPhoneNumber, email: userEmail, address: userDeliveryAddress }
    console.log("user: " + JSON.stringify(user))
    var userPhoneNumberAdmin = checkPhoneNumber(user.phoneNumber)
    if (user.phoneNumber != {}) {
      registerUserApiRequestFromAdmin(user.name, userPhoneNumberAdmin, user.email, user.address)
        .then((data) => {
          setEnterUserResponseState({ success: data.success, loading: false, })
          const orderData = {
            cart:
            {
              cartItems: cartItems,
              itemsCount: itemsCount,
              cartSubtotal: Math.ceil((cartSubtotal - ((cartSubtotal * customerDiscount) / 100)))
            },
            orderTotal: {
              itemsCount: itemsCount,
              cartSubtotal: Math.ceil((cartSubtotal - ((cartSubtotal * customerDiscount) / 100)))
            },
            paymentMethod: paymentMethod,
            customerInfo: user,
            customerId: data.userCreated._id,
            serviceMode: serviceMode,
            discount: { figure: Number(discount.figure) + Number(customerDiscount) },
          }
          if (userInfo.isAdmin) {
            createOrderAdmin(orderData)
              .then(data => {
                if (data) {
                  if (userInfo.isAdmin) {
                    navigate("/admin/order-details/" + data._id);
                  }
                  else {
                    navigate("/user/order-details/" + data._id);
                  }
                }
              })
              .catch((err) => console.log(err));
            reduxDispatch(resetCart())
          }
          else {
            createOrder(orderData)
              .then(data => {
                if (data) {
                  if (userInfo.isAdmin) {
                    navigate("/admin/order-details/" + data._id);
                  }
                  else {
                    navigate("/user/order-details/" + data._id);
                  }
                }
              })
              .catch((err) => console.log(err));
            reduxDispatch(resetCart())
          }
        })
        .catch((er) =>
          setEnterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    else {
      const orderData = {
        cart:
        {
          cartItems: cartItems,
          itemsCount: itemsCount,
          cartSubtotal: Math.ceil((cartSubtotal - ((cartSubtotal * customerDiscount) / 100)))
        },
        orderTotal: {
          itemsCount: itemsCount,
          cartSubtotal: Math.ceil((cartSubtotal - ((cartSubtotal * customerDiscount) / 100)))
        },
        paymentMethod: paymentMethod,
        customerInfo: user,
        serviceMode: serviceMode,
        discount: { figure: Number(discount.figure) + Number(customerDiscount) },
      }
      if (userInfo.isAdmin) {
        createOrderAdmin(orderData)
          .then(data => {
            if (data) {
              if (userInfo.isAdmin) {
                navigate("/admin/order-details/" + data._id);
              }
              else {
                navigate("/user/order-details/" + data._id);
              }
            }
          })
          .catch((err) => console.log(err));
        reduxDispatch(resetCart())
      }
      else {
        createOrderCustomer(orderData)
          .then(data => {
            if (data) {
              if (userInfo.isAdmin) {
                navigate("/admin/order-details/" + data._id);
              }
              else {
                navigate("/user/order-details/" + data._id);
              }
            }
          })
          .catch((err) => console.log(err));
        reduxDispatch(resetCart())
      }
    }
    console.log(user)
    console.log(JSON.stringify(enterUserResponseState))
  }
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  }
  const chooseServiceMode = (e) => {
    setServiceMode(e.target.value);
  }

  return (
    <Container fluid >
      <h1 className="m-4 text-white text-center justify-content-md-center">Cart Details</h1>

      <Row className="m-4 p-5 text-white bg-dark bg-opacity-50">
        <Col md={6}>
          <br />
          <Row>
            {(userInfo != undefined) ? (
              <Container>
                <Row >
                  <Col>
                    <h1>Customer Details</h1>
                    {userInfo.isAdmin ? (
                      <>
                        <Form noValidate validated={validated}>
                          <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Enter Customers name"
                              name="name"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a name
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              name="email"
                              onChange={(e) => setUserEmail(e.target.value)}
                              type="email"
                              placeholder="Enter email"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid email address
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              name="phoneNumber"

                              minLength={11}
                              isInvalid={userPhoneNumber === null || userPhoneNumber === undefined || userPhoneNumber === "" || userPhoneNumber.trim().length < 11}
                              onChange={(e) => {
                                setUserPhoneNumber(e.target.value)
                              }}
                              type="tel"
                              placeholder="+923XXXXXXXXX"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter your phone Number
                            </Form.Control.Feedback>
                          </Form.Group>
                          {serviceMode && serviceMode === "delivery" ? (
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                name="address"

                                type="text" as="textarea"
                                isInvalid={userDeliveryAddress === '' || userDeliveryAddress === undefined}
                                onChange={(e) => setUserDeliveryAddress(e.target.value)}
                                placeholder="House no., Block, Town, City"
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter Address
                              </Form.Control.Feedback>
                            </Form.Group>

                          ) : ("")}
                        </Form>

                      </>) : (
                      <>
                        <Form noValidate validated={validated}>
                          <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={userInfo.name}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Enter Customers name"
                              name="name"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a name
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              name="email"
                              type="email"
                              defaultValue={userInfo.email}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="Enter email"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid email address
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              name="phoneNumber"
                              defaultValue={userInfo.phoneNumber}
                              onChange={(e) => setUserPhoneNumber(e.target.value)}
                              type="tel"
                              minLength={11}
                              required
                              placeholder="+923XXXXXXXXX"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid phone Number
                            </Form.Control.Feedback>
                          </Form.Group>
                          {serviceMode && serviceMode === "delivery" ? (
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                name="address"
                                defaultValue={userInfo.address}
                                onChange={(e) => setUserDeliveryAddress(e.target.value)}
                                type="text" as="textarea"
                                required
                                placeholder="House no., Block, Town, City"
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter a valid Address
                              </Form.Control.Feedback>
                            </Form.Group>) : ("")}
                        </Form>
                      </>)
                    }
                  </Col>
                </Row>
              </Container>) : <>
              <Container>
                <Row >
                  <Col>
                    <>
                      <h1>Customer Details</h1>

                      <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                          <Form.Label>Customer Name</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter Customers name"
                            name="name"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a name
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            name="email"
                            onChange={(e) => setUserEmail(e.target.value)}
                            type="email"
                            placeholder="Enter email"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email address
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            name="phoneNumber"
                            required
                            minLength={11}
                            isInvalid={userPhoneNumber === null || userPhoneNumber === undefined || userPhoneNumber === "" || userPhoneNumber.trim().length < 11}
                            onChange={(e) => setUserPhoneNumber(e.target.value)}
                            type="tel"
                            placeholder="+923XXXXXXXXX"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter phone Number
                          </Form.Control.Feedback>
                        </Form.Group>
                        {serviceMode && serviceMode === "delivery" ? (
                          <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              name="address"
                              required
                              type="text" as="textarea"
                              isInvalid={userDeliveryAddress === '' || userDeliveryAddress === undefined}
                              onChange={(e) => setUserDeliveryAddress(e.target.value)}
                              placeholder="House no., Block, Town, City"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter Address
                            </Form.Control.Feedback>
                          </Form.Group>) : ("")}
                      </Form>
                    </>
                  </Col>
                </Row>
              </Container>
            </>}
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup className="overflow-auto" variant="flush">
            {
              cartItems.map((item, idx) => (
                <CartItemComponent item={item} key={idx} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler} index={idx} discount={discount} />
              ))}
          </ListGroup>
          {userInfo.isAdmin ? (
            <Form noValidate validated={validated} onSubmit={handleDiscount}>
              <Form.Group className="mb-3" controlId="formBasicCustomerDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  max={50}
                  placeholder="Enter Discount"
                  name="custDiscount"
                />
                <Form.Control.Feedback type="invalid">
                  Enter Valid Discount Value
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" style={{ width: "100%" }}>
                Apply Discount
              </Button>
            </Form>
          ) : ("")}
        </Col>
        <Col md={6} className="mt-4">
          <Row className="mb-4 p-4">
            <h2>Payment method</h2>
            <Form.Select onChange={choosePayment}>
              <option value="cash">Cash</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="online">Online Payment</option>
            </Form.Select>
          </Row>
          {userInfo.isAdmin ? (
            <Row className="mb-4 p-4">
              <h2>Service mode</h2>
              <Form.Select onChange={chooseServiceMode}>
              <option value="dineIn">Dine in</option>
                <option value="delivery">Delivery</option>
                <option value="takeAway">Take Away</option>
              </Form.Select>
            </Row>
          ) : ("")}

          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              Items price (after tax): <span className="fw-bold">Rs. {Math.ceil(cartSubtotal - ((cartSubtotal * customerDiscount) / 100))} /-</span>
            </ListGroup.Item>

            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price:  Rs.<span className="fw-bold">{Math.ceil(cartSubtotal - ((cartSubtotal * customerDiscount) / 100))}/-</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" onClick={orderHandler} variant="danger" type="button" disabled={buttonDisabled}>
                  Place order
                </Button>
                {missingAddress}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminCartDetailsPageComponent;
