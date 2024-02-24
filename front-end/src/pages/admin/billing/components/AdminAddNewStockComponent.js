import { useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminAddNewStockComponent = ({createStockApiRequest }) => {
    const [validated, setValidated] = useState(false);
    const [createStockResponseState, setCreateStockResponseState] = useState({ message: "", error: "" })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            quantity: form.quantity.value,
            inStock: form.inStock.checked,
        }
        if (event.currentTarget.checkValidity() === true) {
            createStockApiRequest(formInputs)
                .then(data => {
                    if (data.message === "stock created"){ 
                        navigate("/admin/stocks")}
                }).catch((er) => setCreateStockResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/stocks" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Add New Stock</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3"   controlId="formBasicInStock">
                            <Form.Check
                                name="inStock"
                                type="checkbox"
                                label="in Stock"
                            />
                        </Form.Group>
                        <Button type="submit">Add</Button>
                        {createStockResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminAddNewStockComponent;