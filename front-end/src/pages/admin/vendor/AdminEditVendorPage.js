import axios from "axios";
import AdminEditVendorPageComponent from "./components/AdminEditVendorComponent";
const updateVendorApiRequest=async(id,name,phoneNumber,email,idCardNumber)=>{
    const {data}=await axios.put(`/api/vendors/admin/${id}`,{name,phoneNumber,email,idCardNumber})
    return data
}
const fetchVendor=async(id)=>{
    const {data}=await axios.get(`/api/vendors/admin/${id}`)
    return data
}
const AdminEditVendorPage = () => {
    return (
        <AdminEditVendorPageComponent updateVendorApiRequest={updateVendorApiRequest} fetchVendor={fetchVendor} ></AdminEditVendorPageComponent>
    )
};
export default AdminEditVendorPage;