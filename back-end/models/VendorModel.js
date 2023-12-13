const mongoose = require("mongoose")
const vendorSchema = mongoose.Schema({
name:{type:String,required:true},
phoneNumber:{type:String,required:true},
email:{type:String},
idcardNumber:{type:Number},
amountRemaining:{type:Number},
totalAmountPaid:{type:Number},
totalAmount:{type:Number}
})
const Vendor = mongoose.model("Vendor", vendorSchema)
module.exports = Vendor