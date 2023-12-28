const mongoose = require("mongoose")
const addOnSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number },
        image: { type: String, default: "https://res.cloudinary.com/dyqklwu1n/image/upload/v1701872714/BurgerCottage/CategoryDefaultImage_aaqnul.jpg" },
    });
const AddOn = mongoose.model("AddOn", addOnSchema)
module.exports = AddOn;