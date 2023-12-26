import axios from "axios";
import AdminAddNewCategoryComponent from "./components/AdminAddNewCategoryComponent";
import {uploadImagesApiRequest,CategoryUploadImagesApiRequest,uploadImagesCloudinaryApiRequest,CategoryUploadImagesCloudinaryApiRequest} from "./../utils"
import { useDispatch, useSelector } from "react-redux";
import {insertCategory} from "./../../../redux/slices/categorySlice"

const createCategoryApiRequest = async (formInputs) => {
    const { data } = await axios.post("/api/categories/admin", { ...formInputs })
    return data
}
const AdminAddNewCategoryPage = () => {
    const reduxDispatch = useDispatch()
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminAddNewCategoryComponent
            categories={categories}
            createCategoryApiRequest={createCategoryApiRequest}
            uploadImagesApiRequest={CategoryUploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={CategoryUploadImagesCloudinaryApiRequest}
            reduxDispatch={reduxDispatch}
            insertCategory={insertCategory}
        >
        </AdminAddNewCategoryComponent>
    )
}
export default AdminAddNewCategoryPage;