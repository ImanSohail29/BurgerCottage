import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import useSound from 'use-sound'

const AdminOrdersPageComponent = ({ getOrders, socketIOClient }) => {
  const [orders, setOrders] = useState([]);
  const audio = new Audio("/sounds/newOrderSound.mp3");
  const audioButtonRef = useRef(null)

  const [play] = useSound("/sounds/newOrderSound.mp3");
  const dispatch = useDispatch();
  const toTime = (timeString) => {
    const date = new Date(timeString)
    let n = date.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    return n
  }

  useEffect(() => {
    const socket = socketIOClient();
    socket.on("newOrder", (data) => {
      getOrders()
        .then((orders) => setOrders(orders))
        .catch((er) =>
          dispatch(logout())
          // console.log(
          //   er.response.data.message ? er.response.data.message : er.response.data
          // )
        );
        audioButtonRef.current.click()
    })
  }, []);
  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) =>
        dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, []);
  return (
    <Row className="m-5">
      <Button ref={audioButtonRef} hidden={true} onClick={()=>{
        play()}}></Button>
      <Col >
      {orders.length>0?(<><h1>Orders</h1>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total</th>
              <th>Done</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              !order.isDone?(
              <tr className="table-danger" key={idx} >
                <td>{idx + 1}</td>
                <td>
                  {order.customerInfo ? (
                    <>
                      {order.customerInfo.name} {order.customerInfo.phoneNumber}
                    </>
                  ) : null}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{toTime(order.createdAt)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDone ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${order._id}`}>
                    go to order
                  </Link>
                </td>
              </tr>
              ):(!order.isDelivered)?(
                <tr className="table-success" key={idx} >
                <td>{idx + 1}</td>
                <td>
                  {order.customerInfo ? (
                    <>
                      {order.customerInfo.name} {order.customerInfo.phoneNumber}
                    </>
                  ) : null}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{toTime(order.createdAt)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDone ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${order._id}`}>
                    go to order
                  </Link>
                </td>
              </tr>
              ):(<tr key={idx} >
                <td>{idx + 1}</td>
                <td>
                  {order.customerInfo ? (
                    <>
                      {order.customerInfo.name} {order.customerInfo.phoneNumber}
                    </>
                  ) : null}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{toTime(order.createdAt)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDone ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${order._id}`}>
                    go to order
                  </Link>
                </td>
              </tr>)
            ))}
          </tbody>
        </Table></>):(<h1>Loading...</h1>)
        }
        
      </Col>
    </Row>
  );
};

export default AdminOrdersPageComponent;
