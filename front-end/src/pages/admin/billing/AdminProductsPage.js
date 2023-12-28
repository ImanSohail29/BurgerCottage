import axios from "axios";
import AdminProductsComponent from "./components/AdminProductsComponent";
import { useSelector } from "react-redux";
const fetchProducts = async (abctrl,categoryName="") => {
    const category=categoryName?`category/${categoryName}/`:""
    const url=`/api/foodItems/admin/${category}`
    const { data } = await axios.get(url)
    return data
}

const deleteProducts=async(productId)=>{
    const {data}=await axios.delete(`/api/foodItems/admin/${productId}`)
    return data
}
const fetchCategories=async(abctrl)=>{
    const {data}=await axios.get("/api/categories/admin",{signal:abctrl.signal})
    return data
}
const deleteCategories=async(categoryId)=>{
    const {data}=await axios.delete(`/api/categories/admin/${categoryId}`)
    return data
}
const AdminProductsPage = () => {
    const abctrl=""
    const { categories } = useSelector((state) => state.category)

return <AdminProductsComponent fetchProducts={fetchProducts} deleteProducts={deleteProducts} categories={categories} deleteCategories={deleteCategories}></AdminProductsComponent>
};
export default AdminProductsPage;