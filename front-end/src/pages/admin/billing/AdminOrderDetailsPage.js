
import axios from "axios";
import AdminOrderDetailsPageComponent from "./components/AdminOrderDetailsPageComponent";

const getOrder = async(orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data
}

const markAsDelivered = async (orderId) => {
    const { data } = await axios.put("/api/orders/delivered/" + orderId);
    if (data) {
        return data;
    }
}

const AdminOrderDetailsPage = () => {
  return <AdminOrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} />
};

export default AdminOrderDetailsPage;
