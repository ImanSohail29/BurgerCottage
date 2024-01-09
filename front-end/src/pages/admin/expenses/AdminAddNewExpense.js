import axios from "axios"
import AdminAddNewExpenseComponent from "./components/AdminAddNewExpenseComponent"
const addNewExpenseApiRequest=async(formInputs)=>{
    const {data}=await axios.post("/api/expenses/admin",{...formInputs})
    return data
}


const AdminAddNewExpense=()=>{
    return(
        <AdminAddNewExpenseComponent addNewExpenseApiRequest={addNewExpenseApiRequest}></AdminAddNewExpenseComponent>
    )
}
export default AdminAddNewExpense;