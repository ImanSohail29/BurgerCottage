import CartPageComponent from "./components/CartPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const reduxDispatch = useDispatch();

  return <CartPageComponent addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} cartSubtotal={cartSubtotal} reduxDispatch={reduxDispatch} />;
};

export default CartPage;
