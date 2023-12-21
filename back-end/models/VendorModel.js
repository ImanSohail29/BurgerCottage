const mongoose = require("mongoose")
const vendorSchema = mongoose.Schema({
name:{type:String,required:true},
phoneNumber:{type:String,required:true},
email:{type:String},
idcardNumber:{type:Number},
amountRemaining:{type:Number},//subtract totalAmount-totalAmountPaid
totalAmountPaid:{type:Number},//jub bhi pay ho isme add ho
totalAmount:{type:Number}//jub bhi create ho isme add ho
})
const Vendor = mongoose.model("Vendor", vendorSchema)
module.exports = Vendor