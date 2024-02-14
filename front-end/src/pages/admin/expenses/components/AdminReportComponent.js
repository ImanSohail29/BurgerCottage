import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { logout } from "../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const AdminReportComponent = ({ getReport }) => {
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getReport()
      .then((reportData) => setReportData(reportData))
      .catch((er) =>
      dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, []);
  
  return (
    <Row className="m-5">
      <Col >
        <h1>Report <LinkContainer to={"/admin/expenses"}>
                            <Button variant="primary" className="ms-2" size="lg">Daily Expenses</Button>
                        </LinkContainer></h1>
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total Expenses</th>
              <th>Total Sale</th>
              <th>Profit</th>
              <th>Total Profit</th>
              {/* <th>Detail</th> */}
            </tr>
          </thead>
          <tbody>
            {reportData.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{data.date}</td>
                <td>{data.totalExpenses}</td>
                <td>{data.totalSale}</td>
                <td>{data.profit}</td>
                <td>{data.totalProfit}</td>
                {/* <td>
                  <Link to={`/admin/report/${data.date}`}>
                    go to detail
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminReportComponent;
