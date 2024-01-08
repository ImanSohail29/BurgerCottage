import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart, resetCart } from "../../../redux/slices/cartSlice";

import axios from "axios";
import AdminCartDetailsPageComponent from "./components/AdminCartDetailsPageComponent";

const AdminCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.user.userInfo);
  const discount=useSelector((state)=>state.discount.discount)

  const reduxDispatch = useDispatch();

  // const getUser = async () => {
  //   console.log("userInfo: "+JSON.stringify(userInfo))
  //   const { data } = await axios.get("/api/users/profile/" + userInfo._id);
  //   return data;
  // };

  const createOrder = async (orderData) => {
    console.log("orderData:"+orderData)
      const { data } = await axios.post("/api/orders", { ...orderData });
      return data;
  }
  const createOrderAdmin = async (orderData) => {
    console.log("orderData:"+orderData)
      const { data } = await axios.post("/api/orders/admin", { ...orderData });
      return data;
  }
  const registerUserApiRequestFromAdmin = async (name, phoneNumber, email,address) => {
    console.log("name:"+name+"phoneNumber:"+phoneNumber+"email:"+email+"address:"+address)
    const { data } = await axios.post("/api/users/register-admin", {
      name,
      phoneNumber,
      email,
      address
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
      createOrderAdmin={createOrderAdmin}
      registerUserApiRequestFromAdmin={registerUserApiRequestFromAdmin}
      discount={discount}
    />
  );
};

export default AdminCartDetailsPage;
