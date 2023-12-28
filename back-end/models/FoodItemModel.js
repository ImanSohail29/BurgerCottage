const mongoose=require("mongoose")
const Review=require("./ReviewModel")
const Category=require("./CategoryModel")
const Ingredient=require("./IngredientModel")
const AddOn=require('./AddOnModel')
const imageSchema=mongoose.Schema({
    path:{type:String,required:true}
})
const FoodItemSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        ref:Category
    },
    description:{
        type:String,
        required:true,
        default:"unique blend of flavours"
    },
    image:imageSchema,
    size:{
        type:[
        "Mixed"
    ]},
    attributes: {
          type: [
            "Mixed"
          ]
    }
    ,
    price:{
        type:Number,
    },
    addOns:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:AddOn
        }
    ],
    ingredients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Ingredient

        }
    ],
    quantity:{
        type:Number,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Review,
        }
    ],
    reviewsCount:{
        type:Number,
        default:0
    },
    rating:{
        type:Number
    }
}, {
    timestamps: true,
})
const FoodItem=mongoose.model("FoodItem",FoodItemSchema)

FoodItemSchema.index({name: "text", description: "text"}, {name: "TextIndex"})
FoodItemSchema.index({"attrs.key":1, "attrs.value":1})
// productSchema.index({name: -1})

module.exports = FoodItem
