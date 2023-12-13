import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const AdminVendorDetailsPageComponent = ({ getVendor,fetchVendorInventoryOrders, deleteVendorInventoryOrder }) => {
    const { vendorId } = useParams()
    const navigate = useNavigate();
    const [vendor, setVendor] = useState([])
    const [inventoryOrders, setInventoryOrders] = useState([])
    const [inventoryOrderDeleted, setInventoryOrderDeleted] = useState(false)

    const deleteHandler = async (vendorId, inventoryOrderId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteVendorInventoryOrder(vendorId, inventoryOrderId)
            console.log(" data: " + data)
            if (data === 'order deleted') {
                setInventoryOrderDeleted(!inventoryOrderDeleted)
                navigate("/admin/vendors")
            }
        }
    }
    useEffect(()=>{
        getVendor(vendorId)
        .then((res) => setVendor(res))
        .catch(er => console.log(er))
    },[])
    useEffect(() => {
        const abctrl = new AbortController()
        fetchVendorInventoryOrders(abctrl,vendorId)
            .then((res) => setInventoryOrders(res))
            .catch(er => console.log(er))
        return () => abctrl.abort()
    }, [inventoryOrderDeleted])
    return (
        <Row className="m-5">
            <Col md={12}>
<h1 style={{textAlign:"center"}}>{vendor.name}</h1>
                <Container>
                    <Row className="mt-5">
                        <Col md={6}>
                            <h3>Orders List{"  "}
                                <LinkContainer to={`/admin/vendors/${vendorId}/add-inventoryOrder`}>
                                    <Button variant="primary" size="lg">
                                        Add new order
                                    </Button>
                                </LinkContainer>
                            </h3>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                        <th>Date</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Per Item</th>
                                        <th>Total Price</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryOrders.map((inventoryOrder, idx) => {
                                        return (
                                            <tr >
                                                <td>{idx}</td>
                                                <td>{inventoryOrder.date.substring(0, 10)}</td>
                                                <td>{inventoryOrder.ingredient}</td>
                                                <td>{inventoryOrder.quantity}</td>
                                                <td>{inventoryOrder.pricePerItem ? (inventoryOrder.pricePerItem+"/-") : "-"}</td>
                                                <td>{inventoryOrder.totalAmount+"/-"}</td>

                                                <td><LinkContainer to={`/admin/edit-vendor/${inventoryOrder._id}`}>
                                                    <Button className="btn-sm">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </LinkContainer>
                                                    {" / "}
                                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(vendorId, inventoryOrder.id)}>
                                                        <i className="bi bi-x-circle"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <h3 >Transactions{"  "}
                                <LinkContainer to={`/admin/vendors/${vendorId}/add-transaction`}>
                                    <Button variant="primary" size="lg">
                                        Pay
                                    </Button>
                                </LinkContainer>
                            </h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                        <th>Date</th>
                                        <th>Todays Total</th>
                                        <th>Paid today</th>
                                        <th>Total Paid</th>
                                        <th>To be Paid</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryOrders.map((inventoryOrder, idx) => {
                                        return (
                                            <tr >
                                                <td>{idx}</td>
                                                <td>{inventoryOrder.name}</td>
                                                <td>{inventoryOrder.phoneNumber}</td>
                                                <td>{inventoryOrder.email}</td>
                                                <td>{inventoryOrder.idCardNumber ? (inventoryOrder.idCardNumber) : "-"}</td>
                                                <td><LinkContainer to={`/admin/edit-vendor/${inventoryOrder._id}`}>
                                                    <Button className="btn-sm">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </LinkContainer>
                                                    {" / "}
                                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(vendorId, inventoryOrder.id)}>
                                                        <i className="bi bi-x-circle"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table></Col>

                    </Row>
                </Container>

            </Col>
        </Row>
    );
}
export default AdminVendorDetailsPageComponent;