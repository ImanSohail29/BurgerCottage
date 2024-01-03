
import axios from "axios";
import { useSelector } from "react-redux";
import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";

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

const OrderDetailsPage = () => {
    const discount=useSelector((state)=>state.discount.discount)
    console.log("discount: "+discount)
  return <OrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} discount={discount} />
};

export default OrderDetailsPage;
