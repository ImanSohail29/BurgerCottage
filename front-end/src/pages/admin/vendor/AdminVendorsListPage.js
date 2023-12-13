import axios from "axios";
import AdminVendorsListComponent from "./components/AdminVendorsListComponent";
const fetchVendors=async(abctrl)=>{
    const {data}=await axios.get("/api/vendors/admin/",{signal:abctrl.signal})
    return data
}
const deleteVendor=async(vendorId)=>{
    const {data}=await axios.delete(`/api/vendors/admin/${vendorId}`)
    return data
}
const AdminVendorsListPage =() => {
    const abctrl=""
return <AdminVendorsListComponent fetchVendors={()=>fetchVendors(abctrl)} deleteVendor={deleteVendor}></AdminVendorsListComponent>
};
export default AdminVendorsListPage;