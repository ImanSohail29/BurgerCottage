import axios from "axios";
import UserOrdersPageComponent from "./components/UserOrdersPageComponent";

const getOrders = async () => {
  const { data } =await axios.get("/api/orders")
  console.log(data)
  return data
}

const UserOrdersPage = () => {
  return (
    <UserOrdersPageComponent getOrders={getOrders}></UserOrdersPageComponent>
  )
};
export default UserOrdersPage;