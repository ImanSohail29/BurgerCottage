import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart, resetCart } from "../../../redux/slices/cartSlice";

import axios from "axios";
import AdminCartDetailsPageComponent from "./components.js/AdminCartDetailsPageComponent";

const AdminCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.user.userInfo);

  const reduxDispatch = useDispatch();

  // const getUser = async () => {
  //   console.log("userInfo: "+JSON.stringify(userInfo))
  //   const { data } = await axios.get("/api/users/profile/" + userInfo._id);
  //   return data;
  // };

  const createOrder = async (orderData) => {
      const { data } = await axios.post("/api/orders", { ...orderData });
      return data;
  }
  const registerUserApiRequestFromAdmin = async (name, phoneNumber, email) => {
    console.log("name:"+name+"phoneNumber:"+phoneNumber+"email:"+email)
    const { data } = await axios.post("/api/users/register-admin", {
      name,
      phoneNumber,
      email,
    });
    return data;
  };
  return (
    <AdminCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      resetCart={resetCart}
      reduxDispatch={reduxDispatch}
      createOrder={createOrder}
      registerUserApiRequestFromAdmin={registerUserApiRequestFromAdmin}
    />
  );
};

export default AdminCartDetailsPage;
