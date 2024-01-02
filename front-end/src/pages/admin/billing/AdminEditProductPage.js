import { useSelector } from "react-redux";
import AdminEditProductComponent from "./components/AdminEditProductComponent";
import axios from "axios";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "../utils";
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/foodItems/get-one/${productId}`)
    return data
}
const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(`/api/foodItems/admin/${productId}`, { ...formInputs })
    return data
}
const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV === "production") {
        await axios.delete(`/api/foodItems/admin/image/${encoded}/${productId}?cloudinary=true`)
    } else {
        await axios.delete(`/api/foodItems/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
}
const addOnsApiRequest = async () => {
    const { data } = await axios.get("/api/foodItems/admin/addOns")
    return data
}

const AdminEditProductPage = () => {
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminEditProductComponent
            fetchProduct={fetchProduct}
            categories={categories}
            updateProductApiRequest={updateProductApiRequest}
            imageDeleteHandler={imageDeleteHandler}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
            addOnsApiRequest={addOnsApiRequest}>
        </AdminEditProductComponent>
    )
};
export default AdminEditProductPage;