const mongoose=require("mongoose")
const discountSchema=mongoose.Schema(
    {
        figure:{type:Number,required:true},
        startDate:{type:Date},
        endDate:{type:Date},
        description:{type:String},
        image:{type:String,default:"https://res.cloudinary.com/dyqklwu1n/image/upload/v1703749278/BurgerCottage/discount_y6h9m7.png"},
    });
const Discount=mongoose.model("Discount",discountSchema)
module.exports=Discount;