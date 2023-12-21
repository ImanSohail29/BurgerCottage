const mongoose=require("mongoose")
const Vendor=require("./VendorModel")
const Ingredient=require("./IngredientModel")
const InventoryOrderSchema=mongoose.Schema({
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:Vendor,required:true},
    ingredient:{type:String,required:true},
    quantity:{type:Number,required:true},
    pricePerItem:{type:Number},
    totalAmount:{type:Number,required:true}, //jub bhi createInventoryOrder ho toh isme Add ho
    expiryDate:{type:Date},
    date:{type:Date}
})
const InventoryOrder=mongoose.model("InventoryOrder",InventoryOrderSchema)
module.exports=InventoryOrder;