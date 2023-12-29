import axios from "axios"
import { useSelector } from "react-redux";
import FoodItemsComponent from "./components/FoodItemsComponent";
const getFoodItems = async (categoryName="",pageNumParam=null) => {
    const category=categoryName?`category/${categoryName}/`:""
    const url=`/api/foodItems/${category}?pageNum=${pageNumParam}`
    const { data } = await axios.get(url)
    return data
}
const FoodItemsPage = () => {
    const {categories}=useSelector((state)=>state.category)
    const discount=useSelector((state)=>state.discount.discount)
    const { userInfo } = useSelector((state) => state.user)
    return (
        <FoodItemsComponent getFoodItems={getFoodItems} categories={categories} discount={discount} userInfo={userInfo}></FoodItemsComponent>
    )
}
export default FoodItemsPage;
