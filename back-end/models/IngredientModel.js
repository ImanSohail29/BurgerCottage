const mongoose=require("mongoose")
const ingredientSchema=mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
})
const Ingredient = mongoose.model("Ingredient", ingredientSchema)
module.exports = Ingredient