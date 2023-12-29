
import axios from "axios";
import AdminOrderDetailsPageComponent from "./components/AdminOrderDetailsPageComponent";
import { useSelector } from "react-redux";

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
    const discount=useSelector((state)=>state.discount.discount)
    console.log("discount: "+discount)
  return <AdminOrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} discount={discount} />
};

export default AdminOrderDetailsPage;
