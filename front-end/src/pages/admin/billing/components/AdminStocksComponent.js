import { Row, Col, Table, Button, Form, InputGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const AdminStocksPageComponent = ({ getStocks, deleteStock }) => {
    const [stocks, setStocks] = useState([]);
    const [stockDeleted, setStockDeleted] = useState(false)

    useEffect(() => {
        getStocks()
            .then((stocks) => {
                setStocks(stocks)})
            .catch((er) => { }
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            );
    }, []);
    useEffect(() => {
        getStocks()
            .then((stocks) => {
                console.log("stocks:"+JSON.stringify(stocks))
                setStocks(stocks)})
            .catch((er) => { 
                setStocks([])
                // console.log(
                //   er.response.data.message ? er.response.data.message : er.response.data
                // )
            }  
            );
    }, [stockDeleted,setStockDeleted]);
    const deleteHandler = async (stockId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteStock(stockId)
            if (data.message === "stock removed") {
                setStockDeleted(!stockDeleted)
            }
        }
    }
    return (
        <Row className="animate-bottom">
            <Col >
                        
              <Container className="m-5"><h1>Stocks</h1>
              <LinkContainer to={"/admin/add-stock"}>
                            <Button variant="success" className="m-2" size="lg">Add New Stock</Button>
                        </LinkContainer>
                {stocks.length > 0 ? (
                    <Row><Col>
                    <h2 style={{backgroundColor:"green"}}>In Stock</h2>
                     <Table className="table" style={{ backgroundColor: "red" }} bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>edit/delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                 stocks.map((stock, idx) => (
                                    stock.inStock?(
                                    <tr className="table-danger" key={stock._id} >
                                        <td>{idx + 1}</td>
                                        <td>{stock.name}</td>
                                        <td>{stock.quantity}</td>
                                        <td><LinkContainer to={`/admin/edit-stock/${stock._id}`}>
                                            <Button className="btn-sm">
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </LinkContainer>
                                            {" / "}
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(stock._id)}>
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                    ):("")
                                ))
                            }
                        </tbody>
                    </Table></Col>
                    <Col>
                    <h2 style={{backgroundColor:"red"}}>Out of Stock</h2>

                    <Table className="table" style={{ backgroundColor: "red" }} bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>edit/delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks.map((stock, idx) => (
                                    !stock.inStock?(
                                    <tr className="table-danger" key={stock._id} >
                                        <td>{idx + 1}</td>
                                        <td>{stock.name}</td>
                                        <td>{stock.quantity}</td>
                                        <td><LinkContainer to={`/admin/edit-stock/${stock._id}`}>
                                            <Button className="btn-sm">
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </LinkContainer>
                                            {" / "}
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(stock._id)}>
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                    ):("")
                                ))
                            }
                        </tbody>
                    </Table></Col></Row>
                    ): (<Col style={{ textAlign: "center", justifyContent: "center" }}><h1 className="loader">
                        </h1></Col>
                    
                    )
                }
        </Container>

            </Col>
        </Row>

    );
};

export default AdminStocksPageComponent;
