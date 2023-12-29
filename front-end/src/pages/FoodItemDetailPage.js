import FoodItemDetailComponent from "./components/FoodItemDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../redux/slices/cartSlice"
import axios from 'axios'

const getFoodItemDetails = async(id) => {
    const { data } = await axios.get(`/api/foodItems/get-one/${id}`);
    return data
}

const writeReviewApiRequest = async (foodItemId, formInputs) => {
    const { data } = await axios.post(`/api/users/review/${foodItemId}`, { ...formInputs });
    return data;
}

const FoodItemDetailPage = () => {

    const dispatch = useDispatch()

    const discount = useSelector((state) => state.discount.discount);
console.log(discount)
  return <FoodItemDetailComponent  addToCartReduxAction={addToCart} reduxDispatch={dispatch} getFoodItemDetails={getFoodItemDetails} writeReviewApiRequest={writeReviewApiRequest} discount={discount} />;
};

export default FoodItemDetailPage;
