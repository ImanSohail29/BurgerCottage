import { Row, Col, Table, Button, Form, InputGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getDate} from "../../utils";
import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import useSound from 'use-sound'

const AdminOrdersPageComponent = ({ getOrders, socketIOClient }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('')
  const [searchId, setSearchId] = useState('')
  const [searchDate, setSearchDate] = useState('')
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
    <Row className="animate-bottom">
      <Button ref={audioButtonRef} hidden={true} onClick={() => {
        play()
      }}></Button>
      <Col >
        {orders.length > 0 ? (<Container><h1>Orders</h1>
          <Form className="mb-3 w-25">
            <InputGroup>
              <Form.Control onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Search by name or phone number..."></Form.Control>
            </InputGroup>
          </Form>
          {console.log(searchDate)}
          <Table className="table" style={{backgroundColor:"red"}} bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>order Id <input type="text" className="form-control" onChange={e => setSearchId(e.target.value.toUpperCase())} /></th>
                <th>User</th>
                <th>Date <input type="date" className="form-control" onChange={e => setSearchDate(getDate(e.target.value.toString()))} /></th>
                <th>Time</th>
                <th>Total</th>
                <th>Done</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Payment Method</th>
                <th>Service Type</th>
                <th>Order details</th>
              </tr>
            </thead>
            <tbody>
              {
              orders
                .filter((order) => {
                  return ( searchDate === '')
                    ? true
                    : (searchDate !== '')
                    ? getDate(order.createdAt) === searchDate
                    : null
                }
                )
                .filter((order) => {
                  return (search.toLowerCase() === '')
                    ? true
                    : (order.customerInfo !== undefined && order.customerInfo.phoneNumber !== undefined && order.customerInfo.name !== undefined)
                    ? order.customerInfo.phoneNumber.includes(search) || order.customerInfo.name.toLowerCase().includes(search)
                    : null
                }
                )
                .filter((order) => {
                  return (searchId === '')
                    ? true
                    : (searchId !== '')
                    ? order._id.includes(searchId)
                    : null
                }
                )
                .map((order, idx) => (
                  !order.isDone ? (
                    <tr className="table-danger" key={order._id} >
                      <td>{idx + 1}</td>
                      <td>{order._id}</td>
                      <td>
                        {order.customerInfo ? (
                          <>
                            {order.customerInfo.name} {order.customerInfo.phoneNumber}
                          </>
                        ) : null}
                      </td>
                      <td>{getDate(order.createdAt)}</td>
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
                      <td>{order.serviceMode}</td>
                      <td>
                        <Link to={`/admin/order-details/${order._id}`}>
                          go to order
                        </Link>
                      </td>
                    </tr>
                  ) : (!order.isDelivered) ? (
                    <tr className="table-success" key={idx} >
                      <td>{idx + 1}</td>
                      <td>{order._id}</td>
                      <td>
                        {order.customerInfo ? (
                          <>
                            {order.customerInfo.name} {order.customerInfo.phoneNumber}
                          </>
                        ) : null}
                      </td>
                      <td>{getDate(order.createdAt)}</td>
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
                      <td>{order.serviceMode}</td>
                      <td>
                        <Link to={`/admin/order-details/${order._id}`}>
                          go to order
                        </Link>
                      </td>
                    </tr>
                  ) : (<tr key={idx} >
                    <td>{idx + 1}</td>
                    <td>{order._id}</td>
                    <td>
                      {order.customerInfo ? (
                        <>
                          {order.customerInfo.name} {order.customerInfo.phoneNumber}
                        </>
                      ) : null}
                    </td>
                    <td>{getDate(order.createdAt)}</td>
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
                    <td>{order.serviceMode}</td>
                    <td>
                      <Link to={`/admin/order-details/${order._id}`}>
                        go to order
                      </Link>
                    </td>
                  </tr>)
                ))}
            </tbody>
          </Table></Container>) : (<Col style={{ textAlign: "center", justifyContent: "center" }}><h1 className="loader"></h1></Col>)
        }

      </Col>
    </Row>
  );
};

export default AdminOrdersPageComponent;
