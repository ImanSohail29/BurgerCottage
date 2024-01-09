import axios from "axios";
import AdminReportComponent from "./components/AdminReportComponent";

const getReport = async() => {
    const { data } = await axios.get("/api/report/admin");
    return data
}

const AdminReport=()=>{
    return <AdminReportComponent getReport={getReport}></AdminReportComponent>
}
export default AdminReport;