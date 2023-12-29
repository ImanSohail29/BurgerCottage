import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminDiscountPageComponent from "./components/AdminDiscountPageComponent";
import { uploadImagesApiRequest, DiscountUploadImagesCloudinaryApiRequest } from "../utils";
const fetchDiscount = async (discountId) => {
    const { data } = await axios.get(`/api/foodItems/get-one/discount/${discountId}`)
    return data
}
const updateDiscountApiRequest = async (discountId, formInputs) => {
    const { data } = await axios.put(`/api/foodItems/admin/discount/${discountId}`, { ...formInputs })
    return data
}
const imageDeleteHandler = async (imagePath, discountId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV === "production") {
        await axios.delete(`/api/foodItems/admin/discount/image/${encoded}/${discountId}?cloudinary=true`)
    } else {
        await axios.delete(`/api/foodItems/admin/discount/image/${encoded}/${discountId}?cloudinary=true`)
    }
}

const AdminEditDiscountPage = () => {
const discount=useSelector((state)=>state.discount.discount)
const reduxDispatch = useDispatch();

    return (
        <AdminDiscountPageComponent
            fetchDiscount={fetchDiscount}
            updateDiscountApiRequest={updateDiscountApiRequest}
            imageDeleteHandler={imageDeleteHandler}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={DiscountUploadImagesCloudinaryApiRequest}
            reduxDispatch={reduxDispatch}>
        </AdminDiscountPageComponent>
    )
};
export default AdminEditDiscountPage;