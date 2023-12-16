import { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminPayInventoryOrderComponent = ({createNewVendorApiRequest}) => {
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    const [createNewVendorResponseState, setCreateNewVendorResponseState] = useState({ success: "", error: "", loading: false })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const amount = form.amount.value
        const formInputs = {
            amountPaid:amount
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
                    <Link to="admin/vendors" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Inventory Order</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control name="itemName" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" required type="number" min="0" maxLength="12"
                                ></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPricePerItem">
                            <Form.Label>Price Per Item</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price Per Item"
                                min="0"
                                name="pricePerItem"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid Price Per Item</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTotalAmount">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Total Amount"
                                min="0"
                                name="totalAmount"
                            />
                            <Form.Control.Feedback type="invalid">Please enter valid Total Amount</Form.Control.Feedback>
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
export default AdminPayInventoryOrderComponent;