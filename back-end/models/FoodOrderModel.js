const mongoose=require("mongoose")
const FoodItem=require("./FoodItemModel")
const Customer=require("./CustomerModel")

const FoodOrderModel=mongoose.Schema({
    orderTotal:{
        itemsCount:{type:Number},
        cartSubtotal:{type:Number},
    },
    cartItems: {type: ["Mixed"]},
    customerInfo:{type:{}},
    deliveryAddress:{type:String},
    orderPlacedAt:{type:Date,default:Date.now()},
    serviceMode:{type:String,enum:['delivery','takeAway','dineIn'],default:'delivery',required:true},
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
            paymentMethod:{
                type:String,
                required:true
            },
            paidAt: {
                type: Date,
            },
            isDelivered: {
                type: Boolean,
                required: true,
                default: false,
            },
            deliveredAt: {
                type: Date,
            }
}, {
    timestamps: true,
})
const FoodOrder = mongoose.model("FoodOrder", FoodOrderModel)
FoodOrder.watch().on("change", (data) => {
    
    if (data.operationType === "insert") {
        io.emit("newFoodOrder", data.fullDocument);
    }
})
module.exports = FoodOrder