import axios from "axios"
import AdminPayInventoryOrderComponent from "./components/AdminPayInventoryOrderComponent"
const payVendorApiRequest=async(formInputs)=>{
    const {data}=await axios.post(`/api/inventoryOrder/admin/${vendorId}/pay`,{...formInputs})
    return data
}
const AdminPayInventoryOrder=()=>{
    
    return(
        <AdminPayInventoryOrderComponent payVendorApiRequest={payVendorApiRequest}></AdminPayInventoryOrderComponent>
    )
}
export default AdminPayInventoryOrder;