const mongoose=require("mongoose")
const ExpensesSchema=mongoose.Schema({
    name:{type:String,required:true},
    quantity:{type:Number},
    pricePerItem:{type:Number},
    totalAmount:{type:Number,required:true},
    date:{type:Date}
})
const Expenses=mongoose.model("Expenses",ExpensesSchema)
module.exports=Expenses;