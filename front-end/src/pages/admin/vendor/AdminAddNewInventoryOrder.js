import axios from "axios"
import AdminAddNewInventoryOrderComponent from "./components/AdminAddNewInventoryOrderComponent"
const addNewInventoryOrderApiRequest=async(formInputs)=>{
    const {data}=await axios.post("/api/inventoryOrder/admin",{...formInputs})
    return data
}
const AdminAddNewInventoryOrder=()=>{
    
    return(
        <AdminAddNewInventoryOrderComponent addNewInventoryOrderApiRequest={addNewInventoryOrderApiRequest}></AdminAddNewInventoryOrderComponent>
    )
}
export default AdminAddNewInventoryOrder;