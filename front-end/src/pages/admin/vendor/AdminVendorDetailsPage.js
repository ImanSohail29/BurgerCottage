import axios from "axios";
import AdminVendorDetailsPageComponent from "./components/AdminVendorDetailsPageComponent";
const fetchVendorInventoryOrders=async(abctrl,vendorId)=>{
    const {data}=await axios.get(`/api/inventoryOrders/admin/${vendorId}/inventory-orders`,{signal:abctrl.signal})
    return data
}
const deleteVendorInventoryOrder=async(vendorId,orderId)=>{
    const {data}=await axios.delete(`/api/vendors/admin/${vendorId}/inventory-orders/${orderId}`)
    return data
}
const getVendor=async(vendorId)=>{
    const {data}=await axios.get(`/api/vendors/admin/${vendorId}`)
    return data
}
const AdminVendorDetailsPage =() => {
return <AdminVendorDetailsPageComponent getVendor={getVendor} fetchVendorInventoryOrders={fetchVendorInventoryOrders} deleteVendorInventoryOrder={deleteVendorInventoryOrder}>
       </AdminVendorDetailsPageComponent>
};
export default AdminVendorDetailsPage;