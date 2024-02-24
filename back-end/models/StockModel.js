const mongoose = require("mongoose")
const stockSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true,default:"-" },
    inStock: { type: Boolean, required: true },
    description: { type: String },
},
    {
        timestamps: true
    })
const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock