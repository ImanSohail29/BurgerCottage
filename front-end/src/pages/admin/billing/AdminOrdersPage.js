import AdminOrdersPageComponent from "./components/AdminOrdersPageComponent";

import axios from "axios";
import socketIOClient from "socket.io-client";
const getOrders = async() => {
    const { data } = await axios.get("/api/orders/admin");
    return data
}

const AdminOrdersPage=()=>{
    return <AdminOrdersPageComponent getOrders={getOrders} socketIOClient={socketIOClient}></AdminOrdersPageComponent>
}
export default AdminOrdersPage;