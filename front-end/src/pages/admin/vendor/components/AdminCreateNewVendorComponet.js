import { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminCreateNewVendorComponent = ({createNewVendorApiRequest}) => {
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    const [createNewVendorResponseState, setCreateNewVendorResponseState] = useState({ success: "", error: "", loading: false })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value
        const phoneNumber = form.phoneNumber.value
        const email = form.email.value
        const idCardNumber = form.idCardNumber.value
        const formInputs = {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            idCardNumber: idCardNumber,
        }
        if (event.currentTarget.checkValidity() === true && name && phoneNumber) {
            setCreateNewVendorResponseState({ loading: true })
            createNewVendorApiRequest(formInputs).then(
                (data) => {
                    if (data.success === "vendor created!") {
                        console.log("Hi I am here")

                        setCreateNewVendorResponseState({ success: data.success, loading: false })
                        navigate("/admin/vendors");
                    }
                }
            ).catch(
                (er) => {
                    return (
                        setCreateNewVendorResponseState(
                            { error: er.response.data.message ? er.response.data.message : er.response.data }
                        )
                    )
                }
            )
        }
        setValidated(true);
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/vendors" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Vendor Profile</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control name="phoneNumber" required type="tel" maxLength="13"
                                placeholder="+923XXXXXXXXX"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid phone Number</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicIdCardNumber">
                            <Form.Label>ID Card Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter ID Card Number"
                                name="idCardNumber"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid ID Card Number</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit"> {createNewVendorResponseState && createNewVendorResponseState.loading === true ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        ></Spinner>) : ("")}Create</Button>
                        <Alert show={createNewVendorResponseState && createNewVendorResponseState === "vendor exists"} variant="danger">Vendor with that phone number already exists!</Alert>
                        <Alert show={createNewVendorResponseState && createNewVendorResponseState === "vendor created!"} variant="info">Vendor created!</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminCreateNewVendorComponent;