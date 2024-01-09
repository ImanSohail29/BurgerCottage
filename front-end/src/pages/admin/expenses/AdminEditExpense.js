import axios from "axios";
import AdminEditExpenseComponent from "./components/AdminEditExpenseComponent";
const fetchExpense = async (id) => {
    const { data } = await axios.get(`/api/expenses/admin/${id}`)
    return data
}
const updateExpenseApiRequest = async (id, formInputs) => {
    const { data } = await axios.put(`/api/expenses/admin/${id}`, { ...formInputs })
    return data
}

const AdminEditExpense = () => {

    return (
        <AdminEditExpenseComponent
            fetchExpense={fetchExpense}
            updateExpenseApiRequest={updateExpenseApiRequest}
            >
        </AdminEditExpenseComponent>
    )
};
export default AdminEditExpense;