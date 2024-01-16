import { Form, Button, Col, Container, Row, Spinner, Table, InputGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const AdminVendorDetailsPageComponent = ({
    getVendor,
    fetchVendorInventoryOrders,
    deleteVendorInventoryOrder,
    payVendorApiRequest,
    fetchInventoryTransactions }) => {
    const { vendorId } = useParams()
    const navigate = useNavigate();
    const [vendor, setVendor] = useState([])
    const [inventoryOrders, setInventoryOrders] = useState([])
    const [transactions, setTransactions] = useState()
    const [inventoryOrderDeleted, setInventoryOrderDeleted] = useState(false)
    const [validated, setValidated] = useState(false);
    const [payVendorResponseState, setPayVendorResponseState] = useState({
        success: "",
        error: "",
        loading: false,
    });
   
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const amount = form.amount.value
        if (event.currentTarget.checkValidity() === true) {

            payVendorApiRequest(vendorId, amount)
                .then((data) => {
                    console.log(data)
                    if (data.success === "payment done") {
                        setPayVendorResponseState({ success: data.success, loading: false, error: "" })
                    }
                })
                .catch((er) => {
                    setPayVendorResponseState({
                        error: er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                    });
                });
        }
    }
    const deleteHandler = async (vendorId, inventoryOrderId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteVendorInventoryOrder(vendorId, inventoryOrderId)
            console.log(" data: " + data)
            if (data === 'inventory Order removed') {
                setInventoryOrderDeleted(!inventoryOrderDeleted)
                navigate(`/admin/vendors/${vendorId}`)
            }
        }
    }
    useEffect(() => {
        getVendor(vendorId)
            .then((res) => setVendor(res))
            .catch(er => console.log(er))
    }, [payVendorResponseState, inventoryOrderDeleted])
    useEffect(() => {
        const abctrl = new AbortController()
        fetchVendorInventoryOrders(abctrl, vendorId)
            .then((res) => setInventoryOrders(res))
            .catch(er => console.log(er))
        fetchInventoryTransactions(vendorId)
            .then((res) => {
                setTransactions(res)
            })
            .catch(er => console.log(er))
        return () => abctrl.abort()
    }, [inventoryOrderDeleted,payVendorResponseState])
    return (
        <Row className="m-5">
             <Link to="/admin/vendors">
        <Button variant="success">{"<-"}Go back to all Vendors</Button>{" "}
        </Link>
            <Col md={12}>
                <Row>
                    <Col md={6}><h1 style={{ textAlign: "center" }}>{vendor.name}</h1></Col>
                    <Col md={6}><h1 style={{ textAlign: "center" }}>Remaining Amount: {vendor.totalAmount - vendor.totalAmountPaid}</h1></Col>
                </Row>

                <Container>
                    <Row className="mt-5">
                        <Col md={6} >
                            <Row className="mb-2">
                                <Col><h3>Orders List{"  "}</h3></Col>
                                <Col>
                                    <LinkContainer className="w-100" to={`/admin/vendors/${vendorId}/add-inventoryOrder`}>
                                        <Button variant="primary" size="lg">
                                            Add new order
                                        </Button>
                                    </LinkContainer>
                                </Col>
                            </Row>


                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Per Item</th>
                                        <th>Total Price</th>
                                        {/* <th>Edit/Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryOrders.map((inventoryOrder, idx) => {
                                        return (
                                            <tr key={idx} >
                                                <td>{idx}</td>
                                                <td>{inventoryOrder.date.substring(0, 10)}</td>
                                                <td>{inventoryOrder.ingredient}</td>
                                                <td>{inventoryOrder.quantity}</td>
                                                <td>{inventoryOrder.pricePerItem ? (inventoryOrder.pricePerItem + "/-") : "-"}</td>
                                                <td>{inventoryOrder.totalAmount + "/-"}</td>

                                                {/* <td><LinkContainer to={`/admin/edit-vendor/${inventoryOrder._id}`}>
                                                    <Button className="btn-sm">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </LinkContainer>
                                                    {" / "}
                                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(vendorId, inventoryOrder._id)}>
                                                        <i className="bi bi-x-circle"></i>
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-2">
                                <Col><h3 >Transactions{"  "}</h3></Col>
                                <Col>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                                        <Form.Group className="flex-container" controlId="formBasicAmount">
                                            <InputGroup >

                                                <Form.Control required name="amount" type="number" placeholder="Enter Amount" />
                                                <Button variant="primary" type="submit" size="lg">
                                                    {payVendorResponseState &&
                                                        payVendorResponseState.loading === true ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />) : (
                                                        ""
                                                    )}
                                                    Pay
                                                </Button>
                                            </InputGroup>

                                        </Form.Group>

                                    </Form></Col>
                            </Row>
                            {
                            transactions ? (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Amount Paid</th>
                                            <th>Orders Amount</th>
                                        </tr>
                                    </thead>
                                    {console.log(transactions)}
                                    <tbody>
                                        {transactions.transactions.map((transaction, idx) => {
                                            
                                            return (
                                                <tr key={idx} >
                                                    <td>{idx + 1}</td>
                                                    <td>{transaction.date}</td>
                                                    <td>{transaction.amountPaid}</td>
                                                    <td>{transaction.amountToBePaid}</td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            ) : ("")}
                        </Col>

                    </Row>
                </Container>

            </Col>
        </Row>
    );
}
export default AdminVendorDetailsPageComponent;