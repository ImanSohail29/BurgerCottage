import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { convertToDateString, getHour, nextDate, toTime } from "../../utils";

const AdminReportDetailsComponent = ({ getExpenses, getOrders, getReport }) => {
    const [expensesData, setExpensesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [todaysReportData, setTodaysReportData] = useState({});
    const [searchDate, setSearchDate] = useState('');
    const [nextSearchDate, setNextSearchDate] = useState('');
    const dispatch = useDispatch();
    const { date } = useParams();

    useEffect(() => {
        getExpenses()
            .then((data) => setExpensesData(data))
            .catch((er) =>
                dispatch(logout())
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            );

        getOrders()
            .then((data) => setOrdersData(data))
            .catch((er) =>
                dispatch(logout())
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            );
        getReport()
            .then((data) => {
                setReportData(data)
                setTodaysReportData(data.find((data) => data.createdAt.substring(0, 10) === date))
            }
            )
            .catch((er) =>
                dispatch(logout())
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            );
        setSearchDate(date)
        setNextSearchDate(nextDate(date).substring(0, 10))
    }, []);


    return (
        <Row className="m-5">
            <Col >
                {console.log(todaysReportData)}
                <Row>
                    <Col md={8}>
                        <h1>Report Details</h1>
                    </Col>
                    <Col className="mt-2" md={3}>
                        <input type="date" className="form-control" defaultValue={date} onChange={e => {
                            setSearchDate(e.target.value.toString())
                            setNextSearchDate(nextDate(e.target.value.toString()).substring(0, 10))
                            setTodaysReportData(reportData.find((data) => (data.createdAt.substring(0, 10) === e.target.value.toString())
                            ))
                        }} />
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order Id</th>
                                        <th>Time</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(searchDate)}
                                    {console.log(nextSearchDate)}

                                    {ordersData
                                        .filter((data) => {
                                            return (searchDate === '')
                                                ? true
                                                : (searchDate !== '')
                                                    ? (data.orderPlacedAt.substring(0, 10) === searchDate && getHour(data.orderPlacedAt) > 6) || (data.orderPlacedAt.substring(0, 10) === nextSearchDate && getHour(data.orderPlacedAt) < 6)
                                                    : null
                                        }).map((orderData, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    {console.log(getHour(orderData.orderPlacedAt))}

                                                    <td>{idx + 1}</td>
                                                    <td><Link to={`/admin/order-details/${orderData._id}`}>{orderData._id} </Link></td>
                                                    <td>{(toTime(orderData.orderPlacedAt))}</td>
                                                    <td className="text-end">{orderData.orderTotal.cartSubtotal}</td>
                                                </tr>)
                                        })
                                    }
                                    {todaysReportData ?
                                        <tr>
                                            <td className="bg-success text-light" colSpan={2}><b>Total Sale:  </b></td>
                                            <td className="bg-success text-light text-end" colSpan={2}><b>{todaysReportData.totalSale}</b></td>
                                        </tr> : ("")}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Expense</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expensesData
                                        .filter((data) => {
                                            return (searchDate === '')
                                                ? true
                                                : (searchDate !== '')
                                                    ? (data.date.substring(0, 10) === searchDate && getHour(data.date) > 6) || (data.date.substring(0, 10) === nextSearchDate && getHour(data.date) < 6)
                                                    : null
                                        }).map((expense, idx) => {
                                            return (
                                                <tr key={idx}>

                                                    <td>{idx + 1}</td>
                                                    <td>{expense.name}</td>
                                                    <td className="text-end">{expense.totalAmount}</td>
                                                </tr>)
                                        })
                                    }
                                    {todaysReportData ?
                                        <tr>
                                            <td className="bg-danger  text-light" colSpan={2}><b className="">Total Expenses:</b></td>
                                            <td className="bg-danger  text-light text-end" colSpan={2}><b className="">{ todaysReportData.totalExpenses}</b></td>
                                        </tr> : ("")}
                                </tbody>
                            </Table>
                        </Col>

                    </Row>
                </Container>

            </Col>
        </Row>
    );
};

export default AdminReportDetailsComponent;
