const mongoose = require("mongoose")
const vendorSchema = mongoose.Schema({
name:{type:String,required:true},
phoneNumber:{type:String,required:true},
email:{type:String},
idcardNumber:{type:Number},
amountRemaining:{type:Number,default:0},//subtract totalAmount-totalAmountPaid
totalAmountPaid:{type:Number,default:0},//jub bhi pay ho isme add ho
totalAmount:{type:Number,default:0}//jub bhi create ho isme add ho
})
const Vendor = mongoose.model("Vendor", vendorSchema)
module.exports = Vendor