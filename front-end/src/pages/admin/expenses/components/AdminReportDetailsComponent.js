import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { convertToDateObj, convertToDateString, getHour, nextDate, toTime } from "../../utils";

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
        setSearchDate(date)
        setNextSearchDate(nextDate(date).substring(0, 10))
    }, []);
    useEffect(() => {
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
    }, [searchDate,nextSearchDate]);


    return (
        <Row className="m-5">
            <Col >
                {console.log("searchDate: "+searchDate)}
                {console.log("nextSearchDate: "+nextSearchDate)}
                {console.log(convertToDateObj(searchDate).getTime()<convertToDateObj(nextSearchDate).getTime())}

                <Row>
                    <Col md={8}>
                        <h1>Report Details</h1>
                    </Col>
                    <Col className="mt-2" md={3}>
                        <input type="date" className="form-control m-1" defaultValue={date} onChange={e => {
                            setSearchDate(e.target.value.toString())
                            setNextSearchDate(nextDate(e.target.value.toString()).substring(0, 10))
                            setTodaysReportData(reportData.find((data) => (data.createdAt.substring(0, 10) === e.target.value.toString())
                            ))
                        }} />
                        <input type="date" className="form-control m-1" defaultValue={nextSearchDate} onChange={e => {
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
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersData
                                        .filter((data) => {
                                            return (searchDate === '')
                                                ? true
                                                : (searchDate !== '')
                                                    ? (data.orderPlacedAt.substring(0, 10) === searchDate && getHour(data.orderPlacedAt) > 6) || 
                                                      (data.orderPlacedAt.substring(0, 10) === searchDate && getHour(data.orderPlacedAt) > 6) ||
                                                      (convertToDateObj(searchDate).getTime()<convertToDateObj(data.orderPlacedAt.substring(0, 10)).getTime() 
                                                      && convertToDateObj(nextSearchDate).getTime()>convertToDateObj(data.orderPlacedAt.substring(0, 10)).getTime())
                                                    : null
                                        }).map((orderData, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td><Link to={`/admin/order-details/${orderData._id}`}>{orderData._id} </Link></td>
                                                    <td>{convertToDateString(orderData.orderPlacedAt)}</td>
                                                    <td>{toTime((orderData.orderPlacedAt))}</td>
                                                    <td className="text-end">{orderData.orderTotal.cartSubtotal}</td>
                                                </tr>)
                                        })
                                    }
                                    {todaysReportData ?
                                        <tr>
                                            <td className="bg-success text-light" colSpan={4}><b>Total Sale:  </b></td>
                                            <td className="bg-success text-light text-end" colSpan={1}><b>{todaysReportData.totalSale}</b></td>
                                        </tr> : ("")}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
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
                                                    ? (data.date.substring(0, 10) === searchDate && getHour(data.date) > 6) || 
                                                    (data.date.substring(0, 10) === nextSearchDate && getHour(data.date) < 6)||
                                                    (convertToDateObj(searchDate).getTime()<convertToDateObj(data.date.substring(0, 10)).getTime() 
                                                    && convertToDateObj(nextSearchDate).getTime()>convertToDateObj(data.date.substring(0, 10)).getTime())
                                                  
                                                    : null
                                        }).map((expense, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{convertToDateString(expense.date)}</td>
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
