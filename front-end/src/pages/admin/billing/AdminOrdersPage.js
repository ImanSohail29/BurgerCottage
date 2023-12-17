import AdminOrdersPageComponent from "./components/AdminOrdersPageComponent";

import axios from "axios";

const getOrders = async() => {
    const { data } = await axios.get("/api/orders/admin");
    return data
}

const AdminOrdersPage=()=>{
    return <AdminOrdersPageComponent getOrders={getOrders}></AdminOrdersPageComponent>
}
export default AdminOrdersPage;