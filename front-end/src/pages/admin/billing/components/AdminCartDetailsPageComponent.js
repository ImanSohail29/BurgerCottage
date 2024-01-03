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

const AdminCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal, userInfo, addToCart, removeFromCart, resetCart, reduxDispatch, createOrder, registerUserApiRequestFromAdmin, discount }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({})
  const [enterUserResponseState, setEnterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [serviceMode, setServiceMode] = useState("delivery");
  const [customerDiscount, setCustomerDiscount] = useState(0)
  const [finalCartSubtotal, setFinalCartSubtotal] = useState(cartSubtotal)

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;

    if (
      event.currentTarget.checkValidity() === true
    ) {
      setEnterUserResponseState({ loading: true });
      setUser({ name: name, phoneNumber: phoneNumber, email: email, address: address })
      setValidated(true);
      setEnterUserResponseState({ loading: false, success: true });


    }
  }
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
      console.log(cartSubtotal)
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

  // useEffect(() => {
  //     getUser()
  //     .then((data) => {
  //       if(data.isAdmin===true){

  //       }
  //       else{
  //           if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
  //               setButtonDisabled(true);
  //               setMissingAddress(" .In order to make order, fill out your profile with correct address, city etc.");
  //           } else {
  //               setUserAddress({address: data.address, city: data.city, country: data.country, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber})
  //               setMissingAddress(false);
  //           }
  //       }

  //     })
  //     .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
  // }, [userInfo._id])

  const orderHandler = () => {
    if (user) {
      registerUserApiRequestFromAdmin(user.name, user.phoneNumber, user.email, user.address)
        .then((data) => {
          setEnterUserResponseState({
            success: data.success,
            loading: false,
          });
        })
        .catch((er) =>
          setEnterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    const orderData = {
      cart:
      {
        cartItems: cartItems,
        itemsCount: itemsCount,
        cartSubtotal: Math.ceil((cartSubtotal-((cartSubtotal*customerDiscount)/100)))
      },
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: Math.ceil((cartSubtotal-((cartSubtotal*customerDiscount)/100)))
      },
      paymentMethod: paymentMethod,
      customerInfo: user,
      serviceMode: serviceMode,
      discount: { figure: Number(discount.figure) + Number(customerDiscount) },
    }
    console.log(JSON.stringify(orderData))
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
            {/* <Col md={6}  className="bg-dark p-1 text-white bg-opacity-50 border-start justify-content-md-center"> */}
            {userInfo ? (<Container>
              <Row >
                <Col>
                  <h1>Customer Details</h1>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {userInfo.isAdmin ? (<> <Form.Group className="mb-3" controlId="validationCustom01">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control
                        type="text"
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
                          placeholder="Enter email"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please anter a valid email address
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          name="phoneNumber"
                          type="tel"
                          placeholder="03XXXXXXXXX"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please anter a valid phone Number
                        </Form.Control.Feedback>
                      </Form.Group>
                      {serviceMode && serviceMode === "delivery" ? (
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            name="address"
                            type="text" as="textarea"
                            placeholder="House no., Block, Town, City"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please anter a valid Address
                          </Form.Control.Feedback>
                        </Form.Group>) : ("")}</>) : (<>
                          <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={userInfo.name}
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
                              placeholder="Enter email"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please anter a valid email address
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              name="phoneNumber"
                              defaultValue={userInfo.phoneNumber}
                              type="tel"
                              placeholder="03XXXXXXXXX"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please anter a valid phone Number
                            </Form.Control.Feedback>
                          </Form.Group>
                          {serviceMode && serviceMode === "delivery" ? (
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                name="address"
                                defaultValue={userInfo.address}
                                type="text" as="textarea"
                                placeholder="House no., Block, Town, City"
                              />
                              <Form.Control.Feedback type="invalid">
                                Please anter a valid Address
                              </Form.Control.Feedback>
                            </Form.Group>) : ("")}</>)}

                    <Button type="submit" style={{ width: "100%" }}>
                      {enterUserResponseState &&
                        enterUserResponseState.loading === true ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        ""
                      )}
                      Save
                    </Button>
                    {/* <Alert show={enterUserResponseState && enterUserResponseState.error === "user exists"} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={enterUserResponseState && enterUserResponseState.success === "User created"} variant="info">
              User created
            </Alert> */}
                  </Form>
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
              </Row>
            </Container>) : <>
              <Container>
                <h2>Shipping</h2>
                Name: {userInfo.name}<br />
                Address: {userInfo.address} <br />
                Phone: {userInfo.phoneNumber}
              </Container>
            </>}
            {/* </Col> */}
            {/* <Col md={6}> */}
            {/* <Row>
                <h2>Payment method</h2>
                <Form.Select onChange={choosePayment}>
                  <option value="op">Online</option>
                  <option value="cp">Cash</option>
                </Form.Select>
              </Row>
              <Row>
                <h2>Service mode</h2>
                <Form.Select onChange={chooseServiceMode}>
                  <option value="delivery">Delivery</option>
                  <option value="takeAway">Take Away</option>
                  <option value="dineIn">Dine in</option>
                </Form.Select>
              </Row> */}

            {/* </Col> */}
            {/* <Row>
                <Col>
                  <Alert className="mt-3" variant="danger">
                    Not delivered
                    {missingAddress}
                  </Alert>
                </Col>
                <Col>
                  <Alert className="mt-3" variant="success">
                    Not paid yet
                  </Alert>
                </Col>
              </Row> */}
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup className="overflow-auto" variant="flush">
            {console.log("cartItems: " + JSON.stringify(cartItems))}
            {
              cartItems.map((item, idx) => (
                <CartItemComponent item={item} key={idx} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler} index={idx} discount={discount} />
              ))}
          </ListGroup>
        </Col>
        <Col md={6} className="mt-4">
          <Row className="mb-4 p-4">
            <h2>Payment method</h2>
            <Form.Select onChange={choosePayment}>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </Form.Select>
          </Row>
          <Row className="mb-4 p-4">
            <h2>Service mode</h2>
            <Form.Select onChange={chooseServiceMode}>
              <option value="delivery">Delivery</option>
              <option value="takeAway">Take Away</option>
              <option value="dineIn">Dine in</option>
            </Form.Select>
          </Row>
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
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminCartDetailsPageComponent;
