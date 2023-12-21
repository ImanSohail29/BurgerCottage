import axios from "axios";
import AdminVendorDetailsPageComponent from "./components/AdminVendorDetailsPageComponent";
const fetchVendorInventoryOrders = async (abctrl, vendorId) => {
    const { data } = await axios.get(`/api/inventoryOrders/admin/${vendorId}/inventory-orders`, { signal: abctrl.signal })
    return data
}
const deleteVendorInventoryOrder = async (vendorId, orderId) => {
    const { data } = await axios.delete(`/api/inventoryOrders/admin/${vendorId}/inventory-orders/${orderId}`)
    return data
}
const getVendor = async (vendorId) => {
    const { data } = await axios.get(`/api/vendors/admin/${vendorId}`)
    return data
}
const payVendorApiRequest = async (vendorId, amountPaid) => {
    const { data } = await axios.post(`/api/inventoryOrders/admin/${vendorId}/pay-vendor`, { amountPaid })
    return data
}
const fetchInventoryTransactions=async(vendorId)=>
{
    const { data } = await axios.get(`/api/inventoryOrders/admin/${vendorId}/inventory-transactions`)
    return data
}
// const fetchVendorInventoryOrdersTotalByDate=async(vendorId)=>{
//     const {data}=await axios.get(`/api/inventoryOrders/admin/${vendorId}/inventory-orders/bydate`,)
//     return data
// }
// const fetchVendorPaymentByDate=async(vendorId)=>{
//     const {data}=await axios.get(`/api/inventoryOrders/admin/${vendorId}/inventory-orders/payment/bydate`,)
//     return data
// }
const AdminVendorDetailsPage = () => {
    return <AdminVendorDetailsPageComponent
        getVendor={getVendor}
        fetchVendorInventoryOrders={fetchVendorInventoryOrders}
        deleteVendorInventoryOrder={deleteVendorInventoryOrder}
        payVendorApiRequest={payVendorApiRequest}
        fetchInventoryTransactions={fetchInventoryTransactions}>
    </AdminVendorDetailsPageComponent>
};
export default AdminVendorDetailsPage;