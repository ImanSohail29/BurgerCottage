import axios from "axios"
import { useSelector } from "react-redux";
import FoodItemsComponent from "./components/FoodItemsComponent";
import { useDispatch } from "react-redux";
import { addToCart } from "../../src/redux/slices/cartSlice";

// const getFoodItems = async (categoryName="",pageNumParam=null) => {
//     const category=categoryName?`category/${categoryName}/`:""
//     const url="/api/foodItems"
//     const { data } = await axios.get(url)
//     return data
// }
const getFoodItems = async () => {
    const { data } = await axios.get('/api/foodItems')
    return data
}
const FoodItemsPage = () => {
    const dispatch=useDispatch()
    const {categories}=useSelector((state)=>state.category)
    const discount=useSelector((state)=>state.discount.discount)
    const { userInfo } = useSelector((state) => state.user)
    return (
        <FoodItemsComponent getFoodItems={getFoodItems} categories={categories} discount={discount} userInfo={userInfo} dispatch={dispatch} addToCartReduxAction={addToCart}></FoodItemsComponent>
    )
}
export default FoodItemsPage;
