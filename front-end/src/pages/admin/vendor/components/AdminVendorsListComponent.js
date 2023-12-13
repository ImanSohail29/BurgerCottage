import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminVendorsListComponent = ({ fetchVendors ,  deleteVendor }) => {
    const navigate=useNavigate()
    const [vendors, setVendors] = useState([])
    const [vendorDeleted, setVendorDeleted] = useState(false)

    const deleteHandler = async (vendorId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteVendor(vendorId)
            console.log(" data: "+data)
            if (data === 'vendor removed') {
                setVendorDeleted(!vendorDeleted)
                navigate("/admin/vendors")
            }
        }
    }
    useEffect(() => {
        const abctrl = new AbortController()
        fetchVendors(abctrl)
        .then((res) => setVendors(res))
        .catch(er => console.log(er))
        return () => abctrl.abort()
    }, [vendorDeleted])
    return (
        <Row className="m-5">
            <Col md={12}>
                <h1>Vendors List{"  "}<LinkContainer to="/admin/vendors/">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </LinkContainer></h1>
                
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vendor Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Id Card Number</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor, idx) => {
                            return (
                                <LinkContainer key={idx} to={`/admin/vendors/${vendor._id}`}>
                                <tr >
                                    <td>{idx}</td>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.phoneNumber}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.idCardNumber?(vendor.idCardNumber):"-"}</td>
                                    <td><LinkContainer to={`/admin/edit-vendor/${vendor._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        </LinkContainer>
                                        {" / "}
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(vendor._id)}>
                                            <i className="bi bi-x-circle"></i>
                                        </Button>
                                    </td>
                                </tr>
                                </LinkContainer>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );

};
export default AdminVendorsListComponent;