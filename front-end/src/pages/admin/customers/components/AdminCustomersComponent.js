import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCustomersComponent = ({ fetchCustomers}) => {
    const navigate=useNavigate()
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        const abctrl = new AbortController()
        fetchCustomers(abctrl)
        .then((res) => setCustomers(res))
        .catch(er => console.log(er))
        return () => abctrl.abort()
    }, [])
    return (
        customers.length>0?(
            <Row className="m-5 animate-bottom">
            <Col md={12}>
                <h1>Customers List</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, idx) => {
                            return (
                                <tr >
                                    <td>{idx}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address?(customer.address):"-"}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
        ):(
            <Col style={{textAlign:"center", justifyContent:"center"}}><h1 className="loader"></h1></Col>
        )
        
    );

};
export default AdminCustomersComponent;