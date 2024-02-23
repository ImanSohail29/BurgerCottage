import { Row, Col, Table, Button, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { convertToDateObj, convertToDateString, getHour, nextDate, toTime, previousDate } from "../../utils";

const AdminReportDetailsComponent = ({ getExpenses, getOrders, getReport, getReportFromDateToDate }) => {
    const [expensesData, setExpensesData] = useState([]);
    const [dataForReport, setDataForReport] = useState({});
    const [SumOfOrdersWRTPaymentMethod, setSumOfOrdersWRTPaymentMethod] = useState({});
    const { date } = useParams();
    const [ordersData, setOrdersData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [todaysReportData, setTodaysReportData] = useState({});
    const [searchDate, setSearchDate] = useState(date);
    const [nextSearchDate, setNextSearchDate] = useState(nextDate(date).substring(0,10));
    const dispatch = useDispatch();

    useEffect(() => {
        getExpenses()
            .then((data) =>
                setExpensesData(data))
            .catch((er) =>
                dispatch(logout())
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            );

        getOrders()
            .then((data) => {
                setOrdersData(data)
            })
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
    }, []);
    useEffect(() => {
        console.log("Hi i am here")
        console.log("searchDate: "+searchDate)
        console.log("nextSearchDate: "+nextSearchDate)
        console.log("reportData: "+reportData)
        console.log("todaysReportData: "+todaysReportData)
        console.log("SumOfOrdersWRTPaymentMethod: "+SumOfOrdersWRTPaymentMethod)


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
        if (searchDate !== '' && nextSearchDate !== '') {
            getReportFromDateToDate(searchDate, previousDate(nextSearchDate))
                .then((data) => {
                    let orderSum = 0;
                    let expenseSum = 0;
                    let profit = 0;

                    const reports = data.map((reportData) => {
                        orderSum += reportData.totalSale;
                        expenseSum += reportData.totalExpenses;
                        profit += reportData.profit;
                        return {
                            ordersSum: orderSum,
                            expensesSum: expenseSum,
                            profit:profit
                        };
                    });
                    let finalReportData = reports[reports.length - 1]
                    setDataForReport(finalReportData);
                }
                )
                .catch((er) =>
                    dispatch(logout())

                    // console.log(
                    //   er.response.data.message ? er.response.data.message : er.response.data
                    // )
                );
            let orderSumCash = 0;
            let orderSumOnline = 0;
            let orderSumJazzCash = 0;
            let orderSumEasyPaisa = 0;
            const sumOfOrdersWRT = ordersData.map((orderData) => {
                if ((orderData.orderPlacedAt.substring(0, 10) === searchDate && getHour(orderData.orderPlacedAt) > 6) ||
                    (orderData.orderPlacedAt.substring(0, 10) === nextSearchDate && getHour(orderData.orderPlacedAt) < 6) ||
                    (convertToDateObj(searchDate).getTime() < convertToDateObj(orderData.orderPlacedAt.substring(0, 10)).getTime()
                        && convertToDateObj(nextSearchDate).getTime() > convertToDateObj(orderData.orderPlacedAt.substring(0, 10)).getTime())) {
                    if (orderData.paymentMethod == "cash") {
                        orderSumCash += orderData.orderTotal.cartSubtotal;
                    }
                    if (orderData.paymentMethod == "online") {
                        orderSumOnline += orderData.orderTotal.cartSubtotal;
                    }
                    if (orderData.paymentMethod == "jazzcash") {
                        orderSumJazzCash += orderData.orderTotal.cartSubtotal;
                    }
                    if (orderData.paymentMethod == "easypaisa") {
                        orderSumEasyPaisa += orderData.orderTotal.cartSubtotal;
                    }
                }
                return {
                    ordersSumCash: orderSumCash,
                    ordersSumOnline: orderSumOnline,
                    ordersSumJazzCash: orderSumJazzCash,
                    ordersSumEasyPaisa: orderSumEasyPaisa,
                };
            });
            let finalSumOfOrders = sumOfOrdersWRT[sumOfOrdersWRT.length - 1]
            setSumOfOrdersWRTPaymentMethod(finalSumOfOrders);
        }

    }, [ordersData,searchDate, nextSearchDate]);


    return (
        <Row className="m-5">
            <Col >
                <Row>
                    <h1>Report Details</h1>
                    <Row className="m-2">
                        <Col md={2}>
                            <Row className="justify-content-md-center " md={4}>
                                <input type="date" className="form-control form-control-lg m-1" defaultValue={date} onChange={e => {
                                    setSearchDate(e.target.value.toString())
                                    setTodaysReportData(reportData.find((data) => (data.createdAt.substring(0, 10) === e.target.value.toString())
                                    ))
                                }} />
                                <input type="date" className="form-control  form-control-lg m-1" defaultValue={nextSearchDate} onChange={e => {
                                    setNextSearchDate(nextDate(e.target.value.toString()).substring(0, 10))
                                    setTodaysReportData(reportData.find((data) => (data.createdAt.substring(0, 10) === e.target.value.toString())
                                    ))
                                }} />
                            </Row>
                        </Col>
                        <Col md={10}>
                            {SumOfOrdersWRTPaymentMethod ? (
                                <>
                                <Row className="justify-content-md-center m-1" md={4}>
                                    <div>
                                        <Card className="bg-danger bg-gradient text-white bg-opacity-75 border-start" >
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "1.2em" }}>Cash: {SumOfOrdersWRTPaymentMethod.ordersSumCash}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div>
                                        <Card className="bg-danger bg-gradient text-white bg-opacity-75 border-start" >
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "1.2em" }}>Online: {SumOfOrdersWRTPaymentMethod.ordersSumOnline}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div>
                                        <Card className="bg-danger bg-gradient text-white bg-opacity-75 border-start" >
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "1.2em" }}>JazzCash: {SumOfOrdersWRTPaymentMethod.ordersSumJazzCash}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div>
                                        <Card className="bg-danger bg-gradient text-white bg-opacity-75 border-start" >
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "1.2em" }}>EasyPaisa: {SumOfOrdersWRTPaymentMethod.ordersSumEasyPaisa}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Row>
                                <Row className="justify-content-md-center m-1" md={4}>
                                <div>
                                    <Card className="bg-success bg-gradient text-white bg-opacity-75 border-start" >
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: "1.2em" }}>Sale: {dataForReport.ordersSum}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div>
                                    <Card className="bg-success bg-gradient text-white bg-opacity-75 border-start" >
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: "1.2em" }}>Expenses: {dataForReport.expensesSum}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div>
                                    <Card className="bg-success bg-gradient text-white bg-opacity-75 border-start" >
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: "1.2em" }}>Revenue: {dataForReport.profit}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            </Row>
                            </>
                            ) : ("")}

                        </Col>
                    </Row>
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
                                                    (data.orderPlacedAt.substring(0, 10) === nextSearchDate && getHour(data.orderPlacedAt) < 6) ||
                                                    (convertToDateObj(searchDate).getTime() < convertToDateObj(data.orderPlacedAt.substring(0, 10)).getTime()
                                                        && convertToDateObj(nextSearchDate).getTime() > convertToDateObj(data.orderPlacedAt.substring(0, 10)).getTime())
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
                                    {todaysReportData && dataForReport ?
                                        <tr>
                                            <td className="bg-success text-light" colSpan={4}><b>Total Sale:  </b></td>
                                            <td className="bg-success text-light text-end" colSpan={1}><b>{dataForReport.ordersSum}</b></td>
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
                                                    (data.date.substring(0, 10) === nextSearchDate && getHour(data.date) < 6) ||
                                                    (convertToDateObj(searchDate).getTime() < convertToDateObj(data.date.substring(0, 10)).getTime()
                                                        && convertToDateObj(nextSearchDate).getTime() > convertToDateObj(data.date.substring(0, 10)).getTime())

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
                                    {todaysReportData && dataForReport ?
                                        <tr>
                                            <td className="bg-danger  text-light" colSpan={2}><b className="">Total Expenses:</b></td>
                                            <td className="bg-danger  text-light text-end" colSpan={2}><b className="">{dataForReport.expensesSum}</b></td>
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
