import axios from "axios"

export const uploadImagesApiRequest = async (images, foodItemId) => {
    const formData = new FormData()
    // images.map((image)=>{
    //     formData.append("images",image)
    // })
    Array.from(images).forEach((image) => {
        formData.append("images", image)
    })
    console.log("formData:" + formData)
    const { data } = await axios.post("/api/products/admin/upload?foodItemId=" + foodItemId, formData)
    return data
}
export const uploadImagesCloudinaryApiRequest = (images, foodItemId) => {
    const url = "https://api.cloudinary.com/v1_1/dyqklwu1n/image/upload"
    const formData = new FormData()
    console.log("formData:" + images)
    Array.from(images).forEach((image) => {
        formData.append("file", image)
        formData.append("upload_preset", "q7axspk2")
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(response => { return response.json() })
            .then(data => {
                console.log("In DB:" + data.url)
                axios.post("/api/fooditems/admin/upload?cloudinary=true&foodItemId=" + foodItemId, data)
            })
    })
}
export const CategoryUploadImagesApiRequest = async (images, categoryId) => {
    const formData = new FormData()
    // images.map((image)=>{
    //     formData.append("images",image)
    // })
    Array.from(images).forEach((image) => {
        formData.append("images", image)
    })
    console.log("formData:" + formData)
    const { data } = await axios.post("/api/categories/admin/upload?foodItemId=" + categoryId, formData)
    return data
}
export const CategoryUploadImagesCloudinaryApiRequest = (images, categoryId) => {
    const url = "https://api.cloudinary.com/v1_1/dyqklwu1n/image/upload"
    const formData = new FormData()
    console.log("formData:" + images)
    Array.from(images).forEach((image) => {
        formData.append("file", image)
        formData.append("upload_preset", "q7axspk2")
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(response => { return response.json() })
            .then(data => {
                console.log("In DB:" + data.url)
                axios.post("/api/categories/admin/upload?cloudinary=true&categoryId=" + categoryId, data)
            })
    })
}
export const DiscountUploadImagesCloudinaryApiRequest = (images, discountId) => {
    const url = "https://api.cloudinary.com/v1_1/dyqklwu1n/image/upload"
    const formData = new FormData()
    console.log("formData:" + images)
    Array.from(images).forEach((image) => {
        formData.append("file", image)
        formData.append("upload_preset", "q7axspk2")
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(response => { return response.json() })
            .then(data => {
                console.log("In DB:" + data.url)
                axios.post("/api/fooditems/admin/discount/upload?cloudinary=true&discountId=" + discountId, data)
            })
    })
}