import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginPageComponent = ({ loginUserApiRequest,reduxDispatch, loginAction  }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    let phoneNumberString = form.phoneNumber.value;
    const phoneNumber=phoneNumberString.split(" ").join("")
    console.log(phoneNumber)
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && phoneNumber && password) {
        setLoginUserResponseState({ loading: true });
      loginUserApiRequest(phoneNumber, password, doNotLogout)
        .then((res) => {
            setLoginUserResponseState({ success: res.success, loading: false, error: "" });

            if (res.userLoggedIn) {
                reduxDispatch(loginAction(res.userLoggedIn));
            }

            if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) window.location.assign('/') 
            else window.location.assign('/')

        })
        .catch((er) =>
          setLoginUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
        );
    }

    setValidated(true);
  };
  
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                required
                type="tel"
                placeholder="Enter phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't you have an account?
                <Link to={"/register"}> Register </Link>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
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
              Login
            </Button>
            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "wrong credentials"
              }
              variant="danger"
            >
              Wrong credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
