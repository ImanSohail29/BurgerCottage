const ObjectId = require("mongodb").ObjectId

const inventoryOrders=[{
    vendor:new ObjectId("65734908979bbe2331fdd375"),
    ingredient:'Lettuce',
    quantity:10,
    pricePerItem:12,
    totalAmount:120,
    expiryDate:Date.now(),
    date:Date.now(),
}]

module.exports=inventoryOrders