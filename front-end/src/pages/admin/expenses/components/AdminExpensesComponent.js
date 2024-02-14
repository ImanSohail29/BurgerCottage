import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import {logout} from "../../../../redux/slices/userSlice"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { convertToDateString } from "../../utils";
const AdminExpensesComponent = ({ getExpenses, deleteExpense}) => {
    const [expenses, setExpenses] = useState([])
    const [expenseDeleted, seExpenseDeleted] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteHandler = async (expenseId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteExpense(expenseId)
            console.log(" data: " + data)
            if (data === 'Expense removed') {
                seExpenseDeleted(!expenseDeleted)
            }
        }
    }
   
    useEffect(() => {
        const abctrl = new AbortController();
        getExpenses(abctrl)
        .then((data) => setExpenses(data))
        .catch((er)=>console.log(er.response.data.message ? er.response.data.message : er.response.data))
            // .catch(er => dispatch(logout()))
        return () => abctrl.abort()
    }, [expenseDeleted])


    return (
        expenses.length>0?(
            <Row className="m-5 animate-bottom">
            <Col md={12}>                
                {expenses.length > 0 ? (<>
                    <h1>Expenses List</h1>
                    <LinkContainer to={"/admin/create-new-expense"}>
                    <Button variant="primary" className="ms-2" size="lg">Create new Expense</Button>
                </LinkContainer>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Price Per Item</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(expenses)}
                            {expenses.map((expense, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{convertToDateString(expense.date)}</td>
                                        <td>{expense.name}</td>
                                        <td>{expense.pricePerItem}</td>
                                        <td>{expense.quantity}</td>
                                        <td>{expense.totalAmount}</td>
                                        <td><LinkContainer to={`/admin/edit-expense/${expense._id}`}><Button className="btn-sm"><i className="bi bi-pencil-square"></i></Button></LinkContainer>{"/"}<Button variant="danger" className="btn-sm" onClick={() => deleteHandler(expense._id)}><i className="bi bi-x-circle"></i></Button></td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                </>) : (<>No Expenses yet
                    <LinkContainer to={"/admin/create-new-expense"}>
                        <Button variant="primary" className="ms-2" size="lg">Create new Expense</Button>
                    </LinkContainer></>)}

            </Col>
        </Row>
        ):(
            <Col style={{textAlign:"center", justifyContent:"center"}}><h1 className="loader"></h1></Col>
        )
        
    )



};
export default AdminExpensesComponent;