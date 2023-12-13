import axios from "axios"
import AdminCreateNewVendorComponent from "./components/AdminCreateNewVendorComponet"
const createNewVendorApiRequest=async(formInputs)=>{
    const {data}=await axios.post("/api/vendors/admin",{...formInputs})
    return data
}
const AdminCreateNewVendorPage=()=>{
    
    return(
        <AdminCreateNewVendorComponent createNewVendorApiRequest={createNewVendorApiRequest}></AdminCreateNewVendorComponent>
    )
}
export default AdminCreateNewVendorPage;