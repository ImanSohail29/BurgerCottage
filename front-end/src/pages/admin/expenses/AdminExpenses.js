import AdminExpensesComponent from "./components/AdminExpensesComponent";
import axios from "axios";

const getExpenses = async (abctrl) => {
    const { data } = await axios.get("/api/expenses/admin",{
        signal:abctrl.signal,
    })
    return data;
}

const deleteExpense=async(id)=>{
    const {data}=await axios.delete(`/api/expenses/admin/${id}`)
    return data
}
const AdminExpenses=()=>{
    const abctrl=""
    return <AdminExpensesComponent getExpenses={()=>getExpenses(abctrl)} deleteExpense={deleteExpense} ></AdminExpensesComponent>
}
export default AdminExpenses;