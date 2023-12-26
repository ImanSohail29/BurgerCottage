import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
const EditUserPageComponent = ({ updateUserApiRequest, fetchUser,login, userInfoFromRedux, reduxDispatch, localStorage, sessionStorage }) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({ success: "", error: "" });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({})
  const userInfo = userInfoFromRedux;

  useEffect(() => {
      fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id])

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector("input[name=confirmPassword]");
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const password = form.password.value;

    if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
        updateUserApiRequest(name, phoneNumber, address, password).then(data => {
            setUpdateUserResponseState({ success: data.success, error: "" });
            reduxDispatch(login({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
            if (userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
            else sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
        })
        .catch((er) => setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Change your profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                defaultValue={user.phoneNumber}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street name and house number"
                defaultValue={user.address}
                name="address"
              />
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={4}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={4}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Alert show={updateUserResponseState && updateUserResponseState.error !== ""} variant="danger">
              Something went wrong
            </Alert>
            <Alert show={updateUserResponseState && updateUserResponseState.success === "user updated"} variant="info">
              User updated
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
