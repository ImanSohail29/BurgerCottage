import { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminAddNewInventoryOrderComponent = ({createNewVendorApiRequest}) => {
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    const [createNewInventoryOrderResponseState, setCreateNewInventoryOrderResponseState] = useState({ success: "", error: "", loading: false })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const itemName = form.itemName.value
        const quantity = form.quantity.value
        const pricePerItem = form.pricePerItem.value
        const totalAmount = form.totalAmount.value
        const formInputs = {
            itemName: itemName,
            quantity: quantity,
            pricePerItem: pricePerItem,
            totalAmount: totalAmount,
        }
        if (event.currentTarget.checkValidity() === true && itemName && quantity&& totalAmount) {
            setCreateNewInventoryOrderResponseState({ loading: true })
            createNewVendorApiRequest(formInputs).then(
                (data) => {
                    if (data.success === "inventory order created!") {
                        setCreateNewInventoryOrderResponseState({ success: data.success, loading: false })
                        navigate("/admin/vendors");
                    }
                }
            ).catch(
                (er) => {
                    return (
                        setCreateNewInventoryOrderResponseState(
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
                    <Link to="/" className="btn btn-warning my-3">Go Back</Link>
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
                        <Button type="submit"> {createNewInventoryOrderResponseState && createNewInventoryOrderResponseState.loading === true ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        ></Spinner>) : ("")}Add New Order</Button>
                        <Alert show={createNewInventoryOrderResponseState && createNewInventoryOrderResponseState === "inventory Order created!"} variant="info">inventory Order created!!</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminAddNewInventoryOrderComponent;