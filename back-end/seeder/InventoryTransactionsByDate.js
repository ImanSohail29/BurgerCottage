const ObjectId = require("mongodb").ObjectId

const InventoryTransactionsByDate=[{
    vendor:new ObjectId("65734908979bbe2331fdd375"),
    transactions:[{
        amountPaid:100,
        amountToBePaid:1000,
        date:'Wed Dec 20 2023'
    }]  
}]
module.exports=InventoryTransactionsByDate