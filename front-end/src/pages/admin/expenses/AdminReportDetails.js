import axios from "axios";
import AdminReportDetailsComponent from "./components/AdminReportDetailsComponent";

const getExpenses = async() => {
    const { data } = await axios.get("/api/expenses/admin");
    return data
}
const getOrders = async() => {
    const { data } = await axios.get("/api/orders/admin/asc");
    return data
}
const getReport = async() => {
    const { data } = await axios.get("/api/report/admin");
    return data
}

const AdminReportDetails=()=>{
    return <AdminReportDetailsComponent getExpenses={getExpenses} getOrders={getOrders} getReport={getReport}></AdminReportDetailsComponent>
}
export default AdminReportDetails;