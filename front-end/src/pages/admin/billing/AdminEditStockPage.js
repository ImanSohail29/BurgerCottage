import axios from "axios";
import AdminEditStockComponent from "./components/AdminEditStockComponent";

const updateStockApiRequest = async (stockId, formInputs) => {
    const { data } = await axios.put(`/api/stocks/admin/${stockId}`, { ...formInputs })
    return data
}
const fetchStock = async (stockId) => {
    const { data } = await axios.get(`/api/stocks/admin/get-one/${stockId}`)
    return data
}
const AdminEditStockPage = () => {
    return (
        <AdminEditStockComponent
            fetchStock={fetchStock}
            updateStockApiRequest={updateStockApiRequest}>
        </AdminEditStockComponent>
    )
};
export default AdminEditStockPage;