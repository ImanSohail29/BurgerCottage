import { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminEditExpenseComponent = ({ fetchExpense, updateExpenseApiRequest}) => {
    const [validated, setValidated] = useState(false);
    const [expense, setExpense] = useState({})
    const [updateExpenseResponseState, setUpdateExpenseResponseState] = useState({ message: '', error: '' })
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchExpense(id)
            .then((data) => {
                setExpense(data)
                console.log(data)
            })
            .catch((er) => console.log(er))
    }, [id])
  
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            pricePerItem: form.pricePerItem.value,
            totalAmount: form.totalAmount.value,
            quantity: form.quantity.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            updateExpenseApiRequest(id, formInputs)
                .then(data => {
                    if (data === "Expense updated") navigate("/admin/expenses")
                })
                .catch((er) => setUpdateExpenseResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
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
                    <h3>Edit Expense</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue={expense.name}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPricePerItem">
                            <Form.Label>Price Per Item</Form.Label>
                            <Form.Control name="pricePerItem" type="Number" defaultValue={expense.pricePerItem} ></Form.Control>
                        </Form.Group>                    
                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" type="Number" defaultValue={expense.quantity} ></Form.Control>
                        </Form.Group>    
                        <Form.Group className="mb-3" controlId="formBasicTotalAmount">
                            <Form.Label>TotalAmount</Form.Label>
                            <Form.Control name="totalAmount" type="Number" defaultValue={expense.totalAmount} ></Form.Control>
                        </Form.Group>    
                        <Button type="submit">UPDATE</Button>
                        {updateExpenseResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminEditExpenseComponent;