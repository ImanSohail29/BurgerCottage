const mongoose=require("mongoose")
const FoodItem=require("./FoodItemModel")
const Customer=require("./CustomerModel")

const FoodOrderModel=mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId,ref:Customer,required:true},
    cartitem:{foodItems:[{item:{type:mongoose.Schema.Types.ObjectId,ref:FoodItem,required:true},
                quantity:{type:Number,required:true},
                priceofitem:{type:Number,required:true}
                }],
                countofitems:{type:Number,required:true},
                priceofitems:{type:Number,required:true}
            },
            instructions:{type:String},
            deliveryAddress:{type:String,required:true},
            serviceMode:{type:String,enum:['Delivery','Take away','Dine in'],default:'delivery',required:true},
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
})