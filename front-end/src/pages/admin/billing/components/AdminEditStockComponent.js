import { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminEditStockComponent = ({ fetchStock, updateStockApiRequest }) => {
    const [validated, setValidated] = useState(false);
    const [stock, setStock] = useState({})
    const [updateStockResponseState, setUpdateStockResponseState] = useState({ message: '', error: '' })

    const { stockId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchStock(stockId)
            .then((data) => {
                setStock(data)
            })
            .catch((er) => console.log(er))
    }, [stockId])

    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px",
        top: "-10px",
        transform: "scale(2.3)"
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            quantity: form.quantity.value,
            inStock: form.inStock.checked,
            description: form.description.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            updateStockApiRequest(stockId, formInputs)
                .then(data => {
                    if (data.message === "stock updated") navigate("/admin/stocks")
                })
                .catch((er) => setUpdateStockResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
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
                    <h3>Edit stock</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"  controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" defaultValue={stock.name} required type="text"></Form.Control>
                        </Form.Group>
                       
                        <Form.Group className="mb-3"   controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" defaultValue={stock.quantity} type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3"   controlId="formBasicInStock">
                            <Form.Check
                                name="inStock"
                                type="checkbox"
                                defaultChecked={stock.inStock}
                                label="in Stock"
                            />
                        </Form.Group>
                        
                        <Button type="submit">UPDATE</Button>
                        {updateStockResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminEditStockComponent;