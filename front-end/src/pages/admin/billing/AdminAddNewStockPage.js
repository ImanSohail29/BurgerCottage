import axios from "axios";
import AdminAddNewStockComponent from "./components/AdminAddNewStockComponent";
import { useDispatch, useSelector } from "react-redux";

const createStockApiRequest = async (formInputs) => {
    const { data } = await axios.post("/api/stocks/admin", { ...formInputs })
    return data
}
const AdminAddNewStockPage = () => {
    return (
        <AdminAddNewStockComponent
            createStockApiRequest={createStockApiRequest}
        >
        </AdminAddNewStockComponent>
    )
}
export default AdminAddNewStockPage;