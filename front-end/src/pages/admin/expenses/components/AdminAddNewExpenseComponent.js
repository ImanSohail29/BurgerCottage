import { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminAddNewExpenseComponent = ({addNewExpenseApiRequest}) => {
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    const [addNewExpenseResponseState, setAddNewExpenseResponseState] = useState({ success: "", error: "", loading: false })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value
        const quantity = form.quantity.value
        const pricePerItem = form.pricePerItem.value
        const totalAmount = form.totalAmount.value
        const formInputs = {
            name: name,
            quantity: quantity,
            pricePerItem: pricePerItem,
            totalAmount: totalAmount,
        }
        if (event.currentTarget.checkValidity() === true && name && totalAmount) {
            setAddNewExpenseResponseState({ loading: true })
            addNewExpenseApiRequest(formInputs).then(
                (data) => {
                    console.log("hi")
                    if (data.success === "Expense created!") {
                        setAddNewExpenseResponseState({ success: data.success, loading: false })
                        navigate(`/admin/expenses`);
                    }
                }
            ).catch(
                (er) => {
                    return (
                        setAddNewExpenseResponseState(
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
                    <Link to="/admin/expenses" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Add New Expense</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
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
                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" type="number" min="0" maxLength="12"
                                ></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
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
                        <Button type="submit"> {addNewExpenseResponseState && addNewExpenseResponseState.loading === true ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        ></Spinner>) : ("")}Add Expense</Button>
                        <Alert show={addNewExpenseResponseState && addNewExpenseResponseState === "Expense created!"} variant="info">Expense created!!</Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminAddNewExpenseComponent;