import { useSelector } from "react-redux";
import axios from "axios";
import AdminEditCategoryComponent from "./components/AdminEditCategoryComponent";
import { CategoryUploadImagesCloudinaryApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "../utils";
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/categories/get-one/${productId}`)
    return data
}
const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(`/api/categories/admin/${productId}`, { ...formInputs })
    return data
}
const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV === "production") {
        await axios.delete(`/api/categories/admin/image/${encoded}/${productId}?cloudinary=true`)
    } else {
        await axios.delete(`/api/categories/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
}

const AdminEditCategoryPage = () => {
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminEditCategoryComponent
            fetchProduct={fetchProduct}
            updateProductApiRequest={updateProductApiRequest}
            imageDeleteHandler={imageDeleteHandler}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={CategoryUploadImagesCloudinaryApiRequest}>
        </AdminEditCategoryComponent>
    )
};
export default AdminEditCategoryPage;