import CartPageComponent from "./components/CartPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const discount=useSelector((state)=>state.discount.discount)
    const reduxDispatch = useDispatch();

  return <CartPageComponent addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} cartSubtotal={cartSubtotal} reduxDispatch={reduxDispatch} discount={discount} />;
};

export default CartPage;
