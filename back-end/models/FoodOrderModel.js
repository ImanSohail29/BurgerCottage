const mongoose=require("mongoose")
const {customAlphabet}=require("nanoid")
const FoodItem=require("./FoodItemModel")
const Customer=require("./UserModel")
const nanoid = customAlphabet('1234567890ABCEFGHIJKLMNOPQRSTUVWXYZ',6)
const FoodOrderModel=mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(6),
      },
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
    discount:{
        figure:{type:Number,
            default:1}
        
    },
    discountAmount:{
        type:Number,default:0
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
    isReadyAt:{
        type:Date,
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
    isConfirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
})
const FoodOrder = mongoose.model("FoodOrder", FoodOrderModel)
FoodOrder.watch().on("change",(data)=>{
    console.log(data)
    if(data.operationType==="insert"){
        io.emit("newOrder",data.fullDocument)
    }
    if(data.operationType==="update"){
        io.emit("updateOrder",data.fullDocument)
    }
})
module.exports = FoodOrder