const mongoose=require("mongoose")
const Vendor=require("./VendorModel")
const Ingredient=require("./IngredientModel")
const InventoryOrderPaymentSchema=mongoose.Schema({
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:Vendor,required:true},
    amountPaid:{type:Number,required:true},
    date:{type:Date}
})
const InventoryOrderPayment=mongoose.model("InventoryOrderPayment",InventoryOrderPaymentSchema)
module.exports=InventoryOrderPayment;