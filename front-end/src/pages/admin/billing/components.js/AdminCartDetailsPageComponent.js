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
  
  const AdminCartDetailsPageComponent = ({cartItems, itemsCount, cartSubtotal, userInfo,addToCart, removeFromCart, reduxDispatch , getUser, createOrder,setReduxUserState}) => {
    const [validated, setValidated] = useState(false);
    const [enterUserResponseState, setEnterUserResponseState] = useState({
        success: "",
        error: "",
        loading: false,
      });
      const [buttonDisabled, setButtonDisabled] = useState(false);
      const [userAddress, setUserAddress] = useState(false);
      const [missingAddress, setMissingAddress] = useState("");
      const [paymentMethod, setPaymentMethod] = useState("pp");
  
      const navigate = useNavigate();
      const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        if (
          event.currentTarget.checkValidity() === true
        ) {
          setEnterUserResponseState({ loading: true });
          enterUserResponseState(name, email, phoneNumber)
            .then((data) => {
              setEnterUserResponseState({
                success: data.success,
                loading: false,
              });
              reduxDispatch(setReduxUserState(data.userCreated));
              
            })
            .catch((er) =>
              setEnterUserResponseState({
                error: er.response.data.message
                  ? er.response.data.message
                  : er.response.data,
              })
            );
        }}
      const changeCount = (productID, count) => {
          reduxDispatch(addToCart(productID, count));
      }
  
      const removeFromCartHandler = (productID, quantity, price) => {
          if (window.confirm("Are you sure?")) {
              reduxDispatch(removeFromCart(productID, quantity, price));
          }
      }
  
      useEffect(() => {
          getUser()
          .then((data) => {
            if(data.isAdmin===true){

            }
            else{
                if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
                    setButtonDisabled(true);
                    setMissingAddress(" .In order to make order, fill out your profile with correct address, city etc.");
                } else {
                    setUserAddress({address: data.address, city: data.city, country: data.country, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber})
                    setMissingAddress(false);
                }
            }
             
          })
          .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
      }, [userInfo._id])
  
      const orderHandler = () => {
          const orderData = {
              orderTotal: {
                 itemsCount: itemsCount, 
                 cartSubtotal: cartSubtotal,
              },
              cartItems: cartItems.map(item => {
                  return {
                      productID: item.productID,
                      name: item.name,
                      price: item.price,
                      image: { path: item.image ? (item.image.path ?? null) : null },
                      quantity: item.quantity,
                      count: item.count,
  
                  }
              }),
              paymentMethod: paymentMethod,
          }
         createOrder(orderData)
         .then(data => {
             if (data) {
                 navigate("/user/order-details/" + data._id);
             }
         })
         .catch((err) => console.log(err));
      }
  
      const choosePayment = (e) => {
          setPaymentMethod(e.target.value);
      }
  
    return (
      <Container fluid >
        <Row className="mt-4">
          <h1>Cart Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                {userInfo.isAdmin?(<Container>
      <Row className="bg-dark text-white p-1 m-1 bg-opacity-50 border-start justify-content-md-center">
        <Col>
          <h1>Customer Details</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
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

            <Button type="submit">
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
              Submit
            </Button>
            <Alert show={enterUserResponseState && enterUserResponseState.error === "user exists"} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={enterUserResponseState && enterUserResponseState.success === "User created"} variant="info">
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>):<>
                <h2>Shipping</h2>
                <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                <b>Address</b>: {userAddress.address} {userAddress.city} {userAddress.state} {userAddress.zipCode} <br />
                <b>Phone</b>: {userAddress.phoneNumber}
                </>}
                
              </Col>
              <Col md={6}>
                <h2>Payment method</h2>
                <Form.Select onChange={choosePayment}>
                  <option value="pp">PayPal</option>
                  <option value="cod">
                    Cash On Delivery (delivery may be delayed)
                  </option>
                </Form.Select>
              </Col>
              <Row>
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
              </Row>
            </Row>
            <br />
            <h2>Order items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent item={item} key={idx} removeFromCartHandler={removeFromCartHandler} changeCount={changeCount} />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Items price (after tax): <span className="fw-bold">Rs. {cartSubtotal} /-</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">included</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
                Total price: <span className="fw-bold">${cartSubtotal}</span>
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
  