const ObjectId = require("mongodb").ObjectId
const foodOrders={
    cart: {
        cartItems:[
        {productId:"657b757546ba491e439630ce",name:"Zinger Paratha",image:{path:"https://res.cloudinary.com/dyqklwu1n/image/upload/t_FoodItemImages/v1702380898/BurgerCottage/zinger_paratha_roll_zffwfr.jpg"},price:"350",size:"medium",quantity:1},
        {productId:"657b757546ba491e439630d0",name:"Bar B Q Paratha",image:{path:"https://res.cloudinary.com/dyqklwu1n/image/upload/t_FoodItemImages/v1702380898/BurgerCottage/zinger_paratha_roll_zffwfr.jpg"},price:"400",size:"large",quantity:1}
    ],    
    itemsCount:2,
    cartSubtotal:750
    },
    customerInfo:{
        name:"Sumaiya",
        phoneNumber:"03002556678",
    },
    user:new ObjectId("625add3d78fb449f9d9fe2ee"),
    orderTotal: {
        itemsCount: 2,
        cartSubtotal: 750
    },
    
    paymentMethod: "cash",
    isPaid: false,
    isDelivered: false,
}
module.exports=foodOrders