const mongoose=require("mongoose")
const categorySchema=mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        description:{type:String},
        image:{type:String,default:"https://res.cloudinary.com/dyqklwu1n/image/upload/v1701872714/BurgerCottage/CategoryDefaultImage_aaqnul.jpg"},
    });
categorySchema.index({description:1})
const Category=mongoose.model("Category",categorySchema)
module.exports=Category;