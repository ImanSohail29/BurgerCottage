import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrdersPageComponent = ({ getOrders }) => {
    const [orders,setOrders]=useState([])
    const [loaded,setLoaded]=useState(false)
    const toTime = (timeString) => {
        const date = new Date(timeString)
        let n = date.toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        return n
      }
    useEffect(()=>{
        getOrders()
        .then((data) =>
        {setOrders(data)
        setLoaded(true)})
        .catch((er)=>console.log(er))
    },[])
    return (
        orders.length>0?(
            <Row className="m-5 animate-bottom">
            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Total</th>
                            <th>Service Mode</th>
                            <th>Completed</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{toTime(order.createdAt)}</td>
                                    <td>Rs.{order.orderTotal.cartSubtotal} /-</td>
                                    <td>{order.serviceMode}</td>
                                    <td>{order.serviceMode==="delivery"?(order.isDelivered?<i className="bi bi-check-lg text-success"></i>:<i className="bi bi-x-lg text-danger"></i>):(order.isDone?<i className="bi bi-check-lg text-success"></i>:<i className="bi bi-x-lg text-danger"></i>)}</td>
                                    <td><Link style={{ cursor: "pointer" }} to={`/user/order-details/${order._id}`}>Go to details</Link></td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
        ):(
            loaded?(<h5>No orders yet...</h5>):(<Col style={{textAlign:"center", justifyContent:"center"}}><h1 className="loader"></h1></Col>)
        )
        
    )
};
export default UserOrdersPageComponent;