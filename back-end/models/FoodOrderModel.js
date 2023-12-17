const mongoose=require("mongoose")
const FoodItem=require("./FoodItemModel")
const Customer=require("./UserModel")

const FoodOrderModel=mongoose.Schema({
    cart:{cartItems: {
        type: ["Mixed"]
    },
    itemsCount:{type:Number},
    cartSubtotal:{type:Number}
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Customer,
    },
    customerInfo:{
        name:{type:String},
        phoneNumber:{type:String},
        email:{type:String},
        address:{type:String},
    },
    orderTotal:{
        itemsCount:{type:Number},
        cartSubtotal:{type:Number},
    },
    
    serviceMode:{
        type:String,enum:['delivery','takeAway','dineIn'],default:'delivery',required:true
    },
    orderPlacedAt:{
        type:Date,default:Date.now()
    },
    
    transactionResult: {
                status: {type: String},
                createTime: {type: String},
                amount: {type: Number}
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    isReady:{
        type:Boolean,
        required: true,
        default:false,
    },
    estimatedReadyTimeMinutes:{
        type:Number,
        required:true,
        default:30
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paidAt: {
        type: Date,
    },
    
    deliveryAddress:{
        type:String
    },
    estimatedDeliveryTimeMinutes:{
        type:Number,
        required:true,
        default:20
    },
    deliveredAt: {
        type: Date,
    },
    isDelivered:
    {
        type: Boolean,
        required: true,
        default: false,
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
})
const FoodOrder = mongoose.model("FoodOrder", FoodOrderModel)
module.exports = FoodOrder