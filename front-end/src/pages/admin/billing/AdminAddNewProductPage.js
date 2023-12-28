import axios from "axios";
import {uploadImagesApiRequest,uploadImagesCloudinaryApiRequest} from "./../utils"
import { useDispatch, useSelector } from "react-redux";
import AdminCreateProductPageComponent from "./components/AdminAddNewProductComponent";

const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post("/api/foodItems/admin", { ...formInputs })
    return data
}
const addOnsApiRequest = async () => {
    const { data } = await axios.get("/api/foodItems/admin/addOns")
    return data
}


const AdminCreateProductPage = () => {
    const reduxDispatch = useDispatch()
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminCreateProductPageComponent
            categories={categories}
            createProductApiRequest={createProductApiRequest}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
            reduxDispatch={reduxDispatch}
            addOnsApiRequest={addOnsApiRequest}
        >
        </AdminCreateProductPageComponent>
    )
}
export default AdminCreateProductPage;