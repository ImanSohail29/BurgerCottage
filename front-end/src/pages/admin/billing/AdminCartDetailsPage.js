import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart } from "../../../redux/slices/cartSlice";

import axios from "axios";
import AdminCartDetailsPageComponent from "./components.js/AdminCartDetailsPageComponent";
import { login } from "../../../redux/slices/userSlice";

const AdminCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.user.userInfo);

  const reduxDispatch = useDispatch();

  const getUser = async () => {
    console.log("userInfo: "+JSON.stringify(userInfo))
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const createOrder = async (orderData) => {
      const { data } = await axios.post("/api/orders", { ...orderData });
      return data;
  }

  return (
    <AdminCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      getUser={getUser}
      createOrder={createOrder}
      loginAction={login}
    />
  );
};

export default AdminCartDetailsPage;
